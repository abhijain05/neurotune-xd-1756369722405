sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
	"use strict";

	return Controller.extend("converted.registerview.controller.App", {
		onInit: function () {
			// Get the router instance
			var oRouter = UIComponent.getRouterFor(this);

			// Add error handling for routing
			if (oRouter) {
				oRouter.attachBypassed(function (oEvent) {
					console.log("Route bypassed:", oEvent.getParameter("hash"));
				});

				// Navigate to main view if no hash is set
				if (!window.location.hash || window.location.hash === "#") {
					setTimeout(function () {
						oRouter.navTo("RouteMain");
					}, 100);
				}
			} else {
				console.error("Router not found in App controller");
			}
		}
	});
});
