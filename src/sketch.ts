// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Sand: 100,
    Download_Image: () => save(),
}
gui.add(params, "Sand", 0, 3000, 1)
gui.add(params, "Download_Image")



class Chladni {
    num: number;
    freqNum: number;
    freqDen: number;

    constructor(num: number, freqNum: number, freqDen: number ){
        this.num = num;
        this.freqNum = freqNum;
        this.freqDen = freqDen;
    }
}

function vibrationValues(c: Chladni) {

    const NUM = c.num;
    const FREQ_NUM = c.freqNum;
    const FREQ_DEN = c.freqDen;
    const SPREAD_X = Math.random() * width;
    const SPREAD_Y = Math.random() * height;

    let vibrationsV: Array<number>;
    
    for(let y= 0; y < height ; y++){
        for(let x = 0; x < width; x++){
            
            const SCALED_X = (x * FREQ_DEN) + SPREAD_X;
            const SCALED_Y = (y * FREQ_DEN) + SPREAD_Y;

            const NUM_X = NUM * SCALED_X;
            const NUM_Y = NUM * SCALED_Y;

            const FREQ_NUM_X = FREQ_NUM * SPREAD_X;
            const FREQ_NUM_Y = FREQ_NUM * SPREAD_Y;

            let chladni = (Math.cos(FREQ_NUM_X) * Math.cos(NUM_Y)) - ((Math.cos(NUM_X)) * Math.cos(FREQ_NUM_Y));
            chladni /=2;
            chladni *= sign(chladni);

            const i = (y * width) + x;

            vibrationsV[i] = chladni;
        }
    }

}

function sign(n: number) {
    if(n < 0) {
        return -1;
    } 
    if(n == 0) {
        return 0;
    } else {
        return 1;
    }
}

// -------------------
//       Drawing
// -------------------

function draw() {
   
    background(0)
    
    let c = new Chladni(2, 2, 0.04);
    vibrationValues(c);
    
    /*for(let i= 0; i<params.Sand; i++){
        var x = random(100, width - 100);
        var y = random(100, height - 100);
        ellipse(x, y, 2);
    }*/
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