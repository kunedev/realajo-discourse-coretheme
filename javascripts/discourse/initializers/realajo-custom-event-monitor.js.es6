// assets/javascripts/discourse/initializers/realajo-custom-event-monitor.js.es6
import { withPluginApi } from 'discourse/lib/plugin-api';
 
let isMouseOver = false;


function RaiseRealajoEvent(targetDiv, type) {

  let id = targetDiv.getAttribute('data-id');        // the id of the category, topic, etc
  let name = targetDiv.getAttribute('data-name');     // the name of the category, topic, etc 
  let useContext = targetDiv.getAttribute('data-useContext');    // eg:  category-title-before   (or whatever outlet name we are using )

  let appContext = "get-from-window.appContext";      // we probably create and maintain a global variable (window.appContext) .. may not even need to pass this in the call 
  
  console.log(`Event: ${type}, AppContext: ${appContext}, UseContext: ${useContext}, ID: ${id}, Name: ${name}`);
  // Implement the rest of the function here

  let event = new CustomEvent("RWrapperEvent", {
    detail: { 
      eventReason: "detailEvent",
      eventType: type,
      appContext: appContext,
      useContext: useContext,
      id: id,
      name: name
    }
  });
  window.dispatchEvent(event);
  
  
}



function handleMouseOver(event) {

  if (event.target.tagName !== 'DIV') return;

  let target = event.target;

  while (target != null) {
    if (target.classList.contains('r-activate')) {
      if (!isMouseOver) {
        isMouseOver = true;
        let id = target.getAttribute('data-id');
        let name = target.getAttribute('data-name');
        RaiseRealajoEvent(target, 'mouseover');
      }
      break;
    }

    target = target.parentElement;
  }
}

function handleMouseOut(event) {

  let target = event.target;

  while (target != null) {
    if (target.classList.contains('r-activate')) {
      isMouseOver = false;
      break;
    }

    target = target.parentElement;
  }
}

function handleClick(event) {

  let target = event.target;

  while (target != null) {
    if (target.classList.contains('r-activate')) {
      event.preventDefault();
      event.stopPropagation();
      isMouseOver = true;

      RaiseRealajoEvent(target, 'click');
      break;
    }

    target = target.parentElement;
  }
}


export default {
  name: 'realajo-custom-event-monitor',

  initialize() {
    withPluginApi('0.8.14', () => {
      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mouseout', handleMouseOut);
      document.addEventListener('click', handleClick, true);

    });
  }
};