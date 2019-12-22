function setAttributes(element, attrs) {
	for(let key in attrs) {
		element.setAttribute(key, attrs[key]);
	}
}
function inArray(element, buffer) {
	let length = buffer.length;
	for(let i = 0; i < length; i++) {
		if(buffer[i] === element)
			return true;
	}
	return false;
}
function toFloat(num) {
	if (num == null || num == "")
		return (parseFloat(0).toFixed(2));
	return (parseFloat(num).toFixed(8));
}
function is_equal(tab1, tab2, width, height)
{
	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			if (i !== 0 && j !== 0 && parseFloat(tab1[i][j]).toFixed(3).toString() !== parseFloat(tab2[i][j]).toFixed(3).toString())
				return (false);
			else if (i === 0 && j === 0 && tab1[i][j].toString() !== tab2[i][j].toString())
				return (false);
		}
	}
	return (true);
}
function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
}
function nextChar(c) {
	return String.fromCharCode(c.charCodeAt(0) + 1);
}