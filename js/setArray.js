function checkInput() {
	let valid = true;

	for (let i = 1; i <= num_vars; i++) {
		let x = document.getElementById('x' + i.toString());
		x.style.removeProperty('border');
		try {
			eval(x.value);
		} catch (e) {
			if (e instanceof ReferenceError || e instanceof SyntaxError) {
				valid = false;
				x.style.borderColor = "red";
			}
		}
	}
	for (let i = 1; i <= num_conts; i++) {
		let b = document.getElementById('b' + i.toString());
		b.style.borderColor = "#999999";
		try {
			eval(b.value);
		} catch (e) {
			if (e instanceof ReferenceError || e instanceof SyntaxError) {
				valid = false;
				b.style.borderColor = "red";
			}
		}
	}
	for (let j = 1; j <= num_vars; j++) {
		for (let i = 1; i <= num_conts; i++) {
			let x = document.getElementById('coef[' + i.toString() + '][' + j.toString() + ']');
			x.style.removeProperty('border');
			try {
				eval(x.value);
			} catch (e) {
				if (e instanceof ReferenceError || e instanceof SyntaxError) {
					valid = false;
					x.style.borderColor = "red";
				}
			}
		}
	}
	return (valid);
}

function checkInputSimplex() {
	if (checkInput())
		simplex();
}
function checkInputGraphic() {
	if (num_vars != 2)
		alert('les variables de décision doit etre egal a 2');
	else if (checkInput())
		graphic();
}
function clearInput() {
	for (let i = 1; i <= num_vars; i++) {
		let x = document.getElementById('x' + i.toString());
		x.value = '';
		x.style.removeProperty('border');
	}
	for (let i = 1; i <= num_conts; i++) {
		let b = document.getElementById('b' + i.toString());
		b.value = '';
		b.style.borderColor = "#999999";
	}
	for (let j = 1; j <= num_vars; j++) {
		for (let i = 1; i <= num_conts; i++) {
			let x = document.getElementById('coef[' + i.toString() + '][' + j.toString() + ']');
			x.value = '';
			x.style.removeProperty('border');
		}
	}
}
function setArray() {
	document.getElementById('init').remove();
	document.getElementById('rights').remove();
	document.getElementById('simpleh').remove();
	let container = document.getElementById('array');
	if (parseInt(num_vars) > 15 || parseInt(num_conts) > 15)
		container.removeAttribute("class");
	createObjFunction(container, num_vars);
	createContraintes(container, num_vars, num_conts);
	let clearInput = document.createElement('input');
	setAttributes(clearInput, {'type':'button', 'value':'Clear', 'class':'nextstep', 'onclick': 'clearInput()', 'style': "margin-top: 15px; float: left"});
	container.appendChild(clearInput);
	let tosimplex = document.createElement('input');
	setAttributes(tosimplex, {'type':'button', 'value':'Simplex →', 'class':'nextstep', 'onclick': 'checkInputSimplex()', 'style': "margin-top: 15px;"});
	container.appendChild(tosimplex);
	let tographic = document.createElement('input');
	setAttributes(tographic, {'type':'button', 'value':'Graphic →', 'class':'nextstep', 'onclick': 'checkInputGraphic()', 'style': "margin-top: 15px;"});
	container.appendChild(tographic);
}