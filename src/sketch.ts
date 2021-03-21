let myShader: p5.Shader

// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Scale: 500,
    FrameRate: 1,
    NumberPatterns: 1,
    NumberFreq: 2,
    ColorR: 50,
    ColorG: 50,
    ColorB: 50,
    Shape: 0.5,
    Download_Image: () => save(),
}
gui.add(params, "Scale", 100, 1000, 1)
gui.add(params, "FrameRate", 0, 10, 0.0001).onChange(val => frameRate(val))
gui.add(params, "NumberPatterns", 1, 3)
gui.add(params, "NumberFreq", 2, 7)
gui.add(params, "ColorR", 50, 255)
gui.add(params, "ColorG", 50, 255)
gui.add(params, "ColorB", 50, 255)
gui.add(params, "Shape", 0.5, 1)
gui.add(params, "Download_Image")

//Creaton of the Chladni Figures with the essential parameters
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

// -------------------
//       Drawing
// -------------------

function draw() {
    const c = new Chladni(params.NumberPatterns, params.NumberFreq, 0.04);
    // Restore usual p5 coordinates
    translate(-width/2, -height/2)
    // Setup shader
    shader(myShader)
    myShader.setUniform("uAspectRatio", width / height)
    myShader.setUniform("NUM", c.num)
    myShader.setUniform("FREQ_NUM", c.freqNum)
    myShader.setUniform("FREQ_DEN", c.freqDen)
    myShader.setUniform("SPREAD_X", random(width))
    myShader.setUniform("SPREAD_Y", random(height))
    myShader.setUniform("SCALE", params.Scale)
    myShader.setUniform("ColorR", params.ColorR)
    myShader.setUniform("ColorG", params.ColorG)
    myShader.setUniform("ColorB", params.ColorB)
    myShader.setUniform("Shape", params.Shape)
    // Draw on the whole canvas
    noStroke()
    rect(0, 0, width, height)
}

// -------------------
//    Initialization
// -------------------

function preload() {
    myShader = loadShader("shader/myShader.vert", "shader/myShader.frag")
}

function setup() {
    p6_CreateCanvas()
    frameRate(1)
}

function windowResized() {
    p6_ResizeCanvas()
}