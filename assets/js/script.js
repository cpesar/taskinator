

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event){
  event.preventDefault();

  //the 'name' attribute is referenced from the index.html file (task-name & task-type)
  var taskNameInput = document.querySelector("input[name='task-name']");  
  var taskTypeInput = document.querySelector("select[name='task-type']");
  
  //create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  //create div to hold task info and add to list item. 
  var taskInfoEl = document.createElement("div");
  //give it a class name
  taskInfoEl.className = "task-info";
  //add HTML content to div
  taskInfoEl.innerHTML = taskNameInput.value + taskTypeInput.value;
  console.log(taskTypeInput);

  listItemEl.appendChild(taskInfoEl);
  //.value is added so that the task that is inputed is logged in the form
 
  tasksToDoEl.appendChild(listItemEl);

};

formEl.addEventListener("submit", createTaskHandler);

