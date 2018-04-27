sap.ui.define([
	"sap/ui/base/Object",
	"mysapui5_sandbox_app/utils/MyException"
], function(Object, MyException) {
	"use strict";
	return Object.extend("mysapui5_sandbox_app.utils.ResourceLoader", {

		constructor: function() {
			
		},

		getScript: function(sUrl) {
			return new Promise(function(resolve, reject) {
				$.getScript(sUrl, function(sScript, sTextStatus, oJqXhr) {
					resolve(sScript, sTextStatus, oJqXhr);
				});	
			});
		}

	});
});