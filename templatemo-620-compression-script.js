window.addEventListener('load', () => {
    const loader = document.getElementById('intro-loader');
    const introImg = document.querySelector('.intro-img');
    const introText = document.querySelector('.intro-text');
    const targetImg = document.getElementById('panel1-img');
    const panel1 = document.getElementById('panel1'); 

    // Lock the page during animation
    document.body.style.pointerEvents = 'none';
    targetImg.style.opacity = '0';

    // Fade the text out early
    setTimeout(() => {
        if(introText) introText.style.opacity = '0';
    }, 1800); 

    setTimeout(() => {
        loader.style.backgroundColor = 'transparent';

        const targetRect = targetImg.getBoundingClientRect();
        const introRect = introImg.getBoundingClientRect();

        // Lock intro image to fixed positioning at its exact current spot
        introImg.style.position = 'fixed';
        introImg.style.margin = '0'; 
        introImg.style.top = `${introRect.top}px`;
        introImg.style.left = `${introRect.left}px`;
        introImg.style.width = `${introRect.width}px`;
        introImg.style.height = `${introRect.height}px`;
        introImg.style.borderRadius = '50%'; 
        
        introImg.offsetHeight; // Force browser layout recalculation

        // SIMULTANEOUS FLIGHT AND MORPH TRANSITION
        introImg.style.transition = 'top 1s cubic-bezier(0.25, 1, 0.5, 1), left 1s cubic-bezier(0.25, 1, 0.5, 1), width 1s cubic-bezier(0.25, 1, 0.5, 1), height 1s cubic-bezier(0.25, 1, 0.5, 1), border-radius 1s ease-in-out';
        
        introImg.style.top = `${targetRect.top}px`;
        introImg.style.left = `${targetRect.left}px`;
        introImg.style.width = `${targetRect.width}px`;
        introImg.style.height = `${targetRect.height}px`;
        introImg.style.borderRadius = getComputedStyle(targetImg).borderRadius || '0px';

        // SWAP, UNLOCK, & AUTO-EXPAND
        setTimeout(() => {
            targetImg.style.opacity = '1';
            loader.style.display = 'none';
            
            // Completely strip the pointer-events lock so the body goes back to normal
            document.body.style.pointerEvents = '';

            // Auto-expand Panel 1
            if (panel1) {
                panel1.classList.add('is-active');
            }

        }, 1000); 

    }, 2500); 
});

// ULTIMATE CLICK-TO-EXPAND LOGIC
document.addEventListener('click', (e) => {
    // Find the closest panel to wherever the user clicked
    const clickedPanel = e.target.closest('.panel');
    
    // If they didn't click inside a panel, do nothing
    if (!clickedPanel) return;

    // If they clicked a button or a link inside the panel, let that link work normally!
    if (e.target.closest('a')) return;

    // Stop the click from accidentally triggering anything else in the background
    e.stopPropagation();

    // Check if the clicked panel is already expanded
    const isActive = clickedPanel.classList.contains('is-active');

    // Collapse all panels first
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('is-active'));

    // Expand the clicked panel if it wasn't already open
    if (!isActive) {
        clickedPanel.classList.add('is-active');
    }
});