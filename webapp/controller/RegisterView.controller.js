sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("converted.registerview.controller.RegisterView", {
		onInit: function () {
			// Load gender data from mock data
			var oGenderModel = new JSONModel();
			oGenderModel.loadData("model/mockData/genders.json");
			this.getView().setModel(oGenderModel, "genders");

			// Initialize form data model
			var oRegisterDataModel = new JSONModel({
				username: "",
				email: "",
				password: "",
				confirmPassword: "",
				genderKey: "",
				agreedToTerms: false
			});
			this.getView().setModel(oRegisterDataModel, "registerData");
		},

		/**
		 * Handles the "Let's Go!" button press event.
		 * Validates the registration form and simulates registration.
		 * @param {sap.ui.base.Event} oEvent - The event object.
		 */
		onActionLetGo: function (oEvent) {
			// Get the form data
			var oRegisterData = this.getView().getModel("registerData").getData();

			// Perform validation
			var bValid = this._validateForm(oRegisterData);

			// If validation passes, simulate registration
			if (bValid) {
				MessageToast.show("Registration successful!");
				// Add your actual registration logic here.
			}
		},

		/**
		 * Validates the registration form data.
		 * @param {object} oData - The registration form data.
		 * @returns {boolean} - True if the form is valid, false otherwise.
		 * @private
		 */
		_validateForm: function (oData) {
			// Check if all required fields are filled
			if (!oData.username || !oData.email || !oData.password || !oData.confirmPassword || !oData.genderKey) {
				MessageToast.show("Please fill in all required fields.");
				return false;
			}

			// Check if passwords match
			if (oData.password !== oData.confirmPassword) {
				MessageToast.show("Passwords do not match.");
				return false;
			}

			return true;
		},

		/**
		 * Handles the checkbox change event for terms and conditions.
		 * @param {sap.ui.base.Event} oEvent - The event object.
		 */
		onActionAgreeTerms: function (oEvent) {
			// Update the agreedToTerms property in the model
			this.getView().getModel("registerData").setProperty("/agreedToTerms", oEvent.getSource().getChecked());
		},
                
        /**
         * Handles the link press event for Terms of Use & Privacy Policy.
         * @param {sap.ui.base.Event} oEvent - The event object.
         */
        onActionShowTermsAndPolicy: function (oEvent) {
            MessageToast.show("Navigating to Terms of Use & Privacy Policy.");
            //In a real application, you would navigate to the Terms & Conditions here.
        }
	});
});
