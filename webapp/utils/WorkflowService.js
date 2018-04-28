sap.ui.define([
	"sap/ui/base/Object",
	"mysapui5_sandbox_app/utils/MyException"
], function(Object, MyException) {
	"use strict";
	return Object.extend("mysapui5_sandbox_app.utils.WorkflowService", {

		constructor: function() {

		},

		startInstance: function(sWorkflowId, oContext) {
			var that = this;
			return that._fetchToken()
				.then(sToken => new Promise(function(resolve, reject) {
						$.ajax({
							url: "/bpmworkflowruntime/rest/v1/workflow-instances",
							method: "POST",
							async: true,
							contentType: "application/json",
							headers: {
								"X-CSRF-Token": sToken
							},
							data: JSON.stringify({
								definitionId: sWorkflowId,
								context: oContext
							}),
							success: function(result, xhr, data) {
								resolve(JSON.stringify(result, null, 4));
								//model.setProperty("/result", JSON.stringify(result, null, 4));
							}
						});
					}));
		},

		_fetchToken: function() {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url: "/bpmworkflowruntime/rest/v1/xsrf-token",
					method: "GET",
					async: true,
					headers: {
						"X-CSRF-Token": "Fetch"
					},
					success: function(result, xhr, data) {
						resolve(data.getResponseHeader("X-CSRF-Token"));
					}
				});
			});
		}

	});
});