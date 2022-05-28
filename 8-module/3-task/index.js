export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.cartItems = [];
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

    return this.cartItems.reduce(totalPrice, initialValue)
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

