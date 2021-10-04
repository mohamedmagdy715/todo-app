// to and from dark mode
var r = document.querySelector(':root');

function toggleMode(current) {
    if(current.src.includes('moon')){
        // convert to dark
        current.src = "./images/icon-sun.svg"
        r.style.setProperty('--background-color', 'hsl(235, 21%, 11%)');
        r.style.setProperty('--background-image-mobile', 'url(./images/bg-mobile-dark.jpg)');
        r.style.setProperty('--background-image-desktop', 'url(./images/bg-desktop-dark.jpg)');
        r.style.setProperty('--elements-background', 'hsl(235, 24%, 19%)');
        r.style.setProperty('--check-border-color', 'hsl(233, 14%, 35%)');
        r.style.setProperty('--todo-font-color', 'hsl(234, 39%, 85%)');
        r.style.setProperty('--lame-color', 'hsl(234, 11%, 52%)');
    }
    else{
        // convert to light
        current.src = "./images/icon-moon.svg";
        r.style.setProperty('--background-color', 'hsl(236, 33%, 92%)');
        r.style.setProperty('--background-image-mobile', 'url(./images/bg-mobile-light.jpg)');
        r.style.setProperty('--background-image-desktop', 'url(./images/bg-desktop-light.jpg)');
        r.style.setProperty('--elements-background', 'hsl(0, 0%, 98%)');
        r.style.setProperty('--check-border-color', 'hsl(233, 11%, 84%)');
        r.style.setProperty('--todo-font-color', 'hsl(235, 19%, 35%)');
        r.style.setProperty('--lame-color', 'hsl(236, 9%, 61%)');
    }
}

let id = 0;
// test
let todos = [
    {
        id : id++,
        todo  : "Finish Todo app task",
        completed : false
    },
    {
        id : id++,
        todo  : "Finish Tip calculator app task",
        completed : true
    },
    {
        id : id++,
        todo  : "lose weight",
        completed : false
    }
];

// html element for user's input todo
let inputTodo = document.getElementById("inputTodo");
// html element for check beside input ((when pressed add Todo))
let inputCheck = document.getElementById("inputCheck");

inputTodo.addEventListener('input',()=>{
    inputCheck.onclick = addTodo;
});
// if user press enter add todo
inputTodo.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addTodo();
    }
});

function addTodo() {
    // check if null input
    if(inputTodo.value == "")
        return;
    let todo = {
        id : id++,
        todo : inputTodo.value,
        completed : false
    }
    todos.push(todo);
    completedTodos = todos.filter((todo) => todo.completed);
    // check if user on active todos and added a todo
    if(selectedArray == activeTodos){
        activeTodos = todos.filter((todo) => !todo.completed);
        selectedArray = activeTodos;
    }else{
        activeTodos = todos.filter((todo) => !todo.completed);
    }
    // clear input
    inputTodo.value = "";
    showTodos();
}

// show how items active html element
let itemsLeft = document.getElementById("itemsLeft");

let activeTodos = todos.filter((todo) => !todo.completed);
let completedTodos = todos.filter((todo) => todo.completed);

// html element for todos
let todosHtml = document.getElementById("todosHtml");
// selected query by the user (all / active / completed)
let selectedArray = todos;
showTodos();
function showTodos() {
    todosHtml.innerHTML = "";
    // items left update
    itemsLeft.innerHTML = `${activeTodos.length} items left`;
    selectedArray.forEach((todo)=>{
        todosHtml.innerHTML += `<a class="list-group-item pt-3 ps-4" aria-current="true" draggable="true"\
         ondragstart="drag(event, ${todo.id})" ondragover="allowDrop(event)" ondrop="drop(event, ${todo.id})">\
        <div class="d-flex w-100" onmouseover="toggleCross(${todo.id})" onmouseout="toggleCross(${todo.id})" >\
          <span class="check me-3 pt-1 clickable ${todo.completed? "completed":""}" onClick="toggleComplete(${todo.id})">\
            <img src="./images/icon-check.svg" alt="check" style="width: 70%;margin:auto">\
          </span>\
          <p class="clickable ms-4 mt-1 ${todo.completed? "todo-completed":""}" onClick="toggleComplete(${todo.id})">\
            ${todo.todo}\
          </p>\
          <span class="clickable ms-auto cross" onClick="clearTodo(${todo.id})" id="${todo.id}">\
            <img src="./images/icon-cross.svg" alt="cross">\
          </span>\
        </div>\
      </a>`
    });
}

// html elements for selectors
let selectors = document.getElementsByClassName("selectors");

for (let selector of selectors) {
    selector.addEventListener("click",()=>{
        // console.log(selector.innerHTML.trim() == 'Active')
        switch (selector.innerHTML.trim()){
            case 'All':
                selectedArray = todos;
                unSelector();
                selector.classList.add("active-query");
                break;
            case 'Active':
                selectedArray = activeTodos;
                unSelector();
                selector.classList.add("active-query");
                break;
            case 'Completed' :
                selectedArray = completedTodos;
                unSelector();
                selector.classList.add("active-query");
                break;
            default:
                break;
        }
        showTodos();
    })
}
// function to remove selected class from selectors
function unSelector(){
    for (let selector of selectors) {
        selector.classList.remove("active-query")
    }
}

// function to mark todo as complete or vice versa
function toggleComplete(id) {
    todos[todos.findIndex((todo) => todo.id == id)].completed = !todos[todos.findIndex((todo) => todo.id == id)].completed;
    
    // check if user on active todos
    if(selectedArray == activeTodos){
        activeTodos = todos.filter((todo) => !todo.completed);
        selectedArray = activeTodos;
        completedTodos = todos.filter((todo) => todo.completed);
    }else if(selectedArray == completedTodos){
        completedTodos = todos.filter((todo) => todo.completed);
        selectedArray = completedTodos;
        activeTodos = todos.filter((todo) => !todo.completed);
    }else{
        activeTodos = todos.filter((todo) => !todo.completed);
        completedTodos = todos.filter((todo) => todo.completed);
    }
    showTodos();
}

// function to clear todo
function clearTodo(id) {
    todos.splice(todos.findIndex((todo) => todo.id == id), 1);
    // check if user on active todos
    if(selectedArray == activeTodos){
        activeTodos = todos.filter((todo) => !todo.completed);
        selectedArray = activeTodos;
        completedTodos = todos.filter((todo) => todo.completed);
    }else if(selectedArray == completedTodos){
        completedTodos = todos.filter((todo) => todo.completed);
        selectedArray = completedTodos;
        activeTodos = todos.filter((todo) => !todo.completed);
    }else{
        activeTodos = todos.filter((todo) => !todo.completed);
        completedTodos = todos.filter((todo) => todo.completed);
    }
    showTodos();
}


// cross elements html
let crosses = document.getElementsByClassName("cross");

// listen to changes in media screen to toggle cross icon state
function myFunction(x) {
    if (x.matches) { // If media query matches
      // console.log("mobile")
      for (let cross of crosses) {
            cross.style.display = "block"
        }
    } else {
      // console.log("desktop")
      for (let cross of crosses) {
        cross.style.display = "none"
    }
    }
  }
  
  let x = window.matchMedia("(max-width: 700px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes
  // deprecated to be changed later
  
  
// function to show cross icon in the todo element
function toggleCross(id) {
    // id of each cross is like id of each todo
    // if on mobile do nothing as cross is already shown
    if(window.matchMedia("(min-width: 676px)").matches){
        document.getElementById(id).style.display == "block" ? 
            document.getElementById(id).style.display = "none" :
                document.getElementById(id).style.display = "block"
    }
}

// clear all completed todos
function clearCompleted() {
    for (let i = 0; i < todos.length; i++){
        if(todos[i].completed){
            clearTodo(todos[i--].id); // decrement i because we removed a todo
        }
    }
}

// drag and drop
function drag(ev, id) {
    ev.dataTransfer.setData("dragged", id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev, id) {
    ev.preventDefault();
    let dragged = ev.dataTransfer.getData("dragged");
    let oldIndex = todos.findIndex((todo) => todo.id == dragged);
    let newIndex = todos.findIndex((todo) => todo.id == id);
    arrayMove(todos, oldIndex, newIndex);
    // check if user on active todos
    if(selectedArray == activeTodos){
        activeTodos = todos.filter((todo) => !todo.completed);
        selectedArray = activeTodos;
        completedTodos = todos.filter((todo) => todo.completed);
    }else if(selectedArray == completedTodos){
        completedTodos = todos.filter((todo) => todo.completed);
        selectedArray = completedTodos;
        activeTodos = todos.filter((todo) => !todo.completed);
    }else{
        activeTodos = todos.filter((todo) => !todo.completed);
        completedTodos = todos.filter((todo) => todo.completed);
    }
    showTodos();
}

// function to move array element from index to another
function arrayMove(arr, oldIndex, newIndex) {
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
};
