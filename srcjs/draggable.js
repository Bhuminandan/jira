
// Getting panels from HTML, so we can iterate on them one by one
const panels = document.getElementsByClassName("Panel");

// Iterating on panels
for (let i = 0; i < panels.length; i++) {

    // Adding dragover eventListener to it, and adding this e.preventDefault();
    // function which prevents its defalt bahaiviour, because to drop event lister to work
    // the default behaiviour needs to be stopped
    panels[i].addEventListener("dragover", (e) => {
        e.preventDefault();
    })   
    
    panels[i].addEventListener("dragenter", (e) => {;

        // adding styling on area where we are dragging
        panels[i].style.scale = "1.03";
    })

    panels[i].addEventListener("dragleave", (e) => {
        // Removing the styling once we leave the area
       panels[i].style.scale = "1";


    })  

    // Adding drop event listener to current panel
    panels[i].addEventListener("drop", (e) => {

        // Removing the styling after dropping
        panels[i].style.scale = "1";



        // Getting he parent and source id from e.dataTransfer.getData that we passed from main js file
        let parentId = e.dataTransfer.getData("parent");
        let sourceId = e.dataTransfer.getData("source");

        // Getting the dragging element by id that we extracted above
        let draggedElement = document.getElementById(sourceId);


        // Stopping the user to drop the draggedElelment/taskContainer in the same panel
        if (parentId === panels[i].id) {
            return;
        }

        // appending the draggedElement to the panel where it has dropped
        panels[i].appendChild(draggedElement);     
    })    
}