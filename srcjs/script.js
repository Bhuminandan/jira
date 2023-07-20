

/* <div class="modal">
            <div class="modal-container">
                <div class="modal__close">
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <form>
                    <input name="tile" type="text" placeholder="Title" required>
                    <input name="assignee" type="text" placeholder="Assignee" required>
                    <select name="status" id="" required>
                        <option value="TODO">To Do</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                        <textarea name="description" id="" cols="30" rows="3"></textarea>
                    </select>
                    <button class="btn">Create</button>
                </form>
            </div>
        </div> */

// Storing entire form html into a single element so we can add it later into modal, here we are
// creating the modal dianamically because if we direct add this html on body as innerHTML
// it well just replace all the existing html with new one, but we dont want that, istead of this we are
// Creating the modal(Outer most div) dianamically so we can append it on the DOM tree keeping the other html elements intact

const modalHtml = `
        <div class="modal-container">
            <div class="modal__close">
                <i  id="close_btn" class="fa-solid fa-xmark"></i>
            </div>
            <form id="create-form">
                <input name="title" type="text" placeholder="Title" required>
                <input name="assignee" type="text" placeholder="Assignee" required>
                <select name="status" id="" required>
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                </select>
                <textarea name="description" id="" cols="30" rows="3"></textarea>
                <button class="btn">Create</button>
            </form>
        </div>`


        // Getting the header create button
    const createBtn = document.getElementById("create");

    // adding a click listener to button, with function
    createBtn.addEventListener("click", () => {

        // Creating the modal div 
        const modal = document.createElement("div");
        modal.className = "modal";
        modal.innerHTML = modalHtml;
        // Appending the modal to body
        document.body.appendChild(modal);

        // Getting the form element by ID to extract values
        const form = document.getElementById("create-form");
        
        
        const formDataListner =  (e) =>{
            // The default bahaiviour of the form is to submit data into url but we want to
            // Collect that so by e.preventDefault() we are just preventing its behaiviour
            e.preventDefault();
            
            // e.target.elements basically returns the list of elements that form has like
            // Inputs selections and text area, and we are storing those elements in variable to iterate on it
            let elements = e.target.elements;

            // Creating an empty object
            let taskObjetct = {};

            // Iterating on elements[i] (On each element one by one)
            for (let i = 0; i < elements.length; i++) {

                // In below statement we are just shotcircuiting, because by default the object was getting filled with
                // name and value pair with concidering the button element also, that dosnnt have value atribute
                // and we dont need that, so we are saying here if the elements[i].name && exist then only do following operation
                // it dosnt run in case of button becase the button dosnt have the name attribute and hence it returns empty string
                // Which concidered as falsy
                elements[i].name && (taskObjetct[elements[i].name] = elements[i].value);
            }

            // Passing the created object in fuction to extract its key value pair and create a task
            createTask(taskObjetct);
            
            // We are at the end and user already clicked on the create button so we need to close the modal
            // so we are calling the inbuilt remove function and our created emoveFormEventLister() to removed
            // the listner that we applied on the form, for cleanup and memory optimization purposes
            modal.remove();
            removeFormEventLister();
        }
        
        // Adding and submit type of event listener to the form and passing a funcion name that is 
        // Created below
        form.addEventListener("submit", formDataListner)

        // remove event listener function with built in function removeEventListener();
        const removeFormEventLister = () => {
            form.removeEventListener("submit", formDataListner)
        }


        // Function to close the modal when we click on close icon
        const closeModal = () => {
            modal.remove();
            removeFormEventLister();
        }

        // Getting the close icon by id
        const closeButton = document.getElementById("close_btn");

        // adding even listner and calling the close modal
        closeButton.addEventListener("click", closeModal)

})

// Count varible for adding the id's to each task objects dianamically
let count = 0;


function createTask(taskObjetct){

    // Creating the task and adding the values dianamically
        const taskContainer = document.createElement("div");
        taskContainer.className = "panel__task";
        taskContainer.draggable = "true";
        taskContainer.id = `task-${count}`;
        count++;
        taskContainer.innerHTML = `
            <h3>${taskObjetct.title}</h3>
            <strong>${taskObjetct.assignee}</strong>
            <p>
            ${taskObjetct.description}
            </p>`

            // To append this Task object that we have created we need to add it to the respective panels
            // so taskObjetct.status is helping here to get thier ID's, this is happening because we have provided
            // same values for both ID's and Values of select input
            // For Ex: if taskObjetct.status return "TODO" which is basically a selection, but we are using it here
            // as a ID because inside HTML we have geven the ID's same
        const panel = document.getElementById(taskObjetct.status);

        // Appending the newly created taskContainer into extracted/respective panel
        panel.appendChild(taskContainer);

        // Upoun creation we are adding a dragStart eventlistener to it
        taskContainer.addEventListener("dragstart", (e) => {

            // the event or e in our case is same throghout the process of the dragging cycle
            // that means this e will be same in dragover, dragenter, drop and here also
            // This allows us to transfer data alsong with it so here we are basically transfering the data
            // with dataTransfer.setData methods
            // In this dataTransfer.setData we are passign two arguments, first is varible and another one
            // is data, One thing to remember here is these methods only accepts "strings" only in the arguments
            // here parentElement is inbuilt method that gives parent adress to us of perticular element
            e.dataTransfer.setData("source", taskContainer.id);
            e.dataTransfer.setData("parent", taskContainer.parentElement.id);
        })

}