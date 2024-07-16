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

    // Validación básica de usuario y contraseña (deberías implementar una validación más segura en un entorno real)
    if (username === "admin" && password === "admin123") {
        authenticated = true;
        alert("Autenticado correctamente.");
        showEditButtons(); // Mostrar botones después de autenticar
        closeLoginDialog(); // Cerrar el modal de inicio de sesión
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

// Función para mostrar los botones de editar precio
function showEditButtons() {
    const editButtons = document.querySelectorAll('.edit-price-btn');
    editButtons.forEach(button => {
        button.style.display = 'inline-block'; // Mostrar el botón
    });
}

// Cargar los precios almacenados al cargar la página
window.onload = function() {
    loadPrices();
    hideEditButtons(); // Ocultar botones al cargar la página
};

// Función para ocultar los botones de editar precio
function hideEditButtons() {
    const editButtons = document.querySelectorAll('.edit-price-btn');
    editButtons.forEach(button => {
        button.style.display = 'none'; // Ocultar el botón
    });
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
