document.addEventListener('DOMContentLoaded', () => {
    const watchSection = document.querySelector('.grid');
  
    const watches = [
      { name: 'Luxury Watch', price: '$199', img: 'img1.jpg' },
      { name: 'Sport Watch', price: '$99', img: 'img2.jpg' },
      { name: 'Casual Watch', price: '$79', img: 'img3.jpg' },
    ];
  
    watches.forEach(watch => {
      const watchCard = document.createElement('div');
      watchCard.classList.add('bg-white', 'shadow-lg', 'rounded-lg', 'p-6');
  
      watchCard.innerHTML = `
        <img src="${watch.img}" alt="${watch.name}" class="w-full h-40 object-cover rounded-lg mb-4">
        <h2 class="text-2xl font-bold mb-2">${watch.name}</h2>
        <p class="text-gray-700">${watch.price}</p>
        <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Add to Cart</button>
      `;
  
      watchSection.appendChild(watchCard);
    });
  });
  