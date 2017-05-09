// 图片预加载 封装为jQuery组件
;(function($) {

  function PreLoad(imgs, options) {
    this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
    this.opts = $.extend({}, PreLoad.DEFAULTS, options);

    if (this.opts.order === 'ordered') {
      this._ordered();
    } else {
      this._unoredered();
    }    
  }

  PreLoad.DEFAULTS = {
    order: 'unordered', // 默认为无序预加载
    each: null, // 每张图片加载完毕后执行
    all: null   // 所有图片记载完毕后执行
  };

  PreLoad.prototype._ordered = function() { // 有序加载
    var opts = this.opts,
        imgs = this.imgs,
        len = imgs.length,
        count = 0;

    orderLoad();

    // 有序预加载
    function orderLoad() {
      var imgObj = new Image();

      $(imgObj).on('load error', function() {

        opts.each && opts.each(count);

        if (count >= len) {
          // 所有图片都已加载完毕
          opts.all && opts.all();
        } else {
          // 若图片没加载完继续调用load事件
          orderLoad();
        }

        count++;

      });

      imgObj.src = images[count];
    }
  }

  PreLoad.prototype._unoredered = function() { // 无序加载
    var imgs = this.imgs,
        opts = this.opts,
        count = 0,
        len = imgs.length;    
    
    $.each(imgs, function(index, src) {

      if (typeof src !== 'string') return;

      var imgObj = new Image();

      $(imgObj).on('load error', function() {
        opts.each && opts.each(count);
        
        // 当所有图片加载完成时要做的事
        if (count >= len - 1) {
          opts.all && opts.all();
        }

        count++;
      });

      imgObj.src = src;
    });
  }

  // jQuery插件的两种写法
  // $.fn.extend -> $('#img').preload()
  // $.extend -> $.preload()

  $.extend({
    preload: function(imgs, opts) {
      new PreLoad(imgs, opts);
    }
  });

})(jQuery);