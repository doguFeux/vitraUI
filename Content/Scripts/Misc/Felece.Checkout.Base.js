Felece.Checkout = {

    Props: {
        mainAreaId: "mainArea",
        summaryContainerId: "summaryContainer",
        firstBottomSectionId: "firstBottomSection",
        indivudalAreaId: "indivudalArea",
        coorpareteAreaId: "coorpareteArea",
        adressSelectionAreaId: "adressSelectionArea",
        aggrementFieldFormId: "aggrementFieldForm",
        creditInfoFormId: "creditInfoForm",

    },

    Elements: {},

    Current: {

    },

    Actions: {

        init: function () {

            Felece.Checkout.Helper.setCurrent();
            Felece.Checkout.Helper.setElements();

            var elements = Felece.Checkout.Elements;
            var current = Felece.Checkout.Current;

            if (Felece.Base.Props.MediaQ.Curr.key !== 'XS1') {
                elements.summaryContainerEl.style.top = elements.mainAreaEl.offsetTop + "px";
                if (elements.firstBottomSectionEl) {
                    elements.summaryContainerEl.style.bottom = parseInt(elements.firstBottomSectionEl.offsetHeight + 84) + "px";
                }
            }



        },

        applyCupounCode: function (arg) {

            arg.ev.preventDefault();
            var sender = arg.sender;

            var cupounCodeContainerEl = document.getElementById("cupounCodeContainer");

            if (cupounCodeContainerEl.classList.contains("on")) {
                cupounCodeContainerEl.classList.remove("on");
            } else {
                cupounCodeContainerEl.classList.add("on");

            }


        },

        BasketApproved: function (arg) {


            arg.ev.preventDefault();
            var sender = arg.sender;
            if (sender.disabled) { return false; }
            sender.disabled = true;

            var elements = Felece.Checkout.Elements;
            var current = Felece.Checkout.Current;


            // Return if form is not valid.
            var isValid = $('#creditInfoForm').valid();
            var isValid2 = $('#aggrementFieldForm').valid();

            if (!(isValid && isValid2)) {
                sender.disabled = false;
                return;
            }


            formCollect({ current: Felece.Checkout.Current, container: elements.creditInfoFormEl, dataObject: current.data.creditInfo });

            //Felece.Modal.Actions.show({
            //    ev: event,
            //    sender: this,
            //    type: "drw",
            //    contentId: "loginModal",
            //    size: "lg",
            //    dir: ["r2l"],
            //    esc: true,
            //    overlay: false
            //});
        },

        creditCardNameType: function (arg) {

            var sender = arg.sender;
            var elements = Felece.Checkout.Elements;
            var current = Felece.Checkout.Current;

            var cardNumberContainerEl = document.getElementById("nameSurnameContainer");

            cardNumberContainerEl.innerHTML = sender.value;

            if (!sender.value.length) {
                cardNumberContainerEl.innerHTML = "Adınız Soyadınız";
            }


        },
        creditCardDateType: function (arg) {

            var sender = arg.sender;
            var elements = Felece.Checkout.Elements;
            var current = Felece.Checkout.Current;

            var cardNumberContainerEl = document.getElementById("lastDateContainer");

            cardNumberContainerEl.innerHTML = sender.value;

            if (!sender.value.length) {
                cardNumberContainerEl.innerHTML = "MM/YY";
            }


        },


        creditCardNumberChange: function (arg) {


            var sender = arg.sender;
            var elements = Felece.Checkout.Elements;
            var current = Felece.Checkout.Current;


            var cardNumberPlaceHolder = document.getElementById("cardNumberContainer");
            cardNumberPlaceHolder.innerHTML = sender.value;

        },
        creditCardNumberChange: function (arg) {


            var sender = arg.sender;
            var elements = Felece.Checkout.Elements;
            var current = Felece.Checkout.Current;

            debugger;

            if (current.cCardNumberChange !== null) {
                clearTimeout(current.cCardNumberChange);
            }

            current.cCardNumberChange = setTimeout(function () {

                var firsNumber = sender.value.substring(0, 1);
                var creditCartIcon = document.getElementById("cardIconContainer");
                var cardNumbers = sender.value.replace(/[^0-9\.]+/g, '');

                creditCartIcon.classList.remove("icon-visa");
                creditCartIcon.classList.remove("icon-master");
                creditCartIcon.classList.remove("icon-troy");
                creditCartIcon.classList.remove("icon-american");

                if (firsNumber === "4") {
                    creditCartIcon.classList.add("icon-visa");
                }
                else if (firsNumber === "5") {
                    creditCartIcon.classList.add("icon-master");
                }
                else if (firsNumber === "9") {
                    creditCartIcon.classList.add("icon-troy");
                }
                else if (firsNumber === "3") {
                    creditCartIcon.classList.add("icon-american");
                }
                if (cardNumbers.length > 5) {

                    var paymentInfoAreaHeight = document.querySelector('#paymentInfoArea').offsetHeight + 40;
                    document.querySelector('#paymentInfoContainer').style.height = paymentInfoAreaHeight + "px";
                    document.querySelector('#paymentInfoContainer').classList.add("on");

                } else {
                    document.querySelector('#paymentInfoContainer').style.height = 0;
                    document.querySelector('#paymentInfoContainer').classList.remove("on");
                }
            }, 200);
        },

        creditCardNumberType: function (e, sender) {
            var ccNumberVal = sender.value.replace(/[^0-9\.]+/g, '');
            if (ccNumberVal.length > 5) {
                var ccNumberValTruncated = ccNumberVal.substring(0, 6);
                var lastCcNumberVal = Felece.Checkout.Status.ccNumberVal;
                var getAgain = false;

                if (lastCcNumberVal) {
                    if (ccNumberValTruncated !== lastCcNumberVal) {
                        getAgain = true;
                    }
                }
                else {
                    getAgain = true;
                }
                if (getAgain) {
                    Felece.Checkout.Status.ccNumberVal = ccNumberValTruncated;
                    Felece.Checkout.getPaymentOptions(ccNumberValTruncated);
                }
            }
        },

        selecetIndividual: function (arg) {

            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Checkout.Elements;

            if (!sender.classList.contains("on")) {
                var currentActiveTab = elements.adressSelectionAreaEl.querySelector("a.on");
                if (currentActiveTab) {
                    currentActiveTab.classList.remove("on");
                }
                sender.classList.add("on");
                elements.indivudalAreaEl.removeAttribute("style");
                elements.coorpareteAreaEl.style.display = "none";

            } else {
                return;
            }

        },
        selectCoorparate: function (arg) {

            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Checkout.Elements;

            if (!sender.classList.contains("on")) {
                var currentActiveTab = elements.adressSelectionAreaEl.querySelector("a.on");
                if (currentActiveTab) {
                    currentActiveTab.classList.remove("on");
                }
                sender.classList.add("on");
                elements.indivudalAreaEl.style.display = "none";
                elements.coorpareteAreaEl.style.display = "block";
            } else {
                return;
            }

        },

        toggleSummary: function (arg) {
            if (arg) arg.ev.preventDefault();
            var sender = document.getElementById("summaryLinkButton");
            var summaryElement = document.getElementById("summaryContainer");
            var subSummaryElement = summaryElement.querySelector(".comp-aside-01");


            var headerElem = Felece.Globals.headerElem;
            var overlayElem = Felece.Globals.overlayWrElem;

            if (sender.classList.contains("on")) {

                Felece.Globals.pageWr.insertBefore(overlayElem, null);
                sender.classList.remove("on")
                summaryElement.removeAttribute("style");
                subSummaryElement.classList.remove("on");
                Felece.Globals.overlayWrElem.classList.remove("on");


            } else {

                Felece.Globals.contentWr.insertBefore(overlayElem, Felece.Globals.contentWr.childNodes[0]);
                sender.classList.add("on")
                summaryElement.style.display = "block";
                summaryElement.classList.add("on")
                subSummaryElement.classList.add("on");
                Felece.Globals.overlayWrElem.classList.add("on");
            }
        },
    },

    Helper: {
        setCurrent: function () {
            Felece.Checkout.Current = {
                state: null,
                selectedCompare: 0,
                index: 0,
                lastIndexCount: 0,
                cCardNumberChange: null,
                data: {
                    creditInfo: {}
                }

            };
        },

        setElements: function () {
            var props = Felece.Checkout.Props;
            var elements = Felece.Checkout.Elements;

            elements.mainAreaEl = document.getElementById(props.mainAreaId);
            elements.summaryContainerEl = document.getElementById(props.summaryContainerId);
            elements.firstBottomSectionEl = document.getElementById(props.firstBottomSectionId);
            elements.indivudalAreaEl = document.getElementById(props.indivudalAreaId);
            elements.coorpareteAreaEl = document.getElementById(props.coorpareteAreaId);
            elements.adressSelectionAreaEl = document.getElementById(props.adressSelectionAreaId);
            elements.aggrementFieldFormEl = document.getElementById(props.aggrementFieldFormId);
            elements.creditInfoFormEl = document.getElementById(props.creditInfoFormId);




        }
    }
};

Felece.Checkout.Actions.init();