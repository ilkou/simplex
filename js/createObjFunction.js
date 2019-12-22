function createObjFunction(container, num_vars){
	let title = document.createElement('h2');
	title.innerHTML = 'Fonction objectif';
	title.setAttribute('class', 'title');
	container.appendChild(title);
	let table = document.createElement('table');
	setAttributes(table, {'border': 0, 'cellspacing': 2, 'cellpadding': 2});
	let tr = document.createElement('tr');
	let th = document.createElement('th');
	tr.appendChild(th);
	for (let i = 1; i <= num_vars; i++) {
		let th = document.createElement('th');
		th.innerHTML = 'x' + '<sub>' + i.toString();
		th.setAttribute('align', 'center');
		tr.appendChild(th);
	}
	table.appendChild(tr);
	tr = document.createElement('tr');
	let td = document.createElement('td');
	let select = document.createElement('select');
	select.setAttribute('id', 'fct_obj');
	let option = document.createElement('option');
	option.innerHTML = 'min';
	option.setAttribute('value', 'min');
	select.appendChild(option);
	option = document.createElement('option');
	option.innerHTML = 'max';
	option.setAttribute('value', 'max');
	select.appendChild(option);
	td.appendChild(select);
	tr.appendChild(td);
	for (let i = 1; i <= num_vars; i++) {
		let td = document.createElement('td');
		let input = document.createElement('input');
		setAttributes(input, {'type': 'text','placeholder': '0', 'size': '5', 'id': 'x' + i.toString()})
			setAttributes(td, {'align': 'center'});
		td.appendChild(input);
		tr.appendChild(td);
	}
	table.appendChild(tr);
	container.appendChild(table);
}
