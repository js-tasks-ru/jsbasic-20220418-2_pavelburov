import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {

  #steps = null;
  #currentStep = null;

  constructor({ steps, value = 0 }) {
    this.elem = createElement(`
                                <div class="slider">

                                  <!--Ползунок слайдера с активным значением-->
                                  <div class="slider__thumb">
                                    <span class="slider__value"></span>
                                  </div>

                                  <!--Полоска слайдера-->
                                  <div class="slider__progress"></div>

                                  <!-- Шаги слайдера (вертикальные чёрточки) -->
                                  <div class="slider__steps">
                                  </div>
                                </div>
                              `);
    this.#steps = steps;
    this.#currentStep = value;

    this.#render();
    this.#setStep();
    this.#renderStep();
    this.#addEventListeners();
  }

  #render() {
    for (var i = 0; i < this.#steps; i++) {
      let segment = document.createElement('span');
      this.elem.querySelector('.slider__steps').appendChild(segment);
    };
  }

  #addEventListeners() {
    this.elem.onclick = ({clientX}) => { 
      this.#currentStep = this.#getCurrentStep(clientX);
      this.#setStep();
      this.#dispatchSliderChange();
      this.#renderStep();
    }

    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;
    thumb.onpointerdown = () => false;
    thumb.onpointermove= () => false;


    this.elem.addEventListener('pointerdown', () => {
      const sliderWidth = document.querySelector('.slider').clientWidth;
      const progress = document.querySelector('.slider__progress');

      const onMove = ({clientX}) => {
        document.querySelector('.slider').classList.add('slider_dragging');

        let rightLimit = this.elem.getBoundingClientRect().right;
        let leftLimit = this.elem.getBoundingClientRect().left;

        let move = (clientX - this.elem.getBoundingClientRect().left)/sliderWidth*100;
        
        if (clientX < leftLimit) {  
          thumb.style.left = `0%`;
          progress.style.width = `0%`;
          this.#currentStep = this.#getCurrentStep(leftLimit);
          this.#setStep();
        } else if (clientX > rightLimit) {
          thumb.style.left = `100%`;
          progress.style.width = `100%`;
          this.#currentStep = this.#getCurrentStep(rightLimit);
          this.#setStep();
        } else {
          thumb.style.left = `${move}%`;
          progress.style.width = `${move}%`;
          this.#currentStep = this.#getCurrentStep(clientX);
          this.#setStep();
        }
        this.#dispatchSliderChange();

      };

      document.addEventListener('pointermove', onMove);
      
      document.addEventListener('pointerup', () => {
        this.#renderStep();
        this.#dispatchSliderChange();
        document.querySelector('.slider').classList.remove('slider_dragging');
        document.removeEventListener('pointermove', onMove);
      }, { once: true })
    }); 
  }

  #renderStep() {
    let initialWidth = this.#currentStep * (100/(this.#steps - 1));
    this.elem.querySelector('.slider__progress').style.width = `${initialWidth}%`;

    this.elem.querySelector('.slider__thumb').style.left = `${initialWidth}%`;
  }

  #setStep() {
    let previousActive = this.elem.querySelector('.slider__step-active');
    if (previousActive) {
      previousActive.classList.remove('slider__step-active');
    }
    this.elem.querySelector(`.slider__steps span:nth-child(${(this.#currentStep || 0) + 1})`).classList.add('slider__step-active');
    this.elem.querySelector('.slider__value').textContent = (this.#currentStep || 0) + 1;    
  }

  #dispatchSliderChange() {
    const sliderChange = new CustomEvent('slider-change', {
      detail: this.#currentStep,
      bubbles: true 
    })
    this.elem.dispatchEvent(sliderChange);
  }

  #getCurrentStep(clientX) {
    let left = clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.#steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);

    return value;
  }
}
