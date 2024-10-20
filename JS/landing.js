window.onload = function () {
    // Mock login state (replace with actual logic)
    let isLoggedIn = false; // Change this based on your login logic

    const loginButton = document.getElementById('login');
    const signupButton = document.getElementById('signup');
    const logoutButton = document.getElementById('logout');

    // Update the button visibility based on login state
    function updateAuthButtons() {
        if (isLoggedIn) {
            loginButton.style.display = 'none';
            signupButton.style.display = 'none';
            logoutButton.style.display = 'block';
        } else {
            loginButton.style.display = 'block';
            signupButton.style.display = 'block';
            logoutButton.style.display = 'none';
        }
    }

    // Update button visibility on page load
    updateAuthButtons();

    // Logout logic
    logoutButton.addEventListener('click', function () {
        isLoggedIn = false; // Update the login state
        updateAuthButtons(); // Update button visibility
    });

    // Carousel logic
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let currentIndex = 0; // Start at the first item
    const totalItems = items.length;

    function updateCarousel() {
        const itemWidth = items[0].getBoundingClientRect().width;
        track.style.transform = 'translateX(' + (-itemWidth * currentIndex) + 'px)';
    }

    nextButton.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });

    prevButton.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    // Initial carousel update
    updateCarousel();
};
