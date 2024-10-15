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

            priceInput.addEventListener('input', () => {
                priceValue.textContent = `$${priceInput.value}`;
            });

            document.querySelectorAll('.sidebar-button').forEach(button => {
                button.addEventListener('click', () => {
                    document.querySelectorAll('.sidebar-button').forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                });
            });

            // JavaScript to handle adding to Favorites, Bookmarks, and Cart
            document.querySelectorAll('.fas.fa-heart').forEach(button => {
                button.addEventListener('click', () => {
                    alert('Added to Favorites');
                    // Additional logic for adding to the sidebar
                });
            });

            document.querySelectorAll('.fas.fa-bookmark').forEach(button => {
                button.addEventListener('click', () => {
                    alert('Added to Bookmarks');
                    // Additional logic for adding to the sidebar
                });
            });

            document.querySelectorAll('.fas.fa-shopping-cart').forEach(button => {
                button.addEventListener('click', () => {
                    alert('Added to Cart');
                    // Additional logic for adding to the sidebar
                });
            });

            document.getElementById("nextCards").addEventListener("click", function() {
                // Logic to load the next set of cards
                // This can be a function that adds more cards dynamically
            });
            

            // Arrow button visibility toggle
            const sidebar = document.querySelector('aside');

            const observer = new IntersectionObserver(([entry]) => {
                if (!entry.isIntersecting) {
                    arrowRight.classList.remove('hidden');
                } else {
                    arrowRight.classList.add('hidden');
                }
            });

            observer.observe(sidebar);

            arrowRight.addEventListener('click', () => {
                sidebar.classList.toggle('hidden');
            });

            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    arrowRight.classList.remove('hidden');
                } else {
                    arrowRight.classList.add('hidden');
                }
            });