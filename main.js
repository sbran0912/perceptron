import lodashEs from 'https://cdn.skypack.dev/lodash-es';

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

let /** @type {number[]} */ weights = [];
let /** @type {number[]} */ inputs = [];
let alpha = 0.1;
let anzahl_epochen = 20;

let training = [
    [1.0, 1.0, 1.0], 
    [1.0, 0.0, 1.0], 
    [1.0, 1.0, 0.0], 
    [1.0, 0.0, 0.0]  
    ]

// let targets = [1.0, 1.0, 1.0, 0.0]; // gut gut gut schlecht
let targets = [1.0, 1.0, 0.0, 0.0]; // gut gut schlecht schlecht
let index = lodashEs.range(targets.length); //array mit Zahlenreihenfolge 0 .. length-1

// Gewichte per Zufall festlegen
for (let i = 0; i < 3; i++) {
    weights.push(Math.random());
}

for (let e = 0; e < anzahl_epochen; e++) {
    console.log("Starte Trainingsepoche ", e);
    let indexShuffle = lodashEs.shuffle(index); // Die Reihenfolge der Trainigsdaten muss gemischt werden
    
    for (const i of indexShuffle) {
        inputs = training[i];
        let target = targets[i];
        let output = heavyside(scalarprodukt(inputs, weights));
        let delta = target - output;
        if (delta != 0) {
            console.log("input:", i, "target:", target, "guess:", output);    
        }
         
        for (let n = 0; n < weights.length; n++) {
            weights[n] = weights[n] + (delta * alpha * inputs[n])    
            //console.log(weights);
        }        
    }
}