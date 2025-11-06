// Đợi DOM tải xong mới chạy JS
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DỮ LIỆU GIẢ LẬP (Mock Data) ---
    // (Bạn có thể thay đổi/thêm bớt tùy ý)
    const mockFoodData = [
        {
            id: 1,
            name: 'Phở Bò Tái Chín',
            price: 55000,
            img: 'https://i.imgur.com/xO1tXJp.jpeg', // Sử dụng link ảnh thật
            category: 'main'
        },
        {
            id: 2,
            name: 'Bún Chả Hà Nội',
            price: 45000,
            img: 'https://i.imgur.com/qMvXzXo.jpeg',
            category: 'main'
        },
        {
            id: 3,
            name: 'Cơm Tấm Sườn Bì',
            price: 50000,
            img: 'https://i.imgur.com/E8S9E8W.jpeg',
            category: 'main'
        },
        {
            id: 4,
            name: 'Cà Phê Sữa Đá',
            price: 25000,
            img: 'https://i.imgur.com/xXN32mC.jpeg',
            category: 'drink'
        },
        {
            id: 5,
            name: 'Trà Đào Cam Sả',
            price: 35000,
            img: 'https://i.imgur.com/vP9tqYy.jpeg',
            category: 'drink'
        },
        {
            id: 6,
            name: 'Chè Khúc Bạch',
            price: 30000,
            img: 'https://i.imgur.com/R3x3fXw.jpeg',
            category: 'dessert'
        },
        {
            id: 7,
            name: 'Bánh Mì Heo Quay',
            price: 30000,
            img: 'https://i.imgur.com/5c9tqZy.jpeg',
            category: 'main'
        },
        {
            id: 8,
            name: 'Panna Cotta Dâu',
            price: 40000,
            img: 'https://i.imgur.com/s6wE2E8.jpeg',
            category: 'dessert'
        }
    ];

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
        // Xóa nội dung cũ
        productListContainer.innerHTML = '';

        if (products.length === 0) {
            productListContainer.innerHTML = '<p>Không tìm thấy món ăn phù hợp.</p>';
            return;
        }

        // Lặp qua mảng dữ liệu để tạo HTML
        products.forEach(item => {
            const productCard = document.createElement('article');
            productCard.className = 'product-card';
            
            // Định dạng giá tiền (ví dụ: 50000 -> 50,000đ)
            const formattedPrice = item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

            productCard.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p class="price">${formattedPrice}</p>
                <button class="btn add-to-cart-btn" data-id="${item.id}">Thêm vào giỏ</button>
            `;
            productListContainer.appendChild(productCard);
        });
    }

    /**
     * Xử lý thêm món ăn vào giỏ hàng (localStorage)
     * @param {number} productId - ID của món ăn
     */
    function addToCart(productId) {
        // Lấy giỏ hàng từ localStorage, nếu chưa có thì khởi tạo mảng rỗng
        // Đây là key "cartItems" mà cả nhóm đã thống nhất
        let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Tìm món ăn đầy đủ thông tin từ mockData
        const itemToAddDetails = mockFoodData.find(item => item.id === productId);

        if (!itemToAddDetails) {
            console.error('Không tìm thấy sản phẩm!');
            return;
        }

        // Kiểm tra xem món ăn đã có trong giỏ hàng chưa
        const existingItemIndex = cart.findIndex(item => item.id === productId);

        if (existingItemIndex > -1) {
            // Nếu đã có -> Tăng số lượng (đúng theo yêu cầu)
            cart[existingItemIndex].quantity += 1;
        } else {
            // Nếu chưa có -> Thêm mới vào giỏ
            const newItem = {
                id: itemToAddDetails.id,
                name: itemToAddDetails.name,
                price: itemToAddDetails.price,
                quantity: 1
                // Bạn có thể thêm img nếu Trọng An (Giỏ hàng) cần
                // img: itemToAddDetails.img 
            };
            cart.push(newItem);
        }

        // Lưu giỏ hàng mới vào localStorage
        localStorage.setItem('cartItems', JSON.stringify(cart));

        // Cập nhật số lượng trên badge
        updateCartBadge();

        // Hiển thị thông báo thành công
        showToast(`Đã thêm "${itemToAddDetails.name}" vào giỏ!`);
    }

    /**
     * Cập nhật số lượng hiển thị trên icon giỏ hàng
     */
    function updateCartBadge() {
        let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
        // Tính tổng số lượng (quantity) của tất cả các món
        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        
        cartBadge.textContent = totalQuantity;
        cartBadge.style.display = totalQuantity > 0 ? 'inline-block' : 'none';
    }

    /**
     * Hiển thị thông báo (toast)
     * @param {string} message - Nội dung thông báo
     */
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;

        toastContainer.appendChild(toast);

        // Tự động xóa thông báo sau 3 giây
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // --- 4. GẮN KẾT SỰ KIỆN ---

    // 4.1. Hiển thị tất cả món ăn khi tải trang
    renderProducts(mockFoodData);

    // 4.2. Cập nhật badge giỏ hàng khi tải trang (phòng trường hợp F5)
    updateCartBadge();

    // 4.3. Sử dụng Event Delegation cho nút "Thêm vào giỏ"
    // Bắt sự kiện click trên toàn bộ container, nhưng chỉ xử lý nếu click trúng nút
    productListContainer.addEventListener('click', (event) => {
        // Kiểm tra xem phần tử được click có class 'add-to-cart-btn' không
        if (event.target.classList.contains('add-to-cart-btn')) {
            const button = event.target;
            // Lấy data-id từ nút
            const productId = parseInt(button.dataset.id);
            addToCart(productId);
        }
    });

    // 4.4. Xử lý sự kiện cho các nút Lọc
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Xóa class 'active' khỏi tất cả các nút
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Thêm class 'active' cho nút vừa click
            button.classList.add('active');

            const category = button.dataset.category;

            if (category === 'all') {
                renderProducts(mockFoodData);
            } else {
                const filteredProducts = mockFoodData.filter(item => item.category === category);
                renderProducts(filteredProducts);
            }
        });
    });

    // Kích hoạt nút "Tất cả" làm mặc định
    document.querySelector('.filter-btn[data-category="all"]').classList.add('active');
});