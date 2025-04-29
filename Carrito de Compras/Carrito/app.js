class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
        this.actualizarCarrito();
    }

    eliminarProducto(id) {
        this.productos = this.productos.filter(p => p.id !== id);
        this.actualizarCarrito();
    }

    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.precio, 0);
    }

    actualizarCarrito() {
        const listaCarrito = document.querySelector("#carrito ul");
        listaCarrito.innerHTML = "";

        this.productos.forEach((p) => {
            const li = document.createElement("li");
            li.textContent = `${p.nombre} - $${p.precio.toLocaleString()}`;

            const boton = document.createElement("button");
            boton.textContent = "❌";
            boton.classList.add("eliminar");
            boton.onclick = () => this.eliminarProducto(p.id);

            li.appendChild(boton);
            listaCarrito.appendChild(li);
        });

        document.getElementById("total").textContent = this.calcularTotal().toLocaleString();
    }
}

const carrito = new Carrito();

// Manejo del scroll para el header
const header = document.querySelector("#header");
const contenedor = document.querySelector("#contenedor");

window.addEventListener("scroll", function () {
    if (contenedor.getBoundingClientRect().top < 10) {
        header.classList.add("scroll");
    } else {
        header.classList.remove("scroll");
    }
});

// Capturar productos desde la tienda y añadirlos al carrito
document.querySelectorAll(".contenedor > div").forEach((productoDiv, index) => {
    const nombre = productoDiv.querySelector(".informacion p").textContent;
    const precioTexto = productoDiv.querySelector(".precio").textContent.replace(/[^0-9]/g, "");
    const precio = parseFloat(precioTexto) || 0;

    const boton = productoDiv.querySelector("button");
    boton.addEventListener("click", () => {
        const producto = new Producto(index + 1, nombre, precio);
        carrito.agregarProducto(producto);
    });
});

// Mostrar / Ocultar el carrito al hacer clic en el botón
const btnCarrito = document.getElementById("btnCarrito");
const carritoDiv = document.getElementById("carrito");

btnCarrito.addEventListener("click", () => {
    carritoDiv.classList.toggle("visible");
});
