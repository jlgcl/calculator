/* THE ODIN PROJECT - WEB DEV 101 - CALCULATOR

APPROACH:
    1) inside operator(num1, num2), I must have condition: if a operator key is pressed, perform any of operation.
    2) create a function that translates key/button entry to display & store values.

METHODS:
    1) onclick at HTML buttons?

STATUS:
    Store displayed values, then display operation, then answer at bottom line (may need to create another div for results).
    - pass operation condition to/from operator function - COMPLETED.
        - can't read operator() condition - SOLVED.
    - implement reset display after result is shown.
    - implement backspace - most likely call function for arr.

LEARNED:
    - functions are mainly used to simplify code.
    - try to initialize getElements at the beginning of the code.
    - INSPIRED BY OTHER CODES: whether I'm on the right track, use of functions.
    - Use pseudocode to design the program first.

*/

var numberBut = document.getElementsByClassName("numButtons");
var opBut = document.getElementsByClassName("opButtons");
var disp = document.getElementById("display");
var clr = document.getElementById("AC");
var eql = document.getElementById("equals");

//let numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
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

let operator = function(num1, num2, op) { 
 
    if (op == "+") {    //tried if(op.include("+") == true) approach, but this is more functional.
        return add(num1, num2);
        //return result as display on result-display line; call changeDisplay(answer).
    }
    
    if (op == "-") {
        return subtract(num1, num2);
    }
    
    if (op == "X") {
        return multiply(num1, num2);
    }
    
    if (op == "/") {
        return divide(num1, num2);
    }
    
}

let perform = function () {

    let arr = [];
    let arr4 = [];
    
    /* PSEUDOCODE:
    NOTE: the below code is complicated because we want to use JUST TWO INPUTS. If input numbers didn't matter, then
    would use eval() method to evaluate everything in a string (i.e. [3,+,5,-,4] = 3+5-4).
    - call operator function here
          1) obtain 2 number values from eventlistener - may need to parseInt() to convert string number to integer.
          2) call operator(num1, num2) outside forEach.
    - store numbers to array.push() for display and operator purposes (use changeDisplay function).
    - display and store first value, display and store second value, then perform operator() when "=" is pressed.
    - use the eval function; pushing the display to an array, joining them after was the right track; consider eval() after.
    */
    numID.forEach((e) => {

        //all code from here and below could be another function.
        document.getElementById(e).addEventListener("click", function() {   // if function(e), then changeDisplay will pass "e" from this line's function.
            /*if (e == "one") {
                changeDisplay(1);
            }*/

            //STUCK: display text contents of each id to obtain numbers; currently below codes return "undefined"; SOLVED: use getElementByID(e).textContent.
            let cont = document.getElementById(e).textContent;
            let contInt = parseInt(cont);

            // if condition to limit to only 2 inputs, including operator.
            //ISSUE: with if (arr.length < 3), display only takes in specified digit length below. SOLVED: remove if statement that limits input.
            //STUCK: push two numbers to array. SOLVED: join, split, then partInt the array elements.
            if (Number.isInteger(contInt)) {
                arr.push(contInt);      
            } else {
                arr.push(cont);
                arr4[0] = cont;        //just for operator: ["operator"].
            }

            arr2 = arr.join("");    //joining purely for display purpose. [num, "operator", num].
            arr3 = arr2.split(/[^0-9]/g);   //splitting before and after the operator in the array; but splitted into strings: ["number", "number"].
            arr3Num = arr3.map(Number);     //NEW METHOD; convert the splitted strings into numbers; partInt method, but for all elements in an array: [number, number];
           
            //clear the field
            clr.addEventListener("click", function() {
                arr = [];
                changeDisplay(arr);
            });

            eql.addEventListener("click", function() {
                //operator(arr[0], arr[2], arr[1])
                changeDisplay(operator(arr3Num[0], arr3Num[1], arr4[0]));    //NOT changeDisplay(operator());
            })

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