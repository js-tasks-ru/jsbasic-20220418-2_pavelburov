function makeDiagonalRed(table) {
  let diogonalLength = table.rows.length

  for (i = 0; i < diogonalLength; i++) {
    let row = table.rows[i]
    let cell = row.cells[i]

    cell.style.backgroundColor = 'red'
  }
}
