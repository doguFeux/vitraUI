Felece.UX = {
    expand: function (arg) {
        if (arg.hasOwnProperty('ev')) { arg.ev.preventDefault(); }

        // Disable sender to avoid multiple clicks from user.
        var sender = arg.sender;
        if (sender.disabled) { return false; }
        sender.disabled = true;
        // End

        if (sender.getAttribute("contentId")) {
            Felece.UX.closeAllOpenExpanders()
        }

        var containerSelectorName = arg.contentId;
        var containerEl = document.querySelector('[data-expand="' + containerSelectorName + '"]');
        var expandIcon = document.querySelector('#expandIcon-' + containerSelectorName + '').querySelector(".c-unit-02");
        var expandingContentEl = containerEl.getElementsByClassName("expandingContent")[0];
        var contentHeight = expandingContentEl.offsetHeight;
        var isInitOn = containerEl.classList.contains('init-on'); // Is initially on.
        var isExpanded = containerEl.classList.contains('on');
        var senderStyle = arg.senderStyle;
        var parentId = arg.parentId;
        var parentEl = document.getElementById(parentId);




        if (!isExpanded && !isInitOn) {
            containerEl.classList.add("on");
            containerEl.style.height = contentHeight + "px";

            if (senderStyle === "rotate") {
                expandIcon.style.transform = "rotate(90deg)";
                expandIcon.style.transition = "transform 0.3s";
                sender.classList.add('on');
                if (parentEl) {
                    parentEl.classList.add('on');
                }
            }
            else if (senderStyle === "change") {
                sender.children[0].style.display = "none";
                sender.children[1].style.display = "block";
                if (parentEl) {
                    parentEl.classList.add('on');
                }
            }

            setTimeout(function () {
                containerEl.style.height = "auto";
                sender.disabled = false;
            }, 1000);
        }
        else {
            containerEl.style.height = contentHeight + "px";

            setTimeout(function () {
                containerEl.style.height = 0;
                containerEl.classList.remove("on");
                containerEl.classList.remove("init-on");
                sender.classList.remove('on');

                if (senderStyle === "rotate") {
                    expandIcon.style.transform = "rotate(0)";

                    if (parentEl) {
                        parentEl.classList.remove('on');
                    }
                }

                else if (senderStyle === "change") {
                    sender.children[0].removeAttribute("style");
                    sender.children[1].style.display = "none";
                    if (parentEl) {
                        parentEl.classList.remove('on');
                    }
                }

                setTimeout(function () {
                    sender.disabled = false;
                }, 1000);
            }, 10);
        }
    },
    propExpand: function (arg) {
        if (arg.hasOwnProperty('ev')) { arg.ev.preventDefault(); }

        // Disable sender to avoid multiple clicks from user.
        var sender = arg.sender;
        if (sender.disabled) { return false; }
        sender.disabled = true;
        // End

        if (sender.getAttribute("contentId")) {
            Felece.UX.closeAllOpenExpanders()
        }

        var containerSelectorName = arg.contentId;
        var containerEl = document.querySelector('[data-expand="' + containerSelectorName + '"]');
        var expandIcon = document.querySelector('#expandIcon-' + containerSelectorName + '').querySelector(".c-unit-02");
        var expandingContentEl = containerEl.getElementsByClassName("expandingContent")[0];
        var contentHeight = expandingContentEl.offsetHeight;
        var isInitOn = containerEl.classList.contains('init-on'); // Is initially on.
        var isExpanded = containerEl.classList.contains('on');
        var senderStyle = arg.senderStyle;
        var parentId = arg.parentId;
        var parentEl = document.getElementById(parentId);




        if (!isExpanded && !isInitOn) {
            containerEl.classList.add("on");
            containerEl.style.height = contentHeight + "px";

            if (senderStyle === "rotate") {
                expandIcon.style.transform = "rotate(-90deg)";
                expandIcon.style.transition = "transform 0.3s";
                sender.classList.add('on');
                if (parentEl) {
                    parentEl.classList.add('on');
                }
            }
            else if (senderStyle === "change") {
                sender.children[0].style.display = "none";
                sender.children[1].style.display = "block";
                if (parentEl) {
                    parentEl.classList.add('on');
                }
            }

            setTimeout(function () {
                containerEl.style.height = "auto";
                sender.disabled = false;
            }, 1000);
        }
        else {
            containerEl.style.height = contentHeight + "px";

            setTimeout(function () {
                containerEl.style.height = 0;
                containerEl.classList.remove("on");
                containerEl.classList.remove("init-on");
                sender.classList.remove('on');

                if (senderStyle === "rotate") {
                    expandIcon.style.transform = "rotate(0)";

                    if (parentEl) {
                        parentEl.classList.remove('on');
                    }
                }

                else if (senderStyle === "change") {
                    sender.children[0].removeAttribute("style");
                    sender.children[1].style.display = "none";
                    if (parentEl) {
                        parentEl.classList.remove('on');
                    }
                }

                setTimeout(function () {
                    sender.disabled = false;
                }, 1000);
            }, 10);
        }
    },
    closeAllOpenExpanders: function (arg) {
        var otherPageEl = document.querySelector("[data-page-class]");
        var otherPageClass = otherPageEl ? true : false;
        var openExpanders = null;
        var openExpander = null;

        if (otherPageClass) {
            otherPageClass = otherPageEl.getAttribute("data-page-class");
            openExpanders = document.querySelectorAll(otherPageClass + ".on");;
        } else {

            openExpanders = document.querySelectorAll(".c-item-01.on");
        }

        for (var i = 0; i < openExpanders.length; i++) {
            if (openExpanders[i].getAttribute("contentId")) {
                openExpander = openExpanders[i];
                break;
            }
        }
        if (openExpander) {
            var containerSelectorName = openExpander.getAttribute("contentId");
            var containerEl = document.querySelector('[data-expand="' + containerSelectorName + '"]');
            var expandIcon = document.querySelector('#expandIcon-' + containerSelectorName + '');
            var expandingContentEl = containerEl.getElementsByClassName("expandingContent")[0];
            var contentHeight = expandingContentEl.offsetHeight;

            containerEl.style.height = contentHeight + "px";

            setTimeout(function () {
                containerEl.style.height = 0;
                containerEl.classList.remove("on");
                containerEl.classList.remove("init-on");
                openExpander.classList.remove('on');
                expandIcon.style.transform = "rotate(0)";

            }, 10);
        }

    },
    toggleElem: function (sender, className, parentElemSelector) {
        var parentElem = findAncestor(sender, parentElemSelector);

        if (parentElem.classList.contains(className)) {
            parentElem.classList.remove(className);
        }
        else {
            parentElem.classList.add(className);
        }

    },
    Actions: {

        toggleAccordion: function (arg) {
            var sender = arg.sender;
            var event = arg.ev;
            

            event.preventDefault();

            var parentContainerId = sender.getAttribute("data-bs-parent");
            var parentContainerEl = document.getElementById(parentContainerId);
            var targetContainerId = sender.getAttribute("data-bs-target");
            var targetContainerEl = document.getElementById(targetContainerId);
         
            var targetContainerElHeight = $("#" + targetContainerId).find(".accordion-body").outerHeight(true)

            var openedItem = parentContainerEl.querySelectorAll(".accordion-button.collapsed")
            var openedTargetId = null;
            if (openedItem) {

                for (var i = 0; i < openedItem.length; i++) {

                    openedTargetId = openedItem[i].getAttribute("data-bs-target")
                    var openedTargetEl = document.getElementById(openedTargetId);
                    openedItem[i].classList.remove("collapsed");
                    openedTargetEl.style.height = 0;
                    openedTargetEl.classList.remove("on");
                    openedTargetEl.removeAttribute("style");
                }

            }
            if (!sender.classList.contains("collapsed")) {
                if (openedTargetId) {
                    if (openedTargetId != targetContainerId) {

                        if (sender.getAttribute("data-top-parent")) {
                            var opendTopElId = sender.getAttribute("data-top-parent");
                            var openedTopElHeight = $("#" + opendTopElId).find(".accordion-collapse.on").outerHeight(true)
                            var totalHeight = openedTopElHeight + targetContainerElHeight + "px";
                            $("#" + opendTopElId).find(".accordion-collapse.on").css("height", totalHeight);
                        }
                        sender.classList.add("collapsed");
                        targetContainerEl.classList.add("on");
                        targetContainerEl.style.height = targetContainerElHeight + "px";

                    }
                } else {

                    if (sender.getAttribute("data-top-parent")) {
                        var opendTopElId = sender.getAttribute("data-top-parent");
                        var openedTopElHeight = $("#" + opendTopElId).find(".accordion-collapse.on").outerHeight(true)
                        var totalHeight = openedTopElHeight + targetContainerElHeight +"px";
                        $("#" + opendTopElId).find(".accordion-collapse.on").css("height", totalHeight);
                    }

                    sender.classList.add("collapsed");
                    targetContainerEl.classList.add("on");
                    targetContainerEl.style.height = targetContainerElHeight + "px";

                }
            }

        }
    },
    DropMenu: {
        show: function (arg) {
            // Disable sender to avoid multiple clicks from user.
            arg.ev.preventDefault();
            var sender = arg.sender;
            if (sender.disabled) { return false; }
            sender.disabled = true;
            setTimeout(function () { sender.disabled = false; }, 500);

            // Close other dropmenu if any open.
            var activeDropMenu = document.querySelector('.f-dropmenu.on');
            if (activeDropMenu) {
                activeDropMenu.classList.remove('on');
            }

            // Get sender coordinates values to place dropmenu on correct positioning.
            var coords;

            if (arg.hasOwnProperty("isFixed") && arg.isFixed) {
                coords = getOffset("#" + sender.id, false);
            }
            else {
                coords = getOffset("#" + sender.id);
            }


            // Display overlay with specific class.
            Felece.Globals.overlayWrElem.classList.add('f-dropmenu-overlay');
            setTimeout(function () { Felece.Globals.overlayWrElem.classList.add('on'); }, 10);

            // Get related dropmenu container and display with animation.
            var menuEl = document.getElementById(arg.menuId);

            if (arg.hasOwnProperty("animation")) {
                // Set custom animation format.
                menuEl.classList.add(arg.animation);
            }
            else {
                // Set default animation format.
                menuEl.classList.add("f-dropmenu-fade");
            }

            setTimeout(function () { menuEl.classList.add('on'); }, 10);

            // Assign menu top & left values.

            menuEl.style.top = coords.bottom + "px";
            menuEl.style.left = coords.left + "px";

            // Clone sender and place under content wrapper for z-index purpose.
            var clonedSender = sender.cloneNode(true);
            clonedSender.id = sender.id + "-clone";
            clonedSender.classList.add("f-dropmenu-cloned-sender");
            clonedSender.style.top = coords.top + "px";
            clonedSender.style.left = coords.left + "px";
            clonedSender.setAttribute("onclick", "Felece.UX.DropMenu.hide();");

            if (arg.hasOwnProperty("clonedSenderClass")) {
                // If specific class specified for cloned sender element.
                clonedSender.classList.add(arg.clonedSenderClass);
            }

            if (arg.hasOwnProperty("hideOnScroll")) {
                // Add a flag for scrolling event which is used to hide on scroll.
                clonedSender.setAttribute("data-hide-on-scroll", arg.hideOnScroll);
            }

            Felece.Globals.pageWr.appendChild(clonedSender);

            // Set actual sender invisible.
            sender.style.visibility = "hidden";
        },

        hide: function () {
            var activeDropMenu = document.querySelector('.f-dropmenu.on');

            if (activeDropMenu) {
                // Hide drop menu.
                activeDropMenu.classList.remove('on');

                // Find actual sender and make it visible.
                var clonedSender = document.getElementsByClassName('f-dropmenu-cloned-sender')[0];
                var actualSenderId = clonedSender.id.replace("-clone", "");
                var actualSenderEl = document.getElementById(actualSenderId);
                actualSenderEl.style.visibility = "visible";

                // Remove cloned sender.
                removeElementsByClass('f-dropmenu-cloned-sender');

                // Hide overlay.
                Felece.Globals.overlayWrElem.classList.remove('on');
                setTimeout(function () { Felece.Globals.overlayWrElem.classList.add('f-dropmenu-overlay'); }, 300);

                // Enable scrolling.
                Felece.Base.Scroll.enable();
            }
        },

        overlayClick: function () {
            Felece.UX.DropMenu.hide();
        },

        resize: function () {
            Felece.UX.DropMenu.hide();
        },

        escKeyPress: function () {
            Felece.UX.DropMenu.hide();
        },

        onScroll: function () {
            // Check if need to hide on scrolling.
            var clonedSender = document.querySelector('.f-dropmenu-cloned-sender[data-hide-on-scroll=true]');

            if (clonedSender) {
                Felece.UX.DropMenu.hide();
            }
        }
    }
};