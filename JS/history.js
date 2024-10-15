        const cartButton = document.getElementById('cart-button');
        const favoritesButton = document.getElementById('favorites-button');
        const bookmarksButton = document.getElementById('bookmarks-button');

        const cartSection = document.getElementById('cart-section');
        const favoritesSection = document.getElementById('favorites-section');
        const bookmarksSection = document.getElementById('bookmarks-section');

        const customDayButton = document.getElementById('custom-day');
            const customDateInput = document.getElementById('custom-date');
            const priceCheckbox = document.getElementById('price-checkbox');
            const brandCheckbox = document.getElementById('brand-checkbox');
            const priceRange = document.getElementById('price-range');
            const brandFilter = document.getElementById('brand-filter');
            const priceInput = document.getElementById('price-input');
            const priceValue = document.getElementById('price-value');
            const productGrid = document.getElementById('product-grid');

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

        cartButton.addEventListener('click', () => {
            cartSection.classList.remove('hidden');
            favoritesSection.classList.add('hidden');
            bookmarksSection.classList.add('hidden');
            updateActiveButton(0);
        });

        favoritesButton.addEventListener('click', () => {
            cartSection.classList.add('hidden');
            favoritesSection.classList.remove('hidden');
            bookmarksSection.classList.add('hidden');
            updateActiveButton(1);
        });

        bookmarksButton.addEventListener('click', () => {
            cartSection.classList.add('hidden');
            favoritesSection.classList.add('hidden');
            bookmarksSection.classList.remove('hidden');
            updateActiveButton(2);
        });

        function updateActiveButton(index) {
            const buttons = [cartButton, favoritesButton, bookmarksButton];
            buttons.forEach((button, i) => {
                button.classList.remove('active');
                if (i === index) {
                    button.classList.add('active');
                }
            });
        }

        let cartItems = {
            samsung: { price: 50, quantity: 1 },
            apple: { price: 100, quantity: 1 }
        };
        
        function updateQuantity(item, change) {
            // Update quantity
            if (cartItems[item].quantity + change >= 0) {
                cartItems[item].quantity += change;
                document.getElementById(`${item}-quantity`).innerText = cartItems[item].quantity;
                updateTotalPrice();
            }
        }
        
        function updateTotalPrice() {
            const total = Object.keys(cartItems).reduce((sum, item) => {
                return sum + (cartItems[item].price * cartItems[item].quantity);
            }, 0);
            document.getElementById('total-price').innerText = `$${total}`;
        }        