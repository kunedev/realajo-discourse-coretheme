import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "group-opened-initializer",

  initialize() {
    withPluginApi("0.8.14", (api) => {
      api.modifyClass('route:group', {
        setupController(controller, model) {
          this._super(controller, model);

          // Get the group information
          let groupId = model.id;
          let groupName = model.name;

          // Create a new event
          let event = new CustomEvent("groupOpened", {
            detail: {
              groupId: groupId,
              groupName: groupName
            }
          });

          // Dispatch the event
          window.dispatchEvent(event);

        // Log the event
        console.log("groupOpened event " + groupName + " " + groupId + " dispatched");
        console.log(model); 
        


        }
      });
    });
  },
};
