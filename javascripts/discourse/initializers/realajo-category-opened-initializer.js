import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "category-opened-initializer",

  initialize() {
    withPluginApi("0.8.14", (api) => {
      api.modifyClass('route:discovery.category', {
        setupController(controller, model) {
          this._super(controller, model);

          // Get the category information
          let categoryId = model.category.id;
          let categoryName = model.category.name;

          // Create a new event
          let event = new CustomEvent("ToWrapper_categoryOpened", {
            detail: {
              categoryId: categoryId,
              categoryName: categoryName
            }
          });

          console.log("Category");
          console.log(model);
          

          // Dispatch the event
          window.dispatchEvent(event);
        }
      });
    });
  },
};
