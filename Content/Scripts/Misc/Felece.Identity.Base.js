Felece.Confirmation = {};


Felece.Confirmation = {
    confirmCodeEvents: {
        Status: {
            confirmCode: "",
            goBeforeInput: ""
        },

        init: function () {
            Felece.Confirmation.confirmCodeEvents.handlePaste();
            Felece.Confirmation.confirmCodeEvents.handlePasteClone();
        },

        inputChange: function (sender, nextInput) {
            if (nextInput !== "submit" && nextInput !== "submitClone") {
                if (sender.value.length > 0) {
                    document.getElementById(nextInput).focus();
                }
            }
            else {
                if (nextInput === "submitClone") {
                    Felece.Confirmation.confirmCodeEvents.submitClone();

                } else {
                    Felece.Confirmation.confirmCodeEvents.submit();
                }
            }

            if (document.getElementById("modal-content").classList.contains("invalid")) {
                document.getElementById("modal-content").classList.remove("invalid");
            }


        },

        onkeydown: function (sender, event, beforeInput) {
            if (beforeInput !== "first" && event.keyCode === 8) {
                Felece.Confirmation.confirmCodeEvents.Status.goBeforeInput = beforeInput;
            }
            else {
                Felece.Confirmation.confirmCodeEvents.Status.goBeforeInput = "";
            }
        },

        handlePaste: function () {
            var inputs = document.querySelectorAll('#confirmCodeInputsContainer input');

            for (var i = 0; i < inputs.length; i++) {
                inputs[i].addEventListener('paste', (event) => {
                    event.preventDefault();

                    var paste = (event.clipboardData || window.clipboardData).getData('text');
                    var values = paste.split("");

                    for (var j = 0; j < inputs.length; j++) {
                        if (values[j]) {
                            inputs[j].value = values[j];
                        }
                    }

                    Felece.Confirmation.confirmCodeEvents.submit();
                });
            }
        },

        submit: function () {
            var inputs = document.querySelectorAll('#confirmCodeInputsContainer input');
            var confirmCode = "";


            for (var i = 0; i < inputs.length; i++) {
                var input = inputs[i];
                if (input.value.length === 0) { break; }
                confirmCode = confirmCode + input.value;
            }

            if (confirmCode.length === 6) {

                /// here send code to phone number check proxt like below example:

                //ProxyURL(confirmCode, current.phoneNumber, 0, function (response) {
                //    if (response.ReturnCode == 200) {
                //        console.log(response.SuccessMessage)
                //        Felece.Modal.hide(false);
                //    } else {
                //        document.getElementById("modal-content").classList.add("invalid");
                //    }
                //}, null)


            }
        },

        handlePasteClone: function () {
            var inputs = document.querySelectorAll('#confirmCodeInputsCloneContainer input');

            for (var i = 0; i < inputs.length; i++) {
                inputs[i].addEventListener('paste', (event) => {
                    event.preventDefault();
                    var paste = (event.clipboardData || window.clipboardData).getData('text');

                    var values = paste.split("");
                    for (var j = 0; j < inputs.length; j++) {
                        if (values[j]) {
                            inputs[j].value = values[j];
                        }
                    }

                    Felece.Confirmation.confirmCodeEvents.submitClone();
                });
            }
        },

        submitClone: function () {
            var inputs = document.querySelectorAll('#confirmCodeInputsCloneContainer input');
            var confirmCode = "";

            for (var i = 0; i < inputs.length; i++) {
                var input = inputs[i];
                if (input.value.length === 0) { break; }
                confirmCode = confirmCode + input.value;
            }

            if (confirmCode.length === 6) {

            }
        },

        timerEnd: function () {
            document.getElementById("expiredContainer").classList.add("expried");
            document.getElementById("modal-content").classList.add("expried");
        },

        getNewCode: function () {

            var current = Felece.Identity.Current;
            var inputs = document.querySelectorAll('#confirmCodeInputsContainer input');

            for (var i = 0; i < inputs.length; i++) {
                inputs[i].value = "";
            }
            document.getElementById("expiredContainer").classList.remove("expried");
            document.getElementById("modal-content").classList.remove("expried");

            document.querySelector("[data-time-counter]").setAttribute("data-time-counter", new Date(new Date().getTime() + 3 * 60000))
            if (current.confirmCodeStatus.interval) {
                clearInterval(current.confirmCodeStatus.interval);
            }
            Felece.Confirmation.confirmCodeEvents.startTimer(Felece.Confirmation.confirmCodeEvents.timerEnd);


        },

        goBack: function () {
        },


        startTimer: function (func) {

            
            var current = Felece.Identity.Current;
            var timerData = document.querySelector("[data-time-counter]");
            if (timerData) {
                var time = new Date(timerData.getAttribute("data-time-counter"));


                var dayElem = timerData.querySelector("[data-timer-day]");
                var hourElem = timerData.querySelector("[data-timer-hour]");
                var minuteElem = timerData.querySelector("[data-timer-minute]");
                var secondElem = timerData.querySelector("[data-timer-second]");

                var t = secondElem ? 1000 : 1000 * 60;

                current.confirmCodeStatus.interval = setInterval(function () {
                    // Get today's date and time
                    var now = new Date();

                    // Find the distance between now and the count down date
                    var distance = time - now;

                    // Time calculations for days, hours, minutes and seconds
                    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
                        if (func) {
                            func();
                        }
                    }
                    else {
                        minutes = minutes.toString();
                        hours = hours.toString();
                        seconds = seconds.toString();


                        if (dayElem) {
                            dayElem.innerHTML = days;
                        }
                        if (hourElem) {
                            hourElem.innerHTML = hours;
                        }
                        if (minuteElem) {
                            minuteElem.innerHTML = minutes.length < 2 ? ("0" + minutes) : minutes;
                        }
                        if (secondElem) {
                            secondElem.innerHTML = seconds.length < 2 ? ("0" + seconds) : seconds;
                        }
                    }

                }, t);
            }
        }
    }
};
Felece.Identity = {

    Props: {
        passwordId: "CurrentPassword",
        newPasswordId: "NewPassword",
        secondPasswordId: "ConfirmNewPassword",
        smsConfirmationId: "smsCofirmContent",
        registerContainerId: "registerContent",
        approvalsContentId: "approvalsContent",
        stepperLineId: "stepperLine",
        signUpResultId: "signUpResult",
        forgotPassContentId: "forgotPassContent",
        emailCofirmContentId: "emailCofirmContent",
        forgotResultId: "forgotResult",
        resetPassContainerId:"resetPassContainer",
        resetPassResultContainerId: "resetPassResultContainer",
        

    },

    Elements: {},

    Current: {

    },

    Actions: {

        init: function () {

            Felece.Identity.Helper.setCurrent();
            Felece.Identity.Helper.setElements();
        },
        overlayClick: function (arg) {
            Felece.Identity.Actions.toggleSummary();
        },
        toggleCheck: function (sender) {


            var elements = Felece.Identity.Elements;
            var current = Felece.Identity.Current;

            var containerEl = findAncestor(sender, sender.getAttribute("data-parent-selector"));
            var selectionType = sender.getAttribute("data-selection");
            current.approvedSelection = selectionType;


            if (sender.type === "radio") {


                var radioGroup = document.querySelectorAll("[name='" + sender.name + "']");

                for (var i = 0; i < radioGroup.length; i++) {
                    var radio = radioGroup[i];
                    var parent = findAncestor(radio, radio.getAttribute("data-parent-selector"));
                    if (parent.classList.contains("on")) {
                        parent.classList.remove("on");
                    }
                }

                if (sender.checked) {
                    containerEl.classList.add("on");
                }

            }
            else {
                if (!sender.checked) {
                    containerEl.classList.remove("on");
                }
                else {
                    containerEl.classList.add("on");
                }
            }
        },

        openSingupScreen: function (arg) {

            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Identity.Elements;
            var current = Felece.Identity.Current;
            sender.disabled = true;

            setTimeout(function () {

                sender.disabled = false;
            }, 1000);


            Felece.Modal.Actions.closeClick({ ev: arg.ev, sender: this });

            setTimeout(function () {

                Felece.Modal.Actions.show({
                    ev: arg.ev,
                    sender: this,
                    type: "drw",
                    contentId: "smsModal",
                    size: "lg",
                    dir: ["r2l"],
                    esc: true,
                    overlay: false
                });

            }, 1000);


        },
        openforgotScreen: function (arg) {

            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Identity.Elements;
            var current = Felece.Identity.Current;
            sender.disabled = true;

            setTimeout(function () {

                sender.disabled = false;
            }, 1000);


            Felece.Modal.Actions.closeClick({ ev: arg.ev, sender: this });

            setTimeout(function () {

                Felece.Modal.Actions.show({
                    ev: arg.ev,
                    sender: this,
                    type: "drw",
                    contentId: "forgotModal",
                    size: "lg",
                    dir: ["r2l"],
                    esc: true,
                    overlay: false
                });
            }, 1000);


        },

     
        nextConfirmationModal: function (arg) {

            
            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Identity.Elements;
            var current = Felece.Identity.Current;

            elements.registerContainerEl.style.display = "none";
            elements.smsConfirmationEl.style.display = "block";

            elements.stepperLineEl.querySelector("a.on").classList.remove("on");

            document.getElementById("smsConfLink").classList.add("on");


            document.querySelector("[data-time-counter]").setAttribute("data-time-counter", new Date(new Date().getTime() + 3 * 60000))

            if (current.confirmCodeStatus.interval) {
                clearInterval(current.confirmCodeStatus.interval);
            }

            Felece.Confirmation.confirmCodeEvents.startTimer(Felece.Confirmation.confirmCodeEvents.timerEnd);


        },
        nextApprovalContent: function (arg) {

            
            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Identity.Elements;
            var current = Felece.Identity.Current;

            elements.smsConfirmationEl.style.display = "none";
            elements.approvalsContentEl.style.display = "block";

            elements.stepperLineEl.querySelector("a.on").classList.remove("on");

            document.getElementById("approvalsLink").classList.add("on");

        },
        signUp: function (arg) {

            
            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Identity.Elements;
            var current = Felece.Identity.Current;

            elements.approvalsContentEl.style.display = "none";
            elements.signUpResultEl.style.display = "block";
            elements.stepperLineEl.style.display = "none";

        },
        nextConfirmation: function (arg) {

            
            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Identity.Elements;
            var current = Felece.Identity.Current;

            elements.forgotPassContentEl.style.display = "none";

            if (current.approvedSelection == "email") {
                elements.emailCofirmContentEl.style.display = "block";
            }
            else if (current.approvedSelection == "phone") {

                elements.smsConfirmationEl.style.display = "block";

                document.querySelector("[data-time-counter]").setAttribute("data-time-counter", new Date(new Date().getTime() + 3 * 60000))

                if (current.confirmCodeStatus.interval) {
                    clearInterval(current.confirmCodeStatus.interval);
                }

                Felece.Confirmation.confirmCodeEvents.startTimer(Felece.Confirmation.confirmCodeEvents.timerEnd);

            }


        },

        nextSmsConfirm: function (arg) {

            
            arg.ev.preventDefault();


            var sender = arg.sender;
            var elements = Felece.Identity.Elements;
            var current = Felece.Identity.Current;

            elements.smsConfirmationEl.style.display = "none";
            elements.forgotResultEl.style.display = "block";


        },

        resetPassword: function (arg) {

            
            arg.ev.preventDefault();


            var sender = arg.sender;
            var elements = Felece.Identity.Elements;
            var current = Felece.Identity.Current;

            elements.resetPassContainerEl.style.display = "none";
            elements.resetPassResultContainerEl.removeAttribute("style");


        },
        nextEmailConfirm: function (arg) {

            
            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Identity.Elements;
            var current = Felece.Identity.Current;

            elements.emailCofirmContentEl.style.display = "none";
            elements.forgotResultEl.style.display = "block";


        },
    },

    Helper: {
        setCurrent: function () {
            Felece.Identity.Current = {
                state: null,
                approvedSelection: "",
                status: null,
                submitter: null,
                submitterArg: {},
                confirmCodeStatus: {
                    interval: null
                }

            };
        },

        setElements: function () {
            var props = Felece.Identity.Props;
            var elements = Felece.Identity.Elements;

            elements.passwordEl = document.getElementById(props.passwordId);
            elements.newPasswordEl = document.getElementById(props.newPasswordId);
            elements.secondPasswordEl = document.getElementById(props.secondPasswordId);
            elements.registerContainerEl = document.getElementById(props.registerContainerId);
            elements.smsConfirmationEl = document.getElementById(props.smsConfirmationId);
            elements.approvalsContentEl = document.getElementById(props.approvalsContentId);
            elements.stepperLineEl = document.getElementById(props.stepperLineId);
            elements.signUpResultEl = document.getElementById(props.signUpResultId);
            elements.forgotPassContentEl = document.getElementById(props.forgotPassContentId);
            elements.emailCofirmContentEl = document.getElementById(props.emailCofirmContentId);
            elements.forgotResultEl = document.getElementById(props.forgotResultId);
            elements.resetPassContainerEl = document.getElementById(props.resetPassContainerId);
            elements.resetPassResultContainerEl = document.getElementById(props.resetPassResultContainerId);
          


        }
    }
};

Felece.Identity.Actions.init();