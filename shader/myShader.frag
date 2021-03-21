precision mediump float;

varying vec2 vTexCoord;
uniform float uAspectRatio;

uniform float NUM;
uniform float FREQ_NUM;
uniform float FREQ_DEN;
uniform float SPREAD_X;
uniform float SPREAD_Y;
uniform float SCALE;
uniform float ColorR;
uniform float ColorG;
uniform float ColorB;
uniform float Shape;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
    // Compute the coordinates
    vec2 xy = vTexCoord;
    xy.x *= uAspectRatio;
    xy.y = 1. - xy.y;

    float SCALED_X = (xy.x * SCALE * FREQ_DEN) + SPREAD_X;
    float SCALED_Y = (xy.y * SCALE * FREQ_DEN) + SPREAD_Y;

    float NUM_X = NUM * SCALED_X;
    float NUM_Y = NUM * SCALED_Y;

    float FREQ_NUM_X = FREQ_NUM * SPREAD_X;
    float FREQ_NUM_Y = FREQ_NUM * SPREAD_Y;

    float chladni = abs((cos(FREQ_NUM_X) * cos(NUM_Y) - cos(NUM_X) * cos(FREQ_NUM_Y)) / 2.);

    float t = rand(xy);
    t = smoothstep(Shape, Shape, mix(0.5, 3.5, chladni) - Shape);
   
    vec3 color1 = vec3(ColorR, ColorG, ColorB) / 255.;
    vec3 color2 = vec3(0, 0, 0) / 255.;
    
    gl_FragColor = vec4(mix(color1, color2, t), 1.);
}