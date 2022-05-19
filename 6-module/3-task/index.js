import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  #elem = null;

  constructor(slides) {
    this.slides = slides;
    this.carousel = document.createElement('div');
    this.carouselInner = document.createElement('div');
    this.width = null;

    this.createCarousel(); 
  }

  get elem() {
    return this.carousel
  }

  createCarousel() {
    this.carousel.classList.add('carousel');
    this.carouselInner.classList.add('carousel__inner');

    this.createButtons();
    this.createSlides();
    this.setAddProductEvent();
    this.addScroll();
  }
  
  addScroll() {
    const leftBtn = this.elem.querySelector('.carousel__arrow_left');
    const rightBtn = this.elem.querySelector('.carousel__arrow_right');;

    let slideNumber = 0;

    const nextSlide = () => {
      const slideWidth = this.elem.offsetWidth
      leftBtn.style.display = ''

      slideNumber += 1;
      let position = slideWidth * slideNumber;

      this.carouselInner.style.transform = `translateX(-${position}px)`;

      if (slideNumber === (this.slides.length - 1)) { return rightBtn.style.display = 'none' }
    };

    const previousSlide = () => {
      const slideWidth = this.elem.offsetWidth
      

      rightBtn.style.display = ''
      
      slideNumber -= 1;
      let position = slideWidth * slideNumber;

      this.carouselInner.style.transform = `translateX(-${position}px)`;
      
      if (slideNumber === 0) { return leftBtn.style.display = 'none' }
    };
    
    leftBtn.style.display = 'none';
    rightBtn.addEventListener('click', nextSlide);
    leftBtn.addEventListener('click', previousSlide);
  }

  createButtons() {
    ['left', 'right'].forEach(function(direction) {
      let klass = direction === 'left' ? 'left' : 'right';
      let image = direction === 'left' ? 'left-' : '';

      let btn = createElement(`
        <div class="carousel__arrow carousel__arrow_${klass}">
          <img src="/assets/images/icons/angle-${image}icon.svg" alt="icon">
        </div>
      `);

      this.carousel.appendChild(btn);
    }.bind(this));
  }

  createSlides() {
    this.slides.forEach(function(slide) {
      let slideInner = this.createSlide(slide);

      this.carouselInner.appendChild(slideInner);
    }.bind(this));

    this.carousel.appendChild(this.carouselInner);
  }

  createSlide({name, price, image, id}) {
    const slide = createElement(`
    <div class="carousel__slide" data-id="${id}">
      <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${price.toFixed(2)}</span>
        <div class="carousel__title">${name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
    `)

    this.setWidth(image);
    return slide;
  }

  setWidth(image) {
    let localImage = new Image();
    
    localImage.onload = function() {
      this.width ||= localImage.width
    }.bind(this);
    
    localImage.src = `/assets/images/products/${image}`

  }

  setAddProductEvent() {
    const cardButtons = this.carousel.querySelectorAll('.carousel__button');

    for (let btn of cardButtons) {
      btn.addEventListener('click', this.onAddButtonClick);
    }
  }

  onAddButtonClick = (event) => {
    let btn = event.currentTarget;

    const productAdd = new CustomEvent('product-add', { 
      detail: btn.closest('.carousel__slide').dataset.id,
      bubbles: true, 
    });

    btn.dispatchEvent(productAdd);   
  }
}
