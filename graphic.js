class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Line {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
}
function graphic() {
    document.getElementById('array').style.display = 'none';
    document.getElementById('myCanvas').style.display = 'block';
    let lines = [];
    for (let i = 1; i <= num_conts; i++) {
        let b = document.getElementById('b' + i.toString());
        let x1 = toFloat(eval(document.getElementById('coef[' + i.toString() + '][1]').value));
        let x2 = toFloat(eval(document.getElementById('coef[' + i.toString() + '][2]').value));
        let p1 = new Point(b/x1, 0.0);
        let p2 = new Point(0.0, b/x2);
        let l = new Line(p1, p2);
        lines.push(l);
    }
}