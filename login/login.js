// Simple authentication using localStorage
// Users are stored as { username: string, password: string }
function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}
function setLoggedInUser(username) {
    localStorage.setItem('loggedInUser', username);
}
function getLoggedInUser() {
    return localStorage.getItem('loggedInUser');
}
function showMessage(msg, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = `<div class="${type}">${msg}</div>`;
}
document.addEventListener('DOMContentLoaded', function () {
    // Toggle forms
    document.getElementById('show-signup').onclick = function () {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('signup-form').style.display = 'flex';
        document.getElementById('form-title').innerText = 'Sign Up';
        showMessage('', '');
    };
    document.getElementById('show-login').onclick = function () {
        document.getElementById('login-form').style.display = 'flex';
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('form-title').innerText = 'Login';
        showMessage('', '');
    };
    // Login
    document.getElementById('login-form').onsubmit = function (e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        const users = getUsers();
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            setLoggedInUser(username);
            showMessage('Login successful! Redirecting...', 'success');
            setTimeout(() => { window.location.href = 'index.html'; }, 1000);
        } else {
            showMessage('Invalid username or password.', 'error');
        }
    };
    // Signup
    document.getElementById('signup-form').onsubmit = function (e) {
        e.preventDefault();
        const username = document.getElementById('signup-username').value.trim();
        const password = document.getElementById('signup-password').value;
        let users = getUsers();
        if (users.find(u => u.username === username)) {
            showMessage('Username already exists.', 'error');
            return;
        }
        users.push({ username, password });
        saveUsers(users);
        setLoggedInUser(username);
        showMessage('Registration successful! Redirecting...', 'success');
        setTimeout(() => { window.location.href = 'index.html'; }, 1000);
    };
});