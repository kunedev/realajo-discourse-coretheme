import { scheduleOnce } from "@ember/runloop";
import { createWidget } from 'discourse/widgets/widget';

let layoutsError;
let layouts;

try {
  console.log("Usefully, functions within Widgets are also available.");   // yes this works 
} catch(error) {
  console.error(error);
}

let x = myFunction(4, 3);   // Function is called, return value will end up in x
//alert("x = " + x);    // yes this works 

function myFunction(a, b) {
  return a * b;             // Function returns the product of a and b
}