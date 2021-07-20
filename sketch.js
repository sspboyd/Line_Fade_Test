const s = (p55) => {
  const PHI = (Math.sqrt(5) + 1) / 2; // I use PHI for layout ratios
  const sketch_name = "five_line"; // put this in the index.html canvas div too!

  let canvasW = 400;
  let canvasH = 400;
  // let copy_font;

  let crv_pts = [];
  const num_crv_pts = 12;
  
  let gen_pts = function(num_cp){
    let cpts = [];
    for(let i=0; i<num_cp; i++){
      let x = i*canvasW/num_cp +20;
      let y = p55.random(canvasH);
      cpts.push(p55.createVector(x,y));
    }
    console.log(cpts);
    return cpts;
    
  };
  
  let alpha_layers = {
    edge:0.05,
    middle:1,
    side:0,
  };
  alpha_layers.side = (alpha_layers.middle - alpha_layers.edge)/2 + alpha_layers.edge;
  
  
  

  

  





  p55.setup = () => {
    c = p55.createCanvas(canvasW, canvasH);
    // c.parent(sketch_name); // used to associate this sketch with an html div id

    crv_pts = gen_pts(num_crv_pts);
  };

let render_curve_segments = function(cpts){
  // for a crv with 12 pts
  // middle
  let clr = p55.color(255);
  p55.noFill();
  clr.setAlpha(alpha_layers.middle);
  p55.stroke(clr);
  // p55.strokeWeight(2);
  // middle start = 2 end = 9
  p55.beginShape();
  for (let i = 2; i < 10; i++) {
    p55.curveVertex(cpts[i].x, cpts[i].y);
  }
  p55.endShape();


};

  p55.draw = () => {
    p55.background(29, 123, 199);
    p55.noFill();
    p55.stroke(255);
    p55.strokeWeight(.5);

    crv_pts.forEach(function(pt){
      p55.ellipse(pt.x,pt.y,10,10);
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