sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"mysapui5_sandbox_app/model/models",
	"mysapui5_sandbox_app/utils/MicrosoftGraphApi"
], function(UIComponent, Device, models, MicrosoftGraphApi) {
	"use strict";

	return UIComponent.extend("mysapui5_sandbox_app.Component", {

		metadata: {
			manifest: "json"
		},

		init: function() {
			UIComponent.prototype.init.apply(this, arguments);

			this.setModel(models.createDeviceModel(), "device");
			
			this._oMicrosoftGraphApi = new MicrosoftGraphApi();
		},
		
		getMicrosoftGraphApi: function() {
			return this._oMicrosoftGraphApi;
		}
	});
});