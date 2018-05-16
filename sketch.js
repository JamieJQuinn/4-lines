var SIZE=1024
var ONE=1.0/SIZE
var FORM_MARGIN=0.01*SIZE
var MARGIN=0.1*SIZE
var N_FORMS=20 // 10x10 forms
var FORM_SIZE=(SIZE - 2*MARGIN - (N_FORMS-1)*FORM_MARGIN)/N_FORMS
var NOISE_PARAM = 8;
var RANDOM_STRENGTH = 0;
var PARAM_START = 0;
var PARAM_END = 10;
var PARAM_DELTA = 0.05;

function setup() {
  canvas = createCanvas(SIZE, SIZE);
  background(51);
  randomSeed(100);
  noiseSeed(100);

  noLoop();

  //QuickSettings.useExtStyleSheet();
  //settings = QuickSettings.create(5, 5, "Settings ('s' to hide)");
  //settings.setKey("s");
}

function draw() {
  for(var param = PARAM_START; param < PARAM_END; param += PARAM_DELTA) {
    stroke(255, 255, 255, Math.round(20*(PARAM_END - param)/(PARAM_END-PARAM_START)));
    NOISE_PARAM = 0.5*param;
    RANDOM_STRENGTH = param
    for(var i=0; i<N_FORMS; ++i) {
      for(var j=0; j<N_FORMS; ++j) {
        x = MARGIN + FORM_SIZE/2.0 + i*(FORM_SIZE + FORM_MARGIN);
        y = MARGIN + FORM_SIZE/2.0 + j*(FORM_SIZE + FORM_MARGIN);
        draw_form(x, y);
      }
    }
  }
}

function rand(x, y, z=0) {
  return noise(x, y, z) - 0.5;
}

function random_vector(x, y) {
  return createVector(rand(x, y, 0), rand(x, y, 1));
}

function draw_form(x, y) {
  p1 = createVector(x-FORM_SIZE/2, y-FORM_SIZE/2);
  p2 = createVector(x+FORM_SIZE/2, y-FORM_SIZE/2);
  p3 = createVector(x+FORM_SIZE/2, y+FORM_SIZE/2);
  p4 = createVector(x-FORM_SIZE/2, y+FORM_SIZE/2);

  p1.add(random_vector(NOISE_PARAM*p1.x/SIZE, NOISE_PARAM*p1.y/SIZE).mult(RANDOM_STRENGTH*FORM_SIZE));
  p2.add(random_vector(NOISE_PARAM*p2.x/SIZE, NOISE_PARAM*p2.y/SIZE).mult(RANDOM_STRENGTH*FORM_SIZE));
  p3.add(random_vector(NOISE_PARAM*p3.x/SIZE, NOISE_PARAM*p3.y/SIZE).mult(RANDOM_STRENGTH*FORM_SIZE));
  p4.add(random_vector(NOISE_PARAM*p4.x/SIZE, NOISE_PARAM*p4.y/SIZE).mult(RANDOM_STRENGTH*FORM_SIZE));

  line(p1.x, p1.y, p2.x, p2.y);
  line(p2.x, p2.y, p3.x, p3.y);
  line(p3.x, p3.y, p4.x, p4.y);
  line(p4.x, p4.y, p1.x, p1.y);
}
