// Modal Object

Felece.Modal = {
    Props: {
        wrapperId: 'modal-wrapper',
        contentId: 'modal-content',
        visualId: 'modal-visual',
        headerId: 'modal-header',
        bodyId: 'modal-body',
        footerId: 'modal-footer',
        closeButtonId: 'modal-close',
        defaultHtml: '',
        queryStringPrefix: 'mdl',
        Animation: {
            // Duration values have to be identically same as css values!
            Modal: {
                Large: {
                    duration_on: 500,
                    duration_off: 300
                },

                Small: {
                    duration_on: 500,
                    duration_off: 300
                }
            },
            Drawer: {
                Large: {
                    duration_on: 750,
                    duration_off: 600
                },

                Small: {
                    duration_on: 650,
                    duration_off: 450
                }
            }
        }
    },

    Elements: {},

    Current: {},

    ready: function () {
        // Initiate configuration setup 
        Felece.Modal.Actions.init();
    },

    resize: function (arg) {
        Felece.Modal.Actions.closeClick();
    },

    Actions: {
        init: function () {
            var props = Felece.Modal.Props;
            var current = Felece.Modal.Current;
            var elements = Felece.Modal.Elements;

            Felece.Modal.Helper.setCurrent();
            Felece.Modal.Helper.setElements();

            // Save default html which is needed as resetting the modal.
            props.defaultHtml = elements.wrapperEl.innerHTML;

            // Prepare modals by url query string
            Felece.Modal.Actions.prepareByUrl();
        },

        mfInit: function (arg) {
            // If mf is used, add onload attribute to call mfInit function.
            var props = Felece.Modal.Props;
            var current = Felece.Modal.Current;
            var elements = Felece.Modal.Elements;

            Felece.Modal.Helper.setCurrent();
            Felece.Modal.Helper.setElements();

            // Prepare modals by url query string if current mf has a match.
            var modalId = sender.querySelector('[data-modal]');
            Felece.Modal.Actions.prepareByUrl({ mfModalId: modalId });
        },

        show: function (arg) {
            if (arg.hasOwnProperty('ev')) { arg.ev.preventDefault(); }

            // Disable sender to avoid multiple clicks from user.
            var sender = arg.sender;
            if (sender.disabled) { return false; }
            sender.disabled = true;

            // Disable body scroll.
            Felece.Base.Scroll.disable();

            // Get common short cuts.
            var props = Felece.Modal.Props;
            var elements = Felece.Modal.Elements;
            var current = Felece.Modal.Current;

            // Set current new properties
            current.submitter = sender;
            current.submitterArg = arg;
            current.contentId = arg.hasOwnProperty('contentId') ? arg.contentId : sender.getAttribute('data-modal');

            // Set current status.
            current.status = "showing";

            // Set onClickClose function.
            if (arg.hasOwnProperty('onClickClose')) {
                current.onClickClose.funcname = arg.onClickClose.funcname;
                current.onClickClose.funcarg = arg.onClickClose.funcarg;
            }

            // Get duration value;
            var duration = Felece.Modal.Helper.getDurationValue();

            // Set modal content and css classes
            Felece.Modal.Helper.setContentOn();

            if (arg.hasFilter) {
                // Trigger filter supporting init functions
                Felece.Modal.Helper.initFilters();
                setTimeout(function () {
                    Felece.Modal.Helper.initFormPlugins();
                }, 30);
            }
            else if (arg.hasForm) {
                // Trigger form supporting plug-ins.
                Felece.Modal.Helper.initFormPlugins();
            }

            // Prepare UX
            Felece.Modal.UX.show();

            setTimeout(function () {
                // Update current properties.
                current.state = "on";
                current.status = "shown";
                current.submitter.disabled = false;
            }, duration);
        },

        hide: function (arg) {
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

            if (Felece.Modal.Current.state === "on") {
                var props = Felece.Modal.Props;
                var elements = Felece.Modal.Elements;
                var current = Felece.Modal.Current;

                // Set current status.
                current.status = "hiding";

                // Get duration value;
                var duration = Felece.Modal.Helper.getDurationValue();

                // Prepare UX
                Felece.Modal.UX.hide({ dur: duration });

                setTimeout(function () {
                    // Reset modal form.
                    formReset({ selector: '#' + props.contentId });

                    // Set modal content and css classes
                    Felece.Modal.Helper.setContentOff();

                    // Update current properties.
                    current.state = "off";
                    current.status = "hidden";
                    current.onClickClose.funcname = null;
                    current.onClickClose.funcarg = null;

                    // Enable body scroll.
                    Felece.Base.Scroll.enable();

                    if (current.submitter) {
                        current.submitter.disabled = false;
                    }
                }, duration);
            }
        },

        closeClick: function (arg) {
            if (arg) {
                if (arg.hasOwnProperty('ev')) { arg.ev.preventDefault(); }

                // Disable sender to avoid multiple clicks from user.
                var sender = arg.sender;
                if (sender.disabled) { return false; }
                sender.disabled = true;
            }

            // Get common short cuts.
            var props = Felece.Modal.Props;
            var elements = Felece.Modal.Elements;
            var current = Felece.Modal.Current;

            // Set current new properties
            current.submitter = sender;
            current.status = "hiding";

            // Go to hide action.
            Felece.Modal.Actions.hide();

            // Call on-click-close function if saved in current object
            if (current.onClickClose.funcname) {
                executeFunction(current.onClickClose.funcname, current.onClickClose.funcarg);
            }
        },

        overlayClick: function (arg) {
            if (Felece.Modal.Current.submitterArg.overlay !== false) {
                Felece.Modal.Actions.closeClick({ sender: this });
            }
        },

        escKeyPress: function (arg) {
            if (Felece.Modal.Current.submitterArg.esc !== false) {
                Felece.Modal.Actions.closeClick({ sender: this });

                setTimeout(function () {
                    this.disabled = false;
                }, 300);
            }
        },

        prepareByUrl: function (arg) {
            var props = Felece.Modal.Props;
            var elements = Felece.Modal.Elements;
            var current = Felece.Modal.Current;
            var hasQueryString = window.location.href.indexOf('?') > -1;

            if (hasQueryString) {
                // e.g --> ?mdl=modalDummyId01
                var queryString = window.location.href.split('?')[1];
                var queryStringArr = queryString.split('&');

                for (var q = 0; q < queryStringArr.length; q++) {
                    var queryStringItemArr = queryStringArr[q].split('=');
                    var queryStringPrefixName = queryStringItemArr[0];

                    if (queryStringPrefixName === props.queryStringPrefix) {
                        var modalId = queryStringItemArr[1]; // modalDummyId01
                        var modalLink = document.querySelector('[data-modal="' + modalId + '"]');

                        if (!Felece.Globals.isMF) {
                            modalLink.click();
                        }
                        else if (Felece.Globals.isMF && modalId === arg.mfModalId) {
                            modalLink.click();
                        }
                    }
                }
            }
        }
    },

    UX: {
        show: function () {
            var props = Felece.Modal.Props;
            var elements = Felece.Modal.Elements;
            var current = Felece.Modal.Current;

            // Get current modal properties and set clases.
            var arg = current.submitterArg;

            // Show overlay
            Felece.Globals.overlayWrElem.classList.add("on");

            // Set modal wrapper classes.
            elements.wrapperEl.classList.add("on");
            elements.wrapperEl.classList.add("type-" + arg.type);
            elements.wrapperEl.classList.add("size-" + arg.size);

            // Direction class can vary for each media query range
            // Timeout needed for regular modals, to get opacity transition in effect.
            setTimeout(function () {
                for (var d = 0; d < arg.dir.length; d++) {
                    elements.wrapperEl.classList.add("dir-" + arg.dir[d]);
                }
            }, arg.type === "drw" ? 0 : 20);

            // Hide modal header if no content exists.
            if (current.contentHeaderEl === null) {
                elements.headerEl.style.display = "none";
            }
            else {
                elements.headerEl.removeAttribute("style");
            }

            // Hide modal footer if no content exists.
            if (current.contentFooterEl === null) {
                elements.footerEl.style.display = "none";
            }
            else {
                elements.footerEl.removeAttribute("style");
            }
        },

        hide: function (arg) {
            var props = Felece.Modal.Props;
            var elements = Felece.Modal.Elements;
            var current = Felece.Modal.Current;

            // Hide overlay wrapper element with a short delay.
            setTimeout(function () {
                Felece.Globals.overlayWrElem.classList.remove("on");
            }, parseInt(arg.dur / 2));

            // Hide modal wrapper element.
            elements.wrapperEl.classList.remove("on");

            setTimeout(function () {
                // Remove modal wrapper class attribute.
                elements.wrapperEl.removeAttribute('class');
            }, arg.dur);
        }
    },

    Helper: {
        setCurrent: function () {
            Felece.Modal.Current = {
                state: 'off',
                status: 'hidden',
                submitter: null,
                submitterArg: {},
                contentId: '',
                contentEl: null,
                contentHeaderEl: null,
                contentBodyEl: null,
                contentFooterEl: null,
                hasForm: false,
                esc: true,
                overlay: true,
                onClickClose: {
                    funcname: null,
                    funcarg: null
                }
            };
        },

        setElements: function () {
            var props = Felece.Modal.Props;
            var elements = Felece.Modal.Elements;

            elements.wrapperEl = document.getElementById(props.wrapperId);
            elements.contentEl = document.getElementById(props.contentId);
            elements.headerEl = document.getElementById(props.headerId);
            elements.bodyEl = document.getElementById(props.bodyId);
            elements.footerEl = document.getElementById(props.footerId);
            elements.closeButtonEl = document.getElementById(props.closeButtonId);
            elements.visualEl = document.getElementById(props.visualId);
            
        },

        setContentOn: function () {
            var props = Felece.Modal.Props;
            var current = Felece.Modal.Current;
            var elements = Felece.Modal.Elements;

            // Get and set modal content by moving them.
            current.contentEl = document.getElementById(current.contentId);

            current.contentHeaderEl = current.contentEl.querySelector("[data-modal-section = header]");
            if (current.contentHeaderEl) {
                var contentHeaderChildren = current.contentHeaderEl.children;
                while (contentHeaderChildren.length) {
                    elements.headerEl.appendChild(contentHeaderChildren[0]);
                }
            }
            current.contentVisualEl = current.contentEl.querySelector("[data-modal-section = visual]");
            if (current.contentVisualEl) {
                var contentVisualChildren = current.contentVisualEl.children;
                while (contentVisualChildren.length) {
                    elements.visualEl.appendChild(contentVisualChildren[0]);
                }
            }
            current.contentBodyEl = current.contentEl.querySelector("[data-modal-section = body]");
            var contentBodyChildren = current.contentBodyEl.children;
            while (contentBodyChildren.length) {
                elements.bodyEl.appendChild(contentBodyChildren[0]);
            }

            current.contentFooterEl = current.contentEl.querySelector("[data-modal-section = footer]");
            if (current.contentFooterEl) {
                var contentFooterChildren = current.contentFooterEl.children;
                while (contentFooterChildren.length) {
                    elements.footerEl.appendChild(contentFooterChildren[0]);
                }
            }

            // Apply css classes on to modal.
            var contentCssClasses = current.contentEl.classList;
            var headerCssClasses = current.contentHeaderEl ? current.contentHeaderEl.classList : "";
            var bodyCssClasses = current.contentBodyEl.classList;
            var footerCssClasses = current.contentFooterEl ? current.contentFooterEl.classList : "";

            for (var cc = 0; cc < contentCssClasses.length; cc++) {
                var contentCssClass = contentCssClasses[cc];
                elements.contentEl.classList.add(contentCssClass);
            }

            for (var hc = 0; hc < headerCssClasses.length; hc++) {
                var headerCssClass = headerCssClasses[hc];
                elements.headerEl.classList.add(headerCssClass);
            }

            for (var bc = 0; bc < bodyCssClasses.length; bc++) {
                var bodyCssClass = bodyCssClasses[bc];
                elements.bodyEl.classList.add(bodyCssClass);
            }

            for (var fc = 0; fc < footerCssClasses.length; fc++) {
                var footerCssClass = footerCssClasses[fc];
                elements.footerEl.classList.add(footerCssClass);
            }
        },

        setContentOff: function () {
            var props = Felece.Modal.Props;
            var current = Felece.Modal.Current;
            var elements = Felece.Modal.Elements;

            // Get and set modal content off to default placeholders.
            current.contentEl = document.getElementById(current.contentId);

            current.contentHeaderEl = current.contentEl.querySelector("[data-modal-section = header]");
            if (current.contentHeaderEl) {
                var headerElChildren = elements.headerEl.children;
                while (headerElChildren.length) {
                    current.contentHeaderEl.appendChild(headerElChildren[0]);
                }
            }

            current.contentVisualEl = current.contentEl.querySelector("[data-modal-section = visual]");
            if (current.contentVisualEl) {
                var visualElChildren = elements.visualEl.children;
                while (visualElChildren.length) {
                    current.contentVisualEl.appendChild(visualElChildren[0]);
                }
            }
          

            current.contentBodyEl = current.contentEl.querySelector("[data-modal-section = body]");
            var bodyElChildren = elements.bodyEl.children;
            while (bodyElChildren.length) {
                current.contentBodyEl.appendChild(bodyElChildren[0]);
            }

            current.contentFooterEl = current.contentEl.querySelector("[data-modal-section = footer]");
            if (current.contentFooterEl) {
                var footerElChildren = elements.footerEl.children;
                while (footerElChildren.length) {
                    current.contentFooterEl.appendChild(footerElChildren[0]);
                }
            }

            // Remove custom css classes
            elements.contentEl.removeAttribute("class");
            elements.headerEl.removeAttribute("class");
            elements.bodyEl.removeAttribute("class");
            elements.footerEl.removeAttribute("class");
        },

        getDurationValue: function () {
            // Get common short cuts.
            var props = Felece.Modal.Props;
            var elements = Felece.Modal.Elements;
            var current = Felece.Modal.Current;
            var arg = current.submitterArg;
            var duration;

            if (current.status === "showing") {
                if (arg.type === "mdl") {
                    if (arg.size === "lg") {
                        duration = props.Animation.Modal.Large.duration_on;
                    }
                    else if (arg.size === "sm") {
                        duration = props.Animation.Modal.Small.duration_on;
                    }
                }
                else if (arg.type === "drw") {
                    if (arg.size === "lg") {
                        duration = props.Animation.Drawer.Large.duration_on;
                    }
                    else if (arg.size === "sm") {
                        duration = props.Animation.Drawer.Small.duration_on;
                    }
                }
            }
            else if (current.status === "hiding") {
                if (arg.type === "drw") {
                    if (arg.size === "lg") {
                        duration = props.Animation.Drawer.Large.duration_off;
                    }
                    else if (arg.size === "sm") {
                        duration = props.Animation.Drawer.Small.duration_off;
                    }
                }
                else if (arg.type === "mdl") {
                    if (arg.size === "lg") {
                        duration = props.Animation.Modal.Large.duration_off;
                    }
                    else if (arg.size === "sm") {
                        duration = props.Animation.Modal.Small.duration_off;
                    }
                }
            }

            return duration;
        },

        initFilters: function () {
            Felece.Filter.ready(true);
        },

        initFormPlugins: function () {
            // Run validation rules.
            if (!isJsonEmpty(Felece.Validation)) {
                Felece.Validation.Actions.init();
            }

            // Run select2 setup.
            if (!isJsonEmpty(Felece.Select2)) {
                Felece.Select2.Actions.init({ containerSelector: '#modal-content' });
            }

            // Run mask rules.
            if (!isJsonEmpty(Felece.Mask)) {
                Felece.Mask.Actions.init({ containerSelector: '#modal-content' });
            }

            // Run date picker.
            if (!isJsonEmpty(Felece.DataPicker)) {
                Felece.DataPicker.Actions.init({ containerSelector: '#modal-content' });
            }
        }
    }
};

// End

// Functions to call as DOM ready

Felece.Modal.ready();

// End