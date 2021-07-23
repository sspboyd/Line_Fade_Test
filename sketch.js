const s = (p55) => {
  'use strict';
  const PHI = (Math.sqrt(5) + 1) / 2; // I use PHI for layout ratios
  const sketch_name = "five_line"; // put this in the index.html canvas div too!

  let canvas_dims = {w:1080,h:667};
  let c;
  let crv_pts = [];
  const num_crv_pts = 12;

  let alpha_layers = {
    edge: 0.15,
    middle: 0.4,
    side: 0,
  };
  alpha_layers.side = (alpha_layers.middle - alpha_layers.edge) / 2 + alpha_layers.edge;


  let render_curve_segments = function (cpts) {
    let y_offset = p55.map(p55.mouseY, 0, canvas_dims.h, -47, 47);
    // for a crv with 12 pts
    let clr = p55.color(255);
    p55.noFill();
    // middle
    let max_alpha = 200;
    clr.setAlpha(alpha_layers.middle * max_alpha);
    p55.stroke(clr);
    p55.strokeWeight(2);
    // middle start = 2 end = 10
    p55.beginShape();
    for (let i = 2; i < 10; i++) {
      p55.curveVertex(cpts[i].x, cpts[i].y);
    }
    p55.endShape();

    // clr = p55.color(255,0,0);
    // side left
    clr.setAlpha(alpha_layers.side * max_alpha);
    p55.stroke(clr);
    p55.strokeWeight(1.5);
    // middle start = 1 end = 11
    p55.beginShape();
    for (let i = 1; i < 11; i++) {
      p55.curveVertex(cpts[i].x, cpts[i].y + y_offset);
    }
    p55.endShape();

    // side right -- incorp'd into one "sides" layer
    // clr.setAlpha(alpha_layers.side * 255);
    // p55.stroke(clr);
    // p55.strokeWeight(1.5);
    // // middle start = 2 end = 9
    // p55.beginShape();
    // for (let i = 4; i < 11; i++) {
    //   p55.curveVertex(cpts[i].x, cpts[i].y+y_offset);
    // }
    // p55.endShape();

    // edge left
    // clr = p55.color(0,255,0);
    clr.setAlpha(alpha_layers.edge * max_alpha);
    p55.stroke(clr);
    p55.strokeWeight(1);
    // middle start = 0 end = 5
    p55.beginShape();
    for (let i = 0; i < 5; i++) {
      p55.curveVertex(cpts[i].x, cpts[i].y + (y_offset * PHI));
    }
    p55.endShape();

    // edge right
    clr.setAlpha(alpha_layers.edge * max_alpha);
    p55.stroke(clr);
    p55.strokeWeight(1);
    // middle start = 7 end = 12
    p55.beginShape();
    for (let i = 7; i < 12; i++) {
      p55.curveVertex(cpts[i].x, cpts[i].y + (y_offset * PHI));
    }
    p55.endShape();
  };

  p55.setup = () => {
    c = p55.createCanvas(canvas_dims.w, canvas_dims.h);
    crv_pts = gen_pts(p55, num_crv_pts, canvas_dims);
  };

  p55.draw = () => {
    p55.background(29, 123, 199);
    crv_pts.forEach(function (pt) {
      // p55.ellipse(pt.x,pt.y,30,30);
    });
    render_curve_segments(crv_pts);
  };





















  let exportImg = function () {
    let name = sketch_name; // String
    // generate date string: YYYY-MM-DD-HH-MM-SS
    let dt = new Date();
    let datetime = `${dt.getFullYear().toString()}${(dt.getMonth()+1).toString().padStart(2,'0')}${dt.getDate().toString().padStart(2,'0')}${dt.getHours().toString().padStart(2,'0')}${dt.getMinutes().toString().padStart(2,'0')}${dt.getSeconds().toString().padStart(2,'0')}`;
    let filename = `${name}-${datetime}`;
    console.log(`saving canvas to: ${filename}`);
    p55.saveCanvas(c, filename, 'png');
  };

  p55.keyTyped = () => {
    if (p55.key === 'S' || p55.key === 's') {
      exportImg();
    }
  };
};

let myp5 = new p5(s);