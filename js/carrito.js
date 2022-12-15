let compra = new Compra();

//Crear Modal Carrito
const modalCarrito = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
        <h1 class="modal-header-title">Carrito</h1>
      `;
  modalContainer.append(modalHeader);

  //Boton de cierre del modal
  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "x";
  modalbutton.className = "modal-header-button";
  modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalbutton);

  //Mostrar productos agregados en el modal
  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
          <img src="${product.img}">
          <h3>${product.nombre}</h3>
          <p>$ ${product.precio}</p>
          <span class="restar"> - </span>
          <p>${product.cantidad}</p>
          <span class="sumar"> + </span>
          <p>Total: $ ${product.cantidad * product.precio}</p>
          <span class="delete-product"> ❌ </span>
        `;

    modalContainer.append(carritoContent);

    //Restar productos en el modal
    let restar = carritoContent.querySelector(".restar");
    restar.addEventListener("click", () => {
      if (product.cantidad !== 1) {
        product.cantidad--;
      }
      saveLocal();
      modalCarrito();
    });

    //Sumar productos en el modal
    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      product.cantidad++;
      saveLocal();
      modalCarrito();
    });

    //Eliminar productos del modal
    let eliminar = carritoContent.querySelector(".delete-product");
    eliminar.addEventListener("click", () => {
      eliminarProducto(product.id);
    });
  });

  //Modal Precio Total
  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `<p id="total">Total a pagar $ ${compra.totalAPagar()}</p> `;
  modalContainer.append(totalBuying);

  // Finalización de compra, vaciado de carrito, del contador de carrito, y se cierra el modal
  const modalCompra = document.createElement("div");
  modalCompra.className = "modal-compra";
  modalContainer.append(modalCompra);
  const botonCompra = document.createElement("button");
  botonCompra.innerText = "Comprar";
  botonCompra.className = "botonCompra";
  modalCompra.append(botonCompra);
  botonCompra.addEventListener("click", () => {
    Swal.fire({
      background: "#121212",
      width: "50%",
      title: "¿Desea confirmar la compra?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          background: "black",
          width: "50%",
          icon: "success",
          title: "¡Compra finalizada con éxito!",
          text: "Muchas gracias por su compra",
          color: 'white'
        });
        carrito.length = [];
        carritoCounter();
        modalCarrito();
        modalContainer.style.display = "none";
      }
    });
  });
};

//Ver productos dentro del modal
verCarrito.addEventListener("click", modalCarrito);

//Eliminar Productos dentro del modal
const eliminarProducto = (id) => {
  const foundId = carrito.find((element) => element.id === id);
  console.log(foundId);
  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });
  carritoCounter();
  saveLocal();
  modalCarrito();
};

//Muestra cantidad de elementos agregados al carrito
const carritoCounter = () => {
  cantidadCarrito.style.display = "block";
  const carritoLength = carrito.length;
  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();
