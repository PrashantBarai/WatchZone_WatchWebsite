// login.js
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    console.log('User logged in with:', { email, password });
  
    // Here you can add logic to send this data to the server or validate it further
  });
  