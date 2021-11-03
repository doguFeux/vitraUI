Felece.Design = {

    Props: {

    },

    Elements: {},

    Current: {
      

    },

    Actions: {

        init: function () {

            Felece.Design.Helper.setCurrent();
            Felece.Design.Helper.setElements();
        },


        onScroll: function () {

            var currEl = document.querySelector("[data-on-screen='on']");
            var currElIndex = parseInt(currEl.getAttribute("data-screen-index"));
            var screenAttrElements = document.querySelectorAll("[data-on-screen]");
            var totalElems = screenAttrElements.length;


            if (Felece.Base.Props.Scroll.Direction == "down") {
                
                if (currElIndex !== 1) {
                    currEl.setAttribute("data-on-screen", "off");
                    currElIndex--;
                    currEl = document.querySelector("[data-screen-index=" + currElIndex + "]");
                    currEl.setAttribute("data-on-screen", "on");

                    var currElStatus = currEl.getBoundingClientRect();
                    window.scroll(0, -currElStatus.top)
                    isScrolled = true;
                }



            } else {
                if (currElIndex !== totalElems) {
                    
                    if (!Felece.Design.Current.isScrolled) {
                        currEl.setAttribute("data-on-screen", "off");
                        currElIndex++;
                        currEl = document.querySelector("[data-screen-index=" + '"' + currElIndex + '"' + "]");
                        currEl.setAttribute("data-on-screen", "on");
                        var currElStatus = currEl.getBoundingClientRect();
                        Felece.Design.Current.isScrolled = true;
                        window.scroll(0, currElStatus.top)
                    }
                }
            }
        }

    },

    Helper: {
        setCurrent: function () {
            Felece.Design.Current = {
                state: null,
                selectedCompare: 0,
                isScrolled: false
            };
        },

        setElements: function () {




        }
    }
};

Felece.Design.Actions.init();