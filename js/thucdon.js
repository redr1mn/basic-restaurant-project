document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DỮ LIỆU GIẢ LẬP (Mock Data) ---
    // (Đã cập nhật toàn bộ từ file "MENU CÁC MÓN ĂN NHÀ HÀNG.docx")
    const mockFoodData = [
        // Lẩu
        {
            id: 1,
            name: 'Lẩu Tứ Xuyên',
            price: 399000,
            img: 'img/menu/lau-tu-xuyen.png',
            description: 'Nước dùng cay đặc trưng, vị tê từ ớt và tiêu hoa',
            category: 'hotpot'
        },
        {
            id: 2,
            name: 'Lẩu Nấm',
            price: 359000,
            img: 'img/menu/lau-nam.png',
            description: 'Hương vị tự nhiên từ nhiều loại nấm quý',
            category: 'hotpot'
        },
        {
            id: 3,
            name: 'Lẩu Thảo dược',
            price: 459000,
            img: 'img/menu/lau-thao-duoc.png',
            description: 'Nước dùng ninh từ nhân sâm, kỳ tử, táo đỏ',
            category: 'hotpot'
        },
        {
            id: 4,
            name: 'Lẩu 2 ngăn (cay&thanh)',
            price: 499000,
            img: 'img/menu/lau-2-ngan.png',
            description: 'Kết hợp hai vị nước dùng trong cùng một nồi',
            category: 'hotpot'
        },
        
        // Đồ nhúng
        {
            id: 5,
            name: 'Bò Wagyu cắt lát',
            price: 329000,
            img: 'img/menu/bo-wagyu.png',
            description: 'Thịt bò Wagyu cao cấp',
            category: 'dipping'
        },
        {
            id: 6,
            name: 'Bò Mỹ thượng hạng',
            price: 199000,
            img: 'img/menu/bo-my.png',
            description: 'Thịt bò Mỹ mềm ngọt',
            category: 'dipping'
        },
        {
            id: 7,
            name: 'Ba chỉ bò',
            price: 149000,
            img: 'img/menu/ba-chi-bo.png',
            description: 'Thịt ba chỉ bò xen lẫn mỡ nạc',
            category: 'dipping'
        },
        {
            id: 8,
            name: 'Tôm sú tươi',
            price: 169000,
            img: 'img/menu/tom-su.png',
            description: 'Tôm sú tươi sống',
            category: 'dipping'
        },
        {
            id: 9,
            name: 'Mực hoa',
            price: 139000,
            img: 'img/menu/muc-hoa.png',
            description: 'Mực ống cắt khoanh',
            category: 'dipping'
        },
        {
            id: 10,
            name: 'Cá hồi phi lê',
            price: 179000,
            img: 'img/menu/ca-hoi.png',
            description: 'Cá hồi tươi Na-uy',
            category: 'dipping'
        },
        {
            id: 11,
            name: 'Rau tổng hợp',
            price: 79000,
            img: 'img/menu/rau-tong-hop.png',
            description: 'Đĩa rau tổng hợp nhiều loại',
            category: 'dipping'
        },
        {
            id: 12,
            name: 'Cải thảo',
            price: 59000,
            img: 'img/menu/cai-thao.jpg',
            description: 'Rau cải thảo tươi',
            category: 'dipping'
        },
        {
            id: 13,
            name: 'Nấm tổng hợp',
            price: 89000,
            img: 'img/menu/nam-tong-hop.jpg',
            description: 'Nhiều loại nấm (kim châm, đùi gà...)',
            category: 'dipping'
        },

        // Đồ nướng
        {
            id: 14,
            name: 'Bò Mỹ sốt tiêu đen',
            price: 189000,
            img: 'img/menu/bo-sot-tieu-den.jpg',
            description: 'Nướng chín vừa, mềm ngọt',
            category: 'grill'
        },
        {
            id: 15,
            name: 'Ba chỉ heo nướng sa tế',
            price: 149000,
            img: 'img/menu/ba-chi-heo-sate.jpg',
            description: 'Cay nhẹ, thơm nồng',
            category: 'grill'
        },
        {
            id: 16,
            name: 'Gà nướng mật ong',
            price: 139000,
            img: 'img/menu/ga-nuong-mat-ong.jpg',
            description: 'Da giòn, vị ngọt dịu',
            category: 'grill'
        },
        {
            id: 17,
            name: 'Mực ống nướng muối ớt',
            price: 169000,
            img: 'img/menu/muc-nuong-muoi-ot.jpg',
            description: 'Mực tươi nướng muối ớt cay',
            category: 'grill'
        },
        {
            id: 18,
            name: 'Tôm nướng bơ tỏi',
            price: 179000,
            img: 'img/menu/tom-nuong-bo-toi.jpg',
            description: 'Hấp dẫn, thơm ngậy',
            category: 'grill'
        },
        {
            id: 19,
            name: 'Bắp nướng, cà tím nướng',
            price: 79000,
            img: 'img/menu/bap-ca-tim-nuong.jpg',
            description: 'Ăn kèm cùng mưới ớt xanh',
            category: 'grill'
        },

        // Món ăn no
        {
            id: 20,
            name: 'Cơm chiên trứng',
            price: 69000,
            img: 'img/menu/com-chien-trung.jpg',
            description: 'Cơm rang truyền thống',
            category: 'main'
        },
        {
            id: 21,
            name: 'Cơm chiên hải sản',
            price: 89000,
            img: 'img/menu/com-chien-hai-san.jpg',
            description: 'Đậm đà tôm mực',
            category: 'main'
        },
        {
            id: 22,
            name: 'Mì xào bò',
            price: 79000,
            img: 'img/menu/mi-xao-bo.jpg',
            description: 'Mì dai, bò mềm',
            category: 'main'
        },
        {
            id: 23,
            name: 'Mì xào hải sản',
            price: 99000,
            img: 'img/menu/mi-xao-hai-san.jpg',
            description: 'Kết hợp tôm mức rau củ',
            category: 'main'
        },
        {
            id: 24,
            name: 'Hủ tiếu xào',
            price: 75000,
            img: 'img/menu/hu-tieu-xao.jpg',
            description: 'Món ăn bình dân kiểu miền Nam',
            category: 'main'
        },
        {
            id: 25,
            name: 'Phở bò',
            price: 69000,
            img: 'img/menu/pho-bo.jpg',
            description: 'Nước dùng trong, vị ngọt tự nhiên',
            category: 'main'
        },

        // Đồ ăn kèm
        {
            id: 26,
            name: 'Há cảo tôm',
            price: 89000,
            img: 'img/menu/ha-cao-tom.jpg',
            description: 'Hấp nóng hổi',
            category: 'side'
        },
        {
            id: 27,
            name: 'Xíu mại trứng cút',
            price: 79000,
            img: 'img/menu/xiu-mai.jpg',
            description: 'Đậm đà',
            category: 'side'
        },
        {
            id: 28,
            name: 'Bánh bao kim sa',
            price: 99000,
            img: 'img/menu/banh-bao-kim-sa.jpg',
            description: 'Nhân trứng mưới tan chảy',
            category: 'side'
        },
        {
            id: 29,
            name: 'Bắp chiên bơ',
            price: 59000,
            img: 'img/menu/bap-chien-bo.jpg',
            description: 'Món ăn nhẹ',
            category: 'side'
        },

        // Nước chấm
        {
            id: 30,
            name: 'Sốt đặc trưng',
            price: 35000,
            img: 'img/menu/sot-dac-trung.jpg',
            description: 'Cay béo hài hòa',
            category: 'sauce'
        },
        {
            id: 31,
            name: 'Sốt mè rang',
            price: 25000,
            img: 'img/menu/sot-me-rang.jpg',
            description: 'Hợp ăn cùng thịt bò',
            category: 'sauce'
        },
        {
            id: 32,
            name: 'Sốt tỏi cay',
            price: 20000,
            img: 'img/menu/sot-toi-cay.jpg',
            description: 'Kích vị',
            category: 'sauce'
        },

        // Tráng miệng & Đồ uống
        {
            id: 33,
            name: 'Kem tươi',
            price: 45000,
            img: 'img/menu/kem-tuoi.jpg',
            description: 'Kem mát lạnh nhiều vị',
            category: 'dessert'
        },
        {
            id: 34,
            name: 'Thạch nha đam',
            price: 39000,
            img: 'img/menu/thach-nha-dam.jpg',
            description: 'Tráng miệng thanh mát',
            category: 'dessert'
        },
        {
            id: 35,
            name: 'Trái cây tổng hợp',
            price: 59000,
            img: 'img/menu/trai-cay.jpg',
            description: 'Các loại trái cây theo mùa',
            category: 'dessert'
        },
        {
            id: 36,
            name: 'Trà ô long',
            price: 49000,
            img: 'img/menu/tra-o-long.jpg',
            description: 'Trà ủ lạnh',
            category: 'drink'
        },
        {
            id: 37,
            name: 'Nước ép các loại',
            price: 59000,
            img: 'img/menu/nuoc-ep.jpg',
            description: 'Cam, Ổi, Dứa...',
            category: 'drink'
        },
        {
            id: 38,
            name: 'Coca-Cola',
            price: 35000,
            img: 'img/menu/coca.jpg',
            description: 'Nước ngọt có gas',
            category: 'drink'
        },
        
        // Combo
        {
            id: 39,
            name: 'Combo Set (2 người)',
            price: 599000,
            img: 'img/menu/combo-2-nguoi.jpg',
            description: 'Lẩu 2 ngăn, bò Mỹ, tôm, rau, mì + 2 nước',
            category: 'combo'
        },
        {
            id: 40,
            name: 'Family Set (4-5 người)',
            price: 1199000,
            img: 'img/menu/combo-family.jpg',
            description: 'Lẩu Tứ Xuyên + Lẩu Nấm, 2 loại thịt, 3 loại hải sản, rau tổng hợp',
            category: 'combo'
        },
        {
            id: 41,
            name: 'Luxury Set (7-9 người)',
            price: 2499000,
            img: 'img/menu/combo-luxury.jpg',
            description: 'Lẩu 2 vị, bò Wagyu, cá hồi, tôm hùm, dimsum, nước chấm đặc biệt',
            category: 'combo'
        },
    ];

    // --- 2. LẤY CÁC PHẦN TỬ DOM ---
    const productListContainer = document.getElementById('product-list');
    const cartBadge = document.getElementById('cart-badge');
    const toastContainer = document.getElementById('toast-notification');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // --- 3. HÀM XỬ LÝ CHÍNH ---

    /**
     * Hiển thị danh sách món ăn ra giao diện
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
                img: itemToAddDetails.img 
            };
            cart.push(newItem);
        }

        localStorage.setItem('cartItems', JSON.stringify(cart));
        updateCartBadge();
        showToast(`Đã thêm "${itemToAddDetails.name}" vào giỏ!`);
    }

    /**
     * Cập nhật số lượng hiển thị trên icon giỏ hàng
     */
    function updateCartBadge() {
        let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        
        cartBadge.textContent = totalQuantity;
        cartBadge.style.display = totalQuantity > 0 ? 'inline-block' : 'none';
    }

    /**
     * Hiển thị thông báo (toast)
     */
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // --- 4. GẮN KẾT SỰ KIỆN ---

    renderProducts(mockFoodData);
    updateCartBadge();

    productListContainer.addEventListener('click', (event) => {
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