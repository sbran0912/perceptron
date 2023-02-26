import * as utils from './lib-utils.js';
import plot from './plotly-basic-dist-min.js';

let data = {
    x : utils.range(-10, 100, 0.2),
    y : new Array(100)
}

for (let i = 0; i < data.y.length; i++) {
    data.y[i] = 15 * data.x[i] + 25.0 + utils.random(1, 50)  
}

let dataForPlot = [
    {
        type: 'scatter',
        mode: 'markers',  
        name: 'Wolke',
        marker: { size: 5 },    
        x: data.x, 
        y: data.y
    }
];

plot.newPlot('plotter', dataForPlot, {margin: {t: 0}});
