sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"mysapui5_sandbox_app/utils/MicrosoftGraphApi"
], function(Controller, MicrosoftGraphApi) {
	"use strict";

	return Controller.extend("mysapui5_sandbox_app.controller.MyView", {
		onInit: function() {
			this._oMicrosoftGraphApi = new MicrosoftGraphApi();
		},

		onTest: function(oEvent) {
			this._oMicrosoftGraphApi.init();
			//alert("onTest");
		}
	});
});