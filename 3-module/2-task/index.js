function filterRange(arr, a, b) {
  return arr.reduce((accumulator, elem) => {
    if (elem >= a && elem <= b) { accumulator.push(elem) }
    return accumulator;
  }, [])
}
