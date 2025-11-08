document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const cartItemsList = document.getElementById('cart-items-list');
    const emptyCartMessage = document.getElementById('empty-cart');
    const cartContent = document.getElementById('cart-content');
    const subtotalElement = document.getElementById('subtotal');
    const discountElement = document.getElementById('discount');
    const totalPriceElement = document.getElementById('total-price');
    const clearCartBtn = document.getElementById('clear-cart');
    const cartBadge = document.getElementById('cart-badge');
    const toastContainer = document.getElementById('toast-notification');

    // Get cart from localStorage
    function getCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    // Save cart to localStorage
    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Format price to VND
    function formatPrice(price) {
        return price.toLocaleString('vi-VN') + 'đ';
    }

    // Show toast notification
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    /* Update cart badge
    function updateCartBadge() {
        const cart = getCart();
        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        
        if (totalQuantity > 0) {
            cartBadge.textContent = totalQuantity;
            cartBadge.style.display = 'inline-block';
        } else {
            cartBadge.style.display = 'none';
        }
    }
    */

    // Calculate total
    function calculateTotal() {
        const cart = getCart();
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const discount = 0; // Can add discount logic here
        const total = subtotal - discount;

        subtotalElement.textContent = formatPrice(subtotal);
        discountElement.textContent = formatPrice(discount);
        totalPriceElement.textContent = formatPrice(total);
    }

    // Update item quantity
    function updateQuantity(itemId, change) {
        const cart = getCart();
        const itemIndex = cart.findIndex(item => item.id === itemId);

        if (itemIndex > -1) {
            cart[itemIndex].quantity += change;

            // Remove item if quantity is 0 or less
            if (cart[itemIndex].quantity <= 0) {
                const itemName = cart[itemIndex].name;
                cart.splice(itemIndex, 1);
                showToast(`Đã xóa "${itemName}" khỏi giỏ hàng`, 'error');
            } else {
                showToast('Đã cập nhật số lượng', 'success');
            }

            saveCart(cart);
            renderCart();
            // updateCartBadge();
        }
    }

    // Remove item from cart
    function removeItem(itemId) {
        const cart = getCart();
        const itemIndex = cart.findIndex(item => item.id === itemId);

        if (itemIndex > -1) {
            const itemName = cart[itemIndex].name;
            cart.splice(itemIndex, 1);
            saveCart(cart);
            renderCart();
            // updateCartBadge();
            showToast(`Đã xóa "${itemName}" khỏi giỏ hàng`, 'error');
        }
    }

    // Clear all cart
    function clearCart() {
        if (confirm('Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
            localStorage.removeItem('cartItems');
            renderCart();
            // updateCartBadge();
            showToast('Đã xóa toàn bộ giỏ hàng', 'error');
        }
    }

    // Render cart items
    function renderCart() {
        const cart = getCart();

        // Show/hide empty message
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartContent.style.display = 'none';
            return;
        }

        emptyCartMessage.style.display = 'none';
        cartContent.style.display = 'block';
        cartItemsList.innerHTML = '';

        // Render each cart item
        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.img || 'img/placeholder.jpg'}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <div class="cart-item-actions">
                        <div class="quantity-controls">
                            <button class="quantity-btn" data-id="${item.id}" data-action="decrease">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" data-id="${item.id}" data-action="increase">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <button class="btn-remove" data-id="${item.id}">
                            <i class="fas fa-trash"></i> Xóa
                        </button>
                    </div>
                    <div class="cart-item-total" style="color: var(--secondary); font-weight: 600; margin-top: 10px;">
                        Tổng: ${formatPrice(item.price * item.quantity)}
                    </div>
                </div>
            `;
            cartItemsList.appendChild(cartItemDiv);
        });

        calculateTotal();
    }

    // Event delegation for cart actions
    cartItemsList.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target) return;

        const itemId = parseInt(target.dataset.id);
        const action = target.dataset.action;

        if (action === 'increase') {
            updateQuantity(itemId, 1);
        } else if (action === 'decrease') {
            updateQuantity(itemId, -1);
        } else if (target.classList.contains('btn-remove')) {
            removeItem(itemId);
        }
    });

    // Clear cart button
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    // Initial render
    renderCart();
    // updateCartBadge();

    // Add CSS animation for toast slideOut
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideOut {
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});