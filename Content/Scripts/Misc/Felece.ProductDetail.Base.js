Felece.ProductDetail = {

    Props: {
        productDetailAreaId: "productDetailArea",
        compBasketBarId: "compBasketBar",
    
        
        
    },

    Elements: {},

    Current: {

    },

    Actions: {

        init: function () {

            Felece.ProductDetail.Helper.setCurrent();
            Felece.ProductDetail.Helper.setElements();
        },
        onScroll: function () {
            if (Felece.Base.Props.MediaQ.Curr.key != "xs1") {
            var elements = Felece.ProductDetail.Elements;
            var current = Felece.ProductDetail.Current;

            var productDetailStatus = elements.productDetailAreaEl.getBoundingClientRect();
            var compBasketBarStatus = elements.compBasketBarEl.getBoundingClientRect();

            if (productDetailStatus.bottom < compBasketBarStatus.top) {
                elements.compBasketBarEl.classList.add("on");
            } else {
                elements.compBasketBarEl.classList.remove("on");
            }
            }
        },

      
    },

    Helper: {
        setCurrent: function () {
            Felece.ProductDetail.Current = {
                state: null,

            };
        },

        setElements: function () {
            var props = Felece.ProductDetail.Props;
            var elements = Felece.ProductDetail.Elements;
            elements.productDetailAreaEl = document.getElementById(props.productDetailAreaId);
            elements.compBasketBarEl = document.getElementById(props.compBasketBarId);
       
        }
    }
};

Felece.ProductDetail.Actions.init();