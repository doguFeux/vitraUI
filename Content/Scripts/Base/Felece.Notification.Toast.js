// Search Object

Felece.Toast = {
    Props: {
        
    },

    Settings: {
        position: {
            xs: 'tl',
            sm: 'tr',
            md_lg: 'bl'
        },
        autoHide: true,
        closeButton: true,
        displayTime: 3000,
        animationTime: 1000,
        animationType: 'linear'
    },

    Elements: {},

    Current: {},

    ready: function () {
        // Initiate configuration setup 
        Felece.Toast.Actions.init();
    },

    resize: function (arg) {

    },

    Actions: {
        init: function () {
            Felece.Toast.Helper.setCurrent();
            Felece.Toast.Helper.setElements();

            // Set default positionings.
            Felece.Toast.Helper.setPositioning();
        },

        mfInit: function (arg) {
           
        },
    },

    UX: {
        show: function () {
            var props = Felece.Toast.Props;
            var elements = Felece.Toast.Elements;
            var current = Felece.Toast.Current;

            
        },

        close: function () {
            var elements = Felece.Toast.Elements;
            var current = Felece.Toast.Current;

           
        }
    },

    Helper: {
        setCurrent: function () {
            Felece.Toast.Current = {
                state: 'off',
                status: '',
                submitter: null,
                submitterArg: {},
                Settings: Felece.Toast.Settings
            };
        },

        setElements: function () {
            var props = Felece.Toast.Props;
            var elements = Felece.Toast.Elements;

            
        },

        setPositioning: function () {
            var props = Felece.Toast.Props;
            var elements = Felece.Toast.Elements;
            var current = Felece.Toast.Current;
            var settings = current.Settings;

            var currentMediaQuery = Felece.Base.Props.MediaQ.Curr.key;

            if (currentMediaQuery === "xs1" || currentMediaQuery === "xs2") {
                Felece.Globals.toastWrElem.classList.add("toast-xs-" + settings.position.xs);
            }
            else if (currentMediaQuery === "sm1" || currentMediaQuery === "sm2") {
                Felece.Globals.toastWrElem.classList.add("toast-sm-" + settings.position.sm);
            }
            else if (currentMediaQuery === "md" || currentMediaQuery === "lg") {
                Felece.Globals.toastWrElem.classList.add("toast-md-lg-" + settings.position.md_lg);
            }
        }
    }
};

// End

// Functions to call as DOM ready

if (!Felece.Globals.isMF) {
    Felece.Toast.ready();
}

// End