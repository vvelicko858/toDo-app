export interface Task {
  id: number;
  taskName: string;
  taskDescr: string;
  taskDate: string;
  done: boolean;
}

export const saveUsersToLocalStorage = (users: any[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const loadUsersFromLocalStorage = (): any[] => {
  const savedUsers = localStorage.getItem('users');
  return savedUsers ? JSON.parse(savedUsers) : [];
};

export const addUserToLocalStorage = (user: any) => {
  let users = loadUsersFromLocalStorage();
  users.push(user);
  saveUsersToLocalStorage(users);
};

const getUsers = () => {
  const usersJson = localStorage.getItem('users');
  if (!usersJson) return null;
  return JSON.parse(usersJson);
};

export const getUser=(): any => {
  const userName = sessionStorage.getItem('userName');
  const users = getUsers()
  const currentUser = users.find((user: any) => user.name === userName);
  return currentUser || null ;
}
export const getSortedUser = () => {
  const user = getUser();
  if (!user || !user.tasks) return user;

  return {
    ...user,
    tasks: user.tasks.slice().sort((a: Task, b: Task) => Number(a.done) - Number(b.done)),
  };
};

export const getTasks = (id:number) => {
  const users = getUsers();
  const userName = sessionStorage.getItem('userName');
  const currentUser = users.find((user: any) => user.name === userName);
  const task = currentUser.tasks.find((task: any) => task.id === id);
  return task ? task : null;
}


export const getMaxId = (): number => {
  const user = getUser();

  if (user.tasks && user.tasks.length > 0) {
    const ids = user.tasks.map((task: Task) => task.id);
    const maxId = Math.max(...ids);
    return maxId;
  }
  return 0;
};

export const addTaskToLocalStorage = (task: any) => {
  const users = getUsers();
  const userName = sessionStorage.getItem('userName');

  const currentUser = users.find((user: any) => user.name === userName);
  if (!currentUser.tasks) {
    currentUser.tasks = [];
  }
  currentUser.tasks.push(task);
  localStorage.setItem('users', JSON.stringify(users));
  return currentUser;
};

export const deleteTaskFromLocalStorage = (taskId: any) => {
  const users = getUsers();
  const userName = sessionStorage.getItem('userName');
  const currentUser = users.find((user: any) => user.name === userName);
  const taskIndex = currentUser.tasks.findIndex((task: any) => task.id === taskId);
  currentUser.tasks.splice(taskIndex, 1);

  localStorage.setItem('users', JSON.stringify(users));

}

export const changeTask = (taskId: number, task: any): boolean => {
  const users = getUsers(); // получаем список всех пользователей
  const userName = sessionStorage.getItem('userName');
  const currentUser = users.find((user: any) => user.name === userName);



  const taskIndex = currentUser.tasks.findIndex((task: any) => task.id === taskId);


  currentUser.tasks[taskIndex] = task;

  localStorage.setItem('users', JSON.stringify(users));
  return true;
};


export const markAsDone = (idTask:number) => {
  const users = getUsers();
  const userName = sessionStorage.getItem('userName');
  const id =idTask-1;
  const currentUser = users.find((user: any) => user.name === userName);
  const taskIndex = currentUser.tasks.findIndex((task: any) => task.id === idTask);
  if(currentUser.tasks[taskIndex].done){
    currentUser.tasks[taskIndex].done = false;
  } else  {
    currentUser.tasks[taskIndex].done = true;
  }
  localStorage.setItem('users', JSON.stringify(users));
}



export const findUserInLocalStorage = (username: string, password: string): { found: boolean; user?: any } => {
  const users = loadUsersFromLocalStorage();
  const user = users.find((u: any) => u.username === username && u.password === password);
  if (user) {
    return { found: true, user };
  }
  return { found: false };
};
