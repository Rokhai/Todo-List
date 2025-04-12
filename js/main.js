const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []


function addNewItem(task = "Task") {
    itemsArray.push(task);
    localStorage.setItem("items", JSON.stringify(itemsArray));

}

function uniqueDateTimeIdGenerator() {
    const timestamp = Date.now();
    const salt = Math.random().toString(36).substr(2, 9); // Generate a random salt
    return `${timestamp}${salt}`;

}
// const timestamp = uniqueDateTimeIdGenerator();
// console.log(timestamp);

function createNewTaskObject(task = 'task') {
    const task_object = {
        "task_id": uniqueDateTimeIdGenerator(),
        "task": task,
        "isDone": false
    }
    return task_object;
}

function saveTask(task = "Task") {
    const task_object = createNewTaskObject(task);
    itemsArray.push(task_object);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    createNewTask(task, task_object.task_id);
}

function sampleItem() {
    saveTask("Task 1");
}

function displayItems() {
    let items = "";
    // console.log("Hwllllloo")
    for (let i = 0; i < itemsArray.length; i++) {
        // items += "task:"  + itemsArray[i].task + " type:" + itemsArray[i].type;
        items += "task:" + itemsArray[i];
        console.log(items)
    }
}

// displayItems()


// create icon
function createIcon(icon = "pencil-line") {
    // create new icon element
    const icon_element = document.createElement('i');
    icon_element.setAttribute("data-lucide", icon);
    return icon_element;
}

// create button
function createButton(content = "Button", icon = "pencil-line", classNames = [], task_id = "101") {
    // create new button element
    const button = document.createElement('button');
    classNames.forEach(className => {
        button.classList.add(className);
    });
    const new_icon = createIcon(icon);



    const text = document.createElement('span');
    text.classList.add("task-option-text");
    text.textContent = content;

    button.appendChild(text);
    button.insertBefore(new_icon, button.firstChild);



    return button;

}

function createDeleteButton() {
    // Create new delete button component
    // const delete_button = document.createElement('button');
    // delete_button.classList.add("task-option", "task-option-delete");

    // const delete_icon = document.createElement('i');
    // delete_icon.setAttribute("data-lucide", "trash");

    // const delete_text = document.createElement('span');
    // delete_text.textContent = "Delete";

    // delete_button.appendChild(delete_icon);
    // delete_button.appendChild(delete_text);

    const delete_button = createButton("Delete", "trash", ["task-option", "task-option-delete"]);

    return delete_button;
}


function createEditButton(task_id = "909") {

    // Create new edit button component
    const edit_button = createButton("Edit", "pencil-line", ["task-option", "task-option-edit"]);
    edit_button.id = "task-option-edit";
    return edit_button;

}



function createNewTask(task = "", task_id = "101", is_done = false) {

    const tasks_container = document.getElementsByClassName('tasks-container');


    // create task container
    const task_container = document.createElement('section');
    task_container.classList.add("task-container");
    task_container.setAttribute("task-id", task_id);
    task_container.setAttribute("isEditing", "false");




    const task_detail = document.createElement('section');
    task_detail.classList.add("task-detail");

    const task_options = document.createElement('section');
    task_options.classList.add("task-options");


    const task_checkbox = document.createElement('input');
    task_checkbox.setAttribute("type", "checkbox");
    task_checkbox.classList.add("task-checkbox");

    // const square_icon = document.createElement('i');
    // square_icon.classList.add("task-checkbox");
    // console.log(is_done)

    const task_input_text = document.createElement("input");
    task_input_text.setAttribute("type", "text");
    task_input_text.classList.add("task-name");
    task_input_text.setAttribute("value", task);
    task_input_text.setAttribute("task-id", task_id);
    task_input_text.disabled = true;


    if (is_done) {
        task_checkbox.checked = true;
        // square_icon.setAttribute("data-lucide", "square-check");
        task_input_text.classList.add("task-done");
    } else {
        task_checkbox.checked = false;
        // square_icon.setAttribute("data-lucide", "square");
    }

    // task_detail.appendChild(square_icon);
    task_detail.appendChild(task_checkbox);
    task_detail.appendChild(task_input_text);
    // new_task.textContent = task;


    const edit_btn = createEditButton(task_id);
    const delete_btn = createDeleteButton();


    task_options.appendChild(edit_btn);
    task_options.appendChild(delete_btn);

    task_container.appendChild(task_detail);
    task_container.appendChild(task_options);


    tasks_container[0].append(task_container);
}


lucide.createIcons();
const btnAddNewTask = document.querySelector('#btn-add-task');
let text_input_task = document.querySelector('#text-input-task');


// Click event for add new task
btnAddNewTask.addEventListener('click', e => {
    if (text_input_task.value) {
        saveTask(text_input_task.value);

        lucide.createIcons();
        document.getElementById('text-input-task').value = "";


        if (itemsArray.length == 1) {
            document.querySelector('.empty-tasks-container').style.display = "none";
        }
    }
});

/**
 * Event Delegation Helper
 * @param {*} type 
 * @param {*} selector 
 * @param {*} callback 
*/
// https://www.perplexity.ai/search/how-to-use-datetime-in-javascr-x9YgrxP7TnGeWXt_UP3.8g
function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.closest(selector)) {
            callback(e)
        }
    })
}

addGlobalEventListener('click', '.task-option-edit', e => {
    console.log("Hello World! Edit button")
    const task_container = e.target.closest(".task-container");
    const task_id = task_container.getAttribute("task-id");
    const task_option_text_element = task_container.querySelector('.task-option-text');
    // const task_option_icon = task_container.querySelector('i[data-lucide]');
    const task_option_icon = task_container.querySelector('svg[data-lucide]');
    console.log(task_id)
    const task_checkbox = task_container.querySelector('input[type="checkbox"]');
    console.log(task_container.getAttribute("isEditing"))


    if (task_container.getAttribute("isEditing") === "false") {
        task_container.setAttribute("isEditing", "true");
        const task_box = document.querySelector('input[type="text"][task-id="' + task_id + '"]');
        // const task_checkbox = document.querySelector('input[type="checkbox"][task-id="' + task_id + '"]');
        // const task_checkbox = document.querySelector('input[type="checkbox"][task-id="' + task_id + '"]');
        task_box.disabled = false;

        // const task_option_icon = e.target.querySelector('i[data-lucide]'); // Select the existing icon
        task_option_icon.setAttribute('data-lucide', 'save'); // Change the icon to "save"

        task_option_text_element.textContent = "Save";

        if (task_box.classList.contains("task-done")) {
            task_box.classList.remove("task-done");
            task_checkbox.checked = false;
            task_checkbox.disabled = true;
        }
    } else {
        task_container.setAttribute("isEditing", "false");
        const task_box = document.querySelector('input[type="text"][task-id="' + task_id + '"]');
        // const task_checkbox = document.querySelector('input[type="checkbox"][task-id="' + task_id + '"]');
        task_box.disabled = true;
        task_checkbox.disabled = false;

        // const task_option_icon = e.target.querySelector('i[data-lucide]'); // Select the existing icon
        task_option_icon.setAttribute('data-lucide', 'pencil-line'); // Change the icon back to "pencil-line"

        task_option_text_element.textContent = "Edit";

        // if (task_box.classList.contains("task-done")) {
        //     task_box.classList.remove("task-done");
        //     task_checkbox.checked = false;
        // }`

        itemsArray.forEach(item => {
            if (item.task_id === task_id) {
                item.task = task_box.value;
                item.isDone = false;
            }
        });
        localStorage.setItem("items", JSON.stringify(itemsArray));
    }

    
    lucide.createIcons();

});
addGlobalEventListener('click', '.task-option-delete', e => {
    console.log("Hello World! Delete button")
    const task_container = e.target.closest(".task-container");
    const task_id = task_container.getAttribute("task-id");
    task_container.style.animation = "task-slide-right ease-in-out 0.5s";

    // Add a delay before removing the task container
    setTimeout(() => {
        document.querySelector('.tasks-container').querySelector('.task-container[task-id="' + task_id + '"]').remove();
        itemsArray.forEach((item, index) => {
            if (item.task_id === task_id) {
                itemsArray.splice(index, 1);
            }
        });
        localStorage.setItem("items", JSON.stringify(itemsArray));
        if (itemsArray.length == 0) {
            document.querySelector('.empty-tasks-container').style.display = "flex";

        }

    }, 500); // Delay in milliseconds (0.5 seconds)

    console.log(task_id)
})

addGlobalEventListener('click', '.task-checkbox', e => {
    console.log("Hello World! Checkbox")
    console.log("Is checked: ", e.target.checked)
    console.log(e.target)
    const task_id = e.target.closest(".task-container").getAttribute("task-id");
    const task_box = document.querySelector('input[type="text"][task-id="' + task_id + '"]');


    if (e.target.checked === true) {
        // e.target.task_checkbox.checked = false;
        // e.target.task_checkbox.checked = false;
        console.log("Hello World! Checkbox checked")
        task_box.classList.add("task-done");
        itemsArray.forEach(item => {
            if (item.task_id === task_id) {
                item.isDone = true;
                // task_box.classList.add("task-done");
            }
        });
    } else {
        // e.target.task_checkbox.checked = true;
        // e.target.task_checkbox.checked = true;
        task_box.classList.remove("task-done");
        itemsArray.forEach(item => {
            if (item.task_id === task_id) {
                item.isDone = false;
            }
        });
    }
    localStorage.setItem("items", JSON.stringify(itemsArray));
    // lucide.createIcons();
})



window.addEventListener('load', e => {

    if (itemsArray.length == 0) {

        document.querySelector('.empty-tasks-container').style.display = "flex";
    }

    // console.log("Hello World! Load event")
    for (let i = 0; i < itemsArray.length; i++) {
        // createNewTask(itemsArray[i], i);
        createNewTask(itemsArray[i].task, itemsArray[i].task_id, itemsArray[i].isDone);
    }
    lucide.createIcons();

})
