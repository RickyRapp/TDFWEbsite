'use strict';

require('slick-carousel');

$('.js-carousel-big').slick({
            
    infinite: false,
    speed: 300,
    slidesToShow: 2.5,
    useTransform: false,
    variableWidth: true,
    nextArrow: '.js-carousel-next',
    prevArrow: '.js-carousel-prev',
    responsive: [
    {
      breakpoint: 768,
      settings: {
        infinite: true,
        slidesToShow: 1,
        variableWidth: false,
        centerMode: false,
        nextArrow: '.js-carousel-next-6',
        prevArrow: '.js-carousel-prev-6'
      }
    }]
});

