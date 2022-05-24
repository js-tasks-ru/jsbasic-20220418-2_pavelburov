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
      this.#currentStep = this.#getClickStep(clientX);

      this.#setStep();
    }
  }

  #setStep() {
    let initialWidth = this.#currentStep * (100/(this.#steps - 1))
    this.elem.querySelector('.slider__progress').style.width = `${initialWidth}%`;

    this.elem.querySelector('.slider__thumb').style.left = `${initialWidth}%`;

    let previousActive = this.elem.querySelector('.slider__step-active');
    if (previousActive) {
      previousActive.classList.remove('slider__step-active');
    }

    this.elem.querySelector(`.slider__steps span:nth-child(${this.#currentStep + 1})`).classList.add('slider__step-active');
    this.elem.querySelector('.slider__value').textContent = this.#currentStep + 1;

    const sliderChange = new CustomEvent('slider-change', {
      detail: this.#currentStep,
      bubbles: true 
    })

    this.elem.dispatchEvent(sliderChange);
  }

  #getClickStep(clientX) {
    let left = clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.#steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);

    return value;
  }
}
