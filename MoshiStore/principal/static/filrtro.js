// Función para filtrar productos por categoría
function filtrar(categoria) {
    // Obtenemos todos los productos
    var productos = document.querySelectorAll('.item');

    // Si la categoría es 'todos', mostramos todos los productos
    if (categoria === 'todos') {
        productos.forEach(function(producto) {
            producto.style.display = 'block';
        });
    } else {
        // Ocultamos todos los productos
        productos.forEach(function(producto) {
            producto.style.display = 'none';
        });

        // Mostramos solo los productos de la categoría seleccionada
        var productosCategoria = document.querySelectorAll('.item.' + categoria);
        productosCategoria.forEach(function(producto) {
            producto.style.display = 'block';
        });
    }
}


