/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  #rows = [];
  elem = null;

  constructor(rows) {
    this.#rows = rows;
    this.elem = this.#createTable();
    this.#setEvents();
  }

  #createRow(row) {
    let tableRow = document.createElement("tr");

    for (let attr in row) {
      let cell = document.createElement("td");
      cell.appendChild(document.createTextNode(row[attr]));
      tableRow.appendChild(cell);
    }

    let closeCell = document.createElement("td");
    let closeButton = document.createElement('button')

    closeButton.appendChild(document.createTextNode('X'))
    closeCell.appendChild(closeButton);
    tableRow.appendChild(closeCell);

    return tableRow
  }

  #createTable() {
    let table =  document.createElement("table");
    let tableBody = document.createElement("tbody");

    this.#rows.forEach(row => {
      tableBody.appendChild(this.#createRow(row));
    })

    table.appendChild(tableBody);

    return table;
  }

  #setEvents() {
    let buttons = this.elem.getElementsByTagName('button');

    Array.prototype.forEach.call(buttons, function(button) {
      button.addEventListener('click', (event) => {
        event.currentTarget.closest('tr').remove()
      })
    });
  }
}
