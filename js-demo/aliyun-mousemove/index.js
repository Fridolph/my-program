!
function(n) {
  function r(i) {
    if (e[i]) return e[i].exports;
    var o = e[i] = {
      exports: {},
      id: i,
      loaded: !1
    };
    return n[i].call(o.exports, o, o.exports, r),
    o.loaded = !0,
    o.exports
  }
  var e = {};
  return r.m = n,
  r.c = e,
  r.p = "",
  r(0)
} ([function(n, r, e) {
  "use strict";
  function i(n, r) {
    var e = o(),
    i = r.moduleinfo.link;
    "pc" !== e && i && "" != i && (window.location.href = i)
  }
  function o() {
    for (var n = navigator.userAgent,
    r = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"), e = null, i = 0; i < r.length; i++) if (n.indexOf(r[i]) > 0) {
      e = n;
      break
    }
    return e ? e: "pc"
  }
  e(2);
  var t = $(".wb-zc-aliyun-is-mobilephone-dbl");
  t.each(function() {
    var n = $(this).find("textarea.schemaData"),
    r = n.val(),
    e = JSON.parse(r);
    e && i($(this), e)
  }),
  n.exports = i
},
,
function(n, r) {}]); !
function(t) {
  function i(s) {
    if (e[s]) return e[s].exports;
    var n = e[s] = {
      exports: {},
      id: s,
      loaded: !1
    };
    return t[s].call(n.exports, n, n.exports, i),
    n.loaded = !0,
    n.exports
  }
  var e = {};
  return i.m = t,
  i.c = e,
  i.p = "",
  i(0)
} ([function(t, i, e) {
  "use strict";
  function s(t, i) {
    n(t)
  }
  function n(t) {
    $("#scene").parallax()
  }
  e(2),
  e(6);
  var o = $(".wb-zc-ali-parallax-banner");
  o.each(function() {
    var t = $(this).find("textarea.schemaData"),
    i = t.val(),
    e = JSON.parse(i);
    e && s($(this), e)
  }),
  t.exports = s
},
,
function(t, i) {},
, , ,
function(t, i) {
  "use strict"; !
  function(t, i, e, s) {
    function n(i, e) {
      this.element = i,
      this.$context = t(i).data("api", this),
      this.$layers = this.$context.find(".layer");
      var s = {
        calibrateX: this.$context.data("calibrate-x") || null,
        calibrateY: this.$context.data("calibrate-y") || null,
        invertX: this.$context.data("invert-x") || null,
        invertY: this.$context.data("invert-y") || null,
        limitX: parseFloat(this.$context.data("limit-x")) || null,
        limitY: parseFloat(this.$context.data("limit-y")) || null,
        scalarX: parseFloat(this.$context.data("scalar-x")) || null,
        scalarY: parseFloat(this.$context.data("scalar-y")) || null,
        frictionX: parseFloat(this.$context.data("friction-x")) || null,
        frictionY: parseFloat(this.$context.data("friction-y")) || null,
        originX: parseFloat(this.$context.data("origin-x")) || null,
        originY: parseFloat(this.$context.data("origin-y")) || null,
        pointerEvents: this.$context.data("pointer-events") || !0,
        precision: parseFloat(this.$context.data("precision")) || 1
      };
      for (var n in s) null === s[n] && delete s[n];
      t.extend(this, r, e, s),
      this.calibrationTimer = null,
      this.calibrationFlag = !0,
      this.enabled = !1,
      this.depthsX = [],
      this.depthsY = [],
      this.raf = null,
      this.bounds = null,
      this.ex = 0,
      this.ey = 0,
      this.ew = 0,
      this.eh = 0,
      this.ecx = 0,
      this.ecy = 0,
      this.erx = 0,
      this.ery = 0,
      this.cx = 0,
      this.cy = 0,
      this.ix = 0,
      this.iy = 0,
      this.mx = 0,
      this.my = 0,
      this.vx = 0,
      this.vy = 0,
      this.onMouseMove = this.onMouseMove.bind(this),
      this.onDeviceOrientation = this.onDeviceOrientation.bind(this),
      this.onOrientationTimer = this.onOrientationTimer.bind(this),
      this.onCalibrationTimer = this.onCalibrationTimer.bind(this),
      this.onAnimationFrame = this.onAnimationFrame.bind(this),
      this.onWindowResize = this.onWindowResize.bind(this),
      this.initialise()
    }
    var o = "parallax",
    a = 30,
    r = {
      relativeInput: !1,
      clipRelativeInput: !1,
      calibrationThreshold: 100,
      calibrationDelay: 500,
      supportDelay: 500,
      calibrateX: !1,
      calibrateY: !0,
      invertX: !0,
      invertY: !0,
      limitX: !1,
      limitY: !1,
      scalarX: 10,
      scalarY: 10,
      frictionX: .1,
      frictionY: .1,
      originX: .5,
      originY: .5,
      pointerEvents: !0,
      precision: 1
    };
    n.prototype.transformSupport = function(t) {
      for (var n = e.createElement("div"), o = !1, a = null, r = !1, h = null, l = null, p = 0, c = this.vendors.length; p < c; p++) if (null !== this.vendors[p] ? (h = this.vendors[p][0] + "transform", l = this.vendors[p][1] + "Transform") : (h = "transform", l = "transform"), n.style[l] !== s) {
        o = !0;
        break
      }
      switch (t) {
      case "2D":
        r = o;
        break;
      case "3D":
        if (o) {
          var u = e.body || e.createElement("body"),
          m = e.documentElement,
          d = m.style.overflow,
          y = !1;
          e.body || (y = !0, m.style.overflow = "hidden", m.appendChild(u), u.style.overflow = "hidden", u.style.background = ""),
          u.appendChild(n),
          n.style[l] = "translate3d(1px,1px,1px)",
          a = i.getComputedStyle(n).getPropertyValue(h),
          r = a !== s && a.length > 0 && "none" !== a,
          m.style.overflow = d,
          u.removeChild(n),
          y && (u.removeAttribute("style"), u.parentNode.removeChild(u))
        }
      }
      return r
    },
    n.prototype.ww = null,
    n.prototype.wh = null,
    n.prototype.wcx = null,
    n.prototype.wcy = null,
    n.prototype.wrx = null,
    n.prototype.wry = null,
    n.prototype.portrait = null,
    n.prototype.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i),
    n.prototype.vendors = [null, ["-webkit-", "webkit"], ["-moz-", "Moz"], ["-o-", "O"], ["-ms-", "ms"]],
    n.prototype.motionSupport = !!i.DeviceMotionEvent,
    n.prototype.orientationSupport = !!i.DeviceOrientationEvent,
    n.prototype.orientationStatus = 0,
    n.prototype.transform2DSupport = n.prototype.transformSupport("2D"),
    n.prototype.transform3DSupport = n.prototype.transformSupport("3D"),
    n.prototype.propertyCache = {},
    n.prototype.initialise = function() {
      "static" === this.$context.css("position") && this.$context.css({
        position: "relative"
      }),
      this.pointerEvents || this.$context.css({
        pointerEvents: "none"
      }),
      this.accelerate(this.$context),
      this.updateLayers(),
      this.updateDimensions(),
      this.enable(),
      this.queueCalibration(this.calibrationDelay)
    },
    n.prototype.updateLayers = function() {
      this.$layers = this.$context.find(".layer"),
      this.depthsX = [],
      this.depthsY = [],
      this.$layers.css({
        position: "absolute",
        display: "block",
        left: 0,
        top: 0
      }),
      this.$layers.first().css({
        position: "relative"
      }),
      this.accelerate(this.$layers),
      this.$layers.each(t.proxy(function(i, e) {
        var s = t(e).data("depth") || 0;
        this.depthsX.push(t(e).data("depth-x") || s),
        this.depthsY.push(t(e).data("depth-y") || s)
      },
      this))
    },
    n.prototype.updateDimensions = function() {
      this.ww = i.innerWidth,
      this.wh = i.innerHeight,
      this.wcx = this.ww * this.originX,
      this.wcy = this.wh * this.originY,
      this.wrx = Math.max(this.wcx, this.ww - this.wcx),
      this.wry = Math.max(this.wcy, this.wh - this.wcy)
    },
    n.prototype.updateBounds = function() {
      this.bounds = this.element.getBoundingClientRect(),
      this.ex = this.bounds.left,
      this.ey = this.bounds.top,
      this.ew = this.bounds.width,
      this.eh = this.bounds.height,
      this.ecx = this.ew * this.originX,
      this.ecy = this.eh * this.originY,
      this.erx = Math.max(this.ecx, this.ew - this.ecx),
      this.ery = Math.max(this.ecy, this.eh - this.ecy)
    },
    n.prototype.queueCalibration = function(t) {
      clearTimeout(this.calibrationTimer),
      this.calibrationTimer = setTimeout(this.onCalibrationTimer, t)
    },
    n.prototype.enable = function() {
      this.enabled || (this.enabled = !0, this.orientationSupport ? (this.portrait = null, i.addEventListener("deviceorientation", this.onDeviceOrientation), setTimeout(this.onOrientationTimer, this.supportDelay)) : (this.cx = 0, this.cy = 0, this.portrait = !1, i.addEventListener("mousemove", this.onMouseMove)), i.addEventListener("resize", this.onWindowResize), this.raf = requestAnimationFrame(this.onAnimationFrame))
    },
    n.prototype.disable = function() {
      this.enabled && (this.enabled = !1, this.orientationSupport ? i.removeEventListener("deviceorientation", this.onDeviceOrientation) : i.removeEventListener("mousemove", this.onMouseMove), i.removeEventListener("resize", this.onWindowResize), cancelAnimationFrame(this.raf))
    },
    n.prototype.calibrate = function(t, i) {
      this.calibrateX = t === s ? this.calibrateX: t,
      this.calibrateY = i === s ? this.calibrateY: i
    },
    n.prototype.invert = function(t, i) {
      this.invertX = t === s ? this.invertX: t,
      this.invertY = i === s ? this.invertY: i
    },
    n.prototype.friction = function(t, i) {
      this.frictionX = t === s ? this.frictionX: t,
      this.frictionY = i === s ? this.frictionY: i
    },
    n.prototype.scalar = function(t, i) {
      this.scalarX = t === s ? this.scalarX: t,
      this.scalarY = i === s ? this.scalarY: i
    },
    n.prototype.limit = function(t, i) {
      this.limitX = t === s ? this.limitX: t,
      this.limitY = i === s ? this.limitY: i
    },
    n.prototype.origin = function(t, i) {
      this.originX = t === s ? this.originX: t,
      this.originY = i === s ? this.originY: i
    },
    n.prototype.clamp = function(t, i, e) {
      return t = Math.max(t, i),
      t = Math.min(t, e)
    },
    n.prototype.css = function(i, e, n) {
      var o = this.propertyCache[e];
      if (!o) for (var a = 0,
      r = this.vendors.length; a < r; a++) if (o = null !== this.vendors[a] ? t.camelCase(this.vendors[a][1] + "-" + e) : e, i.style[o] !== s) {
        this.propertyCache[e] = o;
        break
      }
      i.style[o] = n
    },
    n.prototype.accelerate = function(t) {
      for (var i = 0,
      e = t.length; i < e; i++) {
        var s = t[i];
        this.css(s, "transform", "translate3d(0,0,0)"),
        this.css(s, "transform-style", "preserve-3d"),
        this.css(s, "backface-visibility", "hidden")
      }
    },
    n.prototype.setPosition = function(t, i, e) {
      i += "px",
      e += "px",
      this.transform3DSupport ? this.css(t, "transform", "translate3d(" + i + "," + e + ",0)") : this.transform2DSupport ? this.css(t, "transform", "translate(" + i + "," + e + ")") : (t.style.left = i, t.style.top = e)
    },
    n.prototype.onOrientationTimer = function(t) {
      this.orientationSupport && 0 === this.orientationStatus && (this.disable(), this.orientationSupport = !1, this.enable())
    },
    n.prototype.onCalibrationTimer = function(t) {
      this.calibrationFlag = !0
    },
    n.prototype.onWindowResize = function(t) {
      this.updateDimensions()
    },
    n.prototype.onAnimationFrame = function() {
      this.updateBounds();
      var t = this.ix - this.cx,
      i = this.iy - this.cy; (Math.abs(t) > this.calibrationThreshold || Math.abs(i) > this.calibrationThreshold) && this.queueCalibration(0),
      this.portrait ? (this.mx = this.calibrateX ? i: this.iy, this.my = this.calibrateY ? t: this.ix) : (this.mx = this.calibrateX ? t: this.ix, this.my = this.calibrateY ? i: this.iy),
      this.mx *= this.ew * (this.scalarX / 100),
      this.my *= this.eh * (this.scalarY / 100),
      isNaN(parseFloat(this.limitX)) || (this.mx = this.clamp(this.mx, -this.limitX, this.limitX)),
      isNaN(parseFloat(this.limitY)) || (this.my = this.clamp(this.my, -this.limitY, this.limitY)),
      this.vx += (this.mx - this.vx) * this.frictionX,
      this.vy += (this.my - this.vy) * this.frictionY;
      for (var e = 0,
      s = this.$layers.length; e < s; e++) {
        var n = this.depthsX[e],
        o = this.depthsY[e],
        a = this.$layers[e],
        r = this.vx * (n * (this.invertX ? -1 : 1)),
        h = this.vy * (o * (this.invertY ? -1 : 1));
        this.setPosition(a, r, h)
      }
      this.raf = requestAnimationFrame(this.onAnimationFrame)
    },
    n.prototype.onDeviceOrientation = function(t) {
      if (!this.desktop && null !== t.beta && null !== t.gamma) {
        this.orientationStatus = 1;
        var e = (t.beta || 0) / a,
        s = (t.gamma || 0) / a,
        n = i.innerHeight > i.innerWidth;
        this.portrait !== n && (this.portrait = n, this.calibrationFlag = !0),
        this.calibrationFlag && (this.calibrationFlag = !1, this.cx = e, this.cy = s),
        this.ix = e,
        this.iy = s
      }
    },
    n.prototype.onMouseMove = function(t) {
      var i = t.clientX,
      e = t.clientY; ! this.orientationSupport && this.relativeInput ? (this.clipRelativeInput && (i = Math.max(i, this.ex), i = Math.min(i, this.ex + this.ew), e = Math.max(e, this.ey), e = Math.min(e, this.ey + this.eh)), this.ix = (i - this.ex - this.ecx) / this.erx, this.iy = (e - this.ey - this.ecy) / this.ery) : (this.ix = (i - this.wcx) / this.wrx, this.iy = (e - this.wcy) / this.wry)
    };
    var h = {
      enable: n.prototype.enable,
      disable: n.prototype.disable,
      updateLayers: n.prototype.updateLayers,
      calibrate: n.prototype.calibrate,
      friction: n.prototype.friction,
      invert: n.prototype.invert,
      scalar: n.prototype.scalar,
      limit: n.prototype.limit,
      origin: n.prototype.origin
    };
    t.fn[o] = function(i) {
      var e = arguments;
      return this.each(function() {
        var s = t(this),
        a = s.data(o);
        a || (a = new n(this, i), s.data(o, a)),
        h[i] && a[i].apply(a, Array.prototype.slice.call(e, 1))
      })
    }
  } (window.jQuery || window.Zepto, window, document),
  function() {
    for (var t = 0,
    i = ["ms", "moz", "webkit", "o"], e = 0; e < i.length && !window.requestAnimationFrame; ++e) window.requestAnimationFrame = window[i[e] + "RequestAnimationFrame"],
    window.cancelAnimationFrame = window[i[e] + "CancelAnimationFrame"] || window[i[e] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(i, e) {
      var s = (new Date).getTime(),
      n = Math.max(0, 16 - (s - t)),
      o = window.setTimeout(function() {
        i(s + n)
      },
      n);
      return t = s + n,
      o
    }),
    window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
      clearTimeout(t)
    })
  } ()
}]); !
function(a) {
  function t(s) {
    if (i[s]) return i[s].exports;
    var n = i[s] = {
      exports: {},
      id: s,
      loaded: !1
    };
    return a[s].call(n.exports, n, n.exports, t),
    n.loaded = !0,
    n.exports
  }
  var i = {};
  return t.m = a,
  t.c = i,
  t.p = "",
  t(0)
} ([function(a, t, i) {
  "use strict";
  function s(a, t) {
    n(a),
    l(a, t)
  }
  function n(a) {
    d(a),
    e(a)
  }
  function e(a) {
    a.find(".sel-name").on("click",
    function(a) {
      a.preventDefault(),
      $(this).hasClass("sel") ? ($(this).removeClass("sel"), $(this).next(".c-list").hide()) : ($(this).addClass("sel"), $(this).next(".c-list").show())
    }),
    a.find(".product-list .item-li").each(function(a, t) {
      var i = $(this);
      i.find(".area-sel .showself").on("click",
      function(a) {
        a.preventDefault();
        var t = $(this).attr("data-value"),
        s = $(this).attr("data-key");
        $(this).parents(".c-list").hide().prev(".sel-name").removeClass("sel").attr({
          "data-value": t,
          "data-key": s
        }).find(".txt").html(t),
        $(this).hasClass("isabroad") ? (i.find(".sys-sel .hidedom").hide(), i.find(".buy-btn-guonei").hide(), i.find(".buy-btn-guoji").show()) : (i.find(".sys-sel .hidedom").show(), i.find(".buy-btn-guonei").show(), i.find(".buy-btn-guoji").hide())
      }),
      i.find(".sys-sel .showself").on("click",
      function(a) {
        a.preventDefault();
        var t = $(this).attr("data-value"),
        i = $(this).attr("data-key");
        $(this).parent(".c-list").hide().prev(".sel-name").removeClass("sel").attr({
          "data-value": t,
          "data-key": i
        }).find(".txt").html(t)
      }),
      i.find(".price-box p").on("click",
      function(a) {
        a.preventDefault(),
        $(this).addClass("active").siblings().removeClass("active")
      }),
      i.find(".num-box p").on("click",
      function(a) {
        a.preventDefault(),
        $(this).addClass("active").siblings().removeClass("active")
      })
    })
  }
  function d(a) {
    a.find(".product-list .item-li").each(function(a, t) {
      var i = $(this);
      $.ajax({
        type: "GET",
        async: !1,
        url: "//promotion.aliyun.com/promotion/validate/validate.htm",
        data: {
          activityCode: i.find(".buy-btn-guonei").attr("data-code")
        },
        dataType: "json",
        success: function(a) {
          if ("UNPASS_ORDER_SELECTER" == a.data.code) {
            i.find(".ishome.showchild").addClass("disabled").hide(),
            i.find(".sys-sel .hidedom").hide();
            var t = i.find(".sys-sel .c-list .showdom").eq(0).attr("data-key"),
            s = i.find(".sys-sel .c-list .showdom").eq(0).attr("data-value");
            i.find(".sys-sel .sel-name").attr({
              "data-key": t,
              "data-value": s
            }).find(".txt").text(s),
            i.find(".buy-btn-guonei").hide(),
            i.find(".buy-btn-guoji").show()
          }
          $.ajax({
            type: "GET",
            async: !1,
            url: "//promotion.aliyun.com/promotion/validate/validate.htm",
            data: {
              activityCode: i.find(".buy-btn-guoji").attr("data-code")
            },
            dataType: "json",
            success: function(a) {
              if ("UNPASS_ORDER_SELECTER" == a.data.code) {
                i.find(".isabroad.showchild").addClass("disabled").hide(),
                i.find(".sys-sel .hidedom").show();
                var t = i.find(".sys-sel .c-list .showdom").eq(0).attr("data-key"),
                s = i.find(".sys-sel .c-list .showdom").eq(0).attr("data-value");
                i.find(".sys-sel .sel-name").attr({
                  "data-key": t,
                  "data-value": s
                }).find(".txt").text(s),
                i.find(".buy-btn-guonei").show(),
                i.find(".buy-btn-guoji").hide()
              }
              if (i.find(".showchild").length == i.find(".showchild.disabled").length) {
                i.find(".isabroad.showchild").removeClass("disabled").show(),
                i.find(".ishome.showchild").removeClass("disabled").show();
                var s = i.find(".showself").eq(0).attr("data-value"),
                t = i.find(".showself").eq(0).attr("data-key");
                i.find(".area-sel .sel-name").attr("data-value", s),
                i.find(".area-sel .sel-name").attr("data-key", t),
                i.find(".area-sel .sel-name .txt").text(s)
              } else i.find(".showchild").each(function(a, t) {
                if (!$(this).hasClass("disabled")) {
                  var s = $(this).find(".showself").eq(0).attr("data-value"),
                  n = $(this).find(".showself").eq(0).attr("data-key");
                  return i.find(".area-sel .sel-name").attr("data-value", s),
                  i.find(".area-sel .sel-name").attr("data-key", n),
                  i.find(".area-sel .sel-name .txt").text(s),
                  !1
                }
              })
            }
          })
        }
      })
    })
  }
  function l(a, t) {
    a.find(".buy-btn-guonei").each(function(i, s) {
      $(this).on("click",
      function(s) {
        s.preventDefault();
        var n = $(this),
        e = n.attr("data-code");
        o(a, t, n.parents(".item-li"), i, e, window.dlg_guonei)
      })
    }),
    a.find(".buy-btn-guoji").each(function(i, s) {
      $(this).on("click",
      function(s) {
        s.preventDefault();
        var n = $(this),
        e = n.attr("data-code");
        o(a, t, n.parents(".item-li"), i, e, window.dlg_guoji)
      })
    })
  }
  function o(a, t, i, s, n, e) {
    $.ajax({
      type: "GET",
      async: !1,
      url: "//promotion.aliyun.com/promotion/validate/validate.htm",
      data: {
        activityCode: n
      },
      dataType: "json",
      success: function(n) {
        var d = c(a, t, i, s);
        "VALIDATE_SUCCESS" == n.data.code ? "" == d && null == d || window.open(d) : r(a, n.data.code, d, e)
      },
      error: function() {
        r(a, -1, "", e)
      }
    })
  }
  function c(a, t, i, s) {
    var n, e = i.find(".area-sel .sel-name").attr("data-key").toString(),
    d = i.find(".sys-sel .sel-name").attr("data-key").toString(),
    l = parseInt(i.find(".price-box p").index(i.find(".price-box .active")) + 1).toString();
    if (i.find(".num-box").length > 0) var o = parseInt(i.find(".num-box p").index(i.find(".num-box .active")) + 1).toString(),
    c = e + d + l + o;
    else var c = e + d + l;
    var r = t.product[s].linkarr;
    return $.each(r,
    function(a, t) {
      c == t.key && (n = t.value)
    }),
    n
  }
  function r(a, t, i, s) {
    var n, e, d, l = "";
    s[t] ? (e = s[t].title, d = s[t].content, $.each(s[t].buttons,
    function(a, i) {
      l += 0 === a ? "UNPASS_CUSTOMER_CERTIFIED" == t ? '<a class="y-btn y-btn-s y-btn-blue btn-goCertified ' + i.cls + '" data-href="' + i.link + '">' + i.name + "</a>": '<a class="y-btn y-btn-s y-btn-blue ' + i.cls + '" href="' + i.link + '">' + i.name + "</a>": '<a class="y-btn y-btn-s y-btn-white ' + i.cls + '" href="' + i.link + '">' + i.name + "</a>"
    }), n = '<div class="y-dlg-container rule-dialog-wide"><div class="y-mask"></div><div class="y-dlg" style="margin-top: 10px"><div class="y-box"><div class="y-hd"><span class="y-dlg-title">' + e + '</span> <span class="y-dlg-close"><span class="icon-wrong"></span></span></div><div class="y-bd"><div class="y-msg y-msg-warning y-msg-s"><div><div class="y-msg-title">' + d + '</div></div></div><div class="y-ft">' + l + "</div></div></div></div></div>") : (e = s[ - 1].title, d = s[ - 1].content, $.each(s[ - 1].buttons,
    function(a, t) {
      l += 0 === a ? '<a class="y-btn y-btn-s y-btn-blue ' + t.cls + '" href="' + t.link + '">' + t.name + "</a>": '<a class="y-btn y-btn-s y-btn-white ' + t.cls + '" href="' + t.link + '">' + t.name + "</a>"
    }), n = '<div class="y-dlg-container rule-dialog-wide"><div class="y-mask"></div><div class="y-dlg" style="margin-top: 10px"><div class="y-box"><div class="y-hd"><span class="y-dlg-title">' + e + '</span> <span class="y-dlg-close"><span class="icon-wrong"></span></span></div><div class="y-bd"><div class="y-msg y-msg-warning y-msg-s"><div><div class="y-msg-title">' + d + '</div></div></div><div class="y-ft">' + l + "</div></div></div></div></div>"),
    a.find(".dialog-wrap").html(n),
    v(a),
    f(a, i, s)
  }
  function f(a, t, i) {
    var s, n, e, d = "";
    a.find(".btn-goCertified").on("click",
    function(l) {
      l.preventDefault(),
      window.open($(this).attr("data-href") + encodeURIComponent(t)),
      n = i.inCertified.title,
      e = i.inCertified.content,
      $.each(i.inCertified.buttons,
      function(a, t) {
        d += 0 === a ? '<a class="y-btn y-btn-s y-btn-blue ' + t.cls + '" href="' + t.link + '">' + t.name + "</a>": '<a class="y-btn y-btn-s y-btn-white ' + t.cls + '" href="' + t.link + '">' + t.name + "</a>"
      }),
      s = '<div class="y-dlg-container rule-dialog-wide"><div class="y-mask"></div><div class="y-dlg" style="margin-top: 10px"><div class="y-box"><div class="y-hd"><span class="y-dlg-title">' + n + '</span> <span class="y-dlg-close"><span class="icon-wrong"></span></span></div><div class="y-bd"><div class="y-msg y-msg-warning y-msg-s"><div><div class="y-msg-title">' + e + '</div></div></div><div class="y-ft">' + d + "</div></div></div></div></div>",
      a.find(".dialog-wrap").html(s),
      v(a)
    })
  }
  function v(a) {
    a.find(".y-dlg-close,.btn-close,.btn-sure").on("click",
    function(t) {
      t.preventDefault(),
      a.find(".dialog-wrap").html("")
    })
  }
  i(2);
  var u = $(".wb-zc-ali-virtualhost-product");
  u.each(function() {
    var a = $(this).find("textarea.schemaData"),
    t = a.val(),
    i = JSON.parse(t);
    i && s($(this), i)
  }),
  a.exports = s
},
,
function(a, t) {}]); !
function(n) {
  function t(o) {
    if (e[o]) return e[o].exports;
    var i = e[o] = {
      exports: {},
      id: o,
      loaded: !1
    };
    return n[o].call(i.exports, i, i.exports, t),
    i.loaded = !0,
    i.exports
  }
  var e = {};
  return t.m = n,
  t.c = e,
  t.p = "",
  t(0)
} ([function(n, t, e) {
  "use strict";
  function o(n, t) {
    $("#" + t.moduleinfo.id).on("click",
    function(t) {
      t.preventDefault(),
      n.find(".y-dlg-container").show()
    }),
    i(n)
  }
  function i(n) {
    n.find(".y-dlg-close,.y-btn-close").on("click",
    function(t) {
      t.preventDefault(),
      n.find(".y-dlg-container").hide()
    })
  }
  e(2);
  var c = $(".wb-ac-ali-common-rule");
  c.each(function() {
    var n = $(this).find("textarea.schemaData"),
    t = n.val(),
    e = JSON.parse(t);
    e && o($(this), e)
  }),
  n.exports = o
},
,
function(n, t) {}]);
KISSY.add("ali-mod/www-common-riskcontrol/0.0.6/index", ["node"],
function(n, t) {
  function o() {
    this.init.apply(this, arguments)
  }
  var i = t("node");
  return o.prototype = {
    init: function(n, t) {
      var o = this;
      o._node = i.one(n),
      t ? o.loadData(t) : o.bindEvent()
    },
    loadData: function(n) {},
    bindEvent: function() {}
  },
  o
}); !
function(t) {
  function r(n) {
    if (e[n]) return e[n].exports;
    var o = e[n] = {
      exports: {},
      id: n,
      loaded: !1
    };
    return t[n].call(o.exports, o, o.exports, r),
    o.loaded = !0,
    o.exports
  }
  var e = {};
  return r.m = t,
  r.c = e,
  r.p = "",
  r(0)
} ([function(t, r, e) {
  "use strict";
  function n(t, r) {
    o(t)
  }
  function o(t) {}
  e(2);
  var a = $(".wb-zc-dbl-response-hotact");
  a.each(function() {
    var t = $(this).find("textarea.schemaData"),
    r = t.val(),
    e = JSON.parse(r);
    e && n($(this), e)
  }),
  t.exports = n
},
,
function(t, r) {}]);
KISSY.add("ali-mod/www-1111-ad/0.0.12/index", ["node"],
function(n, t) {
  function i() {
    this.init.apply(this, arguments)
  }
  var o = t("node");
  return i.prototype = {
    init: function(n, t) {
      var i = this;
      i._node = o.one(n),
      t ? i.loadData(t) : i.bindEvent()
    },
    loadData: function(n) {},
    bindEvent: function() {}
  },
  i
});
KISSY.add("ali-mod/icandoit/0.0.2/index", ["node"],
function(n, t) {
  function i() {
    this.init.apply(this, arguments)
  }
  var o = t("node");
  return i.prototype = {
    init: function(n, t) {
      var i = this;
      i._node = o.one(n),
      t ? i.loadData(t) : i.bindEvent()
    },
    loadData: function(n) {},
    bindEvent: function() {}
  },
  i
}); !
function(t) {
  function e(i) {
    if (n[i]) return n[i].exports;
    var o = n[i] = {
      exports: {},
      id: i,
      loaded: !1
    };
    return t[i].call(o.exports, o, o.exports, e),
    o.loaded = !0,
    o.exports
  }
  var n = {};
  return e.m = t,
  e.c = n,
  e.p = "",
  e(0)
} ([function(t, e, n) {
  "use strict";
  function i(t, e) {
    this.schemaData = e,
    this.bindEvent(t)
  }
  n(2);
  var o = $(".www-aliyun-common-adv-1");
  i.prototype.initAutoClose = function(t, e) {
    var n = this;
    setTimeout(function() {
      n.close(t)
    },
    Number(e.autoCloseDelay))
  },
  i.prototype.close = function(t) {
    t.hide()
  },
  i.prototype.initCloseEvent = function(t, e) {
    var n = this;
    t.find(".close").on("click",
    function(t) {
      t.preventDefault(),
      n.close($(this).parents(".adv-item"))
    })
  },
  i.prototype.bindEvent = function(t) {
    var e = this,
    n = t.find(".adv-item");
    $.each(this.schemaData.ads,
    function(t, i) {
      var o = n.eq(t);
      switch (i.canClose) {
      case "manual":
        e.initCloseEvent(o, i);
        break;
      case "auto":
        e.initCloseEvent(o, i),
        e.initAutoClose(o, i)
      }
    }),
    t.find(".adv-item")
  },
  o.each(function() {
    var t = $(this).find("textarea.schemaData"),
    e = t.val(),
    n = JSON.parse(e);
    n && new i($(this), n)
  }),
  t.exports = i
},
,
function(t, e) {}]);