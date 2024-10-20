document.addEventListener('DOMContentLoaded', () => {
    fetchSmartWatches();
    initializeEventListeners();
});

async function fetchSmartWatches() {
    try {
        const response = await fetch('http://localhost:5000/api/smart-watches'); // Update URL if needed
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const smartWatches = await response.json();
        displaySmartWatches(smartWatches);
    } catch (error) {
        console.error('Failed to fetch smart watches:', error);
    }
}

function displaySmartWatches(watches) {
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

function initializeEventListeners() {
    const customDayButton = document.getElementById('custom-day');
    const customDateInput = document.getElementById('custom-date');
    const priceCheckbox = document.getElementById('price-checkbox');
    const brandCheckbox = document.getElementById('brand-checkbox');
    const priceRange = document.getElementById('price-range');
    const brandFilter = document.getElementById('brand-filter');
    const priceInput = document.getElementById('price-input');
    const priceValue = document.getElementById('price-value');
    const arrowRight = document.getElementById('arrow-right');

    priceInput.addEventListener('input', () => {
        priceValue.textContent = `$${priceInput.value}`;
    });

    customDayButton.addEventListener('click', () => {
        customDateInput.classList.toggle('hidden');
    });

    priceCheckbox.addEventListener('change', () => {
        priceRange.classList.toggle('hidden');
    });

    brandCheckbox.addEventListener('change', () => {
        brandFilter.classList.toggle('hidden');
    });

    document.querySelectorAll('.sidebar-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.sidebar-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Event listeners for buttons in product cards
    document.addEventListener('click', (event) => {
        if (event.target.closest('.favorite-button')) {
            alert('Added to Favorites');
        }
        if (event.target.closest('.bookmark-button')) {
            alert('Added to Bookmarks');
        }
        if (event.target.closest('.cart-button')) {
            alert('Added to Cart');
        }
    });

    // Arrow button visibility toggle
    const sidebar = document.querySelector('aside');
    const observer = new IntersectionObserver(([entry]) => {
        arrowRight.classList.toggle('hidden', entry.isIntersecting);
    });

    observer.observe(sidebar);

    arrowRight.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
    });

    window.addEventListener('scroll', () => {
        arrowRight.classList.toggle('hidden', window.scrollY <= 300);
    });
}
