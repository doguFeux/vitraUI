// Search Object

Felece.Search = {
    Props: {
        searchAreaId: 'search-area',
        searchTextboxId: 'search-textbox',
        searchListContainerId: 'search-list-container'
    },

    Settings: {
        overlayAboveHeader: true, // Overlay covers header or not.
        escPress: true, // Close search list container on esc press.
        firstFocus: true, // Opens search list container on textbox focus.
        OnClickClose: {
            funcname: null, // Call custom function on closing.
            funcarg: null
        },
        OnInput: {
            proxyfunc: "proxy func name comes here", // Call proxy function as inputting ends.
            delay: 300  // Typing delay value.
        }
    },

    Elements: {},

    Current: {},

    ready: function () {
        // Initiate configuration setup 
        Felece.Search.Actions.init();
    },

    resize: function (arg) {

    },

    Actions: {
        init: function () {
            Felece.Search.Helper.setCurrent();
            Felece.Search.Helper.setElements();
        },

        mfInit: function (arg) {
            // If mf is used, add onload attribute to call mfInit function with container id.
            Felece.Search.Helper.setCurrent();
            Felece.Search.Helper.setElements();
        },

        focus: function (arg) {
            // Get current object
            var current = Felece.Search.Current;

            if (current.state === "off" && current.Settings.firstFocus) {
                // Set current new properties
                current.submitter = arg.sender;
                current.state = "on";
                current.status = "showing";

                // Show search list container
                Felece.Search.UX.show();
            }
        },

        input: function (arg) {
            // Get shortcuts
            var current = Felece.Search.Current;
            current.status = "inputting";

            if (current.inputting) {
                // If still typing cancel settimeout.
                clearTimeout(current.inputting);
                current.inputting = null;
                current.status = "inputting";
            }

            if (current.inputting === null) {
                current.inputting = setTimeout(function () {
                    var proxyfunc = current.Settings.OnInput.proxyfunc;
                    var proxyarg = current.Settings.OnInput.proxyarg;
                    var searchVal = Felece.Search.Elements.searchTextboxEl.value;

                    executeFunction(proxyfunc, [searchVal, Felece.Search.Helper.proxySucess, Felece.Search.Helper.proxyError]);
                    current.status = "";
                }, current.Settings.OnInput.delay);
            }
        },

        closeClick: function (arg) {
            if (arg) {
                if (arg.hasOwnProperty('ev')) { arg.ev.preventDefault(); }

                // Disable sender to avoid multiple clicks from user.
                var sender = arg.sender;
                if (sender.disabled) { return false; }
                sender.disabled = true;

                setTimeout(function () {
                    sender.disabled = false;
                }, 100);
            }

            // Get common short cuts.
            var current = Felece.Search.Current;

            // Set current new properties
            current.submitter = sender;
            current.status = "hiding";

            // Go to hide action.
            Felece.Search.UX.close();
            Felece.Search.Actions.closeClick({ sender: this });
        },

        escKeyPress: function () {
            if (Felece.Search.Current.Settings.escPress) {
                if (Felece.Search.Current.state === "on") {

                    setTimeout(function () {
                        this.disabled = false;
                    }, 300);

                    Felece.Search.Actions.resetSearchContainer();
                }
            }
        },

        overlayClick: function (arg) {
            Felece.Search.Actions.resetSearchContainer();
        },

        clearValue: function () {
            var elements = Felece.Search.Elements;
            elements.searchTextboxEl.value = "";
        },
        showSearchContainer: function (arg) {

            var ev = arg.ev;
            var sender = arg.sender;

            ev.preventDefault();
            if (Felece.Campany) {
                Felece.Campany.Actions.resetLogMenuContainer();
                Felece.Campany.Actions.resetCampanyContainer();
            }
            var navMenuEl = document.querySelector("#open-menu-placeholder");
            var searchBox = document.getElementById("search-textbox");
            var container = document.getElementById("search-area");

            if (container.classList.contains("on")) {
                Felece.Search.Actions.resetSearchContainer();
            } else {
                navMenuEl.style.display = "none";
                Felece.Globals.bodyElem.classList.add("noscroll");
                container.classList.add("on");
                searchBox.focus();
            }


        },

        resetSearchContainer: function () {
            var navMenuEl = document.querySelector("#open-menu-placeholder");
            var searchBox = document.getElementById("search-textbox");
            var container = document.getElementById("search-area");

            navMenuEl.removeAttribute("style");
            Felece.Globals.bodyElem.classList.remove("noscroll");
            container.classList.remove("on");
            Felece.Search.Actions.closeClick({ sender: this });
        }
    },

    UX: {
        show: function () {
            var props = Felece.Search.Props;
            var elements = Felece.Search.Elements;
            var current = Felece.Search.Current;

            // Display search list container.
            elements.searchAreaEl.classList.add('on');

            if (current.Settings.overlayAboveHeader) {
                // Move overlay under search area container to cover header.
                Felece.Globals.mainElem.insertBefore(Felece.Globals.overlayWrElem, null);
            }
            else {
                // Move overlay under content wrapper not to cover header area.
                Felece.Globals.contentWr.insertBefore(Felece.Globals.overlayWrElem, null);
            }

            // Show overlay
            Felece.Globals.overlayWrElem.classList.add("on");
        },

        close: function () {
            var elements = Felece.Search.Elements;
            var current = Felece.Search.Current;

            elements.searchAreaEl.classList.remove('on');
            current.state = "off";
            current.status = "";

            // Clear and blur search textbox element
            elements.searchTextboxEl.value = "";
            elements.searchTextboxEl.blur();

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
        setCurrent: function () {
            Felece.Search.Current = {
                state: 'off',
                status: '',
                inputting: null,
                isListContainerClick: false,
                submitter: null,
                submitterArg: {},
                Settings: Felece.Search.Settings
            };
        },

        setElements: function () {
            var props = Felece.Search.Props;
            var elements = Felece.Search.Elements;

            elements.searchAreaEl = document.getElementById(props.searchAreaId);
            elements.searchTextboxEl = document.getElementById(props.searchTextboxId);
            elements.searchListContainerEl = document.getElementById(props.searchListContainerId);
        },

        proxySucess: function (response) {
            var current = Felece.Search.Current;
            var elements = Felece.Search.Elements;
            elements.searchListContainerEl.innerHTML = "returned html comes here";

            if (current.state === "off" && !current.Settings.firstFocus) {
                // Set current new properties
                current.submitter = null;
                current.state = "on";
                current.status = "showing";

                // Show search list container
                Felece.Search.UX.show();
            }
        },

        proxyError: function (response) {
        }
    }
};

// End

// Functions to call as DOM ready

if (!Felece.Globals.isMF) {
    Felece.Search.ready();
}

// End