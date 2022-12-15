const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");
const inputSearch = document.getElementById("inputSearch");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let products = [];

//Base de datos traida con fetch
const DB = "../database/products.json";
function cargarProductos() {
  fetch(DB)
    .then((response) => response.json())
    .then((json) => products.push(...json))
    .then(() => cards(products))
    .catch((error) => {
      console.log(error);
    });
}
cargarProductos();

//Generar Cards
function cards() {
  products.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p> $ ${product.precio}</p>
  `;
    shopContent.append(content);

    //Boton comprar/agregar al carrito
    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";
    content.append(comprar);
    comprar.addEventListener("click", () => {
      const repeat = carrito.some(
        (repeatProduct) => repeatProduct.id === product.id
      );
      if (repeat) {
        carrito.map((prod) => {
          if (prod.id === product.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: product.id,
          img: product.img,
          nombre: product.nombre,
          precio: product.precio,
          cantidad: product.cantidad,
        });
        Swal.fire({
          position: "center",
          background: "black",
          width: "50%",
          title: "Producto agregado al carrito",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        carritoCounter();
        saveLocal();
      }
    });
  });
}

//Fijar productos en el carrito por si cerramos por error la página
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

cards();
