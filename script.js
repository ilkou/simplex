function get_column(tab, width, height, index)
{
	var col  = new Array(height);

	for (var i = 0; i < height - 1; i++)
	{
		col[i] = tab[i][width - 2] / tab[i][index];
		if(col[i] < 0)
			col[i] = Infinity;
	}
	return (col);
}
function cout_index_max(tab1d, taille)
{
	var max_index = 1;


	for(var i = 1; i < taille - 2; i++)
	{
		if (tab1d[max_index] < tab1d[i])
			max_index = i;
	}
	return (max_index);
}

function cout_index_min(tab1d, taille)
{
	var min_index = 1;

	for(var i = 1; i < taille - 1; i++)
	{
		if (tab1d[min_index] > tab1d[i])
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
		point[1] = cout_index_min(tab[m - 1], n);
	col = get_column(tab, n, m ,point[1]);
	point[0] = cout_index_min(col,  m);
	return (point);
}

function gauss(tab,m , n, x , y,choix)
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
					if(i == m - 1 && j == n - 2)
					{
						if(choix == "min")
							new_tab[i][j] = (Math.abs(tab[i][j] * tab[x][y]) - Math.abs(tab[i][y] * tab[x][j])) / tab[x][y];
						else
						new_tab[i][j] = (Math.abs(tab[i][j] * tab[x][y]) + Math.abs(tab[i][y] * tab[x][j])) / tab[x][y];
					}
					else
					{
						new_tab[i][j] = (tab[i][j] * tab[x][y] - tab[i][y] * tab[x][j]) / tab[x][y];
					}
				}
			}
		}
	}
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
function check_infinie(tab,width,height)
{
	for(var i = 1; i < height - 2; i++)
	{
		if(tab[width -2][i] != Infinity)
			return (false);
	}
	return (true);
}
function simplex()
{
	let all = getArray();
	let tab = all[0];
	let width = all[1];//n
	let height = all[2];
	let is_phase = all[3];
	let choix = 'min';

	if(is_phase != 0)
	{
		correction(tab,width,height);
		while(check_negative(tab, height, width))
		{
			if(check_infinie(tab,width,height))
			{
				alert("probleme non bornee")
					return;
			}
			var point =  pivot(tab, width ,height, choix);
			tab = gauss(tab,height , width, point[0], point[1], choix);
			printArray(tab, width, height);
		}
		tab = phas1_to_2(tab, width, height);
		width -= is_phase;
		if(parseFloat(tab[height - 1][width - 2]) != 0.0) {
			alert('probleme non bornee');
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
	while(check_pos_neg(tab, height, width, choix))
	{
		if(check_infinie(tab,width,height))
			{
				alert("probleme non bornee")
					return;
			}
		var point =  pivot(tab, width ,height, choix);
		tab = gauss(tab,height , width, point[0], point[1], choix);
		printArray(tab, width, height);
	}
}

