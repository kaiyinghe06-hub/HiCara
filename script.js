const clouds = document.querySelectorAll('.cloud');
const mainView = document.getElementById('mainView');
const educationView = document.getElementById('educationView');
const experienceView = document.getElementById('experienceView');
const leadershipView = document.getElementById('leadershipView');
const skillsView = document.getElementById('skillsView');
const marketResearchView = document.getElementById('marketResearchView');
const posterView = document.getElementById('posterView');
const triggerBox = document.getElementById('triggerBox');
const cloudsContainer = document.getElementById('cloudsContainer');

const portfolioTrigger = document.getElementById('portfolioTrigger');
const portfolioModal = document.getElementById('portfolioModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const marketResearchItem = document.getElementById('marketResearchItem');
const posterItem = document.getElementById('posterItem');

let cloudsShown = 0;
let isAllCloudsVisible = false;
let isAnimating = false;
let hideTimeout = null;

clouds.forEach(cloud => {
    cloud.addEventListener('click', () => {
        const section = cloud.dataset.section;
        showDetail(section);
    });
});

triggerBox.addEventListener('click', () => {
    if (isAnimating) return;
    
    if (isAllCloudsVisible) {
        hideAllClouds();
    } else {
        showNextCloud();
    }
});

function showNextCloud() {
    if (cloudsShown < clouds.length) {
        isAnimating = true;
        
        if (cloudsShown === 0) {
            cloudsContainer.classList.remove('hidden');
            cloudsContainer.classList.add('show');
        }

        clouds[cloudsShown].classList.add('show');
        cloudsShown++;

        if (cloudsShown === clouds.length) {
            isAllCloudsVisible = true;
        }
        
        setTimeout(() => {
            isAnimating = false;
        }, 400);
    }
}

function hideAllClouds() {
    isAnimating = true;
    
    if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
    }
    
    clouds.forEach(cloud => {
        cloud.classList.remove('show');
    });
    cloudsShown = 0;
    isAllCloudsVisible = false;
    
    hideTimeout = setTimeout(() => {
        cloudsContainer.classList.remove('show');
        cloudsContainer.classList.add('hidden');
        isAnimating = false;
        hideTimeout = null;
    }, 400);
}

function showDetail(section) {
    const allViews = [mainView, educationView, experienceView, leadershipView, skillsView, marketResearchView, posterView];
    const sectionViews = {
        'education': educationView,
        'experience': experienceView,
        'leadership': leadershipView,
        'skills': skillsView,
        'marketResearch': marketResearchView,
        'poster': posterView
    };

    allViews.forEach(view => view.style.display = 'none');
    
    const targetView = sectionViews[section];
    if (targetView) {
        targetView.style.display = 'flex';
    }
}

function showMain() {
    const allViews = [educationView, experienceView, leadershipView, skillsView, marketResearchView, posterView];
    allViews.forEach(view => view.style.display = 'none');
    mainView.style.display = 'flex';
}

function openPortfolioModal() {
    portfolioModal.classList.add('show');
}

function closePortfolioModal() {
    portfolioModal.classList.remove('show');
}

portfolioTrigger.addEventListener('click', openPortfolioModal);
modalClose.addEventListener('click', closePortfolioModal);
modalOverlay.addEventListener('click', closePortfolioModal);

marketResearchItem.addEventListener('click', () => {
    closePortfolioModal();
    showDetail('marketResearch');
});

posterItem.addEventListener('click', () => {
    closePortfolioModal();
    showDetail('poster');
});

const draggableCharacter = document.getElementById('draggableCharacter');
const characterCorner = document.querySelector('.character-corner');
let isDragging = false;
let startX, startY, initialLeft, initialTop;

draggableCharacter.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDrag);

draggableCharacter.addEventListener('touchstart', startDrag, { passive: false });
document.addEventListener('touchmove', drag, { passive: false });
document.addEventListener('touchend', stopDrag);

function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    characterCorner.classList.add('dragging');
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    startX = clientX;
    startY = clientY;
    initialLeft = characterCorner.offsetLeft;
    initialTop = characterCorner.offsetTop;
}

function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - startX;
    const deltaY = clientY - startY;
    
    const containerRect = document.querySelector('.app-container').getBoundingClientRect();
    const characterRect = characterCorner.getBoundingClientRect();
    
    let newLeft = initialLeft + deltaX;
    let newTop = initialTop + deltaY;
    
    newLeft = Math.max(0, Math.min(newLeft, containerRect.width - characterRect.width));
    newTop = Math.max(0, Math.min(newTop, containerRect.height - characterRect.height));
    
    characterCorner.style.left = newLeft + 'px';
    characterCorner.style.top = newTop + 'px';
    characterCorner.style.right = 'auto';
    characterCorner.style.bottom = 'auto';
}

function stopDrag() {
    isDragging = false;
    characterCorner.classList.remove('dragging');
}

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');

function openLightbox(img) {
    lightboxImage.src = img.src;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('show');
    document.body.style.overflow = '';
}

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('show')) {
        closeLightbox();
    }
});