var gui = new dat.GUI();
var params = {
    Sand: 100,
    Download_Image: function () { return save(); },
};
gui.add(params, "Sand", 0, 3000, 1);
gui.add(params, "Download_Image");
var widthW = 2000;
var heightW = 4000;
var Chladni = (function () {
    function Chladni(num, freqNum, freqDen) {
        this.num = num;
        this.freqNum = freqNum;
        this.freqDen = freqDen;
    }
    return Chladni;
}());
var vibrationsV = new Array(widthW * heightW);
function vibrationValues(c) {
    var NUM = c.num;
    var FREQ_NUM = c.freqNum;
    var FREQ_DEN = c.freqDen;
    var SPREAD_X = Math.random() * width;
    var SPREAD_Y = Math.random() * height;
    for (var y = 0; y < heightW; y++) {
        for (var x = 0; x < widthW; x++) {
            var SCALED_X = (x * FREQ_DEN) + SPREAD_X;
            var SCALED_Y = (y * FREQ_DEN) + SPREAD_Y;
            var NUM_X = NUM * SCALED_X;
            var NUM_Y = NUM * SCALED_Y;
            var FREQ_NUM_X = FREQ_NUM * SPREAD_X;
            var FREQ_NUM_Y = FREQ_NUM * SPREAD_Y;
            var chladni = (Math.cos(FREQ_NUM_X) * Math.cos(NUM_Y)) - ((Math.cos(NUM_X)) * Math.cos(FREQ_NUM_Y));
            chladni /= 2;
            chladni *= sign(chladni);
            ellipse(chladni, chladni, 2);
            var i = (y * widthW) + x;
            this.vibrationsV[i] = chladni;
        }
    }
}
function sign(n) {
    if (n < 0) {
        return -1;
    }
    if (n == 0) {
        return 0;
    }
    else {
        return 1;
    }
}
function draw() {
    background(0);
    var c = new Chladni(2, 2, 0.04);
    vibrationValues(c);
}
function setup() {
    createCanvas(2000, 4000);
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