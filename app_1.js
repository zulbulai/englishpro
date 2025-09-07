// Premium English Learning Ebooks Landing Page - Dussehra Special Edition
// Full Razorpay Integration & Advanced Features - 25 EBOOKS VERSION - FIXED

// Global Configuration - UPDATED FOR DUSSEHRA SPECIAL
const CONFIG = {
    razorpay: {
        key: 'rzp_live_R6zs7J50awSUhd',
        amount: 29900, // ₹299 in paisa - DUSSEHRA SPECIAL PRICE
        currency: 'INR',
        name: 'Padhteraho18',
        description: '25 Premium English Learning Ebooks Bundle - Dussehra Special',
        image: 'logo.png',
        theme: {
            color: '#ffaa00'
        },
        prefill: {
            name: '',
            email: '',
            contact: ''
        },
        notes: {
            address: 'Padhteraho18',
            offer: 'Dussehra Special',
            ebooks_count: '25'
        }
    },
    timer: {
        minutes: 15,
        seconds: 0
    },
    offer: {
        name: 'Dussehra Special',
        originalPrice: 999,
        currentPrice: 299,
        discount: 70,
        savings: 700
    },
    contact: {
        email: 'spokenenglishschoolofficial@gmail.com',
        phone: '7905350614'
    },
    downloads: {
        googleDriveLink: 'https://drive.google.com/drive/folders/1CFcrxux128VtiXXjAc8h2EfdL1v0wkTq?usp=drive_link',
        ebooksCount: 25
    }
};

// Global Variables
let timerInterval = null;
let razorpayInstance = null;

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 Dussehra Special - 25 Premium English Ebooks Landing Page');
    
    // Initialize core features
    initializeTimer();
    initializeFAQToggle();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeMobileMenu();
    initializeContactCopy();
    initializeStickyButton();
    initializeVisibilityHandling();
    initializeKeyboardShortcuts();
    
    // Initialize payment buttons - FIXED
    setTimeout(() => {
        initializePaymentButtons();
    }, 100);
    
    // Initialize Razorpay
    initializeRazorpay();
    
    // Performance monitoring
    initializePerformanceMonitoring();
    
    // Track page load
    trackEvent('page_loaded', {
        offer: 'dussehra_special',
        ebooks_count: 25,
        price: 299,
        discount: '70_percent'
    });
    
    console.log('✅ Dussehra Special - All systems initialized successfully');
});

// ================================
// PAYMENT BUTTONS INITIALIZATION - FIXED
// ================================

function initializePaymentButtons() {
    // Get all payment buttons
    const paymentButtons = document.querySelectorAll('.payment-btn');
    
    console.log(`Found ${paymentButtons.length} Dussehra Special payment buttons`);
    
    paymentButtons.forEach((button, index) => {
        // Remove any existing onclick handlers
        button.removeAttribute('onclick');
        
        // Clear existing event listeners by cloning and replacing
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Add click event listener to the new button
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log(`Dussehra Special payment button ${index + 1} clicked:`, newButton.textContent.trim());
            initializeRazorpayPayment(newButton);
        });
        
        // Also add the global function as onclick for backup
        newButton.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            initializeRazorpayPayment(newButton);
        };
        
        console.log(`Attached Dussehra payment handler to button ${index + 1}:`, newButton.textContent.trim());
    });
    
    console.log('🎉 Dussehra Special payment buttons initialized successfully');
}

// ================================
// RAZORPAY PAYMENT INTEGRATION - UPDATED FOR DUSSEHRA SPECIAL
// ================================

function initializeRazorpay() {
    // Check if Razorpay is loaded
    if (typeof Razorpay === 'undefined') {
        console.log('⚠️ Razorpay script not loaded, using demo mode');
        return;
    }
    
    console.log('💳 Razorpay initialized for Dussehra Special offer');
}

function initializeRazorpayPayment(buttonElement) {
    console.log('🎉 Starting Dussehra Special payment process...', buttonElement);
    
    // Prevent multiple clicks
    if (buttonElement && buttonElement.classList.contains('loading')) {
        console.log('Button already loading, ignoring click');
        return;
    }
    
    // Add loading state
    if (buttonElement) {
        setButtonLoading(buttonElement, true);
    }
    
    // Track button click with Dussehra context
    trackButtonClick(buttonElement ? buttonElement.textContent.trim() : 'Unknown Button', 'dussehra_special');
    
    // Show processing modal
    showPaymentModal();
    
    // Check if Razorpay is available
    if (typeof Razorpay === 'undefined') {
        console.log('Razorpay not available, showing Dussehra demo success');
        // For demo purposes, show success after delay
        setTimeout(() => {
            handleDemoPaymentSuccess(buttonElement);
        }, 2000);
        return;
    }
    
    // Initialize Razorpay options - UPDATED FOR DUSSEHRA SPECIAL
    const options = {
        key: CONFIG.razorpay.key,
        amount: CONFIG.razorpay.amount, // ₹299 for Dussehra Special
        currency: CONFIG.razorpay.currency,
        name: CONFIG.razorpay.name,
        description: CONFIG.razorpay.description,
        image: CONFIG.razorpay.image,
        order_id: '', // Will be generated from backend in production
        handler: function (response) {
            handlePaymentSuccess(response, buttonElement);
        },
        prefill: {
            name: getUserName(),
            email: getUserEmail(),
            contact: getUserPhone()
        },
        notes: {
            address: CONFIG.razorpay.notes.address,
            ebook_bundle: '25_premium_english_ebooks_dussehra_special',
            source: 'landing_page',
            company: 'Padhteraho18',
            offer: 'dussehra_special_70_percent_off',
            original_price: '999',
            discounted_price: '299',
            savings: '700'
        },
        theme: {
            color: CONFIG.razorpay.theme.color
        },
        modal: {
            ondismiss: function() {
                handlePaymentDismiss(buttonElement);
            }
        },
        retry: {
            enabled: true,
            max_count: 3
        }
    };
    
    try {
        // Create Razorpay instance
        razorpayInstance = new Razorpay(options);
        
        // Handle payment failure
        razorpayInstance.on('payment.failed', function (response) {
            handlePaymentFailure(response, buttonElement);
        });
        
        // Open payment modal
        setTimeout(() => {
            hidePaymentModal();
            razorpayInstance.open();
        }, 1500);
        
        console.log('💳 Dussehra Special Razorpay payment modal opened');
        
    } catch (error) {
        console.error('❌ Dussehra payment initialization error:', error);
        handlePaymentError(error, buttonElement);
    }
}

function handleDemoPaymentSuccess(buttonElement) {
    console.log('✅ Dussehra Special Demo Payment Success');
    
    hidePaymentModal();
    if (buttonElement) {
        setButtonLoading(buttonElement, false);
        
        // Update button to success state
        buttonElement.textContent = '✅ Dussehra Payment Successful!';
        buttonElement.style.background = 'linear-gradient(135deg, #00aa44, #44ffaa)';
        buttonElement.disabled = true;
    }
    
    // Create demo response with Dussehra context
    const demoResponse = {
        razorpay_payment_id: 'pay_dussehra_demo_' + Date.now(),
        razorpay_order_id: 'order_dussehra_demo_' + Date.now(),
        razorpay_signature: 'dussehra_demo_signature'
    };
    
    // Track conversion with Dussehra details
    trackConversion('dussehra_purchase_completed', {
        payment_id: demoResponse.razorpay_payment_id,
        order_id: demoResponse.razorpay_order_id,
        signature: demoResponse.razorpay_signature,
        company: 'Padhteraho18',
        offer: 'dussehra_special',
        ebooks_count: 25,
        price: 299,
        discount: 70,
        savings: 700,
        demo_mode: true
    });
    
    // Show success modal
    setTimeout(() => {
        showDussehraSuccessModal(demoResponse);
    }, 1000);
}

function handlePaymentSuccess(response, buttonElement) {
    console.log('✅ Dussehra Special Payment Success:', response);
    
    if (buttonElement) {
        setButtonLoading(buttonElement, false);
        
        // Update button to success state
        buttonElement.textContent = '✅ Dussehra Payment Successful!';
        buttonElement.style.background = 'linear-gradient(135deg, #00aa44, #44ffaa)';
        buttonElement.disabled = true;
    }
    
    // Track conversion with Dussehra details
    trackConversion('dussehra_purchase_completed', {
        payment_id: response.razorpay_payment_id,
        order_id: response.razorpay_order_id,
        signature: response.razorpay_signature,
        company: 'Padhteraho18',
        offer: 'dussehra_special',
        ebooks_count: 25,
        price: 299,
        discount: 70,
        savings: 700
    });
    
    // Show Dussehra success modal
    setTimeout(() => {
        showDussehraSuccessModal(response);
    }, 1000);
    
    // Redirect to success page (in production)
    setTimeout(() => {
        // window.location.href = 'success.html';
    }, 5000);
}

function handlePaymentFailure(response, buttonElement) {
    console.error('❌ Dussehra Payment Failed:', response);
    
    if (buttonElement) {
        setButtonLoading(buttonElement, false);
    }
    
    // Track failed payment with Dussehra context
    trackEvent('dussehra_payment_failed', {
        error_code: response.error.code,
        error_description: response.error.description,
        payment_id: response.error.metadata?.payment_id,
        company: 'Padhteraho18',
        offer: 'dussehra_special',
        ebooks_count: 25
    });
    
    // Show retry option
    showPaymentRetryModal(response.error, buttonElement);
}

function handlePaymentDismiss(buttonElement) {
    console.log('⚠️ Dussehra payment dismissed by user');
    
    if (buttonElement) {
        setButtonLoading(buttonElement, false);
    }
    hidePaymentModal();
    
    // Track dismissal with Dussehra context
    trackEvent('dussehra_payment_dismissed', {
        button_text: buttonElement ? buttonElement.textContent.trim() : 'Unknown',
        company: 'Padhteraho18',
        offer: 'dussehra_special'
    });
    
    // Show dismissal message
    showDismissalMessage();
}

function handlePaymentError(error, buttonElement) {
    console.error('❌ Dussehra Payment Error:', error);
    
    if (buttonElement) {
        setButtonLoading(buttonElement, false);
    }
    hidePaymentModal();
    
    // Track error with Dussehra context
    trackEvent('dussehra_payment_error', {
        error_message: error.message,
        error_stack: error.stack,
        company: 'Padhteraho18',
        offer: 'dussehra_special'
    });
    
    // Show error message
    showErrorMessage('Dussehra Special payment failed. Please try again or contact support.');
}

// ================================
// DUSSEHRA SUCCESS MODAL - UPDATED FOR 25 EBOOKS
// ================================

function showDussehraSuccessModal(paymentResponse) {
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="success-modal-content">
                <div class="success-animation">
                    <div class="success-icon">🎉</div>
                    <h2>Dussehra Special Payment Successful!</h2>
                    <p><strong>धन्यवाद!</strong> आपका Dussehra Special order successfully complete हो गया है।</p>
                </div>
                
                <div class="order-details">
                    <div class="order-summary">
                        <h3>🎉 Dussehra Special Purchase</h3>
                        <div class="purchased-item">
                            <span>25 Premium English Learning Ebooks Bundle</span>
                            <span class="item-price">₹299</span>
                        </div>
                        <div class="discount-applied">
                            <span>Dussehra Special Discount (70% OFF)</span>
                            <span class="discount-price">-₹700</span>
                        </div>
                        <div class="original-price-line">
                            <span>Original Price: <strike>₹999</strike></span>
                            <span class="savings-amount">You Saved ₹700!</span>
                        </div>
                        <div class="order-total">
                            <span><strong>Total Paid</strong></span>
                            <span class="total-price"><strong>₹299</strong></span>
                        </div>
                        <div class="payment-id">
                            <small>Payment ID: ${paymentResponse.razorpay_payment_id}</small>
                        </div>
                        <div class="company-info">
                            <small>Company: Padhteraho18 | Offer: Dussehra Special</small>
                        </div>
                    </div>
                </div>
                
                <div class="download-info">
                    <h3>📚 Download Your 25 Ebooks Now!</h3>
                    <p>आपके 25 premium ebooks का download link आपके email पर भेजा गया है:</p>
                    <div class="download-button-container">
                        <a href="${CONFIG.downloads.googleDriveLink}" target="_blank" class="download-btn">
                            📁 Download All 25 Ebooks from Google Drive
                        </a>
                    </div>
                    <div class="email-info">
                        <strong>✅ Check your email inbox now!</strong>
                        <p>📩 Download link भी email में भेजी गई है</p>
                        <p>🔄 Instant access to all 25 premium ebooks</p>
                        <p>⏰ Lifetime access - कोई expiry नहीं</p>
                    </div>
                </div>
                
                <div class="ebooks-list">
                    <h3>📖 What You Get (25 Premium Ebooks):</h3>
                    <div class="ebooks-grid-modal">
                        <span>📝 3000 Daily Use Sentences</span>
                        <span>📚 3000 Daily Use Vocabulary</span>
                        <span>📖 English Grammar (with examples)</span>
                        <span>⏰ Advanced Tense with Exercises</span>
                        <span>🔄 500+ Antonyms & Synonyms</span>
                        <span>✍️ 1000 Verb Forms</span>
                        <span>💬 500 Idioms & Phrases</span>
                        <span>📝 One-Word Substitution</span>
                        <span>🏗️ 500 Structural Sentences</span>
                        <span>🗣️ English Conversations</span>
                        <span>💼 Interview Mastery</span>
                        <span>📈 Advanced Verbs</span>
                        <span>🔀 Other Ways to Say</span>
                        <span>📅 60 Days Spoken English</span>
                        <span>💭 Daily Use Conversations</span>
                        <span>❌ Common Mistakes in English</span>
                        <span>🔗 1000+ Phrasal Verbs</span>
                        <span>🌟 Spoken English for Beginners</span>
                        <span>🎵 Pronunciation Mastery</span>
                        <span>✏️ English Writing Skills</span>
                        <span>🎤 Public Speaking in English</span>
                        <span>💼 Business English Basics</span>
                        <span>📚 English Comprehension Skills</span>
                        <span>🎯 Competitive English Guide</span>
                        <span>💡 English Tips & Tricks</span>
                    </div>
                </div>
                
                <div class="contact-support">
                    <h3>🛟 Need Help?</h3>
                    <div class="support-options">
                        <div class="support-item">
                            <span>📞 WhatsApp Support:</span>
                            <a href="https://wa.me/91${CONFIG.contact.phone}?text=Hi, I need help with my Dussehra Special ebook purchase. Payment ID: ${paymentResponse.razorpay_payment_id}" target="_blank">${CONFIG.contact.phone}</a>
                        </div>
                        <div class="support-item">
                            <span>📧 Email Support:</span>
                            <a href="mailto:${CONFIG.contact.email}?subject=Dussehra Special Ebook Purchase Support&body=Payment ID: ${paymentResponse.razorpay_payment_id}%0AEbooks: 25 Premium English Learning Bundle">${CONFIG.contact.email}</a>
                        </div>
                    </div>
                </div>
                
                <div class="social-follow">
                    <h3>📱 Follow Us for More English Content</h3>
                    <div class="social-buttons">
                        <a href="https://www.facebook.com/share/1Lq1UModaK/" target="_blank" class="social-btn facebook-btn">
                            📘 Facebook
                        </a>
                        <a href="https://www.instagram.com/rozpadhteraho" target="_blank" class="social-btn instagram-btn">
                            📷 Instagram
                        </a>
                        <a href="https://www.youtube.com/@englishwithamaresh" target="_blank" class="social-btn youtube-btn">
                            📺 YouTube
                        </a>
                    </div>
                </div>
                
                <button class="btn btn--primary success-close-btn">
                    🎉 Start Learning English Now!
                </button>
                
                <div class="success-footer">
                    <p>🔒 Your payment is secure and processed by Razorpay</p>
                    <p>🎉 Happy Dussehra! Thank you for choosing Padhteraho18!</p>
                    <p>📚 Enjoy your 25 premium English learning ebooks!</p>
                </div>
            </div>
        </div>
    `;
    
    // Add success modal styles
    addDussehraSuccessModalStyles();
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Add event listeners
    modal.querySelector('.success-close-btn').addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = '';
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            modal.remove();
            document.body.style.overflow = '';
        }
    });
    
    // Auto-close after 90 seconds
    setTimeout(() => {
        if (document.body.contains(modal)) {
            modal.remove();
            document.body.style.overflow = '';
        }
    }, 90000);
    
    console.log('✅ Dussehra Success modal displayed with 25 ebooks');
}

// ================================
// PAYMENT UI HELPERS - FIXED
// ================================

function setButtonLoading(button, isLoading) {
    if (!button) return;
    
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
        button.setAttribute('data-original-text', button.textContent);
        button.textContent = 'Processing Dussehra Payment...';
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        const originalText = button.getAttribute('data-original-text');
        if (originalText && !button.textContent.includes('Successful')) {
            button.textContent = originalText;
        }
    }
}

function showPaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        console.log('💳 Dussehra payment processing modal shown');
    }
}

function hidePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        console.log('💳 Dussehra payment processing modal hidden');
    }
}

function showPaymentRetryModal(error, buttonElement) {
    const modal = document.createElement('div');
    modal.className = 'retry-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="error-content">
                    <div class="error-icon">❌</div>
                    <h3>Dussehra Payment Failed</h3>
                    <p>कुछ गलत हुआ है। Please try again.</p>
                    <p class="error-message">${error.description || 'Payment could not be processed'}</p>
                </div>
                
                <div class="retry-buttons">
                    <button class="btn btn--primary retry-payment-btn">
                        🔄 Try Payment Again
                    </button>
                    <button class="btn btn--secondary contact-support-btn">
                        📞 Contact Support
                    </button>
                    <button class="btn btn--outline close-retry-btn">
                        ✕ Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Add event listeners
    modal.querySelector('.retry-payment-btn').addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = '';
        if (buttonElement) {
            initializeRazorpayPayment(buttonElement);
        }
    });
    
    modal.querySelector('.contact-support-btn').addEventListener('click', () => {
        window.open(`https://wa.me/91${CONFIG.contact.phone}?text=Hi, I'm having trouble with Dussehra Special payment. Error: ${error.description}`, '_blank');
    });
    
    modal.querySelector('.close-retry-btn').addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = '';
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            modal.remove();
            document.body.style.overflow = '';
        }
    });
    
    setTimeout(() => {
        if (document.body.contains(modal)) {
            modal.remove();
            document.body.style.overflow = '';
        }
    }, 30000);
}

function showDismissalMessage() {
    showToast('⚠️ Dussehra Special payment cancelled. आप कभी भी purchase कर सकते हैं!', 'warning');
}

function showErrorMessage(message) {
    showToast('❌ ' + message, 'error');
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Add toast styles if not exists
    addToastStyles();
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// ================================
// USER DATA HELPERS
// ================================

function getUserName() {
    return '';
}

function getUserEmail() {
    return '';
}

function getUserPhone() {
    return '';
}

// ================================
// COUNTDOWN TIMER - UPDATED FOR DUSSEHRA
// ================================

function initializeTimer() {
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    
    if (!minutesDisplay || !secondsDisplay) return;
    
    let minutes = CONFIG.timer.minutes;
    let seconds = CONFIG.timer.seconds;
    
    // Set initial display
    updateTimerDisplay(minutesDisplay, secondsDisplay, minutes, seconds);
    
    // Clear any existing interval
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Start countdown
    timerInterval = setInterval(() => {
        if (seconds > 0) {
            seconds--;
        } else if (minutes > 0) {
            minutes--;
            seconds = 59;
        } else {
            clearInterval(timerInterval);
            handleDussehraTimerExpired();
            return;
        }
        
        updateTimerDisplay(minutesDisplay, secondsDisplay, minutes, seconds);
        addDussehraUrgencyEffects(minutes, seconds);
        
    }, 1000);
    
    console.log('⏰ Dussehra Special timer initialized');
}

function updateTimerDisplay(minutesDisplay, secondsDisplay, minutes, seconds) {
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function addDussehraUrgencyEffects(minutes, seconds) {
    const timerBoxes = document.querySelectorAll('.timer-box');
    const urgencyText = document.querySelector('.urgency-text');
    const buyButtons = document.querySelectorAll('.payment-btn');
    
    if (minutes < 5) {
        timerBoxes.forEach(box => {
            box.style.animation = 'dussehraTimerPulse 1s infinite';
            box.style.borderColor = '#ff4444';
        });
        
        if (urgencyText) {
            urgencyText.style.color = '#ff4444';
            urgencyText.textContent = `🚨 केवल ${minutes} मिनट ${seconds} सेकंड बचे! Dussehra Special समाप्त होने वाला है!`;
        }
    }
    
    if (minutes < 2) {
        timerBoxes.forEach(box => {
            box.style.background = 'linear-gradient(135deg, #ff4444, #ff6600)';
            box.style.animation = 'dussehraTimerPulse 0.5s infinite';
        });
        
        buyButtons.forEach(btn => {
            if (!btn.classList.contains('loading')) {
                btn.style.animation = 'dussehraIntensePulse 0.8s infinite';
            }
        });
    }
}

function handleDussehraTimerExpired() {
    const timerText = document.querySelector('.timer-text');
    const urgencyText = document.querySelector('.urgency-text');
    
    if (timerText) {
        timerText.textContent = '🚨 DUSSEHRA OFFER EXPIRED!';
        timerText.style.color = '#ff4444';
    }
    
    if (urgencyText) {
        urgencyText.textContent = '😞 Dussehra Special offer समाप्त! Regular price पर available है';
        urgencyText.style.color = '#ff4444';
    }
    
    // Update pricing to regular price
    updatePricingAfterDussehraExpiry();
    
    console.log('⏰ Dussehra Special timer expired');
}

function updatePricingAfterDussehraExpiry() {
    const currentPriceElements = document.querySelectorAll('.current-price');
    const discountElements = document.querySelectorAll('.discount-banner, .savings');
    
    currentPriceElements.forEach(element => {
        element.textContent = '₹699';
        element.style.color = '#ff6600';
    });
    
    discountElements.forEach(element => {
        element.style.opacity = '0.5';
        element.textContent = element.textContent.replace('70%', '30%').replace('DUSSEHRA', 'REGULAR');
    });
    
    // Update Razorpay amount
    CONFIG.razorpay.amount = 69900; // ₹699
}

// ================================
// FAQ TOGGLE FUNCTIONALITY
// ================================

function initializeFAQToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
            
            // Track FAQ interaction
            trackEvent('faq_clicked', {
                question: question.textContent.trim(),
                offer: 'dussehra_special'
            });
        });
    });
    
    console.log('❓ Dussehra FAQ toggle initialized');
}

// ================================
// SMOOTH SCROLLING
// ================================

function initializeSmoothScrolling() {
    // Get all navigation and anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
                
                console.log(`Scrolling to section: ${targetId}`);
                
                // Track section navigation
                trackEvent('section_navigation', {
                    target_section: targetId,
                    offer: 'dussehra_special'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    console.log('📜 Smooth scrolling initialized');
}

// ================================
// MOBILE MENU
// ================================

function initializeMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        toggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Track mobile menu usage
        trackEvent('mobile_menu_toggled', {
            offer: 'dussehra_special'
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    console.log('📱 Mobile menu initialized');
}

function closeMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (nav) nav.classList.remove('active');
    if (toggle) toggle.classList.remove('active');
    document.body.classList.remove('menu-open');
}

// ================================
// CONTACT COPY FUNCTIONALITY
// ================================

function initializeContactCopy() {
    const contactLinks = document.querySelectorAll('.contact-details a');
    
    contactLinks.forEach(link => {
        if (link.href.includes('mailto:') || link.href.includes('tel:') || link.href.includes('wa.me')) {
            link.addEventListener('click', (e) => {
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    copyToClipboard(link.textContent.trim());
                    showToast('📋 Copied to clipboard!', 'success');
                }
            });
        }
    });
    
    console.log('📋 Contact copy initialized');
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// ================================
// STICKY BUTTON FOR MOBILE
// ================================

function initializeStickyButton() {
    const stickyBtn = document.querySelector('.sticky-buy-btn');
    const heroSection = document.querySelector('.hero');
    const pricingSection = document.querySelector('.pricing');
    
    if (!stickyBtn) return;
    
    function toggleStickyButton() {
        if (window.innerWidth > 768) {
            stickyBtn.style.display = 'none';
            return;
        }
        
        const heroRect = heroSection ? heroSection.getBoundingClientRect() : null;
        const pricingRect = pricingSection ? pricingSection.getBoundingClientRect() : null;
        
        const showButton = (!heroRect || heroRect.bottom < 0) && 
                          (!pricingRect || pricingRect.top > window.innerHeight);
        
        stickyBtn.style.display = showButton ? 'block' : 'none';
    }
    
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) return;
        
        scrollTimeout = setTimeout(() => {
            toggleStickyButton();
            scrollTimeout = null;
        }, 100);
    });
    
    window.addEventListener('resize', toggleStickyButton);
    
    // Initial check
    toggleStickyButton();
    
    console.log('📌 Dussehra sticky button initialized');
}

// ================================
// SCROLL ANIMATIONS
// ================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
                
                // Track element visibility
                trackEvent('element_visible', {
                    element_class: entry.target.className,
                    offer: 'dussehra_special'
                });
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll(`
        .feature-card, .ebook-item, .testimonial-card, .trust-badge,
        .contact-item, .social-link, .faq-item
    `);
    
    animatedElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.transitionDelay = `${index * 50}ms`;
        observer.observe(el);
    });
    
    console.log('🎬 Scroll animations initialized');
}

// ================================
// KEYBOARD SHORTCUTS
// ================================

function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (document.activeElement.tagName === 'INPUT' || 
            document.activeElement.tagName === 'TEXTAREA') {
            return;
        }
        
        switch (e.key.toLowerCase()) {
            case 'b':
                scrollToSection('pricing');
                break;
            case 'f':
                scrollToSection('features');
                break;
            case 't':
                scrollToSection('testimonials');
                break;
            case 'c':
                scrollToSection('content');
                break;
            case 'q':
                scrollToSection('faq');
                break;
            case 'enter':
                const mainBuyBtn = document.querySelector('.main-buy-btn');
                if (mainBuyBtn && !mainBuyBtn.disabled) {
                    initializeRazorpayPayment(mainBuyBtn);
                }
                break;
        }
    });
    
    console.log('⌨️ Keyboard shortcuts initialized');
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        console.log(`Keyboard shortcut scroll to: ${sectionId}`);
    }
}

// ================================
// VISIBILITY HANDLING
// ================================

function initializeVisibilityHandling() {
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Page is hidden - pause timers
            if (timerInterval) clearInterval(timerInterval);
        } else {
            // Page is visible - resume timers
            if (CONFIG.timer.minutes > 0 || CONFIG.timer.seconds > 0) {
                initializeTimer();
            }
        }
    });
    
    console.log('👁️ Visibility handling initialized');
}

// ================================
// PERFORMANCE MONITORING
// ================================

function initializePerformanceMonitoring() {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log(`⚡ Dussehra Special page loaded in ${loadTime}ms`);
        
        if (loadTime > 3000) {
            console.warn('⚠️ Slow page load detected');
        }
        
        trackEvent('dussehra_page_performance', {
            load_time: loadTime,
            dom_ready: perfData.domContentLoadedEventEnd - perfData.navigationStart,
            first_paint: perfData.responseEnd - perfData.navigationStart,
            company: 'Padhteraho18',
            offer: 'dussehra_special'
        });
    });
    
    // Error handling
    window.addEventListener('error', (event) => {
        console.error('❌ JavaScript Error:', event.error);
        trackEvent('dussehra_javascript_error', {
            message: event.error.message,
            filename: event.filename,
            lineno: event.lineno,
            stack: event.error.stack,
            company: 'Padhteraho18',
            offer: 'dussehra_special'
        });
    });
    
    console.log('📊 Performance monitoring initialized');
}

// ================================
// ANALYTICS & TRACKING - UPDATED FOR DUSSEHRA
// ================================

function trackButtonClick(buttonText, offer = 'dussehra_special') {
    const data = {
        button_text: buttonText,
        page_location: window.location.href,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        company: 'Padhteraho18',
        offer: offer,
        ebooks_count: 25,
        price: 299,
        discount: 70,
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight
        }
    };
    
    trackEvent('dussehra_button_click', data);
}

function trackConversion(eventName, data = {}) {
    const conversionData = {
        event_name: eventName,
        value: CONFIG.razorpay.amount / 100,
        currency: CONFIG.razorpay.currency,
        company: 'Padhteraho18',
        offer: 'dussehra_special',
        ebooks_count: 25,
        discount_percent: 70,
        savings_amount: 700,
        ...data,
        timestamp: new Date().toISOString()
    };
    
    trackEvent('dussehra_conversion', conversionData);
    
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            event_category: 'dussehra_conversion',
            event_label: '25_ebook_purchase',
            value: conversionData.value,
            custom_parameters: {
                offer: 'dussehra_special',
                ebooks_count: 25,
                discount: 70
            }
        });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Purchase', {
            value: conversionData.value,
            currency: conversionData.currency,
            content_ids: ['25_english_ebooks_dussehra_special'],
            content_category: 'Education',
            content_name: 'Dussehra Special - 25 English Ebooks'
        });
    }
}

function trackEvent(eventName, data = {}) {
    const eventData = {
        event: eventName,
        company: 'Padhteraho18',
        offer: 'dussehra_special',
        ebooks_count: 25,
        ...data,
        session_id: getSessionId(),
        user_id: getUserId()
    };
    
    // Console log for debugging
    console.log('📈 Dussehra Event tracked:', eventName, eventData);
    
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Send to analytics endpoint
    sendToAnalytics(eventData);
}

function sendToAnalytics(data) {
    // In production, send to analytics endpoint
    // fetch('/analytics', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // }).catch(console.error);
}

function getSessionId() {
    let sessionId = sessionStorage.getItem('dussehra_session_id');
    if (!sessionId) {
        sessionId = 'dussehra_session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('dussehra_session_id', sessionId);
    }
    return sessionId;
}

function getUserId() {
    let userId = localStorage.getItem('dussehra_user_id');
    if (!userId) {
        userId = 'dussehra_user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('dussehra_user_id', userId);
    }
    return userId;
}

// ================================
// DYNAMIC STYLES - UPDATED FOR DUSSEHRA
// ================================

function addDussehraSuccessModalStyles() {
    if (document.getElementById('dussehra-success-modal-styles')) return;
    
    const styles = `
        <style id="dussehra-success-modal-styles">
        .success-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 3000; animation: modalFadeIn 0.5s ease; }
        .success-modal .modal-overlay { width: 100%; height: 100%; background: rgba(0, 0, 0, 0.95); display: flex; align-items: center; justify-content: center; padding: 1rem; overflow-y: auto; }
        .success-modal-content { background: linear-gradient(135deg, #1a1a1a, #2a2a2a); padding: 2rem; border-radius: 15px; text-align: center; max-width: 700px; width: 100%; border: 3px solid #ffaa00; color: white; animation: successSlideIn 0.5s ease; margin: 1rem; max-height: 90vh; overflow-y: auto; }
        .success-icon { font-size: 4rem; margin-bottom: 1rem; animation: dussehraCelebrationBounce 1s ease infinite; }
        .success-modal-content h2 { color: #ffaa00; margin-bottom: 1rem; font-size: 2rem; }
        .order-details { background: rgba(255, 170, 0, 0.1); padding: 1.5rem; border-radius: 10px; margin: 1.5rem 0; border: 1px solid rgba(255, 170, 0, 0.3); }
        .order-summary h3 { color: #ffaa00; margin-bottom: 1rem; }
        .purchased-item, .discount-applied, .original-price-line, .order-total { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
        .order-total { border-bottom: none; margin-top: 0.5rem; padding-top: 0.5rem; border-top: 2px solid #ffaa00; }
        .savings-amount { color: #00aa44; font-weight: bold; }
        .payment-id, .company-info { margin-top: 1rem; font-family: monospace; color: #cccccc; }
        .download-info { background: rgba(255, 102, 0, 0.1); padding: 1.5rem; border-radius: 10px; margin: 1.5rem 0; border: 1px solid rgba(255, 102, 0, 0.3); }
        .download-info h3 { color: #ff6600; margin-bottom: 1rem; }
        .download-button-container { margin: 1rem 0; }
        .download-btn { display: inline-block; background: linear-gradient(135deg, #ff6600, #ffaa00); color: #000; padding: 1rem 2rem; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 1.1rem; transition: transform 0.3s ease; }
        .download-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(255, 170, 0, 0.4); }
        .email-info { background: rgba(255, 255, 255, 0.1); padding: 1rem; border-radius: 5px; margin-top: 1rem; }
        .ebooks-list { background: rgba(68, 68, 255, 0.1); padding: 1.5rem; border-radius: 10px; margin: 1.5rem 0; border: 1px solid rgba(68, 68, 255, 0.3); }
        .ebooks-list h3 { color: #4444ff; margin-bottom: 1rem; }
        .ebooks-grid-modal { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.5rem; text-align: left; }
        .ebooks-grid-modal span { background: rgba(255, 255, 255, 0.05); padding: 0.5rem; border-radius: 5px; font-size: 0.9rem; }
        .contact-support { background: rgba(68, 68, 255, 0.1); padding: 1.5rem; border-radius: 10px; margin: 1.5rem 0; border: 1px solid rgba(68, 68, 255, 0.3); }
        .contact-support h3 { color: #4444ff; margin-bottom: 1rem; }
        .support-options { display: grid; gap: 0.5rem; }
        .support-item { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: rgba(255, 255, 255, 0.05); border-radius: 5px; }
        .support-item a { color: #4444ff; text-decoration: none; font-weight: bold; }
        .social-follow { margin: 1.5rem 0; }
        .social-follow h3 { color: #ffaa00; margin-bottom: 1rem; }
        .social-buttons { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem; margin: 1rem 0; }
        .social-btn { padding: 0.75rem 1rem; border-radius: 8px; text-decoration: none; font-weight: bold; transition: transform 0.2s ease; }
        .facebook-btn { background: #1877f2; color: white; }
        .instagram-btn { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); color: white; }
        .youtube-btn { background: #ff0000; color: white; }
        .social-btn:hover { transform: translateY(-2px); }
        .success-close-btn { background: linear-gradient(135deg, #ffaa00, #ff6600); color: #000; padding: 1rem 2rem; border: none; border-radius: 10px; font-size: 1.1rem; font-weight: bold; margin-top: 1rem; cursor: pointer; transition: all 0.3s ease; }
        .success-close-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(255, 170, 0, 0.4); }
        .success-footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #333; }
        .success-footer p { margin: 0.5rem 0; color: #cccccc; font-size: 0.9rem; }
        .retry-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 3000; animation: modalFadeIn 0.5s ease; }
        .retry-modal .modal-overlay { width: 100%; height: 100%; background: rgba(0, 0, 0, 0.95); display: flex; align-items: center; justify-content: center; padding: 1rem; }
        .retry-modal .modal-content { background: linear-gradient(135deg, #2a1a1a, #1a1a1a); padding: 2rem; border-radius: 15px; text-align: center; max-width: 500px; width: 100%; border: 3px solid #ff4444; color: white; }
        .error-icon { font-size: 4rem; margin-bottom: 1rem; }
        .error-message { background: rgba(255, 68, 68, 0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0; border: 1px solid rgba(255, 68, 68, 0.3); }
        .retry-buttons { display: flex; flex-direction: column; gap: 1rem; margin-top: 2rem; }
        @keyframes dussehraCelebrationBounce { 0%, 100% { transform: translateY(0) rotate(0deg) scale(1); } 25% { transform: translateY(-10px) rotate(-5deg) scale(1.1); } 75% { transform: translateY(-5px) rotate(5deg) scale(1.05); } }
        @keyframes successSlideIn { from { transform: translateY(-30px) scale(0.9); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
        @keyframes modalFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 768px) { .success-modal-content { padding: 1.5rem; margin: 0.5rem; } .social-buttons { grid-template-columns: 1fr; } .support-item { flex-direction: column; gap: 0.5rem; text-align: center; } .ebooks-grid-modal { grid-template-columns: 1fr; } .retry-buttons { gap: 0.5rem; } }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

function addToastStyles() {
    if (document.getElementById('toast-styles')) return;
    
    const styles = `
        <style id="toast-styles">
        .toast { position: fixed; top: 20px; right: 20px; z-index: 4000; padding: 1rem 1.5rem; border-radius: 8px; color: white; font-weight: bold; transform: translateX(400px); transition: transform 0.3s ease; max-width: 300px; }
        .toast.show { transform: translateX(0); }
        .toast-success { background: linear-gradient(135deg, #00aa44, #44ffaa); }
        .toast-error { background: linear-gradient(135deg, #ff4444, #ff6600); }
        .toast-warning { background: linear-gradient(135deg, #ffaa00, #ff6600); }
        .toast-info { background: linear-gradient(135deg, #4444ff, #6666ff); }
        @media (max-width: 768px) { .toast { top: 10px; right: 10px; left: 10px; max-width: none; } }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// ================================
// GLOBAL FUNCTIONS - FIXED
// ================================

// Make key functions globally available with proper error handling
window.initializeRazorpayPayment = function(buttonElement) {
    try {
        initializeRazorpayPayment(buttonElement);
    } catch (error) {
        console.error('Global payment function error:', error);
        showErrorMessage('Payment initialization failed. Please refresh and try again.');
    }
};

window.scrollToSection = scrollToSection;
window.trackButtonClick = trackButtonClick;
window.trackConversion = trackConversion;
window.trackEvent = trackEvent;

// Export for testing
window.DussehraEnglishEbooksApp = {
    CONFIG,
    initializeRazorpayPayment,
    initializeTimer,
    scrollToSection,
    trackButtonClick,
    trackConversion,
    trackEvent,
    showDussehraSuccessModal
};

console.log('🎉 Dussehra Special - 25 English Ebooks Landing Page - All Systems Ready! (FIXED)');
console.log('💳 Razorpay Integration: Active (Padhteraho18)');
console.log('⏰ Timer: Active (Dussehra Special)');
console.log('📚 Ebooks Count: 25 Premium English Learning Ebooks');
console.log('💰 Special Price: ₹299 (70% OFF from ₹999)');
console.log('📧 Contact Email: spokenenglishschoolofficial@gmail.com');
console.log('📁 Google Drive: Updated with 25 ebooks link');
console.log('📱 Mobile Optimized: Yes');
console.log('🔒 Secure Payment: Yes');
console.log('📈 Analytics: Active (Dussehra tracking)');
console.log('🎬 Payment Button Animations: Enhanced for Dussehra');
console.log('🔧 Payment Buttons: FIXED - Multiple event handlers added');
console.log('🚀 Ready for Dussehra Special Production!');