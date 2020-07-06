//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event Listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded',getTasks);

    //Add task event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click',removeTask);
    //Clear taskevent
    clearBtn.addEventListener('click',clearTask);
    //filter tasks event
    filter.addEventListener('keyup',filterTask);
}

//Get Tasks
function getTasks(){
    let tasks;
 if(localStorage.getItem('tasks') === null){
     tasks = [];
 }else {
     tasks = JSON.parse(localStorage.getItem('tasks'));
 }
 
 tasks.forEach(function(task){
     //create li elements
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html 
    link.innerHTML = '<li class="fa fa-remove"></li>';
    //Append the link to li 
    li.appendChild(link);
    
    //Apprnd li to ul 
    taskList.appendChild(li);

 })
}

//Add task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task')
    }
 else{
             //create li elements
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html 
    link.innerHTML = '<li class="fa fa-remove"></li>';
    //Append the link to li 
    li.appendChild(link);
    
    //Apprnd li to ul 
    taskList.appendChild(li);

    //store in ls
    storeTaskInLocalStorage(taskInput.value);

    }


    //clear input
    taskInput.value = '';
    // console.log(li)
    e.preventDefault();
}

//Store task
function storeTaskInLocalStorage(task)
{
 let tasks;
 if(localStorage.getItem('tasks') === null){
     tasks = [];
 }else {
     tasks = JSON.parse(localStorage.getItem('tasks'));
 }

 tasks.push(task);
 localStorage.setItem('tasks',JSON.stringify(tasks));
}


//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
        }

        //Remove from ls
        removeTaskFromLocalStorage(  e.target.parentElement.parentElement);
       
    }
   
}
//Remove from ls
function removeTaskFromLocalStorage(taskItem){
    
    let tasks;
 if(localStorage.getItem('tasks') === null){
     tasks = [];
 }else {
     tasks = JSON.parse(localStorage.getItem('tasks'));
 }
 
  tasks.forEach(function(task,index){
      if(taskItem.textContent === task){
          tasks.splice(index, 1);
      }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTask(){
    // taskList.innerHTML = '';

    //Faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //https://jsperf.com/innerhtml-vs-removechild

    //Clear from localstorage
    clearTaskFromLocalStorage();
}

//Clear Localstorage
function clearTaskFromLocalStorage(){
    localStorage.clear();
}

//Filter Tasks
function filterTask(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            }else{
                task.style.display = 'none';
            }
        }
    );
    console.log(text);

}
