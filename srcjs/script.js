

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
                    <textarea name="description" id="" cols="30" rows="3"></textarea>
                </select>
                <button class="btn">Create</button>
            </form>
        </div>`


    const createBtn = document.getElementById("create");

    createBtn.addEventListener("click", () => {
        const modal = document.createElement("div");
        modal.className = "modal";
        modal.innerHTML = modalHtml;
        document.body.appendChild(modal);

    
    const form = document.getElementById("create-form");
    const removeFormEventLister = () => {
        form.removeEventListener("submit", formDataListner)
    }
    const formDataListner =  (e) =>{
        e.preventDefault();
        let elements = e.target.elements;
        let taskObjetct = {};
        for (let i = 0; i < elements.length; i++) {
            elements[i].name && (taskObjetct[elements[i].name] = elements[i].value);
        }
        createTask(taskObjetct);

        modal.remove();
        removeFormEventLister();
    }
    form.addEventListener("submit", formDataListner)

    const closeModal = () => {
        modal.remove();
        removeFormEventLister();
    }

    const closeButton = document.getElementById("close_btn");
    closeButton.addEventListener("click", closeModal)

    

})

let count = 0;

function createTask(taskObjetct){
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

    const panel = document.getElementById(taskObjetct.status);
    panel.appendChild(taskContainer);

    taskContainer.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("source", taskContainer.id);
        e.dataTransfer.setData("parent", taskContainer.parentElement.id);
    })

}