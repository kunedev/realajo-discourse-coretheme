import { withPluginApi } from "discourse/lib/plugin-api";


export default {
  name: "application-wide-initializer",

  initialize() {
    withPluginApi("0.8.14", (api) => {
      api.onPageChange((url, title) => {
        
        // Access current user data
        const currentUser = api.getCurrentUser();

        const currentUserName = currentUser ? currentUser.username : '';
        window.DiscourseUser = currentUserName;
        
        console.log("Current user: " + currentUserName);
    
        // Create a new event
        let event = new CustomEvent("RWrapperEvent", {
          detail: { eventReason: "pageChange",
             url: url, title: title }
        });

        window.IsLoaded = true;
        console.log("The DOM has loaded, window.IsLoaded is set, and window.DiscourseUser is set.");
        console.log("RWrapperEvent: pageChange raised");

        // Dispatch the event
        window.dispatchEvent(event);
 


      });
    });
  },
};
