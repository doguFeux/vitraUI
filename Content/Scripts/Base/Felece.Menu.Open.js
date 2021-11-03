// Menu Primary Object

Felece.OpenMenu = {
    Props: {
        openMenuId: 'open-menu-placeholder'
    },

    Elements: {},

    Current: {},

    ready: function () {
        // Check if menu element exists.
        var openMenuEl = document.getElementById(Felece.OpenMenu.Props.openMenuId);

        if (openMenuEl) {
            Felece.OpenMenu.Actions.init();
        }
    },

    resize: function (arg) {
        Felece.OpenMenu.UX.hideMenu();
    },

    Actions: {
        init: function () {
            Felece.OpenMenu.Helper.setCurrent();
        },

        itemClick: function (arg) {
            // Disable sender to avoid multiple clicks from user.
            arg.ev.preventDefault();
            var sender = arg.sender;
            if (sender.disabled) { return false; }
            sender.disabled = true;
            setTimeout(function () { sender.disabled = false; }, 1000);

            var current = Felece.OpenMenu.Current;
            var isMenuOn = current.status === "on";
            current.submitter = sender;
            current.submitterArg = arg;

            if (isMenuOn) {
                // Check if current <a> item has been already on.
                var isCurrentItemOn = sender.classList.contains('on');

                if (isCurrentItemOn) {
                    // Hide menu container if same menu item clicked.
                    Felece.OpenMenu.UX.hideMenu();
                }
                else {
                    // If different menu item clicked, then display new menu content.
                    Felece.OpenMenu.UX.hideMenuContent();
                    Felece.OpenMenu.UX.showMenuContent();
                }
            }
            else {
                // Display menu container.
                Felece.OpenMenu.UX.showMenu();
                Felece.OpenMenu.UX.showMenuContent();
            }
        },

        itemMouseEnter: function (arg) {
            var isCurrentItemSelected = arg.sender.classList.contains('on');

            if (isCurrentItemSelected) {
                var current = Felece.OpenMenu.Current;
                clearTimeout(current.mouseLeaveTimeout);
                console.log("mouse entered!");
            }
        },

        submenuMouseEnter: function (arg) {
            var current = Felece.OpenMenu.Current;
            clearTimeout(current.mouseLeaveTimeout);
            console.log("sub menu mouse entered!");
        },

        itemMouseLeave: function (arg) {
            var isCurrentItemSelected = arg.sender.classList.contains('on');

            if (isCurrentItemSelected) {
                var current = Felece.OpenMenu.Current;
                console.log("mouse leaving!");

                current.mouseLeaveTimeout = setTimeout(function () {
                    var isMenuOn = current.status === "on";

                    Felece.OpenMenu.UX.hideMenu();
                    console.log("mouse leave now!");
                }, 200);
            }
        }
    },

    UX: {
        showMenu: function () {
            var current = Felece.OpenMenu.Current;

            // Add class on menu container.
            var openMenuEl = document.getElementById(Felece.OpenMenu.Props.openMenuId);
            openMenuEl.classList.add('on');

            // Activate menu item and its content.
            Felece.OpenMenu.Helper.activateMenuItems();

            // Update current properties.
            current.status = "on";
        },

        hideMenu: function () {
            var current = Felece.OpenMenu.Current;

            // Hide menu container.
            var openMenuEl = document.getElementById(Felece.OpenMenu.Props.openMenuId);
            openMenuEl.classList.remove('on');
            Felece.OpenMenu.Helper.passifyMenuItems();

            // Update current properties.
            current.status = "off";
            current.submitter = null;
            current.submitterArg = {};
        },

        showMenuContent: function () {
            // Activate menu item and its content.
            Felece.OpenMenu.Helper.activateMenuItems();
        },

        hideMenuContent: function () {
            // Passify active menu item and its content.
            Felece.OpenMenu.Helper.passifyMenuItems();
        }
    },

    Helper: {
        setCurrent: function () {
            Felece.OpenMenu.Current = {
                status: 'off',
                mouseLeaveTimeout: false,
                submitter: null,
                submitterArg: {}
            };
        },

        setElements: function () {
        },

        activateMenuItems: function () {
            var current = Felece.OpenMenu.Current;

            // Add class on clicked menu item and parent <li>.
            current.submitter.classList.add('on');
            var parentLi = findAncestor(current.submitter, "li");
            parentLi.classList.add("on");
        },

        passifyMenuItems: function () {
            // Remove class on active menu item and its <li> parent element.
            var openMenuEl = document.getElementById(Felece.OpenMenu.Props.openMenuId);
            var activeMenuItem = openMenuEl.querySelector("a.a-level-1.on");
            if (activeMenuItem) {
                var parentLi = findAncestor(activeMenuItem, "li");
                activeMenuItem.classList.remove('on');
                parentLi.classList.remove("on");
            }
        }
    }
};

// End

// Functions to call as DOM ready

Felece.OpenMenu.ready();

// End