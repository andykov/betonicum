require(`./modal`);
require(`./sidebar`);

$(document).ready(() => {


  // Reviews slider
  var rev = $(`.js-reviews`);
  var next, prev;

  rev.on(`init`, function (event, slick, currentSlide) {
    var cur = $(slick.$slides[slick.currentSlide]);
    
    next = cur.next();
    prev = cur.prev();
    prev.addClass(`slick-sprev`);
    next.addClass(`slick-snext`);
    cur.removeClass(`slick-snext`).removeClass(`slick-sprev`);

    slick.$prev = prev;
    slick.$next = next;

  }).on(`beforeChange`, function (event, slick, currentSlide, nextSlide) {

    var cur = $(slick.$slides[nextSlide]);

    slick.$prev.removeClass(`slick-sprev`);
    slick.$next.removeClass(`slick-snext`);
    next = cur.next();
    prev = cur.prev();
    prev.prev();
    prev.next();
    prev.addClass(`slick-sprev`);
    next.addClass(`slick-snext`);

    slick.$prev = prev;
    slick.$next = next;
    cur.removeClass(`slick-next`).removeClass(`slick-sprev`);

  });

  rev.slick({

    speed: 250,
    arrows: true,
    dots: false,
    focusOnSelect: true,
    infinite: true,
    centerMode: true,
    slidesPerRow: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: `194px`,
    swipe: true,
    customPaging(slider, i) {
      return ``;
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: `40px`,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: `40px`,
          slidesToShow: 1
        }
      }
    ]
  });


  // FAQ
  $(`.js-faq-toggle`).on('click', function (e) {
    e.preventDefault();
    var $this = $(this);

    if ($this.hasClass(`show`)) {
      $this.removeClass(`show`);
      $this.next().slideUp(350);
    } else {
      $this.parent().parent().find(`.show`).removeClass(`show`);
      $this.parent().parent().find(`[data-faq-body]`).slideUp(350);
      $this.toggleClass(`show`);
      $this.next().slideToggle(350);
    }
  });

  // Slider Projects
  $('.js-projects').slick({
    dots: false,
    infinite: false,
    speed: 250,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '40px',
        }
      }
    ]
  });

  // Slider Video list
  $('.js-video-list').each(function(){
    if ($(this).children().length > 1) {
      $(this).slick({
        dots: false,
        arrows: false,
        infinite: false,
        speed: 250,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '40px',
        mobileFirst: true,
        responsive: [
          {
            breakpoint: 767,
            settings: 'unslick'
          }
        ]
      });
    } else {
      $(this).children().addClass('video-row__item--full');
    }
  });
  

});
