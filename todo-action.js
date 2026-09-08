// Grab Elements
// Make this use objects
const todoEntry = document.querySelector("#todoEntry");
const todoInput = document.querySelector("#todoInput");
const todoButton = document.querySelector("#addButton");
const alertBox = document.querySelector("#alertBox");
const todoList = document.querySelector("#list");
const searchBar = document.querySelector('#search');


// Change title of the page
document.title = "Todo List";


// Add Event Listeners
todoButton.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", enterEvent);
searchBar.addEventListener('keyup', filterTasks);


// Message/Alert texts and color
const successMessage = 'Todo added successfully.';
const successColoration = 'success'
const errorMessage = 'Please enter a todo task.';
const errorColoration = 'error'
const deletionMessage = 'Todo deleted successfully.';
const deletionColoration = 'deletion'


// Create a function to display message
function displayMessage (message, coloration) {
    const alertText = document.createElement("p");
    alertText.textContent = message;
    alertText.classList.add(coloration);
    
    alertBox.appendChild(alertText);

    setTimeout(() => {
        alertText.remove();
    }, 3000);
}


// Create a function to add todo items
function addTodo(e) {
    if (todoInput.value === "") {
        // Display error message
        displayMessage(errorMessage, errorColoration);
    } else {
        // Add todo item to the list
        const todoItem = document.createElement("li");
        todoItem.textContent = todoInput.value.toLowerCase();

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";

        todoItem.appendChild(deleteButton);

        todoList.firstChild ? todoList.insertBefore(todoItem, todoList.firstChild) : todoList.appendChild(todoItem);
        
        todoInput.value = "";

        // Display success message
        displayMessage(successMessage, successColoration);

        // Add event listener to delete button
        deleteButton.addEventListener('click', (e) => {
            if(confirm('Are you sure?')) {
                e.target.parentElement.remove();

                // Display deletion message
                displayMessage(deletionMessage, deletionColoration);
            }
        });
    }

};


// Create a function to call addTodo() if the enter key is down
function enterEvent (e) {
    // console.log(e);
    if(e.key === 'Enter') {
        addTodo();
    }
}


// Create a function to filter/search for todo tasks
function filterTasks (e) {
    // Get the text value of the search in lowercase 
    const text = e.target.value.toLowerCase();

    const todoItems = document.querySelectorAll("#list li");
    
    // Make the todo items an array
  Array.from(todoItems).forEach(item => {
        let itemName = item.firstChild.textContent;

        if (itemName.toLowerCase().indexOf(text) != -1 ) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });

}