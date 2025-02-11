// 3D Carousel Setup
const carousel = document.getElementById('carousel');
const items = document.querySelectorAll('.carousel-item');
const radius = 300;
const totalItems = items.length;
let angleStep = 360 / totalItems;
let currentAngle = 0;

items.forEach((item, index) => {
    const angle = angleStep * index;
    item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
});

// Auto-slide effect
let autoSlide = setInterval(() => {
    currentAngle += 0.5;
    carousel.style.transform = `rotateY(${currentAngle}deg)`;
}, 100);

// Swipe functionality (Mouse & Touch)
let startX, isDragging = false;

function rotateCarousel(deltaX) {
    currentAngle += deltaX * 0.3;
    carousel.style.transform = `rotateY(${currentAngle}deg)`;
}

const startDrag = (x) => {
    startX = x;
    isDragging = true;
    clearInterval(autoSlide);
};

const moveDrag = (x) => {
    if (!isDragging) return;
    rotateCarousel(x - startX);
    startX = x;
};

const endDrag = () => {
    isDragging = false;
    autoSlide = setInterval(() => {
        currentAngle += 0.5;
        carousel.style.transform = `rotateY(${currentAngle}deg)`;
    }, 100);
};

// Mouse Events
carousel.addEventListener('mousedown', (e) => startDrag(e.clientX));
carousel.addEventListener('mousemove', (e) => moveDrag(e.clientX));
carousel.addEventListener('mouseup', endDrag);
carousel.addEventListener('mouseleave', endDrag);

// Touch Events
carousel.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX));
carousel.addEventListener('touchmove', (e) => moveDrag(e.touches[0].clientX));
carousel.addEventListener('touchend', endDrag);

// Flying Letters Setup
const message = `Baby, I just want to take a moment to apologize for the times I gave you the silent treatment, for the moments I made you feel alone with my late replies or when I didn’t give you enough of my time. You didn’t deserve any of that, and I’m really sorry. The truth is, you mean the world to me. I love you more than words can ever say, baby.`;

const textContainer = document.getElementById('movingText');
const finalMessageContainer = document.getElementById('finalMessage');
const letters = message.split('');

letters.forEach(letter => {
    const span = document.createElement('span');
    span.textContent = letter;
    textContainer.appendChild(span);
});

const spans = document.querySelectorAll('.moving-text span');

// Move Letters Randomly
function moveLettersRandomly() {
    spans.forEach(span => {
        setInterval(() => {
            const randomX = Math.random() * window.innerWidth - 50;
            const randomY = Math.random() * window.innerHeight - 50;
            span.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 360}deg)`;
        }, 500);
    });
}

// Retrieve Letters One by One & Type Faster
function arrangeLettersToMessage() {
    let delay = 0;
    finalMessageContainer.innerHTML = ""; // Reset message box

    spans.forEach((span, index) => {
        setTimeout(() => {
            span.style.opacity = "0"; // Hide letter after reaching destination
            finalMessageContainer.innerHTML += message[index];
        }, delay);
        delay += 15; // Faster typing (15ms per letter)
    });

    // Show Final Message Box
    setTimeout(() => {
        finalMessageContainer.style.opacity = "1";
    }, delay + 500);
}

// Start Animation
moveLettersRandomly();
setTimeout(arrangeLettersToMessage, 5000);

