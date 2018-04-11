/*
 360 degree Image Slider v2.0.4
 http://gaurav.jassal.me

 Copyright 2015, gaurav@jassal.me
 Dual licensed under the MIT or GPL Version 3 licenses.

*/
/*
 360 degree Image Slider v2.0.4
 http://gaurav.jassal.me

 Copyright 2015, gaurav@jassal.me
 Dual licensed under the MIT or GPL Version 3 licenses.

*/
(function(d) {
    d.ThreeSixty = function(f, k) {
        var b = this,
            a, g = [];
        b.$el = d(f);
        b.el = f;
        b.$el.data("ThreeSixty", b);
        b.init = function() {
            a = d.extend({}, d.ThreeSixty.defaultOptions, k);
            a.disableSpin && (a.currentFrame = 1, a.endFrame = 1);
            b.initProgress();
            b.loadImages()
        };
        b.resize = function() {};
        b.initProgress = function() {
            b.$el.css({
                width: a.width + "px",
                // height: a.height + "px",
                "background-image": "none !important"
            });
            a.styles && b.$el.css(a.styles);
            b.responsive();
            b.$el.find(a.progress).css({
                marginTop: a.height / 2 - 15 + "px"
            });
            b.$el.find(a.progress).fadeIn("slow");
            b.$el.find(a.imgList).hide()
        };
// This is the part
        b.loadImages = function() {
          for (abc = 0; abc < 20; abc++) {
            var c = document.createElement("li"),
                e = a.zeroBased ? 0 : 1;
            e = a.imgArray ? a.imgArray[a.loadedImages] : a.imagePath + 'dpr_2.0,q_auto:low,c_fill,w_'+window.imageWidth+',h_'+Math.round(window.imageWidth/window.aspectRatio)+',so_'+(0+((a.loadedImages+abc)*window.frameGap)).toFixed(2)+'/'+window.result.public_id+'/' + b.zeroPad((a.loadedImages+abc) + e) + a.ext + (b.browser.isIE() ? "?" + (new Date).getTime() : "");
            e = d("<img>").attr("src", e).addClass("previous-image").appendTo(c);
            g.push(e);
            b.$el.find(a.imgList).append(c);
          }
            d(e).load(function() {
                b.imageLoaded()
            })
        };
        b.imageLoaded = function() {
            a.loadedImages += 20;
            d(a.progress + " span").text(Math.floor(a.loadedImages / a.totalFrames *
                100) + "%");
            a.loadedImages >= a.totalFrames ? (a.disableSpin && g[0].removeClass("previous-image").addClass("current-image"), d(a.progress).fadeOut("slow", function() {
                d(this).hide();
                b.showImages();
                b.showNavigation()
            })) : b.loadImages()
        };
        b.showImages = function() {
            b.$el.find(".txtC").fadeIn();
            b.$el.find(a.imgList).fadeIn();
            b.ready = !0;
            a.ready = !0;
            a.drag && b.initEvents();
            b.refresh();
            b.initPlugins();
            a.onReady();
            setTimeout(function() {
                b.responsive()
            }, 50)
        };
        b.initPlugins = function() {
            d.each(a.plugins, function(c, e) {
                if ("function" ===
                    typeof d[e]) d[e].call(b, b.$el, a);
                else throw Error(e + " not available.");
            })
        };
        b.showNavigation = function() {
            if (a.navigation && !a.navigation_init) {
                var c = d("<div/>").attr("class", "nav_bar"),
                    e = d("<a/>").attr({
                        href: "#",
                        "class": "nav_bar_next"
                    }).html("next"),
                    h = d("<a/>").attr({
                        href: "#",
                        "class": "nav_bar_previous"
                    }).html("previous"),
                    f = d("<a/>").attr({
                        href: "#",
                        "class": "nav_bar_play"
                    }).html("play");
                c.append(h);
                c.append(f);
                c.append(e);
                b.$el.prepend(c);
                e.bind("mousedown touchstart", b.next);
                h.bind("mousedown touchstart",
                    b.previous);
                f.bind("mousedown touchstart", b.play_stop);
                a.navigation_init = !0
            }
        };
        b.play_stop = function(c) {
            c.preventDefault();
            a.autoplay ? (a.autoplay = !1, d(c.currentTarget).removeClass("nav_bar_stop").addClass("nav_bar_play"), clearInterval(a.play), a.play = null) : (a.autoplay = !0, a.play = setInterval(b.moveToNextFrame, a.playSpeed), d(c.currentTarget).removeClass("nav_bar_play").addClass("nav_bar_stop"))
        };
        b.next = function(c) {
            c && c.preventDefault();
            a.endFrame -= 5;
            b.refresh()
        };
        b.previous = function(c) {
            c && c.preventDefault();
            a.endFrame += 5;
            b.refresh()
        };
        b.play = function(c, e) {
            var d = c || a.playSpeed;
            a.autoplayDirection = e || a.autoplayDirection;
            a.autoplay || (a.autoplay = !0, a.play = setInterval(b.moveToNextFrame, d))
        };
        b.stop = function() {
            a.autoplay && (a.autoplay = !1, clearInterval(a.play), a.play = null)
        };
        b.moveToNextFrame = function() {
            1 === a.autoplayDirection ? --a.endFrame : a.endFrame += 1;
            b.refresh()
        };
        b.gotoAndPlay = function(c) {
            if (a.disableWrap) a.endFrame = c, b.refresh();
            else {
                var e = Math.ceil(a.endFrame / a.totalFrames);
                0 === e && (e = 1);
                e = 1 < e ? a.endFrame - (e -
                    1) * a.totalFrames : a.endFrame;
                var d = a.totalFrames - e;
                d = 0 < c - e ? c - e < e + (a.totalFrames - c) ? a.endFrame + (c - e) : a.endFrame - (e + (a.totalFrames - c)) : e - c < d + c ? a.endFrame - (e - c) : a.endFrame + (d + c);
                e !== c && (a.endFrame = d, b.refresh())
            }
        };
        b.initEvents = function() {
            b.$el.bind("mousedown touchstart touchmove touchend mousemove click", function(c) {
                c.preventDefault();
                "mousedown" === c.type && 1 === c.which || "touchstart" === c.type ? (a.pointerStartPosX = b.getPointerEvent(c).pageX, a.dragging = !0, a.onDragStart(a.currentFrame)) : "touchmove" === c.type ?
                    b.trackPointer(c) : "touchend" === c.type && (a.dragging = !1, a.onDragStop(a.endFrame))
            });
            d(document).bind("mouseup", function(b) {
                a.dragging = !1;
                a.onDragStop(a.endFrame);
                d(this).css("cursor", "none")
            });
            d(window).bind("resize", function(a) {
                b.responsive()
            });
            d(document).bind("mousemove", function(c) {
                a.dragging ? (c.preventDefault(), !b.browser.isIE && a.showCursor && b.$el.css("cursor", "url(assets/images/hand_closed.png), auto")) : !b.browser.isIE && a.showCursor && b.$el.css("cursor", "url(assets/images/hand_open.png), auto");
                b.trackPointer(c)
            });
            d(window).resize(function() {
                b.resize()
            })
        };
        b.getPointerEvent = function(a) {
            return a.originalEvent.targetTouches ? a.originalEvent.targetTouches[0] : a
        };
        b.trackPointer = function(c) {
            a.ready && a.dragging && (a.pointerEndPosX = b.getPointerEvent(c).pageX, a.monitorStartTime < (new Date).getTime() - a.monitorInt && (a.pointerDistance = a.pointerEndPosX - a.pointerStartPosX, a.endFrame = 0 < a.pointerDistance ? a.currentFrame + Math.ceil((a.totalFrames - 1) * a.speedMultiplier * (a.pointerDistance / b.$el.width())) : a.currentFrame +
                Math.floor((a.totalFrames - 1) * a.speedMultiplier * (a.pointerDistance / b.$el.width())), a.disableWrap && (a.endFrame = Math.min(a.totalFrames - (a.zeroBased ? 1 : 0), a.endFrame), a.endFrame = Math.max(a.zeroBased ? 0 : 1, a.endFrame)), b.refresh(), a.monitorStartTime = (new Date).getTime(), a.pointerStartPosX = b.getPointerEvent(c).pageX))
        };
        b.refresh = function() {
            0 === a.ticker && (a.ticker = setInterval(b.render, Math.round(1E3 / a.framerate)))
        };
        b.render = function() {
            if (a.currentFrame !== a.endFrame) {
                var c = a.endFrame < a.currentFrame ? Math.floor(.1 *
                    (a.endFrame - a.currentFrame)) : Math.ceil(.1 * (a.endFrame - a.currentFrame));
                b.hidePreviousFrame();
                a.currentFrame += c;
                b.showCurrentFrame();
                b.$el.trigger("frameIndexChanged", [b.getNormalizedCurrentFrame(), a.totalFrames])
            } else window.clearInterval(a.ticker), a.ticker = 0
        };
        b.hidePreviousFrame = function() {
            g[b.getNormalizedCurrentFrame()].removeClass("current-image").addClass("previous-image")
        };
        b.showCurrentFrame = function() {
            g[b.getNormalizedCurrentFrame()].removeClass("previous-image").addClass("current-image")
        };
        b.getNormalizedCurrentFrame = function() {
            if (a.disableWrap) {
                var b = Math.min(a.currentFrame, a.totalFrames - (a.zeroBased ? 1 : 0)),
                    e = Math.min(a.endFrame, a.totalFrames - (a.zeroBased ? 1 : 0));
                b = Math.max(b, a.zeroBased ? 0 : 1);
                e = Math.max(e, a.zeroBased ? 0 : 1);
                a.currentFrame = b;
                a.endFrame = e
            } else b = Math.ceil(a.currentFrame % a.totalFrames), 0 > b && (b += a.totalFrames - (a.zeroBased ? 1 : 0));
            return b
        };
        b.getCurrentFrame = function() {
            return a.currentFrame
        };
        b.responsive = function() {
            a.responsive && b.$el.css({
                height: b.$el.find(".current-image").first().css("height"),
                width: "100%"
            })
        };
        b.zeroPad = function(b) {
            var c = Math.floor(Math.round(Math.log(a.totalFrames) / Math.LN10 * 1E3) / 1E3) + 1;
            b = b.toString();
            if (a.zeroPadding)
                for (; b.length < c;) b = "0" + b;
            return b
        };
        b.browser = {};
        b.browser.isIE = function() {
            var a = -1;
            "Microsoft Internet Explorer" === navigator.appName && null !== /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent) && (a = parseFloat(RegExp.$1));
            return -1 !== a
        };
        b.getConfig = function() {
            return a
        };
        d.ThreeSixty.defaultOptions = {
            dragging: !1,
            ready: !1,
            pointerStartPosX: 0,
            pointerEndPosX: 0,
            pointerDistance: 0,
            monitorStartTime: 0,
            monitorInt: 10,
            ticker: 0,
            speedMultiplier: 7,
            totalFrames: 100,
            currentFrame: 0,
            endFrame: 0,
            loadedImages: 0,
            framerate: 30,
            domains: !0,
            domain: "",
            parallel: !1,
            queueAmount: 8,
            idle: 0,
            filePrefix: "",
            ext: "jpg",
            height: 300,
            width: 300,
            styles: {},
            navigation: !1,
            autoplay: !1,
            autoplayDirection: 1,
            disableSpin: !1,
            disableWrap: !1,
            responsive: !1,
            zeroPadding: !1,
            zeroBased: !1,
            plugins: [],
            showCursor: !1,
            drag: !0,
            onReady: function() {},
            onDragStart: function() {},
            onDragStop: function() {},
            imgList: ".threesixty_images",
            imgArray: null,
            playSpeed: 100
        };
        b.init()
    };
    d.fn.ThreeSixty = function(f) {
        return Object.create(new d.ThreeSixty(this, f))
    }
})(jQuery);
"function" !== typeof Object.create && (Object.create = function(d) {
    function f() {}
    f.prototype = d;
    return new f
});
