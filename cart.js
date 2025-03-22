let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("DOMContentLoaded", () => {
    actualizarCarrito();
    if (document.getElementById("carrito-container")) {
        mostrarCarrito();
    }
});

function agregarAlCarrito(id) {
    const productos = [
        { id: 1, nombre: "Crema de Aloe", precio: 15, imagen: "img/aloe.jpg" },
        { id: 2, nombre: "Jabón de Lavanda", precio: 8, imagen: "img/lavanda.jpg" },
        { id: 3, nombre: "Aceite de Coco", precio: 12, imagen: "img/coco.jpg" }
    ];

    const producto = productos.find(p => p.id === id);
    const item = carrito.find(p => p.id === id);
    if (item) {
        item.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    document.getElementById("cart-count").textContent = carrito.reduce((acc, p) => acc + p.cantidad, 0);
}

function mostrarCarrito() {
    const container = document.getElementById("carrito-container");
    container.innerHTML = "";
    carrito.forEach(p => {
        const div = document.createElement("div");
        div.innerHTML = `
            <img src="${p.imagen}" width="100">
            <h3>${p.nombre}</h3>
            <p>Precio: $${p.precio}</p>
            <p>Cantidad: ${p.cantidad}</p>
            <button onclick="eliminarDelCarrito(${p.id})">Eliminar</button>
        `;
        container.appendChild(div);
    });
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(p => p.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    actualizarCarrito();
}

function pagar() {
    alert("Gracias por tu compra!");
}
