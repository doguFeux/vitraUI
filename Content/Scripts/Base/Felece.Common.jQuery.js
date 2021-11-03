if (window.jQuery) {
    $(document).ready(function () {
        // Run validation rules.
        if (!isJsonEmpty(Felece.Validation)) {
            Felece.Validation.Actions.init();
        }

        // Run select2 setup.
        if (!isJsonEmpty(Felece.Select2)) {
            Felece.Select2.Actions.init();
        }

        // Run mask rules.
        if (!isJsonEmpty(Felece.Mask)) {
            Felece.Mask.Actions.init();
        }

        // Check if CurrentPage obj exists. If exists,
        // call CurrentPage related document-ready events.
        if (!isJsonEmpty(Felece.CurrentPage)) {
            if (typeof Felece.CurrentPage.jQueryDocumentReadyEvents === 'function') {
                Felece.CurrentPage.jQueryDocumentReadyEvents();
            }
        }

        // Check if Partial obj exists. If exists,
        // call Partial related document-ready events.
        if (!isJsonEmpty(Felece.Partial)) {
            if (typeof Felece.Partial.jQueryDocumentReadyEvents === 'function') {
                Felece.Partial.jQueryDocumentReadyEvents();
            }
        }
    });
}