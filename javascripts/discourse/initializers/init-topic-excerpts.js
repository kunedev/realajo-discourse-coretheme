import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  console.log("Demo: discourse-air: init-topic-excerpts.js");
  api.modifyClass("component:topic-list-item", {
    pluginId: "discourse-air",
    expandPinned: true,
  });
});
