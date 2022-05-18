import createElement from '../../assets/lib/create-element.js';
export default class ProductCard {
  #name  = null;
  #price  = null;
  #category  = null;
  #image  = null;
  #id  = null;
  elem = null;

  constructor(product) {
    this.#name  = product.name;
    this.#price  = `${product.price.toFixed(2)}`;
    this.#category  = product.category;
    this.#image  = `/assets/images/products/${product.image}`;
    this.#id  = product.id;
    this.elem = this.#createCard();
  
    this.#setAddProductEvent();
  }

  #createCard() {
    const card = createElement(`
      <div class="card">
      <div class="card__top">
          <img src=${this.#image} class="card__image" alt="product">
          <span class="card__price">€${this.#price}</span>
      </div>
      <div class="card__body">
          <div class="card__title">${this.#name}</div>
          <button type="button" class="card__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `)

    return card;
  }

  #setAddProductEvent() {
    const cardButton = this.elem.querySelector('.card__button');
    cardButton.addEventListener('click', this.#onAddButtonClick);
  }

  #onAddButtonClick = () => {
    const productAdd = new CustomEvent('product-add', { 
      detail: this.#id,
      bubbles: true, 
    });

    this.elem.dispatchEvent(productAdd);   
  }
}