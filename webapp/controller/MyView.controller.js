sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("mysapui5_sandbox_app.controller.MyView", {
		onInit: function() {
			///this._oMicrosoftGraphApi = new MicrosoftGraphApi();
		},

		onAuthorize: function(oEvent) {
			
			this.getOwnerComponent().getMicrosoftGraphApi().init();
			//alert("onTest");
		},
		
		onLogIn: function(oEvent) {
			this.getOwnerComponent().getMicrosoftGraphApi().login();
		},
		
		onStartWorkflow: function(oEvent) {
			var that = this;
			that.getOwnerComponent().getMicrosoftGraphApi().openFileOpenDialog()
			.then( aFiles => that.getOwnerComponent().getMicrosoftGraphApi().readWorksheetList(aFiles.value[0].id) )
			.then( aWorksheets => that.getOwnerComponent().getMicrosoftGraphApi().readWorksheet(aWorksheets[0]["@odata.id"]) )
			.then( oData => { debugger; alert(JSON.stringify(oData)) } )
			.catch( oException => oException.alert() );
			//oData.text[0][1]
		}
	});
});