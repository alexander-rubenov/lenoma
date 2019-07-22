'use strict';

let
    buttonToOpenCatalogueOnMobileVersion = document.querySelector('.mobile-top-menu__button-link'),
    catalogueOnMobileVersion = document.querySelector('.mobile-top-menu__sections'),
    buttonToOpenVerticalSitetoolbar = document.querySelector('.sitetoolbar-vertical__checkbox'),
    verticalSitetoolbar = document.querySelector('.sitetoolbar__sections');


function openVerticalSitetoolbar() {
    verticalSitetoolbar.classList.toggle('active');
}

function openCatalogueOnMobileVersion() {
    if (catalogueOnMobileVersion.classList.contains('active')) {
        catalogueOnMobileVersion.firstElementChild.classList.toggle('active');

        setTimeout(() => {
            catalogueOnMobileVersion.classList.toggle('active');
        }, 400);
    } else {
        catalogueOnMobileVersion.classList.toggle('active');

        setTimeout(() => {
            catalogueOnMobileVersion.firstElementChild.classList.toggle('active');
        }, 0);
    }
}

buttonToOpenCatalogueOnMobileVersion.addEventListener('click', openCatalogueOnMobileVersion);
buttonToOpenVerticalSitetoolbar.addEventListener('change', openVerticalSitetoolbar);