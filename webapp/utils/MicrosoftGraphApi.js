sap.ui.define([
	"sap/ui/base/Object",
	"mysapui5_sandbox_app/utils/MyException",
	"mysapui5_sandbox_app/utils/ResourceLoader"
], function(Object, MyException, ResourceLoader) {
	"use strict";
	return Object.extend("mysapui5_sandbox_app.utils.MicrosoftGraphApi", {

		constructor: function() {
			var that = this;
			that._sClientID = '62190cc8-8c2d-479d-b89f-a610fc0c3c73';
			that._aGraphScopes = ["user.read", "files.read.all", "files.read"];
			
			var oResourceLoader = new ResourceLoader();
			var sHttpPath = jQuery.sap.getModulePath("mysapui5_sandbox_app");
			
			Promise.all([
				oResourceLoader.getScript(sHttpPath + "/utils/msgraph-sdk/graph-js-sdk-web.js"), 
				oResourceLoader.getScript(sHttpPath + "/utils/msal/msal.min.js"), 
				oResourceLoader.getScript("https://js.live.net/v7.2/OneDrive.js")
			])
			.then(function(aResults) {
				that._userAgentApplication = new Msal.UserAgentApplication(that._sClientID, null, that._authCallback, {
					logger: that._oLogger,
					cacheLocation: 'localStorage'
				});
				that.init();
			})
			
		},

		init: function() {
			
			var that = this;

			var sCookieToken = that._getCookie('msgraph-access-tocken');
			if (sCookieToken) {
				that._sAccessTocken = sCookieToken;
				that._oClient = MicrosoftGraph.Client.init({
					authProvider: (done) => {
						done(null, that._sAccessTocken); //first parameter takes an error if you can't get an access token
					}
				});
				return;
			}

		},

		login: function() {
			debugger;
			/*this._eraseCookie('msgraph-access-tocken');
			alert("2");
			
						this._oLogger = new Msal.Logger(that._loggerCallback, {
				level: Msal.LogLevel.Verbose,
				correlationId: '12345'
			});*/
			var that = this;

			that._userAgentApplication.loginPopup(that._aGraphScopes).then(function(idToken) {
				//alert(idToken);
				//Login Success
				that._userAgentApplication.acquireTokenSilent(that._aGraphScopes).then(function(accessToken) {
					alert("Access Tocke Aquired!");
					that._sAccessTocken = accessToken;
					that._oClient = MicrosoftGraph.Client.init({
						authProvider: (done) => {
							done(null, that._sAccessTocken); //first parameter takes an error if you can't get an access token
						}
					});
					that._setCookie('msgraph-access-tocken', that._sAccessTocken, 7);
				}, function(error) {
					//AcquireToken Failure, send an interactive request.
					that._userAgentApplication.acquireTokenPopup(that._aGraphScopes).then(function(accessToken) {
						alert("Access Tocke Aquired!");
						that._sAccessTocken = accessToken;
						that._oClient = MicrosoftGraph.Client.init({
							authProvider: (done) => {
								done(null, that._sAccessTocken); //first parameter takes an error if you can't get an access token
							}
						});
						that._setCookie('msgraph-access-tocken', that._sAccessTocken, 7);
					}, function(error) {
						alert(error);
					});
				})
			}, function(error) {
				alert(error);
			});

		},
		
		getMyRecentFiles: function() {
			var that = this;
			that._oClient
				.api('/me/drive/recent')
				.get((err, res) => {
					alert(JSON.stringify(res)); // prints info about authenticated user
				});
		},
		
		openFileOpenDialog: function() {
			var that = this;
			return new Promise(function(resolve, reject) {
				OneDrive.open({
					clientId: that._sClientID,
					action: "query",
					multiSelect: false,
					advanced: {},
					success: function(aFiles) { 
						resolve(aFiles); 
					},
					cancel: function() { 
						reject();
					},
					error: function(oError) { 
						reject(new MyException("MicrosoftGraphApi", "Failed fileOpenDialog()", oError));
					}
				});	
			});
			
		},
		
		readWorksheetList: function(sFileId) {
			var that = this;
			return new Promise(function(resolve, reject) {
				that._oClient
				.api("me/drive/items('" + sFileId + "')/workbook/worksheets/")
				.get((oError, oResult) => {
					if (oResult) {
						resolve(oResult.value);
					}
					else {
						reject(new MyException("MicrosoftGraphApi", "Failed readWorksheetList()", oError));
					}
				});
			});
		},
		
		readWorksheet: function(sWorksheetPath) {
			var that = this;
			return new Promise(function(resolve, reject) {
				that._oClient
				.api(sWorksheetPath + "/Range(address='Sheet1!A1:Z9999')")
				.get((oError, oResult) => {
					if (oResult) {
						resolve(oResult);
					}
					else {
						reject(new MyException("MicrosoftGraphApi", "Failed readWorksheetList()", oError));
					}
				});
			});
		},
		
		_loggerCallback: function(logLevel, sMessage, piiLoggingEnabled) {
			//alert(sMessage);
		},

		_authCallback: function(errorDesc, token, error, tokenType) {
			if (token) {
				//alert(token);
			} else {
				alert(error + ":" + errorDesc);
			}
		},

		_setCookie: function(name, value, days) {
			var expires = "";
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toUTCString();
			}
			document.cookie = name + "=" + (value || "") + expires + "; path=/";
		},

		_getCookie: function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		},

		_eraseCookie: function(name) {
			//document.cookie = name + '=; Max-Age=-99999999;';
			document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
		}

	});
});