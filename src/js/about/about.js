'use strict';

require('slick-carousel');

$('.js-carousel-team').slick({
     infinite: true,
     useTransform: false,
    speed: 300,
    slidesToShow: 1,
    variableWidth: false,
    centerMode: false,
    nextArrow: '.js-carousel-next-4',
    prevArrow: '.js-carousel-prev-4',
});

$('.js-carousel-impact').slick({
            
    infinite: true,
    useTransform: false,
    speed: 300,
    slidesToShow: 1,
    variableWidth: false,
    centerMode: false,
    initialSlide: 1,
    nextArrow: '.js-carousel-next-3',
    prevArrow: '.js-carousel-prev-3'
});