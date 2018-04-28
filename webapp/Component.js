sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"mysapui5_sandbox_app/model/models",
	"mysapui5_sandbox_app/utils/MicrosoftGraphApi",
	"mysapui5_sandbox_app/utils/WorkflowService",
], function(UIComponent, Device, models, MicrosoftGraphApi, WorkflowService) {
	"use strict";

	return UIComponent.extend("mysapui5_sandbox_app.Component", {

		metadata: {
			manifest: "json"
		},

		init: function() {
			UIComponent.prototype.init.apply(this, arguments);

			this.setModel(models.createDeviceModel(), "device");
			
			this._oMicrosoftGraphApi = new MicrosoftGraphApi();
			
			this._oWorkflowService = new WorkflowService();
		},
		
		getMicrosoftGraphApi: function() {
			return this._oMicrosoftGraphApi;
		},
		
		getWorkflowService: function() {
			return this._oWorkflowService;
		}
	});
});