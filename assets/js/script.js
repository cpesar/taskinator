

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;

var taskFormHandler = function(event){
  event.preventDefault();

  //the 'name' attribute is referenced from the index.html file (task-name & task-type)
  //.value is added to the end so that the value will be displayed in the list
  var taskNameInput = document.querySelector("input[name='task-name']").value;  
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  //package up data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  //check if input values are empty strings, the !(not operator) will make the condition return true if the value evaluates as false. by using the condition we're checking if taskNameInput or taskTypeInput is empty or if both are empty
  //if either one or both of the variables are NOT true, then proceed. this is the same as if either one or both of the variables are false, proceed
if (!taskNameInput || !taskTypeInput) {
  alert("You need to fill out the task form!");
  return false;
}

  //add a reset function to clear the form input after the user enters something
  formEl.reset();

  //send it as an argument to createTaskEl
  createTaskEl(taskDataObj);

};

var createTaskEl = function(taskDataObj){
  var listItemEl = document.createElement("li");

  //create a list item
  listItemEl.className = "task-item";

  //add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

   //create div to hold task info and add to list item. 
   var taskInfoEl = document.createElement("div");
   //give it a class name
   taskInfoEl.className = "task-info";
   //add HTML content to div
   taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

   listItemEl.appendChild(taskInfoEl);
   tasksToDoEl.appendChild(listItemEl);

   //increase task counter for next unique id
   taskIdCounter++;

}

var createTaskActions = function(taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  //create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  //create delete button
  var deleteButtonEl =document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(statusSelectEl);

  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++){
    //create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute ("value", statusChoicesEl[i]);
    //append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
}

formEl.addEventListener("submit", taskFormHandler);

