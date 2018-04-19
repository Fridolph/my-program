$(function() {
  var secondaryNav = $('.cd-secondary-nav'),
    secondaryNavTopPosition = secondaryNav.offset().top,
    contentSections = $('.cd-section'),
    taglineOffesetTop = $('#cd-intro-tagline').offset().top + 
      $('#cd-intro-tagline').height() + 
      parseInt($('#cd-intro-tagline').css('paddingTop').replace('px', ''));
  

  $(window).on('scroll', function () {
    // 当滚动高度大于 taglineOffesetTop ， 就将logo部分隐藏
    $(window).scrollTop() > taglineOffesetTop ? 
      $('#cd-logo, .cd-btn').addClass('is-hidden') : 
      $('#cd-logo, .cd-btn').removeClass('is-hidden');

    // 当滚动高度大于 secondaryNavTopPosition， 固定nav及之后的逻辑
    if ($(window).scrollTop() > secondaryNavTopPosition) {
      secondaryNav.addClass('is-fixed');
      $('.cd-main-content').addClass('has-top-margin');      
      setTimeout(function () {
        secondaryNav.addClass('animate-children');
        $('#cd-logo').addClass('slide-in');
        $('.cd-btn').addClass('slide-in');
      }, 50);
    } else {
      secondaryNav.removeClass('is-fixed');
      $('.cd-main-content').removeClass('has-top-margin');
      setTimeout(function () {
        secondaryNav.removeClass('animate-children');
        $('#cd-logo').removeClass('slide-in');
        $('.cd-btn').removeClass('slide-in');
      }, 50);
    }

    // 调用方法
    updateSecondaryNavigation();
  });


  // 该方法通过判断高度决定是否启动锚点
  function updateSecondaryNavigation() {
    contentSections.each(function () {
      var actual = $(this),
        actualAnchor = secondaryNav.find('a[href="#' + actual.attr('id') + '"]'),
        actualHeight = actual.height() + 
          parseInt(actual.css('paddingTop').replace('px', '')) + 
          parseInt(actual.css('paddingBottom').replace('px', ''));
          
      if (actual.offset().top - secondaryNav.height() <= $(window).scrollTop() && 
        actual.offset().top + actualHeight - secondaryNav.height() > $(window).scrollTop()) {
        
        actualAnchor.addClass('active');

      } else {

        actualAnchor.removeClass('active');

      }
    });
  }

  // 移动端的兼容
  $('.cd-secondary-nav-trigger').on('click', function (event) {
    event.preventDefault();
    $(this).toggleClass('menu-is-open');
    secondaryNav.find('ul').toggleClass('is-visible');
  });

  // 平滑滚动,点击二级导航项
  secondaryNav.find('ul a').on('click', function (event) {
    event.preventDefault();
    var target = $(this.hash);
    $('body,html').animate({
      'scrollTop': target.offset().top - secondaryNav.height() + 1
    }, 400);

    // 在移动端，关闭二级导航
    $('.cd-secondary-nav-trigger').removeClass('menu-is-open');
    secondaryNav.find('ul').removeClass('is-visible');
  });

  // 在移动端 关闭主导航
  $('.cd-primary-nav').on('click', function (event) {
    if ($(event.target).is('.cd-primary-nav')) $(this).children('ul').toggleClass('is-visible');
  });
});
