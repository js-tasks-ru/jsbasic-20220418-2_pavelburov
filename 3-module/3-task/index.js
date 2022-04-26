function camelize(str) {
  const splited = str.split('-')
  const [first, ...rest] = splited
  const upperCased = rest.map((elem) => {
    	return elem.charAt(0).toUpperCase() + elem.slice(1)
  	})
	
  return first + upperCased.join('')
}
