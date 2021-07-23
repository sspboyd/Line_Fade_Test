let gen_pts = function (p55 = p5.instance, num_cp, canvas_dims) {
    // 'use strict';
    let cpts = [];
    for (let i = 0; i < num_cp; i++) {
        let x = i * canvas_dims.w / num_cp + 20;
        let y = p55.random(canvas_dims.h / 4) + canvas_dims.h / 3;
        cpts.push(p55.createVector(x, y));
    }
    console.log(cpts);
    return cpts;
};