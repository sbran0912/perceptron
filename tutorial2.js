import * as utils from './lib-utils.js';

async function readData() {
    /** @type {string[][]} */
    let source = await utils.fetchCSV('sonar-mine-rock.csv');
   
    /** @type {number[][]} */
    let target = source.map(row => {
        let columns = row.map((col, i) => {
            if (i == 60) {
                col = col == 'R' ? '1' : '0';
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
let anzahl_epochen = 30;
let max_training = 50;

/** @type {number[][]} */
let training = new Array(max_training);

/** @type {number[]} */
let targets = new Array(max_training);

let data = await readData();

let idx_data = utils.range(data.length); 
let shuffle_idx = utils.shuffle(idx_data); //Trainingsdaten sollen per Zufall gezogen werden

// Gewichte per Zufall festlegen
for (let i = 0; i < 61; i++) {
    weights.push(Math.random()-Math.random());
}

// Trainigsdaten einlesen
for (let i = 0; i < max_training; i++) {
     training[i] = data[shuffle_idx[i]].slice(0, 61);
     targets[i] = data[shuffle_idx[i]][61];
}

// Training starten
let idx_training = utils.range(max_training);

for (let e = 0; e < anzahl_epochen; e++) {       
    let shuffled = utils.shuffle(idx_training); // Die Reihenfolge der Trainigsdaten muss gemischt werden
    
    for (const idx of shuffled) {
        let inputs = training[idx];
        let target = targets[idx];

        let output = heavyside(scalarprodukt(inputs, weights));
        let delta = target - output;         
        for (let n = 0; n < weights.length; n++) {
            weights[n] = weights[n] + (delta * alpha * inputs[n]);   
        }        
    }
}

// Training testen
let treffer = 0;
for (const row of data) {
    let output = heavyside(scalarprodukt(row.slice(0, 61), weights));
    if ((row[61] - output) == 0) {
        treffer++;
    }
}
console.log (`${treffer} Treffer von ${data.length} Datensätzen, wobei ${max_training} Sätze trainiert wurden mit ${anzahl_epochen} Wiederholungen`);