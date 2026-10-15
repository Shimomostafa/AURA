const header = document.querySelector("header");


// ==================== HEADER ====================

window.addEventListener("scroll", function () {

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


const navbarMenu = document.getElementById("navbarSupportedContent");

function goToSection(sectionId) {
    const section = document.getElementById(sectionId);

    if (!section) {
        console.warn("Section not found:", sectionId);
        return;
    }

    // لو المنيو مفتوحة على الموبايل، نقفلها الأول
    if (
        window.innerWidth < 992 &&
        navbarMenu &&
        navbarMenu.classList.contains("show")
    ) {
        const collapse = bootstrap.Collapse.getOrCreateInstance(
            navbarMenu,
            { toggle: false }
        );

        navbarMenu.addEventListener("hidden.bs.collapse", function () {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, { once: true });

        collapse.hide();
    } else {
        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

// أي زرار عليه go-section هيشتغل للتنقل
document.addEventListener("click", function (event) {
    const button = event.target.closest(".go-section");

    if (!button) return;

    const sectionId = button.dataset.section;

    if (sectionId) {
        goToSection(sectionId);
    }
});

// تحديد الـ section النشط في الـ Navbar
const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll("section[id]");

if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;

            navButtons.forEach(function (button) {
                button.classList.toggle(
                    "active",
                    button.dataset.section === entry.target.id
                );
            });
        });
    }, {
        threshold: 0.1,
        rootMargin: "-15% 0px -60% 0px"
    });

    sections.forEach(function (section) {
        navObserver.observe(section);
    });
}

// ==================== CATEGORIES ====================

let categories = [
    {
        image: "images/cat_skincare_luxe_1789040590576.jpg",
        title: "SKINCARE",
        description: "Nourishing botanical rituals",
    },
    {
        image: "images/cat_makeup_palette_1789151463963.jpg",
        title: "MAKEUP",
        description: "Skin-enhancing soft pigments",
    },
    {
        image: "images/cat_new_arrivals_1789040615217.jpg",
        title: "NEW ARRIVALS",
        description: "Latest laboratory formulations",
    },
    {
        image: "images/cat_best_sellers_1789040628327.jpg",
        title: "BEST SELLERS",
        description: "Best-selling formulations"
    }
];


function creatCard(category) {

    return `
    <div class="col-12 col-md-6 col-lg-3">
        <div class="card gap-4 mt-3 ">

            <div class="image">
                <img src="${category.image}" alt="">
            </div>

            <div class="card-content text-start">
                <h5>${category.title}</h5>
                <p>${category.description}</p>
                <button data-section="${category.title}" class="btn go-section" type="button">EXPLORE</button>
            </div>

        </div>
    </div>
    `;
}


let cardContainer = document.querySelector(".cards");

categories.forEach(category => {

    cardContainer.innerHTML += creatCard(category);

});


let items = [

    // ==================== SKINCARE ====================

    {
        image: "images/luminous_serum_dropper.jpg",
        category: "Skincare",
        newArrival: true,
        bestSeller: true,
        title: "Hydrating Serum",
        description: "A multi-weight hyaluronic acid essence blended with Damask rose hydrolat and sea kelp bio-ferment. Quenches deep dehydration while refining pore texture and priming skin for subsequent care rituals.",
        price: 98,
        quantity:0,
        variantType: "size",

        sizes: [
        {
            name: "30 ml",
            price: 98
        },
        {
            name: "50 ml",
            price: 12
        },
        {
            name: "100 ml",
            price: 16
        }
    ],
    },

    {
        image: "images/creme_sublime_jar.jpg",
        category: "Skincare",
        newArrival: true,
        bestSeller: false,
        title: "Velvet Moisturizer",
        description: "An exquisitely whipped, silky moisture infusion that bathes skin in concentrated botanical ceramides, rare Alpine Edelweiss stem cells, and squalane. Restores lipid resilience and bestows an ethereal, candlelit glow.",
        price: 13,
        quantity:0,
        variantType: "size",

        sizes: [
        {
            name: "30 ml",
            price: 13
        },
        {
            name: "50 ml",
            price: 15
        },
        {
            name: "100 ml",
            price: 20
        }
    ],
    },


    // ==================== MAKEUP ====================

    {
        image: "images/prod_soft_blush.jpg",
        category: "Makeup",
        newArrival: false,
        bestSeller: true,
        title: "Soft Blush",
        description: "A petal-soft powder blush infused with rosehip seed oil and micronized mineral pigments that melts imperceptibly into skin for an effortless, romantic flush.",
        price: 46,
        quantity:0,
        variantType: "shade",

        shades: [
            {
                name: "Peach",
                color: "#E9A18F"
            },
            {
                name: "Rose",
                color: "#D8899A"
            },
            {
                name: "Nude",
                color: "#C99A86"
            },
            {
                name: "Berry",
                color: "#9B4D61"
            },
            {
                name: "Coral",
                color: "#E47B68"
            }
        ]
    },

    {
        image: "images/lip stick.png",
        category: "Makeup",
        newArrival: false,
        bestSeller: false,
        title: "Satin Lipstick",
        quantity:0,
        description: "Encased in a custom brushed-champagne brass vessel with a magnetic snap. Glides effortlessly across lips, delivering nuanced beige-rose pigment steeped in conditioning botanical butters.",
        price: 48,
        variantType: "shade",

        shades: [
            {
                name: "Rose Nude",
                color: "#B97878"
            },
            {
                name: "Soft Pink",
                color: "#E8A5B4"
            },
            {
                name: "Dusty Rose",
                color: "#B97883"
            },
            {
                name: "Berry",
                color: "#84394F"
            },
            {
                name: "Cocoa",
                color: "#7A493C"
            },
            {
                name: "Coral",
                color: "#E47B68"
            }
        ]
    },
    // ==================== SKINCARE ====================

    {
        image: "images/luminous_serum_dropper.jpg",
        category: "Skincare",
        newArrival: true,
        title: "Hydrating Serum",
        description: "A multi-weight hyaluronic acid essence blended with Damask rose hydrolat and sea kelp bio-ferment. Quenches deep dehydration while refining pore texture and priming skin for subsequent care rituals.",
        price: 98,
        quantity:0,
        variantType: "size",

        sizes: [
        {
            name: "30 ml",
            price: 98
        },
        {
            name: "50 ml",
            price: 12
        },
        {
            name: "100 ml",
            price: 16
        }
    ],
    },

    {
        image: "images/creme_sublime_jar.jpg",
        category: "Skincare",
        newArrival: true,
        bestSeller: false,
        title: "Velvet Moisturizer",
        description: "An exquisitely whipped, silky moisture infusion that bathes skin in concentrated botanical ceramides, rare Alpine Edelweiss stem cells, and squalane. Restores lipid resilience and bestows an ethereal, candlelit glow.",
        price: 13,
        quantity:0,
        variantType: "size",

        sizes: [
        {
            name: "30 ml",
            price: 13
        },
        {
            name: "50 ml",
            price: 15
        },
        {
            name: "100 ml",
            price: 20
        }
    ],
    },


    // ==================== MAKEUP ====================

    {
        image: "images/prod_soft_blush.jpg",
        category: "Makeup",
        newArrival: false,
        bestSeller: true,
        title: "Soft Blush",
        description: "A petal-soft powder blush infused with rosehip seed oil and micronized mineral pigments that melts imperceptibly into skin for an effortless, romantic flush.",
        price: 46,
        quantity:0,
        variantType: "shade",

        shades: [
            {
                name: "Peach",
                color: "#E9A18F"
            },
            {
                name: "Rose",
                color: "#D8899A"
            },
            {
                name: "Nude",
                color: "#C99A86"
            },
            {
                name: "Berry",
                color: "#9B4D61"
            },
            {
                name: "Coral",
                color: "#E47B68"
            }
        ]
    },

    {
        image: "images/lip stick.png",
        category: "Makeup",
        newArrival: false,
        bestSeller: false,
        title: "Satin Lipstick",
        quantity:0,
        description: "Encased in a custom brushed-champagne brass vessel with a magnetic snap. Glides effortlessly across lips, delivering nuanced beige-rose pigment steeped in conditioning botanical butters.",
        price: 48,
        variantType: "shade",

        shades: [
            {
                name: "Rose Nude",
                color: "#B97878"
            },
            {
                name: "Soft Pink",
                color: "#E8A5B4"
            },
            {
                name: "Dusty Rose",
                color: "#B97883"
            },
            {
                name: "Berry",
                color: "#84394F"
            },
            {
                name: "Cocoa",
                color: "#7A493C"
            },
            {
                name: "Coral",
                color: "#E47B68"
            }
        ]
    },
    // ==================== SKINCARE ====================

    {
        image: "images/luminous_serum_dropper.jpg",
        category: "Skincare",
        newArrival: true,
        bestSeller: false,
        title: "Hydrating Serum",
        description: "A multi-weight hyaluronic acid essence blended with Damask rose hydrolat and sea kelp bio-ferment. Quenches deep dehydration while refining pore texture and priming skin for subsequent care rituals.",
        price: 98,
        quantity:0,
        variantType: "size",

        sizes: [
        {
            name: "30 ml",
            price: 98
        },
        {
            name: "50 ml",
            price: 12
        },
        {
            name: "100 ml",
            price: 16
        }
    ],
    },

    {
        image: "images/creme_sublime_jar.jpg",
        category: "Skincare",
        newArrival: true,
        bestSeller: false,
        title: "Velvet Moisturizer",
        description: "An exquisitely whipped, silky moisture infusion that bathes skin in concentrated botanical ceramides, rare Alpine Edelweiss stem cells, and squalane. Restores lipid resilience and bestows an ethereal, candlelit glow.",
        price: 13,
        quantity:0,
        variantType: "size",

        sizes: [
        {
            name: "30 ml",
            price: 13
        },
        {
            name: "50 ml",
            price: 15
        },
        {
            name: "100 ml",
            price: 20
        }
    ],
    },


    // ==================== MAKEUP ====================

    {
        image: "images/prod_soft_blush.jpg",
        category: "Makeup",
        newArrival: false,
        bestSeller: true,
        title: "Soft Blush",
        description: "A petal-soft powder blush infused with rosehip seed oil and micronized mineral pigments that melts imperceptibly into skin for an effortless, romantic flush.",
        price: 46,
        quantity:0,
        variantType: "shade",

        shades: [
            {
                name: "Peach",
                color: "#E9A18F"
            },
            {
                name: "Rose",
                color: "#D8899A"
            },
            {
                name: "Nude",
                color: "#C99A86"
            },
            {
                name: "Berry",
                color: "#9B4D61"
            },
            {
                name: "coral",
                color: "#E47B68"
            }
        ]
    },

    {
        image: "images/lip stick.png",
        category: "Makeup",
        newArrival: false,
        bestSeller: false,
        title: "Satin Lipstick",
        quantity:0,
        description: "Encased in a custom brushed-champagne brass vessel with a magnetic snap. Glides effortlessly across lips, delivering nuanced beige-rose pigment steeped in conditioning botanical butters.",
        price: 48 ,
        variantType: "shade",

        shades: [
            {
                name: "Rose Nude",
                color: "#B97878"
            },
            {
                name: "Soft Pink",
                color: "#E8A5B4"
            },
            {
                name: "Dusty Rose",
                color: "#B97883"
            },
            {
                name: "Berry",
                color: "#84394F"
            },
            {
                name: "Cocoa",
                color: "#7A493C"
            },
            {
                name: "Coral",
                color: "#E47B68"
            }
        ]
    }

];


function creatCard2(item) {

    return `
    <div class=" col-12 col-md-6 col-lg-3">
<div class="aura-card  mt-3"
    data-selected-size="${item.sizes?.[0]?.name || ""}"
    data-selected-shade="${item.shades?.[0]?.name || ""}">
            <div class="image">
                    <img class="p-img" src="${item.image}" alt="">
                    <button class="wishlist-btn"
                        type="button"
                        data-title="${item.title}"
                        aria-label="Add to bag">
                        <i class="fa-regular fa-heart"></i>
                    </button>
            </div>
            <div class="card-content text-start mt-3">
                <div class="d-flex justify-content-between">
                    <p style="font-weight: 600; color: var(--bronzed-taupe);">
                        ${item.category}
                    </p>
                    <span style="font-weight: 600; color: #d9aeb9;">
                        ${item.sizes?.[0]?.name || ""}
                    </span>
                </div>
                <h5>${item.title}</h5>
                ${item.size ? `
                    <p>Size: ${item.size}</p>
                ` : ""}
                ${item.variantType === "shade" ? `
                <div class="shade-options">
                    <small>SHADES</small>
                    <div class="d-flex gap-2 mt-2">
                        ${item.shades.map(shade => `
                            <button
                                class="mb-3 shade-btn ${shade.name === item.shades[0].name ? "active" : ""}"
                                data-shade="${shade.name}"
                                data-color="${shade.color}"
                                style="background-color: ${shade.color};">
                            </button>
                        `).join("")}
                    </div>
                </div>
            ` : ""}
                <p style="font-weight: 500; color: var(--bronzed-taupe); font-size: 0.8rem;">
                    ${item.description.slice(0, 90) + "..."}
                </p>
                <div class="d-flex justify-content-between">
                <p class="product-price">
                    $${item.variantType === "size" ? item.sizes[0].price : item.price}
                </p>
                
                <button class="add" data-title="${item.title}">
                ADD TO BAG
                </button>
                </div>
                ${item.variantType === "size" ? `
        <div class="size-options">
            <small>SIZE</small>

            <div class="d-flex gap-2 mt-2">
                ${item.sizes.map(size => `
                    <button 
                        class="size-btn ${size.name === item.sizes[0].name ? "active" : ""}"
                        data-size="${size.name}"
                        data-price="$${size.price}">
                        ${size.name}
                    </button>
                `).join("")}
            </div>
        </div>
    ` : ""}

            </div>

        </div>
        </div>
    `;
}


let skincareCards = document.querySelector(".skincare-cards");
let makeupCards = document.querySelector(".makeup-cards");
let newCards = document.querySelector(".new-cards");
let bestCards = document.querySelector(".best-cards");

items.forEach(item => {

    if (item.category === "Skincare") {
        skincareCards.innerHTML += creatCard2(item);
    }  if (item.category === "Makeup") {
        makeupCards.innerHTML += creatCard2(item);
    }  if (item.newArrival=== true) {
        newCards.innerHTML += creatCard2(item);
    }  if (item.bestSeller=== true) {
        bestCards.innerHTML += creatCard2(item);
    }
    
});
setupWishlist();

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("size-btn")) {
        let button = event.target;
        let card = button.closest(".aura-card");
        let allSizes = card.querySelectorAll(".size-btn");
        allSizes.forEach(size => {
            size.classList.remove("active");
        });
        button.classList.add("active");
        card.dataset.selectedSize = button.dataset.size;
        let price = button.dataset.price;
        let productPrice = card.querySelector(".product-price");
        productPrice.innerHTML = price;
    }
});
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("shade-btn")) {
        let button = event.target;
        let card = button.closest(".aura-card");
        let allShades = card.querySelectorAll(".shade-btn");
        allShades.forEach(shade => {
            shade.classList.remove("active");
        });
        button.classList.add("active");
        card.dataset.selectedShade = button.dataset.shade;

    }
});



// ==================== wishlist ====================

let bag = JSON.parse(localStorage.getItem("bag")) || [];
let bagcount=document.querySelector(".bag-count");
let addToBag = document.querySelectorAll(".add");


// ---------- Create Bag Item ----------

function creatItem(item) {

    return `
        <div class="bag-item d-flex justify-content-between mt-3">
            <div class="d-flex gap-3">
                <div class="image">
                    <img src="${item.image}" alt="">
                </div>
                <div class="d-flex flex-column gap-1">
                    <div>
                        <h5>${item.title}</h5>
                        ${item.size ? `<p>Size: ${item.size}</p>` : ""}
                        ${item.shade ? ` <p>Shade: ${item.shade}</p>` : ""}
                        <p>$${item.price}</p>
                    </div>
                    <div class="d-flex gap-4 mb-3">
                        <button class="minus" data-title="${item.title}" data-size="${item.size || ""}" data-shade="${item.shade || ""}">
                            -
                        </button>
                        <span class="quantity" data-title="${item.title}" data-size="${item.size || ""}" data-shade="${item.shade || ""}">
                            ${item.quantity}
                        </span>
                        <button class="plus" data-title="${item.title}" data-size="${item.size || ""}" data-shade="${item.shade || ""}">
                            +
                        </button>
                    </div>
                </div>
                </div>
                <div>
                    <button class="remove" data-title="${item.title}" data-size="${item.size || ""}"data-shade="${item.shade || ""}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}


// ---------- Update Total ----------

function updateTotal() {

    let total = document.querySelector(".bag-total");

    total.innerHTML ="Total:$"+ bag.reduce((acc, item) => {

        return acc + (item.price * item.quantity);

    }, 0);

}
// --------------------Update Bag Count--------------------

function updateBagCount() {
    bagcount.innerHTML = bag.reduce((acc, item) => {
        return acc + item.quantity;
    },0);
}

// ---------- Add Product ----------
function saveBag() {
    localStorage.setItem("bag", JSON.stringify(bag));
}

addToBag.forEach(add => {

    add.addEventListener("click", () => {
        let product = items.find(item => item.title === add.dataset.title);
        let card = add.closest(".aura-card");
        let variantType = product.variantType;
        let selectedSize = card.dataset.selectedSize;
        let selectedShade = card.dataset.selectedShade;
        let selectedPrice;
        if (variantType === "size") {
            let selectedSizeData = product.sizes.find(size => size.name === selectedSize);
            selectedPrice = selectedSizeData.price;
        } else {
            selectedPrice = product.price;
        }
    let item;
    if (variantType === "size") {
    item = bag.find(item =>
        item.title === add.dataset.title &&
        item.size === selectedSize
    );
} else {
    item = bag.find(item =>
        item.title === add.dataset.title &&
        item.shade === selectedShade
    );
        }
        if (item) {
    item.quantity++;
        }
        else {
    product.quantity = 1;
    if (variantType === "size") {
        bag.push({
            ...product,
            size: selectedSize,
            price: selectedPrice
        });
    }
    else {
        bag.push({
            ...product,
            shade: selectedShade,
            price: selectedPrice
        });
    }
        }
        saveBag()
        // Display Bag
        let bagItems = document.querySelector(".bag-items");
        bagItems.innerHTML = "";
        bag.forEach(item => {
            bagItems.innerHTML += creatItem(item);
        });
        // Update Total
        updateTotal();
        updateBagCount();
        console.log(bag);
    });

});

let bagItems = document.querySelector(".bag-items");
function displayBag() {
    bagItems.innerHTML = "";
    bag.forEach(item => {
        bagItems.innerHTML += creatItem(item);
    });
    updateTotal();
    updateBagCount();
}
displayBag();

bagItems.addEventListener("click", function (event) {
    let plus = event.target;
    let minus = event.target;
if (plus.classList.contains("plus")) {
    let item;
    if (plus.dataset.size !== "") {
        item = bag.find(item =>
            item.title === plus.dataset.title &&
            item.size === plus.dataset.size
        );
    } else {
        item = bag.find(item =>
            item.title === plus.dataset.title &&
            item.shade === plus.dataset.shade
        );
    }
    item.quantity++;
    saveBag();
    let quantity = plus.parentElement.querySelector(".quantity");
    quantity.innerHTML = item.quantity;
    updateTotal();
    updateBagCount();
    }
    

    if (minus.classList.contains("minus")) {
    let item;
    if (minus.dataset.size !== "") {
        item = bag.find(item =>
            item.title === minus.dataset.title &&
            item.size === minus.dataset.size
        );
    } else {
        item = bag.find(item =>
            item.title === minus.dataset.title &&
            item.shade === minus.dataset.shade
        );
    }
    if (item.quantity > 1) {
        item.quantity--;
        saveBag();
        let quantity = minus.parentElement.querySelector(".quantity");
        quantity.innerHTML = item.quantity;
        updateTotal();
        updateBagCount();
    }
}

    let remove = event.target.closest(".remove");
if (remove) {
    let bagitem = remove.closest(".bag-item");
    bagitem.remove();
    bag = bag.filter(item => {
        if (item.title !== remove.dataset.title) {
            return true;
        }
        if (item.size) {
            return item.size !== remove.dataset.size;
        }
        return item.shade !== remove.dataset.shade;
    });
    saveBag();
    updateTotal();
    updateBagCount();
}

});

let checkBtn = document.querySelector(".checkout-btn");
checkBtn.addEventListener("click", () => {
    window.location.href = "checkout.html";
});

let wishlistcount=document.querySelector(".wishlist-count");
let addTowishlist = document.querySelectorAll(".wishlist-btn");

function updateWishlistCount() {
    wishlistcount.innerHTML = wishlist.length;
}


// ===================Wishlist==================

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function saveWishlist() {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function setupWishlist() {
    let wishlistButtons = document.querySelectorAll(".wishlist-btn");

    wishlistButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            let title = button.dataset.title;

            let product = items.find(function(item) {
                return item.title === title;
            });

            let existingItem = wishlist.find(function(item) {
                return item.title === title;
            });

            if (existingItem) {
                wishlist = wishlist.filter(function(item) {
                    return item.title !== title;
                });

                button.classList.remove("active");
                button.querySelector("i").className = "fa-regular fa-heart";
            } else {
                if (!product) return;

                wishlist.push(product);

                button.classList.add("active");
                button.querySelector("i").className = "fa-solid fa-heart";
            }

            saveWishlist();
            updateWishlistCount();
            displaywishlist();

            console.log(wishlist);
        });
    });
}

// ---------- Create wishlist Item ----------

function creatWishlistItem(item) {

    return `
        <div class="wishlist-item d-flex justify-content-between mt-3">
            <div class="d-flex gap-3">
                <div class="image">
                    <img src="${item.image}" alt="">
                </div>
                <div class="d-flex flex-column gap-1">
                    <div>
                        <h5>${item.title}</h5>
                        ${item.size ? `<p>Size: ${item.size}</p>` : ""}
                        ${item.shade ? ` <p>Shade: ${item.shade}</p>` : ""}
                        <p>$${item.price}</p>
                    </div>
                    
                </div>
                </div>
                <div>
                    <button class="remove" data-title="${item.title}" data-size="${item.size || ""}"data-shade="${item.shade || ""}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}
let wishlistItems = document.querySelector(".wishlist-items");
function displaywishlist() {
    wishlistItems.innerHTML = "";
    wishlist.forEach(item => {
        wishlistItems.innerHTML += creatWishlistItem(item);
    });
    updateWishlistCount();
}

wishlistItems.addEventListener("click", function(event) {
    let remove = event.target.closest(".remove");
    if (!remove) return;
    let title = remove.dataset.title;
    document.querySelectorAll(".wishlist-btn").forEach(function(button) {
    if (button.dataset.title === title) {
        button.classList.remove("active");
        button.querySelector("i").className = "fa-regular fa-heart";
    }
});
    wishlist = wishlist.filter(function(item) {
        return item.title !== title;
        
    });
    saveWishlist();
    displaywishlist();
});

/* ==================== CONTACT FORM ==================== */

emailjs.init({
    publicKey: "p8ETxCJptqLmIkQ2z"
});

const contactForm = document.getElementById("contactForm");
const contactFeedback = document.getElementById("contactFeedback");

if (contactForm && contactFeedback) {

    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const buttonText = submitButton.querySelector("span");

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("contactSubject").value;
        const message = document.getElementById("contactMessage").value.trim();

        const templateParams = {
            name: name,
            email: email,
            subject: subject,
            message: message,
            from_name: name,
            reply_to: email
        };

        submitButton.disabled = true;
        buttonText.textContent = "Sending...";
        contactFeedback.textContent = "";

        try {
            // 1. Send the customer's message to AURA
            await emailjs.send(
                "service_9bm62rs",
                "template_rvip45f",
                templateParams
            );

            // 2. Send an automatic reply to the customer
            await emailjs.send(
                "service_9bm62rs",
                "template_4jl0qfs",
                templateParams
            );

            contactFeedback.textContent =
                "Thank you for reaching out! Your message has been sent successfully.";

            contactFeedback.style.color = "#8b6570";

            contactForm.reset();

        } catch (error) {
            console.error("Contact form error:", error);

            contactFeedback.textContent =
                "Something went wrong. Please try again in a moment.";

            contactFeedback.style.color = "#b45353";

        } finally {
            submitButton.disabled = false;
            buttonText.textContent = "Send Message";
        }
    });
}

