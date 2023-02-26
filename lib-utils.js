// Version: 1.2 Stand 26. Februar 2023

/** randomgenerator between n1 and n2
 * @param {number} n1 
 * @param {number} n2 
 * @returns {number} */
export function random(n1, n2) {
  return Math.floor(Math.random() * (n2 - n1) + n1);
}

/** limits value between min and max
 * @param {number} value 
 * @param {number} min 
 * @param {number} max 
 * @returns {number} */
export function constrain(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/** scales value n to a new range
 * @param {number} n number to scale
 * @param {number} start1 old range
 * @param {number} stop1 old range
 * @param {number} start2 new range
 * @param {number} stop2 new range
 * @returns {number}
 */
export function map(n, start1, stop1, start2, stop2) {
  const newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  if (start2 < stop2) {
    return constrain(newval, start2, stop2);
  } else {
    return constrain(newval, stop2, start2);
  }
}

/** Limits number 
 * @param {number} number 
 * @param {number} limit 
 * @returns {number} */
export function limitNum(number, limit) {
  const vorzeichen = number < 0 ? -1 : 1;
  let numberMag = Math.abs(number);
  if (numberMag > limit) {
    numberMag = limit;
  }
  return numberMag * vorzeichen;
}
/** array autofill 0 to len-1
 * @param {number} start 
 * @param {number} len length of array
 * @param {number} steps increment
 * @returns {number[]}
 */
export function range(start, len, steps) {
  let arr = new Array(len);
  let val = start;	
  for (let i = 0; i < len; i++) {
    arr[i] = val;
    val += steps;
  }
  return arr;
}
/** make shuffled copy of arr
 * @param {number[]} arr 
 * @returns {number[]}
 */
export function shuffle(arr) {
  let a = arr.slice();
  for (let i = a.length; i>0; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
}

/** Fetching a CSV-File from Server
 * @param {string} file 
 */
export async function fetchCSV(file) {
	const response = await fetch(file);
	const data = await response.text();
	const rows = data.split('\n');
	let cols = new Array(rows.length);

	rows.forEach((row, i) => {
    cols[i] = row.split(',');

	});
	return cols;
}
