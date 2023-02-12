import * as utils from './lib-utils.js';

async function readData() {
    let /** @type {string[][]} */ source = await utils.fetchCSV('sonar-mine-rock.csv');
    let /** @type {number[][]} */ target = source.map(row => {
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

console.log('Jetzt wird CSV ausgelesen...')

let data = await readData();

let /** @type {number[]} */ weights = [];
let /** @type {number[]} */ inputs = [];
let alpha = 0.1;
let anzahl_epochen = 20;

let training = new Array(100);
let targets = new Array(100);
let index = utils.range(data.length);
let selection = utils.shuffle(index); //Trainingsdaten sollen per Zufall gezogen werden

// Gewichte per Zufall festlegen
for (let i = 0; i < 61; i++) {
    weights.push(Math.random()-Math.random());
}

// Trainigsdaten einlesen
for (let i = 0; i < 100; i++) {
     training[i] = data[selection[i]].slice(0, 61);
     targets[i] = data[selection[i]][61];
}

 console.log(targets);