// Grab Elements into an object
const Elements = {
    todoEntry : document.querySelector("#todoEntry"),
    todoInput : document.querySelector('#todoInput'),
    todoButton : document.querySelector("#addButton"),
    todoList : document.querySelector("#list"),
    todoListContainer : document.querySelector('.todo-list'),
    todoForm : document.querySelector('#todoEntry'),
    alertBox : document.querySelector("#alertBox"),
    searchBar : document.querySelector('#search')
}

// Change title of the page
document.title = "MyTodoListApp";


// Message/Alert texts and color
const successMessage = 'Todo added successfully.';
const successColoration = 'success';
const errorMessage = 'Please enter a todo task.';
const errorColoration = 'error';
const deletionMessage = 'Todo deleted successfully.';
const deletionColoration = 'deletion';
const clearMessage = 'Todo list cleared successfully.';


// UI Class
class UI {
    static displayTodos() {
        const todos = Storage.getTodos();

        for(const todo of todos) {
            const todoItem = document.createElement('li');
            const deletionButton = document.createElement('button');
            todoItem.textContent = todo;
            deletionButton.textContent = 'X';
            deletionButton.addEventListener('click', UI.removeTodo)
            
            todoItem.appendChild(deletionButton);
            
            Elements.todoList.firstChild ? Elements.todoList.insertBefore(todoItem, Elements.todoList.firstChild) : Elements.todoList.appendChild;
        }
    }

    static displayAlert(message, color) {
        Elements.alertBox.innerHTML = '';
        
        const alert = document.createElement('p');
        alert.textContent = message;
        alert.className = color;

        Elements.alertBox.appendChild(alert);

        setTimeout(() => {alert.remove()}, 3000)
    }

    static addTodo(e) {
        e.preventDefault();

        if (Elements.todoInput.value === "") {
            UI.displayAlert(errorMessage, errorColoration);
        } else {
            // Add todo item to the list
            const todoItem = document.createElement("li");
            todoItem.textContent = Elements.todoInput.value.toLowerCase();

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "X";
            deleteButton.addEventListener('click', UI.removeTodo)

            todoItem.appendChild(deleteButton);

            Elements.todoList.firstChild ? Elements.todoList.insertBefore(todoItem, Elements.todoList.firstChild) : Elements.todoList.appendChild(todoItem);
            
            //Add to localStorage
            Storage.addTodo(Elements.todoInput.value.toLowerCase());

            Elements.todoInput.value = "";

            UI.displayAlert(successMessage, successColoration);
        }
    }

    static removeTodo(e) {
        e.target.parentElement.remove();

        // Remove from local storage
        Storage.removeTodo(e.target.textContent);

        // Display alertMessage
        UI.displayAlert(deletionMessage, deletionColoration);
    }

    static clearTodoList() {
        // Clear List
        const todoItems = Array.from(Elements.todoList.children);
        todoItems.forEach((item) => item.remove());

        // Clear from local storage
        Storage.clearAllTodos();

        // Display alertMessage
        UI.displayAlert(clearMessage, deletionColoration)
    }

    static searchTodoList(e) {
            const text = e.target.value.toLowerCase().trim();
            const todoItems = Array.from(Elements.todoList.children);
        
            todoItems.forEach((item) => {
                const itemText = item.textContent.replace("X", "").toLowerCase().trim();
                item.style.display = itemText.includes(text) ? "" : "none";
            });
        }
    }


// Storage Class
class Storage {
    static getTodos() {
        let todos;
        
        localStorage.getItem('todos') ? todos = JSON.parse(localStorage.getItem('todos')) : todos = [];

        return todos;
    }

    static addTodo(todo) {
        const todos = Storage.getTodos();
        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));
    }

    static removeTodo(todo) {
        const todos = Storage.getTodos();
        
        todos.forEach((todoItem, index) => {
            if(todo) { todos.splice(index, 1) };
        })

        localStorage.setItem('todos', JSON.stringify(todos));
    }

    static clearAllTodos() {
        localStorage.removeItem('todos');
    }
}

// Add in a clear all task button
const clearAllButton = document.createElement('button');
clearAllButton.textContent = "Clear All Tasks";
clearAllButton.className = 'clearBtn';
clearAllButton.addEventListener('click', UI.clearTodoList);
Elements.todoListContainer.insertBefore(clearAllButton, Elements.todoList);

// Add Event Listeners
document.addEventListener('DOMContentLoaded', UI.displayTodos)
Elements.todoForm.addEventListener("submit", UI.addTodo);
Elements.searchBar.addEventListener('keyup', UI.searchTodoList);