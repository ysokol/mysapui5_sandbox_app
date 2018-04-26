sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"mysapui5_sandbox_app/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("mysapui5_sandbox_app.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			
			// load google maps library
			var sHttpPath = jQuery.sap.getModulePath("mysapui5_sandbox_app");
			//sap.ui.getCore().loadLibrary("openui5.googlemaps", sHttpPath + "/utils/googlemaps/");
			$.getScript(sHttpPath + "/utils/msgraph-sdk/graph-js-sdk-web.js");
			$.getScript(sHttpPath + "/utils/msal/msal.min.js");
			
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			
		}
	});
});