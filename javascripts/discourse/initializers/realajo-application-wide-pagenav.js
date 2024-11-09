import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "application-wide-pagenav",

  initialize() {
    withPluginApi("0.8.14", (api) => {
      api.onPageChange((url, title) => {


        const cleanUrl = url.split('?')[0];

        // Only for subsequent page loads 

        if (window.IsLoaded) { 
 
          // Check for homepage first
          const homepageUrls = {
            "/": "home",
            "/latest": "latest",
            "/categories": "categories",
            "/top": "top"
          };

          if (homepageUrls.hasOwnProperty(cleanUrl)) {
            return;
          }
          // Check for topic page
          else if (cleanUrl.match(/^\/t\//)) {
            return;   
          }
            // Check for category page
            else if (cleanUrl.match(/^\/c\//)) {
              return;
            }
          // Check for group page
          else if (cleanUrl.match(/^\/g\//)) {
            return;
          }

          else {
            // If no other page type matches, its an atypical page eg admin .. we need to clear down some fields. 

            let event = new CustomEvent("RWrapperEvent", {
              detail: { 
                eventReason: "atypicalOpened"
              }
            });
            window.dispatchEvent(event);
            
          }
        }

      });
    });
  },
};