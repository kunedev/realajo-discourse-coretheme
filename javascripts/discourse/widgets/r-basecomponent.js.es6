import { scheduleOnce } from "@ember/runloop";
import { createWidget } from 'discourse/widgets/widget';

let layoutsError;
let layouts;

try {
  
  console.log("Evidently, I can run any JS I need here.  This is neat .. I can include JS code directly in the base component.");      // yes this works 
  
 
} catch(error) {

  console.error(error);

}
 