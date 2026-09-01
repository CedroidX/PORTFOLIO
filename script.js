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
    
    // Prep the real panel image to be hidden and pitch black
    targetImg.style.opacity = '0';
    targetImg.style.filter = 'brightness(0)';
    targetImg.style.transition = 'opacity 0.8s ease, filter 0.8s ease';

    // Hide Panels 2-5 immediately on load
    const otherPanels = document.querySelectorAll('.panel:not(#panel1)');
    otherPanels.forEach(p => p.classList.add('is-hidden-content'));

    // --- NEW TIMING: Fade text and drain image to black BEFORE flight ---
    setTimeout(() => {
        if(introText) introText.style.opacity = '0';
        
        // Turns the image pure black while it is still sitting in the center
        introImg.style.transition = 'filter 0.5s ease-in-out';
        introImg.style.filter = 'brightness(0)';
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

        // FLIGHT TRANSITION (Image is already black here)
        introImg.style.transition = 'top 1s cubic-bezier(0.25, 1, 0.5, 1), left 1s cubic-bezier(0.25, 1, 0.5, 1), width 1s cubic-bezier(0.25, 1, 0.5, 1), height 1s cubic-bezier(0.25, 1, 0.5, 1), border-radius 1s ease-in-out';
        
        introImg.style.top = `${targetRect.top}px`;
        introImg.style.left = `${targetRect.left}px`;
        introImg.style.width = `${targetRect.width}px`;
        introImg.style.height = `${targetRect.height}px`;
        introImg.style.borderRadius = getComputedStyle(targetImg).borderRadius || '0px';

        // SWAP AND TRIGGER NEW TIMING SEQUENCE
        setTimeout(() => {
            // Reveal the real image from the black void
            targetImg.style.opacity = '1';
            targetImg.style.filter = ''; // Fades from black to normal gray
            
            setTimeout(() => {
                targetImg.style.transition = '';
            }, 800);
            
            loader.style.display = 'none';

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
                document.body.classList.remove('intro-animating');
                
                if (panel1) panel1.classList.add('is-active');

                // --- FINAL UNLOCK (After Panel 1 finishes expanding) ---
                setTimeout(() => {
                    document.body.style.pointerEvents = '';
                    document.body.classList.remove('hide-ui');
                }, 800);

            }, 700);

        }, 1000); 

    }, 2500); 
});

// ULTIMATE CLICK-TO-EXPAND LOGIC
document.addEventListener('click', (e) => {
    // Master Lock
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