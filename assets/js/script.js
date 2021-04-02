

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

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

  //send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
  
};

var createTaskEl = function(taskDataObj){
  var listItemEl = document.createElement("li");

  //create a list item
  listItemEl.className = "task-item";

   //create div to hold task info and add to list item. 
   var taskInfoEl = document.createElement("div");
   //give it a class name
   taskInfoEl.className = "task-info";
   //add HTML content to div
   taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

   listItemEl.appendChild(taskInfoEl);
   tasksToDoEl.appendChild(listItemEl);

}

formEl.addEventListener("submit", taskFormHandler);

