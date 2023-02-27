import * as utils from './lib-utils.js';
import plot from './plotly-basic-dist-min.js';

/**
 * @param {number} target 
 * @param {number} output 
 * @returns 
 */
function verlust_quadrat(target, output) {
    return (target - output) ** 2
}
    


let data = {
    /** @type { number[] } */ x : utils.range(-10, 100, 0.2),
    /** @type { number[] } */ y : new Array(100)
}

for (let i = 0; i < data.y.length; i++) {
    data.y[i] = 15 * data.x[i] + 25.0 + utils.random(1, 80)  
}

let w0 = utils.range(-10, 100, 1);
//let w1 = utils.range(-10, 40, 1);
let w1 = 10;

let fehler = new Array(w0.length);
for (let i = 0; i < w0.length; i++) {
    fehler[i] = 0;
    for (let j = 0; j < data.x.length; j++) {
        let output = w0[i] * 1 + w1 * data.x[j]; // w0 * bias + 10 * input
        let target = data.y[j];
        fehler[i] += verlust_quadrat(target, output);
    }
    console.log(w0[i], w1, fehler[i]);
}

let dataForPlot = [
    {
        type: 'scatter',
        mode: 'markers',  
        name: 'Wolke',
        marker: { size: 5 },    
        x: data.x, 
        y: data.y
    },
    {
        type: 'scatter',
        mode: 'markers',  
        name: 'Wolke',
        marker: { size: 2 },    
        y: fehler
    }    
];

plot.newPlot('plotter', dataForPlot, {margin: {t: 0}});
