var SIZE=1024
var ONE=1.0/SIZE
var FORM_MARGIN=0.03*SIZE
var MARGIN=FORM_MARGIN
var N_FORMS=10 // 10x10 forms
var FORM_SIZE=(SIZE - 2*MARGIN - (N_FORMS-1)*FORM_MARGIN)/N_FORMS
var NOISE_PARAM = 10;

function setup() {
  canvas = createCanvas(SIZE, SIZE);

  noLoop();

  //QuickSettings.useExtStyleSheet();
  //settings = QuickSettings.create(5, 5, "Settings ('s' to hide)");
  //settings.setKey("s");
}

function draw() {
  background(51);

  stroke(255);
  for(var i=0; i<N_FORMS; ++i) {
    for(var j=0; j<N_FORMS; ++j) {
      x = MARGIN + FORM_SIZE/2.0 + i*(FORM_SIZE + FORM_MARGIN);
      y = MARGIN + FORM_SIZE/2.0 + j*(FORM_SIZE + FORM_MARGIN);
      draw_form(x, y);
    }
  }
}

function rand(x, y) {
  return noise(x, y) - 0.5;
}

function random_vector(x, y) {
  return createVector(rand(x, y), rand(x, y));
}

function draw_form(x, y) {
  p1 = createVector(x-FORM_SIZE/2, y-FORM_SIZE/2);
  p2 = createVector(x+FORM_SIZE/2, y-FORM_SIZE/2);
  p3 = createVector(x+FORM_SIZE/2, y+FORM_SIZE/2);
  p4 = createVector(x-FORM_SIZE/2, y+FORM_SIZE/2);

  p1.add(random_vector(NOISE_PARAM*p1.x/SIZE, NOISE_PARAM*p1.y/SIZE).mult(FORM_SIZE));
  p2.add(random_vector(NOISE_PARAM*p2.x/SIZE, NOISE_PARAM*p2.y/SIZE).mult(FORM_SIZE));
  p3.add(random_vector(NOISE_PARAM*p3.x/SIZE, NOISE_PARAM*p3.y/SIZE).mult(FORM_SIZE));
  p4.add(random_vector(NOISE_PARAM*p4.x/SIZE, NOISE_PARAM*p4.y/SIZE).mult(FORM_SIZE));

  line(p1.x, p1.y, p2.x, p2.y);
  line(p2.x, p2.y, p3.x, p3.y);
  line(p3.x, p3.y, p4.x, p4.y);
  line(p4.x, p4.y, p1.x, p1.y);
}
