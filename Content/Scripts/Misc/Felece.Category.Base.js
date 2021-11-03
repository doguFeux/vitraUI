Felece.Category = {

    Props: {
        filterContainerAreaId: "filterContainerArea",
        compBarContainerId: "compBarContainer",
        compareCountId: "compareCount",


    },

    Elements: {},

    Current: {

    },

    Actions: {

        init: function () {

            Felece.Category.Helper.setCurrent();
            Felece.Category.Helper.setElements();
        },
        selectItem: function (arg) {


            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Category.Elements;
            var current = Felece.Category.Current;

            sender.classList.add("on");
        },
      
        showFilterModal: function(arg) {

                arg.ev.preventDefault();

                var sender = arg.sender;
                var elements = Felece.Category.Elements;
                var current = Felece.Category.Current;

                if (Felece.Base.Props.MediaQ.Curr.key == "xs1") {

                    Felece.Modal.Actions.show({
                        ev: event,
                        sender: this,
                        type: "drw",
                        contentId: "FilterModal",
                        size: "lg",
                        dir: ["r2l"],
                        esc: true,
                        overlay: false
                    });

                } else {

                   
                }
            },
        toggleFilterContainer: function (arg) {

            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Category.Elements;
            var current = Felece.Category.Current;

            if (Felece.Base.Props.MediaQ.Curr.key == "xs1") {

                Felece.Modal.Actions.show({
                    ev: event,
                    sender: this,
                    type: "drw",
                    contentId: "OrderFilterModal",
                    size: "lg",
                    dir: ["r2l"],
                    esc: true,
                    overlay: false
                });
                
            } else {

                if (elements.filterContainerAreaEl.classList.contains("on")) {
                    elements.filterContainerAreaEl.classList.remove("on");
                    sender.classList.remove("on")
                } else {
                    elements.filterContainerAreaEl.classList.add("on");
                    sender.classList.add("on")

                }
            }
        },

        onScroll: function () {

            var hasOnscreenElmts = document.querySelectorAll("[data-on-screen=off]");

            for (var i = 0; i < hasOnscreenElmts.length; i++) {

                onScreenElm = hasOnscreenElmts[i];
                onScreenElmStatus = onScreenElm.getBoundingClientRect();

                if (onScreenElmStatus.top > 0 && onScreenElmStatus.bottom <= window.innerHeight) {
                    onScreenElm.setAttribute("data-on-screen", "on");
                    onScreenElm.classList.add("on");
                }
            }
        },


        compareProduct: function (arg) {

            arg.ev.preventDefault();

            var sender = arg.sender;
            var elements = Felece.Category.Elements;
            var current = Felece.Category.Current;

            if (sender.checked) {
                current.selectedCompare += 1;
            } else {
                current.selectedCompare -= 1;
            }
            if (current.selectedCompare > 1) {
                elements.compBarContainerEl.classList.add("on");
                elements.compareCountEl.innerHTML = current.selectedCompare;
            } else {
                elements.compBarContainerEl.classList.remove("on");

            }

        },

    },

    Helper: {
        setCurrent: function () {
            Felece.Category.Current = {
                state: null,
               

            };
        },

        setElements: function () {
            var props = Felece.Category.Props;
            var elements = Felece.Category.Elements;
            elements.filterContainerAreaEl = document.getElementById(props.filterContainerAreaId);
            elements.compBarContainerEl = document.getElementById(props.compBarContainerId);
            elements.compareCountEl = document.getElementById(props.compareCountId);



        }
    }
};

Felece.Category.Actions.init();