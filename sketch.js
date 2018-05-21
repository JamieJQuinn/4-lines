var SIZE=1024
var ONE=1.0/SIZE
var FORM_MARGIN=0.2*SIZE
var MARGIN=0.3*SIZE
var N_FORMS=2 // 10x10 forms
var FORM_SIZE=(SIZE - 2*MARGIN - (N_FORMS-1)*FORM_MARGIN)/N_FORMS
var NOISE_PARAM = 0;
var RANDOM_STRENGTH = 0;
var PARAM_START = 0;
var PARAM_END = 4;
var PARAM_DELTA = 0.05;
var base_noise_param=0;

function setup() {
  canvas = createCanvas(SIZE, SIZE);
  background(51);
  seed = Math.round(1000*random(1));
  randomSeed(seed);
  noiseSeed(seed);

  //noLoop();

  //QuickSettings.useExtStyleSheet();
  //settings = QuickSettings.create(5, 5, "Settings ('s' to hide)");
  //settings.setKey("s");
}

function draw() {
  background(51);
  NOISE_PARAM=base_noise_param;
  base_noise_param+=1e-2;
  var count = 0;
  for(var param = PARAM_START; param < PARAM_END; param += PARAM_DELTA) {
    //stroke(0, 0, 0, Math.round(40*(PARAM_END - param)/(PARAM_END-PARAM_START)));
    stroke(255, 255, 255, Math.round(40*(param - PARAM_START)/(PARAM_END-PARAM_START)));
    //stroke(255);
    //if (count % 10 == 0) {
      //stroke(255, 255, 255, Math.round(100*(PARAM_END - param)/(PARAM_END-PARAM_START)));
    //}
    //if (count == 0) {
      //stroke(255);
    //}

    NOISE_PARAM += 1e-3*param;
    RANDOM_STRENGTH = param
    for(var i=0; i<N_FORMS; ++i) {
      for(var j=0; j<N_FORMS; ++j) {
        x = MARGIN + FORM_SIZE/2.0 + i*(FORM_SIZE + FORM_MARGIN);
        y = MARGIN + FORM_SIZE/2.0 + j*(FORM_SIZE + FORM_MARGIN);
        draw_form(x, y);
      }
    }
    count++;
  }
  //saveCanvas(String(seed) + ".png");
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
