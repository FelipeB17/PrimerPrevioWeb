document.addEventListener('DOMContentLoaded', function() {
    const welcomeMessage = document.getElementById('welcomeMessage');
    const cartList = document.getElementById('cartList');
    const backToProductsButton = document.getElementById('backToProductsButton');
    const logoutButton = document.getElementById('logoutButton');

    // Set welcome message
    const username = localStorage.getItem('username');
    welcomeMessage.textContent = `Bienvenido: ${username}`;

    // Fetch user's carts
    fetch('https://fakestoreapi.com/carts/user/1')
        .then(response => response.json())
        .then(carts => {
            displayCarts(carts);
        });

    function displayCarts(carts) {
        cartList.innerHTML = '';
        carts.forEach(cart => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cart.id}</td>
                <td>${new Date(cart.date).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-sm btn-primary view-cart" data-id="${cart.id}">Ver</button>
                </td>
            `;
            cartList.appendChild(row);
        });
    }

    // View cart details
    cartList.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-cart')) {
            const cartId = e.target.dataset.id;
            window.location.href = `cart-details.html?id=${cartId}`;
        }
    });

    // Back to products button
    backToProductsButton.addEventListener('click', function() {
        window.location.href = 'main.html';
    });

    // Logout functionality
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    });
});