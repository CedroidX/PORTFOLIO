window.addEventListener('load', () => {
    const loader = document.getElementById('intro-loader');
    const introImg = document.querySelector('.intro-img');
    const introText = document.querySelector('.intro-text');
    const targetImg = document.getElementById('panel1-img');
    const panel1 = document.getElementById('panel1'); 

    // 1. Lock the text, UI, and all mouse clicks globally
    document.body.classList.add('intro-animating');
    document.body.classList.add('hide-ui');
    document.body.style.pointerEvents = 'none';
    targetImg.style.opacity = '0';

    // Hide Panels 2-5 immediately on load
    const otherPanels = document.querySelectorAll('.panel:not(#panel1)');
    otherPanels.forEach(p => p.classList.add('is-hidden-content'));

    setTimeout(() => {
        if(introText) introText.style.opacity = '0';
    }, 1800); 

    setTimeout(() => {
        loader.style.backgroundColor = 'transparent';

        const targetRect = targetImg.getBoundingClientRect();
        const introRect = introImg.getBoundingClientRect();

        introImg.style.position = 'fixed';
        introImg.style.margin = '0'; 
        introImg.style.top = `${introRect.top}px`;
        introImg.style.left = `${introRect.left}px`;
        introImg.style.width = `${introRect.width}px`;
        introImg.style.height = `${introRect.height}px`;
        introImg.style.borderRadius = '50%'; 
        
        introImg.offsetHeight; 

        // SIMULTANEOUS FLIGHT AND MORPH TRANSITION
        introImg.style.transition = 'top 1s cubic-bezier(0.25, 1, 0.5, 1), left 1s cubic-bezier(0.25, 1, 0.5, 1), width 1s cubic-bezier(0.25, 1, 0.5, 1), height 1s cubic-bezier(0.25, 1, 0.5, 1), border-radius 1s ease-in-out, filter 1s ease-in-out';
        
        introImg.style.top = `${targetRect.top}px`;
        introImg.style.left = `${targetRect.left}px`;
        introImg.style.width = `${targetRect.width}px`;
        introImg.style.height = `${targetRect.height}px`;
        introImg.style.borderRadius = getComputedStyle(targetImg).borderRadius || '0px';
        introImg.style.filter = 'brightness(0.4) grayscale(100%)';

        // SWAP AND TRIGGER NEW TIMING SEQUENCE
        setTimeout(() => {
            targetImg.style.opacity = '1';
            loader.style.display = 'none';
            // Note: Clicks are STILL locked here!

            // --- FIRE THE SHOCKWAVE EFFECT ---
            otherPanels.forEach((panel, index) => {
                setTimeout(() => {
                    panel.classList.remove('is-hidden-content');
                    panel.classList.add('shockwave-reveal');
                    
                    setTimeout(() => {
                        panel.classList.remove('shockwave-reveal');
                    }, 1200); 

                }, index * 150); 
            });

            // --- EXPAND PANEL 1 AFTER THE WAVE PASSES ---
            setTimeout(() => {
                // Release text animations so they slide up
                document.body.classList.remove('intro-animating');
                
                if (panel1) panel1.classList.add('is-active');

                // --- FINAL UNLOCK (After Panel 1 finishes expanding) ---
                // Panel expansion takes 0.8s (800ms) in your CSS
                setTimeout(() => {
                    document.body.style.pointerEvents = ''; // Unlocks all clicks
                    document.body.classList.remove('hide-ui'); // Fades in Header & Footer
                }, 800);

            }, 700);

        }, 1000); 

    }, 2500); 
});

// ULTIMATE CLICK-TO-EXPAND LOGIC
document.addEventListener('click', (e) => {
    // --- MASTER LOCK: Ignore all clicks until the intro finishes and UI appears ---
    if (document.body.classList.contains('hide-ui')) {
        e.preventDefault();
        e.stopPropagation();
        return; 
    }

    const clickedPanel = e.target.closest('.panel');
    if (!clickedPanel) return;
    if (e.target.closest('a')) return;

    e.stopPropagation();

    const isActive = clickedPanel.classList.contains('is-active');
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('is-active'));

    if (!isActive) {
        clickedPanel.classList.add('is-active');
    }
});