// Agrego accion a los botones del trailer
function ocultarMostrar(button) {
    const videoContainer = button.parentElement.querySelector(".video");
    if (videoContainer.style.display === "none" || videoContainer.style.display === "") {
        videoContainer.style.display = "block";
        button.innerHTML = "Ocultar trailer";
        button.style.background = "orange";
        button.style.color = "darkred";
    } else {
        videoContainer.style.display = "none";
        button.innerHTML = "Mostrar trailer";
        button.style.background = "darkred";
        button.style.color = "yellow";
    }
}

// Validacion de formulario
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("miFormulario");

    if (!formulario) {
        console.error("Formulario no encontrado. Verifica el ID del formulario en el HTML.");
        return;
    }

    formulario.addEventListener("submit", (event) => {
        // Obtener todos los campos del formulario
        const userName = document.getElementById("userName").value.trim();
        const userSurname = document.getElementById("userSurname").value.trim();
        const userStreet = document.getElementById("userStreet").value.trim();
        const userNumStreet = document.getElementById("userNumStreet").value.trim();
        const userCity = document.getElementById("userCity").value.trim();
        const userZipCode = document.getElementById("userZipCode").value.trim();
        const userTel = document.getElementById("userTel").value.trim();
        const userDob = document.getElementById("userDob").value.trim();
        const userEmail = document.getElementById("userEmail").value.trim();
        const userPassword = document.getElementById("userPassword").value.trim();
        const gender = document.querySelector('input[name="gender"]:checked');
        const knowledge = document.querySelector('select[name="knowledge"]').value.trim();
        const likes = document.querySelectorAll('input[name="likes"]:checked');
        const text = document.querySelector('textarea[name="text"]').value.trim();

        // Verificación de campos vacíos
        if (!userName || !userSurname || !userStreet || !userNumStreet || !userCity || !userZipCode || !userTel || !userDob || !userEmail || !userPassword || !gender || !knowledge || likes.length === 0 || !text) {
            alert("Por favor, completa todos los campos.");
            event.preventDefault(); // Bloquea el envío si hay errores
            return;
        }

        // Uso de expresiones regulares
        const expRegLetras = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        const expRegNum = /^\d+$/;
        const expRegEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!expRegLetras.test(userName) || !expRegLetras.test(userSurname)) {
            alert("Formato inválido. Solo letras en el nombre y apellido.");
            event.preventDefault(); // Bloquea el envío si hay errores
            return;
        }

        if (!expRegNum.test(userTel)) {
            alert("Formato inválido. Solo números en el teléfono.");
            event.preventDefault(); // Bloquea el envío si hay errores
            return;
        }

        if (!expRegEmail.test(userEmail)) {
            alert("Formato de email no válido.");
            event.preventDefault(); // Bloquea el envío si hay errores
            return;
        }

        // Calcular la edad
        const dob = new Date(userDob);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
            age--;
        }

        if (age < 18) {
            alert("Debes ser mayor de 18 años para completar el formulario.");
            event.preventDefault(); // Bloquea el envío si hay errores
            return;
        }

        alert("Formulario enviado con éxito.");
    });
});


// Array de productos
const products = [
    { id: 1, name: "Silent Hill T-shirt", price: 20000, description: "Remera de Pyramid Head.", image: "../IMG/remeraSH.jpg" },
    { id: 2, name: "Pyramid Head Figure", price: 50000, description: "Figura de Pyramid Head.", image: "../IMG/figuraPH.jpg" },
    { id: 3, name: "Silent Hill Poster", price: 15000, description: "Poster de Silent Hill.", image: "../IMG/posterSH.jpg" }
];

const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Variable para almacenar el total
let totalPrice = 0;

//Funcion para productos
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="../IMG/${product.image}" alt="${product.name}" style="width: 50%; height: Auto;">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="toggleDescription(${product.id})" id="toggle-description-${product.id}">Show Description</button>
            <div id="description-${product.id}" style="display: none;">
                <p>${product.description}</p>
            </div>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <br><br><br>
        `;
        productList.appendChild(productCard);
    });
}

// Visibilidad
function toggleDescription(productId) {
    const description = document.getElementById(`description-${productId}`);
    const toggleButton = document.getElementById(`toggle-description-${productId}`);
    
    if (description.style.display === "none" || description.style.display === "") {
        description.style.display = "block";
        toggleButton.innerHTML = "Hide Description";
    } else {
        description.style.display = "none";
        toggleButton.innerHTML = "Show Description";
    }
}

//Agregar al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }
}

// Cartas
function renderCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    totalPrice = 0; // Reiniciar el total cada vez que se renderiza el carrito

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price} x ${item.quantity}</p>
            <button onclick="changeQuantity(${item.id}, 1)">+</button>
            <button onclick="changeQuantity(${item.id}, -1)">-</button>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartDiv.appendChild(cartItem);

        // Sumar el precio de cada producto al total
        totalPrice += item.price * item.quantity;
    });

    // Mostrar el total
    const totalDiv = document.getElementById('total');
    if (!totalDiv) {
        const newTotalDiv = document.createElement('div');
        newTotalDiv.id = 'total';
        newTotalDiv.innerHTML = `<p>Total: $${totalPrice}</p>`;
        cartDiv.appendChild(newTotalDiv);
    } else {
        totalDiv.innerHTML = `<p>Total: $${totalPrice}</p>`;
    }

    // Agregar el botón "Comprar"
    const buyButton = document.createElement('button');
    buyButton.textContent = 'Comprar';
    buyButton.onclick = buyCart;
    cartDiv.appendChild(buyButton);
}

// Función para reiniciar el carrito (vaciarlo)
function buyCart() {
    // Vaciar el carrito y actualizar el localStorage
    localStorage.removeItem('cart');
    cart.length = 0;

    // Volver a renderizar el carrito vacío
    renderCart();

    // Mostrar un mensaje de éxito
    alert('¡Compra realizada con éxito! Gracias por su compra.');
}

// Cantidad
function changeQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// Remover items
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCart();
    }
}

// Actuzlizacion
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Inicializar
renderProducts();
renderCart();



