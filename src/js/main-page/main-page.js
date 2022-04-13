'use strict';

require('slick-carousel');

$('.js-carousel').slick({
    
    slidesToShow: 2.3,
    infinite: false,
    variableWidth: true,
    nextArrow: '.js-carousel-next',
    prevArrow: '.js-carousel-prev',
    useTransform: false,
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        centerMode: true,
        variableWidth: false,
        infinite: true
      }
    },
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 2,
        centerMode: true,
        variableWidth: false,
        infinite: true,
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        variableWidth: false,
        infinite: true,
        arrow: true,
        nextArrow: '.js-carousel-next-4',
    prevArrow: '.js-carousel-prev-4',
      }
    }
  ]
});

$('.js-carousel-2').slick({
    
    slidesToShow: 2.3,
    infinite: false,
    variableWidth: true,
    nextArrow: '.js-carousel-next-2',
    prevArrow: '.js-carousel-prev-2',
    useTransform: false,
    responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 2,
        centerMode: true,
        variableWidth: false,
        infinite: true,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        variableWidth: false,
        infinite: true,
        nextArrow: '.js-carousel-next-5',
    prevArrow: '.js-carousel-prev-5'
      }
    }
  ]
});

$('.js-carousel-single').slick({

    infinite: false,
    speed: 300,
    slidesToShow: 1,
    dots: true,
    useCss: true,
    useTransform: false,
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        infinite: true
        }
    }]
});

$('.js-carousel-impact').slick({
            
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    variableWidth: false,
    centerMode: false,
    initialSlide: 1,
    useTransform: false,
    nextArrow: '.js-carousel-next-3',
    prevArrow: '.js-carousel-prev-3'
});

