/* JS needed only for demo */

$(document).ready(function () {
  /* code for navbar */
  $('.btn-nav').on('click tap', function () {
    navbarMagic();
  });

  $(document).keyup(function (e) {
    if (e.keyCode == 27) {
      navbarMagic();
    }; // esc
  });

  function navbarMagic() {
    $('.left-side').toggleClass('showNav hideNav').removeClass('hidden');
    $('.btn-nav').toggleClass('animated');
  }

  /* toggle classes for demo main span */
  $('.item, .item a').click(function () {
    var current = $(this);
    $(current).addClass('item-active');
    $('.item, .item a').not(current).removeClass('item-active');
    var newClass = $(this).text();
    var p = $('.element');
    $('.text-con span').removeAttr('class');
    setTimeout(function () {
      $('.text-con span').addClass(newClass)
    }, 100)
  });

  /* smooth scroll for nav links */
  $(function () {
    $('a[href*=#]:not([href=#])').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 100
          }, 1000);
          return false;
        }
      }
    });
  });
})