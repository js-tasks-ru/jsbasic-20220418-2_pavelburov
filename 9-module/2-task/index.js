import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 2
    });
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
    this.productsGrid = null;
  }

  async render() {
    document.querySelector('[data-carousel-holder]').appendChild(this.carousel.elem)
    document.querySelector('[data-ribbon-holder]').appendChild(this.ribbonMenu.elem)
    document.querySelector('[data-slider-holder]').appendChild(this.stepSlider.elem)
    document.querySelector('[data-cart-icon-holder]').appendChild(this.cartIcon.elem)

    await this.fetchProducts();
    await this.setInitialFilters();
    await this.addEventListeners();
  }

  async fetchProducts() {
    let response = await fetch('products.json');
    if (response.ok) {
      let products = await response.json();
      this.productsGrid = new ProductsGrid(products);
      document.querySelector('[data-products-grid-holder]').appendChild(this.productsGrid.elem) 
    }
  }

  async setInitialFilters() {
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });
  }

  async addEventListeners() {
    document.body.addEventListener('product-add', (event) => {
      let founded = this.productsGrid.products.find(item => item.id === event.detail);
      this.cart.addProduct(founded)
    })

    document.body.addEventListener('slider-change', (event) => {
      this.productsGrid.updateFilter({ maxSpiciness: event.detail});
    })

    document.body.addEventListener('ribbon-select', (event) => {
      this.productsGrid.updateFilter({ category: event.detail});
    })

    document.querySelector('#nuts-checkbox').addEventListener('change', (event) => {
      this.productsGrid.updateFilter({ noNuts: event.target.checked});
    })

    document.querySelector('#vegeterian-checkbox').addEventListener('change', (event) => {
      this.productsGrid.updateFilter({ vegeterianOnly: event.target.checked});      
    })
  }
}
