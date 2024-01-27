import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "homepage-opened-initializer",

  initialize() {
    withPluginApi("0.8.14", (api) => {
      api.onPageChange((url, title) => {
        // Remove any query parameters from the URL
        url = url.split('?')[0];

        // Define the homepage URLs and their corresponding view types
        const homepageUrls = {
          "/": "home",
          "/latest": "latest",
          "/categories": "categories",
          "/top": "top"
        };

        // Check if the URL matches any of the homepage URLs
        if (homepageUrls.hasOwnProperty(url)) {
          // Get the view type from the homepage URLs
          let viewType = homepageUrls[url];

          // Create a new event
          let event = new CustomEvent("ToWrapper_homepageOpened", {
            detail: {
              viewType: viewType
            }
          });

          console.log("Homepage.  Type: " + viewType);

          // Dispatch the event
          window.dispatchEvent(event);
        }
      });
    });
  },
};