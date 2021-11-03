Felece.Sliders = {
    Props: {
    },

    Elements: {},

    Current: {},

    ready: function () {
        Felece.Sliders.Actions.init();
    },

    Actions: {
        init: function () {
            Felece.Sliders.Helper.setCurrent();
            Felece.Sliders.Helper.setElements();

            // Trigger sliders.
            Felece.Sliders.Actions.owlCarousel01();
            Felece.Sliders.Actions.owlCarousel02();
            Felece.Sliders.Actions.owlCarousel03();
            Felece.Sliders.Actions.owlCarousel04();
            Felece.Sliders.Actions.owlCarousel05();
            Felece.Sliders.Actions.royalslider01();

        },


        owlCarousel01: function () {

            $("#owl-carousel-01").owlCarousel({
                loop: false,
                margin: 24,
                lazyLoad: true,
                center: false,
                items: 4,
                autoWidth: true,
                touchDrag: true,
                responsiveClass: true,
                nav: true,
                navText: [`<a href="javascript:void(0);" class="prev nav">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.25 22.75L13.4837 21.5163L6.85125 14.875H24.5V13.125H6.85125L13.4837 6.48375L12.25 5.25L3.5 14L12.25 22.75Z" fill="#fff" />
                    </svg>
                </a>`, `<a href="javascript:void(0);" class="next nav">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 16H27" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M18 7L27 16L18 25" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
</svg>

                    </a>`],
                responsive: {
                    0: {
                        items: 1,
                        center: false,

                    },
                    300: {
                        items: 2,
                        center: true,
                        margin: 12,
                    },
                    760: {
                        items: 3,
                        center: false,
                        margin: 16,
                    },
                    1024: {
                        items: 4,
                        center: false,
                        margin: 24,
                    },
                }
            });


        },
        owlCarousel02: function () {

            $("#owl-carousel-02").owlCarousel({
                loop: false,
                margin: 24,
                lazyLoad: true,
                center: false,
                items: 4,
                autoWidth: true,
                touchDrag: true,
                responsiveClass: true,
                nav: true,
                navText: [`<a href="javascript:void(0);" class="prev nav">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.25 22.75L13.4837 21.5163L6.85125 14.875H24.5V13.125H6.85125L13.4837 6.48375L12.25 5.25L3.5 14L12.25 22.75Z" fill="#fff" />
                    </svg>
                </a>`, `<a href="javascript:void(0);" class="next nav">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 16H27" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M18 7L27 16L18 25" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
</svg>

                    </a>`],
                responsive: {
                    0: {
                        items: 1,
                        center: false,

                    },
                    300: {
                        items: 2,
                        center: true,
                        margin: 12,
                    },
                    760: {
                        items: 3,
                        center: false,
                        margin: 16,
                    },
                    1024: {
                        items: 4,
                        center: false,
                        margin: 24,
                    },
                }
            });

        },
        owlCarousel03: function () {

            $("#owl-carousel-03").owlCarousel({
                loop: false,
                margin: 24,
                lazyLoad: true,
                center: false,
                items: 4,
                autoWidth: true,
                touchDrag: true,
                responsiveClass: true,
                nav: true,
                navText: [`<a href="javascript:void(0);" class="prev nav">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.25 22.75L13.4837 21.5163L6.85125 14.875H24.5V13.125H6.85125L13.4837 6.48375L12.25 5.25L3.5 14L12.25 22.75Z" fill="#fff" />
                    </svg>
                </a>`, `<a href="javascript:void(0);" class="next nav">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 16H27" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M18 7L27 16L18 25" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
</svg>

                    </a>`],
                responsive: {
                    0: {
                        items: 1,
                        center: false,

                    },
                    300: {
                        items: 2,
                        center: true,
                        margin: 12,
                    },
                    760: {
                        items: 3,
                        center: false,
                        margin: 16,
                    },
                    1024: {
                        items: 4,
                        center: false,
                        margin: 24,
                    },
                }
            });

        },
        owlCarousel04: function () {

            $("#owl-carousel-04").owlCarousel({
                loop: false,
                margin: 24,
                lazyLoad: true,
                center: false,
                items: 4,
                autoWidth: true,
                touchDrag: true,
                responsiveClass: true,
                nav: true,
                navText: [`<a href="javascript:void(0);" class="prev nav">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.25 22.75L13.4837 21.5163L6.85125 14.875H24.5V13.125H6.85125L13.4837 6.48375L12.25 5.25L3.5 14L12.25 22.75Z" fill="#fff" />
                    </svg>
                </a>`, `<a href="javascript:void(0);" class="next nav">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 16H27" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M18 7L27 16L18 25" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
</svg>

                    </a>`],
                responsive: {
                    0: {
                        items: 1,
                        center: false,

                    },
                    300: {
                        items: 2,
                        center: true,
                        margin: 12,
                    },
                    760: {
                        items: 3,
                        center: false,
                        margin: 16,
                    },
                    1024: {
                        items: 4,
                        center: false,
                        margin: 24,
                    },
                }
            });

        },
        owlCarousel05: function () {

            $("#owl-carousel-05").owlCarousel({
                loop: false,
                margin: 24,
                lazyLoad: true,
                center: false,
                items: 4,
                autoWidth: true,
                touchDrag: true,
                responsiveClass: true,
                nav: false,
               
                responsive: {
                    0: {
                        items: 1,
                        center: false,

                    },
                    300: {
                        items: 2,
                        center: true,
                        margin: 12,
                    },
                    760: {
                        items: 3,
                        center: false,
                        margin: 16,
                    },
                    1024: {
                        items: 1,
                        center: false,
                        margin: 24,
                    },
                }
            });

        },

        royalslider01: function () {
            if (document.querySelector("#royalSlider-thumb-01")) {


                if (Felece.Base.Props.MediaQ.Curr.val < 1280) {

                    var slider = $("#royalSlider-thumb-01").data('royalSlider');
                    if (slider) {

                        slider.destroy()
                    }
                    $('#royalSlider-thumb-01').royalSlider({

                        fullscreen: {
                            enabled: true,
                            nativeFS: true
                        },

                        controlNavigation: 'bullets',
                        autoScaleSlider: false,
                        autoHeight: false,
                        loop: false,
                        imageScaleMode: 'fit',
                        slidesSpacing: 0,
                        navigateByClick: true,
                        numImagesToPreload: 2,
                        arrowsNav: false,
                        arrowsNavAutoHide: true,
                        arrowsNavHideOnTouch: true,
                        keyboardNavEnabled: true,
                        fadeinLoadedSlide: true,
                        globalCaption: false,
                        globalCaptionInside: false,
                        controlsInside: false,
                        thumbs: {
                            orientation: 'vertical',
                            appendSpan: true,
                            spacing: 8,
                            autoCenter: false,
                            arrows: false,

                        },
                        imageScaleMode: function (slideObject) {
                            slideObject.iH = 464;
                            slideObject.iW = 464;
                        }
                    });

                }
                else {
                    $('#royalSlider-thumb-01').royalSlider({

                        fullscreen: {
                            enabled: true,
                            nativeFS: true
                        },

                        controlNavigation: 'thumbnails',
                        autoScaleSlider: false,
                        autoHeight: false,
                        loop: false,
                        imageScaleMode: 'fit',
                        slidesSpacing: 0,
                        navigateByClick: true,
                        numImagesToPreload: 2,
                        arrowsNav: false,
                        arrowsNavAutoHide: true,
                        arrowsNavHideOnTouch: true,
                        keyboardNavEnabled: true,
                        fadeinLoadedSlide: true,
                        globalCaption: false,
                        globalCaptionInside: false,
                        controlsInside: false,
                        thumbs: {
                            orientation: 'vertical',
                            appendSpan: true,
                            spacing: 8,
                            autoCenter: false,
                            arrows: false,

                        },
                        imageScaleMode: function (slideObject) {
                            slideObject.iH = 464;
                            slideObject.iW = 464;
                        }
                    });
                }
            }
        },
    },

    UX: {
    },

    Helper: {
        setCurrent: function () {
            Felece.Sliders.Current = {
                state: '',
                status: '',
                submitter: null,
                submitterArg: {}
            };
        },

        setElements: function () {
            var props = Felece.Sliders.Props;
            var elements = Felece.Sliders.Elements;

        },




    }
};


Felece.Sliders.ready();
