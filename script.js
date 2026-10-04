const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');

menuToggle.addEventListener('click' , () => {
    mobileMenu.classList.add('active');
});

menuClose.addEventListener('click' , () => {
    mobileMenu.classList.remove('active');
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click' , () => {
        mobileMenu.classList.remove('active');
    });
});


const gymItems = [
    { id: 1, title: "Seamless Set - Blue", price: "2,400", tag: "NEW", img: "images/products/fullset.jpg" },
    { id: 2, title: "Olive High Waist Leggings", price: "1,800", tag: "NEW", img: "images/products/anklestraps.jpg" },
    { id: 3, title: "Strappy Sports Bra - Black", price: "1,200", tag: "NEW", img: "images/products/shorts.jpg" },
    { id: 4, title: "Nike Windbreaker - Thrift", price: "1,500", tag: "THRIFT FIND", img: "images/products/sleeves.jpg" },
    { id: 5, title: "Ribbed Set - Mauve", price: "2,300", tag: "NEW", img: "images/products/workout.jpg" },
    { id: 6, title: "Gym Waist Bag", price: "900", tag: "ACCESSORY", img: "images/products/dumbbells.jpg" }
];


// ==========================================
// 2. TARGET INTERFACE ELEMENTS (DOM Nodes)
// ==========================================
const gridContainer = document.getElementById('product-grid');
const tabButtons = document.querySelectorAll('.tab-btn');

// ==========================================
// 3. RENDER FUNCTION (The Interface Builder)
// ==========================================
function displayInventory(filterType = "ALL") {
    // Clear out container contents safely before redrawing
    gridContainer.innerHTML = "";
   
    // Filter logic: Check if we show everything or map a specific matching category
    const filteredItems = gymItems.filter(item => {
        return filterType === "ALL" || item.category === filterType;
    });

    // Handle empty category states safely
    if (filteredItems.length === 0) {
        gridContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #888; padding: 40px 0;">No items found in this section yet.</p>`;
        return;
    }

    // Loop and append calculated template layout onto the screen view
    filteredItems.forEach(item => {
        const productHtml = `
            <div class="product-card">
                <div class="image-wrapper">
                    <span class="wishlist-heart" onclick="toggleWishlist(this)">♡</span>
                    <img src="${item.img}" alt="${item.title}" onerror="this.src='images/hero/hero_1.png'">
                    <span class="product-tag">${item.tag}</span>
                </div>
                <div class="product-info">
                    <h3>${item.title}</h3>
                    <p class="product-price">KSh ${item.price}</p>
                </div>
            </div>
        `;
        gridContainer.innerHTML += productHtml;
    });
}

// ==========================================
// 4. FILTER CONTROLLER ACTION LISTENERS
// ==========================================
tabButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Remove active state highlighting lines from previous button choice
        tabButtons.forEach(btn => btn.classList.remove('active'));
       
        // Apply active class selection style indicator onto currently selected tab button
        e.target.classList.add('active');
       
        // Grab the internal text string designation ("ALL", "NEW IN", etc.)
        const activeCategory = e.target.textContent;
       
        // Rerender database records filtered layout mapping logic sequence
        displayInventory(activeCategory);
    });
});

// ==========================================
// 5. AUXILIARY ACTIONS (Interaction UI Events)
// ==========================================
function toggleWishlist(heartElement) {
    if (heartElement.textContent === "♡") {
        heartElement.textContent = "❤️";
        heartElement.style.color = "red";
    } else {
        heartElement.textContent = "♡";
        heartElement.style.color = "#000";
    }
}

// ==========================================
// 6. INITIAL RUN EXECUTION (State Init)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    displayInventory("ALL");
});
