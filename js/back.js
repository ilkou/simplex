function backPage()
{
    document.getElementById('array').style.display = 'none';
    document.getElementById('init').style.display = 'block';
    document.getElementById('rights').style.display = 'block';
    document.getElementById('simpleh').style.display = 'block';
    let cont = document.getElementById('array');
    while (cont.hasChildNodes()) {
        cont.removeChild(cont.firstChild);
        document.getElementById('array').style.display = 'block';
    }
}

function backPage2()
{
    document.getElementById('array').style.display = 'block';
    document.getElementById('table').style.display = 'none';
    let sys = document.getElementById('simp_sys');
    while (sys.hasChildNodes()) {
        sys.removeChild(sys.firstChild);
    }
    let tab = document.getElementById('table');
    while (tab.hasChildNodes()) {

            tab.removeChild(tab.firstChild);
    }
    let tit = document.createElement('h1');
    tit.appendChild(document.createTextNode('Méthode Simplexe'));
    tab.appendChild(tit);
    let div = document.createElement('div');
    div.setAttribute('id', 'simp_sys');
    tab.appendChild(div);
}

function backPage3()
{
    document.getElementById('graphic').style.display = 'none';
    document.getElementById('array').style.display = 'block';
    let sys = document.getElementById('graph_sys');
    while (sys.hasChildNodes()) {
        sys.removeChild(sys.firstChild);
    }
    let canv = document.getElementById('myCanvas');
    canv.getContext('2d').clearRect(0, 0, 800, 500);
    while (canv.hasChildNodes()) {
        canv.removeChild(canv.firstChild);
        document.getElementById('myCanvas').style.display = 'block';
    }
    let tab = document.getElementById('graph_array');
    while (tab.hasChildNodes()) {
        tab.removeChild(tab.firstChild);
    }
    let tr = document.createElement('tr');
    let th1 = document.createElement('th');
    th1.innerHTML = 'Point';
    tr.appendChild(th1);
    let th2 = document.createElement('th');
    th2.innerHTML = 'X1';
    tr.appendChild(th2);
    let th3 = document.createElement('th');
    th3.innerHTML = 'X2';
    tr.appendChild(th3);
    let th4 = document.createElement('th');
    th4.innerHTML = 'Valeur de la fonction (Z)';
    tr.appendChild(th4);
    tab.appendChild(tr);
}
