import { withPluginApi } from "discourse/lib/plugin-api";


export default {
  name: "application-wide-initializer",

  initialize() {
    withPluginApi("0.8.14", (api) => {
      api.onPageChange((url, title) => {
        
        // Create a new event
        let event = new CustomEvent("pageChange", {
          detail: { url: url, title: title }
        });

        // Dispatch the event
        window.dispatchEvent(event);

        // Log the event
        console.log("pageChange event dispatched");


      });
    });
  },
};
