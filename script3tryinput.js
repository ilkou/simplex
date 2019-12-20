function get_column(tab, width, height, index)
{
	var col  = new Array(height);

	for (var i = 1; i < height - 1; i++) {
		col[i] = tab[i][width - 2] / tab[i][index];
		tab[i][width - 1] =  tab[i][width - 2] / tab[i][index];
		if(col[i] < 0 || tab[i][index] <= 0) {
			col[i] = Infinity;
			tab[i][width - 1] = Infinity;
		}
	}
	return (col);
}
function cout_index_max(tab1d, taille)
{
	var max_index = 1;

	for(var i = 1; i < taille - 2; i++)  {
		if (parseFloat(tab1d[max_index]) < parseFloat(tab1d[i]))
			max_index = i;
	}
	return (max_index);
}

function cout_index_min(tab1d, taille)
{
	var min_index = 1;

	for(var i = 1; i < taille; i++) {
		if (parseFloat(tab1d[min_index]) > parseFloat(tab1d[i]))
			min_index = i;
	}
	return (min_index);
}

function pivot(tab, n, m, choix)
{
	var point = new Array(2);
	var col;

	if(choix == 'max')
		point[1] = cout_index_max(tab[m - 1], n);
	if(choix == 'min')
		point[1] = cout_index_min(tab[m - 1], n - 2);
	col = get_column(tab, n, m ,point[1]);
	point[0] = cout_index_min(col,  m - 1);
	return (point);
}

function cout(tab, width, height, phase_1)
{
	let cout = 0.0;
	for (let i = 1; i < height - 1; i++) {
		if (tab[i][0][0] == 'a')
			cout += toFloat(tab[i][width - 2]);
	}
	if (phase_1 == 1)
		return (cout);
	for (let i = 1; i < height - 1; i++) {
		if (tab[i][0][0] == 'x')
			cout += toFloat(tab[i][width - 2]) * toFloat(document.getElementById(tab[i][0]).value);
	}
	return (cout);
}

function gauss(tab,m , n, x , y,choix, phase_1)
{
	var new_tab = new Array(m);

	for(var i = 0; i < m; i++)
	{
		new_tab[i] = new Array(n);
		new_tab[i][0] = tab[i][0];
	}
	for(var i = 0 ; i < n; i++)
	{
		new_tab[0][i] = tab[0][i];
	}
	new_tab[x][0] = tab[0][y];
	for(var i = 1; i < m; i++)
	{
		for(var j = 1; j < n - 1; j++)
		{
			if(j == y)
			{   
				if(i == x)
					new_tab[i][j] = 1;
				else
					new_tab[i][j] = 0;
			}
			else{
				if( i == x)
					new_tab[i][j] = tab[i][j] / tab[x][y];
				else
				{
					if (!(i == m - 1 && j == n - 2)) {
						if (tab[i][j] == -tab[x][j] && tab[x][y] == -tab[i][y])
							new_tab[i][j] = 0.0;
						else
							new_tab[i][j] = (tab[i][j] * tab[x][y] - tab[i][y] * tab[x][j]) / tab[x][y];
					}
					else
					{
						//if(choix == "min")
						//	new_tab[i][j] = (Math.abs(tab[i][j] * tab[x][y]) - Math.abs(tab[i][y] * tab[x][j])) / tab[x][y];
						//else
						//new_tab[i][j] = (Math.abs(tab[i][j] * tab[x][y]) + Math.abs(tab[i][y] * tab[x][j])) / tab[x][y];
						//new_tab[i][j] = cout(new_tab, n, m);
					}
				}
			}
		}
	}
	new_tab[m - 1][n - 2] = cout(new_tab, n, m, phase_1);
	return(new_tab);
}

function check_posive(tab, m, width)
{
	for(var i = 1; i < width - 2; i++)
	{
		if (tab[m - 1][i] > 0)
			return (true);
	}
	return (false);
}

function check_negative(tab, m, width)
{
	for(var i = 1; i < width - 2; i++)
	{
		if (tab[m - 1][i] < 0)
			return (true);
	}
	return (false);
}

function get_line_index(tab, m, index)
{

	for (var i = 1; i < m - 1; i++)
	{
		if(tab[i][index] == 1)
			return (i);
	}
}

function  check_base(tab, str, height)
{
	for (let i = 1; i < height - 1; i++) {
		if (tab[i][0] == str)
			return true;
	}
	return false;
}

function correction(tab, width, height)
{
	var index_line;

	for (var i = 1; i < (width - 2); i++)
	{
		if(tab[height - 1][i] != 0 && check_base(tab, tab[0][i], height))
		{
			index_line = get_line_index(tab, height, i);
			var x = tab[height - 1][i];
			for(var j = 1; j < width - 1; j++)
			{   
				tab[height - 1][j] = tab[height - 1][j] - tab[index_line][j] * (x / tab[index_line][i]);
			}
		}
	}

	tab[height - 1][width - 2]  = Math.abs(tab[height - 1][width - 2]);
	printArray(tab, width, height);
}


function check_pos_neg(tab, m, n, choix)
{
	if(choix == 'max')
		return(check_posive(tab, m, n));
	return(check_negative(tab, m, n));
}

function phas1_to_2(tab, n, m)
{
	var new_tab = new Array(m); ////  taille
	var x = 0;
	var y;
	for(var i = 0; i < m; i++)
	{
		new_tab[i] = new Array(n);
	}
	for(var i = 0; i < m; i++)
	{
		if(!(tab[i][0].includes("a")))
		{
			y = 0;
			for(var j = 0; j < n; j++)
			{

				if(!(tab[0][j].includes("a")))
				{
					new_tab[x][y] = tab[i][j];
					y++;
				}
			}
			x++;
		}
	}
	return(new_tab);
}
function check_infinie(tab, width, height)
{
	for(let i = 1; i < height - 1; i++)
	{
		if(tab[i][width - 1] != Infinity)
			return (false);
	}
	return (true);
}
/*var clicked = false;
function clearPivot() {
	let container = document.getElementById('table');
	let dev = document.getElementById('dev_id');
	container.removeChild(dev);
	clicked = true;
}

function setPivotInput() {
	let container = document.getElementById('table');
	let dev = document.createElement('form');
	dev.setAttribute('id', 'dev_id');
	let input1 = document.createElement('input');
	input1.setAttribute('id', 'input1');
	dev.appendChild(input1);
	let input2 = document.createElement('input');
	input2.setAttribute('id', 'input2');
	dev.appendChild(input2);
	let submit = document.createElement('input');
	setAttributes(submit, {'type':'button', 'value':'Prochain pas →', 'id': 'pivot_submit', 'onclick': 'clearPivot()', 'style': "margin-top: 15px; float: right"})
	dev.appendChild(submit);
	container.appendChild(dev);
}
async function demo() {
	await new Promise(r => setTimeout(r, 2000));
}*/
function simplex()
{
	document.getElementById('array').style.display = 'none';
	/*tab = [
		["V.B",  "x1" , "x2" , "e1", "e3", "e4", "a2",  "a4",  "b",    "ratio"],
		["e1",   10,     5,     1,     0,     0,    0,    0,    200,      undefined ],
		["a2",   2,      3,     0,     0,     0 ,   1,    0,    60,      undefined  ],
		["e3",   1,      0,     0,     1,     0,    0,    0,    12,      undefined ],
		["a4",   0,      1,     0,     0,     -1,   0,    1,    6,      undefined ],
		["cout", 0,      0,     0,     0,     0,    1,    1,     0,       undefined ]
	];*/
	/*tab = [
		["V.B",  "x1" , "x2" , "x3", "x4", "e1", "e2",  "e3",  "b",    "ratio"],
		["e1",   0.25,     -60,     -0.04,     9,     1,    0,    0,    0,      undefined ],
		["e2",   0.5,      -90,     -0.02,     3,     0 ,   1,    0,    0,      undefined  ],
		["e3",   0,      0,     1,     0,     0,    0,    1,    1,      undefined ],
		["cout", 0.75,      -150,     0.02,     -6,     0,    0,    0,     0,       undefined ]
	];*/
	/*tab = [
		["V.B",  "x1" , "x2" , "x3",  "x4",  "e1",  "e2",  "e3",  "e4",  "b",    "ratio"],
		["e1" ,   0.25,   -60,-0.04,     9,     1,     0,    0,      0,     , undefined ],
		["e2" ,   0.5 ,   -90,-0.02,     3,     0,     1,    0,      0,     , undefined  ],
		["e3" ,   0   ,     0,    1,     0,     0,     0,    1,      0,     , undefined ],
		["e4" ,   0   ,     0,    1,     0,     0,     0,    0,      1,     , undefined ],
		["cout",  0.75,   -150, 0.02,   -6,     0,     0,    0,      0,     ,  undefined ]
	];*/
	let all = getArray();
	let tab = all[0];
	let tab_init = tab;
	let init = 0;
	let width = all[1];
	let height = all[2];
	let is_phase = all[3];
	let choix = 'min';

	printArray(tab, width, height);
	if(is_phase != 0)
	{
		correction(tab,width,height);
		while(check_negative(tab, height, width))
		{
			if (++init > 1 && is_equal(tab, tab_init, width - 1, height)) {
				console.log('Il y a cyclage');
				alert('Le tableau est identique au tableau initial ! Il y a cyclage ');
				return ;
			}
			/*setPivotInput();
			console.log('hahwa dkhel');
			console.log(document.getElementById('pivot_submit').submit);
			while (!document.getElementById('pivot_submit').submit);
			clicked = false;
			console.log('hahwa khrej');

			let point = new Array(2);
			demo();
			point[0] = document.getElementById('input1').value;
			point[1] = document.getElementById('input2').value;*/
			var point =  pivot(tab, width ,height, choix);
			if(check_infinie(tab, width, height)) {
				alert("probleme non bornee : b -> infinie - phase1");
				return;
			}
			tab = gauss(tab,height , width, point[0], point[1], choix, 1);
			printArray(tab, width, height);
			console.log('hahiya ' + tab[4][5].toString());
		}
		tab = phas1_to_2(tab, width, height);
		width -= is_phase;
		if(parseFloat(tab[height - 1][width - 2]).toFixed(2).toString() != "0.00") {
			alert('probleme non bornee : Z != 0');
			return ;
		}
		for (let j = 1; j < width - 1; j++) {
			if (tab[0][j][0] === 'x')
				tab[height - 1][j] = toFloat(document.getElementById('x' + j.toString()).value);
			else
				tab[height - 1][j] = parseFloat('0');
		}
		tab[height - 1][width - 1] = "";
		printArray(tab, width, height);
		correction(tab, width, height);
		printArray(tab, width, height);
		
	}
	let e = document.getElementById("fct_obj");
	choix = e.options[e.selectedIndex].value;
	tab_init = tab;
	init = 0;
	while(check_pos_neg(tab, height, width, choix))
	{
		if (++init > 1 && is_equal(tab, tab_init, width - 1, height)) {
			console.log('Il y a cyclage');
			alert('Le tableau est identique au tableau initial ! Il y a cyclage ');
			return ;
		}
		var point = pivot(tab, width ,height, choix);
		if(check_infinie(tab,width,height))
		{
			alert("probleme non bornee : b -> infinie");
			return;
		}
		tab = gauss(tab,height , width, point[0], point[1], choix, 0);
		printArray(tab, width, height);
	}
}
