document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  console.log("Login Attempt:", { email, password }); // Log the login attempt

  try {
      const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      });

      console.log('Response Status:', response.status); // Log the response status

      const data = await response.json();

      if (response.ok) {
          alert(data.message);
          window.location.href = 'landing.html'; // Redirect to your landing page
      } else {
          // Handle different error responses
          if (response.status === 401) {
              alert("Invalid credentials. Please try again."); // Specific message for 401
          } else {
              alert(data.message || 'An error occurred. Please try again.'); // General error message
          }
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.'); // General catch-all error message
  }
});
