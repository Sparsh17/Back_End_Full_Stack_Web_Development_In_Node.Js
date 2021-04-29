console.log('Hello');

function add(a,b) {
    return a+b;
}

console.log(add(2,5));

console.log(process.argv);

var args = process.argv.slice(3);

console.log("Add: ",add(parseInt(args[0]),parseInt(args[1])));