let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price){
    cart.push({name, price});
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to Cart");
}

function loadCart(){
    let container = document.getElementById("cartItems");
    let total = 0;

    cart.forEach(item=>{
        total += item.price;
        container.innerHTML += `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>₹${item.price}</span>
        </div>`;
    });

    document.getElementById("total").innerText = "₹" + total;
}

function goToPayment(){
    window.location.href="payment.html";
}

function confirmOrder(){
    localStorage.removeItem("cart");
    window.location.href="success.html";
}

function sendMessage(){
    let input = document.getElementById("chatInput");
    let chatArea = document.getElementById("chatArea");

    chatArea.innerHTML += `<div class="message-user">${input.value}</div>`;
    chatArea.innerHTML += `<div class="message-bot">We recommend our Balanced Bowl for you 🌿</div>`;
    input.value="";
}
function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check if fields are filled
    if (email === "" || password === "") {
        alert("Please enter both email and password.");
        return;
    }

    // Redirect to Dashboard
    window.location.href = "home.html";
}
function sendMessage() {
    const input = document.querySelector('.input-bar input');
    const chatMessages = document.querySelector('.chat-messages');
    const messageText = input.value.trim();

    if (messageText === "") return;

    // 1. Create and Add User Message
    const userRow = document.createElement('div');
    userRow.className = 'msg-row user';
    userRow.innerHTML = `
        <div class="bubble">${messageText}</div>
        <img src="image 29.png" class="chat-avatar">
    `;
    chatMessages.appendChild(userRow);

    // Clear input
    input.value = "";

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // 2. Fake "Bot is typing" delay
    setTimeout(() => {
        const botRow = document.createElement('div');
        botRow.className = 'msg-row bot';
        botRow.innerHTML = `
            <img src="image 35.png" class="chat-avatar">
            <div class="bubble">That's a great question! Let me check our latest Nutri Fit menu for you...</div>
        `;
        chatMessages.appendChild(botRow);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}
// Allow pressing "Enter" to send
document.querySelector('.input-bar input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
function goToStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.checkout-step').forEach(step => {
        step.style.display = 'none';
    });

    // Show the requested step
    if (stepNumber === 1) document.getElementById('step-cart').style.display = 'block';
    if (stepNumber === 2) {
        document.getElementById('step-review').style.display = 'block';
        renderReview(); // Build the review list
    }
    if (stepNumber === 3) document.getElementById('step-payment').style.display = 'block';
}

function renderReview() {
    const cart = JSON.parse(localStorage.getItem('nutriCart')) || [];
    const reviewContainer = document.getElementById('review-list');
    reviewContainer.innerHTML = '';

    cart.forEach(item => {
        reviewContainer.innerHTML += `
            <div class="review-item">
                <img src="${item.image}">
                <div>
                    <h4>${item.name}</h4>
                    <p>₹${item.price - 30} <del>₹${item.price}</del></p>
                    <span>From: Nutri Fit</span>
                </div>
            </div>
        `;
    });
}
function finalOrder() {
    // 1. Clear the storage key 'nutriCart'
    localStorage.removeItem('nutriCart'); 

    // 2. Redirect the user to the new success page
    window.location.href = 'success.html';
}
// Initial Load
window.onload = () => {
    // Call your existing displayCart function here to fill Step 1
    displayCart(); 
};
function checkout(){
    window.location.href = 'checkout.html';
}