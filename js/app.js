'use strict';

let
    buttonToOpenCatalogueOnMobileVersion = document.querySelector('.mobile-top-menu__button-link'),
    catalogueOnMobileVersion = document.querySelector('.mobile-top-menu__sections'),
    catalogueIcon = document.querySelector('.mobile-top-menu__button-icon'),
    buttonToOpenVerticalSitetoolbar = document.querySelector('.sitetoolbar-vertical__checkbox'),
    verticalSitetoolbar = document.querySelector('.sitetoolbar__sections'),
    sliderSwitches = document.querySelector('.slider__buttons-switching-wrap');


function openVerticalSitetoolbar() {
    verticalSitetoolbar.classList.toggle('active');
}

buttonToOpenVerticalSitetoolbar.addEventListener('change', openVerticalSitetoolbar);


function openCatalogueOnMobileVersion() {
    if (catalogueOnMobileVersion.classList.contains('active')) {
        catalogueIcon.style.transform = 'rotate(-180deg)';
        catalogueOnMobileVersion.firstElementChild.classList.toggle('active');

        setTimeout(() => {
            catalogueOnMobileVersion.classList.toggle('active');
        }, 400);
    } else {
        catalogueIcon.style.transform = 'rotate(180deg)';
        catalogueOnMobileVersion.classList.toggle('active');

        setTimeout(() => {
            catalogueOnMobileVersion.firstElementChild.classList.toggle('active');
        }, 0);
    }
}

buttonToOpenCatalogueOnMobileVersion.addEventListener('click', openCatalogueOnMobileVersion);


function switchSlideOnSlider(event) {
    let target = event.target;

    if (!target.classList.contains('slider__button-switching') ||
        target.classList.contains('active')) return;

    let
        targetParent = target.parentElement,
        slider = targetParent.parentElement;

    for (let i = 0; i < targetParent.children.length; i++) {
        targetParent.children[i].classList.remove('active');
    }

    target.classList.add('active');
    slider.style.opacity = '0';
    setTimeout(() => {
        slider.style.opacity = '1';
    }, 200);
}

sliderSwitches.addEventListener('click', switchSlideOnSlider);