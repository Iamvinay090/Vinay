/**
 * Main Application Orchestrator
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Apply Config Data
    applyConfig();
    
    // 2. Initialize Background Falling Petals
    const fallingPetals = new FallingPetals('falling-petals-canvas');
    
    // 3. Initialize Audio Controller (Autoplays music on page load!)
    const audioController = new AudioController('audio-control-btn', CONFIG.audioUrl);
    audioController.play();
    
    // 4. Initialize Flower Tunnel Animation
    const flowerTunnel = new FlowerTunnel('flower-tunnel-overlay', 'flower-tunnel-canvas');
    
    // 5. Initialize Typewriter
    const typewriter = new TypewriterEffect('typewriter-text', CONFIG.letterText);
    
    // DOM Elements
    const giftBoxWrapper = document.getElementById('gift-box-wrapper');
    const heroSection = document.getElementById('hero-section');
    const quizSection = document.getElementById('quiz-section');
    const gallerySection = document.getElementById('gallery-section');
    const letterSection = document.getElementById('letter-section');
    const closingSection = document.getElementById('closing-section');
    const secretYesBtn = document.getElementById('secret-yes-btn');
    
    // -------------------------------------------------------------
    // FLOW 1: START AT QUIZ PAGE ("Do u love me RADHEEE?")
    // -------------------------------------------------------------
    quizSection.classList.add('visible');
    
    // Render 180 buttons
    setupQuizGrid();
    
    // -------------------------------------------------------------
    // THE TRUE SECRET UNLOCK: Hidden Bottom-Right "YES!" Button
    // -------------------------------------------------------------
    secretYesBtn.addEventListener('click', () => {
        secretYesBtn.style.display = 'none';
        quizSection.style.display = 'none';
        
        heroSection.classList.add('visible');
        heroSection.scrollIntoView({ behavior: 'smooth' });
    });
    
    // -------------------------------------------------------------
    // FLOW 2: GIFT BOX CLICK -> 3D FLOWER VORTEX -> POLAROIDS & LETTER
    // -------------------------------------------------------------
    let isOpened = false;
    
    giftBoxWrapper.addEventListener('click', () => {
        if (isOpened) return;
        isOpened = true;
        
        giftBoxWrapper.classList.add('opening');
        audioController.play();
        
        setTimeout(() => {
            flowerTunnel.start(() => {
                heroSection.style.display = 'none';
                
                gallerySection.classList.add('visible');
                letterSection.classList.add('visible');
                closingSection.classList.add('visible');
                
                gallerySection.scrollIntoView({ behavior: 'smooth' });
                setupLetterObserver(typewriter);
            });
        }, 400);
    });
    
    // Setup Modal Handlers
    setupLightbox();
    setupBunnyModal();
    setupMogamboModal();
});

/**
 * Applies config data from config.js
 */
function applyConfig() {
    document.getElementById('hero-title').textContent = CONFIG.heroTitle;
    document.getElementById('hero-tap-prompt').textContent = CONFIG.heroTapPrompt;
    
    document.getElementById('quiz-title').textContent = CONFIG.quizQuestion;
    document.getElementById('quiz-subheader').textContent = CONFIG.quizSubheader;
    document.getElementById('bunny-modal-text').textContent = CONFIG.quizPopupText;
    
    document.getElementById('mogambo-text').textContent = CONFIG.mogamboText || "phas gye na hamare jaaaal meee aap 😂😈";
    document.getElementById('mogambo-subtext').textContent = CONFIG.mogamboSubtext || "Mogambo Khush Hua! Think you can outsmart me?";
    if (CONFIG.mogamboImage) {
        document.getElementById('mogambo-img').src = CONFIG.mogamboImage;
    }
    
    document.getElementById('gallery-title').textContent = CONFIG.galleryTitle;
    document.getElementById('gallery-subtitle').textContent = CONFIG.gallerySubtitle;
    document.getElementById('closing-title').textContent = CONFIG.closingTitle;
    document.getElementById('closing-subtitle').textContent = CONFIG.closingSubtitle;
    
    // Render Polaroid Cards
    const grid = document.getElementById('polaroid-grid');
    grid.innerHTML = '';
    
    CONFIG.photos.forEach((photo) => {
        const card = document.createElement('div');
        card.className = 'polaroid-card';
        card.style.transform = `rotate(${photo.rotation || 0}deg)`;
        
        card.innerHTML = `
            <div class="polaroid-image-wrapper">
                <img src="${photo.url}" alt="${photo.caption}" class="polaroid-image" loading="lazy">
            </div>
            <p class="polaroid-caption">${photo.caption}</p>
        `;
        
        card.addEventListener('click', () => {
            openLightbox(photo.url, photo.caption);
        });
        
        grid.appendChild(card);
    });
}

/**
 * Sets up the Trending Quiz Button Grid
 */
function setupQuizGrid() {
    const grid = document.getElementById('quiz-button-grid');
    grid.innerHTML = '';
    
    const count = CONFIG.quizButtonCount || 180;
    const decoyIndex = Math.floor(Math.random() * count);
    
    for (let i = 0; i < count; i++) {
        const btn = document.createElement('button');
        btn.className = 'quiz-btn';
        
        if (i === decoyIndex) {
            // DECOY YES Button
            btn.textContent = CONFIG.quizYesText || "YES! ❤️";
            btn.setAttribute('data-decoy', 'true');
            btn.addEventListener('click', () => {
                openMogamboModal();
            });
        } else {
            // NO Button
            btn.textContent = CONFIG.quizNoText || "NO 😜";
            btn.addEventListener('click', () => {
                if (btn.classList.contains('disabled')) return;
                
                btn.classList.add('shake', 'disabled');
                openBunnyModal();
            });
        }
        
        grid.appendChild(btn);
    }
}

/**
 * Bunny Modal Handlers
 */
function setupBunnyModal() {
    const modal = document.getElementById('bunny-modal');
    const closeBtn = document.getElementById('bunny-close-btn');
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

function openBunnyModal() {
    const modal = document.getElementById('bunny-modal');
    modal.classList.add('active');
}

/**
 * Mogambo Decoy Trap Modal Handlers
 */
function setupMogamboModal() {
    const modal = document.getElementById('mogambo-modal');
    const closeBtn = document.getElementById('mogambo-close-btn');
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

function openMogamboModal() {
    const modal = document.getElementById('mogambo-modal');
    modal.classList.add('active');
}

/**
 * Scroll Observer for Typewriter
 */
function setupLetterObserver(typewriter) {
    const letterPaper = document.querySelector('.letter-paper');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typewriter.start();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(letterPaper);
}

/**
 * Lightbox Modal Controller
 */
function setupLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const closeBtn = document.getElementById('lightbox-close');
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

function openLightbox(url, caption) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');
    
    img.src = url;
    cap.textContent = caption;
    modal.classList.add('active');
}
