// 
console.log("CHECKOUT JS WORKING");

// 1. Get products from the cart
let bag = JSON.parse(localStorage.getItem("bag")) || [];

const orderContainer = document.querySelector(".order-items");
const totalContainer = document.querySelector(".order-total");
const checkoutForm = document.querySelector("#checkout-form");
const orderButton = checkoutForm.querySelector('button[type="submit"]');

// 2. Calculate subtotal, shipping and grand total
function calculateTotal() {
    let total = bag.reduce((acc, item) => {
        return acc + Number(item.price) * Number(item.quantity);
    }, 0);

    let shipping = total < 100 ? total * 0.10 : total * 0.25;
    let tax = 0;
    let grandTotal = total + shipping + tax;

    return { total, shipping, tax, grandTotal };
}

// 3. Display products
function displayOrder() {
    if (bag.length === 0) {
        orderContainer.innerHTML = "<p>Your bag is empty.</p>";
        totalContainer.innerHTML = "";
        orderButton.disabled = true;
        return;
    }

    let order = bag.map(item => {
        return `
            <div class="order-item col-12 p-3">
                <div class="bag-item d-flex justify-content-between">
                    <div class="d-flex gap-2">
                        <div class="image">
                            <img src="${item.image}" alt="">
                        </div>

                        <div class="d-flex flex-column">
                            <h6>${item.title}</h6>

                            <div class="d-flex flex-wrap gap-2">
                                ${item.size ? `<p>${item.size}</p>` : ""}
                                ${item.shade ? `<p>Shade: ${item.shade}</p>` : ""}

                                <span>
                                    Quantity: ${item.quantity}
                                </span>
                            </div>

                            <p>Price: $${Number(item.price).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    orderContainer.innerHTML = order;

    const { total, shipping, tax, grandTotal } = calculateTotal();

    totalContainer.innerHTML = `
        <div class="col-12 d-flex flex-column text-start">
            <div class="d-flex justify-content-between">
                <p>Subtotal:</p>
                <p>$${total.toFixed(2)}</p>
            </div>

            <div class="d-flex justify-content-between">
                <p>Shipping:</p>
                <p>$${shipping.toFixed(2)}</p>
            </div>

            <div class="d-flex justify-content-between">
                <p>Taxes:</p>
                <p>$${tax.toFixed(2)}</p>
            </div>
        </div>

        <div class="grand-total d-flex gap-2">
            <p>Grand Total:</p>
            <p>$${grandTotal.toFixed(2)}</p>
        </div>
    `;
}

displayOrder();

// 4. Connect EmailJS
emailjs.init({
    publicKey: "CisBRBSBSvVvo1iB1"
});

// 5. Handle Place Order
checkoutForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (bag.length === 0) {
        alert("Your bag is empty!");
        return;
    }

    // Read customer information
    const customerName = document.querySelector("#f-name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const address = document.querySelector("#address").value.trim();

    if (!customerName || !email || !phone || !address) {
        alert("Please complete all customer information.");
        return;
    }

    // Prepare order details
    const { total, shipping, tax, grandTotal } = calculateTotal();

    const orderId = "AURA-" + Date.now();

    const orders = bag.map(item => ({
        name: item.title,
        units: Number(item.quantity),
        price: Number(item.price).toFixed(2),
        size: item.size || "",
        shade: item.shade || ""
    }));

    // Data for both templates
    const templateParams = {
        name: customerName,
        customer_name: customerName,
        email: email,
        phone: phone,
        address: address,
        order_id: orderId,
        orders: orders,
        cost: {
            shipping: shipping.toFixed(2),
            tax: tax.toFixed(2),
            total: grandTotal.toFixed(2)
        }
    };

    orderButton.disabled = true;
    orderButton.textContent = "PLACING ORDER...";

    try {
        // Send confirmation to the customer
        await emailjs.send(
            "service_ikpnm9n",
            "template_vzb24vo",
            templateParams
        );

        // Send notification to the store owner
        await emailjs.send(
            "service_ikpnm9n",
            "template_0t98cbk",
            templateParams
        );

        alert(
            "Your order has been placed successfully!\n" +
            "Order Number: " + orderId
        );

        // Clear the cart only after both emails succeed
        localStorage.removeItem("bag");

        checkoutForm.reset();

        bag = [];
        displayOrder();

    } catch (error) {
        console.error("EmailJS error:", error);

        alert(
            "We couldn't complete the email process. " +
            "Please check your connection and try again. " +
            "If one email was already sent, check Email History before retrying."
        );

    } finally {
        orderButton.disabled = bag.length === 0;
        orderButton.textContent = "PLACE ORDER";
    }
});
