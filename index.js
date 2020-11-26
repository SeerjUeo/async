async function getProjects() {
  let projects;

  await fetch("https://app.paymoapp.com/api/projects/", {
      headers: {
        "X-Session": "5059fe5ba060edfd2e29cf241a40d1fd"
      },
    })
    .then(res => res.json())
    .then(data => projects = data)

  return projects;
}

async function getTasklists() {
  let tasklists;

  await fetch("https://app.paymoapp.com/api/tasklists/", {
      headers: {
        "X-Session": "5059fe5ba060edfd2e29cf241a40d1fd"
      },
    })
    .then(res => res.json())
    .then(data => tasklists = data)

  return tasklists;
}

async function getTasks() {
  let tasks;

  await fetch("https://app.paymoapp.com/api/tasks/", {
      headers: {
        "X-Session": "5059fe5ba060edfd2e29cf241a40d1fd"
      },
    })
    .then(res => res.json())
    .then(data => tasks = data)

  return tasks;
}

async function createList() {
  let projects, tasklists, tasks, result = {};

  await getProjects().then((res) => {
    projects = res.projects;
  });

  await getTasklists().then((res) => {
    tasklists = res.tasklists;
  });

  await getTasks().then((res) => {
    tasks = res.tasks;
  });

  projects.forEach(el => {
    el.tasklists = {};
    result[el.id] = {name: el.name, tasklists:{}}
  });

  tasklists.forEach(el => {
    el.task = {};
    result[el.project_id].tasklists[el.id] = {name: el.name, tasks:{}}
  });

  tasks.forEach(el => {
    result[el.project_id].tasklists[el.tasklist_id].tasks[el.id] = el.name;
  });

  console.log(result);
}

createList();