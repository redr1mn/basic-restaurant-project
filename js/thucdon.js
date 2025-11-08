document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DỮ LIỆU GIẢ LẬP (Mock Data) ---
    const mockFoodData = [
        { id: 1, name: 'Lẩu Tứ Xuyên', price: 399000, img: 'img/menu/lau-tu-xuyen.png', description: 'Nước dùng cay đặc trưng, vị tê từ ớt và tiêu hoa', category: 'hotpot' },
        { id: 2, name: 'Lẩu Nấm', price: 359000, img: 'img/menu/lau-nam.png', description: 'Hương vị tự nhiên từ nhiều loại nấm quý', category: 'hotpot' },
        { id: 3, name: 'Lẩu Thảo dược', price: 459000, img: 'img/menu/lau-thao-duoc.png', description: 'Nước dùng ninh từ nhân sâm, kỳ tử, táo đỏ', category: 'hotpot' },
        { id: 4, name: 'Lẩu 2 ngăn (cay&thanh)', price: 499000, img: 'img/menu/lau-2-ngan.png', description: 'Kết hợp hai vị nước dùng trong cùng một nồi', category: 'hotpot' },
        { id: 5, name: 'Bò Wagyu cắt lát', price: 329000, img: 'img/menu/bo-wagyu.png', description: 'Thịt bò Wagyu cao cấp', category: 'dipping' },
        { id: 6, name: 'Bò Mỹ thượng hạng', price: 199000, img: 'img/menu/bo-my.png', description: 'Thịt bò Mỹ mềm ngọt', category: 'dipping' },
        { id: 7, name: 'Ba chỉ bò', price: 149000, img: 'img/menu/ba-chi-bo.png', description: 'Thịt ba chỉ bò xen lẫn mỡ nạc', category: 'dipping' },
        { id: 8, name: 'Tôm sú tươi', price: 169000, img: 'img/menu/tom-su.png', description: 'Tôm sú tươi sống', category: 'dipping' },
        { id: 9, name: 'Mực hoa', price: 139000, img: 'img/menu/muc-hoa.png', description: 'Mực ống cắt khoanh', category: 'dipping' },
        { id: 10, name: 'Cá hồi phi lê', price: 179000, img: 'img/menu/ca-hoi.png', description: 'Cá hồi tươi Na-uy', category: 'dipping' },
        { id: 11, name: 'Rau tổng hợp', price: 79000, img: 'img/menu/rau-tong-hop.png', description: 'Đĩa rau tổng hợp nhiều loại', category: 'dipping' },
        { id: 12, name: 'Cải thảo', price: 59000, img: 'img/menu/cai-thao.jpg', description: 'Rau cải thảo tươi', category: 'dipping' },
        { id: 13, name: 'Nấm tổng hợp', price: 89000, img: 'img/menu/nam-tong-hop.jpg', description: 'Nhiều loại nấm (kim châm, đùi gà...)', category: 'dipping' },
        { id: 14, name: 'Bò Mỹ sốt tiêu đen', price: 189000, img: 'img/menu/bo-sot-tieu-den.jpg', description: 'Nướng chín vừa, mềm ngọt', category: 'grill' },
        { id: 15, name: 'Ba chỉ heo nướng sa tế', price: 149000, img: 'img/menu/ba-chi-heo-sate.jpg', description: 'Cay nhẹ, thơm nồng', category: 'grill' },
        { id: 16, name: 'Gà nướng mật ong', price: 139000, img: 'img/menu/ga-nuong-mat-ong.jpg', description: 'Da giòn, vị ngọt dịu', category: 'grill' },
        { id: 17, name: 'Mực ống nướng muối ớt', price: 169000, img: 'img/menu/muc-nuong-muoi-ot.jpg', description: 'Mực tươi nướng muối ớt cay', category: 'grill' },
        { id: 18, name: 'Tôm nướng bơ tỏi', price: 179000, img: 'img/menu/tom-nuong-bo-toi.jpg', description: 'Hấp dẫn, thơm ngậy', category: 'grill' },
        { id: 19, name: 'Bắp nướng, cà tím nướng', price: 79000, img: 'img/menu/bap-ca-tim-nuong.jpg', description: 'Ăn kèm cùng mưới ớt xanh', category: 'grill' },
        { id: 20, name: 'Cơm chiên trứng', price: 69000, img: 'img/menu/com-chien-trung.jpg', description: 'Cơm rang truyền thống', category: 'main' },
        { id: 21, name: 'Cơm chiên hải sản', price: 89000, img: 'img/menu/com-chien-hai-san.jpg', description: 'Đậm đà tôm mực', category: 'main' },
        { id: 22, name: 'Mì xào bò', price: 79000, img: 'img/menu/mi-xao-bo.jpg', description: 'Mì dai, bò mềm', category: 'main' },
        { id: 23, name: 'Mì xào hải sản', price: 99000, img: 'img/menu/mi-xao-hai-san.jpg', description: 'Kết hợp tôm mức rau củ', category: 'main' },
        { id: 24, name: 'Hủ tiếu xào', price: 75000, img: 'img/menu/hu-tieu-xao.jpg', description: 'Món ăn bình dân kiểu miền Nam', category: 'main' },
        { id: 25, name: 'Phở bò', price: 69000, img: 'img/menu/pho-bo.jpg', description: 'Nước dùng trong, vị ngọt tự nhiên', category: 'main' },
        { id: 26, name: 'Há cảo tôm', price: 89000, img: 'img/menu/ha-cao-tom.jpg', description: 'Hấp nóng hổi', category: 'side' },
        { id: 27, name: 'Xíu mại trứng cút', price: 79000, img: 'img/menu/xiu-mai.jpg', description: 'Đậm đà', category: 'side' },
        { id: 28, name: 'Bánh bao kim sa', price: 99000, img: 'img/menu/banh-bao-kim-sa.jpg', description: 'Nhân trứng mưới tan chảy', category: 'side' },
        { id: 29, name: 'Bắp chiên bơ', price: 59000, img: 'img/menu/bap-chien-bo.jpg', description: 'Món ăn nhẹ', category: 'side' },
        { id: 30, name: 'Sốt đặc trưng', price: 35000, img: 'img/menu/sot-dac-trung.jpg', description: 'Cay béo hài hòa', category: 'sauce' },
        { id: 31, name: 'Sốt mè rang', price: 25000, img: 'img/menu/sot-me-rang.jpg', description: 'Hợp ăn cùng thịt bò', category: 'sauce' },
        { id: 32, name: 'Sốt tỏi cay', price: 20000, img: 'img/menu/sot-toi-cay.jpg', description: 'Kích vị', category: 'sauce' },
        { id: 33, name: 'Kem tươi', price: 45000, img: 'img/menu/kem-tuoi.jpg', description: 'Kem mát lạnh nhiều vị', category: 'dessert' },
        { id: 34, name: 'Thạch nha đam', price: 39000, img: 'img/menu/thach-nha-dam.jpg', description: 'Tráng miệng thanh mát', category: 'dessert' },
        { id: 35, name: 'Trái cây tổng hợp', price: 59000, img: 'img/menu/trai-cay.jpg', description: 'Các loại trái cây theo mùa', category: 'dessert' },
        { id: 36, name: 'Trà ô long', price: 49000, img: 'img/menu/tra-o-long.jpg', description: 'Trà ủ lạnh', category: 'drink' },
        { id: 37, name: 'Nước ép các loại', price: 59000, img: 'img/menu/nuoc-ep.jpg', description: 'Cam, Ổi, Dứa...', category: 'drink' },
        { id: 38, name: 'Coca-Cola', price: 35000, img: 'img/menu/coca.jpg', description: 'Nước ngọt có gas', category: 'drink' },
        { id: 39, name: 'Combo Set (2 người)', price: 599000, img: 'img/menu/combo-2-nguoi.jpg', description: 'Lẩu 2 ngăn, bò Mỹ, tôm, rau, mì + 2 nước', category: 'combo' },
        { id: 40, name: 'Family Set (4-5 người)', price: 1199000, img: 'img/menu/combo-family.jpg', description: 'Lẩu Tứ Xuyên + Lẩu Nấm, 2 loại thịt, 3 loại hải sản, rau tổng hợp', category: 'combo' },
        { id: 41, name: 'Luxury Set (7-9 người)', price: 2499000, img: 'img/menu/combo-luxury.jpg', description: 'Lẩu 2 vị, bò Wagyu, cá hồi, tôm hùm, dimsum, nước chấm đặc biệt', category: 'combo' },
    ];

    // --- 2. DOM ---
    const productListContainer = document.getElementById('product-list');
    const cartBadge = document.getElementById('cart-badge');
    const toastContainer = document.getElementById('toast-notification');
    const filterBar = document.getElementById('filter-bar'); // parent container of buttons (add id="filter-bar" in HTML)

    // --- 3. RENDER PRODUCTS ---
    function renderProducts(products) {
        if (!productListContainer) return;
        productListContainer.innerHTML = '';

        if (products.length === 0) {
            productListContainer.innerHTML = '<p style="text-align:center;font-size:1.1rem;">Không tìm thấy món ăn phù hợp.</p>';
            return;
        }

        products.forEach(item => {
            const card = document.createElement('article');
            card.className = 'product-card';
            const formattedPrice = item.price.toLocaleString('vi-VN') + 'đ';
            card.innerHTML = `
                <div class="card-image">
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <p class="description">${item.description}</p>
                    <div class="card-footer">
                        <span class="price">${formattedPrice}</span>
                        <button class="btn add-to-cart-btn" data-id="${item.id}" type="button">
                            <i class="fas fa-plus"></i> Thêm
                        </button>
                    </div>
                </div>
            `;
            productListContainer.appendChild(card);
        });
    }

    // --- 4. CART HELPERS ---
    function safeParse(json, fallback) {
        if (typeof json !== 'string') return fallback;
        try {
            const v = JSON.parse(json);
            return v == null ? fallback : v;
        } catch {
            return fallback;
        }
    }
    function getCart() {
        const parsed = safeParse(localStorage.getItem('cart'), []);
        return Array.isArray(parsed) ? parsed : [];
    }
    function setCart(cart) {
        const arr = Array.isArray(cart) ? cart : [];
        localStorage.setItem('cart', JSON.stringify(arr));
    }

    function addToCart(productId) {
        const product = mockFoodData.find(p => p.id === productId);
        if (!product) return;
        const cart = getCart();
        const existing = cart.find(c => c.id === productId);
        if (existing) {
            existing.quantity = (existing.quantity || 1) + 1;
        } else {
            cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1, img: product.img });
        }
        setCart(cart);
        updateCartBadge();
        showToast(`Đã thêm "${product.name}" vào giỏ!`);
    }

    function updateCartBadge() {
        if (!cartBadge) return;
        const cart = getCart();
        const qty = cart.reduce((t, i) => t + (i.quantity || 1), 0);
        cartBadge.textContent = qty;
        cartBadge.style.display = qty > 0 ? 'inline-block' : 'none';
    }
    // expose for other pages (cart.js)
    window.updateCartBadge = updateCartBadge;

    function showToast(message) {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 2800);
    }

    // --- 5. CATEGORY FILTER ---
    function filterByCategory(category) {
        const list = (category === 'all') ? mockFoodData : mockFoodData.filter(i => i.category === category);
        renderProducts(list);
    }

    function setActiveFilterButton(category) {
        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
    }

    function handleFilterClick(e) {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        const category = btn.dataset.category || 'all';
        localStorage.setItem('lastCategory', category);
        setActiveFilterButton(category);
        filterByCategory(category);
    }

    // --- 6. EVENT DELEGATION ---
    if (productListContainer) {
        productListContainer.addEventListener('click', (e) => {
            const addBtn = e.target.closest('.add-to-cart-btn');
            if (addBtn) {
                const id = parseInt(addBtn.dataset.id, 10);
                if (!isNaN(id)) addToCart(id);
            }
        });
    }

    if (filterBar) {
        filterBar.addEventListener('click', handleFilterClick);
    } else {
        // fallback for already existing individual buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.addEventListener('click', handleFilterClick));
    }

    // --- 7. INITIAL LOAD ---
    const lastCategory = localStorage.getItem('lastCategory') || 'all';
    setActiveFilterButton(lastCategory);
    filterByCategory(lastCategory);
    updateCartBadge();
});