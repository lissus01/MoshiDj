document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.añadir-carrito');
    const carritoBoton = document.getElementById('carrito-boton-id');
    const carritoContador = document.getElementById('carrito-contador-id');
    const carritoPanel = document.getElementById('carrito-panel-id');
    const carritoCerrar = document.getElementById('carrito-cerrar-id');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito-id');
    const carritoTotal = document.getElementById('carrito-total-id');
    const carritoItems = document.querySelector('.carrito-items');

    let carrito = [];

    // Cargar el carrito desde localStorage al iniciar
    cargarCarritoDesdeLocalStorage();

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            const price = parseFloat(boton.getAttribute('data-price'));
            // Asegurarse de que el precio sea positivo
            if (price >= 0) {
                const item = {
                    name: boton.getAttribute('data-name'),
                    price: price,
                    quantity: 1 // Cantidad inicial
                };
                agregarAlCarrito(item);
            } else {
                console.error('Precio no válido:', price);
            }
        });
    });

    carritoBoton.addEventListener('click', () => {
        carritoPanel.classList.toggle('mostrar-carrito');
    });

    carritoCerrar.addEventListener('click', () => {
        carritoPanel.classList.remove('mostrar-carrito');
    });

    vaciarCarritoBtn.addEventListener('click', () => {
        carrito = [];
        guardarCarritoEnLocalStorage();
        actualizarCarrito();
    });

    function agregarAlCarrito(item) {
        // Verificar si el producto ya está en el carrito
        const productoExistente = carrito.find(producto => producto.name === item.name);
        if (productoExistente) {
            // Si existe, incrementar la cantidad
            productoExistente.quantity += 1;
        } else {
            // Si no existe, agregarlo al carrito con cantidad inicial 1
            carrito.push(item);
        }

        guardarCarritoEnLocalStorage();
        actualizarCarrito();

        // Desplegar automáticamente el carrito al agregar el primer producto
        if (carrito.length === 1) {
            carritoPanel.classList.add('mostrar-carrito');
        }
    }

    function actualizarCarrito() {
        carritoItems.innerHTML = '';
        let total = 0;
        carrito.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'carrito-item';
    
            // Crear contenedor para nombre, precio y cantidad
            const infoProducto = document.createElement('div');
            infoProducto.className = 'info-producto';
    
            // Mostrar nombre y precio del producto sin decimales
            const nombrePrecio = document.createElement('span');
            nombrePrecio.textContent = `${item.name} - ${Math.round(item.price * item.quantity).toLocaleString('es-CL')}`;
            infoProducto.appendChild(nombrePrecio);
            nombrePrecio.className = 'info-producto';
    
            // Crear contenedor para cantidad con botones de incremento y decremento
            const cantidadContenedor = document.createElement('div');
            cantidadContenedor.className = 'cantidad div-cantidad';
    
            // Botón de decremento (-)
            const btnDecrementar = document.createElement('button');
            btnDecrementar.textContent = '-';
            btnDecrementar.classList.add('button', 'decrementar'); // Clases añadidas
            btnDecrementar.addEventListener('click', () => {
                decrementarCantidad(index);
            });
            cantidadContenedor.appendChild(btnDecrementar);
    
            // Mostrar cantidad del producto
            const cantidad = document.createElement('span');
            cantidad.textContent = item.quantity;
            cantidadContenedor.appendChild(cantidad);
    
            // Botón de incremento (+)
            const btnIncrementar = document.createElement('button');
            btnIncrementar.textContent = '+';
            btnIncrementar.classList.add('button', 'incrementar'); // Clases añadidas
            btnIncrementar.addEventListener('click', () => {
                incrementarCantidad(index);
            });
            cantidadContenedor.appendChild(btnIncrementar);
    
            // Botón para eliminar todos los productos de este tipo
            const btnEliminarTipo = document.createElement('button');
            btnEliminarTipo.innerHTML = '&#10006;'; // Ícono de cruz en HTML
            btnEliminarTipo.classList.add('button', 'eliminar-tipo'); // Clases añadidas
            btnEliminarTipo.addEventListener('click', () => {
                eliminarProductosTipo(item.name);
            });
    
            cantidadContenedor.appendChild(btnEliminarTipo);
    
            infoProducto.appendChild(cantidadContenedor);
    
            li.appendChild(infoProducto);
            carritoItems.appendChild(li);
            total += item.price * item.quantity;
        });
    
        carritoContador.textContent = carrito.reduce((total, item) => total + item.quantity, 0);
    
        // Mostrar el total en pesos chilenos sin decimales
        carritoTotal.textContent = `${Math.round(total).toLocaleString('es-CL')}`;
    
        if (carrito.length > 0) {
            carritoContador.style.visibility = 'visible';
        } else {
            carritoContador.style.visibility = 'hidden';
        }
    }
    

    function decrementarCantidad(index) {
        if (carrito[index].quantity > 1) {
            carrito[index].quantity -= 1;
        } else {
            // Si la cantidad es 1, eliminar el producto del carrito
            carrito.splice(index, 1);
        }
        guardarCarritoEnLocalStorage();
        actualizarCarrito();
    }

    function incrementarCantidad(index) {
        carrito[index].quantity += 1;
        guardarCarritoEnLocalStorage();
        actualizarCarrito();
    }

    function eliminarProductosTipo(nombreProducto) {
        carrito = carrito.filter(item => item.name !== nombreProducto);
        guardarCarritoEnLocalStorage();
        actualizarCarrito();
    }

    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDesdeLocalStorage() {
        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
            actualizarCarrito();
        }
    }
});
