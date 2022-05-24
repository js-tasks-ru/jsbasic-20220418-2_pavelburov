import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    const {x, width} = document.querySelector('.container').getBoundingClientRect()
    const leftBorder = x + width + 20;

    if (document.documentElement.clientWidth > 767) {
      let  elemRect = this.elem.getBoundingClientRect();

      if (elemRect.top < 0) { 
        
        this.elem.style.cssText = "position:fixed;";

        if (document.documentElement.clientWidth - (leftBorder + elemRect.width) > 10 ) {

          this.elem.style.left = leftBorder + "px";
        } else {
          this.elem.style.right = '10px'
        }
        this.elem.style.top = "50px";
      } else if (window.pageYOffset < elemRect.top) {
        this.elem.style.cssText = ""
      }
    }
    

  }
}
