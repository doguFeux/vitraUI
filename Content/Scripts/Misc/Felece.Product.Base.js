Felece.Product = {

    Props: {
        firstStepContainerId: "firstStepContainer",
        secondStepContainerId: "secondStepContainer",
        thirdStepContainerId:"thirdStepContainer",
        stepResultContainerId: "stepResultContainer",
        currentPageId: "currentPage",
        modalHeaderId: "modal-header",
        compareItemCountId: "compareItemCount",
        
        
    },

    Elements: {},

    Current: {

    },

    Actions: {

        init: function () {

            Felece.Product.Helper.setCurrent();
            Felece.Product.Helper.setElements();
        },
        selectItem: function (arg) {

            
            arg.ev.preventDefault();
            var parent = document.getElementById(arg.parent);
            var sender = arg.sender;

            if (sender.classList.contains("on")) {
                sender.classList.remove("on");

                if (parent.querySelectorAll("a.on").length > 0) {

                } else {
                    parent.classList.remove("on");
                }
            } else {
                if (!parent.classList.contains("on")) {
                    parent.classList.add("on");
                }
                sender.classList.add("on");
            }

        },

        closeCompareItem: function (arg) {

            
            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Product.Elements;
            var current = Felece.Product.Current;

            var removeCompareItemId = sender.getAttribute("data-parent-id");

            document.getElementById(removeCompareItemId).style.display = "none";
            var currentCompareItem = parseInt(elements.compareItemCountEl.innerHTML);
            elements.compareItemCountEl.innerHTML = parseInt(currentCompareItem - 1);
        },

        stepTwo: function (arg) {

            
            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Product.Elements;
            var current = Felece.Product.Current;

            elements.currentPageEl.innerHTML = "2";
            elements.firstStepContainerEl.style.display = "none";
            elements.secondStepContainerEl.removeAttribute("style");
            elements.modalHeaderEl.classList.add("secondStep");

            
        },
        stepThree: function (arg) {

            
            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Product.Elements;
            var current = Felece.Product.Current;

            elements.currentPageEl.innerHTML = "3";
            elements.secondStepContainerEl.style.display = "none";
            elements.thirdStepContainerEl.removeAttribute("style");
            elements.modalHeaderEl.classList.add("thirdStep");

        },
        lastStep: function (arg) {

            
            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Product.Elements;
            var current = Felece.Product.Current;

            elements.currentPageEl.innerHTML = "3";
            elements.thirdStepContainerEl.style.display = "none";
            elements.stepResultContainerEl.removeAttribute("style");
            elements.modalHeaderEl.classList.add("thirdStep");

        },
       
    },

    Helper: {
        setCurrent: function () {
            Felece.Product.Current = {
                state: null,

            };
        },

        setElements: function () {
            var props = Felece.Product.Props;
            var elements = Felece.Product.Elements;
            elements.firstStepContainerEl = document.getElementById(props.firstStepContainerId);
            elements.secondStepContainerEl = document.getElementById(props.secondStepContainerId);
            elements.thirdStepContainerEl = document.getElementById(props.thirdStepContainerId);
            elements.stepResultContainerEl = document.getElementById(props.stepResultContainerId);
            elements.currentPageEl = document.getElementById(props.currentPageId);
            elements.compareItemCountEl = document.getElementById(props.compareItemCountId);
            elements.modalHeaderEl = document.getElementById(props.modalHeaderId);
            
            
        }
    }
};

Felece.Product.Actions.init();