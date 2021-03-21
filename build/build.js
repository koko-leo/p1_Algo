var myShader;
var gui = new dat.GUI();
var params = {
    Scale: 500,
    FrameRate: 1,
    NumberPatterns: 1,
    NumberFreq: 2,
    ColorR: 50,
    ColorG: 50,
    ColorB: 50,
    Shape: 0.5,
    Download_Image: function () { return save(); },
};
gui.add(params, "Scale", 100, 1000, 1);
gui.add(params, "FrameRate", 0, 10, 0.0001).onChange(function (val) { return frameRate(val); });
gui.add(params, "NumberPatterns", 1, 3);
gui.add(params, "NumberFreq", 2, 7);
gui.add(params, "ColorR", 50, 255);
gui.add(params, "ColorG", 50, 255);
gui.add(params, "ColorB", 50, 255);
gui.add(params, "Shape", 0.5, 1);
gui.add(params, "Download_Image");
var Chladni = (function () {
    function Chladni(num, freqNum, freqDen) {
        this.num = num;
        this.freqNum = freqNum;
        this.freqDen = freqDen;
    }
    return Chladni;
}());
function draw() {
    var c = new Chladni(params.NumberPatterns, params.NumberFreq, 0.04);
    translate(-width / 2, -height / 2);
    shader(myShader);
    myShader.setUniform("uAspectRatio", width / height);
    myShader.setUniform("NUM", c.num);
    myShader.setUniform("FREQ_NUM", c.freqNum);
    myShader.setUniform("FREQ_DEN", c.freqDen);
    myShader.setUniform("SPREAD_X", random(width));
    myShader.setUniform("SPREAD_Y", random(height));
    myShader.setUniform("SCALE", params.Scale);
    myShader.setUniform("ColorR", params.ColorR);
    myShader.setUniform("ColorG", params.ColorG);
    myShader.setUniform("ColorB", params.ColorB);
    myShader.setUniform("Shape", params.Shape);
    noStroke();
    rect(0, 0, width, height);
}
function preload() {
    myShader = loadShader("shader/myShader.vert", "shader/myShader.frag");
}
function setup() {
    p6_CreateCanvas();
    frameRate(1);
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight(), WEBGL);
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map