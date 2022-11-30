const cardBody = document.querySelector("div#product")

//Guardar y Recuperar el Carrito con LocalStorage + JSON
const carrito = []
const guardarCarrito = ()=> (carrito.length > 0) && localStorage.setItem("CarritoCds", JSON.stringify(carrito))
const recuperarCarrito = ()=> JSON.parse(localStorage.getItem("CarritoCds")) || []
carrito.push(...recuperarCarrito())


const armarDivHTML = (cd)=> {
    return `
    <img src="${cd.imagen}" class="card-img-top" alt="${cd.nombre}" />
    <div id="product" class="card-body">
        <h5 class="card-title">${cd.nombre}</h5>
        <p class="card-text">${cd.anio}</p>
        <p class="card-text">${cd.precio}</p>
        <a href="${cd.spotify}" target="_blank"
            class="btn btn-primary"><i class="fa-brands fa-spotify"></i>
        </a>
        <a href="${cd.youtube}"
            target="_blank" class="btn btn-primary"><i class="fa-brands fa-youtube"></i>
        </a>
        <button id=${cd.codigo} type="button" class="btn btn-dark"><i class="fa-solid fa-cart-shopping"></i></button>
    </div>`
}


const cargarProductos = (array)=> {
    let divHTML = ""
        if (array.length > 0) {
            array.forEach((cd) => divHTML += armarDivHTML(cd))
        } else {
            divHTML = "<h2>Error al cargar productos</h2>"
        }
        cardBody.innerHTML = divHTML
}

//Activar el evento CLICK por cada botón dinámico generado
const activarClick = ()=> {
    const botonesAdd = document.querySelectorAll("button.btn.btn-dark")
          botonesAdd.forEach(btn => {
            btn.addEventListener("click", (e)=> {
                let resultado = buscarCd(e.target.id)
                    carrito.push(resultado)
                    console.clear()
                    console.table(carrito)
                    guardarCarrito()
            })
          })
}

cargarProductos(cds)
activarClick()

const buscarCd = (codigo)=> cds.find(cd => cd.codigo === parseInt(codigo))

function comprar() {
    let codigo = prompt(mensajeInicial)
        if (!parseInt(codigo)) {
            alert("⛔️ Error en el código ingresado.")
            return 
        }
        let cdElegido = buscarCd(codigo)
            carrito.push(cdElegido)
        let respuesta = confirm("¿Deseas llevar otro cd?")
        if (respuesta) {
            comprar()
        } else {
            finalizarCompra()
        }
}

function verCarrito() {
    if (carrito.length > 0) {
        const shopping = new Compra(carrito)
        alert(`El costo total es de $ ${shopping.obtenerSubtotal()}`)
    } else {
        alert("El carrito está vacío!")
    }
}

const btnVerCarrito = document.querySelector("button#verCarrito")
document.addEventListener("click", btnVerCarrito)
