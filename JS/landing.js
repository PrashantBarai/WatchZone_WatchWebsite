const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let currentIndex = 1; // Start with the first item visible (the clone)
const totalItems = items.length;
const visibleItems = 3; // Change based on how many items to show at once

// Clone the first two items and append them to the end of the track
const cloneFirst = items[0].cloneNode(true);
const cloneSecond = items[1].cloneNode(true);
track.appendChild(cloneFirst);
track.appendChild(cloneSecond);

function updateCarousel() {
    const itemWidth = items[0].getBoundingClientRect().width;
    track.style.transform = 'translateX(' + (-itemWidth * currentIndex) + 'px)';

    // Reset index if we reach the clones
    if (currentIndex === totalItems + 1) {
        currentIndex = 1; // Jump to the first actual item
        track.style.transition = 'none'; // Disable transition for instant jump
        setTimeout(() => {
            track.style.transform = 'translateX(' + (-itemWidth * currentIndex) + 'px)';
            track.style.transition = ''; // Re-enable transition
        }, 0);
    } else if (currentIndex === 0) {
        currentIndex = totalItems; // Jump to the last actual item
        track.style.transition = 'none'; // Disable transition for instant jump
        setTimeout(() => {
            track.style.transform = 'translateX(' + (-itemWidth * currentIndex) + 'px)';
            track.style.transition = ''; // Re-enable transition
        }, 0);
    }

    // Scale the current item larger
    items.forEach((item, index) => {
        item.style.transform = 'scale(0.9)'; // Default scale
        if (index === currentIndex) {
            item.style.transform = 'scale(1)'; // Scale up the current item
        }
    });
}

nextButton.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();
});

prevButton.addEventListener('click', () => {
    currentIndex--;
    updateCarousel();
});

// Initial call to set up the carousel
updateCarousel();
