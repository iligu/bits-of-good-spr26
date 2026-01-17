const card = document.getElementById('tradingCard');
const flipBtn = document.getElementById('flipBtn');
const activateBtn = document.getElementById('activateBtn');
const hiddenMessage = document.getElementById('hiddenMessage');

let isActivated = false;

function flipCard() {
    card.classList.toggle('flipped');
    const flipText = document.querySelector('.flip-text');
    flipText.textContent = card.classList.contains('flipped') ? 'Flip Back' : 'Flip Card';
}

function activateImpact() {
    if (!isActivated) {
        isActivated = true;
        hiddenMessage.classList.add('visible');
        activateBtn.innerHTML = '<span class="btn-icon">✓</span><span class="btn-text">Impact Activated!</span>';
        activateBtn.style.background = '#4ecdc4';
        activateBtn.style.borderColor = '#4ecdc4';
        
        const statFills = document.querySelectorAll('.stat-fill');
        statFills.forEach((fill, index) => {
            setTimeout(() => {
                fill.style.transform = 'scaleY(1.1)';
                setTimeout(() => fill.style.transform = 'scaleY(1)', 200);
            }, index * 100);
        });
        
        createConfetti();
    }
}

function createConfetti() {
    const colors = ['#ffd700', '#f4d03f', '#4ecdc4'];
    const confettiCount = 30;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background-color: ${colors[Math.floor(Math.random() * colors.length)]};
            left: 50%;
            top: 50%;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
        `;
        
        document.body.appendChild(confetti);
        
        const angle = (Math.PI * 2 * i) / confettiCount;
        const velocity = 100 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        confetti.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 500,
            easing: 'cubic-bezier(0, 0.5, 0.5, 1)',
            fill: 'forwards'
        });
        
        setTimeout(() => confetti.remove(), 1500);
    }
}

flipBtn.addEventListener('click', flipCard);
card.addEventListener('click', flipCard);
activateBtn.addEventListener('click', activateImpact);

flipBtn.setAttribute('tabindex', '0');
activateBtn.setAttribute('tabindex', '0');

flipBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flipCard();
    }
});

activateBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateImpact();
    }
});

window.addEventListener('load', () => {
    const statFills = document.querySelectorAll('.stat-fill');
    statFills.forEach((fill, index) => {
        const finalWidth = fill.style.width;
        fill.style.width = '0%';
        setTimeout(() => {
            fill.style.width = finalWidth;
        }, 300 + (index * 100));
    });
});