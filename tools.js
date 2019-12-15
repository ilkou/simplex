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
		return (parseFloat(0).toFixed(2));
	return (parseFloat(num).toFixed(2));
}
function is_equal(tab1, tab2, width, height)
{
	for (let i = 1; i < height; i++) {
		for (let j = 1; j < width; j++) {
			if (tab1[i][j] == tab2[i][j])
				return (false);
		}
	}
	return (true);
}
