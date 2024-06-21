
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

//Logout functions
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

//Daily functions
async function addDailyTask() {
  const text = document.getElementById('daily-task-input').value;

  if (text) {
    try {
      const response = await fetch('/api/daily', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });

      if (response.ok) {
        const newTask = await response.json();
        console.log('New daily task created:', newTask);

        // Create task item
        const taskItem = document.createElement('li');
        taskItem.id = `daily-task-${newTask._id}`;

        // Checkbox for completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => toggleTaskCompletion(newTask._id, checkbox.checked, taskItem));

        // Label for the task text
        const label = document.createElement('label');
        label.textContent = newTask.text;
        label.style.marginLeft = '10px';

        // Append checkbox and label to task item
        taskItem.appendChild(checkbox);
        taskItem.appendChild(label);

        // Add Edit and Delete buttons
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editDailyTask(newTask._id, taskItem);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteDailyTask(newTask._id, taskItem);

        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        // Append task item to the daily task list
        const dailyTaskList = document.getElementById('daily-task-list');
        dailyTaskList.appendChild(taskItem);

        // Clear the input field
        document.getElementById('daily-task-input').value = '';
      } else {
        const errorText = await response.text();
        console.error('Failed to add daily task:', response.statusText, errorText);
      }
    } catch (error) {
      console.error('Error adding daily task:', error);
    }
  } else {
    alert('Please enter a task.');
  }
}

async function toggleTaskCompletion(id, completed, taskItem) {
  try {
    const response = await fetch(`/api/daily/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed })
    });

    if (response.ok) {
      if (completed) {
        taskItem.style.textDecoration = 'line-through';
      } else {
        taskItem.style.textDecoration = 'none';
      }
    } else {
      console.error('Failed to update task completion:', await response.text());
    }
  } catch (error) {
    console.error('Error updating task completion:', error);
  }
}

async function editDailyTask(id, taskItem) {
  const newText = prompt('Enter new task text:', taskItem.textContent);

  if (newText) {
    try {
      const response = await fetch(`/api/daily/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: newText })
      });

      if (response.ok) {
        const updatedTask = await response.json();
        
        // Clear existing content in the taskItem
        taskItem.innerHTML = '';

        // Checkbox for completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => toggleTaskCompletion(updatedTask._id, checkbox.checked, taskItem));

        // Label for the task text
        const label = document.createElement('label');
        label.textContent = updatedTask.text;
        label.style.marginLeft = '10px';

        // Append checkbox and label to task item
        taskItem.appendChild(checkbox);
        taskItem.appendChild(label);

        // Add Edit and Delete buttons
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editDailyTask(updatedTask._id, taskItem);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteDailyTask(updatedTask._id, taskItem);

        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
      } else {
        console.error('Failed to update daily task:', await response.text());
      }
    } catch (error) {
      console.error('Error updating daily task:', error);
    }
  } else {
    alert('Please enter a new task text.');
  }
}

async function deleteDailyTask(id, taskItem) {
  try {
    const response = await fetch(`/api/daily/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      taskItem.remove();
    } else {
      console.error('Failed to delete daily task:', await response.text());
    }
  } catch (error) {
    console.error('Error deleting daily task:', error);
  }
}

async function loadDailyTasks() {
  try {
    const response = await fetch('/api/daily');
    if (!response.ok) {
      throw new Error('Failed to load daily tasks!');
    }
    const tasks = await response.json();
    tasks.forEach(task => displayDailyTask(task)); // Call function to display each task
  } catch (error) {
    console.error('Error loading daily tasks:', error.message);
  }
}

function displayDailyTask(task) {
  const dailyTaskList = document.getElementById('daily-task-list');
  const taskItem = document.createElement('li');

  // Checkbox for completion
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed; // Set checkbox state based on task.completed
  checkbox.addEventListener('change', () => toggleTaskCompletion(task._id, checkbox.checked, taskItem));

  // Label for the task text
  const label = document.createElement('label');
  label.textContent = task.text;
  label.style.marginLeft = '10px';

  // Append checkbox and label to task item
  taskItem.appendChild(checkbox);
  taskItem.appendChild(label);

  // Add Edit and Delete buttons
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.onclick = () => editDailyTask(task._id, taskItem);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => deleteDailyTask(task._id, taskItem);

  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);

  dailyTaskList.appendChild(taskItem);
}

document.getElementById('add-daily-task-button').addEventListener('click', addDailyTask);

document.addEventListener('DOMContentLoaded', () => {
  loadDailyTasks();
});

//Weekly functions
async function addWeeklyTask() {
  const text = document.getElementById('weekly-task-input').value;

  if (text) {
    try {
      const response = await fetch('/api/weekly', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });

      if (response.ok) {
        const newTask = await response.json();
        console.log('New weekly task created:', newTask);

        // Create task item
        const taskItem = document.createElement('li');
        taskItem.id = `weekly-task-${newTask._id}`;

        // Checkbox for completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => toggleTaskCompletion(newTask._id, checkbox.checked, taskItem));

        // Label for the task text
        const label = document.createElement('label');
        label.textContent = newTask.text;
        label.style.marginLeft = '10px';

        // Append checkbox and label to task item
        taskItem.appendChild(checkbox);
        taskItem.appendChild(label);

        // Add Edit and Delete buttons
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editWeeklyTask(newTask._id, taskItem);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteWeeklyTask(newTask._id, taskItem);

        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        // Append task item to the weekly task list
        const weeklyTaskList = document.getElementById('weekly-task-list');
        weeklyTaskList.appendChild(taskItem);

        // Clear the input field
        document.getElementById('weekly-task-input').value = '';
      } else {
        const errorText = await response.text();
        console.error('Failed to add weekly task:', response.statusText, errorText);
      }
    } catch (error) {
      console.error('Error adding weekly task:', error);
    }
  } else {
    alert('Please enter a task.');
  }
}

async function toggleTaskCompletion(id, completed, taskItem) {
  try {
    const response = await fetch(`/api/weekly/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed })
    });

    if (response.ok) {
      if (completed) {
        taskItem.style.textDecoration = 'line-through';
      } else {
        taskItem.style.textDecoration = 'none';
      }
    } else {
      console.error('Failed to update task completion:', await response.text());
    }
  } catch (error) {
    console.error('Error updating task completion:', error);
  }
}

async function editWeeklyTask(id, taskItem) {
  const newText = prompt('Enter new task text:', taskItem.textContent);

  if (newText) {
    try {
      const response = await fetch(`/api/weekly/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: newText })
      });

      if (response.ok) {
        const updatedTask = await response.json();
        
        // Clear existing content in the taskItem
        taskItem.innerHTML = '';

        // Checkbox for completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => toggleTaskCompletion(updatedTask._id, checkbox.checked, taskItem));

        // Label for the task text
        const label = document.createElement('label');
        label.textContent = updatedTask.text;
        label.style.marginLeft = '10px';

        // Append checkbox and label to task item
        taskItem.appendChild(checkbox);
        taskItem.appendChild(label);

        // Add Edit and Delete buttons
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editWeeklyTask(updatedTask._id, taskItem);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteWeeklyTask(updatedTask._id, taskItem);

        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
      } else {
        console.error('Failed to update weekly task:', await response.text());
      }
    } catch (error) {
      console.error('Error updating weekly task:', error);
    }
  } else {
    alert('Please enter a new task text.');
  }
}

async function deleteWeeklyTask(id, taskItem) {
  try {
    const response = await fetch(`/api/weekly/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      taskItem.remove();
    } else {
      console.error('Failed to delete weekly task:', await response.text());
    }
  } catch (error) {
    console.error('Error deleting weekly task:', error);
  }
}

async function loadWeeklyTasks() {
  try {
    const response = await fetch('/api/weekly');
    if (!response.ok) {
      throw new Error('Failed to load weekly tasks!');
    }
    const tasks = await response.json();
    tasks.forEach(task => displayWeeklyTask(task)); // Call function to display each task
  } catch (error) {
    console.error('Error loading weekly tasks:', error.message);
  }
}

function displayWeeklyTask(task) {
  const weeklyTaskList = document.getElementById('weekly-task-list');
  const taskItem = document.createElement('li');

  // Checkbox for completion
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed; // Set checkbox state based on task.completed
  checkbox.addEventListener('change', () => toggleTaskCompletion(task._id, checkbox.checked, taskItem));

  // Label for the task text
  const label = document.createElement('label');
  label.textContent = task.text;
  label.style.marginLeft = '10px';

  // Append checkbox and label to task item
  taskItem.appendChild(checkbox);
  taskItem.appendChild(label);

  // Add Edit and Delete buttons
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.onclick = () => editWeeklyTask(task._id, taskItem);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => deleteWeeklyTask(task._id, taskItem);

  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);

  weeklyTaskList.appendChild(taskItem);
}

document.getElementById('add-weekly-task-button').addEventListener('click', addWeeklyTask);

document.addEventListener('DOMContentLoaded', () => {
  loadWeeklyTasks();
});

//Monthly functions
async function addMonthlyTask() {
  const text = document.getElementById('monthly-task-input').value;

  if (text) {
    try {
      const response = await fetch('/api/monthly', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });

      if (response.ok) {
        const newTask = await response.json();
        console.log('New monthly task created:', newTask);

        // Create task item
        const taskItem = document.createElement('li');
        taskItem.id = `monthly-task-${newTask._id}`;

        // Checkbox for completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => toggleTaskCompletion(newTask._id, checkbox.checked, taskItem));

        // Label for the task text
        const label = document.createElement('label');
        label.textContent = newTask.text;
        label.style.marginLeft = '10px';

        // Append checkbox and label to task item
        taskItem.appendChild(checkbox);
        taskItem.appendChild(label);

        // Add Edit and Delete buttons
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editMonthlyTask(newTask._id, taskItem);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteMonthlyTask(newTask._id, taskItem);

        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        // Append task item to the monthly task list
        const monthlyTaskList = document.getElementById('monthly-task-list');
        monthlyTaskList.appendChild(taskItem);

        // Clear the input field
        document.getElementById('monthly-task-input').value = '';
      } else {
        const errorText = await response.text();
        console.error('Failed to add monthly task:', response.statusText, errorText);
      }
    } catch (error) {
      console.error('Error adding monthly task:', error);
    }
  } else {
    alert('Please enter a task.');
  }
}

async function toggleTaskCompletion(id, completed, taskItem) {
  try {
    const response = await fetch(`/api/monthly/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed })
    });

    if (response.ok) {
      if (completed) {
        taskItem.style.textDecoration = 'line-through';
      } else {
        taskItem.style.textDecoration = 'none';
      }
    } else {
      console.error('Failed to update task completion:', await response.text());
    }
  } catch (error) {
    console.error('Error updating task completion:', error);
  }
}

async function editMonthlyTask(id, taskItem) {
  const newText = prompt('Enter new task text:', taskItem.textContent);

  if (newText) {
    try {
      const response = await fetch(`/api/monthly/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: newText })
      });

      if (response.ok) {
        const updatedTask = await response.json();
        
        // Clear existing content in the taskItem
        taskItem.innerHTML = '';

        // Checkbox for completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => toggleTaskCompletion(updatedTask._id, checkbox.checked, taskItem));

        // Label for the task text
        const label = document.createElement('label');
        label.textContent = updatedTask.text;
        label.style.marginLeft = '10px';

        // Append checkbox and label to task item
        taskItem.appendChild(checkbox);
        taskItem.appendChild(label);

        // Add Edit and Delete buttons
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editMonthlyTask(updatedTask._id, taskItem);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteMonthlyTask(updatedTask._id, taskItem);

        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
      } else {
        console.error('Failed to update monthly task:', await response.text());
      }
    } catch (error) {
      console.error('Error updating monthly task:', error);
    }
  } else {
    alert('Please enter a new task text.');
  }
}

async function deleteMonthlyTask(id, taskItem) {
  try {
    const response = await fetch(`/api/monthly/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      taskItem.remove();
    } else {
      console.error('Failed to delete monthly task:', await response.text());
    }
  } catch (error) {
    console.error('Error deleting monthly task:', error);
  }
}

async function loadMonthlyTasks() {
  try {
    const response = await fetch('/api/monthly');
    if (!response.ok) {
      throw new Error('Failed to load monthly tasks!');
    }
    const tasks = await response.json();
    displayMonthlyTasks(tasks);
  } catch (error) {
    console.error('Error loading monthly tasks:', error.message);
  }
}

function displayMonthlyTasks(tasks) {
  const monthlyTaskList = document.getElementById('monthly-task-list');
  monthlyTaskList.innerHTML = ''; // Clear existing list

  tasks.forEach(task => {
    const taskItem = document.createElement('li');

    // Checkbox for completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed; // Set checkbox state based on task.completed
    checkbox.addEventListener('change', () => toggleTaskCompletion(task._id, checkbox.checked, taskItem));

    // Label for the task text
    const label = document.createElement('label');
    label.textContent = task.text;
    label.style.marginLeft = '10px';

    // Append checkbox and label to task item
    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);

    // Add Edit and Delete buttons
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editMonthlyTask(task._id, taskItem);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteMonthlyTask(task._id, taskItem);

    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    monthlyTaskList.appendChild(taskItem);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadMonthlyTasks();
});
function displayMonthlyTasks(tasks) {
  const monthlyTaskList = document.getElementById('monthly-task-list');
  monthlyTaskList.innerHTML = ''; // Clear existing list

  tasks.forEach(task => {
    const taskItem = document.createElement('li');

    // Checkbox for completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed; // Set checkbox state based on task.completed
    checkbox.addEventListener('change', () => toggleTaskCompletion(task._id, checkbox.checked, taskItem));

    // Label for the task text
    const label = document.createElement('label');
    label.textContent = task.text;
    label.style.marginLeft = '10px';

    // Append checkbox and label to task item
    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);

    // Add Edit and Delete buttons
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editMonthlyTask(task._id, taskItem);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteMonthlyTask(task._id, taskItem);

    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    monthlyTaskList.appendChild(taskItem);
  });
}

document.getElementById('add-monthly-task-button').addEventListener('click', addMonthlyTask);

document.addEventListener('DOMContentLoaded', () => {
  loadMonthlyTasks();
});

async function addPriorityTask() {
  const text = document.getElementById('priority-task-input').value;
  const level = document.getElementById('priority-level-input').value;

  console.log('Add Priority Task button clicked');

  if (text && level) {
    try {
      const response = await fetch('/api/priority', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, level })
      });

      console.log('Fetch request sent', response);

      if (response.ok) {
        const newTask = await response.json();
        console.log('New priority task created:', newTask);

        // Append the new task to the priority task list
        const priorityTaskList = document.getElementById('priority-task-list');
        const newTaskItem = document.createElement('li');
        newTaskItem.textContent = `${newTask.level.toUpperCase()}: ${newTask.text}`;

        // Add Edit and Delete buttons
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTask(newTask._id, 'priority', newTaskItem);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(newTask._id, 'priority', newTaskItem);

        newTaskItem.appendChild(editButton);
        newTaskItem.appendChild(deleteButton);
        priorityTaskList.appendChild(newTaskItem);

        // Clear the input fields
        document.getElementById('priority-task-input').value = '';
        document.getElementById('priority-level-input').value = '';
      } else {
        const errorText = await response.text();
        console.error('Failed to add priority task:', response.statusText, errorText);
      }
    } catch (error) {
      console.error('Error adding priority task:', error);
    }
  } else {
    alert('Please enter both a task and a priority level.');
  }
}

async function editTask(id, type, taskItem) {
  const newText = prompt('Enter new task text:', taskItem.firstChild.textContent.split(': ')[1]);
  const newLevelOrCategory = prompt(`Enter new ${type === 'priority' ? 'priority level' : 'category'}:`, '');

  if (newText && newLevelOrCategory) {
    const response = await fetch(`/api/${type}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: newText, level: newLevelOrCategory })
    });

    if (response.ok) {
      const updatedTask = await response.json();
      taskItem.firstChild.textContent = `${updatedTask.level.toUpperCase()}: ${updatedTask.text}`;
    } else {
      console.error('Failed to update task:', await response.text());
    }
  } else {
    alert('Please enter both a task and a priority level/category.');
  }
}

async function deleteTask(id, type, taskItem) {
  const response = await fetch(`/api/${type}/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    taskItem.remove();
  } else {
    console.error('Failed to delete task:', await response.text());
  }
}

async function addOrganizedTask() {
  const text = document.getElementById('organized-task-input').value;
  const category = document.getElementById('category-input').value;

  if (text && category) {
    try {
      const response = await fetch('/api/organized', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, category })
      });

      if (response.ok) {
        const newTask = await response.json();
        console.log('New organized task created:', newTask);

        // Append the new task to the organized task list
        const organizedTaskList = document.getElementById('organized-task-list');
        const newTaskItem = document.createElement('li');
        newTaskItem.textContent = `${newTask.category.toUpperCase()}: ${newTask.text}`;

        // Add Edit and Delete buttons
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTask(newTask._id, 'organized', newTaskItem);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(newTask._id, 'organized', newTaskItem);

        newTaskItem.appendChild(editButton);
        newTaskItem.appendChild(deleteButton);
        organizedTaskList.appendChild(newTaskItem);

        // Clear the input fields
        document.getElementById('organized-task-input').value = '';
        document.getElementById('category-input').value = '';
      } else {
        const errorText = await response.text();
        console.error('Failed to add organized task:', response.statusText, errorText);
      }
    } catch (error) {
      console.error('Error adding organized task:', error);
    }
  } else {
    alert('Please enter both a task and a category.');
  }
}

async function editTask(id, type, taskItem) {
  const newText = prompt('Enter new task text:', taskItem.firstChild.textContent.split(': ')[1]);
  const newLevelOrCategory = prompt(`Enter new ${type === 'priority' ? 'priority level' : 'category'}:`, '');

  if (newText && newLevelOrCategory) {
    const response = await fetch(`/api/${type}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: newText, [type === 'priority' ? 'level' : 'category']: newLevelOrCategory })
    });

    if (response.ok) {
      const updatedTask = await response.json();
      taskItem.firstChild.textContent = `${updatedTask[type === 'priority' ? 'level' : 'category'].toUpperCase()}: ${updatedTask.text}`;
    } else {
      console.error('Failed to update task:', await response.text());
    }
  } else {
    alert('Please enter both a task and a priority level/category.');
  }
}

async function deleteTask(id, type, taskItem) {
  const response = await fetch(`/api/${type}/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    taskItem.remove();
  } else {
    console.error('Failed to delete task:', await response.text());
  }
}

// Add event listener for the priority task button
document.getElementById('add-priority-task-button').addEventListener('click', addPriorityTask);

// Add event listener for the organized task button
document.getElementById('add-organized-task-button').addEventListener('click', addOrganizedTask);

// Function to load tasks
async function loadTasks() {
  try {
    const priorityResponse = await fetch('/api/priority');
    const organizedResponse = await fetch('/api/organized');

    if (priorityResponse.ok && organizedResponse.ok) {
      const priorityTasks = await priorityResponse.json();
      const organizedTasks = await organizedResponse.json();

      displayTasks(priorityTasks, 'priority-task-list', 'priority');
      displayTasks(organizedTasks, 'organized-task-list', 'organized');
    } else {
      console.error('Failed to load tasks');
    }
  } catch (error) {
    console.error('Error loading tasks:', error);
  }
}

function displayTasks(tasks, listId, type) {
  const taskList = document.getElementById(listId);
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.textContent = `${task[type === 'priority' ? 'level' : 'category'].toUpperCase()}: ${task.text}`;

    // Add Edit and Delete buttons
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editTask(task._id, type, taskItem);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(task._id, type, taskItem);

    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  });
}

// Load tasks on page load
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});

async function loadReminders(user_id) {
  try {
    const response = await fetch(`/api/reminders/reminders/${user_id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch reminders');
    }

    const reminders = await response.json();
    displayReminders(reminders); // Call function to display reminders in the UI
  } catch (error) {
    console.error('Error loading reminders:', error.message);
    displayErrorMessage('Failed to load reminders. Please try again.');
  }
}

async function addReminder(event) {
  event.preventDefault(); 

  const text = document.getElementById('reminder-text').value;
  const datetime = document.getElementById('reminder-datetime').value;
  const user_id = '6098c5943e39e40015b2a4f7'; 

  try {
    const response = await fetch('/api/reminders/reminder', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text, datetime, user_id })
    });

    if (response.ok) {
      const newReminder = await response.json();
      console.log('New reminder created:', newReminder);
      appendReminderToList(newReminder); // Add new reminder to the list
      clearForm(); // Clear the form fields
    } else {
      const errorText = await response.text();
      console.error('Failed to add reminder:', errorText);
    }
  } catch (error) {
    console.error('Error adding reminder:', error);
    // Handle network or other errors
  }
}

function appendReminderToList(reminder) {
  const reminderList = document.getElementById('reminder-list');
  const reminderElement = createReminderElement(reminder);
  reminderList.appendChild(reminderElement);
}

function createReminderElement(reminder) {
  const li = document.createElement('li');
  li.setAttribute('data-id', reminder._id); // Set data-id for easier identification

  // Display reminder text and datetime
  const reminderText = document.createElement('span');
  reminderText.textContent = `${reminder.text} - ${new Date(reminder.datetime).toLocaleString()}`;

  // Edit button
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.onclick = () => editReminder(reminder._id); // Assuming editReminder function is defined

  // Delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => deleteReminder(reminder._id, li); // Assuming deleteReminder function is defined

  // Append elements to the list item
  li.appendChild(reminderText);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  return li; 
}

function clearForm() {
  document.getElementById('reminder-text').value = '';
  document.getElementById('reminder-datetime').value = '';
}

const addReminderForm = document.getElementById('add-reminder-form');
addReminderForm.addEventListener('submit', addReminder);

async function editReminder(id) {
  const newText = prompt('Enter new reminder text:');

  if (newText) {
    try {
      const response = await fetch(`/api/reminders/reminder/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: newText })
      });

      if (response.ok) {
        const updatedReminder = await response.json();
        // Update the text in the DOM
        const listItem = document.querySelector(`#reminder-list li[data-id="${id}"]`);
        if (listItem) {
          // Update text content
          listItem.querySelector('span').textContent = `${updatedReminder.text} - ${new Date(updatedReminder.datetime).toLocaleString()}`;
        }
      } else {
        console.error('Failed to update reminder:', await response.text());
      }
    } catch (error) {
      console.error('Error updating reminder:', error);
    }
  } else {
    alert('Please enter a new reminder text.');
  }
}

async function deleteReminder(id, listItem) {
  try {
    const response = await fetch(`/api/reminders/reminder/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      listItem.remove(); // Remove the reminder from the DOM
    } else {
      console.error('Failed to delete reminder:', await response.text());
    }
  } catch (error) {
    console.error('Error deleting reminder:', error);
  }
}

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
