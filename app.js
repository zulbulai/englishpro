// Rozpadhteraho Professional Landing Page JavaScript - Fixed Version

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeCountdownTimer();
    initializeUrgentTimer();
    initializeImageSlider();
    initializeFAQ();
    initializeScrollAnimations();
    initializeMobileCTA();
    initializeWhatsAppButton();
    
    // Initialize payment buttons last to avoid conflicts
    setTimeout(() => {
        initializePaymentButtons();
    }, 1000);
    
    // Track page load
    console.log('Rozpadhteraho Landing Page Loaded Successfully');
});

// Navigation functionality
function initializeNavigation() {
    const header = document.getElementById('header');
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// 24-hour Countdown Timer - Header
function initializeCountdownTimer() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!hoursElement || !minutesElement || !secondsElement) {
        console.log('24-hour countdown elements not found');
        return;
    }
    
    // Set countdown to 24 hours from now
    let endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = endTime - now;
        
        if (timeLeft > 0) {
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        } else {
            // Reset to 24 hours when reaches zero
            endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
        }
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
    console.log('24-hour countdown timer initialized');
}

// 15-minute Urgent Timer
function initializeUrgentTimer() {
    const minutesElement = document.getElementById('urgent-minutes');
    const secondsElement = document.getElementById('urgent-seconds');
    
    if (!minutesElement || !secondsElement) {
        console.log('Urgent timer elements not found');
        return;
    }
    
    // Set timer to 15 minutes (900 seconds)
    let timeLeft = 15 * 60; // 15 minutes in seconds
    
    function updateUrgentTimer() {
        if (timeLeft > 0) {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
            
            timeLeft--;
        } else {
            // Reset to 15 minutes when reaches zero
            timeLeft = 15 * 60;
        }
    }
    
    // Update immediately and then every second
    updateUrgentTimer();
    setInterval(updateUrgentTimer, 1000);
    console.log('15-minute urgent timer initialized');
}

// Image Slider functionality - FIXED
function initializeImageSlider() {
    const sliderTrack = document.getElementById('slider-track');
    const dots = document.querySelectorAll('.dot');
    
    if (!sliderTrack || dots.length === 0) {
        console.log('Slider elements not found');
        return;
    }
    
    let currentSlide = 0;
    const totalSlides = dots.length;
    let autoSlideInterval;
    
    // Update slider position
    function updateSlider(slideIndex) {
        const translateX = -slideIndex * 100;
        sliderTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[slideIndex]) {
            dots[slideIndex].classList.add('active');
        }
        
        currentSlide = slideIndex;
    }
    
    // Next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % totalSlides;
        updateSlider(nextIndex);
    }
    
    // Previous slide
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider(prevIndex);
    }
    
    // Auto slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // FIXED: Dot navigation - prevent event bubbling and payment trigger
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            updateSlider(index);
            stopAutoSlide();
            startAutoSlide(); // Restart auto slide
        });
        
        // Ensure dots don't have payment-triggering attributes
        dot.removeAttribute('onclick');
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    sliderTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoSlide();
    });
    
    sliderTrack.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });
    
    sliderTrack.addEventListener('touchend', () => {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        startAutoSlide();
    });
    
    // Pause auto slide on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
        
        // Prevent slider container from triggering payment
        sliderContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('dot')) {
                e.stopPropagation();
            }
        });
    }
    
    // Start auto sliding
    startAutoSlide();
    
    console.log('Image slider initialized with auto-slide and fixed navigation');
}

// FAQ Accordion functionality
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const faqItem = this.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    console.log('FAQ accordion initialized');
}

// Initialize Payment Buttons - IMPROVED
function initializePaymentButtons() {
    // Remove all existing onclick handlers first
    const allElements = document.querySelectorAll('*[onclick]');
    allElements.forEach(el => {
        if (el.getAttribute('onclick')?.includes('handlePayment')) {
            el.removeAttribute('onclick');
        }
    });
    
    // Get specific payment buttons
    const paymentButtons = [
        document.querySelector('.hero__button'),
        document.querySelector('#main-cta'),
        document.querySelector('.timer-cta'),
        ...document.querySelectorAll('button[onclick*="handlePayment"]'),
        ...document.querySelectorAll('.mobile-cta button')
    ].filter(Boolean);
    
    // Also search for buttons with Order text, but exclude slider dots
    const allButtons = document.querySelectorAll('button, .btn');
    
    allButtons.forEach(button => {
        // Skip if it's a slider dot, FAQ question, or modal close button
        if (button.classList.contains('dot') || 
            button.classList.contains('faq-question') ||
            button.classList.contains('payment-modal__close')) {
            return;
        }
        
        const buttonText = button.textContent || button.innerText;
        if (buttonText.includes('Order') || 
            buttonText.includes('₹299') || 
            buttonText.includes('अभी') ||
            buttonText.includes('तुरंत') ||
            button.classList.contains('hero__button') ||
            button.classList.contains('timer-cta')) {
            
            // Remove any existing onclick handlers
            button.removeAttribute('onclick');
            
            // Remove existing event listeners
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add new event listener
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                handlePayment();
            });
            
            console.log('Payment button initialized:', buttonText.trim().substring(0, 30));
        }
    });
    
    console.log('Payment buttons initialized');
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.ebook-card, .testimonial-card, .faq-item, .hero__stats-card, .comparison-column, .ebook-preview'
    );
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    console.log('Scroll animations initialized');
}

// Mobile Sticky CTA
function initializeMobileCTA() {
    const mobileCTA = document.getElementById('mobile-cta');
    
    if (!mobileCTA) return;
    
    let showCTA = false;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Show CTA after scrolling down 300px and on mobile
        if (window.innerWidth <= 768) {
            if (currentScrollY > 300 && !showCTA) {
                mobileCTA.classList.add('show');
                showCTA = true;
            } else if (currentScrollY <= 300 && showCTA) {
                mobileCTA.classList.remove('show');
                showCTA = false;
            }
        }
    });
    
    console.log('Mobile CTA initialized');
}

// WhatsApp Float Button
function initializeWhatsAppButton() {
    const whatsappNumber = '7905350614';
    const whatsappMessage = encodeURIComponent('हैलो! मुझे Rozpadhteraho के 25 Premium English Ebooks के बारे में जानकारी चाहिए। दशहरा Special Offer available है क्या?');
    
    // Remove existing WhatsApp button if any
    const existingButton = document.querySelector('.whatsapp-float');
    if (existingButton) {
        existingButton.remove();
    }
    
    // Create WhatsApp button
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    whatsappBtn.target = '_blank';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = '💬';
    whatsappBtn.title = 'WhatsApp पर संपर्क करें';
    
    // Add click event for better tracking
    whatsappBtn.addEventListener('click', function() {
        console.log('WhatsApp button clicked');
        trackEvent('whatsapp_contact', {
            source: 'float_button'
        });
    });
    
    document.body.appendChild(whatsappBtn);
    console.log('WhatsApp float button initialized');
}

// Main Payment Handler
function handlePayment() {
    console.log('Payment handler called');
    
    // Check if Razorpay is loaded
    if (typeof Razorpay === 'undefined') {
        console.error('Razorpay not loaded, showing contact options');
        showContactModal();
        return;
    }
    
    // Show loading state on the clicked button
    const activeButton = event?.target;
    let originalText = '';
    
    if (activeButton) {
        originalText = activeButton.textContent;
        activeButton.textContent = 'Processing...';
        activeButton.disabled = true;
    }
    
    // Simulate processing time
    setTimeout(() => {
        if (activeButton) {
            activeButton.textContent = originalText;
            activeButton.disabled = false;
        }
        initiateRazorpayPayment();
    }, 1000);
    
    // Track event
    trackEvent('payment_initiated', {
        amount: 29900,
        currency: 'INR'
    });
}

// Contact Modal for cases when Razorpay fails
function showContactModal() {
    removeExistingModals();
    
    const modal = document.createElement('div');
    modal.className = 'payment-modal contact-modal';
    modal.innerHTML = `
        <div class="payment-modal__content">
            <div class="payment-modal__header">
                <h3>🛒 Order करने के लिए संपर्क करें</h3>
                <button class="payment-modal__close">&times;</button>
            </div>
            <div class="payment-modal__body">
                <div class="contact-content">
                    <div class="offer-summary">
                        <h2>दशहरा Special Offer</h2>
                        <div class="price-display">
                            <span class="old-price">₹999</span>
                            <span class="new-price">₹299</span>
                            <span class="discount">70% OFF</span>
                        </div>
                        <p>25 Premium English Learning Ebooks</p>
                    </div>
                    
                    <div class="contact-methods">
                        <h3>📞 तुरंत Order करने के लिए:</h3>
                        
                        <a href="https://wa.me/7905350614?text=${encodeURIComponent('हैलो! मुझे 25 Premium English Ebooks चाहिए। दशहरा Special में ₹299 वाला offer। Payment कैसे करूं?')}" target="_blank" class="contact-btn whatsapp-btn">
                            📱 WhatsApp पर Order करें
                            <small>सबसे Fast Response</small>
                        </a>
                        
                        <a href="tel:7905350614" class="contact-btn call-btn">
                            📞 Call करें: 7905350614
                            <small>9 AM - 9 PM</small>
                        </a>
                        
                        <a href="mailto:padhteraho2021@gmail.com" class="contact-btn email-btn">
                            ✉️ Email करें
                            <small>24 hours में reply</small>
                        </a>
                    </div>
                    
                    <div class="guarantee">
                        <p>✅ <strong>100% Safe Payment</strong></p>
                        <p>⚡ <strong>Instant Delivery</strong> - Payment के तुरंत बाद Google Drive link</p>
                        <p>🔄 <strong>Money Back Guarantee</strong> - Not satisfied? Full refund</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    addModalStyles();
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // FIXED: Add proper modal close functionality
    const closeBtn = modal.querySelector('.payment-modal__close');
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
    });
    
    // Auto close modal background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESC key to close
    const escHandler = function(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

// Razorpay Payment Integration
function initiateRazorpayPayment() {
    console.log('Initializing Razorpay payment');
    
    const options = {
        key: 'rzp_test_RCIo0QJHlZ1ld8', // Test key as specified
        amount: 29900, // Amount in paisa (₹299)
        currency: 'INR',
        name: 'Rozpadhteraho',
        description: '25 Premium English Learning Ebooks - दशहरा Special',
        image: 'https://i.imgur.com/3g7nmJC.png',
        handler: function(response) {
            console.log('Payment Success:', response);
            handlePaymentSuccess(response);
        },
        prefill: {
            name: '',
            email: '',
            contact: ''
        },
        notes: {
            address: 'Rozpadhteraho English Learning',
            offer: 'दशहरा Special - 70% OFF'
        },
        theme: {
            color: '#ff6b35'
        },
        modal: {
            ondismiss: function() {
                console.log('Payment cancelled by user');
                // Don't show failure popup for user cancellation
                console.log('User cancelled payment - returning to page');
            }
        }
    };
    
    try {
        const rzp = new Razorpay(options);
        
        rzp.on('payment.failed', function(response) {
            console.log('Payment Failed:', response.error);
            handlePaymentFailure(response.error.description || 'Payment failed');
        });
        
        rzp.open();
        console.log('Razorpay modal opened');
    } catch (error) {
        console.error('Razorpay Error:', error);
        handlePaymentFailure('Payment system error. Please contact us directly.');
    }
}

// Payment Success Handler
function handlePaymentSuccess(response) {
    const driveLink = 'https://drive.google.com/drive/folders/1CFcrxux128VtiXXjAc8h2EfdL1v0wkTq?usp=drive_link';
    
    showSuccessPopup({
        paymentId: response.razorpay_payment_id,
        driveLink: driveLink
    });
    
    // Track success
    trackEvent('payment_success', {
        payment_id: response.razorpay_payment_id,
        amount: 29900
    });
}

// Payment Failure Handler
function handlePaymentFailure(errorMessage) {
    showFailurePopup(errorMessage);
    
    // Track failure
    trackEvent('payment_failed', {
        error_message: errorMessage
    });
}

// Success Popup - FIXED with proper close functionality
function showSuccessPopup(data) {
    removeExistingModals();
    
    const modal = document.createElement('div');
    modal.className = 'payment-modal success-modal';
    modal.innerHTML = `
        <div class="payment-modal__content">
            <div class="payment-modal__header success-header">
                <h3>🎉 Payment Successful! बधाई हो!</h3>
                <button class="payment-modal__close">&times;</button>
            </div>
            <div class="payment-modal__body">
                <div class="success-content">
                    <div class="success-icon">✅</div>
                    <h2>Order Confirmed!</h2>
                    <p class="success-message">
                        आपका payment successful हो गया है। अब आप 25 Premium English Ebooks access कर सकते हैं।
                    </p>
                    
                    <div class="payment-details">
                        <p><strong>Payment ID:</strong> ${data.paymentId}</p>
                        <p><strong>Amount Paid:</strong> ₹299</p>
                        <p><strong>Access:</strong> Lifetime (No renewal needed)</p>
                    </div>
                    
                    <div class="download-section">
                        <h3>📥 अभी Download करें</h3>
                        <p>नीचे दिए गए link से अभी अपने ebooks access करें:</p>
                        
                        <a href="${data.driveLink}" target="_blank" class="download-btn">
                            📚 Google Drive से Download करें
                        </a>
                        
                        <p class="download-note">
                            <strong>📧 Email भी check करें:</strong> 5 minutes के अंदर आपको email भी मिलेगा download link के साथ।
                        </p>
                    </div>
                    
                    <div class="support-section">
                        <h4>Need Help? हमसे संपर्क करें:</h4>
                        <div class="support-contacts">
                            <a href="tel:7905350614" class="support-btn">
                                📞 Call: 7905350614
                            </a>
                            <a href="mailto:padhteraho2021@gmail.com" class="support-btn">
                                ✉️ Email Support
                            </a>
                            <a href="https://wa.me/7905350614?text=${encodeURIComponent('हैलो! मैंने अभी 25 English Ebooks का payment किया है। Download link चाहिए। Payment ID: ' + data.paymentId)}" target="_blank" class="support-btn">
                                💬 WhatsApp Support
                            </a>
                        </div>
                    </div>
                    
                    <div class="celebration">
                        <p>🎯 अब आप 50,000+ successful students के साथ join हो गए हैं!</p>
                        <p>Happy Learning! 📚✨</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    addModalStyles();
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // FIXED: Add proper modal close functionality
    const closeBtn = modal.querySelector('.payment-modal__close');
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
    });
    
    // Auto close modal background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESC key to close
    const escHandler = function(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

// Failure Popup - FIXED with proper close functionality
function showFailurePopup(errorMessage) {
    removeExistingModals();
    
    const modal = document.createElement('div');
    modal.className = 'payment-modal failure-modal';
    modal.innerHTML = `
        <div class="payment-modal__content">
            <div class="payment-modal__header failure-header">
                <h3>❌ Payment नहीं हुआ</h3>
                <button class="payment-modal__close">&times;</button>
            </div>
            <div class="payment-modal__body">
                <div class="failure-content">
                    <div class="failure-icon">😞</div>
                    <h2>Payment Failed</h2>
                    <p class="failure-message">
                        आपका payment complete नहीं हो सका। लेकिन कोई चिंता की बात नहीं है!
                    </p>
                    
                    <div class="error-details">
                        <p><strong>Error:</strong> ${errorMessage}</p>
                    </div>
                    
                    <div class="retry-section">
                        <h3>🔄 क्या करें?</h3>
                        <p>नीचे दिए गए options में से कोई भी choose करें:</p>
                        
                        <button class="retry-btn" onclick="closeModal(); setTimeout(handlePayment, 500);">
                            🔄 Payment Retry करें
                        </button>
                    </div>
                    
                    <div class="contact-section">
                        <h4>या हमसे Direct Contact करें:</h4>
                        <div class="contact-options">
                            <a href="https://wa.me/7905350614?text=${encodeURIComponent('हैलो! मेरा payment fail हो गया है। 25 English Ebooks का order करना चाहता हूं। Manual payment करना चाहूंगा।')}" target="_blank" class="contact-option-btn whatsapp">
                                📱 WhatsApp पर Order करें
                            </a>
                            <a href="tel:7905350614" class="contact-option-btn call">
                                📞 Call करें: 7905350614
                            </a>
                            <a href="mailto:padhteraho2021@gmail.com" class="contact-option-btn email">
                                ✉️ Email करें
                            </a>
                        </div>
                        
                        <div class="support-hours">
                            <p>📞 <strong>Support Available:</strong> 9 AM - 9 PM (Mon-Sun)</p>
                            <p>⚡ <strong>Quick Response:</strong> WhatsApp पर instant reply मिलेगा</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    addModalStyles();
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // FIXED: Add proper modal close functionality
    const closeBtn = modal.querySelector('.payment-modal__close');
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
    });
    
    // Auto close modal background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESC key to close
    const escHandler = function(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

// Modal Helper Functions - FIXED
function removeExistingModals() {
    const existingModals = document.querySelectorAll('.payment-modal');
    existingModals.forEach(modal => modal.remove());
}

function closeModal() {
    const modals = document.querySelectorAll('.payment-modal');
    modals.forEach(modal => {
        modal.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
            document.body.style.overflow = 'auto';
        }, 300);
    });
}

// Add Modal Styles - Enhanced
function addModalStyles() {
    if (document.querySelector('#modal-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'modal-styles';
    style.textContent = `
        .payment-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            padding: 20px;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .payment-modal__content {
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border-radius: 16px;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
            animation: slideUp 0.3s ease;
            border: 1px solid rgba(255, 107, 53, 0.3);
        }
        
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .payment-modal__header {
            padding: 24px;
            border-bottom: 1px solid rgba(255, 107, 53, 0.3);
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 16px 16px 0 0;
            background: linear-gradient(135deg, #ff6b35, #ff8c5a);
        }
        
        .success-header {
            background: linear-gradient(135deg, #28a745, #20c851);
        }
        
        .failure-header {
            background: linear-gradient(135deg, #dc3545, #c82333);
        }
        
        .payment-modal__header h3 {
            margin: 0;
            color: white;
            font-size: 20px;
        }
        
        .payment-modal__close {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: white;
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s ease;
        }
        
        .payment-modal__close:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        .payment-modal__body {
            padding: 32px 24px;
        }
        
        .contact-content, .success-content, .failure-content {
            text-align: center;
            color: white;
        }
        
        .offer-summary {
            background: rgba(255, 107, 53, 0.1);
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 24px;
            border: 1px solid rgba(255, 107, 53, 0.3);
        }
        
        .price-display {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
            margin: 16px 0;
        }
        
        .old-price {
            color: #999;
            text-decoration: line-through;
            font-size: 18px;
        }
        
        .new-price {
            color: #ff6b35;
            font-size: 32px;
            font-weight: bold;
        }
        
        .discount {
            background: #28a745;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: bold;
        }
        
        .contact-btn, .download-btn, .support-btn, .retry-btn, .contact-option-btn {
            display: inline-block;
            padding: 12px 20px;
            margin: 8px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-size: 14px;
        }
        
        .contact-btn {
            width: calc(100% - 16px);
            margin: 8px 0;
        }
        
        .whatsapp-btn, .whatsapp {
            background: #25d366;
            color: white;
        }
        
        .whatsapp-btn:hover, .whatsapp:hover {
            background: #20c05a;
        }
        
        .call-btn, .call {
            background: #ff6b35;
            color: white;
        }
        
        .call-btn:hover, .call:hover {
            background: #e55a2b;
        }
        
        .email-btn, .email {
            background: rgba(255, 107, 53, 0.2);
            color: #ff6b35;
            border: 1px solid rgba(255, 107, 53, 0.3);
        }
        
        .email-btn:hover, .email:hover {
            background: rgba(255, 107, 53, 0.3);
        }
        
        .download-btn {
            background: linear-gradient(135deg, #28a745, #20c851);
            color: white;
            font-size: 16px;
            margin: 16px 0;
        }
        
        .download-btn:hover {
            background: linear-gradient(135deg, #20c851, #1e7e34);
            transform: translateY(-2px);
        }
        
        .retry-btn {
            background: linear-gradient(135deg, #ff6b35, #ff8c5a);
            color: white;
            font-size: 16px;
            margin: 16px 0;
        }
        
        .retry-btn:hover {
            background: linear-gradient(135deg, #e55a2b, #ff6b35);
            transform: translateY(-2px);
        }
        
        .support-btn {
            background: rgba(255, 107, 53, 0.2);
            color: #ff6b35;
            border: 1px solid rgba(255, 107, 53, 0.3);
            margin: 4px;
        }
        
        .support-btn:hover {
            background: rgba(255, 107, 53, 0.3);
        }
        
        .success-icon, .failure-icon {
            font-size: 64px;
            margin-bottom: 16px;
        }
        
        .success-content h2 {
            color: #28a745;
            margin-bottom: 16px;
            font-size: 28px;
        }
        
        .failure-content h2 {
            color: #dc3545;
            margin-bottom: 16px;
            font-size: 28px;
        }
        
        .contact-methods h3, .retry-section h3, .contact-section h4 {
            color: #ff6b35;
            margin-bottom: 16px;
        }
        
        .contact-options {
            display: flex;
            gap: 8px;
            justify-content: center;
            flex-wrap: wrap;
            margin: 16px 0;
        }
        
        .support-contacts {
            display: flex;
            gap: 8px;
            justify-content: center;
            flex-wrap: wrap;
            margin: 16px 0;
        }
        
        @media screen and (max-width: 480px) {
            .payment-modal {
                padding: 10px;
            }
            
            .contact-options, .support-contacts {
                flex-direction: column;
            }
            
            .contact-option-btn, .support-btn {
                width: 100%;
                margin: 4px 0;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Utility Functions
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    
    // Google Analytics tracking (if available)
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
}

// Initialize page animations on load
window.addEventListener('load', function() {
    console.log('Page fully loaded, initializing animations');
    
    // Add fade-in animation to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        hero.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // Stagger animation for feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
});

// Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    console.error('Error location:', e.filename, e.lineno, e.colno);
});

// Make functions globally available
window.handlePayment = handlePayment;
window.closeModal = closeModal;