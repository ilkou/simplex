function setArray() {
	document.getElementById('init').style.display = 'none';
	let container = document.getElementById('array');
	if (parseInt(num_vars) > 15 || parseInt(num_conts) > 15)
		container.removeAttribute("class");
	createObjFunction(container, num_vars);
	createContraintes(container, num_vars, num_conts);
	let input = document.createElement('input');
	setAttributes(input, {'type':'button', 'value':'Prochain pas →', 'onclick': 'simplex()', 'style': "margin-top: 15px; float: right"})
		container.appendChild(input);
}
