Felece.Form = {
    Props: {},

    ready: function () {
        Felece.Form.Actions.init();
        Felece.Form.keyevents();
    },

    keyevents: function () {
        // Trigger form submit on enter key press
        if (document.getElementsByTagName("form").length > 0) {
            var forms = document.querySelectorAll('[data-submit-button]');

            //-> Iterate through all forms on page
            for (i = 0; i < forms.length; i++) {
                var formElements = forms[i].elements;

                //-> Iterate through text and password inputs
                for (j = 0; j < formElements.length; j++) {
                    if (formElements[j].nodeName === "INPUT") {
                        if (formElements[j].type === "text" || formElements[j].type === "number" || formElements[j].type === "password") {
                            //-> Check if element is in a partial form container that has data-partial-submit-button attribute
                            var parentElem = findAncestor(formElements[j], '[data-partial-submit-button]');

                            if (parentElem) {
                                //-> Assign them "enter key" listener for the partial form container
                                formElements[j].onkeypress = function (event) {
                                    var keyCode = event.which || event.keyCode;
                                    if (keyCode === 13) {
                                        // Especially for insert and edit mode forms together hold 2 buttons with the 
                                        // the same id value. One of them is hidden based on the form mode. Therefore,
                                        // check which one is not hidden and trigger submission on it.

                                        var partialSubmitBtnId = parentElem.getAttribute("data-partial-submit-button");
                                        var partialSubmitBtnList = document.querySelectorAll('#' + partialSubmitBtnId);
                                        var partialSubmitBtn = null;

                                        if (partialSubmitBtnList.length === 1) {
                                            partialSubmitBtn = partialSubmitBtnList[0];
                                        }
                                        else if (partialSubmitBtnList.length > 1) {
                                            for (var k = 0; k < partialSubmitBtnList.length; k++) {
                                                var isElemHidden = isHidden(partialSubmitBtnList[k]);

                                                if (!isElemHidden) {
                                                    partialSubmitBtn = partialSubmitBtnList[k];
                                                }
                                            }
                                        }

                                        if (partialSubmitBtn !== null) {
                                            partialSubmitBtn.focus();
                                            partialSubmitBtn.click();
                                        }

                                        event.preventDefault();
                                        return false;
                                    }
                                };
                            }
                            else {
                                formElements[j].onkeypress = function (event) {
                                    var keyCode = event.which || event.keyCode;

                                    if (keyCode === 13) {
                                        // Especially for insert and edit mode forms together hold 2 buttons with the 
                                        // the same id value. One of them is hidden based on the form mode. Therefore,
                                        // check which one is not hidden and trigger submission on it.

                                        event.preventDefault();

                                        var currFormElem = findAncestor(this, '[data-submit-button]');
                                        var submitBtnId = currFormElem.getAttribute("data-submit-button");
                                        var submitBtnList = document.querySelectorAll('#' + submitBtnId);
                                        var submitBtn = null;

                                        if (submitBtnList.length === 1) {
                                            submitBtn = submitBtnList[0];
                                        }
                                        else if (submitBtnList.length > 1) {
                                            for (var k = 0; k < submitBtnList.length; k++) {
                                                var isElemHidden = isHidden(submitBtnList[k]);

                                                if (!isElemHidden) {
                                                    submitBtn = submitBtnList[k];
                                                }
                                            }
                                        }

                                        if (submitBtn !== null) {
                                            submitBtn.focus();
                                            submitBtn.click();
                                        }
                                        else {
                                            return false;
                                        }
                                    }
                                };
                            }
                        }
                    }
                }
            }
        }
    },

    Actions: {
        init: function () {
            Felece.Form.Props = {
                formElem: null,
                isModal: false,
                submitButton: null,
                submitButtonParam: null,
                reCaptchaElem: null,
                data: {},
                url: {},
                proxyResponse: null,
                customFuncArg: null,
                successfulSubmission: false,
                modalFeedbackTimeout: 4000,
                spinnerColor: 'white',
                spinnerPosition: 'right',
                modalSetTimeout: null
            };
        },

        submit: function (arg) {
            // Save arg-parameter as submitButtonParam in Props. This is needed because 
            // the arg is needed on confirmation return to call this function with the 
            // same arg-parameter.If arg is null, then it means this function is called 
            // again by confirmation button. Then use the saved arg as parameter.
            // arg has the following optional properties (only "sender" param is mandatory)
            // arg.sender (this object - sender button - mandatory)
            // arg.spinnerColor (string - spinner color: dark)
            // arg.spinnerPosition (string - spinner position: left)
            // arg.formId (string - refer to a specific form: formId)
            // arg.validate (bool - if false specified, validation is skipped)
            // arg.useProxy (bool - use proxy function)
            // arg.onSubmit (string - actions on submit: refreshPage, refreshKendo, refreshKendoOrHtml, keepModal)
            // arg.formClear (bool - set false not to clear form)
            // arg.scrollTop (bool - set false not to scroll top when it is not a modal form, or set true when it is a modal form)
            // arg.kendoSelector (string - spesifik kendoGrid to refresh)
            // arg.htmlSelector (string - spesifik html container to refresh)
            // arg.func (string - proxy function name to call if useProxy is true, or use as a custom function to call - not a proxy function)
            // arg.customFuncArg (json obj - if custom function called, specify arg if needed)
            // arg.confirm (bool - call confirmation dialog)
            // arg.confirmProps (json object - custom confirmation dialog properties: e.g 'confirmationCustomProps' exists on page)
            // -- var confirmationCustomProps = {
            // --   Fire: {
            // --       title: "string value for title",
            // --       text: "string value for descriptive text",
            // --       icon: "confirmation icon type like warning, danger, etc",
            // --       showCancelButton: "true / false",
            // --       confirmButtonText: "confirmation button text string",
            // --       cancelButtonText: "cancek button text string if shown",
            // --       customClass: {
            // --                   confirmButton: "custom css class name for confirmation button",
            // --                   cancelButton: "custom css class name for cancellation button"
            // --       }
            // --   }
            // -- };            

            // Form submit button is clicked.
            Felece.Form.Props.submitButtonParam = arg;

            // Retrieve parameters through arg.
            var sender = arg.sender;
            sender.disabled = true;
            var specificFormId = arg.formId;
            var confirm = arg.confirm;

            // Save spinner properties if specified
            if (arg.spinnerColor) {
                Felece.Form.Props.spinnerColor = arg.spinnerColor;
            }
            if (arg.spinnerPosition) {
                Felece.Form.Props.spinnerColor = arg.spinnerPosition;
            }

            // Check if modal exists.
            Felece.Form.Props.isModal = document.querySelector('.modal.show') !== null;

            // As default, confirmation alert is not called.
            if (confirm) {
                arg.confirm = false;

                // Check if custom confirmation-dialog properties object is passed.
                if (arg.confirmProps) {
                    // Generate variable dynamically based on string value.
                    var confirmationCustomProps = window[arg.confirmProps];
                }
                else {
                    confirmationCustomProps = { Fire: {} };
                }

                // Set callback function on confirmation which directs back to here.
                confirmationCustomProps.Fire.funcName = 'Felece.Form.Actions.submit';
                confirmationCustomProps.Fire.funcArgs = arg;

                // Call confirmation-dialog box.
                Felece.Notification.Actions.confirmationDialog(confirmationCustomProps);
                return false;
            }

            // Collect form properties.
            Felece.Form.Props.formElem = specificFormId ? document.getElementById(specificFormId) : findAncestor(sender, 'form');
            Felece.Form.Props.submitButton = sender;

            // Apply form-presubmitting UX approach.
            Felece.Form.UX.presubmitting();

            // Run validation.
            var isValid = arg.validate === false ? true : Felece.Validation.Actions.run();

            if (isValid) {
                // Apply form-submitting UX approach.
                Felece.Form.UX.submitting();

                // Trigger submission
                Felece.Form.Actions.submitting();
            }
            else {
                Felece.Form.UX.cancel();
            }
        },

        submitting: function () {
            var params = Felece.Form.Props.submitButtonParam;

            // Submit form based on submitting method.
            if (params.useProxy) {
                // !!!!!!!!
                formCollect({ current: Felece.Form.Props, container: Felece.Form.Props.formElem });

                // Call related proxy function.
                executeFunction(params.func, [Felece.Form.Actions.proxySuccessCallback, Felece.Form.Actions.proxyErrorCallback]);
            }
            else if (params.func) {
                // Collect data. !!!!!!!!
                formCollect({ current: Felece.Form.Props, container: Felece.Form.Props.formElem });

                // Call a custom function if needed.
                executeFunction(params.func, params.customFuncArg);

                // Then call form callbacks
                Felece.Form.Actions.customSuccessCallback();
            }
            else {
                // MVC form submission
                Felece.Form.Props.formElem.submit();
            }
        },

        clear: function () {
            var container = Felece.Form.Props.formElem;
            var tags = ['select', 'input', 'textarea'];

            for (var i = 0; i < tags.length; i++) {
                var tag = tags[i];
                var elementsByTag = container.getElementsByTagName(tag);

                for (var j = 0; j < elementsByTag.length; j++) {
                    var elem = elementsByTag[j];

                    if (tag === 'select') {
                        if (elem.getAttribute('multiple') !== null) { // select2 multiselect
                            $(elem).val('');
                        }
                        else { // regular select
                            elem.selectedIndex = 0;
                        }

                        // For select2 use jquery event.
                        $(elem).change();
                    }
                    else {
                        var typeName = (tag === 'input' ? elem.getAttribute("type").toLowerCase() : '');

                        if (typeName === 'checkbox' || typeName === 'radio') {
                            // Check if a specific reset value (true or false) defined as attribute.
                            var resetVal = elem.getAttribute('data-default-val');

                            if (resetVal) {
                                elem.checked = resetVal;
                            }
                            else {
                                elem.checked = false;
                            }
                        }
                        else {
                            // For other input and textarea elements
                            elem.value = '';
                        }
                    }
                }
            }
        },

        proxySuccessCallback: function (response) {
            // Save response object in form properties.
            Felece.Form.Props.proxyResponse = response;

            // Set proxy function response success value.
            Felece.Form.Props.successfulSubmission = response.ResponseCode === 200;

            // Apply UX "form submitted" approach after proxy response.
            Felece.Form.UX.submitted();
        },

        proxyErrorCallback: function (response) {
            // Save response object in form properties.
            Felece.Form.Props.proxyResponse = response;

            // Set proxy function response success value.
            Felece.Form.Props.successfulSubmission = false;

            // Apply UX "form submitted" approach after proxy response.
            Felece.Form.UX.submitted();
        },

        customSuccessCallback: function () {
            // Set function response success value.
            Felece.Form.Props.successfulSubmission = true;

            // Apply UX "form submitted" approach after response.
            Felece.Form.UX.submitted();
        },

        reset: function (arg) {
            // Retrieve parameters through arg.
            var sender = arg.sender;
            var isReload = arg.isReload;

            Felece.Form.Actions.init();

            if (isReload) {
                window.location.reload(false);
            }
        },

        goBack: function (arg) {
            // As default, confirmation alert is not called.
            if (arg.confirm) {
                arg.confirm = false;

                // Check if custom confirmation-dialog properties object is passed.
                if (arg.confirmProps) {
                    // Generate variable dynamically based on string value.
                    var confirmationCustomProps = window[arg.confirmProps];
                }
                else {
                    confirmationCustomProps = { Fire: {} };
                }

                // Set callback function on confirmation which directs back to here.
                confirmationCustomProps.Fire.funcName = 'Felece.Form.Actions.goBack';
                confirmationCustomProps.Fire.funcArgs = arg;

                // Call confirmation-dialog box.
                Felece.Notification.Actions.confirmationDialog(confirmationCustomProps);
                return false;
            }

            window.history.back();
        },

        changeMode: function (arg) {
            // arg.mode: boolean (mandatory - edit or insert)
            // arg.selector: string (mandatory - container selector name that contains the form)
            // arg.isModal: boolean (optional - if not specified, default value is true)
            // arg.formId: string (optional - if not specified, first form element is taken in the container)
            // arg.responseHtml: string (optional - edit mode uses proxy function, and the html from response object is needed to replace the form content)

            var mode = arg.mode;
            var containerElem = document.querySelector(arg.selector);
            var isModal = arg.isModal !== false;
            var formElem = arg.formId === undefined ? containerElem.querySelector('form') : document.getElementById(arg.formId);
            var formHtml = arg.responseHtml;

            // Retrieve insert and edit mode related elements.
            // Those will be displayed or hidden based on the mode.
            var insertRelatedElements = containerElem.querySelectorAll('[data-mode=insert]');
            var editModeRelatedElements = containerElem.querySelectorAll('[data-mode=edit]');

            if (mode === "insert") {
                // Display insert-mode related elements.
                for (var i = 0; i < insertRelatedElements.length; i++) {
                    insertRelatedElements[i].style.display = "flex";
                }

                // Hide edit-mode related elements.
                for (var e = 0; e < editModeRelatedElements.length; e++) {
                    editModeRelatedElements[e].style.display = "none";
                }

                // Reset and prepare form.
                Felece.Form.ready();
                Felece.Form.Props.formElem = formElem;
                Felece.Form.Actions.clear();
                Felece.Validation.Actions.clear();

                // Show modal
                if (isModal) {
                    $(containerElem).modal('show');
                }
            }
            else if (mode === "edit") {
                // Hide insert-mode related elements.
                for (i = 0; i < insertRelatedElements.length; i++) {
                    insertRelatedElements[i].style.display = "none";
                }

                // Display edit-mode related elements.
                for (e = 0; e < editModeRelatedElements.length; e++) {
                    editModeRelatedElements[e].style.display = "flex";
                }

                // Update form content of specified place holder.
                var partialPlaceholder = containerElem.querySelector('[data-form-placeholder]');
                partialPlaceholder.innerHTML = formHtml;

                // Reset and prepare form.
                Felece.Form.ready();
                Felece.Form.Props.formElem = formElem;

                // Setup select2 elements.
                Felece.Select2.Actions.init({ containerSelector: formElem });

                // Setup masked elements.
                Felece.Mask.Actions.init({ containerSelector: formElem });

                // Show modal
                if (isModal) {
                    $(containerElem).modal('show');
                }
            }
        }
    },

    UX: {
        presubmitting: function () {
            // Add presubmitting class.
            Felece.Form.Props.formElem.classList.add('lc-presubmitting');

            // Set modal properties.
            if (Felece.Form.Props.isModal) {
                Felece.Modal.Actions.setProperties();
            }
        },

        submitting: function () {
            // Add submitting class
            Felece.Form.Props.formElem.classList.remove('lc-presubmitting');
            Felece.Form.Props.formElem.classList.add('lc-submitting');

            // Add button spinner.
            var spinnerColour = "spinner-" + Felece.Form.Props.spinnerColor;
            var spinnerPosition = "spinner-" + Felece.Form.Props.spinnerPosition;
            Felece.Form.Props.submitButton.classList.add('spinner', spinnerColour, spinnerPosition);
        },

        submitted: function () {
            if (Felece.Form.Props.isModal) {
                // If isModal, then hide action buttons and show related feedback.
                // First check if for submission is successful.
                if (Felece.Form.Props.successfulSubmission) {
                    // Display success feedback in modal.
                    Felece.Notification.Actions.ModalForm.displaySuccess();

                    if (Felece.Form.Props.submitButtonParam.onSubmit === "refreshPage") {
                        setTimeout(function () {
                            window.location.reload(false);
                        }, Felece.Form.Props.modalFeedbackTimeout);
                    }
                    else {
                        if (Felece.Form.Props.submitButtonParam.onSubmit === "refreshKendo") {
                            // Check if kendo needs to be refreshed.
                            var kendoSelector = Felece.Form.Props.submitButtonParam.kendoSelector;
                            Felece.Kendo.Actions.refresh(kendoSelector);
                        }
                        else if (Felece.Form.Props.submitButtonParam.onSubmit === "refreshHtml") {
                            // By giving selector name, renew html list.
                            var htmlSelector = Felece.Form.Props.submitButtonParam.htmlSelector;
                            var htmlListContainer = document.querySelector(htmlSelector);
                            htmlListContainer.innerHTML = Felece.Form.Props.proxyResponse.Html;
                        }
                        else if (Felece.Form.Props.submitButtonParam.onSubmit === "refreshKendoOrHtml") {
                            // By giving selector name, check if kendo exists or html list container exists. If kendo 
                            // exists, refresh kendo or renew html list.
                            kendoSelector = Felece.Form.Props.submitButtonParam.kendoSelector;
                            htmlSelector = Felece.Form.Props.submitButtonParam.htmlSelector;

                            var kendoGridExists = document.querySelector(kendoSelector) !== null;
                            var htmlListExists = document.querySelector(htmlSelector) !== null;

                            if (kendoGridExists) {
                                Felece.Kendo.Actions.refresh(kendoSelector);
                            }
                            else if (htmlListExists) {
                                htmlListContainer = document.querySelector(htmlSelector);
                                htmlListContainer.innerHTML = Felece.Form.Props.proxyResponse.Html;
                            }
                        }
                    }
                }
                else if (!Felece.Form.Props.successfulSubmission) {
                    // Display error feedback in modal
                    Felece.Notification.Actions.ModalForm.displayError();
                }

                if (Felece.Form.Props.submitButtonParam.formClear !== false) {
                    // Clear form fields.
                    Felece.Form.Actions.clear();
                }

                // Clear Validation.
                Felece.Validation.Actions.clear();

                // Scroll to top.
                $(Felece.Modal.Props.modalBody).animate({ scrollTop: 0 }, 300);

                // Reset current form UX setup.
                Felece.Form.UX.cancel();

                Felece.Form.Props.modalSetTimeout = setTimeout(function () {
                    Felece.Form.UX.modalSetTimeoutFunc();

                    // Clear timeout because 'detectHiding' function in Felece.Modal.Base.js will call modalSetTimeoutFunc if modal is manually closed. 
                    // If you clear the Felece.Form.Props.modalSetTimeout, then 'detectHiding' function will not trigger 'modalSetTimeoutFunc' function.
                    clearTimeout(Felece.Form.Props.modalSetTimeout);
                    Felece.Form.Props.modalSetTimeout = null;
                }, Felece.Form.Props.modalFeedbackTimeout);
            }
            else if (!Felece.Form.Props.isModal) {
                // First check if for submission is successful.
                if (Felece.Form.Props.successfulSubmission) {
                    // Display success feedback on page.
                    Felece.Notification.Actions.PageForm.displaySuccess();

                    // If form is submitted then submitButtonParam exists, but if row action triggered then it is 
                    // not a form and submitButtonParam does not exist.
                    if (Felece.Form.Props.submitButtonParam) {
                        if (Felece.Form.Props.submitButtonParam.formClear !== false) {
                            // Clear form fields.
                            Felece.Form.Actions.clear();
                        }

                        // Check if kendo needs to be refreshed.
                        if (Felece.Form.Props.submitButtonParam.onSubmit === "refreshKendo") {
                            kendoSelector = Felece.Form.Props.kendoSelector;
                            Felece.Kendo.Actions.refresh(kendoSelector);
                        }
                    }
                }
                else {
                    // Display error feedback on page.
                    Felece.Notification.Actions.PageForm.displayError();
                }

                // If form is submitted then submitButtonParam exists, but if row action triggered then it is 
                // not a form and submitButtonParam does not exist.Row actions use form callback functions.
                if (Felece.Form.Props.submitButtonParam) {
                    // Clear Validation.
                    Felece.Validation.Actions.clear();

                    // Reset current form UX setup.
                    Felece.Form.UX.cancel();

                    if (Felece.Form.Props.submitButtonParam.scrollTop !== false) {
                        // Scroll to top.
                        $("html, body").animate({ scrollTop: 0 }, 300);
                    }
                }

                // Reset form json properties.
                Felece.Form.Actions.init();
            }
        },

        modalSetTimeoutFunc: function () {
            // Hide or keep modal if specified.
            if (Felece.Form.Props.submitButtonParam.onSubmit === "keepModal") {
                Felece.Modal.Actions.Form.resetElements();
                Felece.Modal.Actions.init();
            }
            else if (Felece.Form.Props.submitButtonParam.onSubmit !== "keepModal") {
                Felece.Modal.Actions.hide();
            }

            setTimeout(function () {
                // Reset form json properties.
                Felece.Form.Actions.init();
            }, 700);
        },

        cancel: function () {
            // Enable sender button.
            Felece.Form.Props.submitButton.disabled = false;

            // Remove button spinner.
            var spinnerColour = "spinner-" + Felece.Form.Props.spinnerColor;
            var spinnerPosition = "spinner-" + Felece.Form.Props.spinnerPosition;
            Felece.Form.Props.submitButton.classList.remove('spinner', spinnerColour, spinnerPosition);

            // Remove UX related form css classes.
            Felece.Form.Props.formElem.classList.remove('lc-presubmitting');
            Felece.Form.Props.formElem.classList.remove('lc-submitting');
        },

        ReCaptcha: {
            valid: function () {
                var reCaptchaElem = Felece.Form.Props.reCaptchaElem;
                reCaptchaElem.querySelector('iframe').classList.remove('lc-reCaptcha-invalid');
            },

            invalid: function () {
                var reCaptchaElem = Felece.Form.Props.reCaptchaElem;
                reCaptchaElem.querySelector('iframe').classList.add('lc-reCaptcha-invalid');
            }
        }
    }
};

Felece.Form.ready();