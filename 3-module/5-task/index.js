function getMinMax(str) {
  const numbers = str
  .split(' ')
  .filter((elem) => !isNaN(elem))
  
  return { min: Math.min.apply(null, numbers), max: Math.max.apply(null, numbers)} 
}
