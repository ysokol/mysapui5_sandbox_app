sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"mysapui5_sandbox_app/utils/MicrosoftGraphApi"
], function(Controller, MicrosoftGraphApi) {
	"use strict";

	return Controller.extend("mysapui5_sandbox_app.controller.MyView", {
		onInit: function() {
			this._oMicrosoftGraphApi = new MicrosoftGraphApi();
		},

		onAuthorize: function(oEvent) {
			this._oMicrosoftGraphApi.init();
			//alert("onTest");
		},
		onLogIn: function(oEvent) {
			this._oMicrosoftGraphApi.login();
		},
		onGetMyRecentFiles: function(oEvent) {
			this._oMicrosoftGraphApi.getMyRecentFiles();
			
			//var odOptions = {
			//	clientId: "bb62c1a2-bc76-4363-a0ef-9c768717bcc0",
			//	action: "query",
			//	multiSelect: true,
			//	advanced: {},
			//	success: function(files) { /* success handler */ },
			//	cancel: function() { /* cancel handler */ },
			//	error: function(e) { /* error handler */ }
			//}
			//OneDrive.open(odOptions);
		}
	});
});