document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('productList');
    const searchInput = document.getElementById('searchInput');
    const categoryButtons = document.querySelectorAll('[data-category]');
    const cartButton = document.getElementById('cartButton');
    const logoutButton = document.getElementById('logoutButton');

    let products = [];

    // Fetch user data
    fetch('https://fakestoreapi.com/users/1')
        .then(response => response.json())
        .then(user => {
            localStorage.setItem('username', user.username);
        });

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
            addToCart(productId);
        }
    });

    function addToCart(productId) {
        fetch('https://fakestoreapi.com/carts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: 1,
                date: new Date(),
                products: [{productId: productId, quantity: 1}]
            })
        })
        .then(res => res.json())
        .then(json => {
            alert('Producto añadido al carrito');
            console.log(json);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al añadir el producto al carrito');
        });
    }

    // Cart button click
    cartButton.addEventListener('click', function() {
        window.location.href = 'cart.html';
    });

    // Logout functionality
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    });
});