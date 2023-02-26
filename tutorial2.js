import * as utils from './lib-utils.js';
import plot from './plotly-basic-dist-min.js';

async function readData() {
    /** @type {string[][]} */
    let source = await utils.fetchCSV('sonar-mine-rock.csv');
   
    /** @type {number[][]} */
    let target = source.map(row => {
        let columns = row.map((col, i) => {
            if (i == 60) {
                col = col == 'R' ? '0' : '1';
            }
            return parseFloat(col);
        });
        return [1].concat(columns);
    })
    return target;
}

/** 
 * @param {number[]} inputs 
 * @param {number[]} weights 
 * @returns {number} 
 */
function scalarprodukt(inputs, weights) {
    let result = 0;
    for (let i = 0; i < inputs.length; i++) {
        result = result + (inputs[i] * weights[i]);
    }
    return result;
}

/**
 * @param {number} x 
 * @returns {number}
 */
function heavyside(x) {
    return x < 0 ? 0 : 1;
}

/** @type {number[]} */
let weights = [];
let alpha = 0.1;
let anzahl_epochen = 2000;
let anzahl_training = 180;

let data = await readData();
let idx_shuffled = utils.shuffle(utils.range(0, data.length, 1)); //Trainingsdaten sollen per Zufall gezogen werden

/**
 * 
 * @param {number} target 
 * @param {number[]} input 
 */
let createFields = function(target, input) {
    return {
        target, 
        input
    }
}

let training = new Array(anzahl_training);

// Trainigsdaten einlesen
for (let i = 0; i < idx_shuffled.length; i++) {
     training[i] = createFields(data[idx_shuffled[i]][61], data[idx_shuffled[i]].slice(0, 61));
}

// Training starten
for (let i = 0; i < 61; i++) {
    weights.push(Math.random()-Math.random()); // Gewichte per Zufall festlegen
}

let idx_training = utils.range(0, anzahl_training, 1);

for (let e = 0; e < anzahl_epochen; e++) {       
    let training_shuffled = utils.shuffle(idx_training); // Die Reihenfolge der Trainigsdaten muss gemischt werden
    
    for (const i of training_shuffled) {
        let inputs = training[i].input;
        let target = training[i].target;

        let output = heavyside(scalarprodukt(inputs, weights));
        let delta = target - output;         
        for (let n = 0; n < weights.length; n++) {
            weights[n] = weights[n] + (delta * alpha * inputs[n]);   
        }        
    }
}

// Trefferquote mit Kontrolldaten ermitteln
let treffer = 0;

for (let i = anzahl_training; i < idx_shuffled.length; i++) {
    let output = heavyside(scalarprodukt(training[i].input, weights));
    if ((training[i].target - output) == 0) {
        treffer++;
    }
}

//Plotten von einem Sonarbeispiel
let dataForPlot = [
    {
        type: 'scatter',
        mode: 'lines',  
        name: 'Serie A',
        line: { width: 1 },    
        y: training[50].input
    }
];

plot.newPlot('plotter', dataForPlot, {margin: {t: 0}});

console.log (`${treffer} Treffer von ${idx_shuffled.length - anzahl_training} Datensätzen, wobei ${anzahl_training} Sätze trainiert wurden mit ${anzahl_epochen} Wiederholungen`);