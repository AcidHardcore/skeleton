/*
"use strict";
var popup = document.querySelector('.page-nav__list');
var burger = document.querySelector('.page-nav__collapse');

//menu and form hide on load page
window.onload = function () {
    popup.classList.add('page-nav__list--close-js');
};
//show menu on tap to burger
burger.addEventListener('click', function (event) {
    event.preventDefault();
    popup.classList.toggle('page-nav__list--close-js');
});
*/



/*
var button = document.querySelector('.page-header__collapse');
var burger = document.querySelector('.page-header__burger');
var cross = document.querySelector('.page-header__cross');

var popup = document.querySelector('.page-nav');
var header = document.querySelector('.page-header');

var map = document.querySelector('.map');
var frame = document.querySelector('.map__iframe');

//menu and form hide on load page
window.onload = function () {
    popup.classList.add('page-nav--close-js');
    header.classList.add('page-header--fixed-js')
};
//show menu on tap to burger
button.addEventListener('tap', function (event) {
    event.preventDefault();
    burger.classList.toggle('page-header__burger--open-menu-js');
    cross.classList.toggle('page-header__cross--hide-menu-js');
    popup.classList.toggle('page-nav--close-js');
    header.classList.toggle('page-header--open-menu-js');

});
//to prevent accidentally move  on a map
map.addEventListener('tap', function (event) {
    event.preventDefault();
    frame.classList.add('map__iframe-js');
});
//when mouse leaves a map it will switch off
map.addEventListener('mouseleave', function (event) {
    event.preventDefault();
    frame.classList.remove('map__iframe-js');
});

*/
