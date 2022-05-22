import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  #elem = null;
  #categories = null;

  constructor(categories) {
    this.#categories = categories;
    this.#render();
    this.#addEventListeners();
  }

    
  get elem() {
    return this.#elem;
  }

  #render() {
    let ribbon = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);
 
    let ribbonInner = createElement('<div class="ribbon__inner"></div>');

    this.#categories.forEach(function({id, name}) {
      let innerCategory = createElement(`<a href="#" class="ribbon__item" data-id="${id}">${name}</a>`);
      ribbonInner.appendChild(innerCategory);
    }.bind(this));


    ribbon.appendChild(ribbonInner);
    this.#elem = ribbon;
  }

  #addEventListeners() {
    let ribbonInner = this.#elem.querySelector('.ribbon__inner');


    this.#elem.onclick = ({ target }) => {
      if (target.closest('.ribbon__arrow_left')) {
        ribbonInner.scrollBy(-350, 0);
      }
      
      if (target.closest('.ribbon__arrow_right')) {
        ribbonInner.scrollBy(350, 0);
      }

      if (target.closest('.ribbon__item')) {
        target.preventDefault;
        let previousActiveCategory = this.#elem.querySelector('.ribbon__item_active')
        if (previousActiveCategory) {
          previousActiveCategory.classList.remove('ribbon__item_active');
        }

        target.classList.add('ribbon__item_active');

        const ribbonSelect = new CustomEvent('ribbon-select', {
          detail: target.closest('.ribbon__item').dataset.id,
          bubbles: true 
        })

        this.#elem.dispatchEvent(ribbonSelect);
      }
    }

    ribbonInner.onscroll = () => {
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft === 0) {
        this.#elem.querySelector('.ribbon__arrow_left').classList.remove('ribbon__arrow_visible');
      } else {
        this.#elem.querySelector('.ribbon__arrow_left').classList.add('ribbon__arrow_visible');
      }


      if (scrollRight === 0) {
        this.#elem.querySelector('.ribbon__arrow_right').classList.remove('ribbon__arrow_visible');
      } else {
        this.#elem.querySelector('.ribbon__arrow_right').classList.add('ribbon__arrow_visible');
      }
    }
  }
}
