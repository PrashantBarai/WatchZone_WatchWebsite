// signup.js
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    console.log('User signed up with:', { username, email, password });
  
    // Here you can add logic to send this data to the server or validate it further
  });
  