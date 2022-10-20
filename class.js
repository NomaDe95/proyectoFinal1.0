class Producto {
  constructor(id, marca, precio, imagen) {
    (this.id = id),
      (this.marca = marca),
      (this.precio = precio),
      (this.imagen = imagen);
  }
}

let stock = [];
const cargarProductos = async () => {
  if (localStorage.getItem("stock")) {
    stock = JSON.parse(localStorage.getItem("stock"));
    return stock;
  } else {
    // stock.push(producto1, producto2, producto3, producto4, producto5, producto6)
    // localStorage.setItem("stock", JSON.stringify(stock))

    const response = await fetch("productos.json");
    const data = await response.json();
    console.log(data);
    for (let producto of data) {
      let productoNuevo = new Producto(
        producto.id,
        producto.marca,
        producto.precio,
        producto.imagen
      );
      stock.push(productoNuevo);
    }
    return stock;
  }
};


let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
