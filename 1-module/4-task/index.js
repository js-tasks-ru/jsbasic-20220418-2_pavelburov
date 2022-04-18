function checkSpam(str) {
  let lowerCaseStr = str.toLowerCase()
  
  if ((lowerCaseStr.indexOf('1xbet') !== -1) || (lowerCaseStr.indexOf('xxx') !== -1)) {
  	return true                                               
	}
	
  return false
}
