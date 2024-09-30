document.addEventListener('DOMContentLoaded', function() {
    const welcomeMessage = document.getElementById('welcomeMessage');
    const productList = document.getElementById('productList');
    const searchInput = document.getElementById('searchInput');
    const categoryButtons = document.querySelectorAll('[data-category]');
    const cartButton = document.getElementById('cartButton');
    const logoutButton = document.getElementById('logoutButton');

    let products = [];
    let cart = [];

    // Set welcome message
    const username = localStorage.getItem('username');
    welcomeMessage.textContent += username;

    // Fetch products
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            products = data;
            displayProducts(products);
        });

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });

    // Category filter
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            const filteredProducts = products.filter(product => product.category === category);
            displayProducts(filteredProducts);
        });
    });

    // Display products
    function displayProducts(productsToDisplay) {
        productList.innerHTML = '';
        productsToDisplay.forEach(product => {
            const productCard = createProductCard(product);
            productList.appendChild(productCard);
        });
    }

    // Create product card
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'col';
        card.innerHTML = `
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: contain;">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">$${product.price.toFixed(2)}</p>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        return card;
    }

    // Add to cart functionality
    productList.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === productId);
            addToCart(product);
        }
    });

    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartButton();
    }

    function updateCartButton() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartButton.textContent = `Cart (${totalItems})`;
    }

    // Cart button click (you can implement the cart view here)
    cartButton.addEventListener('click', function() {
        alert('Cart functionality to be implemented');
    });

    // Logout functionality
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    });
});