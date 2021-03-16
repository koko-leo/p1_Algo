// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Sand: 100,
    Download_Image: () => save(),
}
gui.add(params, "Sand", 0, 5000, 1)
gui.add(params, "Download_Image")

class Chladni{
    num: number;
    freqNum: number;
    freqDen: number;

    constructor(num: number, freqNum: number, freqDen: number ){
        this.num = num;
        this.freqNum = freqNum;
        this.freqDen = freqDen;
    }
}

// -------------------
//       Drawing
// -------------------

function draw() {
   
    background(0)
    
    var x = random(100, width - 100);
    var y = random(100, height - 100);
    
    for(let i= 0; i<params.Sand; i++){
        ellipse(x, y, 5);

    }
}


// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
}

function windowResized() {
    p6_ResizeCanvas()
}