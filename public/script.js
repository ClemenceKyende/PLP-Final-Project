document.addEventListener('DOMContentLoaded', () => {
  // Handle navigation button clicks
  const homeButton = document.getElementById('home-button');
  const aboutButton = document.getElementById('about-button');
  const dashboardButton = document.getElementById('dashboard-button');
  const logoutButton = document.getElementById('logout-button');
  const getStartedLink = document.getElementById('get-started-link');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const resetPasswordForm = document.getElementById('resetpassword-form');
  const editProfileButton = document.getElementById('edit-profile-button');
  const changePicButton = document.getElementById('change-picture-button');
  const editProfileForm = document.getElementById('edit-profile-form');
  const changePicForm = document.getElementById('change-pic-form');

  // Navigation buttons
  if (homeButton) {
    homeButton.addEventListener('click', () => {
      window.location.href = '/index.html';
    });
  }

  if (aboutButton) {
    aboutButton.addEventListener('click', () => {
      window.location.href = '/about.html';
    });
  }

  if (dashboardButton) {
    dashboardButton.addEventListener('click', () => {
      window.location.href = '/dashboard.html';
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      console.log('User logged out');
      localStorage.removeItem('token'); // Clear token
      window.location.href = '/login.html'; // Redirect to login
    });
  }

  // Get Started link
  if (getStartedLink) {
    getStartedLink.addEventListener('click', async (event) => {
      event.preventDefault();

      try {
        const isLoggedIn = await checkAuthStatus();
        if (isLoggedIn) {
          window.location.href = '/profile.html'; // Redirect to the dashboard or appropriate page
        } else {
          window.location.href = '/signup.html'; // Redirect to sign-up page
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
        showError('Error checking authentication status.');
      }
    });
  }


// Function to check if the user is authenticated
const checkAuthStatus = async () => {
  try {
    const response = await fetch('/api/users/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.status === 401) {
      return false; // Unauthorized
    }

    return response.ok; // Return true if response is OK
  } catch (error) {
    console.error('Error fetching authentication status:', error);
    return false; // Error or no response
  }
};

// Function to handle navigation visibility
const handleNavigationVisibility = async () => {
  const isAuthenticated = await checkAuthStatus();

  if (isAuthenticated) {
    document.getElementById('navigation-buttons').style.display = 'flex';
    document.getElementById('logout-button').classList.remove('hidden');
  } else {
    document.getElementById('navigation-buttons').style.display = 'none';
    document.getElementById('logout-button').classList.add('hidden');
  }
};

// Call the function on page load
window.onload = handleNavigationVisibility;


  // Function to handle user registration
if (signupForm) {
  signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (!username || !email || !password) {
          showError('Please fill in all fields.');
          return;
      }

      try {
          const response = await fetch('/api/auth/signup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, email, password })
          });

          const data = await response.json();

          if (response.ok) {
              localStorage.setItem('token', data.token);
              window.location.href = 'profile.html';
          } else {
              showError(data.error || 'Registration failed.');
          }
      } catch (error) {
          showError('An error occurred during registration.');
      }
  });
}

// Function to handle user login
if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (!email || !password) {
          showError('Please fill in all fields.');
          return;
      }

      try {
          const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
          });

          const data = await response.json();

          if (response.ok) {
              localStorage.setItem('token', data.token);
              window.location.href = 'profile.html';
          } else {
              showError(data.error || 'Login failed.');
          }
      } catch (error) {
          showError('An error occurred during login.');
      }
  });
}

  // Handle reset password form submission
  if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = document.getElementById('reset-email').value;

      try {
        const response = await fetch('/api/auth/send-reset-password-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });

        if (response.ok) {
          console.log('Password reset email sent');
        } else {
          console.error('Password reset failed');
          showError('Password reset failed.');
        }
      } catch (error) {
        console.error('Error:', error);
        showError('An error occurred while sending the reset password email.');
      }
    });
  }

  // Profile editing
  if (editProfileButton) {
    editProfileButton.addEventListener('click', toggleEditProfile);
  }

  if (changePicButton) {
    changePicButton.addEventListener('click', toggleChangePicture);
  }

  if (editProfileForm) {
    editProfileForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      await updateProfile();
    });
  }

  if (changePicForm) {
    changePicForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      await updateProfilePic();
    });
  }

  function toggleEditProfile() {
    if (editProfileForm) {
      editProfileForm.classList.toggle('hidden');
    } else {
      console.error('Edit profile form not found.');
    }
  }

  function toggleChangePicture() {
    if (changePicForm) {
      changePicForm.classList.toggle('hidden');
    } else {
      console.error('Change profile picture form not found.');
    }
  }

  const updateProfilePic = async () => {
    if (!changePicForm) {
      console.error('Change profile picture form not found.');
      return;
    }
    const formData = new FormData(changePicForm);

    try {
      const response = await fetch('/api/users/updateProfilePic', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        showError(errorData.error || 'Failed to update profile picture.');
        return;
      }

      const data = await response.json();
      console.log('Updated profile data:', data);

      document.getElementById('profilePic').src = data.profilePic || 'default-profile-pic.jpg';
    } catch (error) {
      console.error('Upload error:', error);
      showError('An error occurred while updating profile picture.');
    }
  };

  const updateProfile = async () => {
    if (!editProfileForm) {
      console.error('Edit profile form not found.');
      return;
    }

    const newUsername = editProfileForm.newUsername.value;
    const newEmail = editProfileForm.newEmail.value;

    try {
      const response = await fetch('/api/users/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: newUsername, email: newEmail })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        showError(errorData.error || 'Failed to update profile.');
        return;
      }

      const data = await response.json();
      console.log('Updated profile data:', data);

      await loadProfile(); // Refresh profile data after updating
    } catch (error) {
      console.error('Update error:', error);
      showError('An error occurred while updating profile.');
    }
  };

  const loadProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      showError('No token found. Please log in again.');
      return;
    }

    try {
      const response = await fetch('/api/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        showError('Not authorized, token failed or expired. Please log in again.');
        localStorage.removeItem('token'); // Remove invalid token
        window.location.href = '/login.html'; // Redirect to login page
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        showError(errorData.error || 'Failed to load profile.');
        return;
      }

      const profileData = await response.json();
      console.log('Loaded profile data:', profileData);

      document.getElementById('username-display').textContent = profileData.username;
      document.getElementById('email-display').textContent = profileData.email;
    } catch (error) {
      console.error('Error fetching profile:', error);
      showError('An error occurred while loading profile data.');
    }
  };

  const showError = (message) => {
    const errorContainer = document.getElementById('error-container');
    if (errorContainer) {
      errorContainer.textContent = message;
      errorContainer.classList.remove('hidden');
    } else {
      console.error('Error container not found.');
    }
  };

  // Initial load of profile if on profile page
  if (window.location.pathname === '/profile.html') {
    loadProfile();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Fetch and display tasks on page load
  fetchTasks('daily', document.getElementById('daily-task-list'));
  fetchTasks('weekly', document.getElementById('weekly-task-list'));
  fetchTasks('monthly', document.getElementById('monthly-task-list'));
  fetchTasks('priority', document.getElementById('priority-task-list'));
  fetchTasks('organized', document.getElementById('organized-task-list'));

  // Daily Tasks
  const dailyTaskInput = document.getElementById('daily-task-input');
  const dailyTaskList = document.getElementById('daily-task-list');
  const addDailyTaskButton = document.getElementById('add-daily-task-button');

  addDailyTaskButton.addEventListener('click', () => {
    createTask('daily', { text: dailyTaskInput.value.trim() }, dailyTaskInput, dailyTaskList);
  });

  // Weekly Tasks
  const weeklyTaskInput = document.getElementById('weekly-task-input');
  const weeklyTaskList = document.getElementById('weekly-task-list');
  const addWeeklyTaskButton = document.getElementById('add-weekly-task-button');

  addWeeklyTaskButton.addEventListener('click', () => {
    createTask('weekly', { text: weeklyTaskInput.value.trim() }, weeklyTaskInput, weeklyTaskList);
  });

  // Monthly Tasks
  const monthlyTaskInput = document.getElementById('monthly-task-input');
  const monthlyTaskList = document.getElementById('monthly-task-list');
  const addMonthlyTaskButton = document.getElementById('add-monthly-task-button');

  addMonthlyTaskButton.addEventListener('click', () => {
    createTask('monthly', { text: monthlyTaskInput.value.trim() }, monthlyTaskInput, monthlyTaskList);
  });

  // Priority Tasks
  const priorityTaskInput = document.getElementById('priority-task-input');
  const priorityLevelInput = document.getElementById('priority-level-input');
  const priorityTaskList = document.getElementById('priority-task-list');
  const addPriorityTaskButton = document.getElementById('add-priority-task-button');

  addPriorityTaskButton.addEventListener('click', () => {
    const taskText = priorityTaskInput.value.trim();
    const priorityLevel = priorityLevelInput.value.trim();
    
    // Ensure priority level is valid
    const validLevels = ['High', 'Medium', 'Low'];
    if (!validLevels.includes(priorityLevel)) {
      console.error('Invalid priority level');
      return;
    }
    
    createTask('priority', { text: taskText, level: priorityLevel }, priorityTaskInput, priorityTaskList);
  });

  // Organized Tasks
  const organizedTaskInput = document.getElementById('organized-task-input');
  const categoryInput = document.getElementById('category-input');
  const organizedTaskList = document.getElementById('organized-task-list');
  const addOrganizedTaskButton = document.getElementById('add-organized-task-button');

  addOrganizedTaskButton.addEventListener('click', () => {
    const taskText = organizedTaskInput.value.trim();
    const category = categoryInput.value.trim();
    
    // Ensure category is valid
    const validCategories = ['Work', 'Personal', 'Other'];
    if (!validCategories.includes(category)) {
      console.error('Invalid category');
      return;
    }
    
    createTask('organized', { text: taskText, category: category }, organizedTaskInput, organizedTaskList);
  });

  // Function to fetch tasks from the server and display them
  function fetchTasks(taskType, listElement) {
    fetch(`/api/tasks/${taskType}`)
      .then(response => response.json())
      .then(tasks => {
        tasks.forEach(task => {
          displayTask(task, listElement, taskType);
        });
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }

  // Function to create a new task and add it to the list
  function createTask(taskType, taskData, inputElement, listElement) {
    if (taskData.text === '') return;

    console.log(`Creating ${taskType} task with data:`, taskData);

    fetch(`/api/tasks/${taskType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text); });
        }
        return response.json();
      })
      .then(newTask => {
        displayTask(newTask, listElement, taskType);
        inputElement.value = '';  // Clear input after adding
      })
      .catch(error => console.error('Error creating task:', error));
  }

  // Function to display a task
  function displayTask(task, listElement, taskType) {
    const listItem = document.createElement('li');
    listItem.textContent = task.text;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed || false;
    checkbox.addEventListener('change', () => {
      updateTask(taskType, task._id, { completed: checkbox.checked });
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteTask(taskType, task._id, listItem);
    });

    listItem.prepend(checkbox);
    listItem.appendChild(deleteButton);
    listElement.appendChild(listItem);
  }

  // Function to update a task's completion status
  function updateTask(taskType, taskId, updates) {
    fetch(`/api/tasks/${taskType}/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })
      .then(response => response.json())
      .catch(error => console.error('Error updating task:', error));
  }

  // Function to delete a task
  function deleteTask(taskType, taskId, listItem) {
    fetch(`/api/tasks/${taskType}/${taskId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          listItem.remove();
        } else {
          throw new Error('Failed to delete task');
        }
      })
      .catch(error => console.error('Error deleting task:', error));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const userId = 'user-id-placeholder'; // Replace this with the actual user ID

  // Fetch and display reminders on page load
  fetchReminders(userId);

  // Reminder Form
  const reminderForm = document.getElementById('add-reminder-form');
  reminderForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const reminderText = document.getElementById('reminder-text').value.trim();
      const reminderDatetime = document.getElementById('reminder-datetime').value;

      if (reminderText !== '' && reminderDatetime !== '') {
          createReminder(userId, { text: reminderText, datetime: reminderDatetime });
      }
  });

  // Function to fetch reminders from the server and display them
  function fetchReminders(userId) {
      fetch(`/api/reminders/${userId}`) // Use backticks here
          .then(response => response.json())
          .then(reminders => {
              const reminderList = document.getElementById('reminder-list');
              reminderList.innerHTML = ''; // Clear existing reminders

              reminders.forEach(reminder => {
                  displayReminder(reminder, reminderList);
              });
          })
          .catch(error => console.error('Error fetching reminders:', error));
  }

  // Function to create a new reminder
  function createReminder(userId, reminderData) {
      fetch('/api/reminders', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...reminderData, user_id: userId }),
      })
          .then(response => response.json())
          .then(newReminder => {
              const reminderList = document.getElementById('reminder-list');
              displayReminder(newReminder, reminderList);
          })
          .catch(error => console.error('Error creating reminder:', error));
  }

  // Function to display a reminder
  function displayReminder(reminder, listElement) {
      const listItem = document.createElement('li');
      listItem.textContent = `${reminder.text} - ${new Date(reminder.datetime).toLocaleString()}`; // Use backticks here

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
          deleteReminder(reminder._id, listItem);
      });

      listItem.appendChild(deleteButton);
      listElement.appendChild(listItem);

      // Optionally, set a timeout to alert the user when the reminder is due
      const timeUntilReminder = new Date(reminder.datetime) - new Date();
      if (timeUntilReminder > 0) {
          setTimeout(() => {
              alert(`Reminder: ${reminder.text}`); // Use backticks here
          }, timeUntilReminder);
      }
  }

  // Function to delete a reminder
  function deleteReminder(reminderId, listItem) {
      fetch(`/api/reminders/${reminderId}`, { // Use backticks here
          method: 'DELETE',
      })
          .then(() => {
              listItem.remove();
          })
          .catch(error => console.error('Error deleting reminder:', error));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  let pomodoroInterval;
  let timeRemaining = 1500;  // Default 25 minutes in seconds

  const pomodoroStatus = document.getElementById('pomodoro-status');
  const timerDisplay = document.getElementById('timer-display');
  const startPomodoro = document.getElementById('start-pomodoro');
  const stopPomodoro = document.getElementById('stop-pomodoro');
  const resetPomodoro = document.getElementById('reset-pomodoro');
  const durationInput = document.getElementById('pomodoro-duration');

  // Initialize timer display with saved duration
  const savedDuration = localStorage.getItem('pomodoroDuration') || 25;
  durationInput.value = savedDuration;
  timeRemaining = savedDuration * 60;
  timerDisplay.textContent = formatTime(timeRemaining);

  startPomodoro.addEventListener('click', () => {
    const minutes = parseInt(durationInput.value) || 25;
    localStorage.setItem('pomodoroDuration', minutes);
    timeRemaining = minutes * 60;
    pomodoroStatus.textContent = 'Pomodoro Started';
    startPomodoro.style.display = 'none';
    stopPomodoro.style.display = 'block';
    timerDisplay.textContent = formatTime(timeRemaining);

    pomodoroInterval = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
        timerDisplay.textContent = formatTime(timeRemaining);
      } else {
        clearInterval(pomodoroInterval);
        alert('Pomodoro session ended!');
        showNotification('Pomodoro session ended!', 'Take a short break!');
        playAlertSound();
        pomodoroStatus.textContent = 'Pomodoro Stopped';
        startPomodoro.style.display = 'block';
        stopPomodoro.style.display = 'none';
        timerDisplay.textContent = '25:00';
      }
    }, 1000);
  });

  stopPomodoro.addEventListener('click', () => {
    clearInterval(pomodoroInterval);
    pomodoroStatus.textContent = 'Pomodoro Stopped';
    startPomodoro.style.display = 'block';
    stopPomodoro.style.display = 'none';
  });

  resetPomodoro.addEventListener('click', () => {
    clearInterval(pomodoroInterval);
    const minutes = parseInt(durationInput.value) || 25;
    localStorage.setItem('pomodoroDuration', minutes);
    timeRemaining = minutes * 60;
    pomodoroStatus.textContent = 'Pomodoro Stopped';
    startPomodoro.style.display = 'block';
    stopPomodoro.style.display = 'none';
    timerDisplay.textContent = formatTime(timeRemaining);
  });

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  function showNotification(title, body) {
    if (Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  }

  function playAlertSound() {
    const alertSound = new Audio('path/to/alert-sound.mp3'); // Replace with the path to your sound file
    alertSound.play();
  }

  // Request notification permission if not already granted
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  let trackingInterval;
  let trackingTime = 0;

  const timeTrackingStatus = document.getElementById('time-tracking-status');
  const timeTrackingDisplay = document.getElementById('time-tracking-display');
  const startTimeTracking = document.getElementById('start-time-tracking');
  const stopTimeTracking = document.getElementById('stop-time-tracking');
  const resetTimeTracking = document.getElementById('reset-time-tracking');

  startTimeTracking.addEventListener('click', () => {
    timeTrackingStatus.textContent = 'Time Tracking Started';
    startTimeTracking.style.display = 'none';
    stopTimeTracking.style.display = 'block';
    resetTimeTracking.style.display = 'none';

    trackingInterval = setInterval(() => {
      trackingTime++;
      timeTrackingDisplay.textContent = formatTrackingTime(trackingTime);
    }, 1000);
  });

  stopTimeTracking.addEventListener('click', () => {
    clearInterval(trackingInterval);
    timeTrackingStatus.textContent = 'Time Tracking Stopped';
    startTimeTracking.style.display = 'block';
    stopTimeTracking.style.display = 'none';
    resetTimeTracking.style.display = 'block';
  });

  resetTimeTracking.addEventListener('click', () => {
    clearInterval(trackingInterval);
    trackingTime = 0;
    timeTrackingDisplay.textContent = formatTrackingTime(trackingTime);
    timeTrackingStatus.textContent = 'Time Tracking Stopped';
    startTimeTracking.style.display = 'block';
    stopTimeTracking.style.display = 'none';
    resetTimeTracking.style.display = 'none';
  });

  function formatTrackingTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
});