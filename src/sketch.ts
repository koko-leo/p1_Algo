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

const widthW = 2000;
const heightW= 4000;


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
const vibrationsV = new Array(widthW* heightW);

function vibrationValues(c: Chladni) {

    const NUM = c.num;
    const FREQ_NUM = c.freqNum;
    const FREQ_DEN = c.freqDen;
    const SPREAD_X = Math.random() * width;
    const SPREAD_Y = Math.random() * height;

       
    for(let y= 0; y < heightW ; y++){
        for(let x = 0; x < widthW; x++){
            
            const SCALED_X = (x * FREQ_DEN) + SPREAD_X;
            const SCALED_Y = (y * FREQ_DEN) + SPREAD_Y;

            const NUM_X = NUM * SCALED_X;
            const NUM_Y = NUM * SCALED_Y;

            const FREQ_NUM_X = FREQ_NUM * SPREAD_X;
            const FREQ_NUM_Y = FREQ_NUM * SPREAD_Y;

            let chladni = (Math.cos(FREQ_NUM_X) * Math.cos(NUM_Y)) - ((Math.cos(NUM_X)) * Math.cos(FREQ_NUM_Y));
            chladni /=2;
            chladni *= sign(chladni);
            ellipse(chladni,chladni,2);

            const i = (y * widthW) + x;

            this.vibrationsV[i] = chladni;
        }
    }

}
/*function computeGradients() {
    const gradients :  Array<number> = [0];
    for (let y = 1; y < heightW - 1; y++) {
        for (let x = 1; x < widthW - 1; x++) {
            const myIndex = 1;//y * widthW -1;
            const gradientIndex = myIndex << 1;
            const myVibration = this.vibrationV[myIndex];

            if (myVibration < (1e-2)) {
                
                gradients[gradientIndex] = 0;
                gradients[gradientIndex + 1] = 0;
                continue;
            }

            let candidateGradients = [];
            candidateGradients.push([0, 0]);

            let minVibrationSoFar = Number.POSITIVE_INFINITY;
            for (let ny = -1; ny <= 1; ny++) {
                for (let nx = -1; nx <= 1; nx++) {
                    if (nx === 0 && ny === 0) {
                        continue;  
                    }

                    const ni = (y + ny) * width + (x + nx);
                    const nv = this.vibrationV[ni];

                    // if neighbor has *same* vibration as minimum so far, consider it as well to avoid biasing
                    if (nv <= minVibrationSoFar) {
                        // intentionally not normalizing by length here (very expensive *and* useless)

                        if (nv < minVibrationSoFar) {
                            minVibrationSoFar = nv;
                            candidateGradients = [];
                        }
                        candidateGradients.push([nx, ny]);
                    }
                }
            }

            const chosenGradient = candidateGradients.length === 1 ? candidateGradients[0] :
                candidateGradients[Math.floor(Math.random() * candidateGradients.length)];  // to avoid biasing

            gradients[gradientIndex] = chosenGradient[0];
            gradients[gradientIndex + 1] = chosenGradient[1];
        }
    }
}*/


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
    //computeGradients();
    
  
}


// -------------------
//    Initialization
// -------------------

function setup() {
    createCanvas(2000,4000);
}

function windowResized() {
    p6_ResizeCanvas()
}