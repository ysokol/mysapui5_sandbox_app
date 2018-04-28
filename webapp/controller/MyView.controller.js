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
			.then( oData => { 
				alert(JSON.stringify(oData));
				that.getOwnerComponent().getWorkflowService().startInstance(
					"my_workflow_project_name", 
					{
						values: that._convertMatrixToObjArray( oData.text )
					}
				);
			} )
			.catch( oException => oException.alert() );
			
			//;          
			
			//oData.text[0][1]
		},
		
		_convertMatrixToObjArray: function(aMatrix) {
			debugger;
			var aObjArray = [];
			var oItem = {};
			for (let aRow of aMatrix) {
				oItem.sColumnValue01 = aRow[0];
				oItem.sColumnValue02 = aRow[1];
				oItem.sColumnValue03 = aRow[2];
				oItem.sColumnValue04 = aRow[3];
				oItem.sColumnValue05 = aRow[4];
				oItem.sColumnValue06 = aRow[5];
				oItem.sColumnValue07 = aRow[6];
				oItem.sColumnValue08 = aRow[7];
				aObjArray.push(oItem);
			}
			return aObjArray;
		}
		
	});
});