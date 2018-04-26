sap.ui.define([
	"sap/ui/base/Object",
	"mysapui5_sandbox_app/utils/MyException"
], function(Object, MyException) {
	"use strict";
	return Object.extend("mysapui5_sandbox_app.utils.MicrosoftGraphApi", {

		constructor: function() {
			this._sClientID = 'bb62c1a2-bc76-4363-a0ef-9c768717bcc0';
			this._aGraphScopes = ["user.read", "mail.send"];
		},

		init: function() {
			
			alert("1234");
			
			debugger;
			
			this._oLogger = new Msal.Logger(this._loggerCallback, {
				level: Msal.LogLevel.Verbose,
				correlationId: '12345'
			});

			var userAgentApplication = new Msal.UserAgentApplication(this._sClientID, null, this._authCallback, {
				logger: this._oLogger,
				cacheLocation: 'localStorage'
			});
			
			userAgentApplication.loginPopup(this._aGraphScopes).then(function (idToken) {
                //Login Success
                userAgentApplication.acquireTokenSilent(this._aGraphScopes).then(function (accessToken) {
                    alert(accessToken);
                }, function (error) {
                    //AcquireToken Failure, send an interactive request.
                    userAgentApplication.acquireTokenPopup(this._aGraphScopes).then(function (accessToken) {
                        alert(accessToken);
                    }, function (error) {
                        alert(error);
                    });
                })
            }, function (error) {
                alert(error);
            });

		},

		_loggerCallback: function(logLevel, sMessage, piiLoggingEnabled) {
			alert(sMessage);
		},

		_authCallback: function(errorDesc, token, error, tokenType) {
			if (token) {} else {
				alert(error + ":" + errorDesc);
			}
		}

	});
});