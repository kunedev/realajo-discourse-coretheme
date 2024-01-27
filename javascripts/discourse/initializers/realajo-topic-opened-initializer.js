import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "topic-opened-initializer",

  initialize() {
    withPluginApi("0.8.14", (api) => {
      api.modifyClass('route:topic', {
        setupController(controller, model) {
          this._super(controller, model);

          // Get the topic and category information
          let topicId = model.id;
          let topicTitle = model.title;
          let categoryId = model.category.id;
          let categoryName = model.category.name;

          // Create a new event
          let event = new CustomEvent("RWrapperEvent", {
            detail: {
              eventReason: "topicOpened",
              topicId: topicId,
              topicTitle: topicTitle,
              categoryId: categoryId,
              categoryName: categoryName
            }
          });

          // Dispatch the event
          window.dispatchEvent(event);

          console.log("Topic");
          console.log(model);
          console.log("Topic Category");
          console.log(model.category);
          

        }
      });
    });
  },
};