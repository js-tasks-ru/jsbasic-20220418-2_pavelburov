function isEmpty(obj) {
  let attrsCount = 0
  for (let key in obj) {
    attrsCount += 1
  }
	
  return attrsCount === 0
}
