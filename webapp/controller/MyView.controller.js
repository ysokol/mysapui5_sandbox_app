sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"my/sapui5_components_library/exception/MyException",
	"my/sapui5_components_library/utils/ResourceLoader"
], function(Controller, MyException, ResourceLoader) {
	"use strict";

	return Controller.extend("mysapui5_sandbox_app.controller.MyView", {
		onInit: function() {
			///this._oMicrosoftGraphApi = new MicrosoftGraphApi();

			var oResourceLoader = new ResourceLoader();

			oResourceLoader.getScript("https://secure.aadcdn.microsoftonline-p.com/lib/1.0.11/js/adal.min.js")
				.then(() => {
					this.onTest();
				});
		},

		onTest: function() {
			debugger;
			//my_sapui5_components_library.MyException;
			var authContext = new AuthenticationContext({
				//clientId: "pepsico.onmicrosoft.com",
				clientId: 'bb62c1a2-bc76-4363-a0ef-9c768717bcc0',
				postLogoutRedirectUri: 'https://webidetesting6224157-s0004431717trial.dispatcher.hanatrial.ondemand.com/webapp/index.html',
				endpoints: {
					graphApiUri: "https://graph.microsoft.com"
				},
				cacheLocation: "localStorage"
			});
			//authContext.popUp = true;

			if (authContext.isCallback(window.location.hash)) {
				// Handle redirect after token requests
				authContext.handleWindowCallback();
				var err = authContext.getLoginError();
				if (err) {
					alert(err);
				}
			} else {
				// If logged in, get access token and make an API request
				var user = authContext.getCachedUser();
				if (user) {
					// Get an access token to the Microsoft Graph API
					authContext.acquireToken(
						'https://graph.microsoft.com',
						function(error, token) {
							if (error || !token) {
								alert(error);
								return;
							}
							alert(token);

							$.ajax({
								type: "GET",
								url: "https://graph.microsoft.com/v1.0/me/",
								headers: {
									"Authorization": "Bearer " + token
								}
							}).done(function(response) {
								alert(JSON.stringify(response, null, 4));
							}).fail(function() {
								alert("Fetching files from OneDrive failed.");
							});

							//getCurrentUser(token);
						}
					);
				} else {
					authContext.login();
				}
			}

			/*var user = authContext.getCachedUser();
			if (!user) {
				authContext.login();
			}
			authContext.acquireToken("https://graph.microsoft.com", function(error, token) {
				if (error || !token) {
					console.log("ADAL error occurred: " + error);
					return;
				} else {
					var filesUri = config.endpoints.graphApiUri + "/v1.0/me/drive/root/children";
					alert(token);
					//$.ajax({
					//	type: "GET",
					//	url: filesUri,
					//	headers: {
					//		"Authorization": "Bearer " + token
					//	}
					//}).done(function(response) {
					//	console.log("Successfully fetched files from OneDrive.");
					//	var items = response.value;
					//	for (var i = 0; i < items.length; i++) {
					//		console.log(items[i].name);
					//		$("#OneDrive").append("<li>" + items[i].name + "</li>");
					//	}
					//}).fail(function() {
					//	console.log("Fetching files from OneDrive failed.");
					//});
				}
			});*/
		}

	});
});