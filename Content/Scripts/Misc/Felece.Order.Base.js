Felece.Order = {

    Props: {
        stepOneId: "stepOne",
        stepTwoId: "stepTwo",
        stepThreeId: "stepThree",
        stepFourId:"stepFour",
        stepFiveId: "stepFive",
        stepOneRefundId: "stepOneRefund",
        stepTwoRefundId: "stepTwoRefund",
        stepOneCancelId: "stepOneCancel",
        stepTwoCancelId: "stepTwoCancel",
        stepThreeCancelId: "stepThreeCancel",
        copuonHeaderId: "copuonHeader",
        allCouponId: "allCoupon",
        activeCouponId: "activeCoupon",
        expiredCouponId: "expiredCoupon",
        
    },

    Elements: {},

    Current: {

    },

    Actions: {

        init: function () {

            Felece.Order.Helper.setCurrent();
            Felece.Order.Helper.setElements();
        },
        nextReviewStepTwo : function (arg) {

            
            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Order.Elements;
            var current = Felece.Order.Current;

            elements.stepOneEl.style.display = "none";
            elements.stepTwoEl.removeAttribute("style");
        },
        nextReviewStepThree :function (arg) {

            
            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Order.Elements;
            var current = Felece.Order.Current;

            elements.stepTwoEl.style.display = "none";
            elements.stepThreeEl.removeAttribute("style");
        },
        nextReviewStepFour: function (arg) {

            
            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Order.Elements;
            var current = Felece.Order.Current;

            elements.stepThreeEl.style.display = "none";
            elements.stepFourEl.removeAttribute("style");
        },
        nextReviewStepFive: function (arg) {

            
            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Order.Elements;
            var current = Felece.Order.Current;

            elements.stepFourEl.style.display = "none";
            elements.stepFiveEl.removeAttribute("style");
        },
        nextRefundStepTwo: function (arg) {

            
            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Order.Elements;
            var current = Felece.Order.Current;

            elements.stepOneRefundEl.style.display = "none";
            elements.stepTwoRefundEl.removeAttribute("style");
        },
        nextCancelStepTwo: function (arg) {

            
            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Order.Elements;
            var current = Felece.Order.Current;

            elements.stepOneCancelEl.style.display = "none";
            elements.stepTwoCancelEl.removeAttribute("style");
        },
        nextCancelStepThree: function (arg) {

            
            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Order.Elements;
            var current = Felece.Order.Current;

            elements.stepTwoCancelEl.style.display = "none";
            elements.stepThreeCancelEl.removeAttribute("style");
        },
       

        showAllCopuon: function(arg) {

            
            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Order.Elements;
            var current = Felece.Order.Current;


            if (!sender.classList.contains("on")) {
                elements.copuonHeaderEl.querySelector("a.on").classList.remove("on");
                sender.classList.add("on");
                elements.allCouponEl.removeAttribute("style");
                elements.activeCouponEl.style.display = "none";
                elements.expiredCouponEl.style.display = "none";
              
            } 

        },
        showActiveCopuon: function(arg) {

            
            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Order.Elements;
            var current = Felece.Order.Current;

            if (!sender.classList.contains("on")) {
                elements.copuonHeaderEl.querySelector("a.on").classList.remove("on");
                sender.classList.add("on");
                elements.activeCouponEl.removeAttribute("style");
                elements.allCouponEl.style.display = "none";
                elements.expiredCouponEl.style.display = "none";
             

            }

        },
        showAExpiredCopuon: function(arg) {
            
            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Order.Elements;
            var current = Felece.Order.Current;

            if (!sender.classList.contains("on")) {
                elements.copuonHeaderEl.querySelector("a.on").classList.remove("on");
                sender.classList.add("on");
                elements.expiredCouponEl.removeAttribute("style");
                elements.allCouponEl.style.display = "none";
                elements.activeCouponEl.style.display = "none";
            }
        },
        
    },

    Helper: {
        setCurrent: function () {
            Felece.Order.Current = {
                state: null,
                selectedCompare:0,

            };
        },

        setElements: function () {
            var props = Felece.Order.Props;
            var elements = Felece.Order.Elements;
            elements.stepOneEl = document.getElementById(props.stepOneId);
            elements.stepTwoEl = document.getElementById(props.stepTwoId);
            elements.stepThreeEl = document.getElementById(props.stepThreeId);
            elements.stepOneRefundEl = document.getElementById(props.stepOneRefundId);
            elements.stepTwoRefundEl = document.getElementById(props.stepTwoRefundId);
            elements.stepOneCancelEl = document.getElementById(props.stepOneCancelId);
            elements.stepTwoCancelEl = document.getElementById(props.stepTwoCancelId);
            elements.stepThreeCancelEl = document.getElementById(props.stepThreeCancelId);
            elements.copuonHeaderEl = document.getElementById(props.copuonHeaderId);
            elements.allCouponEl = document.getElementById(props.allCouponId);
            elements.activeCouponEl = document.getElementById(props.activeCouponId);
            elements.expiredCouponEl = document.getElementById(props.expiredCouponId);
            elements.stepFourEl = document.getElementById(props.stepFourId);
            elements.stepFiveEl = document.getElementById(props.stepFiveId);
            
        }
    }
};

Felece.Order.Actions.init();