const USER_API_BASE_URL = 'https://jsonplaceholder.typicode.com/users';
const TODO_API_BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

let username = '';

function handleInputChange() {
  const { value } = event.target;
  username = value;
}

async function fetchUserFromApi() {
  const response = await fetch(`${USER_API_BASE_URL}?username=${username}`);
  const [ user ] = await response.json();
  return user;
}

async function fetchTodosFromApi() {
  const { id } = await fetchUserFromApi();
  const response = await fetch(`${TODO_API_BASE_URL}?userId=${id}`);
  const todos = await response.json(); 
  return todos;
}

function getTodoByStatus(todos) {
  const todoByStatus = {};
  todos.forEach(todo => {
    if(todoByStatus.hasOwnProperty(todo.completed)) {
      todoByStatus[todo.completed].push(todo);
    } else {
      todoByStatus[todo.completed] = [todo];
    }
  })
}

