// var butPrev = document.querySelector('.review__prev-js');
// var butNext = document.querySelector('.review__next-js');

//create sliderReview
var sliderReview = Peppermint(document.getElementById('peppermint'), {
    dots: true,
    slideshow: true,
    speed: 500,
    slideshowInterval: 5000,
    cssPrefix: 'peppermint-',
    stopSlideshowAfterInteraction: true,
    dotsContainer: document.querySelector('.slider__paginator')
    //dotsPrepend: true //dots above, false: dots below
    // onSetup: function(n) {
    //     console.log('Peppermint setup done. Slides found: ' + n);
    // }
});

//sliderReview prev button
// butPrev.addEventListener('tap', function (event) {
//     event.preventDefault();
//     sliderReview.prev();
//
// });

//sliderReview next button
// butNext.addEventListener('tap', function (event) {
//     event.preventDefault();
//     sliderReview.next();
//
// });

/*
 butPrev.addEventListener('tap', slider.prev, false);
 butNext.addEventListener('tap', slider.next, false);*/

//Create sliderPrice
// var sliderPrice = Peppermint(document.getElementById('sliderprice'), {
//     dots: true,
//     slideshow: false,
//     speed: 500,
//     slideshowInterval: 5000,
//     startSlide: 1,
//     stopSlideshowAfterInteraction: true
    // onSetup: function(n) {
    //     console.log('Peppermint setup done. Slides found: ' + n);
    // }
// });



// Настройки


/*
{
    //скорость перехода между слайдами, мс
    speed: 300,

        //скорость перехода между слайдами после тача, мс
        touchSpeed: 300,

    //включить слайдшоу
    slideshow: false,

    //интервал переключения слайдов, мс
    slideshowInterval: 4000,

    //останавливать слайдшоу после переключения слайда пользователем
    stopSlideshowAfterInteraction: false,

    //начальный слайд
    startSlide: 0,

    //разрешить управление мышкой
    mouseDrag: true,

    //не включать Peppermint, если слайд один
    disableIfOneSlide: true,

    //Префикс для служебных классов слайдера,
    //таких как `inactive`, `active`, `mouse`, `drag` и т. д.
    //Не забудьте поменять стили соответствующим образом!
    cssPrefix: 'peppermint-',

    //показывать точки
    dots: false,

    //положить точки в начало блока `dotsContainer` (по умолчанию кладутся в конец)
    dotsPrepend: false,

    //Элемент, в который положить точки. По умолчанию корневой элемент слайдера.
    //Может быть где угодно на странице.
    dotsContainer: undefined,

    //Элемент, содержащий слайды. По умолчанию корневой элемент слайдера.
    slidesContainer: undefined,

    //Callback-функция, вызывается при смене слайда.
    //В качестве параметра получает номер слайда.
    onSlideChange: undefined,

    //Callback-функция, вызывается пойсле завершения установки.
    //В качестве параметра получает количество слайдов.
    onSetup: undefined
}
*/
