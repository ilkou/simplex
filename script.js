var m = 5;
var n = 8;

function print_tab(tab)
{
    for(var i = 0; i < m ; i++)
    {
    	document.write(tab[i] + "<br\>");
    }
    document.write("<br\>"); 
}

function get_column(tab, n, m, index)
{
    var col  = new Array(m);

    for (var i = 0; i < m - 1; i++)
    {
        col[i] = tab[i][n - 2] / tab[i][index];
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
    
    if(choix === -1)
            point[1] = cout_index_max(tab[m - 1], n);
    if(choix === 1)
        point[1] = tab[m -1].indexOf(Math.min(...tab[m - 1]));
    col = get_column(tab, n, m ,point[1]);
    point[0] = cout_index_min(col,  m);
    return (point);
}

function gauss(tab,m , n, x , y)
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
                  new_tab[i][j] = (tab[i][j] * tab[x][y] - tab[i][y] * tab[x][j]) / tab[x][y];
                
                }
          }
        }
    }
  return(new_tab);
}

function check_posive(tab, m, n)
{
    for(var i = 1; i < n - 2; i++)
    {
    if (tab[m - 1][i] > 0)
        return (true);
    }
    return (false);
}

var tab = new Array(m);
    for(var i = 0; i < m; i++)
    {
     tab[i] = new Array(n);
    }

    var choix = -1;
tab = [
    ["V.B",  "x1" , "x2" , "e1", "e2", "e3", "b",       "ratio"],
    ["e1",   3,     5,     1,     0,     0,   12,          undefined ],
    ["e2",   1,     0,     0,     1,     0 ,  52,          undefined  ],
    ["e3",   2,     3,     0,     0,     1,   17,            undefined ],
    ["cout",  10,     15,      0,     0,     0,   0,        undefined ]
  ];
/*

function pase1(tab)
{

}*/
while(check_posive(tab, m, n))
{
    var point =  pivot(tab, n ,m, choix);
    tab = gauss(tab,m , n, point[0], point[1]);
    print_tab(tab);
}