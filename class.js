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

// const producto1 = new producto(1, "G&G", 320, "g&g.jpg" )

// const producto2 = new producto(2, "ICS", 425, "ares.jpg")

// const producto3 = new producto(3, "KWA", 260, "e&l.jpg")

// const producto4 = new producto(4, "E&L", 270, "ICS.jpg")

// const producto5 = new producto(5, "Krytac", 490, "krytac.jpg")

// const producto6 = new producto(6, "Ares", 280, "kwa.jpg")

let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
// let stock = []
