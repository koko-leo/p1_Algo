

function constructor(id: , frequencyNumerator, frequencyDenominator) {
    this.id = id;
    this.fn = frequencyNumerator;
    this.fd = frequencyDenominator;
    this.closed = true;
}

function value(p) {
    var frequencyModulator = this.fn/this.fd;
    var f = frequencyModulator*2*Math.PI/p.size;
    if (this.closed) {
        return Math.sin(f*p.x)*Math.sin(f*p.y);
    } else {
        return Math.cos(f*p.x)*Math.cos(f*p.y);
    }
}

function equation() {
    var m = "" + (this.fn / this.fd);
    if (this.fn%2 == 1) {
        m = "\\frac{"+this.fn+"}{"+this.fd+"}";
    } 
    if (this.fn == 2) {
        m = "";
    }
    if (this.closed) {
        return "sin(" + m + "x)\\times sin(" + m + "y)";
    } else {
        return "cos(" + m + "x)\\times cos(" + m + "y)";
    }
}