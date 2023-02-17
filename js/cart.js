const cartContainer = document.querySelector(".cart_container")
let cartinLS = localStorage.getItem("products-in-cart")
let cart = JSON.parse(cartinLS)
const cartTotal = document.querySelector("#total")
const clearBtn = document.querySelector(".cart_actions-clear")
const emptyCart = document.querySelector(".empty_cart")
const cartActions = document.querySelector(".cart_actions")
const purchaseBtn = document.querySelector(".cart_actions-complete")
const mainTitle = document.querySelector(".main_title")

clearBtn.addEventListener("click", clearCart)

purchaseBtn.addEventListener("click", processPurchase)

drawCart()

function drawCart() {
    cartContainer.innerHTML = ""
    if(cart && cart.length > 0){

        let totalCart = cart.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0)

    cart.forEach((prod) => {
        const { id, name, price, quantity, img } = prod
        const subtotal = price * quantity
        cartContainer.innerHTML += `<div class="cart_product">
        <img
          class="cart_product-image"
          src="${img}"
          alt="cart-image"
        />
        <div class="cart_product-title">
          <small>Title</small>
          <h3>${name}</h3>
        </div>
        <div class="cart_product-quantity">
          <small>Quantity</small>
          <p>${quantity}</p>
        </div>
        <div class="cart_product-price">
          <small>Price</small>
          <p>$${price}</p>
        </div>
        <div class="cart_product-subtotal">
          <small>Subtotal</small>
          <p>$${subtotal}</p>
        </div>
        <button onclick="deleteProduct(${id})" class="cart_product-delete">
          <i class="bi bi-trash3-fill"></i>
        </button>
      </div>`
    });
    cartTotal.innerHTML = `$${totalCart}`
    }
    else{
        emptyCart.style.display = "block"
        cartActions.style.display = "none"
    }
    
    
}


function deleteProduct(id) {
  Toastify({
    text: "Product removed",
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
    const item = cart.find((prod) => prod.id === id)
    let index = cart.findIndex((prod) => prod.id === id)
    cart.splice(index, 1)
    localStorage.setItem("products-in-cart", JSON.stringify(cart))
    let finalTotal = cart.reduce((acc, prod) => acc + prod.quantity, 0)
    localStorage.setItem("cart-number", JSON.stringify(finalTotal))

    drawCart()
   

}

function clearCart() {
  Swal.fire({
    title: 'Are you sure you want to clear your cart?',
    icon: 'question',
    html:
      `This will remove ${cart.reduce((acc, product) => acc + product.quantity, 0)} products`,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText:
      'Yes',
    cancelButtonText:
      'No'
  })

  .then((result) => {
    if (result.isConfirmed) {
      cart.length = 0
    localStorage.clear()
    cartContainer.innerHTML = ""
    emptyCart.style.display = "block"
    cartActions.style.display = "none"
    } 
  })
}

function processPurchase(){
    cart.length = 0
    localStorage.clear()
    cartContainer.innerHTML = ""
    mainTitle.innerHTML=`Have a nice day!`
    emptyCart.innerHTML= `Thank you for your purchase <i class="bi bi-emoji-laughing"></i>`
    emptyCart.style.display = "block"
    cartActions.style.display = "none"
}
