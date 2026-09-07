window.addEventListener('load', () => {
    const loader = document.getElementById('intro-loader');
    const introImg = document.querySelector('.intro-img');
    const targetImg = document.getElementById('panel1-img');
    const panel1 = document.getElementById('panel1'); 
    
    document.body.classList.add('intro-animating', 'hide-ui');
    document.body.style.pointerEvents = 'none';
    
    targetImg.style.opacity = '0';
    targetImg.style.filter = 'brightness(0)';
    targetImg.style.transition = 'opacity 0.8s ease, filter 0.8s ease';

    const otherPanels = document.querySelectorAll('.panel:not(#panel1)');
    otherPanels.forEach(p => p.classList.add('is-hidden-content'));

    setTimeout(() => {
        const introText = document.querySelector('.intro-text');
        
        if (introText) introText.style.opacity = '0'; 
        
        introImg.style.transition = 'filter 0.5s ease-in-out';
        introImg.style.filter = 'brightness(0)';
    }, 3200);

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

        introImg.style.transition = 'top 1s cubic-bezier(0.25, 1, 0.5, 1), left 1s cubic-bezier(0.25, 1, 0.5, 1), width 1s cubic-bezier(0.25, 1, 0.5, 1), height 1s cubic-bezier(0.25, 1, 0.5, 1), border-radius 1s ease-in-out';
        
        introImg.style.top = `${targetRect.top}px`;
        introImg.style.left = `${targetRect.left}px`;
        introImg.style.width = `${targetRect.width}px`;
        introImg.style.height = `${targetRect.height}px`;
        introImg.style.borderRadius = getComputedStyle(targetImg).borderRadius || '0px';

        setTimeout(() => {
            targetImg.style.opacity = '1';
            targetImg.style.filter = '';
            
            setTimeout(() => {
                targetImg.style.transition = '';
            }, 800);
            
            loader.style.display = 'none';

            otherPanels.forEach((panel, index) => {
                setTimeout(() => {
                    panel.classList.remove('is-hidden-content');
                    panel.classList.add('shockwave-reveal');
                    
                    setTimeout(() => {
                        panel.classList.remove('shockwave-reveal');
                    }, 1200); 
                }, index * 150); 
            });

            setTimeout(() => {
                document.body.classList.remove('intro-animating');
                if (panel1) panel1.classList.add('is-active');

                setTimeout(() => {
                    document.body.style.pointerEvents = '';
                    document.body.classList.remove('hide-ui');
                }, 800);
            }, 700);

        }, 1000); 

    }, 4200); 
});

// Click-to-Expand Logic
document.addEventListener('click', (e) => {
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

// Project Modal Logic
const projectTriggers = document.querySelectorAll('[data-target]');
const closeButtons = document.querySelectorAll('.project-modal__close');
const allProjectModals = document.querySelectorAll('.project-modal');

projectTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        const targetId = trigger.getAttribute('data-target');
        const targetModal = document.getElementById(targetId);
        
        if (targetModal) {
            targetModal.classList.add('is-active');
        }
    });
});

function closeAllModals(e) {
    if (e) e.preventDefault(); 
    allProjectModals.forEach(modal => modal.classList.remove('is-active'));
}

closeButtons.forEach(btn => {
    btn.addEventListener('click', closeAllModals);
});

allProjectModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeAllModals(e);
        }
    });
});