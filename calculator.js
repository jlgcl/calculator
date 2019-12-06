/* THE ODIN PROJECT - WEB DEV 101 - CALCULATOR

APPROACH:
    1) inside operator(num1, num2), I must have condition: if a operator key is pressed, perform any of operation.
    2) create a function that translates key/button entry to display & store values.

METHODS:
    1) onclick at HTML buttons?

STATUS:
    Store displayed values, then display operation, then answer at bottom line (may need to create another div for results).
    - pass value to operator function.

LEARNED:
    - functions are mainly used to simplify code.
    - try to initialize getElements at the beginning of the code.

*/

var numberBut = document.getElementsByClassName("numButtons");
var opBut = document.getElementsByClassName("opButtons");
var disp = document.getElementById("display");
var clr = document.getElementById("AC");
var eql = document.getElementById("equals");

let numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
let numID = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero", "plus", "subtract", "mult", "divide"];


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
    
    document.getElementById("plus").addEventListener("click", function() {
        add(num1, num2);
        //return result as display on result-display line; call changeDisplay(answer).
    })
    
    document.getElementById("subtract").addEventListener("click", function(){
        subtract(num1, num2);
    })
    
    document.getElementById("mult").addEventListener("click", function() {
        multiply(num1, num2);
    })
    
    document.getElementById("divide").addEventListener("click", function() {
        divide(num1, num2);
    })
    
}

let perform = function () {

    let arr = [];
    
    /*
    - call operator function here
          1) obtain 2 number values from eventlistener - may need to parseInt() to convert string number to integer.
          2) call operator(num1, num2) outside forEach.
    - store numbers to array.push() for display purposes only (use changeDisplay function).
    - display and store first value, display and store second value, then perform operator() when "=" is pressed.
    - use the eval function; pushing the display to an array, joining them after was the right track; consider eval() after.
    */
    numID.forEach((e) => {

        document.getElementById(e).addEventListener("click", function() {   // if function(e), then changeDisplay will pass "e" from this line's function.
            /*if (e == "one") {
                changeDisplay(1);
            }*/

            //STUCK: display text contents of each id to obtain numbers; currently below codes return "undefined"; SOLVED: use getElementByID(e).textContent.
            let cont = document.getElementById(e).textContent;

            let contInt = parseInt(cont);

            // if condition to limit to only 2 digit inputs, including operator.
            if (arr.length < 3) {
                if (Number.isInteger(contInt)) {
                    arr.push(contInt);
                } else {
                    arr.push(cont);
                }
            } else {
                operator(arr[0], arr[1]);
            }
            
            arr2 = arr.join("");
           
            //clear the field
            clr.addEventListener("click", function() {
                arr = [];
                changeDisplay(arr);
            });

            changeDisplay(arr2);
        })
        
    })
}

function changeDisplay(num) {
    disp.textContent = num;
}

//implement later
function backSpace(num) {
    num.pop();
}

//create a function for clearing display line(s).

perform();