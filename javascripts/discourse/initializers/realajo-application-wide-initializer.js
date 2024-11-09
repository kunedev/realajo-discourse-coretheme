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

        // Remove any query parameters from the URL
        const cleanUrl = url.split('?')[0];

        // Handle initial page load by detecting page type and dispatching appropriate event
        if (!window.IsLoaded) {
          // Check for homepage first
          const homepageUrls = {
            "/": "home",
            "/latest": "latest",
            "/categories": "categories",
            "/top": "top"
          };

          if (homepageUrls.hasOwnProperty(cleanUrl)) {
            window.dispatchEvent(new CustomEvent("RWrapperEvent", {
              detail: {
                eventReason: "homepageOpened",
                viewType: homepageUrls[cleanUrl]
              }
            }));
          }
          // Check for topic page
          else if (cleanUrl.match(/^\/t\//)) {
            const container = api.container;
            const topicController = container.lookup('controller:topic');
            if (topicController && topicController.model) {
              const model = topicController.model;
              window.dispatchEvent(new CustomEvent("RWrapperEvent", {
                detail: {
                  eventReason: "topicOpened",
                  topicId: model.id,
                  topicTitle: model.title,
                  categoryId: model.category?.id,
                  categoryName: model.category?.name
                }
              }));
            }
          }
          // Check for category page
          else if (cleanUrl.match(/^\/c\//)) {
            const container = api.container;
            const categoryController = container.lookup('controller:discovery/category');
            if (categoryController && categoryController.model) {
              const category = categoryController.model.category;
              window.dispatchEvent(new CustomEvent("RWrapperEvent", {
                detail: {
                  eventReason: "categoryOpened",
                  categoryId: category.id,
                  categoryName: category.name
                }
              }));
            }
          }
          // Check for group page
          else if (cleanUrl.match(/^\/g\//)) {
            const container = api.container;
            const groupController = container.lookup('controller:group');
            if (groupController && groupController.model) {
              const model = groupController.model;
              window.dispatchEvent(new CustomEvent("RWrapperEvent", {
                detail: {
                  eventReason: "groupOpened",
                  groupId: model.id,
                  groupName: model.name
                }
              }));
            }
          }
        }

        // Create and dispatch the pageChange event
        let event = new CustomEvent("RWrapperEvent", {
          detail: { 
            eventReason: "pageChange",
            url: url, 
            title: title 
          }
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