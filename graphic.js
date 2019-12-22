//http://www.cours-et-exercices.com/2016/03/resolution-dun-programme-lineaire-pl.html
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
function sub(p1, p2) {
    return new Point(p1.x - p2.x, p1.y - p2.y);
}

function lineDistance(point1, point2) {
    let line;

    line = sub(point2, point1);
    return Math.sqrt(line.x * line.x + line.y * line.y);
}
function mapPoint(x, y, pixel, scale) {
    return new Point(parseInt(20 + (x * scale) - (pixel / 2)), parseInt(480 - (y * scale) - (pixel / 2)));
}
function drawPoint(x, y, s, col) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = col;
    ctx.fillRect(x,y,s,s);
}
function drawText(text, x, y) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.font = "10px Arial";
    ctx.fillText(text, x, y);
}
function drawLine(x1, y1, x2, y2, col) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.strokeStyle = col;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
function solveSystem(a, b, c, a2, b2, c2) {
    let sol = new Point();
    if (a * b2 - b * a2 == 0)
        return undefined;
    sol.x = (c * b2 - b * c2) / (a * b2 - b * a2);
    sol.y = (a * c2 - c * a2) / (a * b2 - b * a2);
    return sol;
}
function checkValid(point) {
    for (let i = 1; i <= num_conts + 2; i++) {
        let b1, x1, y1, operator;
        if (i === num_conts + 1) {
            b1 = 0;
            x1 = 1;
            y1 = 0;
            operator = '>';
        }
        else if (i === num_conts + 2) {
            b1 = 0;
            x1 = 0;
            y1 = 1;
            operator = '>';
        }
        else {
            b1 = toFloat(eval(document.getElementById('b' + i.toString()).value));
            x1 = toFloat(eval(document.getElementById('coef[' + i.toString() + '][1]').value));
            y1 = toFloat(eval(document.getElementById('coef[' + i.toString() + '][2]').value));
            operator = document.getElementById("operator" + i.toString()).value;
        }
        if (operator === '>') {
            if (x1 * point.x + y1 * point.y < b1)
                return (false);
        }
        else if (operator === '<') {
            if (x1 * point.x + y1 * point.y > b1)
                return (false);
        }
        else if (x1 * point.x + y1 * point.y !== b1)
            return (false);
    }
    return (true);
}
function drawSolution(points, scale) {
    let p;
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = "#054b50";
    let minX = points[0].x;
    let maxX = points[0].x;
    let minY = points[0].y;
    let maxY = points[0].y;

    for (let i = 1; i < points.length; i++) {
        if (points[i].x < minX) minX = points[i].x;
        if (points[i].x > maxX) maxX = points[i].x;
        if (points[i].y < minY) minY = points[i].y;
        if (points[i].y > maxY) maxY = points[i].y;
    }

    // choose a "central" point
    let center = new Point (minX + (maxX - minX) / 2,minY + (maxY - minY) / 2);

    // precalculate the angles of each point to avoid multiple calculations on sort
    for (let i = 0; i < points.length; i++) {
        points[i].angle = Math.acos((points[i].x - center.x) / lineDistance(center, points[i]));

        if (points[i].y > center.y) {
            points[i].angle = Math.PI + Math.PI - points[i].angle;
        }
    }

    // sort by angle
    points = points.sort(function(a, b) {
        return a.angle - b.angle;
    });

    // Draw shape
    ctx.beginPath();
    p = mapPoint(points[0].x, points[0].y, 0, scale);
    ctx.moveTo(p.x, p.y);

    for (var i = 1; i < points.length; i++) {
        p = mapPoint(points[i].x, points[i].y, 0, scale);
        ctx.lineTo(p.x, p.y);
    }
    p = mapPoint(points[0].x, points[0].y, 0, scale);
    ctx.lineTo(p.x, p.y);

    ctx.stroke();
    ctx.fill();
}
function graphic() {
    document.getElementById('array').style.display = 'none';
    document.getElementById('myCanvas').style.display = 'block';
    let e = document.getElementById("fct_obj");
    let choix = e.options[e.selectedIndex].value;
    let points = [], valid = [];
    let p;
    let sol_opt, val_opt;
    drawLine(10, 480, 790, 480, "#FF0000");
    drawLine(20, 10, 20, 490, "#FF0000");
    drawPoint(18, 478, 4, "#000000");
    num_conts = parseInt(num_conts);
    num_vars = parseInt(num_vars);
    for (let i = 1; i <= num_conts + 2; i++) {
        let b1, x1, y1;
        if (i === num_conts + 1) {
            b1 = 0;
            x1 = 1;
            y1 = 0;
        }
        else if (i === num_conts + 2) {
            b1 = 0;
            x1 = 0;
            y1 = 1;
        }
        else {
            b1 = toFloat(eval(document.getElementById('b' + i.toString()).value));
            x1 = toFloat(eval(document.getElementById('coef[' + i.toString() + '][1]').value));
            y1 = toFloat(eval(document.getElementById('coef[' + i.toString() + '][2]').value));
        }
        for (let j = i + 1; j <= num_conts + 2; j++) {
            let b2 = 0, x2 = 0, y2 = 0;
            if (j === num_conts + 1) {
                b2 = 0;
                x2 = 1;
                y2 = 0;
            }
            else if (j === num_conts + 2) {
                b2 = 0;
                x2 = 0;
                y2 = 1;
            }
            else {
                b2 = toFloat(eval(document.getElementById('b' + j.toString()).value));
                x2 = toFloat(eval(document.getElementById('coef[' + j.toString() + '][1]').value));
                y2 = toFloat(eval(document.getElementById('coef[' + j.toString() + '][2]').value));
            }
            if ((p = solveSystem(x1, y1, b1, x2, y2, b2)) !== undefined) {
                points.push(p);
            }
        }
    }
    let maxX = points[0].x;
    let maxY = points[0].y;
    for (let i = 1; i < points.length; i++) {
        if (points[i].x > maxX) maxX = points[i].x;
        if (points[i].y > maxY) maxY = points[i].y;
    }

    let scale = 400 / (maxX > maxY ? maxX : maxY);
    if (scale > 5) {
        let k = 0;
        for (let i = 0; i < 780; i += scale) {
            drawLine(20 + i, 477, 20 + i, 483, "#000000");
            drawText((k++).toString(), 20 + i, 490);
        }
        k = 0;
        for (let i = 480; i > 20; i -= scale) {
            drawLine(17, i, 23, i, "#000000");
            drawText((k++).toString(), 8, i);
        }
    }
    for (let i = 0; i < points.length; i++) {
        console.log('intersection : ' + points[i].x.toString() + '  ' + points[i].y.toString());
        p = mapPoint(points[i].x, points[i].y, 4, scale);
        drawPoint(p.x, p.y, 4, "#04adbf");
    }
    for (let i = 0; i < points.length; i++) {
        if (checkValid(points[i]))
            valid.push(points[i]);
    }
    if (valid.length === 0) {
        console.log("Problème irréalisable : il n'admet pas de solutions réalisables");
        return ;
    }
    let z1 = toFloat(eval(document.getElementById('x1').value));
    let z2 = toFloat(eval(document.getElementById('x2').value));
    val_opt = valid[0].x * z1 + valid[0].y * z2;
    sol_opt = valid[0];
    console.log('nombre de points realisable : ' + valid.length.toString());
    for (let i = 0; i < valid.length; i++) {
        console.log('solution realisable '+ (i + 1).toString() +' : ' + valid[i].x.toString() + '  ' + valid[i].y.toString());
        p = mapPoint(valid[i].x, valid[i].y, 4, scale);
        drawPoint(p.x, p.y, 4, "#022022");
        if (choix === 'max' && valid[i].x * z1 + valid[i].y * z2 > val_opt) {
            val_opt = valid[i].x * z1 + valid[i].y * z2;
            sol_opt = valid[i];
        }
        else if (choix === 'min' && valid[i].x * z1 + valid[i].y * z2 < val_opt) {
            val_opt = valid[i].x * z1 + valid[i].y * z2;
            sol_opt = valid[i];
        }
    }
    if (choix === 'max' && val_opt === 0) {
        console.log("Problème non borné : aucune des solutions réalisables n'est optimale");
        return;
    }
    drawSolution(valid, scale);
    p = mapPoint(sol_opt.x, sol_opt.y, 0, scale);
    drawText('('+sol_opt.x.toFixed(2).toString()+','+sol_opt.y.toFixed(2).toString()+')', p.x + 2, p.y - 2);
    console.log('valeur optimale : ' + val_opt.toString());
    console.log('solution optimale : X1 = ' + sol_opt.x.toString() + ' X2 = ' + sol_opt.y.toString());
}