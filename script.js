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
        image: "images/Complete Beauty Routine for Radiant Skin & Healthy Hair _ Glow from Head to Toe.jfif",
        title: "SKINCARE",
        description: "Nourishing botanical rituals",
    },
    {
        image: "images/The perfect makeup look starts here ✨.jfif",
        title: "MAKEUP",
        description: "Skin-enhancing soft pigments",
    },
    {
        image: "images/Pretty Perfume Vanity Setup.jfif",
        title: "Fragrance",
        description: "Luxury scents, timeless allure.",
    },
    {
        image: "images/Self-Care Vanity Tray.jfif",
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
        image: "images/blackhead mask.png",
        category: "Skincare",
        bestSeller: false,
        title: "Charcoal Detoxifying Peel-Off Treatment Mask",
        description: "An intensive purifying peel-off formulation designed to clarify congested skin. Infused with natural charcoal extract, it effectively draws out impurities, surface sebum, and stubborn blackheads to reveal a refined, velvety-smooth complexion with visibly minimized pores.",
        price: 100,
        quantity: 0,
        variantType: "size",
        sizes: [
            { name: "50 ml / 1.7 fl oz", price: 100 },
            { name: "100 ml / 3.5 fl oz", price: 200 }
        ],
        shades: []
    },
    {
        image: "images/Check out this image-transparent.png",
        category: "Skincare",
        bestSeller: false,
        title: "Retinal Shot Tightening Booster",
        description: "A targeted night-time youth concentrate formulated to dramatically firm, sculpt, and smooth skin texture. Powered by potent 0.1% Retinal, soothing 1% Panthenol, and 3% Matrixyl 3000 peptide complex, this treatment delivers cellular renewal and youthful resilience with minimal irritation.",
        price: 150,
        quantity: 0,
        variantType: "size",
        sizes: [
            { name: "30 ml", price: 150 },
            { name: "50 ml", price: 200 },
            { name: "100 ml", price: 450 }
        ],
        shades: []
    },
    {
        image: "images/The All-Time Best Vitamin C Serums, According to Experts-transparent.png",
        category: "Skincare",
        bestSeller: true,
        title: "Pure Vitamin C10 Radiance Serum",
        description: "A high-potency antioxidant elixir that awakens lackluster complexions with luminous clarity. Blending 10% pure Vitamin C with soothing neurosensine and gently refining salicylic acid, this silky serum defends against daily environmental stressors while softening fine lines and restoring a radiant, lit-from-within glow.",
        price: 100,
        quantity: 0,
        variantType: "size",
        sizes: [
            { name: "30 ml", price: 100 },
            { name: "50 ml", price: 150 },
            { name: "100 ml", price: 300 }
        ],
        shades: []
    },
    {
        image: "images/Which La Roche-Posay Anthelios SPF Should I Be Using_-transparent.png",
        category: "Skincare",
        bestSeller: true,
        title: "Anthelios UVMune 400 Oil Control Gel-Crème SPF 50+",
        description: "The gold standard in dermatological photoprotection. Engineered with advanced Mexoryl 400 filters to shield against insidious ultra-long UVA rays, this featherlight, dry-touch gel-crème delivers invisible broad-spectrum SPF 50+ defense with a clean, shine-free matte finish that layers imperceptibly under makeup.",
        price: 100,
        quantity: 0,
        variantType: "size",
        sizes: [
            { name: "50 ml", price: 100 },
            { name: "100 ml", price: 250 }
        ],
        shades: []
    },
    {
        image: "images/micellar water.png",
        category: "Skincare",
        bestSeller: true,
        title: "Micellar Cleansing Water All-in-1",
        description: "A soothing, multi-action cleansing fluid that sweeps away long-wear makeup, urban pollutants, and micro-debris in a single effortless gesture. Formulated without fragrance for sensitive skin, micellar clusters magnetize impurities without stripping moisture, leaving the skin harmonized, clean, and refreshed.",
        price: 200,
        quantity: 0,
        variantType: "size",
        sizes: [
            { name: "250 ml", price: 200 },
            { name: "400 ml", price: 400 }
        ],
        shades: []
    },
    {
        image: "images/smooth skin-transparent.png",
        category: "Skincare",
        bestSeller: false,
        title: "Hydra-Soft Nourishing Moisture Crème",
        description: "A fast-absorbing, whipped moisturizing cream engineered for daily face, body, and hand hydration. Enriched with golden jojoba seed oil and restorative vitamin E, this cushiony balm instantly replenishes lipid barriers, delivering touchably soft, petal-smooth skin with a fresh, weightless feel.",
        price: 150,
        quantity: 0,
        variantType: "size",
        sizes: [
            { name: "192 g / 6.8 oz", price: 150 }
        ],
        shades: []
    },
    {
        image: "images/Vaseline for EyebrowsGÇöand Whether It Helps Them Grow-transparent.png",
        category: "Skincare",
        bestSeller: false,
        title: "Pure Restorative Petroleum Jelly Balm",
        description: "The quintessential multi-use barrier ointment. Triple-purified 100% white petrolatum seals in vital moisture, accelerates skin barrier recovery, and creates a protective shield against harsh dry elements. Perfect as an overnight slugging balm, lip conditioner, or soothing treatment for delicate brows.",
        price: 100,
        quantity: 0,
        variantType: "size",
        sizes: [
            { name: "368 g / 13 oz", price: 100 }
        ],
        shades: []
    },

    // ==================== Skincare ====================

    {
        image: "images/Dove Go Fresh Antiperspirant Body Spray 250Ml Pomegranate  Lemon Verbena __ Click image to review more details_ (This is an affiliate link)-transparent.png",
        category: "Skincare",
        bestSeller: false,
        title: "Go Fresh Pomegranate & Lemon Verbena Antiperspirant Mist",
        description: "An uplifting antiperspirant body spray combining crisp Mediterranean lemon verbena with the vibrant, tart sweetness of ripe pomegranate. Provides 48-hour odor and wetness defense while conditioning delicate underarm skin with zero alcohol.",
        price: 200,
        quantity: 0,
        variantType: "size",
        sizes: [
            { name: "100 ml", price: 200 },
            { name: "250 ml", price: 350 }
        ],
        shades: []
    },
    {
        image: "images/download (5)-transparent.png",
        category: "Skincare",
        bestSeller: false,
        title: "Venus Skin Comfort Spa Moisture Glide Razor",
        description: "A luxury shaving instrument engineered for sensitive, satin-smooth skin. Featuring flexible multi-blade precision surrounded by built-in botanical moisture bars that lather upon contact with water, this ergonomic tool effortlessly contours across curves for a spa-worthy, nick-free shave.",
        price: 150,
        quantity: 0,
        shades: []
    },

    // ==================== FRAGRANCE ====================

    {
        image: "images/Kayali-transparent.png",
        category: "Fragrance",
        bestSeller: true,
        title: "Vanilla Candy Rock Sugar | 42 Eau de Parfum",
        description: "A deliciously decadent, candied gourmand fragrance crafted for the modern muse. Sparkling notes of spun sugar, glazed pear, and bubblegum dance atop a warm heart of creamy vanilla orchid and white caramel, anchored by sensual tonka bean and rock sugar crystallization.",
        price: 250,
        quantity: 0,
        variantType: "size",
        sizes: [
            { name: "50 ml", price: 250 },
            { name: "100 ml", price: 400 }
        ],
        shades: []
    },
    {
        image: "images/parfiom-1-transparent.png",
        category: "Fragrance",
        bestSeller: true,
        title: "Sì Passione Eau de Parfum",
        description: "An intoxicating, vibrant floral-fruity scent that embodies unapologetic feminine confidence. Crisp blackcurrant nectar and sparkling pear open into a passionate heart of red rose and jasmine grandiflorum, settling into warm vanilla and radiant cedarwood within an iconic lacquer-red flacon.",
        price: 200,
        quantity: 0,
        variantType: "size",
        sizes: [
            { name: "50 ml", price: 200 },
            { name: "100 ml", price: 450 }
        ],
        shades: []
    },
    {
        image: "images/Yara - Yara Pink Original-transparent.png",
        category: "Fragrance",
        bestSeller: true,
        title: "Yara Eau de Parfum",
        description: "An enchanting, creamy oriental fragrance renowned for its magnetic sweetness. Delicate heliotrope and tropical mandarin open into intoxicating coconut cream and wild orchid, drying down to an addictive base of velvety musk and warm bourbon vanilla. Housed in a sculptural soft pink flacon.",
        price: 500,
        quantity: 0,
        variantType: "size",
        sizes: [
            { name: "100 ml / 3.4 fl oz", price: 500 }
        ],
        shades: []
    },
    {
        image: "images/Lattafa Yara Candy for Women Online in UK-transparent.png",
        category: "Fragrance",
        bestSeller: false,
        title: "Yara Candy Eau de Parfum",
        description: "A playful, vibrant interpretation of the Yara signature scent infused with mouthwatering confections. Juicy candied berries, sparkling green mandarin, and syrupy gardenia melt into a creamy strawberry milkshake base with molten caramel and golden amber. Presented in an opulent hot-pink and gold cylinder.",
        price: 500,
        quantity: 0,
        variantType: "size",
        sizes: [
            { name: "100 ml / 3.4 fl oz", price: 500 }
        ],
        shades: []
    },
    

    // ==================== MAKEUP: FACE & EYES ====================

    {
        image: "images/download (2)-transparent.png",
        category: "Makeup",
        bestSeller: true,
        title: "16HR Camo Full Coverage Concealer",
        description: "A high-performance liquid concealer engineered for flawless 16-hour matte wear. Equipped with an oversized doe-foot applicator, this highly pigmented formula effortlessly erases dark circles, blemishes, and discoloration without creasing or settling into fine lines.",
        price: 250,
        quantity: 0,
        variantType: "shade",
        shades: [
            { name: "Fair Warm", color: "#EED5BE" }
        ]
    },
    {
        image: "images/The Holy Grail Concealer for a Flawless, Crease-Proof Finish G£¿-transparent.png",
        category: "Makeup",
        bestSeller: false,
        title: "Radiant Creamy Luminous Concealer",
        description: "The quintessential award-winning liquid concealer celebrated by top artists worldwide. Infused with light-diffusing botanical technology, it provides buildable medium-to-full coverage with a supple, skin-like radiant finish that brightens under-eyes and blurs imperfections for up to 16 hours.",
        price: 200,
        quantity: 0,
        variantType: "shade",
        shades: [
            { name: "Vanilla / Light 2", color: "#E9CBB2" }
        ]
    },
    {
        image: "images/download (3)-transparent.png",
        category: "Makeup",
        bestSeller: true,
        title: "Diorshow On Stage Precision Liquid Liner",
        description: "A couture waterproof liquid eyeliner engineered with an ultra-flexible hybrid felt-brush tip. Glides effortlessly to craft micro-fine lines or dramatic graphic wings with saturated, high-shine vinyl black pigment that stays immaculate for 24 hours.",
        price: 150,
        quantity: 0,
        variantType: "shade",
        shades: [
            { name: "091 Vinyl Black", color: "#111111" }
        ]
    },
    {
        image: "images/download (4)-transparent.png",
        category: "Makeup",
        bestSeller: false,
        title: "Megaglow Crystal Baked Highlighter",
        description: "A silky, baked mineral powder highlighter designed to deliver an ethereal glass-skin glow. Formulated with ultra-refined prismatic pearls that melt into the skin without chalkiness, creating a luminous, dimensional sheen on cheekbones, brow arches, and décolletage.",
        price: 300,
        quantity: 0,
        variantType: "shade",
        shades: [
            { name: "Diamond Starlight", color: "#F3EDE4", image: "" }
        ]
    },
    {
        image: "images/SHEGLAM Insta-Ready Ultra-Fine Blur & Lift Setting Powder-transparent.png",
        category: "Makeup",
        bestSeller: true,
        title: "Insta-Ready 2-in-1 Face & Under Eye Setting Powder",
        description: "A dual-tiered setting powder compact that blurs, sets, and locks in makeup with zero flashback. The upper tier houses a silky pressed powder tailored to brighten the delicate under-eye area, while the lower compartment contains an ultra-fine loose powder with a plush velvet triangle puff to control shine all day.",
        price: 299,
        quantity: 0,
        variantType: "shade",
        shades: [
            { name: "Translucent Pink", color: "#F6D8DB" }
        ]
    },
    {
        image: "images/SHEGLAM Sun Sculpt Liquid Bronzer-GOLDEN SUN-transparent.png",
        category: "Makeup",
        bestSeller: true,
        title: "Sun Sculpt Liquid Contour & Bronzer",
        description: "A weightless gel-cream liquid contour formulated to sculpt cheekbones and add sun-drenched warmth. Infused with skin-loving moisturizers, its buildable pigment blends seamlessly into bare skin or foundation for an authentic, naturally sculpted complexion.",
        price: 345,
        quantity: 0,
        variantType: "shade",
        shades: [
            { name: "Golden Sun", color: "#9E6445", image: "" }
        ]
    },
    {
        image: "images/Sephora Australia-transparent.png",
        category: "Makeup",
        bestSeller: true,
        title: "Perfect Strokes Universal Volumizing Mascara",
        description: "An all-in-one buildable mascara formulated to lift, lengthen, and curl every individual lash without clumping. The specialized multi-length bristle brush deposits rich, carbon-black mineral pigment from root to tip for panoramic volume and dramatic eye definition.",
        price: null,
        quantity: 0,
        variantType: "shade",
        shades: [
            { name: "Rich Black", color: "#1A1A1A", image: "" }
        ]
    },
    {
        image: "images/blush nyx-transparent.png",
        category: "Makeup",
        bestSeller: false,
        title: "Buttermelt Soft Powder Blush",
        description: "A decadent, butter-soft pressed powder blush that melts into skin like a cream. Formulated with shea butter and mango butter infusions, this ultra-blendable blush provides seamless color payoff that resists fading and transfers for up to 12 hours.",
        price: 255,
        quantity: 0,
        variantType: "shade",
        shades: [
            { name: "Peach Butter", color: "#E67D71", image: "images/blush nyx-transparent.png" },
            { name: "Berry Melt", color: "#B93C55", image: "images/blush-1-transparent.png" },
            { name: "Bubblegum Dream", color: "#F48FB1", image: "images/NYX PROFESSIONAL MAKEUP Buttermelt Powder Blush-transparent.png" }
        ]
    },
    {
        image: "images/Sheglam blush - Spring Blushes That Will Give You A Warm Glow-transparent.png",
        category: "Makeup",
        bestSeller: true,
        title: "Color Bloom Velvet Matte Liquid Blush",
        description: "A featherweight, sponge-tipped liquid blush that creates a soft-focus watercolor flush. Packed with antioxidant botanicals, its gel-cream emulsion dabs softly onto cheeks and diffuses effortlessly with fingers or a brush for a plump, healthy flush.",
        price: 235,
        quantity: 0,
        variantType: "shade",
        shades: [
            { name: "Love Cake Coral", color: "#ED707E", image: "images/Sheglam blush - Spring Blushes That Will Give You A Warm Glow-transparent.png" },
            { name: "Rose Ritual", color: "#D37083", image: "images/She glam-transparent.png" },
            { name: "Petal Glow", color: "#F086A8", image: "images/Trucco giapponese_ il metodo per applicare il blush che ringiovanisce il viso di 10 anni-transparent.png" }
        ]
    },
    

    // ==================== MAKEUP: LIPS ====================

    {
        image: "images/download (1)-transparent.png",
        category: "Makeup",
        bestSeller: false,
        title: "Pout Pillow Cushion Lip Gloss",
        description: "An ultra-plumping, high-shine lip lacquer featuring a velvety cushion dispenser. Provides a cushiony glaze of sheer nourishing tint with zero tackiness, leaving lips visually fuller, drenched in glossy moisture, and deeply conditioned.",
        price: null,
        quantity: 0,
        variantType: "shade",
        shades: [
            { name: "Nude Petal", color: "#DB8384", image: "images/download (1)-transparent.png" },
            { name: "Spiced Terracotta", color: "#9E4839", image: "images/lipgloss-1-transparent.png" }
        ]
    },
    {
        image: "images/SHEGLAM _ Bold, Affordable, High-Quality Cosmetics, Beauty, and Hair-transparent.png",
        category: "Makeup",
        bestSeller: false,
        title: "Velvet Glide Precision Lip Pencil",
        description: "A velvety, retractable gel-infused lip liner pencil that sculpts and defines lip contours with supreme accuracy. Its smooth, creamy formula glides on without skipping, locking lip color in place all day and preventing feathering.",
        price: 155,
        quantity: 0,
        variantType: "shade",
        shades: [
            { name: "Dusty Mauve", color: "#975865", image: "images/download (11)-transparent.png" },
            { name: "Warm Chestnut Nude", color: "#8D5C52", image: "images/SHEGLAM _ Bold, Affordable, High-Quality Cosmetics, Beauty, and Hair-transparent.png" }
        ]
    },
    {
        image: "images/Lip Liner Pencil-transparent.png",
        category: "Makeup",
        bestSeller: false,
        title: "Sculpting Pro Lip Pencil",
        description: "A cult-favorite wooden lip liner designed for shaping, lining, and filling in lips with artisanal precision. Formulated with a rich, creamy texture that defines without tugging, pairing seamlessly with matching lip colors to create a polished, plump pout.",
        price: 99,
        quantity: 0,
        variantType: "shade",
        shades: [
            { name: "Subtle Nude Rose", color: "#B47672", image: "images/Lip Liner Pencil-transparent.png" },
            { name: "Spiced Cinnamon", color: "#9A6356", image: "images/MAC Lip Liner Pencil - Macy's-transparent.png" }
        ]
    },
    {
        image: "images/lipliner-1-transparent.png",
        category: "Makeup",
        bestSeller: true,
        title: "Super Stay Ink Lip Crayon",
        description: "An effortless, long-wear matte lip crayon offering precision pigment in a single swipe. Enriched with elastic ink technology that resists smudging and transfer for up to 8 hours, featuring a built-in sharpener at the base for crisp lip contouring on the go.",
        price: 149,
        quantity: 0,
        variantType: "shade",
        shades: [
            { name: "Soft Mauve Rose", color: "#AD696E", image: "images/lipgloss-1-transparent.png" },
            { name: "Deep Chocolate Wine", color: "#6E3639", image: "images/lipliner-2-transparent.png" },
            { name: "Vibrant Fuchsia", color: "#C44973", image: "images/lipliner-3-transparent.png" },
            { name: "Rich Merlot Plum", color: "#7B273F", image: "images/ES-transparent.png" }
        ]
    },
    {
        image: "images/lipstick-1-transparent.png",
        category: "Makeup",
        bestSeller: true,
        title: "Iconic Matte Silky Lipstick",
        description: "The quintessential luxury matte lipstick that redefined the beauty landscape. Delivers saturated, rich color payoff in a non-drying, velvety texture that cushions lips for 10 hours of comfortable, sophisticated wear.",
        price: null,
        quantity: 0,
        variantType: "shade",
        shades: [
            { name: "Velvet Nude Rose", color: "#B8756E", image: "images/lipstick-1-transparent.png" },
            { name: "Crimson Retro Red", color: "#B71D28", image: "images/lipstick-2-transparent.png" },
            { name: "90s Warm Terracotta", color: "#7E3228", image: "images/Nostalgic GÇÿ90s Lips Are TrendingGÇöand You Can Still___-transparent.png" }
        ]
    },
]






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
                                data-image="${shade.image}"
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
let fragranceCards = document.querySelector(".Fragrance-cards");
let bestCards = document.querySelector(".best-cards");

items.forEach(item => {

    if (item.category === "Skincare") {
        skincareCards.innerHTML += creatCard2(item);
    }  if (item.category === "Makeup") {
        makeupCards.innerHTML += creatCard2(item);
    }if (item.category === "Fragrance") {
        fragranceCards.innerHTML += creatCard2(item);
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
// document.addEventListener("click", function (event) {
//     if (event.target.classList.contains("shade-btn")) {
//         let button = event.target;
//         let card = button.closest(".aura-card");
//         let allShades = card.querySelectorAll(".shade-btn");
//         allShades.forEach(shade => {
//             shade.classList.remove("active");
//         });
//         button.classList.add("active");
//         card.dataset.selectedShade = button.dataset.shade;

//     }
// });



// ==================== wishlist ====================

document.addEventListener("click", function (event) {
    let button = event.target.closest(".shade-btn");
    if (!button) return;
    let card = button.closest(".aura-card");
    let allShades = card.querySelectorAll(".shade-btn");
    allShades.forEach(function (shade) {
        shade.classList.remove("active");
    });
    button.classList.add("active");
    card.dataset.selectedShade = button.dataset.shade;
    let image = card.querySelector(".p-img");
    let newImage = button.dataset.image;
    if (newImage && image) {
        image.src = newImage;
    }
});


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

