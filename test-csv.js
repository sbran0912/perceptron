import * as utils from './lib-utils.js';

console.log('Jetzt wird CSV ausgelesen...')
let /** @type {string[]} */ arr;
arr = await utils.fetchCSV('sonar-mine-rock.csv');

for (let i = 0; i < 2; i++) {
    arr[i][60] = arr[i][60] == 'R' ? '1' : '0';
    arr[i] = ['1'].concat(arr[i])
    console.log(arr[i]);   
}