function createContraintes(container, num_vars, num_conts) {
	let title = document.createElement('h1');
	title.innerHTML = 'Contraintes';
	container.appendChild(title);
	let table = document.createElement('table');
	setAttributes(table, {'border': 0, 'cellspacing': 2, 'cellpadding': 2});
	let tr = document.createElement('tr');
	let td = document.createElement('td');
	tr.appendChild(td);
	for (let i = 1; i <= num_vars; i++) {
		let th = document.createElement('th');
		th.innerHTML = 'x' + '<sub>' + i.toString();
		th.setAttribute('align', 'center');
		tr.appendChild(th);
	}
	let th = document.createElement('th');
	th.innerHTML = 'Operator';
	tr.appendChild(th);
	th = document.createElement('th');
	th.innerHTML = 'b';
	tr.appendChild(th);
	table.appendChild(tr);
	for (let i = 1; i <= num_conts; i++) {
		tr = document.createElement('tr');
		td = document.createElement('td');
		td.innerHTML = 'Contraintes ' + i.toString();
		td.style.width = '120px';
		tr.appendChild(td);
		for (let j = 1; j <= num_vars; j++) {
			let td = document.createElement('td');
			let input = document.createElement('input');
			setAttributes(input, {'type': 'text', 'placeholder': '0', 'size': '4', 'id': 'coef[' + i.toString() + '][' + j.toString() + ']'});
			setAttributes(td, {'align': 'center'});
			td.appendChild(input);
			tr.appendChild(td);
		}
		td = document.createElement('td');
		td.setAttribute('align', 'center');
		let select = document.createElement('select');
		select.setAttribute('id', 'operator' + i.toString());
		let option = document.createElement('option');
		option.innerHTML = '&le;';
		option.setAttribute('value', '<');
		select.appendChild(option);
		option = document.createElement('option');
		option.innerHTML = '&ge;';
		option.setAttribute('value', '>');
		select.appendChild(option);
		option = document.createElement('option');
		option.innerHTML = '=';
		option.setAttribute('value', '=');
		select.appendChild(option);
		td.appendChild(select);
		tr.appendChild(td);
		td = document.createElement('td');
		let input = document.createElement('input');
		setAttributes(input, {'type': 'text', 'placeholder': '0', 'style':'border: 1px solid #999999;', 'size': '5', 'id': 'b' + i.toString()});
		setAttributes(td, {'align': 'center'});
		td.appendChild(input);
		tr.appendChild(td);
		table.appendChild(tr);
	}
	container.appendChild(table);
}
