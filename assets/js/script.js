var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgress = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");



//TASKFORMHANDLER FUNCTION
var taskFormHandler = function(event){
  event.preventDefault();

  //the 'name' attribute is referenced from the index.html file (task-name & task-type)
  //.value is added to the end so that the value will be displayed in the list
  var taskNameInput = document.querySelector("input[name='task-name']").value;  
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  if (taskNameInput === "" || taskTypeInput === "") {
    alert("You need to fill out the task form!");
    return false;
  }

  document.querySelector("input [name='task-name']").value = "";
  document.querySelector("select [name='task-type']").selectedIndex = 0;

  var isEdit = formEl.hasAttribute("data-task-id");
  
  //has data attribute, so get task id and call function to complete edit process

if (isEdit){
  var taskId = formEl.getAttribute("data-task-id");
  completeEditTask(taskNameInput, taskTypeInput, taskId);
} else {
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };
  createTaskEl(taskDataObj);
  }
};






//CREATE TASK ELEMENT FUNCTION
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

   var taskActionsEl = createTaskActions(taskIdCounter);

   listItemEl.appendChild(taskActionsEl);
   tasksToDoEl.appendChild(listItemEl);
  
   //increase task counter for next unique id
   taskIdCounter++;

};











//TASK ACTION FUNCTION
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
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  //create change status dropdown
  var statusSelectEl = document.createElement("select");

  statusSelectEl.setAttribute("name", "status-change");

  statusSelectEl.setAttribute("data-task-id", taskId);

  statusSelectEl.className = "select-status";

  actionContainerEl.appendChild(statusSelectEl);


  //create status options
  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++){
    //create option element
    var statusOptionEl = document.createElement("option");

    statusOptionEl.setAttribute ("value", statusChoices[i]);

    statusOptionEl.textContent = statusChoices[i];

    //append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
}








var completeEditTask = function(taskName, taskType, taskId){
  //find the matching task list item
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  //set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  alert("Task Updated!");

  //remove data attribute from form
  formEl.removeAttribute("data-task-id");
  //update formEl button to go back to saying "add task" instead of "edit task"
  formEl.querySelector("#save-task").textContent = "Add Task";
};








var taskButtonHandler = function(event){
  //get target element from event
  var targetEl = event.target;

  //edit button was clicked
  if (targetEl.matches(".edit-btn")){
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } else if (targetEl.matches(".delete-btn")){
    console.log("delete", targetEl);
    var taskId = targetEl.getAttribute("data-task-id");
    delete(taskId);
  }
};







var taskStatusChangeHandler = function(event) {
  console.log(event.target.value);
  //get the task item's id
  var taskId = event.target.getAttribute("data-task-id");
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  //get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();
  //find the parent task item element based on the id
 

  if(statusValue === "to do"){
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress"){
    tasksInProgress.appendChild(taskSelected);
  }
  else if (statusValue === "completed"){
    tasksCompletedEl.appendChild(taskSelected);
  }
};










//ADD EDIT TASK FUNCTION
var editTask = function(taskId){
  console.log(taskId);

  //get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  //get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  console.log(taskName);
  
  var taskType = taskSelected.querySelector("span.task-type").textContent;
  console.log(taskType);
  //write values of taskname and tasktype to form to be edited
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  
  //set data attribute to the form with a value of the task's id so it knows which one is being edited
  formEl.setAttribute("data-task-id", taskId);

  //update the form's button to reflect editing a task rather than creating a new one
  formEl.querySelector("#save-task").textContent = "Save Task";
}















//ADD DELETE TASK FUNCTION
var deleteTask = function(taskId) {
  console.log(taskId);

  var taskSelected = document.querySelector(".task-item[data-task-id = '" + taskId + "']");
  taskSelected.remove();

};






//create a new task event listener
formEl.addEventListener("submit", taskFormHandler);
//for edit and delete buttons event listener
pageContentEl.addEventListener("click", taskButtonHandler);
//for changing the status event listener
pageContentEl.addEventListener("change", taskStatusChangeHandler);

