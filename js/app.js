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
  position = 0;

function shiftCarousel() {
  let target = event.target;
  
  if (!target.classList.contains('carousel-list-of-items__button')) return;
  let
    sectionsList = target.parentElement.parentElement.children[1].firstElementChild,
    widthSectionsList = parseInt(getComputedStyle(sectionsList).width),
    widthSection = (widthSectionsList * 12.5 / 100) / 2,
    numberOfSections = 4,
    sections = [...sectionsList.children];

  if (target.classList.contains('carousel-list-of-items__button-prev')) {
    let buttonNext = sectionsList.parentElement.nextElementSibling.firstElementChild;

    position = Math.min(position + widthSection * numberOfSections, 0);
    sectionsList.style.marginLeft = position + 'px';

    if (position === 0) target.src = 'img/carousel/left-arrow-gray.svg';
    if ((position - widthSection * numberOfSections) >= (-widthSection * (sections.length + 4 - numberOfSections))) buttonNext.src = 'img/carousel/right-arrow-golden.svg';

  } else if (target.classList.contains('carousel-list-of-items__button-next')) {
    let buttonPrev = sectionsList.parentElement.previousElementSibling.firstElementChild;
    
    position = Math.max(position - widthSection * numberOfSections, -widthSection * (sections.length + 4 - numberOfSections));
    sectionsList.style.marginLeft = position + 'px';

    if (position < 0) buttonPrev.src = 'img/carousel/left-arrow-golden.svg';
    if ((position - widthSection * numberOfSections) < (-widthSection * (sections.length + 4 - numberOfSections))) target.src = 'img/carousel/right-arrow-gray.svg';
  
  }
}

sectionsThatUseCarousel.addEventListener('click', shiftCarousel);
