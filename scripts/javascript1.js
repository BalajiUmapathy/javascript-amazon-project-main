import{cart } from '../data/data.js'
import{products } from '../data/products.js'
let productsHTML = '';
products.forEach((product) =>
{
    productsHTML += `
            <div class="product-container">
            <div class="product-image-container">
            <img class="product-image"
                src= '${product.image}'>
            </div>

            <div class="product-name limit-text-to-2-lines">
            ${product.name}
            </div>

            <div class="product-rating-container">
            <img class="product-rating-stars"
                src="images/ratings//rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
            </div>

            <div class="product-price">
         $  ${(product.priceCents/100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
            <select >
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart " >
            <img src="images/icons/checkmark.png">
            Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id=' ${product.id}'>
            Add to Cart
            </button>
        </div>`;
});


$('.js-container').html(productsHTML);




$('.js-add-to-cart').on('click', function() {
    const productId = $(this).data("product-id");
    

    const quantitySelector = $(this).closest('.product-container').find('select');
   
    const quantity = Number(quantitySelector.val());
    
 
    
    
    $(this).closest('.product-container').find('.added-to-cart').css('opacity', 1);

    
    clearTimeout($(this).data('timeoutId'));

   
    const timeoutId = setTimeout(() => {
     $(this).closest('.product-container').find('.added-to-cart').css('opacity', 0);
    }, 2000);

  
    $(this).data('timeoutId', timeoutId);






   



    const existingProduct = cart.find(item => item.productId === productId);


    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({
            productId,
            quantity
        });
    }

    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    $('.js-cart-quantity').html(cartQuantity);
});
