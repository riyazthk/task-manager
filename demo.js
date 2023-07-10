console.log("upper scope", b);

let a = 10;
var b = 20;
const f = 5;

f = 10;

console.log("lower scope", a, b);
