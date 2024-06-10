
function showSignupForm() {
  document.getElementById('signup-form').style.display = 'block';
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('forgot-password-form').style.display = 'none';
  document.getElementById('home').style.display = 'none';
}

function showLoginForm() {
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('forgot-password-form').style.display = 'none';
  document.getElementById('home').style.display = 'none';
}

function showforgotPasswordForm() {
  document.getElementById('forgot-password-form').style.display = 'block';
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('home').style.display = 'none';
}

function showSection(sectionId) {
  document.getElementById('home').style.display = 'none';
  document.getElementById('about-page').style.display = 'none';
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById(sectionId).style.display = 'block';
}

  document.addEventListener('DOMContentLoaded', function() {
    // Get reference to the get started link
    const getStartedLink = document.getElementById('get-started-link');

    // Add event listener to the get started link
    getStartedLink.addEventListener('click', showSignupForm);

    // Other JavaScript code here...
  });

// Get references to the navigation buttons
const homeButton = document.getElementById('home-button');
const aboutButton = document.getElementById('about-button');
const dashboardButton = document.getElementById('dashboard-button');
const logoutButton = document.getElementById('logout-button');

// Attach event listeners
homeButton.addEventListener('click', () => showSection('home'));
aboutButton.addEventListener('click', () => showSection('about-page'));
dashboardButton.addEventListener('click', () => showSection('dashboard'));
logoutButton.addEventListener('click', logout);


function showNotification(message) {
  var notificationBar = document.getElementById('notification-bar');
  var notificationMessage = document.getElementById('notification-message');
  
  notificationMessage.innerText = message;
  notificationBar.style.display = 'block';

  // Hide the notification after a certain duration (e.g., 5 seconds)
  setTimeout(function() {
    notificationBar.style.display = 'none';
  }, 5000); // 5000 milliseconds = 5 seconds
}

// Function to handle signup form submission
async function signup() {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  if (!email || !password) {
    document.getElementById('signup-error').innerText = 'Please enter both email and password';
    document.getElementById('signup-error').style.display = 'block';
    return; // Exit function early if fields are empty
  }

  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
      showNotification('Sign up successful!');
      document.getElementById('signup-form').style.display = 'none';
      document.getElementById('navigation-buttons').style.display = 'block';
      showSection('dashboard');
    } else {
      if (response.status === 400) {
        document.getElementById('signup-error').innerText = 'User already exists. Please login instead';
      } else {
        document.getElementById('signup-error').innerText = data.message || 'Server error';
      }
      document.getElementById('signup-error').style.display = 'block';
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('signup-error').innerText = 'Server error';
    document.getElementById('signup-error').style.display = 'block';
  }
}

// Get reference to the buttons
const signupButton = document.getElementById('signup-button');
const loginLink = document.getElementById('login-link');

// Attach event listeners
signupButton.addEventListener('click', signup);
loginLink.addEventListener('click', showLoginForm);

// Function to display password requirements
function displayPasswordRequirements() {
  const passwordRequirements = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one of the following special characters: @$!%*?&";
  document.getElementById('password-requirements').textContent = passwordRequirements;
}

// Function to validate password
function validatePassword() {
  const password = document.getElementById('signup-password').value;
  const passwordRequirementsRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const requirementsElement = document.getElementById('password-requirements');
  
  if (passwordRequirementsRegex.test(password)) {
    requirementsElement.textContent = "✓ Password meets requirements.";
    requirementsElement.classList.remove('invalid');
    requirementsElement.classList.add('valid');
  } else {
    requirementsElement.textContent = "✗ Password does not meet requirements.";
    requirementsElement.classList.remove('valid');
    requirementsElement.classList.add('invalid');
  }
}

// Add event listener to the password input field to display password requirements when focused
document.getElementById('signup-password').addEventListener('focus', displayPasswordRequirements);

// Add event listener to the password input field to validate password
document.getElementById('signup-password').addEventListener('input', validatePassword);

// Function to toggle password visibility for signup form
function togglePasswordVisibilitySignup() {
  const passwordInput = document.getElementById('signup-password');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}

// Add event listener to the show password checkbox in signup form
document.getElementById('show-password-checkbox-signup').addEventListener('change', togglePasswordVisibilitySignup);

  // Function to handle login form submission
async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    document.getElementById('login-error').innerText = 'Please enter both email and password';
    document.getElementById('login-error').style.display = 'block';
    return; // Exit function early if fields are empty
  }

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
      showNotification('Login successful!');
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('navigation-buttons').style.display = 'block';
      showSection('dashboard');
    } else {
      if (response.status === 401) {
        document.getElementById('login-error').innerText = 'Incorrect email or password';
      } else {
        document.getElementById('login-error').innerText = data.msg || 'Incorrect password';
      }
      document.getElementById('login-error').style.display = 'block';
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('login-error').innerText = 'Incorrect password';
    document.getElementById('login-error').style.display = 'block';
  }
}

// Get reference to the login button, sign up link, and forgot password link
const loginButton = document.getElementById('login-button');
const signUpLink = document.getElementById('signup-link');
const forgotPasswordLink = document.getElementById('forgot-password-link');

// Attach event listeners
loginButton.addEventListener('click', login);
signUpLink.addEventListener('click', showSignupForm);
forgotPasswordLink.addEventListener('click', showforgotPasswordForm); // Use forgotPasswordLink here

// Function to toggle password visibility for login form
function togglePasswordVisibilityLogin() {
  const passwordInput = document.getElementById('password');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}

// Add event listener to the show password checkbox in login form
document.getElementById('show-password-checkbox-login').addEventListener('change', togglePasswordVisibilityLogin);

document.addEventListener('DOMContentLoaded', function() {
  // Define forgotPasswordForm in a broader scope
  const forgotPasswordForm = document.getElementById('forgot-password-form');

  // Function to switch to the login form
  function goToLogin() {
      if (forgotPasswordForm) {
          forgotPasswordForm.style.display = 'none';
      }
      document.getElementById('login-form').style.display = 'block'; // Show the login form
  }

  // Get reference to the remember password link
  const rememberPasswordLink = document.getElementById('remember-password-link');

  // Attach event listener for remember password link click
  rememberPasswordLink.addEventListener('click', goToLogin);

  // Define the resetPassword function
  async function resetPassword() {
      const email = document.getElementById('reset-email').value;
      
      try {
          const response = await fetch('/api/auth/reset-password', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email })
          });

          const data = await response.json();
          if (response.ok) {
              showNotification('Password reset instructions sent to your email!', 'success');
              document.getElementById('forgot-password-form').style.display = 'none';
              document.getElementById('reset-password-form').style.display = 'block'; // Show the reset password form
              document.getElementById('reset-error').style.display = 'none'; // Hide error message
          } else {
              if (response.status === 404) {
                  document.getElementById('reset-error').innerText = 'Email not found';
              } else {
                  document.getElementById('reset-error').innerText = data.message || 'Failed to reset password';
              }
              document.getElementById('reset-error').style.display = 'block';
          }
      } catch (error) {
          console.error('Error:', error);
          document.getElementById('reset-error').innerText = 'Failed to reset password';
          document.getElementById('reset-error').style.display = 'block';
      }
  }

  // Get reference to the reset password button
  const resetPasswordButton = document.getElementById('reset-password-button');

  // Attach event listener for reset password button click
  resetPasswordButton.addEventListener('click', resetPassword);
});


async function logout() {
  localStorage.removeItem('token');
  document.getElementById('navigation-buttons').style.display = 'none';
  // Hide all forms
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('forgot-password-form').style.display = 'none';
  // Show the home section
  showSection('home'); // Pass the ID of the home section as a string
}

document.addEventListener('DOMContentLoaded', (event) => {
  loadTasks();
});

function saveTasks(taskListId, storageKey) {
  const taskList = document.getElementById(taskListId);
  if (!taskList) { // Null check added here
    console.error(`Element with ID ${taskListId} not found.`);
    return;
  }
  const tasks = [];
  taskList.querySelectorAll('li').forEach(taskItem => {
    const taskText = taskItem.querySelector('.task-text').textContent;
    const isCompleted = taskItem.querySelector('input[type="checkbox"]').checked;
    tasks.push({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function loadTasks() {
  loadTaskList('daily-task-list', 'daily-tasks');
  loadTaskList('weekly-task-list', 'weekly-tasks');
  loadTaskList('monthly-task-list', 'monthly-tasks');
}

function loadTaskList(taskListId, storageKey) {
  const taskList = document.getElementById(taskListId);
  const tasks = JSON.parse(localStorage.getItem(storageKey)) || [];
  tasks.forEach(task => {
    addTaskToList(taskList, task.text, task.completed);
  });
}

function addTask(taskInputId, taskListId, storageKey) {
  const taskInput = document.getElementById(taskInputId);
  const taskList = document.getElementById(taskListId);
  addTaskToList(taskList, taskInput.value, false);
  taskInput.value = '';
  saveTasks(taskListId, storageKey);
}

function addTaskToList(taskList, taskText, isCompleted) {
  const taskItem = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = isCompleted;
  checkbox.addEventListener('change', () => {
    taskTextElement.classList.toggle('completed', checkbox.checked);
    saveAllTasks();
  });

  const taskTextElement = document.createElement('span');
  taskTextElement.textContent = taskText;
  taskTextElement.className = 'task-text';
  if (isCompleted) {
    taskTextElement.classList.add('completed');
  }

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'edit-task-input';
  editInput.value = taskText;

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.className = 'edit-task-button';
  editButton.addEventListener('click', () => {
    if (editInput.style.display === 'none') {
      editInput.style.display = 'inline';
      taskTextElement.style.display = 'none';
      editButton.textContent = 'Save';
    } else {
      taskTextElement.textContent = editInput.value;
      editInput.style.display = 'none';
      taskTextElement.style.display = 'inline';
      editButton.textContent = 'Edit';
      saveAllTasks();
    }
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete-task-button';
  deleteButton.addEventListener('click', () => {
  deleteTask(taskItem, 'daily-task-list', 'daily');
  deleteTask(taskItem, 'weekly-task-list', 'weekly');
  deleteTask(taskItem, 'monthly-task-list', 'monthly');
  
  });

  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskTextElement);
  taskItem.appendChild(editInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);

  taskList.appendChild(taskItem);
}

function deleteTask(taskItem, taskListId, storageKey) {
  taskItem.remove();
  saveTasks(taskListId, storageKey);
}

function saveAllTasks() {
  saveTasks('daily-task-list', 'daily-tasks');
  saveTasks('weekly-task-list', 'weekly-tasks');
  saveTasks('monthly-task-list', 'monthly-tasks');
}

// Attach event listeners to the add task buttons
document.getElementById('add-daily-task-button').addEventListener('click', () => {
  addTask('daily-task-input', 'daily-task-list', 'daily-tasks');
});

document.getElementById('add-weekly-task-button').addEventListener('click', () => {
  addTask('weekly-task-input', 'weekly-task-list', 'weekly-tasks');
});

document.getElementById('add-monthly-task-button').addEventListener('click', () => {
  addTask('monthly-task-input', 'monthly-task-list', 'monthly-tasks');
});


function setReminder() {
  const reminderInput = document.getElementById('reminder-input').value;
  if (reminderInput) {
    const notifications = document.getElementById('notifications');
    const reminderItem = document.createElement('p');
    reminderItem.textContent = `Reminder set for: ${new Date(reminderInput).toLocaleString()}`;
    notifications.appendChild(reminderItem);
    document.getElementById('reminder-input').value = '';
  } else {
    alert('Please enter a valid reminder date and time.');
  }
}

// Add event listener to the set reminder button
document.getElementById('set-reminder-button').addEventListener('click', setReminder);

//pomodoro function
let pomodoroInterval;
let isPomodoroRunning = false;
let pomodoroSeconds = 1500; // 25 minutes

function startPomodoro() {
    if (!isPomodoroRunning) {
        isPomodoroRunning = true;
        document.getElementById('pomodoro-status').textContent = "Pomodoro Running";
        document.getElementById('pomodoro-status').classList.remove('stopped');
        document.getElementById('pomodoro-status').classList.add('running');
        document.getElementById('start-pomodoro').style.display = 'none';
        document.getElementById('stop-pomodoro').style.display = 'block';
        pomodoroInterval = setInterval(updatePomodoro, 1000);
    }
}

function stopPomodoro() {
    if (isPomodoroRunning) {
        clearInterval(pomodoroInterval);
        isPomodoroRunning = false;
        document.getElementById('pomodoro-status').textContent = "Pomodoro Stopped";
        document.getElementById('pomodoro-status').classList.remove('running');
        document.getElementById('pomodoro-status').classList.add('stopped');
        document.getElementById('start-pomodoro').style.display = 'block';
        document.getElementById('stop-pomodoro').style.display = 'none';
    }
}

function updatePomodoro() {
    if (pomodoroSeconds > 0) {
        pomodoroSeconds--;
        let minutes = Math.floor(pomodoroSeconds / 60);
        let seconds = pomodoroSeconds % 60;
        document.getElementById('timer-display').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
        stopPomodoro();
        alert('Pomodoro complete!');
    }
}

// Add event listeners for start and stop buttons
document.getElementById('start-pomodoro').addEventListener('click', startPomodoro);
document.getElementById('stop-pomodoro').addEventListener('click', stopPomodoro);


let timeTrackingInterval;
let isTimeTrackingRunning = false;
let timeTrackingSeconds = 0;

function startTimeTracking() {
    if (!isTimeTrackingRunning) {
        isTimeTrackingRunning = true;
        document.getElementById('time-tracking-status').textContent = "Time Tracking Running";
        document.getElementById('time-tracking-status').classList.remove('stopped');
        document.getElementById('time-tracking-status').classList.add('running');
        document.getElementById('start-time-tracking').style.display = 'none';
        document.getElementById('stop-time-tracking').style.display = 'block';
        timeTrackingInterval = setInterval(updateTimeTracking, 1000);
    }
}

function stopTimeTracking() {
    if (isTimeTrackingRunning) {
        clearInterval(timeTrackingInterval);
        isTimeTrackingRunning = false;
        document.getElementById('time-tracking-status').textContent = "Time Tracking Stopped";
        document.getElementById('time-tracking-status').classList.remove('running');
        document.getElementById('time-tracking-status').classList.add('stopped');
        document.getElementById('start-time-tracking').style.display = 'block';
        document.getElementById('stop-time-tracking').style.display = 'none';
    }
}

function updateTimeTracking() {
    timeTrackingSeconds++;
    let hours = Math.floor(timeTrackingSeconds / 3600);
    let minutes = Math.floor((timeTrackingSeconds % 3600) / 60);
    let seconds = timeTrackingSeconds % 60;
    document.getElementById('time-tracking-display').textContent = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Add event listeners for start and stop buttons
document.getElementById('start-time-tracking').addEventListener('click', startTimeTracking);
document.getElementById('stop-time-tracking').addEventListener('click', stopTimeTracking);

function addPriorityTask() {
  const priorityTaskList = document.getElementById('priority-task-list');
  const prioritizationInput = document.getElementById('prioritization-input').value;
  const priorityLevel = document.getElementById('priority-level').value;
  if (prioritizationInput && priorityLevel) {
    const priorityTaskItem = document.createElement('li');
    priorityTaskItem.textContent = `${priorityLevel.toUpperCase()}: ${prioritizationInput}`;
    priorityTaskList.appendChild(priorityTaskItem);
    document.getElementById('prioritization-input').value = '';

    // Save the task to localStorage
    saveTaskToStorage('priorityTasks', { text: prioritizationInput, category: priorityLevel });
  } else {
    alert('Please enter both a task and a priority level.');
  }
}

function addOrganizedTask() {
  const organizationTaskList = document.getElementById('organization-task-list');
  const organizationInput = document.getElementById('organization-input').value;
  const category = document.getElementById('category').value;
  if (organizationInput && category) {
    const organizationTaskItem = document.createElement('li');
    organizationTaskItem.textContent = `${category.toUpperCase()}: ${organizationInput}`;
    organizationTaskList.appendChild(organizationTaskItem);
    document.getElementById('organization-input').value = '';

    // Save the task to localStorage
    saveTaskToStorage('organizedTasks', { text: organizationInput, category: category });
  } else {
    alert('Please enter both a task and a category.');
  }
}

// Function to save task to localStorage
function saveTaskToStorage(key, task) {
  const tasks = JSON.parse(localStorage.getItem(key)) || [];
  tasks.push(task);
  localStorage.setItem(key, JSON.stringify(tasks));
}

// Add event listener for the priority task button
document.getElementById('add-priority-task-button').addEventListener('click', addPriorityTask);

// Add event listener for the organized task button
document.getElementById('add-organized-task-button').addEventListener('click', addOrganizedTask);

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromStorage('priorityTasks', 'priority-task-list');
  loadTasksFromStorage('organizedTasks', 'organization-task-list');
});

// Function to load tasks from localStorage
function loadTasksFromStorage(key, listId) {
  const tasks = JSON.parse(localStorage.getItem(key)) || [];
  const taskList = document.getElementById(listId);
  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.textContent = `${task.category.toUpperCase()}: ${task.text}`;
    taskList.appendChild(taskItem);
  });
}
