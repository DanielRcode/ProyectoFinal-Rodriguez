let totalStock = []

fetch("js/products.json")
.then(response => response.json())
.then(data => {
    totalStock = data
    drawProducts(totalStock)

})

const productContainer = document.querySelector(".product_container")
const typeButton = document.querySelectorAll(".type_button")
const qtyNumber = document.querySelector(".number-change")
const mainTitle = document.querySelector(".main_title")


let cart;
const cartLS = JSON.parse(localStorage.getItem("products-in-cart"))
if(cartLS){
cart = cartLS;
}else{
cart = []
}

updateNumber()

typeButton.forEach(button => {
    button.addEventListener("click", (e) => {
        if (e.currentTarget.id != "all-p") {
            mainTitle.innerHTML = e.currentTarget.id.toUpperCase()
            const buttonProduct = totalStock.filter(product => product.type === e.currentTarget.id)
            drawProducts(buttonProduct)
        } else {
            mainTitle.innerHTML = "ALL PRODUCTS"
            drawProducts(totalStock)
        }
    })
})



function drawProducts(el) {
    productContainer.innerHTML = ""
    el.forEach((prod) => {
        const { id, name, type, price, img } = prod
        productContainer.innerHTML += `<div class="product">
    <img class="product_image" src=${img} alt="product-image">
    <div class="product_details">
    <p class="product_title">${name}</p>
    <p class="product_price">$${price}</p>
    <button onclick="addProduct(${id})" class="product_addbtn">Add item</button></div>
</div>`
    })
}

function addProduct(id) {
    Toastify({
        text: "Product added",
        duration: 3000,
        close: false,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #DA0037, #D11212)",
          borderRadius: "2rem",
        },
        offset: {
            x: '2rem',
            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} 
      }).showToast();
    const item = totalStock.find((prod) => prod.id === id)
    if (cart.some(product => product.id === id)) {
        const index = cart.findIndex(product => product.id === id)
        cart[index].quantity++
        updateNumber()
    } else {
        item.quantity = 1
        cart.push(item)
        updateNumber()
    }
    localStorage.setItem("products-in-cart", JSON.stringify(cart))
    
}

function updateNumber() {
    let numberT = cart.reduce((acc, product) => acc + product.quantity, 0)
    qtyNumber.innerHTML = `${numberT}`
    localStorage.setItem("cart-number", JSON.stringify(numberT))
}
