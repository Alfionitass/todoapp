var taskInput = document.getElementById("new-task"); //add a new task
var addButton = document.getElementsByTagName("button"); //  button add
var editButton = document.getElementsByTagName("button"); // button edit
var deleteButton = document.getElementsByTagName("button"); // button delete
var incompleteTaskHolder = document.getElementById("incomplete-tasks"); //ul of #incomplete-tasks
var completedTaskHolder = document.getElementById("completed-tasks"); //ul of #completed-tasks

// New task list item
var createNewTaskElement = function(taskString) {
    var listItem = document.createElement("li");

    //input todo
    var addInput = document.createElement("input");
    // button add
    var addButton = document.createElement("button");
    // input (checkbox)
    var checkBox = document.createElement("input"); // checkbox
    //label
    var label = document.createElement("label"); // label
    // input (text)
    var editInput = document.createElement("input"); // text
    // button edit
    var editButton = document.createElement("button"); // edit button
    // button delete
    var deleteButton = document.createElement("button"); // delete button

    label.innerText = taskString;

    // each element, needs appending
    checkBox.type="checkbox";
    editInput.type="text";
    addInput.type = "text";

    addButton.innerText="Add";
    addButton.className="add";
    editButton.innerText="Edit";
    editButton.className= "edit";
    deleteButton.innerText= "Delete";
    deleteButton.className= "delete";

    //and appending
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(addInput);
    listItem.appendChild(addButton);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

var addTask = function() {
    console.log("Add Task..."); 
    // create a new list item with the text from the #new-task:
    var listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

// Edit an Existing task
var editTask = function() {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    var listItem = this.parentNode;

    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector("label");
    var containsClass = listItem.classList.contains("editMode");
    // if class of the parent is .editMode
    if (containsClass) {
        //switch to .editMode 
        // label becomes the inputs value
        label.innerText = editInput.value;
    } else {
        editInput.value = label.innerText;
    }

    //toggle .editMode on the parent
    listItem.classList.toggle("editMode");
}

// Delete task
var deleteTask = function () {
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    // Remove the parent list item for the ul
    ul.removeChild(listItem);
}

// Mark task completed
var taskCompleted = function() {
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

// Mark task as incomplete
var taskIncomplete = function() {
    console.log ("Incomplete Task..."); 
    // when the checkbox is unchecked, append the task list item to the #incomplete-tasks
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function() {
    console.log("AJAX Request");

    // the glue to hold it all togeteher

    // set the click handler to the addTask function
    addButton.onclick = addTask;
    addButton.addEventListener("click", addTask);
    addButton.addEventListener("click", ajaxRequest);
};

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    //select ListItems children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var addButton = taskListItem.querySelector("button.add")
    var editButton = taskListItem.querySelector ("button.edit");
    var deleteButton = taskListItem.querySelector ("button.delete");
        
        //Bind editTask to edit button
        editButton.onclick = editTask;
        //Bind deleteTask to delete button
        deleteButton.onclick = deleteTask;
        // Bind taskCompleted to checkboxEventHandler
        checkBox.onchange = checkBoxEventHandler;
}

// cycle over incompleteTaskHolder ul list items
    //for each list item
for (var i=0; i < incompleteTaskHolder.children.length; i++) {
    //bind events to list items children (taskCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

// cycle over completedTaskHolder ul list items
    //for each list item
for (var i=0; i < completedTaskHolder.children.length; i++) {
    //bind events to list items children (taskIncomplete)
    bindTaskEvents(CompletedTaskHolder.children[i],taskIncomplete);
}
