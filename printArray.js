function printArray(tab, width, height)
{
	let container = document.getElementById('table');
	let table = document.createElement('table');
	setAttributes(table, {'border': 1, 'cellspacing': 2, 'cellpadding': 1});
	for (let i = 0; i < height ; i++) {
		let tr = document.createElement('tr');
		for (let j = 0; j < width; j++) {
			let td = document.createElement(i == 0 || j == 0 ? 'th' : 'td');
			setAttributes(td, {'style': 'width: 10%; text-align:center'});
			let x = tab[i][j];
			if (x == null)
				td.appendChild(document.createTextNode("-"));
			else
				td.appendChild(document.createTextNode(x.toString()));
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	container.appendChild(table);
}
