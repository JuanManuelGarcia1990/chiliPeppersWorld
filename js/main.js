let card = document.getElementById("cardTienda")

productos.map((x)=> {
    card.innerHTML += ` 
    <div class="producto">
    <img src="${x.imagen}" alt="${x.nombre}">
    <p>${x.nombre}</p>
    <p>${x.precio}</p>
    <p>${x.id}</p>
    <button class="button" title="Agregar al carrito">🛒</button>
</div>`
})