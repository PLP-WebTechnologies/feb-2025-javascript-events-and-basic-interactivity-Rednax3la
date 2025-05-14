document.addEventListener('DOMContentLoaded', () => {
    // ========== Event Handling ========== //
    // Color Changer Button
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
    let colorIndex = 0;
    
    colorChanger.addEventListener('click', () => {
        colorIndex = (colorIndex + 1) % colors.length;
        colorChanger.style.backgroundColor = colors[colorIndex];
    });

    // Hover Effect
    const hoverZone = document.getElementById('hover-zone');
    hoverZone.addEventListener('mouseenter', () => {
        hoverZone.style.transform = 'scale(1.05)';
        hoverZone.style.boxShadow = '0 8px 15px rgba(0,0,0,0.2)';
    });
    
    hoverZone.addEventListener('mouseleave', () => {
        hoverZone.style.transform = 'scale(1)';
        hoverZone.style.boxShadow = 'none';
    });

    // Keypress Detection
    const keyDisplay = document.getElementById('key-display');
    document.addEventListener('keypress', (e) => {
        keyDisplay.textContent = `You pressed: ${e.key.toUpperCase()}`;
        keyDisplay.style.backgroundColor = '#FFD700';
        setTimeout(() => keyDisplay.style.backgroundColor = '', 500);
    });

    // Secret Double Click
    const secretTrigger = document.getElementById('secret-trigger');
    secretTrigger.addEventListener('dblclick', () => {
        document.body.style.backgroundColor = '#FFD700';
        setTimeout(() => {
            document.body.style.backgroundColor = '';
        }, 1000);
    });

    // ========== Interactive Elements ========== //
    // Image Slideshow
    const images = [
        'https://picsum.photos/400/300?random=1',
        'https://picsum.photos/400/300?random=2',
        'https://picsum.photos/400/300?random=3'
    ];
    let currentImage = 0;
    const slideshowImage = document.getElementById('slideshow-image');

    document.getElementById('prev-btn').addEventListener('click', () => {
        currentImage = (currentImage - 1 + images.length) % images.length;
        slideshowImage.src = images[currentImage];
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        currentImage = (currentImage + 1) % images.length;
        slideshowImage.src = images[currentImage];
    });

    // Tab System
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            
            // Remove active class from all buttons and panes
            document.querySelectorAll('.tab-btn, .tab-pane').forEach(el => {
                el.classList.remove('active');
            });
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // ========== Form Validation ========== //
    const form = document.getElementById('validation-form');
    const inputs = form.querySelectorAll('input');

    // Real-time Validation
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateField(input);
        });
    });

    // Submit Handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) isValid = false;
        });

        if (isValid) {
            alert('Form submitted successfully! 🎉');
            form.reset();
        }
    });

    function validateField(field) {
        const error = field.nextElementSibling;
        
        if (field.validity.valid) {
            error.textContent = '';
            field.style.borderColor = '#4CAF50';
            return true;
        }

        field.style.borderColor = '#f44336';
        
        if (field.validity.valueMissing) {
            error.textContent = 'This field is required';
        } else if (field.type === 'email') {
            error.textContent = 'Please enter a valid email';
        } else if (field.type === 'password') {
            error.textContent = 'Password must be at least 8 characters';
        }

        return false;
    }
});
