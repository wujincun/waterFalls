/**
 * Created by wujincun on 2016/8/30.
 */
var obj = {};
(function ($) {
    function Waterfall() {
        this.data = {
            'data': [{'src': 'P_013.jpg'}, {'src': 'P_014.jpg'}, {'src': 'P_015.jpg'}, {'src': 'P_016.jpg'}, {'src': 'P_017.jpg'}, {'src': 'P_018.jpg'}, {'src': 'P_019.jpg'},]
        };
        this.init();
        this.render();
        this.bind();
    }
    $.extend(Waterfall.prototype, {
        init: function () {
            this.stage = $('#main');
        },
        render: function () {
            var _this = this;
            $(window).on('load', function () {
                _this.waterfallLayout();
            })
        },
        bind: function () {
            var _this = this;
            $(window).on('scroll', function () {
                if (_this.checkScrollSlide()) {
                    var data = _this.data.data;
                    $.each(data,function (key,value) {
                        $('<li class="box"><div class="pic"><img src="images/'+ value.src +'"> </div></li>').appendTo(_this.stage);
                    });
                    _this.waterfallLayout()
                }
            })
        },
        waterfallLayout: function () {
            var _this = this;
            screenW = $(window).width();
            var oBoxes = $('.box');
            var oBoxW = oBoxes.eq(0).outerWidth();
            var col = Math.floor(screenW / oBoxW);
            var arrH = [], index, minH;
            oBoxes.each(function (key,value) {
                if (key < col) {
                    arrH.push($(value).outerHeight());
                } else {
                    $(value).css({
                        position: 'absolute',
                        left: oBoxW * index + 'px',
                        top: minH + 'px'
                    });
                    arrH[index] += $(value).outerHeight()
                }
                minH = Math.min.apply(null, arrH);
                index = $.inArray(minH, arrH);
            })
        },
        checkScrollSlide: function () {
            var _this = this;
            var scrollTop = $(window).scrollTop();
            var screenH = $(window).height();
            var lastBox = _this.stage.find('.box').last();
            var lastBoxTop = lastBox.offset().top;
            var lastBoxHalfH = Math.floor(lastBox.outerHeight() / 2);
            return (lastBoxTop + lastBoxHalfH <= scrollTop + screenH )?true:false
        }
    });
    obj.waterfall = Waterfall
})(jQuery);
new obj.waterfall();
