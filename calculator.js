/* THE ODIN PROJECT - WEB DEV 101 - CALCULATOR

APPROACH:
    1) inside operator(num1, num2), I must have condition: if a operator key is pressed, perform any of operation.
    2) create a function that translates key/button entry to display & store values.

SCOPE:
    - project is to only include 2 numbers as inputs. Additional inputs are doable through .eval() method.

METHODS:
    1) onclick at HTML buttons?

STATUS:
    Store displayed values, then display operation, then answer at bottom line (may need to create another div for results).
    - pass operation condition to/from operator function - COMPLETED.
        - can't read operator() condition - SOLVED.
    - implement reset display after result is shown - COMPLETED.
    - implement backspace - most likely call function for arr. - COMPLETED.
    - implement floating number inputs - COMPLETED.
    - implement keyboard inputs - OPTIONAL.

LEARNED:
    - functions are mainly used to simplify code.
    - try to initialize getElements at the beginning of the code.
    - INSPIRED BY OTHER CODES: whether I'm on the right track, use of functions.
    - Use pseudocode to design the program first.
    - STRUGGLED:
        - event listeners initially declared within numID.forEach(e) method, so when trying to add backspace function using
        arr2.substr(0, arr2.length-1) OR arr.pop(), original arr2 & arr didn't change, or caused issues (deleted all array/string).
        To avoid this problem, declare array/string variables outside the method, assign/change values within the method, then 
        we can change the values of the variables outside the method as well. The issue was correlated to the fact that values
        were forced to change everytime a number from numID array event listener was clicked, which conflicted with other eventlisteners.
        So the bottom line is: don't nest an eventlistener within another unless required, and keep initialize variables outside the eventlisteners
        if they are to be used for other listeners too.
    - used RegEx for filtering numbers, dots from operators.
    - it's always helpful to comment beside each code to see what the resulting result will be.
    - important to push only operators to arr4, not "." - do separate if statement.
    - Debug using console.log to see which inputs are which and whether they are expected at that stage.

*/

var numberBut = document.getElementsByClassName("numButtons");
var opBut = document.getElementsByClassName("opButtons");
var disp = document.getElementById("display");
var clr = document.getElementById("AC");
var eql = document.getElementById("equals");
var bk = document.getElementById("back");
var dot = document.getElementById("dot"); //not necessary initialization

//let numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
let numID = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero", "plus", "subtract", "mult", "divide", "dot"];

/* OPTIONAL FUNCTIONS
let add = function(p1, p2) {
    let result = p1 + p2;
    return result.toFixed(5);
}

let subtract = function(num1, num2) {
    let result = num1 - num2;
    return result.toFixed(5);
}

let multiply = function(num1, num2) {
    let result = num1 * num2;
    return result.toFixed(5);
}

let divide = function(num1, num2) {
    let result = num1 / num2;
    return result.toFixed(5);
}
*/

let operator = function(num1, num2, op) { 

    let p1 = parseFloat(num1);
    let p2 = parseFloat(num2);

    switch (op) {
        case "+":
            return (p1 + p2).toFixed(2);
        break;
        case "-":
            return (p1 - p2).toFixed(2);
        break;
        case "X":
            return (p1 * p2).toFixed(2);
        break;
        case "/":
            return (p1 / p2).toFixed(2);
        break;
    }

}

let perform = function () {

    let arr = [];
    let arr2 = "";
    let arr3 = [];
    let arr3Num = [];   //unnecessary
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
                arr.push(contInt);     // arr = [1, 3, 4, 4]
            } else {
                arr.push(cont);         // arr = [1, ".", 3, "+", 4, ".", 4]
            }
            // IMPORTANT: condition to include operator EXCLUDING "." non-number.
            if (cont == "+" || cont == "-" || cont == "X" || cont == "/") {
                arr4[0] = cont;        //just for operator: ["operator"]; arr4 = ["+"]
            }

            arr2 = arr.join("");    //joining to string purely for display purpose. [num, "operator", num] -> "num, operator, num".
                                    // arr2 = ["1.3+4.4"]
            arr3 = arr2.split(/[^0-9\.]/g);   //splitting before and after the operator in the array; but splitted into strings: ["number", "number"].
                                            //arr3 = ["1.3", "4.4"]
            arr3Num = arr3.map(Number);     //NEW METHOD; convert the splitted strings into numbers; partInt method, but for all elements in an array: [number, number];
                                            //arr3Num = [1.3, 4.4]
            changeDisplay(arr2);


        })
        
    })

    //IMPORTANT!!!: below event listeners can be outside the numID.forEach(e) method because the variables used are declared outside the method as well!

    //backspace; must be outside numID.forEach(e) to change the arr without clicking any numbers.
    //struggled with display due to variable declarations; 
    bk.addEventListener("click", function() {
        arr.pop();
        arr2 = arr2.substr(0, arr2.length-1);   //for display
    
        changeDisplay(arr2);
    })
                
    //clear the field; can be inside numID.forEach(e) or outside, since not passing any variables from inside numID.forEach(e).
    clr.addEventListener("click", function() {
        arr = [];
        changeDisplay(arr);
    });


    //below can't be outside numID.forEach(e) since operator() is passing variables declared within the forEach method.
    eql.addEventListener("click", function() {
        //operator(arr[0], arr[2], arr[1])
        
        changeDisplay(operator(arr3[0], arr3[1], arr4[0]));    //NOT changeDisplay(operator());
        arr = [];   //reset the array/display.
        
    })

}

function backSpace(arr, arr2) {
    //not used function, if called inside event listeners, it will only get rid of one digit.
}

function changeDisplay(num) {
    disp.textContent = num;
}

//implement
/* Doesn't work using below function.
function backSpace(num) {
    num.substring(0, num.length-1);
    return num;
}
*/

//create a function for clearing display line(s).

perform();
console.log(operator());