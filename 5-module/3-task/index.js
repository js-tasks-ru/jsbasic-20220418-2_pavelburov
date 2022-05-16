function initCarousel() {
  const carousel = document.querySelector('.carousel__inner');
  const leftBtn = document.querySelector('.carousel__arrow_left');
  const rightBtn = document.querySelector('.carousel__arrow_right');
  const slideWidth = carousel.offsetWidth;
  let slideNumber = 0;

  const nextSlide = () => {
    leftBtn.style.display = ''

    slideNumber += 1;
    let position = slideWidth * slideNumber;

    carousel.style.transform = `translateX(-${position}px)`;

    if (slideNumber === 3) { return rightBtn.style.display = 'none' }
  };

  const previousSlide = () => {
    rightBtn.style.display = ''
    
    slideNumber -= 1;
    let position = slideWidth * slideNumber;

    carousel.style.transform = `translateX(-${position}px)`;
    
    if (slideNumber === 0) { return leftBtn.style.display = 'none' }
  };

  leftBtn.style.display = 'none';
  rightBtn.addEventListener('click', nextSlide);
  leftBtn.addEventListener('click', previousSlide);
}
