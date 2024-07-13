let authenticated = false;

function authenticate() {
    const username = prompt("Ingrese su usuario:");
    const password = prompt("Ingrese su contraseña:");

    // Puedes cambiar esto por la validación real de usuario y contraseña
    if (username === "admin" && password === "admin123") {
        authenticated = true;
        alert("Autenticado correctamente.");
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
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

// Cargar los precios almacenados al cargar la página
window.onload = loadPrices;
