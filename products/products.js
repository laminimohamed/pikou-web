document.addEventListener('DOMContentLoaded', () => {
    let currentProductImages = [];
    let currentIndex = 0;
    const lightbox = document.getElementById('lightbox');
    const modalImage = document.getElementById('modalImage');
    const modalDots = document.getElementById('modalDots');

    // Open lightbox
    document.querySelectorAll('.slider-image').forEach((img, index) => {
        img.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            currentProductImages = Array.from(productCard.querySelectorAll('.slider-image')).map(img => img.src);
            currentIndex = index;
            updateModal();
            lightbox.style.display = 'block';
        });
    });

    // Close lightbox
    document.querySelector('.close-btn').addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Click outside to close
    window.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Navigation buttons
    document.querySelector('.prev-btn').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentProductImages.length) % currentProductImages.length;
        updateModal();
    });

    document.querySelector('.next-btn').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentProductImages.length;
        updateModal();
    });

    // Update modal content
    function updateModal() {
        modalImage.src = currentProductImages[currentIndex];
        modalImage.classList.add('active');
        updateDots();
    }

    // Create/update navigation dots
    function updateDots() {
        modalDots.innerHTML = '';
        currentProductImages.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `modal-dot ${index === currentIndex ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateModal();
            });
            modalDots.appendChild(dot);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + currentProductImages.length) % currentProductImages.length;
                updateModal();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % currentProductImages.length;
                updateModal();
            } else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
            }
        }
    });
});