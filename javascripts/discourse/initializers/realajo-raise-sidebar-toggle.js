
// listen for toggle events and react. 

$(document).ready(function () {

    if (document.getElementsByClassName("header-sidebar-toggle")) {
        addToggleListener(document.getElementsByClassName("header-sidebar-toggle")[0])
    }

    function addToggleListener(toggleEl) {
        if (toggleEl) {
            toggleEl.addEventListener("click", function () {
                // Wait a bit for the sidebar to load
                setTimeout(function() {

                    let sidebarIsVisible = document.getElementsByClassName("sidebar-section-header").length

                    if (sidebarIsVisible) {
                        raiseSidebarShownEvent()
                    }
                }, 100)
            })
        }
    }

    function raiseSidebarShownEvent() {
        let event = new CustomEvent("RWrapperEvent", {
            detail: { 
              eventReason: "sidebarShown",
            }
          });
          window.dispatchEvent(event);
          console.log("sidebarShown event raised")
    }

     
})
