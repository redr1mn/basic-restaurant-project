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

    const isEmpty = cartItems.length === 0;
    cartContainer.style.display = isEmpty ? 'none' : 'flex';
    orderInfo.style.display = isEmpty ? 'none' : 'flex';
    emptyCart.style.display = isEmpty ? 'flex' : 'none';
    if (isEmpty) return;

    let totalPrice = 0;
    cartItemsDiv.innerHTML = '';

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        const itemName = document.createElement('span');
        itemName.className = 'cart-item-name';
        itemName.textContent = item.name;

        const detailsRight = document.createElement('div');
        detailsRight.className = 'cart-item-meta';

        const itemQuantity = document.createElement('span');
        itemQuantity.className = 'cart-item-quantity';
        itemQuantity.textContent = `Số lượng: ${item.quantity || 1}`;
        
        const itemPrice = document.createElement('span');
        itemPrice.className = 'cart-item-price';
        const price = item.price * (item.quantity || 1);
        itemPrice.textContent = `${price.toLocaleString()}đ`;
        
        cartItem.appendChild(itemName);
        detailsRight.appendChild(itemQuantity);
        detailsRight.appendChild(itemPrice);
        cartItem.appendChild(detailsRight);
        cartItemsDiv.appendChild(cartItem);
        
        totalPrice += price;
    });

    totalPriceSpan.textContent = `${totalPrice.toLocaleString()}đ`;
}

document.addEventListener('DOMContentLoaded', () => {
    displayCart();

    // Auto-focus next card number input
    const cardInputs = document.querySelectorAll('.card-num-input');
    cardInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            e.target.value = value.replace(/[^0-9]/g, '');
            if (e.target.value.length === 4 && index < cardInputs.length - 1) {
                cardInputs[index + 1].focus();
            }
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                cardInputs[index - 1].focus();
            }
        });
    });

    const checkoutForm = document.querySelector('.order-info'); 

    // Toggle UI for payment methods (simple image QR)
    const qrSection = document.querySelector('.qr-payment-info');
    const cardSection = document.querySelector('.credit-card-info');
    const paymentRadios = document.querySelectorAll('input[name="payment-method"]');
    const qrConfirmBtn = document.querySelector('.qr-confirm-button');

    let qrConfirmed = false;

    function setCardInputsDisabled(disabled) {
        if (!cardSection) return;
        cardSection.querySelectorAll('input').forEach(inp => { inp.disabled = disabled; });
    }

    function resetQrConfirmation() {
        qrConfirmed = false;
        if (qrConfirmBtn) {
            qrConfirmBtn.disabled = false;
            qrConfirmBtn.classList.remove('confirmed');
            qrConfirmBtn.textContent = 'Đã thanh toán bằng mã QR';
        }
    }

    function togglePaymentUI() {
        const method = document.querySelector('input[name="payment-method"]:checked')?.value || 'card';
        if (method === 'qr') {
            if (qrSection) qrSection.style.display = 'flex';
            if (cardSection) cardSection.style.display = 'none';
            setCardInputsDisabled(true);
        } else {
            if (qrSection) qrSection.style.display = 'none';
            if (cardSection) cardSection.style.display = 'flex';
            setCardInputsDisabled(false);
            resetQrConfirmation();
        }
    }

    paymentRadios.forEach(r => r.addEventListener('change', togglePaymentUI));
    togglePaymentUI();

    if (qrConfirmBtn) {
        qrConfirmBtn.addEventListener('click', () => {
            qrConfirmed = true;
            qrConfirmBtn.disabled = true;
            qrConfirmBtn.classList.add('confirmed');
            qrConfirmBtn.textContent = 'Đã xác nhận thanh toán';
        });
    }

    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        const cartItems = getCartItems();
        if (cartItems.length === 0) {
            alert('Giỏ hàng của bạn đang trống!');
            return;
        }

        const method = document.querySelector('input[name="payment-method"]:checked')?.value || 'card';

        if (method === 'card') {
            const cardInputsArray = Array.from(document.querySelectorAll('.card-num-input'));
            if (cardInputsArray.length < 4 || cardInputsArray.some(input => input.value.length !== 4)) {
                alert('Vui lòng nhập đầy đủ số thẻ!');
                return;
            }
        } else {
            if (!qrConfirmed) {
                alert('Vui lòng xác nhận đã thanh toán bằng mã QR.');
                return;
            }
        }

        const customerInfo = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value
        };

        let paymentInfo = {};
        if (method === 'card') {
            const cardInputsArray = Array.from(document.querySelectorAll('.card-num-input'));
            const cardHolderElem = document.getElementById('card-holder');
            const cardHolder = cardHolderElem && cardHolderElem.value.trim() ? cardHolderElem.value.trim() : 'N/A';
            const lastFour = (cardInputsArray[3]?.value || '').replace(/\D/g, '').slice(-4) || '0000';
            paymentInfo = { method: 'card', cardHolder, cardNumber: `XXXX-XXXX-XXXX-${lastFour}` };
        } else {
            paymentInfo = { method: 'qr' };
        }

        const order = {
            customer: customerInfo,
            payment: paymentInfo,
            items: cartItems,
            totalPrice: document.getElementById('total-price').textContent,
            timestamp: new Date().toISOString()
        };

        console.log('ĐƠN HÀNG MỚI:', order);
        localStorage.removeItem('cart');
        
        const mainContainer = document.querySelector('.container-fluid');
        const thankYouMessage = document.getElementById('thank-you-message');
        mainContainer.style.display = 'none';
        thankYouMessage.style.display = 'flex';
    });
});