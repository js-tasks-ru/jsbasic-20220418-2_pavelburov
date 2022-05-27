import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.modal = null;
    this.addEventListeners();
  }

  addProduct(product) {
    if (product) {
      let cartItem = null;
      let founded = this.cartItems.find(item => item.product.name === product.name);
      if (founded) {
        founded.count += 1;
        cartItem = founded;
      } else {
        cartItem = {
          product: product,
          count: 1
        }
        this.cartItems.push(cartItem)
      }
      this.onProductUpdate(cartItem);
    }
  }

  updateProductCount(productId, amount) {
    let founded = this.cartItems.find(item => item.product.id === productId);
    if (amount === 1) {
      founded.count += amount;
      this.onProductUpdate(founded);
    } else {
      if (founded.count > 1) {
        founded.count += amount;

        this.onProductUpdate(founded);
      } else {
        founded.count += amount;
        this.onProductUpdate(founded)

        this.cartItems.splice(this.cartItems.indexOf(founded), 1)   
      }
    }
  }

  isEmpty() {
    return this.cartItems.length < 1
  }

  getTotalCount() {
    const totalCount = (sum, item) => sum + item.count
    const initialValue = 0;

    return this.cartItems.reduce(totalCount, initialValue)
  }

  getTotalPrice() {
    const totalPrice = (sum, item) => sum + (item.product.price * item.count)
    const initialValue = 0;
    return (this.cartItems.reduce(totalPrice, initialValue))
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal =  new Modal();
    this.modal.setTitle("Your order");
    let modalInner = createElement('<div>');

    this.cartItems.forEach(function({product, count}){
      modalInner.appendChild(this.renderProduct(product, count))
    }.bind(this));

    modalInner.appendChild(this.renderOrderForm())
    this.modal.setBody(modalInner);


    this.modal.open()

    for(let minus of document.querySelectorAll('.cart-counter__button_minus')) {
      minus.onclick = ({target}) =>{

        this.updateProductCount(target.closest('.cart-product').dataset.productId, -1) 
      }
    }

    for (let plus of document.querySelectorAll('.cart-counter__button_plus')) {
      plus.onclick = ({target}) =>{
        this.updateProductCount(target.closest('.cart-product').dataset.productId, 1) 
      }
    }

    const form = document.querySelector('.cart-form');
    form.addEventListener("submit", this.onSubmit.bind(this));
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (document.body.classList.contains('is-modal-open')) {
      let productId = cartItem.product.id; 
      let modalBody = document.querySelector('.modal .modal__body');
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`); 
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`); 
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`); 

      productCount.innerHTML = cartItem.count;

      productPrice.innerHTML = `€${cartItem.product.price * cartItem.count}`;

      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      if (cartItem.count === 0) {
        modalBody.querySelector(`[data-product-id="${productId}"]`).remove()
        if (modalBody.querySelectorAll('.cart-product').length === 0) { this.modal.close() }
      } 
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const newBody = createElement(` <div class="modal__body-inner">
                                      <p>
                                        Order successful! Your order is being cooked :) <br>
                                        We’ll notify you about delivery time shortly.<br>
                                        <img src="/assets/images/delivery.gif">
                                      </p>
                                    </div>
                                  `)
    const form = event.target
    form.querySelector('button').classList.add('is-loading')
    const formData = new FormData(form);

    const responsePromise = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData
    })

    responsePromise
      .then((response) => {
        this.modal.setTitle('Success!')
        this.modal.setBody(newBody)
        this.cartItems = []
        this.cartIcon.update(this);
      })
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

