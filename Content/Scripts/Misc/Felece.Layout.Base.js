// Campany Object

Felece.Layout = {


    Actions: {

        menuToggle: function (arg) {

            var sender = arg.sender;
            var event = arg.ev;

            event.preventDefault();

            var menuContainerEl = document.getElementById("menuContainer");

            if (menuContainerEl.classList.contains("on")) {
                menuContainerEl.classList.remove("on");
                Felece.Globals.bodyElem.classList.remove("noscroll");

            } else {
                menuContainerEl.classList.add("on");
                Felece.Globals.bodyElem.classList.add("noscroll");

            }

        },



        login: function (arg) {

            debugger;

            arg.ev.preventDefault();
            var sender = arg.sender;
            if (sender.disabled) { return false; }
            sender.disabled = true;

            var elements = Felece.Layout.Elements;
            var current = Felece.Layout.Current;


            // Return if form is not valid.
            var isValid = $('#loginForm').valid();

            if (!(isValid && isValid2)) {
                sender.disabled = false;
                return;
            }


            //formCollect({ current: Felece.Layout.Current, container: elements.creditInfoFormEl, dataObject: current.data.creditInfo });


        },

        mobileFocusOut: function (arg) {
            var sender = arg.sender;
            var event = arg.ev;

            event.preventDefault();

            var mobileSearchContainerEl = document.getElementById("mobileSearchContainer");
            var mobileSearchInputEl = document.getElementById("mobileSearchInput");
            var mobileAutoCompletePlaceholderEl = document.getElementById("mobileAutoCompletePlaceholder");
            var mobileInputSearchContainerEl = document.getElementById("mobileInputSearchContainer");

            mobileSearchInputEl.value = "";
            mobileSearchContainerEl.classList.remove("focus")
            mobileSearchContainerEl.classList.remove("on")
            mobileAutoCompletePlaceholderEl.classList.remove("on");
            mobileAutoCompletePlaceholderEl.style.height = 0 + "px";
            mobileInputSearchContainerEl.classList.remove("focus");
           
        },

        overlayClick: function () {

            var userLoggedMenu = document.getElementById("logged-user-menu");
            var userNotLoggedMenu = document.getElementById("not-logged-user-menu");

            if (userLoggedMenu) {
                userLoggedMenu.classList.remove("on");
                Felece.Globals.overlayWrElem.classList.remove("on");
                Felece.Globals.contentWr.insertBefore(Felece.Globals.overlayWrElem, null);
            }
            if (userNotLoggedMenu) {
                userNotLoggedMenu.classList.remove("on");
                Felece.Globals.overlayWrElem.classList.remove("on");
                Felece.Globals.contentWr.insertBefore(Felece.Globals.overlayWrElem, null);
            }

         
        },
        mobileFocus: function (arg) {
            var sender = arg.sender;
            var event = arg.ev;

            event.preventDefault();
            var mobileSearchContainerEl = document.getElementById("mobileSearchContainer");
            var mobileAutoCompletePlaceholderEl = document.getElementById("mobileAutoCompletePlaceholder");
            var mobileInputSearchContainerEl = document.getElementById("mobileInputSearchContainer");


            mobileInputSearchContainerEl.classList.add("focus");
            mobileSearchContainerEl.classList.add("focus");
            mobileAutoCompletePlaceholderEl.style.height = mobileAutoCompletePlaceholderEl.querySelector(".focus-container").offsetHeight + "px";
            mobileAutoCompletePlaceholderEl.classList.add("on");
      

        },


        searchToogle: function (arg) {

            var sender = arg.sender;
            var event = arg.ev;

            event.preventDefault();

            var mobileSearchContainerEl = document.getElementById("mobileSearchContainer");

            if (mobileSearchContainerEl.classList.contains("on")) {
                mobileSearchContainerEl.classList.remove("on");

            } else {
                mobileSearchContainerEl.classList.add("on");

            }

        }


    },

    UX: {



    },

    Helper: {

    }
};

