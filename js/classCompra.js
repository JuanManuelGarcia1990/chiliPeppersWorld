class Compra {
  constructor(carrito) {
    this.carrito = carrito;
  }
  totalAPagar() {
    return carrito.reduce((acc, el) =>  acc + el.precio * el.cantidad, 0).toFixed(2);
  }
}
  