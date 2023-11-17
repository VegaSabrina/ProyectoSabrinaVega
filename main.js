//Condicional para ejecutar desplegable de registro
const iconoRegistro=
  document.getElementById("IconoRegistro");
const formulario=
  document.querySelector(".RegistroForm");

iconoRegistro.addEventListener("click", () => {
  if (formulario.style.display === "none") {
    formulario.style.display="block";
  }
  else {formulario.style.display="none";
}
});




//Condicional para ejecutar desplegable de carrito
const iconoCarrito=
  document.getElementById("IconoCarrito");
const carrito=
  document.querySelector(".DesplegableCarrito");

iconoCarrito.addEventListener("click", () => {
  if (carrito.style.display === "none") {
    carrito.style.display="block";
  }
  else {carrito.style.display="none";
}
});




//Condicional para input de búsqueda 
function searchProducts() {
  let input = document.getElementById("BusquedaProducto").value.toLowerCase();
  let productos = document.querySelectorAll('.ProductoDestacado,.ProductoOferta,.ProductoPerro,.ProductoGato');

  productos.forEach(producto => {
    let nombre = producto.querySelector('p').innerText.toLowerCase();
    if (nombre.includes(input)) {
      producto.style.display = 'block';
    } else {
      producto.style.display = 'none';
    }
  });
}
// Evento para activar la búsqueda presionando Enter en input de búsqueda
document.getElementById("BusquedaProducto").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    searchProducts();
  }
});
// Evento para activar la búsqueda clickeando icono de lupa
document.getElementById("IconoBusqueda").addEventListener("click", function() {
  searchProducts();
});




//Evento para agregar productos al carrito
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const carritoLista = document.getElementById("carrito-lista");
  const totalElement = document.getElementById("total");
  let total = 0;

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const price = parseFloat(button.getAttribute("data-price"));
      const productName = button.getAttribute("data-name");

      // Creo la lista con nombre de producto,precio y botón de eliminar
      const li = document.createElement("li");
      li.textContent = productName + " - $" + price;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.classList.add("delete-button");

      // Almacenar el precio del producto en el botón de eliminar
      deleteButton.setAttribute("data-price", price);

      li.appendChild(deleteButton);
      carritoLista.appendChild(li);

      // Para actualizar el valor total del carrito con el producto eliminado
      total += price;
      totalElement.textContent = total;
    });
  });

  // Evento para eliminar el producto al hacer clic en el botón eliminar
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-button")) {
      // Obtener el precio del producto directamente del botón de eliminar
      const deletedPrice = parseFloat(
        event.target.getAttribute("data-price")
      );

      // Restar el precio del producto eliminado del total y mostrar el total actualizado
      total -= deletedPrice;
      totalElement.textContent = total;

      // Eliminar el elemento del carrito
      event.target.parentElement.remove();
    }
  });
});




//Filtros de categoria sección perros y sección gatos
document.addEventListener('DOMContentLoaded', function () {
  const productos = document.querySelectorAll('.ProductoPerro,.ProductoGato');
  const checkboxesCategorias = document.querySelectorAll('.filtro-tarjeta');

  checkboxesCategorias.forEach(function (checkbox) {
      checkbox.addEventListener('change', function () {
          filtrarProductos();
      });
  });

  function filtrarProductos() {
      const categoriasSeleccionadas = obtenerCategoriasSeleccionadas();

      productos.forEach(function (producto) {
          const categoriasProducto = obtenerCategoriasProducto(producto);

          if (categoriasSeleccionadas.length === 0 || tieneInterseccion(categoriasProducto, categoriasSeleccionadas)) {
              producto.style.display = 'block';
          } else {
              producto.style.display = 'none';
          }
      });
  }

  function obtenerCategoriasSeleccionadas() {
      const categoriasSeleccionadas = [];

      checkboxesCategorias.forEach(function (checkbox) {
          if (checkbox.checked) {
              categoriasSeleccionadas.push(checkbox.getAttribute('data-target'));
          }
      });
      return categoriasSeleccionadas;
  }

  function obtenerCategoriasProducto(producto) {
      const categoriasProducto = [producto.id];
      return categoriasProducto;
  }

  function tieneInterseccion(arr1, arr2) {
      return arr1.some(item => arr2.includes(item));
  }
});




