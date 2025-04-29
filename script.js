// Global variables
let score = 0;

// DOM elements
const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');
const mainContent = document.getElementById('mainContent');
const bgMusic = document.getElementById('bgMusic');
const musicPlayer = document.querySelector('.music-player');
const showSurpriseBtn = document.getElementById('showSurpriseBtn');
const surpriseArea = document.getElementById('surpriseArea');
const petImage = document.getElementById('petImage');
const gameArea = document.getElementById('gameArea');
const scoreElement = document.getElementById('score');
const rewardScreen = document.getElementById('rewardScreen');
const rewardBtn = document.getElementById('rewardBtn');
const galaxyScene = document.getElementById('galaxyScene');


// Start button event
startBtn.addEventListener('click', function () {
    startScreen.style.display = 'none';
    mainContent.style.display = 'block';
    musicPlayer.style.display = 'block';

    // Start the fairy and glitter animations
    createFairies();
    createGlitter();
    initSparkles();

    // Set background music volume
    bgMusic.volume = 0.5;
});

// Surprise button event
showSurpriseBtn.addEventListener('click', function () {
    surpriseArea.style.display = 'block';
    setTimeout(() => {
        surpriseArea.classList.add('show');
    }, 100);
    this.style.display = 'none';

    // Create extra fairies for celebration
    createFairies();

    // Initialize the pet game
    initPetGame();
});

// Initialize pet catching game
// Initialize pet catching game
// Initialize pet catching game
function initPetGame() {
    petImage.addEventListener('click', function () {
        score++;
        scoreElement.textContent = `❤️ Ditangkap: ${score}`;

        // Tampilkan tombol reward jika score > 1
        if (score > 1) {
            rewardScreen.style.display = 'block';
        }

        moveToRandomPosition();
        createFairyAtPosition(petImage.offsetLeft + 40, petImage.offsetTop + 40);
        createSparklesAtPosition(petImage.offsetLeft + 40, petImage.offsetTop + 40, 15);
    });
}

// Move pet to random position
function moveToRandomPosition() {
    const maxX = gameArea.clientWidth - petImage.clientWidth;
    const maxY = gameArea.clientHeight - petImage.clientHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    petImage.style.left = randomX + 'px';
    petImage.style.top = randomY + 'px';
}

// Fairy functions
function createFairies() {
    const body = document.body;
    const maxFairies = 20;

    for (let i = 0; i < maxFairies; i++) {
        setTimeout(() => {
            const fairy = document.createElement('div');
            fairy.className = 'fairy';

            // Random position
            const xPos = Math.random() * window.innerWidth;
            const yPos = Math.random() * window.innerHeight;
            fairy.style.left = xPos + 'px';
            fairy.style.top = yPos + 'px';
            fairy.style.setProperty('--rotate', Math.random() * 360 + 'deg');

            // Random pink shade
            const pinkHue = 330 + Math.random() * 30; // 330-360 is pink range
            const saturation = 70 + Math.random() * 30;
            const lightness = 70 + Math.random() * 20;
            fairy.style.boxShadow = `0 0 10px hsla(${pinkHue}, ${saturation}%, ${lightness}%, 0.8), 
                               0 0 20px hsla(${pinkHue}, ${saturation}%, ${lightness}%, 0.6), 
                               0 0 30px hsla(${pinkHue}, ${saturation}%, ${lightness}%, 0.4)`;

            // Animation timing
            fairy.style.animation = `fade ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`;

            // Add to DOM
            body.appendChild(fairy);

            // Animate fairy movement
            animateFairy(fairy);

            // Remove after some time
            setTimeout(() => {
                if (fairy.parentNode) {
                    body.removeChild(fairy);
                }
            }, 10000);

        }, i * 200);
    }
}

function createFairyAtPosition(x, y) {
    const fairy = document.createElement('div');
    fairy.className = 'fairy';

    fairy.style.left = x + 'px';
    fairy.style.top = y + 'px';
    fairy.style.setProperty('--rotate', Math.random() * 360 + 'deg');

    // Pink color
    const pinkHue = 330 + Math.random() * 30;
    fairy.style.boxShadow = `0 0 10px hsla(${pinkHue}, 80%, 80%, 0.8), 
                           0 0 20px hsla(${pinkHue}, 80%, 80%, 0.6), 
                           0 0 30px hsla(${pinkHue}, 80%, 80%, 0.4)`;

    fairy.style.animation = `fade ${2 + Math.random() * 2}s infinite`;

    document.body.appendChild(fairy);

    animateFairy(fairy);

    setTimeout(() => {
        if (fairy.parentNode) {
            document.body.removeChild(fairy);
        }
    }, 5000);
}

function animateFairy(fairy) {
    const duration = 5000 + Math.random() * 5000;
    const startX = parseFloat(fairy.style.left);
    const startY = parseFloat(fairy.style.top);
    const targetX = Math.random() * window.innerWidth;
    const targetY = Math.random() * window.innerHeight;

    let startTime;

    function move(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for natural movement
        const easeInOut = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const easedProgress = easeInOut(progress);

        // Curved movement
        const currentX = startX + (targetX - startX) * easedProgress;
        const currentY = startY + (targetY - startY) * easedProgress +
            Math.sin(progress * Math.PI * 2) * 50;

        fairy.style.left = currentX + 'px';
        fairy.style.top = currentY + 'px';

        if (progress < 1) {
            requestAnimationFrame(move);
        } else if (fairy.parentNode) {
            // Start new animation if fairy still exists
            animateFairy(fairy);
        }
    }

    requestAnimationFrame(move);
}

// Glitter/star effect
function createGlitter() {
    const glitterContainer = document.querySelector('.glitter');
    const maxGlitters = 80;

    for (let i = 0; i < maxGlitters; i++) {
        const glitter = document.createElement('div');
        const size = Math.random() * 5 + 2;

        glitter.style.position = 'absolute';
        glitter.style.width = size + 'px';
        glitter.style.height = size + 'px';
        glitter.style.borderRadius = '50%';

        // Random position
        glitter.style.left = Math.random() * 100 + '%';
        glitter.style.top = Math.random() * 100 + '%';

        // Random color (pink or white)
        const isWhite = Math.random() > 0.7;
        if (isWhite) {
            glitter.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        } else {
            const pinkHue = 330 + Math.random() * 30;
            const saturation = 70 + Math.random() * 30;
            const lightness = 70 + Math.random() * 20;
            glitter.style.backgroundColor = `hsla(${pinkHue}, ${saturation}%, ${lightness}%, 0.8)`;
        }

        // Twinkle animation
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * 5;
        glitter.style.animation = `fade ${duration}s infinite ${delay}s`;

        glitterContainer.appendChild(glitter);
    }
}

// Create periodic fairies
setInterval(createFairies, 15000);

// Add this function to create sparkle particles
function createSparkles() {
    const body = document.body;
    const maxSparkles = 30;

    for (let i = 0; i < maxSparkles; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';

            // Random position
            const xPos = Math.random() * window.innerWidth;
            const yPos = Math.random() * window.innerHeight;
            sparkle.style.left = xPos + 'px';
            sparkle.style.top = yPos + 'px';

            // Random size (smaller than fairies)
            const size = Math.random() * 6 + 2;
            sparkle.style.width = size + 'px';
            sparkle.style.height = size + 'px';

            // Random white/gold/pink color
            const colorType = Math.random();
            let color;
            if (colorType < 0.33) {
                // White
                color = `rgba(255, 255, 255, ${0.7 + Math.random() * 0.3})`;
            } else if (colorType < 0.66) {
                // Gold
                color = `rgba(255, ${215 + Math.random() * 40}, ${0 + Math.random() * 50}, ${0.7 + Math.random() * 0.3})`;
            } else {
                // Pink
                const pinkHue = 330 + Math.random() * 30;
                color = `hsla(${pinkHue}, 90%, 75%, ${0.7 + Math.random() * 0.3})`;
            }
            sparkle.style.backgroundColor = color;

            // Add sparkle glow effect
            sparkle.style.boxShadow = `0 0 ${size * 2}px ${color}`;

            // Rotation for star shape effect
            sparkle.style.transform = `rotate(${Math.random() * 360}deg)`;

            // Add to DOM
            body.appendChild(sparkle);

            // Animate sparkle
            animateSparkle(sparkle);

            // Remove after animation completes
            setTimeout(() => {
                if (sparkle.parentNode) {
                    body.removeChild(sparkle);
                }
            }, 8000);

        }, i * 100);
    }
}

// Animate individual sparkle particles
function animateSparkle(sparkle) {
    const duration = 3000 + Math.random() * 5000;
    const startX = parseFloat(sparkle.style.left);
    const startY = parseFloat(sparkle.style.top);

    // Direction vector (sparkles move in a direction with some randomness)
    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 150;
    const targetX = startX + Math.cos(angle) * distance;
    const targetY = startY + Math.sin(angle) * distance;

    let startTime;

    // Pulses for twinkling effect
    let pulseCount = 0;
    const maxPulses = Math.floor(Math.random() * 5) + 3;

    function pulse() {
        pulseCount++;
        const initialSize = parseFloat(sparkle.style.width);

        let pulseStartTime;
        const pulseDuration = 300 + Math.random() * 200;

        function doPulse(timestamp) {
            if (!pulseStartTime) pulseStartTime = timestamp;
            const elapsed = timestamp - pulseStartTime;
            const pulseProgress = Math.min(elapsed / pulseDuration, 1);

            // Size pulsing
            const growFactor = Math.sin(pulseProgress * Math.PI) * 0.5 + 1;
            sparkle.style.transform = `rotate(${Math.random() * 360}deg) scale(${growFactor})`;

            // Opacity pulsing for twinkle effect
            const opacityFactor = Math.sin(pulseProgress * Math.PI) * 0.5 + 0.5;
            sparkle.style.opacity = opacityFactor;

            if (pulseProgress < 1) {
                requestAnimationFrame(doPulse);
            } else if (pulseCount < maxPulses && sparkle.parentNode) {
                setTimeout(pulse, Math.random() * 200);
            }
        }

        requestAnimationFrame(doPulse);
    }

    function move(timestamp) {
        if (!startTime) {
            startTime = timestamp;
            // Start pulsing animation
            pulse();
        }

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic function for more natural movement
        const easeOut = t => 1 - Math.pow(1 - t, 3);
        const easedProgress = easeOut(progress);

        // Add some waviness to movement
        const waveX = Math.sin(progress * Math.PI * 2) * 20;
        const waveY = Math.cos(progress * Math.PI * 3) * 15;

        const currentX = startX + (targetX - startX) * easedProgress + waveX;
        const currentY = startY + (targetY - startY) * easedProgress + waveY;

        sparkle.style.left = currentX + 'px';
        sparkle.style.top = currentY + 'px';

        if (progress < 1) {
            requestAnimationFrame(move);
        } else if (sparkle.parentNode) {
            // Fade out when reaching destination
            fadeOut(sparkle);
        }
    }

    requestAnimationFrame(move);
}

// Fade out sparkle effect
function fadeOut(sparkle) {
    let opacity = 1;
    const fadeInterval = setInterval(() => {
        opacity -= 0.05;
        sparkle.style.opacity = opacity;

        if (opacity <= 0 && sparkle.parentNode) {
            clearInterval(fadeInterval);
            document.body.removeChild(sparkle);
        }
    }, 50);
}

// Create sparkles at specific position (e.g. on click)
function createSparklesAtPosition(x, y, count = 10) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';

            sparkle.style.left = (x - 5 + Math.random() * 10) + 'px';
            sparkle.style.top = (y - 5 + Math.random() * 10) + 'px';

            const size = Math.random() * 5 + 2;
            sparkle.style.width = size + 'px';
            sparkle.style.height = size + 'px';

            // Random sparkle color (mostly gold for click effect)
            const colorType = Math.random();
            let color;
            if (colorType < 0.7) {
                // Gold
                color = `rgba(255, ${215 + Math.random() * 40}, ${0 + Math.random() * 50}, ${0.7 + Math.random() * 0.3})`;
            } else {
                // Pink or white
                const pinkHue = 330 + Math.random() * 30;
                color = `hsla(${pinkHue}, 90%, 75%, ${0.7 + Math.random() * 0.3})`;
            }
            sparkle.style.backgroundColor = color;
            sparkle.style.boxShadow = `0 0 ${size * 2}px ${color}`;

            document.body.appendChild(sparkle);

            // Animate outwards from click position
            animateClickSparkle(sparkle, x, y);

            // Remove after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    document.body.removeChild(sparkle);
                }
            }, 2000);
        }, i * 50);
    }
}

// Special animation for click sparkles
function animateClickSparkle(sparkle, originX, originY) {
    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 100;
    const duration = 1000 + Math.random() * 1000;

    const targetX = originX + Math.cos(angle) * distance;
    const targetY = originY + Math.sin(angle) * distance;

    let startTime;

    function move(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out for shooting effect
        const easeOut = t => 1 - Math.pow(1 - t, 2);
        const easedProgress = easeOut(progress);

        // Calculate position
        const currentX = originX + (targetX - originX) * easedProgress;
        const currentY = originY + (targetY - originY) * easedProgress;

        sparkle.style.left = currentX + 'px';
        sparkle.style.top = currentY + 'px';

        // Pulsate size during movement
        const sizeVariation = Math.sin(progress * Math.PI * 3);
        const size = parseFloat(sparkle.style.width);
        sparkle.style.transform = `scale(${1 + sizeVariation * 0.5})`;

        // Fade out towards the end
        if (progress > 0.7) {
            sparkle.style.opacity = 1 - ((progress - 0.7) / 0.3);
        }

        if (progress < 1) {
            requestAnimationFrame(move);
        }
    }

    requestAnimationFrame(move);
}

// Add CSS for sparkles
function addSparkleStyles() {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .sparkle {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
      }
    `;
    document.head.appendChild(styleSheet);
}

// Call this function to initialize sparkles
function initSparkles() {
    addSparkleStyles();

    // Create initial sparkles
    createSparkles();

    // Add periodic sparkle creation
    setInterval(createSparkles, 10000);

    // Add sparkles on click
    document.addEventListener('click', function (e) {
        createSparklesAtPosition(e.clientX, e.clientY);
    });
}

rewardBtn.addEventListener('click', function () {
    document.querySelectorAll('#mainContent > *:not(#galaxyScene)').forEach(el => {
        el.style.display = 'none';
    });

    rewardScreen.style.display = 'none';
    galaxyScene.style.display = 'block';
    setTimeout(() => galaxyScene.classList.add('show'), 50);

    console.log('Galaxy scene displayed:', galaxyScene.style.display);
    console.log('Added show class to galaxy scene');

    startFireworks();
    createCake();
});

// Fungsi kembang api
function startFireworks() {
    console.log('Starting fireworks');

    // Bersihkan interval sebelumnya jika ada
    if (window.fireworksInterval) {
        clearInterval(window.fireworksInterval);
    }

    // Buat kembang api baru setiap 500ms
    window.fireworksInterval = setInterval(() => {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = Math.random() * 100 + '%';
        firework.style.top = Math.random() * 100 + '%';
        firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

        galaxyScene.appendChild(firework);

        setTimeout(() => {
            if (firework.parentNode) {
                firework.remove();
            }
        }, 1500);
    }, 500);
}

// Fungsi membuat kue
function createCake() {
    console.log('Creating cake animations');

    // Pastikan cake terlihat
    const birthdayCake = document.querySelector('.birthday-cake');
    if (birthdayCake) {
        birthdayCake.style.display = 'block';
    }

    // Animasi untuk lilin
    const candles = document.querySelectorAll('.candle');
    candles.forEach(candle => {
        candle.style.animation = 'flicker 1.5s infinite alternate';
    });

    // Tambahkan sparkles di sekitar kue
    const sparklers = document.querySelector('.sparklers');
    if (sparklers) {
        for (let i = 0; i < 10; i++) {
            const sparkle = document.createElement('span');
            sparkle.textContent = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.fontSize = (Math.random() * 20 + 10) + 'px';
            sparkle.style.animation = `sparkle ${1 + Math.random()}s infinite alternate ${Math.random()}s`;
            sparklers.appendChild(sparkle);
        }
    }
}