import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  #elem = null;
  constructor() {
    this.#elem = createElement(`
                                <div class="modal">
                                  <!--Прозрачная подложка перекрывающая интерфейс-->
                                  <div class="modal__overlay"></div>

                                  <div class="modal__inner">
                                    <div class="modal__header">
                                      <!--Кнопка закрытия модального окна-->
                                      <button type="button" class="modal__close">
                                        <img src="/assets/images/icons/cross-icon.svg" alt="close-icon">
                                      </button>

                                      <h3 class="modal__title"></h3>
                                    </div>

                                    <div class="modal__body"></div>
                                  </div>

                                </div>
                              `);
    this.addEventListeners();
  }

  addEventListeners() {
    this.#elem.onclick = ({target}) => {
      if (target.closest('.modal__close')) {
        this.close();
      }
    }

    document.onkeydown = (e) => {
      if (e.code === 'Escape') {
        this.close();
      }
    }
  }

  open() {
    document.body.appendChild(this.#elem);
    document.body.classList.add('is-modal-open');
  }

  close() {
    const modal = document.body.querySelector('.modal');
    if (modal) {
      document.body.removeChild(modal);
      document.body.classList.remove('is-modal-open');
    }
  }

  setTitle(title) {
    this.#elem.querySelector('.modal__title').textContent = title;
  }
  
  setBody(newBody) {
    let modalBody = this.#elem.querySelector('.modal__body');
    while (modalBody.firstChild) {
      modalBody.removeChild(modalBody.lastChild);
    }

    modalBody.appendChild(newBody);
  }
}
