const form = document.getElementById('formTask');
form.addEventListener('submit', saveTask);

function saveTask(event) {
  event.preventDefault();
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  const task = {
    title,
    description,
  };
  if (localStorage.getItem('tasks') === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  form.reset();
  getTask();
}

function getTask() {
  let renderTasks = document.getElementById('tasks');
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  renderTasks.innerHTML = '';
  if (localStorage.getItem('tasks') === null || tasks.length == 0) {
    renderTasks.innerHTML = `
    <div class="alert alert-danger" role="alert">
     no Tasks Created
    </div>`;
  } else {
    for (let i = 0; i < tasks.length; i++) {
      let title = tasks[i].title;
      let description = tasks[i].description;
      renderTasks.innerHTML += `
          <div class="card">
            <div class="card-body">
              <p>${title}</p>
              <p>${description}</p>
              <a class="btn btn-danger" onclick="deleteTask('${title}')">delete</a>
            </div>
          </div>
          `;
    }
  }
}

function deleteTask(title) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].title == title) {
      tasks.splice(i, 1);
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTask();
}

setInterval(() => getTask(), 1000);
