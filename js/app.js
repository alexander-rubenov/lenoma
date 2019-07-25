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


document.addEventListener("DOMContentLoaded", function() {
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
});


let
  sectionsThatUseCarousel = document.querySelector('.sections-with-carousel'),
  position = 0,
  positionHitSales = 0,
  positionNovelties = 0,
  positionSpecialOffers = 0,
  positionTopBrands = 0;

function shiftCarousel() {
  let target = event.target;
  
  if (!target.classList.contains('carousel-list-of-items__button')) return;
  let
    sectionsList = target.parentElement.parentElement.children[1].firstElementChild,
    widthSectionsList = parseInt(getComputedStyle(sectionsList).width),
    widthSection = (widthSectionsList * 12.5 / 100) / 2,
    numberOfSections = 4,
    sections = [...sectionsList.children],
    count = 4,
    sectionName = sectionsList.parentElement.parentElement.parentElement.parentElement.classList.value;
  
  switch(sectionName) {
    case 'hit-sales':
      position = positionHitSales;
      break;
    case 'novelties':
      position = positionNovelties;
      break;
    case 'special-offers':
      position = positionSpecialOffers;
      break;
    case 'top-brands':
      position = positionTopBrands;
      widthSection = (widthSectionsList * 20 / 100) / 2;
      numberOfSections = 5;
      count = 0;
  }

  if (document.documentElement.clientWidth <= 480) {
    count = 24;
    widthSection = widthSection / 2;
  } else if (document.documentElement.clientWidth <= 1024) {
    count = 8;
  }

  if ((document.documentElement.clientWidth <= 480) && (sectionName === 'top-brands')) {
    widthSection = (widthSectionsList * 20 / 100) / 2;
    numberOfSections = 1;
    count = 0;
  } else if ((document.documentElement.clientWidth <= 800) && (sectionName === 'top-brands')) {
    count = 0;
    widthSection = (widthSectionsList * 20 / 100) / 2;
    numberOfSections = 2;
  } else if ((document.documentElement.clientWidth <= 1024) && (sectionName === 'top-brands')) {
    widthSection = (widthSectionsList * 20 / 100) / 2;
    numberOfSections = 3;
    count = 2;
  }

  if (target.classList.contains('carousel-list-of-items__button-prev')) {
    let buttonNext = sectionsList.parentElement.nextElementSibling.firstElementChild;

    position = Math.min(position + widthSection * numberOfSections, 0);
    sectionsList.style.marginLeft = position + 'px';

    if (position === 0) target.src = 'img/carousel/left-arrow-gray.svg';
    if ((position - widthSection * numberOfSections) >= (-widthSection * (sections.length + count - numberOfSections))) buttonNext.src = 'img/carousel/right-arrow-golden.svg';

  } else if (target.classList.contains('carousel-list-of-items__button-next')) {
    let buttonPrev = sectionsList.parentElement.previousElementSibling.firstElementChild;
    
    position = Math.max(position - widthSection * numberOfSections, -widthSection * (sections.length + count - numberOfSections));
    sectionsList.style.marginLeft = position + 'px';

    if (position < 0) buttonPrev.src = 'img/carousel/left-arrow-golden.svg';
    if ((position - widthSection * numberOfSections) < (-widthSection * (sections.length + count - numberOfSections))) target.src = 'img/carousel/right-arrow-gray.svg';
  
  }

  switch(sectionName) {
    case 'hit-sales':
      positionHitSales = position;
      break;
    case 'novelties':
      positionNovelties = position;
      break;
    case 'special-offers':
      positionSpecialOffers = position;
      break;
    case 'top-brands':
      positionTopBrands = position;
  }
}

sectionsThatUseCarousel.addEventListener('click', shiftCarousel);


let
  buttonToOpenSectionAboutCompanyInFooter = document.querySelector('.about-company__header-wrap'),
  buttonToOpenSectionCatalogueInFooter = document.querySelector('.catalogue__header-wrap'),
  aboutCompanySectionsList = document.querySelector('.about-company__sections'),
  catalogueSectionsList = document.querySelector('.catalogue__sections');

function openAboutCompanySectionsList() {
  buttonToOpenSectionAboutCompanyInFooter.classList.toggle('active');
  let arrow = buttonToOpenSectionAboutCompanyInFooter.lastElementChild;

  if (buttonToOpenSectionAboutCompanyInFooter.classList.contains('active')) {
    aboutCompanySectionsList.style.height = (document.documentElement.clientWidth <= 480) ? '210px' : '175px';
    arrow.style.transform = 'rotate(180deg)';
  } else {
    aboutCompanySectionsList.style.height = '0';
    arrow.style.transform = 'rotate(0deg)';
  }
}

function openCatalogueSectionsList() {
  buttonToOpenSectionCatalogueInFooter.classList.toggle('active');
  let arrow = buttonToOpenSectionCatalogueInFooter.lastElementChild;

  if (buttonToOpenSectionCatalogueInFooter.classList.contains('active')) {
    
    catalogueSectionsList.style.height = (document.documentElement.clientWidth <= 480) ? '210px' : '175px';
    arrow.style.transform = 'rotate(180deg)';
  } else {
    catalogueSectionsList.style.height = '0';
    arrow.style.transform = 'rotate(0deg)';
  }
}

buttonToOpenSectionAboutCompanyInFooter.addEventListener('click', openAboutCompanySectionsList);
buttonToOpenSectionCatalogueInFooter.addEventListener('click', openCatalogueSectionsList);
