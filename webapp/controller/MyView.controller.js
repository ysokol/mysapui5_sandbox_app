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
			.then( oData => that.getOwnerComponent().getWorkflowService().startInstance("my_workflow_project_name", that._convertXlsToJson(oData.text)) )
			.then( oWfData => alert("WF Started") )
			.catch( oException => (oException.alert) ? oException.alert() : alert(JSON.stringify(oException)) );
		},
		
		_convertXlsToJson: function(aXlsMatrix) {
			var oJsonObject = {};
			oJsonObject.aPriceListItems = this._convertMatrixToObjArray(aXlsMatrix);
			oJsonObject.mColumnHeaders = oJsonObject.aPriceListItems.shift();
			return oJsonObject;
		},
		
		_convertMatrixToObjArray: function(aMatrix) {
			debugger;
			var aObjArray = [];
			var oItem;
			for (let aRow of aMatrix) {
				oItem = new Object();
				oItem.sConditionType = aRow[0];
				oItem.sAccessKey01 = aRow[1];
				oItem.sAccessKey02 = aRow[2];
				oItem.sAccessKey03 = aRow[3];
				oItem.sAccessKey04 = aRow[4];
				oItem.sAccessKey05 = aRow[5];
				oItem.sAccessKey06 = aRow[6];
				oItem.sAccessKey07 = aRow[7];
				oItem.sDateFrom =  aRow[8];
				oItem.sDateTo =  aRow[9];
				oItem.sValue = aRow[10];
				oItem.sUom = aRow[11];
				aObjArray.push(oItem);
			}
			return aObjArray;
		}
		
	});
});