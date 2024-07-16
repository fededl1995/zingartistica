let authenticated = false;

function showLoginDialog() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginDialog() {
    document.getElementById('loginModal').style.display = 'none';
}

function authenticate() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "admin" && password === "admin123") {
        authenticated = true;
        alert("Autenticado correctamente.");
        showEditButtons();
        showUpdatePricesContainer();
        closeLoginDialog();
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

function editPrice(button) {
    if (!authenticated) {
        authenticate();
    }

    if (authenticated) {
        const productItem = button.closest('.product-item');
        const priceElement = productItem.querySelector('.price');
        const productIndex = Array.from(document.querySelectorAll('.product-item')).indexOf(productItem);

        const newPrice = prompt("Ingrese el nuevo precio:");

        if (newPrice !== null && !isNaN(newPrice) && newPrice !== "") {
            const formattedPrice = "$" + parseFloat(newPrice).toFixed(2);
            priceElement.textContent = formattedPrice;
            localStorage.setItem('price' + productIndex, formattedPrice);
        } else {
            alert("Ingrese un precio válido.");
        }
    }
}

function updatePrices() {
    if (!authenticated) {
        authenticate();
    }

    if (authenticated) {
        const percentage = document.getElementById('percentage').value;
        const percentageDecimal = percentage / 100;
        const products = document.querySelectorAll('.product-item');

        products.forEach((product, index) => {
            const priceElement = product.querySelector('.price');
            const originalPrice = parseFloat(priceElement.textContent.replace('$', ''));
            const newPrice = originalPrice * (1 + percentageDecimal);
            const formattedPrice = "$" + newPrice.toFixed(2);
            priceElement.textContent = formattedPrice;
            localStorage.setItem('price' + index, formattedPrice);
        });
    }
}

function showEditButtons() {
    const editButtons = document.querySelectorAll('.edit-price-btn');
    editButtons.forEach(button => {
        button.style.display = 'inline-block';
    });
}

function showUpdatePricesContainer() {
    document.getElementById('updatePricesContainer').style.display = 'block';
}

window.onload = function() {
    loadPrices();
    hideEditButtons();
    hideUpdatePricesContainer();
};

function hideEditButtons() {
    const editButtons = document.querySelectorAll('.edit-price-btn');
    editButtons.forEach(button => {
        button.style.display = 'none';
    });
}

function hideUpdatePricesContainer() {
    document.getElementById('updatePricesContainer').style.display = 'none';
}

function loadPrices() {
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach((item, index) => {
        const priceElement = item.querySelector('.price');
        const storedPrice = localStorage.getItem('price' + index);
        if (storedPrice) {
            priceElement.textContent = storedPrice;
        }
    });
}
