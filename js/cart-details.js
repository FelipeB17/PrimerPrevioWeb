document.addEventListener('DOMContentLoaded', function() {
    const welcomeMessage = document.getElementById('welcomeMessage');
    const cartDate = document.getElementById('cartDate');
    const cartId = document.getElementById('cartId');
    const customerName = document.getElementById('customerName');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const backToCartsButton = document.getElementById('backToCartsButton');
    const logoutButton = document.getElementById('logoutButton');
    const updateButton = document.getElementById('updateButton');
    const confirmButton = document.getElementById('confirmButton');
    const continueShopping = document.getElementById('continueShopping');

    const cartIdFromURL = new URLSearchParams(window.location.search).get('id');

    // Set welcome message
    const username = localStorage.getItem('username');
    welcomeMessage.textContent = `Bienvenido: ${username}`;

    // Fetch cart details
    fetch(`https://fakestoreapi.com/carts/${cartIdFromURL}`)
        .then(response => response.json())
        .then(cart => {
            displayCartDetails(cart);
            fetchProductDetails(cart.products);
        });

    // Fetch user details
    fetch('https://fakestoreapi.com/users/1')
        .then(response => response.json())
        .then(user => {
            const fullName = `${user.name.firstname} ${user.name.lastname}`;
            customerName.textContent = fullName;
            // Update localStorage with the full name
            localStorage.setItem('username', fullName);
            // Update welcome message with the full name
            welcomeMessage.textContent = `Bienvenido: ${fullName}`;
        });

    function displayCartDetails(cart) {
        cartDate.textContent = new Date(cart.date).toLocaleDateString();
        cartId.textContent = cart.id;
    }

    function fetchProductDetails(products) {
        Promise.all(products.map(product => 
            fetch(`https://fakestoreapi.com/products/${product.productId}`)
                .then(response => response.json())
        )).then(productDetails => {
            displayCartItems(products, productDetails);
        });
    }

    function displayCartItems(cartProducts, productDetails) {
        let total = 0;
        cartItems.innerHTML = '';
        cartProducts.forEach((cartProduct, index) => {
            const product = productDetails[index];
            const subtotal = cartProduct.quantity * product.price;
            total += subtotal;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.title}</td>
                <td>
                    <input type="number" class="form-control quantity-input" 
                           value="${cartProduct.quantity}" min="1" 
                           data-product-id="${product.id}" 
                           data-price="${product.price}">
                </td>
                <td>$${product.price.toFixed(2)}</td>
                <td class="subtotal">$${subtotal.toFixed(2)}</td>
            `;
            cartItems.appendChild(row);
        });
        cartTotal.textContent = total.toFixed(2);

        // Add event listeners to quantity inputs
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', updateSubtotal);
        });
    }

    function updateSubtotal(event) {
        const input = event.target;
        const quantity = parseInt(input.value);
        const price = parseFloat(input.dataset.price);
        const subtotal = quantity * price;
        
        const row = input.closest('tr');
        row.querySelector('.subtotal').textContent = `$${subtotal.toFixed(2)}`;

        updateTotal();
    }

    function updateTotal() {
        const subtotals = Array.from(document.querySelectorAll('.subtotal'))
            .map(el => parseFloat(el.textContent.replace('$', '')));
        const total = subtotals.reduce((sum, subtotal) => sum + subtotal, 0);
        cartTotal.textContent = total.toFixed(2);
    }

    backToCartsButton.addEventListener('click', function() {
        window.location.href = 'cart.html';
    });

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    });

    updateButton.addEventListener('click', function() {
        alert('Funcionalidad de actualización pendiente de implementar');
    });

    confirmButton.addEventListener('click', function() {
        alert('Funcionalidad de confirmación pendiente de implementar');
    });

    continueShopping.addEventListener('click', function() {
        window.location.href = 'main.html';
    });
});