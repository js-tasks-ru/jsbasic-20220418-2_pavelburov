import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {
                      nuts: undefined,
                      vegeterian: undefined,
                      spiciness: 4,
                      category: ''
                    };
    this.elem = createElement(` <div class="products-grid">
                                  <div class="products-grid__inner">
                                    <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
                                  </div>
                                </div>
                              `)

    this.render(products);
  }

  render(products) {
    const productGridInner = this.elem.querySelector('.products-grid__inner');

    while (productGridInner.firstChild) {
      productGridInner.removeChild(productGridInner.lastChild);
    }

    products.forEach(product => {
      const productCard = new ProductCard(product)
      
      productGridInner.appendChild(productCard.elem)
    });
  }

  updateFilter(filters) {
    if (filters.noNuts !== undefined) { this.filters.nuts = !filters.noNuts }
    if (filters.vegeterianOnly !== undefined) { this.filters.vegeterian = filters.vegeterianOnly  }
    if (filters.maxSpiciness !== undefined) { this.filters.spiciness = filters.maxSpiciness }
    if (filters.category !== undefined) { this.filters.category = filters.category }


    let nutsFiltered = this.products;
    if (this.filters.nuts === false) {
      nutsFiltered = this.products.filter(product => {
        return (product.nuts === this.filters.nuts || product.nuts === undefined)
      });
    }

    let vegeteiranFiltered = nutsFiltered;
    if (this.filters.vegeterian) {
      vegeteiranFiltered = nutsFiltered.filter(product => {
        return (product.vegeterian === this.filters.vegeterian)
      });
    }

    let spicinessFiltered = vegeteiranFiltered.filter(product => {
      return (product.spiciness <= this.filters.spiciness)
    });

    let categoryFiltered = spicinessFiltered;
    if (this.filters.category) {
      categoryFiltered = spicinessFiltered.filter(product => {
        return (product.category === this.filters.category)
      });
    }

    this.render(categoryFiltered)
  }
}
