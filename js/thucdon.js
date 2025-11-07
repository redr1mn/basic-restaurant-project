document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DỮ LIỆU GIẢ LẬP (Mock Data) ---
    // (Đã cập nhật đường dẫn ảnh để trỏ vào thư mục /images/)
    const mockFoodData = [
        {
            id: 1,
            name: 'Phở Bò Tái Chín',
            price: 55000,
            img: 'images/pho.jpg', // Giả sử bạn có ảnh này
            description: 'Nước lèo thanh ngọt, thịt bò tươi mềm.',
            category: 'main'
        },
        {
            id: 2,
            name: 'Bún Chả Hà Nội',
            price: 45000,
            img: 'images/buncha.jpg',
            description: 'Thịt nướng thơm lừng, nước mắm chua ngọt.',
            category: 'main'
        },
        {
            id: 3,
            name: 'Cơm Tấm Sườn Bì',
            price: 50000,
            img: 'images/comtam.jpg',
            description: 'Sườn nướng mật ong, bì, chả trứng.',
            category: 'main'
        },
        {
            id: 4,
            name: 'Cà Phê Sữa Đá',
            price: 25000,
            img: 'images/caphe.jpg',
            description: 'Hạt cà phê rang xay, sữa đặc Ông Thọ.',
            category: 'drink'
        },
        {
            id: 5,
            name: 'Trà Đào Cam Sả',
            price: 35000,
            img: 'images/tradao.jpg',
            description: 'Trà thanh mát, đào giòn, cam sả thơm.',
            category: 'drink'
        },
        {
            id: 6,
            name: 'Chè Khúc Bạch',
            price: 30000,
            img: 'images/chekhucbach.jpg',
            description: 'Mát lạnh, béo ngậy vị phô mai, nhãn.',
            category: 'dessert'
        },
        {
            id: 7,
            name: 'Bánh Mì Heo Quay',
            price: 30000,
            img: 'images/banhmi.jpg',
            description: 'Bánh mì giòn, heo quay da giòn, rau dưa.',
            category: 'main'
        },
        {
            id: 8,
            name: 'Panna Cotta Dâu',
            price: 40000,
            img: 'images/pannacotta.jpg',
            description: 'Mềm mịn, béo ngậy, sốt dâu tằm chua ngọt.',
            category: 'dessert'
        }
    ];
    // (Nếu không có ảnh, bạn có thể thay lại link imgur cũ)

    // --- 2. LẤY CÁC PHẦN TỬ DOM ---
    const productListContainer = document.getElementById('product-list');
    const cartBadge = document.getElementById('cart-badge');
    const toastContainer = document.getElementById('toast-notification');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // --- 3. HÀM XỬ LÝ CHÍNH ---

    /**
     * Hiển thị danh sách món ăn ra giao diện
     * @param {Array} products - Mảng món ăn cần hiển thị
     */
    function renderProducts(products) {
        productListContainer.innerHTML = '';

        if (products.length === 0) {
            productListContainer.innerHTML = '<p style="text-align: center; font-size: 1.2rem;">Không tìm thấy món ăn phù hợp.</p>';
            return;
        }

        products.forEach(item => {
            const productCard = document.createElement('article');
            productCard.className = 'product-card';
            
            const formattedPrice = item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

            productCard.innerHTML = `
                <div class="card-image">
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <p class="description">${item.description}</p>
                    <div class="card-footer">
                        <span class="price">${formattedPrice}</span>
                        <button class="btn add-to-cart-btn" data-id="${item.id}">
                            <i class="fas fa-plus"></i> Thêm
                        </button>
                    </div>
                </div>
            `;
            productListContainer.appendChild(productCard);
        });
    }

    /**
     * Xử lý thêm món ăn vào giỏ hàng (localStorage)
     * (Logic này giữ nguyên, đã đúng yêu cầu nhóm)
     */
    function addToCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
        const itemToAddDetails = mockFoodData.find(item => item.id === productId);

        if (!itemToAddDetails) {
            console.error('Không tìm thấy sản phẩm!');
            return;
        }

        const existingItemIndex = cart.findIndex(item => item.id === productId);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            const newItem = {
                id: itemToAddDetails.id,
                name: itemToAddDetails.name,
                price: itemToAddDetails.price,
                quantity: 1,
                img: itemToAddDetails.img // Gửi cả ảnh cho An làm giỏ hàng
            };
            cart.push(newItem);
        }

        localStorage.setItem('cartItems', JSON.stringify(cart));
        updateCartBadge();
        showToast(`Đã thêm "${itemToAddDetails.name}" vào giỏ!`);
    }

    /**
     * Cập nhật số lượng hiển thị trên icon giỏ hàng
     * (Giữ nguyên)
     */
    function updateCartBadge() {
        let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        
        cartBadge.textContent = totalQuantity;
        cartBadge.style.display = totalQuantity > 0 ? 'inline-block' : 'none';
    }

    /**
     * Hiển thị thông báo (toast)
     * (Giữ nguyên)
     */
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // --- 4. GẮN KẾT SỰ KIỆN (Giữ nguyên) ---

    renderProducts(mockFoodData);
    updateCartBadge();

    productListContainer.addEventListener('click', (event) => {
        // Tìm nút gần nhất được click
        const button = event.target.closest('.add-to-cart-btn');
        if (button) {
            const productId = parseInt(button.dataset.id);
            addToCart(productId);
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;
            const filteredProducts = (category === 'all')
                ? mockFoodData
                : mockFoodData.filter(item => item.category === category);
                
            renderProducts(filteredProducts);
        });
    });
});