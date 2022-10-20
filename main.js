//Indicar que se es mayor de edad
let ingresoEdad = prompt("Ingrese su edad");

if (ingresoEdad >= 18) {
  console.log("Es mayor de edad y puede continuar");
} else {
  alert("Usted es menor y no puede continuar");
}

let divStock = document.getElementById("stock");
function stockProductos(array) {
  divStock.innerHTML = "";
  array.forEach((producto) => {
    let nuevoProducto = document.createElement("div");
    nuevoProducto.innerHTML = `<div id="${producto.id}" class="card" style="width: 18rem;">
                                        <img class="card-img-top" style="height: 250px;"src="assets/img/${producto.imagen}" alt="${producto.marca} ">
                                        <div class="card-body">
                                            <h4 class="card-title">${producto.marca}</h4>
                                            <p>Marca: ${producto.marca}</p>
                                            <p class="">Precio: usd ${producto.precio}</p>
                                            <button id="agregarBtn${producto.id}" class="btn btn-outline-success btnCompra">Agregar al carrito</button>
                                        </div>
                                    </div>`;
    divStock.append(nuevoProducto);

    let btnAgregar = document.getElementById(`agregarBtn${producto.id}`);
    console.log(btnAgregar);
    btnAgregar.addEventListener("click", () => {
      console.log(producto);
      agregarAlCarrito(producto);
    });
  });
}

cargarProductos().then((stock) => {
  stockProductos(stock);
});

function agregarAlCarrito(producto) {
  productosEnCarrito.push(producto);
  console.log(productosEnCarrito);
  localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));

  Toastify({
    text: "Su producto ha sido agreado al carrito",
    duration: 3000,
    gravity: "bottom", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#fc2c03",
    },
  }).showToast();
}

//DOM Carrito
let botonCarrito = document.getElementById("botonCarrito");
let modalBody = document.getElementById("modal-body");
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra");
let parrafoCompra = document.getElementById("precioTotal");

botonCarrito.addEventListener("click", () => {
  cargarProductosCarrito(productosEnCarrito);
});

function cargarProductosCarrito(array) {
  modalBody.innerHTML = "";
  array.forEach((productoCarrito) => {
    modalBody.innerHTML += `
            <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 250px;">
            <img class="card-img-top" src="assets/img/${productoCarrito.imagen}" alt="${productoCarrito.marca}">
            <div class="card-body">
                    <h4 class="card-title">${productoCarrito.marca}</h4>
                
                    <p class="card-text">Precio: usd ${productoCarrito.precio}</p> 
                    <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
            </div>    
        
        
        </div>
`;
    // document.getElementById(`botonEliminar${productoCarrito.id}`)
    console.log(document.getElementById(`botonEliminar${productoCarrito.id}`))
  });

  array.forEach((productoCarrito, indice)=>{
    document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click",()=>{
      console.log(`El producto eliminado es ${productoCarrito.marca}`)

      array.splice(indice, 1)
      console.log(array)

      localStorage.setItem("carrito", JSON.stringify(array))

      let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
      console.log(cardProducto)
      cardProducto.remove()
      totalCompra(array)
    })
  })

  totalCompra(array);
}

function totalCompra(array) {
  let acumulador = 0;

  acumulador = array.reduce((acumulador, productoCarrito) => {
    return acumulador + productoCarrito.precio;
  }, 0);

  acumulador == 0
    ? (parrafoCompra.innerHTML = `<strong>Carrito vacío</strong>`)
    : (parrafoCompra.innerHTML = `El total de su carrito es ${acumulador}`);
}

botonFinalizarCompra.addEventListener("click", () => {
  finalizarCompra();
});

function finalizarCompra() {
  //pregunta si esta seguro
  Swal.fire({
    title: "¿Está seguro de realizar la compra?",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Si",
    cancelButtonText: "No",
    confirmButtonColor: "green",
    cancelButtonColor: "red",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Compra realizada",
        icon: "success",
        confirmButtonColor: "green",
        text: `Muchas gracias por su adquisición!.`,
      });
      //reset al array y al localStorage
      productosEnCarrito = [];
      localStorage.removeItem("carrito");
    } else {
      Swal.fire({
        title: "Compra no realizada",
        icon: "info",
        text: `Sus productos permanecen en el carrito`,
        confirmButtonColor: "green",
        timer: 3500,
      });
    }
  });


}
