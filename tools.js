function setAttributes(element, attrs) {
	for(let key in attrs) {
		element.setAttribute(key, attrs[key]);
	}
}
function inArray(needle, haystack) {
	let length = haystack.length;
	for(let i = 0; i < length; i++) {
		if(haystack[i] == needle)
			return true;
	}
	return false;
}
function toFloat(num) {
	if (num == null || num == "")
		return (parseFloat(0));
	return (parseFloat(num));
}
