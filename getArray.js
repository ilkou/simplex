function getArray() {
	document.getElementById('array').style.display = 'none';
	num_vars = parseInt(num_vars);
	num_conts = parseInt(num_conts);
	let width = 3 + num_vars;
	let height = 2 + num_conts;
	let e = document.getElementById("fct_obj");
	let fct_obj = e.options[e.selectedIndex].value;
	console.log('il s\'agit de ' + fct_obj);
	for (let k = 1; k <= num_conts; k++) {
		let b = toFloat(document.getElementById('b' + k.toString()).value);
		let operator = document.getElementById("operator" + k.toString()).value;
		if (b < 0.0) {
			if (operator === '>')
				operator = '<';
			else if (operator === '<')
				operator = '>';
		}
		width += 1;
		if (operator === ">")
			width += 1;
	}
	console.log('width ' + width.toString() + ' height ' + height.toString());
	let tab = new Array(height);
	for (let i = 0; i < height; i++)  {
		tab[i] = new Array(width);
	}
	/*1er colonne :*/
	tab[0][0] = "V.B";
	let vars = new Array();
	let is_phase1 = 0;
	for (let j = 1; j < height - 1; j++) {
		let b = toFloat(document.getElementById('b' + j.toString()).value);
		let operator = document.getElementById("operator" + j.toString()).value;
		if (b < 0.0) {
			if (operator === '>')
				operator = '<';
			else if (operator === '<')
				operator = '>';
		}
		if (operator === '<')
			tab[j][0] = 'e' + j.toString();
		else {
			tab[j][0] = 'a' + j.toString();
			is_phase1++;
		}
		vars.push(tab[j][0]);
		if (operator === '>')
			vars.push('e' + j.toString());
	}
	tab[height - 1][0] = "cout";
	/*1er ligne :*/
	let col = num_vars + 1;
	for (let i = 1; i <= num_vars; i++) {
		tab[0][i] = "x" + i.toString();
	}
	for (let i = 1; i < width - 1; i++) {
		if (inArray("e" + i.toString(), vars))
			tab[0][col++] = "e" + i.toString();
	}
	for (let i = 1; i < width - 1; i++) {
		if (inArray("a" + i.toString(), vars))
			tab[0][col++] = "a" + i.toString();
	}
	tab[0][col++] = "b";
	tab[0][col++] = "ratio";
	/*coef du variables :*/
	for (let j = 1; j <= num_vars; j++) {
		for (let i = 1; i <= num_conts; i++) {
			let b = toFloat(document.getElementById('b' + i.toString()).value);
			let x = document.getElementById('coef[' + i.toString() + '][' + j.toString() + ']');
			if (b < 0.0)
				tab[i][j] = (-1) * toFloat(x.value);
			else
				tab[i][j] = toFloat(x.value);
		}
		console.log('<br />');
	}
	/*coef du e/a :*/
	for (let j = num_vars + 1; j < width - 2; j++) {
		for (let i = 1; i < height - 1; i++) {
			if (tab[0][j] === tab[i][0])
				tab[i][j] = parseFloat('1');
			else if (tab[0][j][0] === 'e' && tab[i][0][0] === 'a' && tab[0][j][1] === tab[i][0][1])
				tab[i][j] = parseFloat('-1');
			else
				tab[i][j] = parseFloat('0');
		}
	}
	/*coef du b/ratio :*/
	for (let i = 1; i < height - 1; i++) {
		tab[i][width - 2] = toFloat(document.getElementById('b' + i.toString()).value);
		if (tab[i][width - 2] < 0.0)
			tab[i][width - 2] = -tab[i][width - 2];
		tab[i][width - 1] = "";
	}
	/*coef du dernier ligne:*/
	if (is_phase1 != 0) {
		for (let j = 1; j < width - 2; j++) {
			if (tab[0][j][0] === 'a')
				tab[height - 1][j] = parseFloat('1');
			else
				tab[height - 1][j] = parseFloat('0');
		}
		tab[height - 1][width - 2] = "";
		tab[height - 1][width - 1] = "";
	}
	else {
		for (let j = 1; j < width - 1; j++) {
			if (tab[0][j][0] === 'x')
				tab[height - 1][j] = toFloat(document.getElementById('x' + j.toString()).value);
			else
				tab[height - 1][j] = parseFloat('0');
		}
		tab[height - 1][width - 1] = "";
	}
	printArray(tab, width, height);
	return [tab, width, height, is_phase1];
}
