document.getElementById('signupForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
      const response = await fetch('http://localhost:5000/api/signup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
          alert(data.message);
          window.location.href = 'login.html'; // Redirect to login page
      } else {
          alert(data.message);
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
  }
});
