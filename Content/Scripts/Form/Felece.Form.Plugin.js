﻿Felece.Select2 = {
    Props: {
        search: true,
        minimumResultsForSearch: 10,
        placeholder: 'Seçiniz',
        minimumInputLength: 1,
        language: 'tr',
        dropdownCssClass: '',
        ajaxUrl: '',
        width: '100%',
        height: '100%',
        funcName: '',
        funcArg: ''
    },

    Actions: {
        init: function (arg) {
            if (arg === undefined || arg === null) arg = {};

            // Find select2 elements.
            var s2Selector = "data-s2";
            var s2Elements;
            var containerSelector = arg.containerSelector;
            var specificS2Selector = arg.specificS2Selector;

            if ('containerSelector' in arg) {
                // If specific container element is requested.
                s2Elements = $(containerSelector).find('select[' + s2Selector + ']');
                s2Elements.each(function (index, selectElem) {
                    if ($(selectElem).data('select2')) {
                        $(selectElem).select2('destroy');
                    }

                    $(containerSelector).find('.select2-container').remove();
                });
            }
            else if ('specificS2Selector' in arg) {
                // If specific select2 element is requested.
                s2Elements = $(specificS2Selector);
            }
            else {
                // Get all select2 elements.
                s2Elements = $('select[' + s2Selector + ']');
            }

            // Loop through all select2 elements to initiate.
            s2Elements.each(function (index, selectElem) {
                // Clone default properties to use as current select2 properties.
                var currentProps = JSON.parse(JSON.stringify(Felece.Select2.Props));

                // Retrieve json properties and update current properties. The attribute value can be 
                // empty string or just set as 'true'. Therefore, check the length of newPropArg value.
                var newPropArg = $(selectElem).attr(s2Selector);

                if (newPropArg.length > 5) {
                    var newProps = JSON.parse($(selectElem).attr(s2Selector));

                    for (var key in newProps) {
                        currentProps[key] = newProps[key];
                    }
                }

                // Setup select2 properties by using currentProps object
                $.fn.select2.defaults.set("width", currentProps.width);
                $.fn.select2.defaults.set("height", currentProps.height);
                $.fn.select2.defaults.set("minimumResultsForSearch", currentProps.search ? currentProps.minimumResultsForSearch : "Infinity");
                $.fn.select2.defaults.set("placeholder", currentProps.placeholder);
                $.fn.select2.defaults.set("minimumInputLength", currentProps.minimumInputLength);
                $.fn.select2.defaults.set("language", currentProps.language);
                $.fn.select2.defaults.set("dropdownCssClass", currentProps.dropdownCssClass);

                // If select2 element is in a modal form, then set modal as parent container.
                var dropdownParent = containerSelector === "#modal-wrapper" ? $('#modal-wrapper').find('form') : $(document.body);
                $.fn.select2.defaults.set("dropdownParent", dropdownParent);

                if (currentProps.ajaxUrl === '') {
                    // If no remote data is implemented...
                    $(selectElem).select2();

                    // If select has a default value, then apply on current select2 element, too.
                    var defaultValue = $(selectElem).val();
                    if (defaultValue && defaultValue !== '') {
                        $(selectElem).change();
                    }
                }
                else if (currentProps.ajaxUrl !== '') {
                    // If remote data is called by ajax url...

                    $(selectElem).select2({
                        ajax: {
                            type: "POST",
                            url: currentProps.ajaxUrl,
                            dataType: 'json',
                            delay: 250,
                            data: function (input) {
                                return {
                                    "prefix": input.term
                                };
                            },
                            processResults: function (data) {
                                return {
                                    results: $.map(data.Result, function (item) {
                                        return {
                                            text: item.Text,
                                            id: item.Value,
                                            data: item
                                        };
                                    })
                                };
                            }
                        }
                    });

                    // On edit mode use data-edit object as selected object.
                    var editValueString = $(selectElem).attr('data-edit');

                    if (editValueString) {
                        // Usually the array string is like --> "99|sample name"
                        // In case it is a multiple selection, then the array string is like --> "99|sample name~98|sample name 2"
                        // So loop through the array string in case it is a multiple selection.
                        var optionListArr = editValueString.split('~');

                        $(optionListArr).each(function (index, optionItem) {
                            var optionItemArr = optionItem.split('|');

                            if (optionItemArr.length > 0) {
                                var jsonObj = {
                                    id: optionItemArr[0],
                                    full_name: optionItemArr[1]
                                };

                                // Create the option and append to Select2.
                                var option = new Option(jsonObj.full_name, jsonObj.id, true, true);
                                $(selectElem).append(option).trigger('change');

                                // manually trigger the select2:select event
                                $(selectElem).trigger({
                                    type: 'select2:select',
                                    params: { data: jsonObj }
                                });
                            }
                        });
                    }
                }

                // Setup onchange event for current select2 element.
                $(selectElem).on("change", function (e) {
                    // Jquery validate current select on change
                    if (this.hasAttribute("data-rule-required") || this.hasAttribute("data-rule-depends")) {
                        $(this).valid();
                    }

                    // Validate elements in a specific group on select-change.
                    if (this.hasAttribute("data-validate-group-name")) {
                        var currentSelection = $(this).val();
                        var groupName = $(this).attr("data-validate-group-name"); // Dependent group elements...

                        // Loop through each element to trigger dependent validation.
                        $('[data-group=' + groupName + ']').each(function (index, elem) {
                            // Check if dependent element is valid. If valid, error message is removed which is
                            // defined as 'depends' method in Felece.Form.Validation.js
                            var isValid = $(elem).valid();

                            // Check if current selected option is equal to dependent value.
                            var dependentValue = $(elem).attr("data-dependent-src").split('#')[1];

                            if (currentSelection !== dependentValue) {
                                // if validated element has to be disabled...
                                if (elem.hasAttribute("data-disable")) {
                                    $(elem).attr('disabled', 'disabled')
                                        .prevAll('label').addClass('disabled')
                                        .parent().addClass('disabled');

                                    // Check element info in order to empty input or deselect option
                                    var elemProps = elementInfo($(elem).attr("id"));

                                    if (elemProps.info === 'select') {
                                        $(elem).val('').change();
                                    }
                                    else if (elemProps.info === 'text') {
                                        $(elem).val('');
                                    }
                                }
                            }
                            else if (currentSelection === dependentValue) {
                                // if validated element has been disabled earlier and needs to be enabled again.
                                if (elem.hasAttribute("disabled")) {
                                    $(elem).removeAttr('disabled', 'disabled')
                                        .prevAll('label').removeClass('disabled')
                                        .parent().removeClass('disabled');
                                }
                            }
                        });
                    }

                    // Determine if another function needs to be triggered.
                    if (currentProps.funcName !== '') {
                        var paramArr = {
                            sender: this,
                            val: $(this).val(),
                            txt: $(this).find('option:selected').text(),
                            arg: JSON.parse(currentProps.funcArg)
                        };

                        executeFunction(currentProps.funcName, paramArr);
                    }
                });
            });
        }
    }
};

Felece.Mask = {
    Props: {},

    Actions: {
        init: function (arg) {
            if (arg === undefined || arg === null) arg = {};

            var maskSelector = "data-maskformat";
            var maskedElements;

            if ('containerSelector' in arg) {
                // If specific container element is requested.
                maskedElements = $(arg.containerSelector).find('[' + maskSelector + ']');
            }
            else if ('specificSelector' in arg) {
                // If specific masked element is requested.
                maskedElements = $(arg.specificSelector);
            }
            else {
                // Get all masked elements.
                maskedElements = $('[' + maskSelector + ']');
            }

            maskedElements.each(function (index, elem) {
                var dataMaskFormat = $(elem).data('maskformat');

                if (dataMaskFormat === "phone") {
                    $(elem).mask("(000) 000 00 00");
                }
                else if (dataMaskFormat === "numeric") {
                    $(elem).mask('Z', {
                        'translation': {
                            Z: { pattern: /^[0-9]+$/, recursive: true }
                        }
                    });
                }
                else if (dataMaskFormat === "postalCode") {
                    $(elem).mask("00000");
                }
                else if (dataMaskFormat === "taxno") {
                    $(elem).mask("0000000000");
                }
                else if (dataMaskFormat === "price") {
                    $(elem).mask("#.##0,00", { reverse: true });
                }
                else if (dataMaskFormat === "stock") {
                    $(elem).mask("#.##0,00", { reverse: true });
                }
                else if (dataMaskFormat === "alphabetic") {
                    $(elem).mask('Z', {
                        'translation': {
                            Z: { pattern: /[A-Za-zÇçİıĞğÖöŞşÜü]/, recursive: true }
                        }
                    });
                }
                else if (dataMaskFormat === "alphabeticWgap") {
                    $(elem).mask('Z', {
                        'translation': {
                            Z: { pattern: /[A-Za-zÇçİıĞğÖöŞşÜü ]/, recursive: true }
                        }
                    });
                }
                else if (dataMaskFormat === "noWhitespace") {
                    $(elem).mask('Z', {
                        'translation': {
                            Z: { pattern: /[^\s]/, recursive: true }
                        }
                    });
                }
               
                else if (dataMaskFormat === "hour") {
                    $(elem).mask("00:00", {
                        placeholder: "__ : __"
                    });
                }
                else { //-> Regular number masking e.g postal code: "00000""
                    $(elem).mask(dataMaskFormat);
                }
            });
        }
    }
};

Felece.DataPicker = {
    Props: {},

    Actions: {
        init: function (arg) {
            if (arg === undefined || arg === null) arg = {};

            // Find select2 elements.
            var drSelector = "data-dr";
            var drElements;
            var containerSelector = arg.containerSelector;
            var specificDrSelector = arg.specificDrSelector;

            if ('containerSelector' in arg) {
                // If specific container element is requested.
                drElements = $(containerSelector).find('[' + drSelector + ']');
            }
            else if ('specificDrSelector' in arg) {
                // If specific select2 element is requested.
                drElements = $(specificDrSelector);
            }
            else {
                // Get all select2 elements.
                drElements = $('[' + drSelector + ']');
            }

            if (drElements.length > 0) {
                var dateformat = "DD.MM.YYYY";
                var rangeSplitter = ' - ';
                moment.locale('tr');

                $(drElements).each(function (index, elem) {
                    var isDisabled = elem.disabled || elem.readOnly;

                    if (!isDisabled) {
                        var arg = JSON.parse($(elem).attr('data-dr'));
                        var parentEl_ = Felece.Modal.Current.state === "on" || Felece.Modal.Current.status === "showing" ? '#modal-body' : 'body';

                        if (!arg.hasOwnProperty("endDate")) {
                            if (arg.hasOwnProperty("maxDuration")) {
                                var maxDuration = arg.maxDuration;
                                var char = maxDuration.charAt(maxDuration.length - 1);
                                var addedDate = maxDuration.slice(0, -1);
                                var from = dateStart.split(".");
                                var f = new Date(from[2], from[1] - 1, from[0]);

                                if (char === "d") {
                                    arg.endDate = new Date(f.setDate(f.getDate() + Number(addedDate))).toLocaleDateString();
                                }
                                else if (char === "m") {
                                    arg.singleDateEnd = new Date(f.setMonth(f.getMonth() + Number(addedDate))).toLocaleDateString();
                                }
                                else if (char === "y") {
                                    arg.singleDateEnd = new Date(f.setFullYear(f.getFullYear() + Number(addedDate))).toLocaleDateString();
                                }
                            }
                        }

                        if (!arg.single) {
                            var startDate_ = moment();
                            var endDate_ = moment().add(2, 'days');

                            $(elem).daterangepicker({
                                startDate: startDate_,
                                endDate: endDate_,
                                autoApply: true,
                                autoUpdateInput: false,
                                parentEl: parentEl_,
                                locale: {
                                    cancelLabel: 'Clear',
                                    format: dateformat
                                },
                                ranges: {
                                    'Gelecek 7 Gün': [moment(), moment().add(7, 'days')],
                                    'Gelecek 30 Gün': [moment(), moment().add(30, 'days')],
                                    'Bu Ay': [moment().startOf('month'), moment().endOf('month')],
                                    'Gelecek Ay': [moment().add(1, 'month').startOf('month'), moment().add(1, 'month').endOf('month')]
                                }
                            });

                            $(elem).on('apply.daterangepicker', function (ev, picker) {
                                var startDt = picker.startDate.format(dateformat);
                                var endDt = picker.endDate.format(dateformat);
                                $(this).val(startDt + rangeSplitter + endDt);

                                var applyFuncStr = $(elem).attr('data-apply');

                                if (applyFuncStr) {
                                    var applyFuncArgs = $(elem).attr('data-args');
                                    applyFuncArgs = applyFuncArgs ? applyFuncArgs + "|" : "";
                                    applyFuncArgs += startDt + "|" + endDt;
                                    executeFunction(elem, applyFuncStr, applyFuncArgs);
                                }
                            });

                            $(elem).on('cancel.daterangepicker', function (ev, picker) {
                                $(this).val('');
                            });
                        }
                        else if (arg.single) {
                            $(elem).daterangepicker({
                                singleDatePicker: true,
                                showDropdowns: true,
                                autoUpdateInput: false,
                                parentEl: parentEl_,
                                startDate: arg.startDate,
                                endDate: arg.endDate,
                                minDate: arg.minDate,
                                maxDate: arg.hasOwnProperty("maxDate") ? arg.maxDate : arg.endDate,
                                locale: {
                                    cancelLabel: 'Clear',
                                    format: dateformat
                                }
                            });

                            $(elem).on('apply.daterangepicker', function (ev, picker) {
                                $(this).val(picker.startDate.format(dateformat));
                            });

                            $(elem).on('cancel.daterangepicker', function (ev, picker) {
                                $(this).val('');
                            });
                        }
                    }
                });
            }
        }
    }
};