function printArray(tab, width, height, px, py, title)
{
	let container = document.getElementById('table');
	let table = document.createElement('table');
	let cap = document.createElement('caption');
	cap.appendChild(document.createTextNode(title));
	table.appendChild(cap);
	setAttributes(table, {'class':'ilk-table', 'border': 1, 'cellspacing': 2, 'cellpadding': 1, 'style': 'margin: 0 auto;'});
	for (let i = 0; i < height ; i++) {
		let tr = document.createElement('tr');
		for (let j = 0; j < width - 1; j++) {
			let td = document.createElement(i === 0 || j === 0 ? 'th' : 'td');
			if (i === px || j === py)
				setAttributes(td, {'class': 'iam_pivot'});
			let x = tab[i][j];
			if (x == null)
				td.appendChild(document.createTextNode("-"));
			else if (i !== 0 && j !== 0)
				td.appendChild(document.createTextNode(parseFloat(x).toFixed(2).toString()));
			else
				td.appendChild(document.createTextNode(x.toString()));
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	container.appendChild(table);
}
