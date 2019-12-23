//https://www.h-schmidt.net/FloatConverter/IEEE754.html
//http://www.phpsimplex.com/fr/exemple_methode_simplexe.htm?fbclid=IwAR3-F-04GKfXO07xQVUXbME2wqXeUUjN0MyAoCldS_wxxtG4rO9tkXE1Vrw
//https://bdesgraupes.pagesperso-orange.fr/UPX/Master1/MNM1_corr_doc1.pdf
//http://eeisti.fr/grug/ING-1/Math/Optimisation%20Lin%C3%A9aire/TD/TD3/TD3_corrig%25E9.pdf?fbclid=IwAR3Zru9HT1Lj93ztB7zVpcg-Zeu_FKgbbYAFFWCbu7plKObJCwQYuCYeEW8
//https://smart--grid.net/cours-lessons-theory/programmation-lineaire/methode-du-simplexe/
function get_column(tab, width, height, index) {
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
function cout_index_max(tab1d, taille) {
	var max_index = 1;

	for(var i = 1; i < taille - 2; i++)  {
		if (parseFloat(tab1d[max_index]) < parseFloat(tab1d[i]))
			max_index = i;
	}
	return (max_index);
}

function cout_index_min_bland(tab1d, taille, choix) {
	if (choix == 'min') {
		for (let i = 1; i < taille; i++) {
			if (parseFloat(tab1d[i]) < 0.0)
				return (i);
		}
	}
	else {
		for (let i = 1; i < taille; i++) {
			if (parseFloat(tab1d[i]) > 0.0)
				return (i);
		}
	}
	return (1);
}
function column_index_min_bland(tab1d, taille) {
	for(var i = 1; i < taille; i++) {
		if (tab1d[i] != Infinity)
			return (i);
	}
	return (1);
}
function cout_index_min(tab1d, taille) {
	var min_index = 1;

	for(var i = 1; i < taille; i++) {
		if (parseFloat(tab1d[min_index]) > parseFloat(tab1d[i]))
			min_index = i;
	}
	return (min_index);
}
function pivot(tab, n, m, choix, bland) {
	let point = new Array(2);
	let col;

	if(choix === 'max')
		point[1] = cout_index_max(tab[m - 1], n);
	else if(choix === 'min' && bland)
		point[1] = cout_index_min_bland(tab[m - 1], n - 2, choix);
	else if(choix === 'min')
		point[1] = cout_index_min(tab[m - 1], n - 2);

	col = get_column(tab, n, m ,point[1]);
	if (bland)
		point[0] = column_index_min_bland(col,  m - 1);
	else
		point[0] = cout_index_min(col,  m - 1);
	return (point);
}

function cout(tab, width, height, phase_1) {
	let cout = 0.0;
	for (let i = 1; i < height - 1; i++) {
		if (tab[i][0][0] === 'a')
			cout += toFloat(tab[i][width - 2]);
	}
	if (phase_1 == 1)
		return (cout);
	for (let i = 1; i < height - 1; i++) {
		if (tab[i][0][0] === 'x')
			cout += toFloat(tab[i][width - 2]) * toFloat(document.getElementById(tab[i][0]).value);
	}
	return (cout);
}

function gauss(tab, m, n, x, y, choix, phase_1) {
	let new_tab = new Array(m);
	for(let i = 0; i < m; i++) {
		new_tab[i] = new Array(n);
		new_tab[i][0] = tab[i][0];
	}
	for(let i = 0 ; i < n; i++) {
		new_tab[0][i] = tab[0][i];
	}
	tab[x][y] = toFloat(tab[x][y]);
	new_tab[x][0] = tab[0][y];
	for(let i = 1; i < m; i++) {
		for(let j = 1; j < n - 1; j++) {
			tab[i][j] = toFloat(tab[i][j]);
			if (j == y) {
				if (i == x)
					new_tab[i][j] = 1;
				else
					new_tab[i][j] = 0;
			} else {
				if (i == x)
					new_tab[i][j] = (tab[i][j] / tab[x][y]).toFixed(8);
				else if (!(i == m - 1 && j == n - 2)) {
					if (tab[i][j] == -tab[x][j] && tab[x][y] == -tab[i][y])
						new_tab[i][j] = 0.0;
					else
						new_tab[i][j] = ((tab[i][j] * tab[x][y] - tab[i][y] * tab[x][j]) / tab[x][y]).toFixed(8);
				}
			}
		}
	}
	new_tab[m - 1][n - 2] = cout(new_tab, n, m, phase_1);
	return(new_tab);
}

function check_positive(tab, m, width)
{
	for(var i = 1; i < width - 2; i++) {
		if (tab[m - 1][i] > 0)
			return (true);
	}
	return (false);
}

function check_negative(tab, m, width)
{
	for(var i = 1; i < width - 2; i++) {
		if (tab[m - 1][i] < 0)
			return (true);
	}
	return (false);
}

function get_line_index(tab, m, index)
{

	for (var i = 1; i < m - 1; i++) {
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

	for (var i = 1; i < (width - 2); i++) {
		if(tab[height - 1][i] != 0 && check_base(tab, tab[0][i], height)) {
			index_line = get_line_index(tab, height, i);
			var x = tab[height - 1][i];
			for(var j = 1; j < width - 1; j++) {
				tab[height - 1][j] = tab[height - 1][j] - tab[index_line][j] * (x / tab[index_line][i]);
			}
		}
	}

	tab[height - 1][width - 2]  = Math.abs(tab[height - 1][width - 2]);
}


function check_pos_neg(tab, m, n, choix)
{
	if(choix == 'max')
		return(check_positive(tab, m, n));
	return(check_negative(tab, m, n));
}

function phas1_to_2(tab, n, m)
{
	var new_tab = new Array(m); ////  taille
	var x = 0;
	var y;
	for(var i = 0; i < m; i++) {
		new_tab[i] = new Array(n);
	}
	for(var i = 0; i < m; i++) {
		if(!(tab[i][0][0] === "a")) {
			y = 0;
			for(var j = 0; j < n; j++) {

				if(!(tab[0][j][0] === "a")) {
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
function createEqui(choix) {
	for (let x = 1; x <= num_vars; x++)
		document.getElementById('x' + x.toString()).value *= -1.0;
	return (choix === "min" ? "max" : "min");
}
function createSaver() {
	let container = document.getElementById('table');
	let div = document.createElement('div');
	div.setAttribute('style', 'position: absolute;left: 50%; transform: translate(-50%, 0);margin-top: 40px');
	let input = document.createElement('input');
	setAttributes(input, {'type':'button','value': 'Enregister','onclick': 'window.print()', 'style':'color: white;background-color: #022022;'});
	div.appendChild(input);
	container.appendChild(div);
}

function simplex()
{
	num_conts = parseInt(num_conts);
	num_vars = parseInt(num_vars);
	document.getElementById('array').style.display = 'none';
	document.getElementById('table').style.display = 'block';
	document.title = 'Simplexe';
	let back = document.createElement('input');
	setAttributes(back, {'type':'button', 'value':'← back', 'class':'nextstep', 'onclick': 'backPage2()', 'style': "float: left; margin-top: 15px;"});
	document.getElementById('table').appendChild(back);
	document.getElementById('table').appendChild(document.createElement('br'));
	document.getElementById('table').appendChild(document.createElement('br'));
	printSystem("simp_sys");
	let all = getArray();
	let tab = all[0];
	let tab_init = tab;
	let init = 0;
	let width = all[1];
	let height = all[2];
	let is_phase = all[3];
	let choix = 'min';
	let bland = false;

	printArray(tab, width, height, -1, -1, is_phase != 0 ? "Tableau initial de la phase I" : "Tableau initial");
	if(is_phase != 0) {
		correction(tab,width,height);
		while(check_negative(tab, height, width)) {
			if (++init > 1 && is_equal(tab, tab_init, width - 1, height)) {
				console.log('Il y a cyclage');
				bland = true;
			}
			var point =  pivot(tab, width ,height, choix, bland);

			if(check_infinie(tab, width, height)) {
				alert("probleme non bornee : b -> infinie - phase1");
				return;
			}
			printArray(tab, width, height, point[0], point[1], "Next");

			tab = gauss(tab,height , width, point[0], point[1], choix, 1);
		}
		printArray(tab, width, height, -1, -1, "Tableau final de la phase I");
		tab = phas1_to_2(tab, width, height);
		width -= is_phase;
		if(toFloat(tab[height - 1][width - 2]) != 0) {
			alert("Z != 0 => l'ensemble vide");
			return ;
		}
		for (let j = 1; j < width - 1; j++) {
			if (tab[0][j][0] === 'x')
				tab[height - 1][j] = toFloat(document.getElementById('x' + j.toString()).value);
			else
				tab[height - 1][j] = parseFloat('0');
		}
		tab[height - 1][width - 1] = "";
		printArray(tab, width, height, -1, -1, "Tableau initial de la phase II");
		correction(tab, width, height);
		printArray(tab, width, height, -1, -1, "Correction");
	}
	let e = document.getElementById("fct_obj");
	choix = e.options[e.selectedIndex].value;
	tab_init = tab;
	init = 0;
	bland = false;
	let already = 0;
	while(check_pos_neg(tab, height, width, choix)) {
		let point = pivot(tab, width ,height, choix, bland);
		if(check_infinie(tab,width,height)) {
			alert("probleme non bornee : b -> infinie");
			return;
		}
		if (already === 1) {
			printArray(tab, width, height, point[0], point[1], "C’est le Tableau initial => Cyclage");
			already = 2;
		}
		else if (already === 2) {
			printArray(tab, width, height, point[0], point[1], "Règle de Bland");
			already = 0;
		}
		else
			printArray(tab, width, height, point[0], point[1], "suivant");
		tab = gauss(tab,height , width, point[0], point[1], choix, 0);
		if (++init > 1 && is_equal(tab, tab_init, width - 1, height)) {
			console.log('Il y a cyclage');
			bland = true;
			already = 1;
		}
	}
	printArray(tab, width, height, -1, -1, "Tableau final");
	createSaver();
}

