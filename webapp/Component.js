sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"mysapui5_sandbox_app/model/models",
	"jquery.sap.global"
], function(UIComponent, Device, models, jQuery) {
	"use strict";

	jQuery.sap.registerModulePath("my.sapui5_components_library", "https://rawgit.com/ysokol/my_sapui5_components_library/master/src/");

	return UIComponent.extend("mysapui5_sandbox_app.Component", {

		metadata: {
			manifest: "json"
		},

		init: function() {
			UIComponent.prototype.init.apply(this, arguments);
			//sap.ui.getCore().loadLibrary("my_sapui5_components_library", "https://raw.githubusercontent.com/ysokol/my_sapui5_components_library/master/src/");

			this.setModel(models.createDeviceModel(), "device");



		}
	});
});