var SIZE=512
var ONE=1.0/SIZE
var FORM_MARGIN=0.05*SIZE
var MARGIN=FORM_MARGIN
var N_FORMS=10 // 10x10 forms
var FORM_SIZE=(SIZE - 2*MARGIN - (N_FORMS-1)*FORM_MARGIN)/N_FORMS

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

function draw_form(x, y) {
  line(x-FORM_SIZE/2, y-FORM_SIZE/2, x+FORM_SIZE/2, y-FORM_SIZE/2);
  line(x+FORM_SIZE/2, y-FORM_SIZE/2, x+FORM_SIZE/2, y+FORM_SIZE/2);
  line(x+FORM_SIZE/2, y+FORM_SIZE/2, x-FORM_SIZE/2, y+FORM_SIZE/2);
  line(x-FORM_SIZE/2, y+FORM_SIZE/2, x-FORM_SIZE/2, y-FORM_SIZE/2);
}
