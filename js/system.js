function printSystem(container_id) {
    let container = document.getElementById(container_id);
    let ul = document.createElement('div');
    let e = document.getElementById("fct_obj");
    choix = e.options[e.selectedIndex].value;
    let str = choix + '   ';
    let li = document.createElement('div');
    for (let i = 1; i <= num_vars; i++) {
        let x = document.getElementById('x' + i.toString());
        if (x.value == "")
            x.value = 0;
        str = str + x.value.toString() + '   x' + '<sub>' + i.toString() + '</sub>';
        if (i + 1 <= num_vars) {
            let y = document.getElementById('x' + (i + 1).toString());
            if (y.value >= 0)
                str = str + ' +';
        }
    }
    li.innerHTML = str;
    ul.appendChild(li);
    for (let j = 1; j <= num_conts; j++) {
        let li = document.createElement('div');
        str = ' ';
        for (let i = 1; i <= num_vars; i++) {
            let x = document.getElementById('coef[' + j.toString() + '][' + i.toString() + ']');
            if (x.value == "")
                x.value = 0;
            str = str + x.value.toString() + '   x' + '<sub>' + i.toString() + '</sub>';
            if (i + 1 <= num_vars) {
                let y = document.getElementById('coef[' + j.toString() + '][' + (i + 1).toString() + ']');
                if (y.value >= 0)
                    str = str + ' + ';
            }
        }
        let b = document.getElementById('b' + j.toString()).value;
        if (b == "")
            b = 0;
        let op = document.getElementById('operator' + j.toString()).value;
        if (op === '=')
            op = "";
        str = str + ' ' + op.toString() + '= ' + b.toString();
        li.innerHTML = str;
        ul.appendChild(li);
    }
    container.appendChild(ul);
}