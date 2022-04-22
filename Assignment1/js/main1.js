$(document).ready(function(){
  
   $("#cart-item-count").hide();



   $(".add-to-cart").click(function(event){
       event.preventDefault();
       $("#empty-cart").hide();
       $(`#cart-total`).remove();
       var menuItem = $(this).closest(".menu-item");
       var menuId = $(menuItem).attr('id');
        
       var title= $(menuItem).find(".card-title").text();
       
       var itemQty = $(menuItem).find(".qty").val();
       
       var itemPrice = $(menuItem).find(".price").data("price");
       var menuImg = $(menuItem).find(".menu-img").attr("src");
       

       if ($(`#cart-${menuId}`).length > 0) {
        console.log(menuId, title, itemQty, itemPrice,menuImg)
        var qty = $(`#cart-${menuId}`).find(".cart-menu-qty").text();
        $(`#cart-${menuId}`).find(".cart-menu-qty").text(parseInt(itemQty) + parseInt(qty));
        var subPrice = parseInt($(`#cart-${menuId}`).find(".cart-menu-qty").text()) * parseFloat(itemPrice);
        $(`#cart-${menuId}`).find(".cart-menu-price").text(`$${subPrice}`);
       }

       else{

       var subPrice = parseFloat(itemPrice) * parseInt(itemQty);
       var html = `<div class='row mt-1' id='cart-${menuId}'><div class='col-md-2 cart-menu-qty'>${itemQty}</div><div class='col-md-2'><img src="${menuImg}" class="cart-image"></div><div class='col-md-4'>${title}</div><div class='col-md-4'><strong class='cart-menu-price'>$${subPrice}</strong><a href='javascript:;' class='remove-item'><i class="fa fa-trash cart-remove" aria-hidden="true"></i> </a></div></div>`;
       $("#cart-items").append(html);
       }
       updateCartTotal()

   });
   //$('.remove-item').click(function(e){
 $(document).on('click', '.remove-item', function (e) {
    e.preventDefault();
    $(this).closest(".row").remove();
    updateCartTotal();
});

function updateCartTotal() {
    var totalPrice = 0;
    var totalQty = 0;
    $('.cart-menu-price').each(function () {
        totalPrice += parseFloat($(this).text().replace('$', ''));
    });
    $('.cart-menu-qty').each(function () {
        totalQty += parseInt($(this).text());
    });
    if ($(`#cart-total`).length > 0) {
        $(`#cart-total`).find(".cart-total-price").text(`$${totalPrice}`);
    } else {
        var html = `<div class='row mt-1' id='cart-total' style='font-size: 22px;'><div class='col-md-2 cart-menu-tqty'></div><div class='col-md-6'>Total</div><div class='col-md-4'><div class='cart-total-price' style='font-weight: 600;'>$${totalPrice}</div></div></div>`;
        $("#cart-items").append(html);
    }
    $("#cart-item-count").text(totalQty);
    $("#cart-item-count").show();
    if (totalQty <= 0) {
        $("#cart-total").remove();
        $("#empty-cart").show();
    }
}

  });