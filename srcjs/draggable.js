

const panels = document.getElementsByClassName("Panel");

for (let i = 0; i < panels.length; i++) {

    panels[i].addEventListener("dragover", (e) => {
        e.preventDefault();
    })   

    panels[i].addEventListener("drop", (e) => {
        let parentId = e.dataTransfer.getData("parent");
        let sourceId = e.dataTransfer.getData("source");

        let draggedElement = document.getElementById(sourceId);
        if (parentId === panels[i].id) {
            return;
        } else{
            parentId = panels[i].id;
           panels[i].appendChild(draggedElement);     
        }
    })    
}