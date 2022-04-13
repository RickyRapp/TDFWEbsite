'use strict';

require('slick-carousel');

$('.js-carousel-numbers').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    useTransform: false,
    variableWidth: false,
    centerMode: false,
    nextArrow: '.js-carousel-next-4',
    prevArrow: '.js-carousel-prev-4',
});

$('.js-carousel-pools').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    useTransform: false,
    mobileFirst: true,
    nextArrow: '.js-carousel-next-6',
    prevArrow: '.js-carousel-prev-7',
    responsive: [
          {
                  breakpoint: 480,
                  settings: 'unslick'
          }
    ]
  });