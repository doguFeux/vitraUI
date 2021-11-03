// Campany Object

Felece.Campany = {


    Actions: {


        escKeyPress: function () {
            Felece.Campany.Actions.resetCampanyContainer();
            Felece.Campany.Actions.resetLogMenuContainer();
        },

        overlayClick: function (arg) {
            Felece.Campany.Actions.resetCampanyContainer();
            Felece.Campany.Actions.resetLogMenuContainer();
        },

        showCampanyContainer: function (arg) {

            var ev = arg.ev;
            var sender = arg.sender;

            ev.preventDefault();

            if (Felece.Search) {
                Felece.Search.Actions.resetSearchContainer();
            }
            Felece.Campany.Actions.resetLogMenuContainer();

            var CampanyAreaEl = document.getElementById("campany-area");
            Felece.Globals.bodyElem.classList.add("noscroll");

            // Display Campany list container.
            CampanyAreaEl.classList.add('on');

            Felece.Globals.contentWr.insertBefore(Felece.Globals.overlayWrElem, null);

            // Show overlay
            Felece.Globals.overlayWrElem.classList.add("on");


        },
        showNotLoginMenuContainer: function (arg) {

            var ev = arg.ev;
            var sender = arg.sender;

            ev.preventDefault();
            if (Felece.Search) {
                Felece.Search.Actions.resetSearchContainer();
            }
            Felece.Campany.Actions.resetCampanyContainer();

            if (true) {

                var userLoggedMenu = document.getElementById("not-logged-user-menu");
                if (userLoggedMenu.classList.contains("on")) {
                    Felece.Campany.Actions.resetLogMenuContainer();

                } else {
                    Felece.Globals.overlayWrElem.classList.add("on");
                    Felece.Globals.headerElem.insertBefore(Felece.Globals.overlayWrElem, Felece.Globals.headerElem.childNodes[0]);
                    sender.classList.add("on");
                    userLoggedMenu.classList.add("on");

                }
            } else {

            }

        },
        showLoginMenuContainer: function (arg) {

            var ev = arg.ev;
            var sender = arg.sender;

            ev.preventDefault();
            if (Felece.Search) {
                Felece.Search.Actions.resetSearchContainer();
            }
            Felece.Campany.Actions.resetCampanyContainer();

            if (true) {

                var userLoggedMenu = document.getElementById("logged-user-menu");
                if (userLoggedMenu.classList.contains("on")) {
                    Felece.Campany.Actions.resetLogMenuContainer();

                } else {
                    Felece.Globals.overlayWrElem.classList.add("on");
                    Felece.Globals.headerElem.insertBefore(Felece.Globals.overlayWrElem, Felece.Globals.headerElem.childNodes[0]);
                    sender.classList.add("on");
                    userLoggedMenu.classList.add("on");

                }
            } else {

            }

        },

        resetCampanyContainer: function () {

            var CampanyAreaEl = document.getElementById("campany-area");
            if (CampanyAreaEl) {
                CampanyAreaEl.classList.remove("on");
                Felece.Globals.bodyElem.classList.remove("noscroll");
                Felece.Globals.overlayWrElem.classList.remove("on");
            }

        },
        resetLogMenuContainer: function () {

            var userLoggedMenu = document.getElementById("logged-user-menu");
            if (userLoggedMenu) {
                userLoggedMenu.classList.remove("on");
                Felece.Globals.overlayWrElem.classList.remove("on");
                Felece.Globals.contentWr.insertBefore(Felece.Globals.overlayWrElem, null);
            }

        }
    },

    UX: {


        close: function () {
            var elements = Felece.Campany.Elements;
            var current = Felece.Campany.Current;

            elements.CampanyAreaEl.classList.remove('on');
            current.state = "off";
            current.status = "";

            // Clear and blur Campany textbox element
            elements.CampanyTextboxEl.value = "";
            elements.CampanyTextboxEl.blur();

            // Move overlay back to its original position.
            Felece.Globals.pageWr.insertBefore(Felece.Globals.overlayWrElem, null);

            // Hide overlay
            Felece.Globals.overlayWrElem.classList.remove("on");

            // Call on-click-close function if saved in current object
            if (current.Settings.OnClickClose.funcname) {
                executeFunction(current.Settings.OnClickClose.funcname, current.Settings.OnClickClose.funcarg);
            }
        }
    },

    Helper: {



        proxySucess: function (response) {
            var current = Felece.Campany.Current;
            var elements = Felece.Campany.Elements;
            elements.CampanyListContainerEl.innerHTML = "returned html comes here";

            if (current.state === "off" && !current.Settings.firstFocus) {
                // Set current new properties
                current.submitter = null;
                current.state = "on";
                current.status = "showing";

                // Show Campany list container
                Felece.Campany.UX.show();
            }
        },

        proxyError: function (response) {
        }
    }
};

