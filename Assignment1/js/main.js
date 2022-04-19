if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready);
}
else {
    ready();
}

function ready() {

    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var qtyInputs = document.getElementsByClassName("cart-qty");
    for (var i = 0; i < qtyInputs.length; i++) {

        var input = qtyInputs[i];
        input.addEventListener("change", updateTotal);

    }


    var addCarts = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCarts.length; i++) {

        var button = addCarts[i];
        button.addEventListener("click", addCartClicked);

    }

    document.getElementsByClassName("pay-now")[0].addEventListener("click", buyNow)

}

function buyNow(){
    alert("your Order is Placed")
    var cart_content = document.getElementsByClassName("cart-content")[0];
    var boxes= cart_content.getElementsByClassName("cart-box")
     for (var i=0; i< boxes.length; i++){
         boxes[i].remove();
     }

     updateTotal()
}


function addCartClicked(event) {
    var button = event.target
    var product = button.parentElement
    var title = product.getElementsByClassName("food-title")[0].innerText
    var price = product.getElementsByClassName("price")[0].innerText
    var food_image = product.getElementsByClassName("food-image")[0].src
    // console.log(title+" "+price+" "+food_image)
    addProductToCart(title, price, food_image)
    updateTotal()
}



function addProductToCart(title, price, food_image) {

    var cart_box = document.createElement("div");
    cart_box.classList.add("cart-box");
    var cart_content = document.getElementsByClassName("cart-content")[0];
    var cart_items_names = cart_content.getElementsByClassName("cart-food-item");
    for (var i = 0; i < cart_items_names.length; i++) {
        if (cart_items_names[i].innerText == title) {
            alert("You have Already Added Item to Cart")
            return
        }
    }


    var cartBoxContent = '<img src="img/1.webp" class="cart-image"> <div class="detail-box"> <div class="cart-food-item">Mac Chicken</div> <div class="cart-price">$25</div> <input type="number" value="1" class="cart-qty" min="1" max="25"> </div> <i class="fa fa-trash cart-remove" aria-hidden="true"></i>';

    cart_box.innerHTML = cartBoxContent
    cart_content.appendChild(cart_box);
    cart_box.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cart_box.getElementsByClassName("cart-qty")[0].addEventListener("change", updateTotal);
}



function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove()
    updateTotal()
}


function updateTotal() {

    var cartContent = document.getElementById("cart");
    var cartBoxes = cartContent.getElementsByClassName("cart-box")
    var total = 0
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName("cart-price")[0]
        var qtyElement = cartBox.getElementsByClassName("cart-qty")[0]
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var qty = qtyElement.value;
        total = total + (price * qty);
        console.log(total);
        document.getElementsByClassName("total-price")[0].innerText = "$" + total;

    }


}    