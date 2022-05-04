function highlight(table) {
      
  let rows = table.getElementsByTagName('tbody')[0].rows

  for (let row of rows) {
    let available = row.cells[3].dataset['available']
    
    switch(available) {
      case 'true':
        row.classList.add('available');
        break;
      case 'false':
        row.classList.add('unavailable');
        break;
      case undefined:
        row.hidden = true;
        break;
    }
    
    let male = row.cells[2].textContent === 'm';
    male ? row.classList.add('male') : row.classList.add('female');
    
    let underage = row.cells[1].textContent < 18
    if (underage) { row.style.textDecoration = 'line-through' }
  }
}
