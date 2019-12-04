/* THE ODIN PROJECT - WEB DEV 101 - CALCULATOR

APPROACH:
    1) inside operator(num1, num2), I must have condition: if a operator key is pressed, perform any of operation.
    2) create a function that translates key/button entry to display & store values.

METHODS:
    1) onclick at HTML buttons?

STATUS:
    - Find a way to display value when button clicked.

*/

var numberBut = document.getElementsByClassName("numButtons");
var opBut = document.getElementsByClassName("opButtons");
var disp = document.getElementById("display");
var clr = document.getElementById("AC");
var eql = document.getElementById("equals");


let add = function(num1, num2) {
    let result = num1 + num2;
    return result;
}

let subtract = function(num1, num2) {
    let result = num1 - num2;
    return result;
}

let multiply = function(num1, num2) {
    let result = num1 * num2;
    return result;
}

let divide = function(num1, num2) {
    let result = num1 / num2;
    return result;
}

let operator = function(num1, num2) { 
    
    add(num1, num2);
    subtract(num1, num2);
    multiply(num1, num2);
    divide(num1, num2);
}

let perform = function () {
    let arr = [];

    document.getElementById("one").addEventListener("click", function() {
        disp.innerHTML = 1;
        //arr.push(1);
    });
}

perform();