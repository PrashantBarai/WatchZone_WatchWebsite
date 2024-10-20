// smartwatch.js

const customDayButton = document.getElementById('custom-day');
const customDateInput = document.getElementById('custom-date');
const priceCheckbox = document.getElementById('price-checkbox');
const brandCheckbox = document.getElementById('brand-checkbox');
const priceRange = document.getElementById('price-range');
const brandFilter = document.getElementById('brand-filter');
const priceInput = document.getElementById('price-input');
const priceValue = document.getElementById('price-value');
const productGrid = document.getElementById('product-grid');
const arrowRight = document.getElementById('arrow-right');

// Price slider event
priceInput.addEventListener('input', (event) => {
    priceValue.textContent = `$${event.target.value}`;
});

// Toggle custom date input visibility
customDayButton.addEventListener('click', () => {
    customDateInput.classList.toggle('hidden');
});

// Toggle visibility of filters based on checkboxes
priceCheckbox.addEventListener('change', () => {
    priceRange.classList.toggle('hidden');
});
brandCheckbox.addEventListener('change', () => {
    brandFilter.classList.toggle('hidden');
});

// Sidebar button activation
document.querySelectorAll('.sidebar-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.sidebar-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Handling actions for favorites, bookmarks, and cart
document.querySelectorAll('.fas.fa-star').forEach(button => {
    button.addEventListener('click', () => {
        console.log('Added to Favorites');
        // Implement actual functionality here
    });
});
document.querySelectorAll('.fas.fa-bookmark').forEach(button => {
    button.addEventListener('click', () => {
        console.log('Added to Bookmarks');
        // Implement actual functionality here
    });
});
document.querySelectorAll('.fas.fa-shopping-cart').forEach(button => {
    button.addEventListener('click', () => {
        console.log('Added to Cart');
        // Implement actual functionality here
    });
});

// Fetch watches from the backend
async function fetchWatches() {
    try {
        const response = await fetch('http://localhost:5000/api/analytical-watches'); // Update with your actual API endpoint
        if (!response.ok) throw new Error('Failed to fetch watches');
        const watches = await response.json();
        displayWatches(watches);
    } catch (error) {
        console.error('Error fetching watches:', error);
        // Optionally display an error message to the user
    }
}

// Display watches in the product grid
function displayWatches(watches) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = ''; // Clear existing content

    if (watches.length === 0) {
        productGrid.innerHTML = `<p class="text-gray-500">No smart watches found.</p>`;
        return;
    }

    watches.forEach(watch => {
        const card = document.createElement('div');
        card.classList.add('custom-card', 'bg-white', 'p-4');

        card.innerHTML = `
            <img src="${watch.imageUrl}" alt="${watch.name}" class="w-full">
            <div class="mt-4">
                <h3 class="font-semibold text-lg">${watch.name}</h3>
                <p class="text-gray-500">$${watch.price}</p>
                <button class="text-orange-500 mt-2"><a href="viewsw.html?id=${watch._id}">View Product</a></button>
                <div class="mt-4 flex justify-between">
                    <button class="text-gray-400 hover:text-red-500 favorite-button"><i class="fas fa-star"></i></button>
                    <button class="text-gray-400 hover:text-green-500 bookmark-button"><i class="fas fa-bookmark"></i></button>
                    <button class="text-gray-400 hover:text-blue-500 cart-button"><i class="fas fa-shopping-cart"></i></button>
                </div>
            </div>
        `;

        productGrid.appendChild(card);
    });
}

// Call fetchWatches on page load
window.addEventListener('load', fetchWatches);

// Load next set of cards functionality (if needed)
document.getElementById("nextCards").addEventListener("click", function() {
    // Logic to load the next set of cards
});

// Arrow button visibility toggle based on sidebar position
const sidebar = document.querySelector('aside');
const observer = new IntersectionObserver(([entry]) => {
    arrowRight.classList.toggle('hidden', entry.isIntersecting);
});
observer.observe(sidebar);

// Arrow button functionality to toggle sidebar
arrowRight.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
});

// Scroll-based visibility for the arrow button
window.addEventListener('scroll', () => {
    arrowRight.classList.toggle('hidden', window.scrollY <= 300);
});
