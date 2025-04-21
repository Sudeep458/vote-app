let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');

function renderTasks(filter = 'all') {
  taskList.innerHTML = '';
  const filtered = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  filtered.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
      <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
      <button onclick="deleteTask(${index})">❌</button>
    `;
    taskList.appendChild(li);
  });
}

function addTask(text) {
  tasks.push({ text, completed: false });
  updateTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTasks();
}

function updateTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text) {
    addTask(text);
    taskInput.value = '';
  }
});

document.getElementById('filterAll').addEventListener('click', () => renderTasks('all'));
document.getElementById('filterActive').addEventListener('click', () => renderTasks('active'));
document.getElementById('filterCompleted').addEventListener('click', () => renderTasks('completed'));

renderTasks();
