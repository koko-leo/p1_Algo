var gui = new dat.GUI();
var params = {
    Sand: 100,
    Download_Image: function () { return save(); },
};
gui.add(params, "Sand", 0, 5000, 1);
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
    background(0);
    var x = random(100, width - 100);
    var y = random(100, height - 100);
    for (var i = 0; i < params.Sand; i++) {
        ellipse(x, y, 5);
    }
}
function setup() {
    p6_CreateCanvas();
}
function windowResized() {
    p6_ResizeCanvas();
}
function constructor(id, frequencyNumerator, frequencyDenominator) {
    this.id = id;
    this.fn = frequencyNumerator;
    this.fd = frequencyDenominator;
    this.closed = true;
}
function value(p) {
    var frequencyModulator = this.fn / this.fd;
    var f = frequencyModulator * 2 * Math.PI / p.size;
    if (this.closed) {
        return Math.sin(f * p.x) * Math.sin(f * p.y);
    }
    else {
        return Math.cos(f * p.x) * Math.cos(f * p.y);
    }
}
function equation() {
    var m = "" + (this.fn / this.fd);
    if (this.fn % 2 == 1) {
        m = "\\frac{" + this.fn + "}{" + this.fd + "}";
    }
    if (this.fn == 2) {
        m = "";
    }
    if (this.closed) {
        return "sin(" + m + "x)\\times sin(" + m + "y)";
    }
    else {
        return "cos(" + m + "x)\\times cos(" + m + "y)";
    }
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
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
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