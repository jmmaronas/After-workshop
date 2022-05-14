console.log("main.js")

const cardContainer = document.getElementById("cardContainer")
const contenedorTabla= document.getElementById("tablaCarrito")

function mostrarProductos(array) {
    cardContainer.innerHTML = ""
    array.forEach(element => {
        cardContainer.innerHTML += `
        <div class="col mb-5">
            <div class="card h-100">
                <img class="card-img-top" src="${element.img}" alt="..." />
                <div class="card-body p-4">
                <div class="text-center">
                    <h5 class="fw-bolder">${element.nombre}</h5>
                    <p>${element.detalle} </p>
                    $${element.precio}
                </div>
            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center">
                    <button id="${element.id}" class="agregar btn btn-outline-dark mt-auto">View options</button>
                </div>
            </div>
        </div>
        `

    });
}

function mostrarCarrito() {
    let carrito = capturarStorage()
    contenedorTabla.innerHTML = ""
    carrito.forEach(element => {
        contenedorTabla.innerHTML += `.
        <tr>
            <th scope="row">${element.cantidad}</th>
            <td>${element.nombre}</td>
            <td>${element.precio}</td>
            <td><button>x</button></td>
        </tr>       
        `
    })

}

function capturarStorage() {
    return JSON.parse(localStorage.getItem("carrito")) || []
}

function guardarStorage(array) {
    localStorage.setItem("carrito", JSON.stringify(array))
}

function agregar(idParam) {
    let carrito = capturarStorage()
    if (isInCart(idParam)) {        
        incrementarCantidad(idParam)
    } else {
        let productoEncontrado = productos.find(e => e.id == idParam)
        carrito.push({ ...productoEncontrado, cantidad: 1 })
        guardarStorage(carrito)
        mostrarCarrito(carrito)
    }
}

function incrementarCantidad(id) {
    let carrito = capturarStorage()
    const indice = carrito.findIndex(e => e.id == id)
    carrito[indice].cantidad++
    guardarStorage(carrito)
    mostrarCarrito(carrito)
}

function isInCart(id) {
    let carrito = capturarStorage()
    return carrito.some(e => e.id == id)
}

function filtrar(array, dato){
    return array.filter(e=> e.categoria == dato);    
}

function buscar(array, dato){
    let resultado=array.filter(e=> e.detalle.toLowerCase().match(dato.toLowerCase()))
    return resultado
}

mostrarProductos(productos)
mostrarCarrito()
document.querySelector("#filtrar").addEventListener("change",(e)=>{    
    e.target.value!=" " ?  mostrarProductos(filtrar(productos, e.target.value)) : mostrarProductos(productos);
});
document.querySelector("#buscador").addEventListener("input",(e)=>{    
    mostrarProductos(buscar(productos, e.target.value)) 
});

cardContainer.addEventListener("click",e=>{
    if(e.target.classList.contains("agregar")){
        agregar(e.target.id)
    }
})