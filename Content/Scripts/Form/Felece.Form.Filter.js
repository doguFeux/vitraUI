Felece.Filter = {
    Props: {
        asideFilterId: 'aside-filter',
        listContainerId: 'list-container',
        pagingContainerId: 'paging-container',
        chipContainerId: 'filter-chip-container',
        chipContentId: 'filter-chip-content',
        chipListId: 'filter-chip-list',
        formTrademarkId: 'form-trademark',
        formPricerangeTextboxId: 'form-pricerange-textbox',
        formPricerangeSelectionId: 'form-pricerange-selection',
        formScoreId: 'form-score',
        tbTrademarkNameId: 'tbTrademarkName',
        trademarkNameTextSelector: '.trademarkNameText',
        tbPricerangeMinId: 'tbPricerangeMin',
        tbPricerangeMaxId: 'tbPricerangeMax',
        btnPricerangeId: 'btn-pricerange',
        pricerangeMaxVal: 10000000,
        selectSortId: 'sort-select',
        currency: 'TL',
        queryStringPrefix: "flt",
        queryStringPrefix_sort: "srt",
        queryStringPrefix_paging: "pg",
        chipHtml: ''
    },

    Elements: {},

    Current: {},

    Sort: {
        defaultName: '',
        defaultDirection: '',
        currentName: '',
        currentDirection: ''
    },

    Paging: {
        currentNo: 1,
        size: 20
    },

    ready: function (isPageLoad) {
        // Allow filter elements to be built and placed.
        // Then set isPageLoad to false.
        Felece.Filter.Current.isPageLoad = isPageLoad;

        setTimeout(function () {
            Felece.Filter.Current.isPageLoad = false;
        }, 200);
        // End

        // Initiate filter component.
        Felece.Filter.Actions.init();
    },

    Actions: {
        init: function () {
            var props = Felece.Filter.Props;
            var current = Felece.Filter.Current;
            var elements = Felece.Filter.Elements;

            Felece.Filter.Helper.setCurrent();
            Felece.Filter.Helper.setElements();

            // Set default sorting value
            var selectSort = elements.selectSort;
            var selectSortOptionList = selectSort.options;
            var selectedSortIndex = selectSort.selectedIndex;
            var selectedSortOption = selectSortOptionList[selectedSortIndex];
            var selectedSortOptionArgArr = selectedSortOption.getAttribute('data-sort-arg').split('#');
            Felece.Filter.Sort.defaultName = selectedSortOptionArgArr[0];
            Felece.Filter.Sort.currentName = selectedSortOptionArgArr[0];
            Felece.Filter.Sort.defaultDirection = selectedSortOptionArgArr[1];
            Felece.Filter.Sort.currentDirection = selectedSortOptionArgArr[1];
            // End

            // Assign event listeners
            Felece.Filter.Helper.setEventListeners();
        },

        pricerangeSubmit: function (arg) {
            var sender = arg.sender;
            sender.disabled = true;

            // Check if value exists.
            var elements = Felece.Filter.Elements;
            var pricerange_min_val = elements.tbPricerangeMinEl.value;
            var pricerange_max_val = elements.tbPricerangeMaxEl.value;
            var isValid = !(pricerange_min_val === '' && pricerange_max_val === '');

            if (!isValid) {
                sender.disabled = false;
            }
            else if (isValid) {
                var props = Felece.Filter.Props;
                var current = Felece.Filter.Current;

                // Uncheck price range checkboxes
                var pricerange_checkbox_list = elements.formPricerangeSelectionEl.querySelectorAll('[type=checkbox]:checked');

                for (var p = 0; p < pricerange_checkbox_list.length; p++) {
                    var pricerange_checkbox = pricerange_checkbox_list[p];
                    pricerange_checkbox.checked = false;
                }

                // Collect form properties.
                current.formEl = elements.formPricerangeSelectionEl;
                current.submitter = sender;
                current.submitterName = arg.type;
                current.submitterIs = arg.senderIs;

                // Apply UX approach.
                current.formStatus = "presubmitting";
                Felece.Filter.UX.presubmitting();

                // Apply UX approach.
                current.formStatus = "submitting";
                Felece.Filter.UX.submitting();

                // Collect and enrich data.
                Felece.Filter.Helper.collectAndEnrichData();

                // Trigger proxy function.
                Felece.Filter.Actions.proxyCall();

                // Empty textboxes if price range checkbox is sender.
                elements.tbPricerangeMinEl.value = "";
                elements.tbPricerangeMaxEl.value = "";
            }
        },

        checkboxSubmit: function (arg) {
            var sender = arg.sender;
            sender.disabled = true;

            var props = Felece.Filter.Props;
            var current = Felece.Filter.Current;
            var elements = Felece.Filter.Elements;

            // Collect form properties.
            current.formEl = findAncestor(sender, 'form');
            current.submitter = sender;
            current.submitterName = arg.type;
            current.submitterIs = arg.senderIs;

            // Apply UX approach.
            current.formStatus = "submitting";
            Felece.Filter.UX.submitting();

            // Empty textboxes if price range checkbox is sender.
            if (arg.type === 'pricerange') {
                elements.tbPricerangeMinEl.value = "";
                elements.tbPricerangeMaxEl.value = "";
            }

            // Collect and enrich data.
            Felece.Filter.Helper.collectAndEnrichData();

            // Call proxy.
            Felece.Filter.Actions.proxyCall();
        },

        trademarkKeypress: function (arg) {
            var props = Felece.Filter.Props;
            var current = Felece.Filter.Current;
            var elements = Felece.Filter.Elements;
            var inputValue = normalizeString({ value: arg.sender.value });
            var trademarkNameTextList = elements.formTrademarkEl.querySelectorAll(props.trademarkNameTextSelector);

            for (var o = 0; o < trademarkNameTextList.length; o++) {
                var trademarkNameEl = trademarkNameTextList[o];
                var trademarkNameText = normalizeString({ value: trademarkNameEl.innerText });
                var containsValue = trademarkNameText.indexOf(inputValue) > -1;
                var parentLabel = findAncestor(trademarkNameEl, 'label');

                if (containsValue) {
                    parentLabel.style.display = "flex";
                }
                else if (!containsValue) {
                    parentLabel.style.display = "none";
                }
            }
        },

        sortSubmit: function (arg) {
            // Disable sender to avoid double click.
            var sender = arg.sender;
            if (sender.disabled) { return false; }
            sender.disabled = true;

            // Create shortcut variables.
            var props = Felece.Filter.Props;
            var current = Felece.Filter.Current;
            var elements = Felece.Filter.Elements;

            // Collect form properties.
            current.formEl = null;
            current.submitter = sender;
            current.submitterName = arg.type;

            // Apply UX approach.
            current.formStatus = "submitting";
            Felece.Filter.UX.submitting();

            // Get sort values.
            var sortArgArr = "";

            if (arg.type === "selectsort") {
                var selectSortOptionList = sender.options;
                var selectedSortIndex = sender.selectedIndex;
                var selectedSortOption = selectSortOptionList[selectedSortIndex];
                sortArgArr = selectedSortOption.getAttribute('data-sort-arg').split('#');
            }
            else if (arg.type === "linksort") {
                sortArgArr = sender.getAttribute('data-sort').split('#');

                // Reset sort select.
                elements.selectSort.selectedIndex = 0;
            }

            Felece.Filter.Sort.currentName = sortArgArr[0];
            Felece.Filter.Sort.currentDirection = sortArgArr[1];

            // Collect and enrich data.
            Felece.Filter.Helper.collectAndEnrichData();

            // Call proxy.
            Felece.Filter.Actions.proxyCall();
        },

        pagingSubmit: function (arg) {
            // Disable sender to avoid double click.
            var sender = arg.sender;
            if (sender.disabled) { return false; }
            sender.disabled = true;

            // Create shortcut variables.
            var props = Felece.Filter.Props;
            var current = Felece.Filter.Current;
            var elements = Felece.Filter.Elements;

            // Collect form properties.
            current.formEl = null;
            current.submitter = sender;
            current.submitterName = "pager";

            // Apply UX approach.
            current.formStatus = "submitting";
            Felece.Filter.UX.submitting();

            // Set current page number.
            var pagingNo = parseInt(sender.getAttribute('data-pg-no'));
            Felece.Filter.Paging.currentNo = pagingNo;

            // Collect and enrich data.
            Felece.Filter.Helper.collectAndEnrichData();

            // Call proxy.
            Felece.Filter.Actions.proxyCall();
        },

        removeFilterItem: function (arg) {
            var current = Felece.Filter.Current;
            var chipItem;

            if (arg.senderIs === "removeButton") {
                // If chip remove button is clicked. Avoid double click.
                var sender = arg.sender;
                if (sender.disabled || current.action === "removechipitem") { return false; }
                sender.disabled = true;

                // Set current action and shortcut variables.
                current.action = "removechipitem";
                var props = Felece.Filter.Props;
                var elements = Felece.Filter.Elements;

                // Collect form properties.
                current.formEl = null;
                current.submitter = sender;
                current.submitterName = "chipitem";

                // Apply UX approach.
                current.formStatus = "submitting";
                Felece.Filter.UX.submitting();

                chipItem = findAncestor(sender, '.chip-item');
                var relatedFilterElId = chipItem.getAttribute("data-related-filter-id");
                var relatedFilterEl = document.getElementById(relatedFilterElId);

                // Determine related filter element type.
                var elInfo = elementInfo(relatedFilterElId);

                if (elInfo.info === "checkbox") {
                    // Uncheck related checkbox.
                    relatedFilterEl.checked = false;
                }

                // Collect and enrich data.
                Felece.Filter.Helper.collectAndEnrichData();

                // Call proxy.
                Felece.Filter.Actions.proxyCall();
            }
            else if (arg.senderIs === "filterer") {
                // If a filter item is cleared or unchecked...
                var filtererId = arg.sender.id;
                chipItem = document.querySelector('[data-related-filter-id=' + filtererId + ']');
            }

            // Hide container if it is the last chip item.
            if (current.totalChipCount === 0) {
                Felece.Filter.UX.lastFilterRemoved();
            }

            // Remove chip item to avoid fast user click.
            setTimeout(function () {
                chipItem.remove();
            }, 250);
        },

        clearFilters: function (arg) {
            var sender = arg.sender;
            var props = Felece.Filter.Props;
            var current = Felece.Filter.Current;
            var elements = Felece.Filter.Elements;
            var chipList = elements.chipListEl.querySelectorAll('.chip-item');

            // Hide chip list container.
            Felece.Filter.Helper.hideChipContainer();

            // Reset chip related filter elements
            for (var c = 0; c < chipList.length; c++) {
                var chip = chipList[c];
                var relatedFilterElemId = chip.getAttribute('data-related-filter-id');

                var elInfo = elementInfo(relatedFilterElemId);

                if (elInfo.info === "checkbox") {
                    elInfo.el.checked = false;
                }
                else if (elInfo.info === "textbox") {
                    elInfo.el.value = ""; // check and test this part
                }
                else {
                    // continue for other types if needed
                }
            }
            // End

            // Empty chip list container.
            setTimeout(function () {
                elements.chipListEl.innerHTML = "";
            }, 300);

            // Collect form properties.
            current.formEl = null;
            current.submitter = sender;
            current.submitterName = "clearAll";

            // Apply UX approach.
            current.formStatus = "submitting";
            Felece.Filter.UX.submitting();

            // Collect and enrich data.
            Felece.Filter.Helper.collectAndEnrichData();

            // Call proxy.
            current.action = "clearingall";
            Felece.Filter.Actions.proxyCall();
        },

        reset: function () {
            var props = Felece.Filter.Props;
            var current = Felece.Filter.Current;
            var elements = Felece.Filter.Elements;

            Felece.Filter.Helper.setCurrent();

            // To be developed if needed!
        },

        proxyCall: function () {
            var props = Felece.Filter.Props;
            var current = Felece.Filter.Current;
            var elements = Felece.Filter.Elements;

            // If it is page load, then do not call proxy function.
            if (Felece.Filter.Current.isPageLoad) {
                // Apply form-submitting UX approach.
                current.formStatus = "responseSuccess";
                Felece.Filter.UX.responseSuccess();
            }
            else if (!Felece.Filter.Current.isPageLoad) {
                // Apply UX approach.
                current.formStatus = "submitted";
                Felece.Filter.UX.submitted();

                // Get data.
                var data = current.data;

                // Check if submitter is customPricerange. Then get price range values from related textboxes.
                var pricerangeValue;
                if (current.submitterName === "customPricerange") {
                    var minPricerangeValue = data.pricerange.customMinVal;
                    var maxPricerangeValue = data.pricerange.customMaxVal;

                    // Check if value is empty string...
                    minPricerangeValue = minPricerangeValue === "" ? 0 : parseInt(minPricerangeValue);
                    maxPricerangeValue = maxPricerangeValue === "" ? 0 : parseInt(maxPricerangeValue);

                    if (parseInt(minPricerangeValue) > parseInt(maxPricerangeValue)) {
                        if (maxPricerangeValue === 0) {
                            // If user specifies a default min value, set a max value.
                            maxPricerangeValue = props.pricerangeMaxVal;
                        }
                        else {
                            // If user enters a higher value in min...
                            var temp = minPricerangeValue;
                            minPricerangeValue = maxPricerangeValue;
                            maxPricerangeValue = temp;
                        }
                    }

                    pricerangeValue = minPricerangeValue + "-" + maxPricerangeValue;
                    data.pricerange.customMinVal = minPricerangeValue;
                    data.pricerange.customMaxVal = maxPricerangeValue;
                }
                else {
                    pricerangeValue = data.pricerange.checkboxValuesArray.join(',');
                }

                //filterObj.Filters = {
                //    "TRD": data.trademark.checkboxValuesArray.join(','),
                //    "PR": pricerangeValue,
                //    "RS": data.score.checkboxValuesArray.join(',')
                //};

                if (current.submitterName !== "pager") {
                    // If submitter is not paging item, then set current page index 0.
                    Felece.Filter.Paging.currentNo = 1;
                }

                var pageIndex = Felece.Filter.Paging.currentNo;
                var pageSize = Felece.Filter.Paging.size;
                var sorting = Felece.Filter.Sort.currentName + "#" + Felece.Filter.Sort.currentDirection;

                // Assign event listeners
                // Felece.Filter.Helper.setEventListeners();


                // The following chipHtml has to be filled by response like htmlCollection["Chip"];
                props.chipHtml = '<a href="javascript:void(0);" onclick="Felece.Filter.Actions.removeFilterItem({ sender: this, senderIs:\'removeButton\'});" class="chip-remove">' +
                    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z" fill="#FCF3F2" /></svg>' +
                    '</a>' +
                    '<div class="chip-key"></div>' +
                    '<div class="chip-value"></div>';

                // Apply form-submitting UX approach.
                current.formStatus = "responseSuccess";
                Felece.Filter.UX.responseSuccess();

                if (1 === 2) {
                    // *** failure
                    current.formStatus = "responseError";
                    Felece.Filter.UX.responseError();
                }

                // SAMPLE
                //Lidia.Search.Html.SearchProducts('', filterObj, sorting, 0, 50, function (response) {
                //    var htmlCollection = response.HtmlCollection;
                //    elements.listContainerEl.innerHTML = htmlCollection["ProductList"];
                // elements.asideFilterEl.innerHTML = htmlCollection["Filter"];
            }
        }
    },

    UX: {
        presubmitting: function () {
            var props = Felece.Filter.Props;
            var current = Felece.Filter.Current;
            var elements = Felece.Filter.Elements;

            // Add presubmitting class.
            elements.asideFilterEl.classList.add('form-presubmitting');
        },

        submitting: function () {
            var props = Felece.Filter.Props;
            var current = Felece.Filter.Current;
            var elements = Felece.Filter.Elements;

            // Add submitting class
            elements.asideFilterEl.classList.remove('form-presubmitting');
            elements.asideFilterEl.classList.add('form-submitting');

            // Set sortlink item active, but first remove active class from last one.
            if (current.submitterName === "linksort" || current.submitterName === "selectsort") {
                var lastActiveSortItem = document.querySelector('[data-sort].on');

                if (lastActiveSortItem) {
                    lastActiveSortItem.classList.remove('on');
                }

                current.submitter.classList.add("on");
            }

            // Set paging item active, but first remove active class from last one.
            var lastActivePagingItem = document.querySelector('[data-pg-no].on');

            if (lastActivePagingItem) {
                lastActivePagingItem.classList.remove('on');
            }

            if (current.submitterName === "pager") {
                current.submitter.classList.add("on");
            }
            else if (current.submitterName !== "pager") {
                // If submitter is not pager then reset paging item and set to first page.
                var firstPagingItem = document.querySelectorAll('[data-pg-no]')[0];
                firstPagingItem.classList.add("on");
            }
        },

        submitted: function () {
            var props = Felece.Filter.Props;
            var current = Felece.Filter.Current;
            var elements = Felece.Filter.Elements;

            // Add presubmitting class.
            elements.asideFilterEl.classList.remove('form-presubmitting');
            elements.asideFilterEl.classList.remove('form-submitting');
            elements.asideFilterEl.classList.add('form-submitted');
        },

        responseSuccess: function () {
            var props = Felece.Filter.Props;
            var current = Felece.Filter.Current;
            var elements = Felece.Filter.Elements;
            var data = current.data;

            // Add form responded classes.
            elements.asideFilterEl.classList.remove('form-presubmitting');
            elements.asideFilterEl.classList.remove('form-submitting');
            elements.asideFilterEl.classList.remove('form-submitted');
            elements.asideFilterEl.classList.add('form-responded', 'form-response-success');

            if (current.submitterName === "pricerange") {
                // If any customPricerange chip exists, remove it first
                var customPricerangeChips = elements.chipListEl.getElementsByClassName("chip-type-custompricerange")[0];
                if (customPricerangeChips) { customPricerangeChips.remove(); }
            }
            else if (current.submitterName === "customPricerange") {
                // If any pricerange related chip exists remove them first
                customPricerangeChips = elements.chipListEl.getElementsByClassName("chip-type-custompricerange")[0];
                if (customPricerangeChips) { customPricerangeChips.remove(); }

                var regularPricerangeChips = elements.chipListEl.getElementsByClassName("chip-type-pricerange");
                while (regularPricerangeChips.length > 0) {
                    regularPricerangeChips[0].remove();
                }
            }

            // Retrieve info of current submitter element.
            if (current.submitterIs === "filterer") {
                var elInfo = elementInfo("", current.submitter);

                if (elInfo.info === "checkbox") {
                    if (elInfo.isChecked) {
                        // Create new chip item
                        Felece.Filter.Helper.createChipItem();

                        // Append new chip item on chip list container
                        elements.chipListEl.insertBefore(current.newChipItem, elements.chipListEl.childNodes[0]);
                    }
                    else if (!elInfo.isChecked) {
                        Felece.Filter.Actions.removeFilterItem({ sender: current.submitter, senderIs: current.submitterIs });
                    }
                }
                else if (current.submitterName === "customPricerange") {
                    // Create new chip item
                    Felece.Filter.Helper.createChipItem();

                    // Append new chip item on chip list container
                    elements.chipListEl.insertBefore(current.newChipItem, elements.chipListEl.childNodes[0]);
                }

                current.submitter.disabled = false;
            }

            // Set chip container
            if (current.chipStatus === "off" && current.totalChipCount > 0) {
                current.chipStatus = "on";
                var chipContentHeight = Felece.Filter.Elements.chipContentEl.offsetHeight;
                elements.chipContainerEl.classList.add('on');
                elements.chipContainerEl.style.height = chipContentHeight + "px";

                setTimeout(function () {
                    elements.chipContainerEl.style.height = "auto";
                }, 400);
            }

            // Update URL
            if (!Felece.Filter.Current.isPageLoad) {
                updateUrlQueryString({
                    queryStringPrefix: props.queryStringPrefix,
                    queryString: current.url.queryString,
                    queryStringPrefix_sort: props.queryStringPrefix_sort,
                    queryString_sort: Felece.Filter.Sort.currentName + ":" + Felece.Filter.Sort.currentDirection,
                    queryStringPrefix_paging: props.queryStringPrefix_paging,
                    queryString_paging: Felece.Filter.Paging.currentNo
                });
            }

            if (current.action === "clearingall") {
                Felece.Filter.Actions.reset();
            }

            // Reset action value.
            current.action = "";

            // Enable submitter.
            if (current.submitter) { current.submitter.disabled = false; }

            // Scroll to listing start if top elements are not the sender.
            if (current.submitterName !== "chipitem" && current.submitterName !== "linksort" && current.submitterName !== "selectsort") {
                var rect = Felece.Globals.mainElem.getBoundingClientRect();
                var scrollTopVal = parseInt(Felece.Base.Props.Scroll.Y.currval + rect.top);

                if (!isBrowserIE11()) {
                    window.scrollTo({ top: scrollTopVal, left: 0, behavior: 'smooth' });
                }
                else {
                    window.scrollTo(0, scrollTopVal);
                }
            }
        },

        responseError: function () {
            var props = Felece.Filter.Props;
            var current = Felece.Filter.Current;
            var elements = Felece.Filter.Elements;

            // Add form responded classes.
            elements.asideFilterEl.classList.remove('form-presubmitting');
            elements.asideFilterEl.classList.remove('form-submitting');
            elements.asideFilterEl.classList.remove('form-submitted');
            elements.asideFilterEl.classList.add('form-responded', 'form-response-error');

            // Enable sender button.
            current.submitter.disabled = false;
        },

        cancel: function () {
            var props = Felece.Filter.Props;
            var current = Felece.Filter.Current;
            var elements = Felece.Filter.Elements;

            // Remove UX related form css classes.
            elements.asideFilterEl.classList.remove('form-presubmitting');
            elements.asideFilterEl.classList.remove('form-submitting');
            elements.asideFilterEl.classList.remove('form-submitted');
            elements.asideFilterEl.classList.remove('form-responded');
            elements.asideFilterEl.classList.remove('form-response-success');
            elements.asideFilterEl.classList.remove('form-response-error');
            elements.asideFilterEl.classList.remove('form-cancelling');

            // Enable sender button.
            current.submitter.disabled = false;
        },

        lastFilterRemoved: function () {
            var props = Felece.Filter.Props;
            var current = Felece.Filter.Current;
            var elements = Felece.Filter.Elements;

            // To avoid background color to shrink, keep the item, but as hidden. The content is emptied below later.
            elements.chipContentEl.querySelector('.chip-item').style.visibility = "hidden";
            Felece.Filter.Helper.hideChipContainer();

            setTimeout(function () {
                Felece.Filter.Elements.chipListEl.innerHTML = "";
                current.chipStatus = "off";
                Felece.Filter.Actions.reset();
            }, 600);
        }
    },

    Helper: {
        setCurrent: function () {
            Felece.Filter.Current = {
                isPageLoad: Felece.Filter.Current.isPageLoad,
                formStatus: '',
                chipStatus: 'off',
                trademarkChipCount: 0,
                pricerangeChipCount: 0,
                scoreChipCount: 0,
                totalChipCount: 0,
                formEl: null,
                submitter: null,
                submitterName: '',
                newChipItem: null,
                action: '',
                data: {},
                url: {}
            };
        },

        setElements: function () {
            var props = Felece.Filter.Props;
            var current = Felece.Filter.Current;
            var elements = Felece.Filter.Elements;

            elements.asideFilterEl = document.getElementById(props.asideFilterId);
            elements.listContainerEl = document.getElementById(props.listContainerId);
            elements.chipContainerEl = document.getElementById(props.chipContainerId);
            elements.chipContentEl = document.getElementById(props.chipContentId);
            elements.chipListEl = document.getElementById(props.chipListId);
            elements.formTrademarkEl = document.getElementById(props.formTrademarkId);
            elements.formPricerangeTextboxEl = document.getElementById(props.formPricerangeTextboxId);
            elements.formPricerangeSelectionEl = document.getElementById(props.formPricerangeSelectionId);
            elements.formScoreEl = document.getElementById(props.formScoreId);
            elements.tbTrademarkNameEl = document.getElementById(props.tbTrademarkNameId);
            elements.tbPricerangeMinEl = document.getElementById(props.tbPricerangeMinId);
            elements.tbPricerangeMaxEl = document.getElementById(props.tbPricerangeMaxId);
            elements.btnPricerangeEl = document.getElementById(props.btnPricerangeId);
            elements.selectSort = document.getElementById(props.selectSortId);
            elements.pagingContainer = document.getElementById(props.pagingContainerId);

            // Collect sorting elements into an array.
            elements.sortingElements = document.querySelectorAll("[data-sort]");

            // Collect paging elements into an array.
            elements.pagingElements = elements.pagingContainer.querySelectorAll("[data-pg-no]");
        },

        collectAndEnrichData: function () {
            var props = Felece.Filter.Props;
            var current = Felece.Filter.Current;
            var elements = Felece.Filter.Elements;

            // Collect form data
            formCollect({ sender: 'filter', current: Felece.Filter.Current, buildUrl: true, buildSortUrl: true, container: elements.asideFilterEl });
            var data = current.data;

            // Trademark
            data.trademark.searchedName = data.trademark.textboxSection.tbTrademarkName.val;
            var data_trademark_checboxValues_string = jsonValListByCondition(data.trademark.checkboxSection, "isChecked", true, "val", false, ",");
            data.trademark.checkboxValuesArray = data_trademark_checboxValues_string === "" ? [] : data_trademark_checboxValues_string.split(',');
            current.trademarkChipCount = data.trademark.checkboxValuesArray.length;

            // Price Range
            data.pricerange.customMinVal = data.pricerange.textboxSection.tbPricerangeMin.val;
            data.pricerange.customMaxVal = data.pricerange.textboxSection.tbPricerangeMax.val;

            var data_pricerange_checboxValues_string = jsonValListByCondition(data.pricerange.checkboxSection, "isChecked", true, "val", false, ",");
            data.pricerange.checkboxValuesArray = data_pricerange_checboxValues_string === "" ? [] : data_pricerange_checboxValues_string.split(',');
            current.pricerangeChipCount = (data.pricerange.customMinVal === "" && data.pricerange.customMaxVal === "") ? data.pricerange.checkboxValuesArray.length : 1;

            // Score
            var data_score_string = jsonValListByCondition(data.score, "isChecked", true, "val", false, ",");
            data.score.checkboxValuesArray = data_score_string === "" ? [] : data_score_string.split(',');
            current.scoreChipCount = data.score.checkboxValuesArray.length;

            // Total Count
            current.totalChipCount = parseInt(current.trademarkChipCount) + parseInt(current.pricerangeChipCount) + parseInt(current.scoreChipCount);
        },

        createChipItem: function (arg) {
            var props = Felece.Filter.Props;
            var current = Felece.Filter.Current;
            var elements = Felece.Filter.Elements;

            // Get chip properties
            var chip_properties = current.submitter.getAttribute("data-chip");
            var chip_obj = JSON.parse(chip_properties);
            var chip_header = chip_obj.header;
            var chip_key = "";
            var chip_value = "";

            if (current.submitterName === "customPricerange") {
                maxValueString = "- " + current.data.pricerange.customMaxVal + " " + props.currency;
                maxValueString = parseInt(current.data.pricerange.customMaxVal) === parseInt(props.pricerangeMaxVal) ? elements.tbPricerangeMaxEl.getAttribute("data-empty") : maxValueString;
                chip_key = current.data.pricerange.customMinVal + " " + maxValueString;
            }
            else {
                chip_key = chip_obj.key;

                if (chip_obj.value) {
                    chip_value = chip_obj.value;
                }
            }

            // Fill chip-html placeholder with values
            var chipItem = document.createElement('div');
            chipItem.classList.add("chip-item");
            chipItem.classList.add("chip-type-" + current.submitterName.toLowerCase());
            chipItem.setAttribute("data-related-filter-id", current.submitter.id);
            chipItem.innerHTML = props.chipHtml;

            var chipKey = chipItem.getElementsByClassName('chip-key')[0];
            var chipValue = chipItem.getElementsByClassName('chip-value')[0];
            chipKey.innerHTML = chip_header;
            chipValue.innerHTML = chip_key + (chip_value !== '' ? ':' + chip_value : '');

            // Add newly created chip on current obj
            current.newChipItem = chipItem;
        },

        hideChipContainer: function () {
            var props = Felece.Filter.Props;
            var current = Felece.Filter.Current;
            var elements = Felece.Filter.Elements;

            // Hide chip list container. First set its height from auto to actual px value.
            // Then set to 0.
            if (Felece.Filter.Elements.chipContainerEl.classList.contains('on')) {
                var chipContentHeight = Felece.Filter.Elements.chipContentEl.offsetHeight;
                elements.chipContainerEl.style.height = chipContentHeight + "px";

                setTimeout(function () {
                    elements.chipContainerEl.classList.remove('on');
                    elements.chipContainerEl.style.height = "0px";
                }, 20);
            }
        },

        setEventListeners: function () {
            var elements = Felece.Filter.Elements;

            // Assign event listener.
            if (elements.formTrademarkEl) {
                var trademark_checkboxlist = elements.formTrademarkEl.querySelectorAll('[type=checkbox]');

                for (var t = 0; t < trademark_checkboxlist.length; t++) {
                    var trademark_chk = trademark_checkboxlist[t];

                    trademark_chk.addEventListener('change', function () {
                        Felece.Filter.Actions.checkboxSubmit({ sender: this, type: 'trademark', senderIs: 'filterer' });
                    });
                }

                elements.tbTrademarkNameEl.addEventListener('keyup', function (e) {
                    Felece.Filter.Actions.trademarkKeypress({ sender: this });
                });
            }

            if (elements.formPricerangeSelectionEl) {
                var pricerange_checkboxlist = elements.formPricerangeSelectionEl.querySelectorAll('[type=checkbox]');

                for (var p = 0; p < pricerange_checkboxlist.length; p++) {
                    var pricerange_chk = pricerange_checkboxlist[p];

                    pricerange_chk.addEventListener('change', function () {
                        Felece.Filter.Actions.checkboxSubmit({ sender: this, type: 'pricerange', senderIs: 'filterer' });
                    });
                }

                // Assign price range submit button onclick event listener
                if (elements.btnPricerangeEl) {
                    elements.btnPricerangeEl.addEventListener('click', function (e) {
                        e.preventDefault();
                        Felece.Filter.Actions.pricerangeSubmit({ sender: this, type: 'customPricerange', senderIs: 'filterer' });
                    });
                }
            }

            if (elements.formScoreEl) {
                var score_checkboxlist = elements.formScoreEl.querySelectorAll('[type=checkbox]');

                for (var s = 0; s < score_checkboxlist.length; s++) {
                    var score_chk = score_checkboxlist[s];

                    score_chk.addEventListener('change', function () {
                        Felece.Filter.Actions.checkboxSubmit({ sender: this, type: 'score', senderIs: 'filterer' });
                    });
                }
            }

            if (elements.sortingElements) {
                for (var so = 0; so < elements.sortingElements.length; so++) {
                    var sortingEl = elements.sortingElements[so];
                    var tag = sortingEl.tagName.toLowerCase();

                    if (tag === "select") {
                        sortingEl.addEventListener('change', function (e) {
                            e.preventDefault();
                            Felece.Filter.Actions.sortSubmit({ sender: this, type: 'selectsort', senderIs: 'sorter' });
                        });
                    }
                    else if (tag === "a") {
                        sortingEl.addEventListener('click', function (e) {
                            e.preventDefault();
                            Felece.Filter.Actions.sortSubmit({ sender: this, type: 'linksort', senderIs: 'sorter' });
                        });
                    }
                }
            }

            if (elements.pagingElements) {
                for (var pg = 0; pg < elements.pagingElements.length; pg++) {
                    var pagingEl = elements.pagingElements[pg];

                    pagingEl.addEventListener('click', function (e) {
                        e.preventDefault();
                        Felece.Filter.Actions.pagingSubmit({ sender: this, senderIs: 'pager' });
                    });
                }
            }
            // End
        }
    }
};

if (!Felece.Globals.isMF) {
    Felece.Filter.ready(true);
}