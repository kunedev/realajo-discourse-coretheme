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

        // Handle initial page load by storing data in window object
        if (!window.IsLoaded) {
          // Initialize the storage object
          window.InitialPageData = {
            url: url,
            title: title,
            pageType: null,
            data: {}
          };

          // Check for homepage first
          const homepageUrls = {
            "/": "home",
            "/latest": "latest",
            "/categories": "categories",
            "/top": "top"
          };

          if (homepageUrls.hasOwnProperty(cleanUrl)) {
            window.InitialPageData.pageType = "homepage";
            window.InitialPageData.data = {
              eventReason: "homepageOpened",
              viewType: homepageUrls[cleanUrl]
            };
          }
          // Check for topic page
          else if (cleanUrl.match(/^\/t\//)) {
            const container = api.container;
            const topicController = container.lookup('controller:topic');
            if (topicController && topicController.model) {
              const model = topicController.model;
              window.InitialPageData.pageType = "topic";
              window.InitialPageData.data = {
                eventReason: "topicOpened",
                topicId: model.id,
                topicTitle: model.title,
                categoryId: model.category?.id,
                categoryName: model.category?.name
              };
            }
          }
          // Check for category page
          else if (cleanUrl.match(/^\/c\//)) {
            const container = api.container;
            const categoryController = container.lookup('controller:discovery/category');
            if (categoryController && categoryController.model) {
              const category = categoryController.model.category;
              window.InitialPageData.pageType = "category";
              window.InitialPageData.data = {
                eventReason: "categoryOpened",
                categoryId: category.id,
                categoryName: category.name
              };
            }
          }
          // Check for group page
          else if (cleanUrl.match(/^\/g\//)) {
            const container = api.container;
            const groupController = container.lookup('controller:group');
            if (groupController && groupController.model) {
              const model = groupController.model;
              window.InitialPageData.pageType = "group";
              window.InitialPageData.data = {
                eventReason: "groupOpened",
                groupId: model.id,
                groupName: model.name
              };
            }
          }
        } else {
          // For non-initial loads, dispatch event as normal
          let event = new CustomEvent("RWrapperEvent", {
            detail: { 
              eventReason: "pageChange",
              url: url, 
              title: title 
            }
          });
          window.dispatchEvent(event);
        }

        window.IsLoaded = true;
        console.log("The DOM has loaded, window.IsLoaded is set, and window.DiscourseUser is set.");
      });
    });
  },
};