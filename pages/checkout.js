function getCartItems() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function displayCart() {
    const cartItems = getCartItems();
    const cartContainer = document.querySelector('.cart-container');
    const orderInfo = document.querySelector('.order-info');
    const emptyCart = document.querySelector('.empty-cart');
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceSpan = document.getElementById('total-price');

    if (cartItems.length === 0) {
        cartContainer.style.display = 'none';
        orderInfo.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }

    cartContainer.style.display = 'flex';
    orderInfo.style.display = 'flex';
    emptyCart.style.display = 'none';

    let totalPrice = 0;
    cartItemsDiv.innerHTML = '';

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        const itemName = document.createElement('span');
        itemName.className = 'cart-item-name';
        itemName.textContent = `${item.name} x${item.quantity || 1}`;
        
        const itemPrice = document.createElement('span');
        itemPrice.className = 'cart-item-price';
        const price = item.price * (item.quantity || 1);
        itemPrice.textContent = `${price.toLocaleString()}đ`;
        
        cartItem.appendChild(itemName);
        cartItem.appendChild(itemPrice);
        cartItemsDiv.appendChild(cartItem);
        
        totalPrice += price;
    });

    totalPriceSpan.textContent = `${totalPrice.toLocaleString()}đ`;
}

document.addEventListener('DOMContentLoaded', displayCart);