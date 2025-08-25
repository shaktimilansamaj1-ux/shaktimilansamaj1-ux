function learnMore() {
    alert("Redirecting to Learn More...");
    // window.location.href = "/learn-more.html";
}

function supportWork() {
    alert("Redirecting to Support Our Work...");
    // window.location.href = "/support.html";
}


//about-----
const observers = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".fade-in").forEach((el) => observers.observe(el));

// Optional: Animate cards on scroll
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
});


const counters = document.querySelectorAll(".count");

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const updateCount = () => {
                const target = +counter.getAttribute("data-target");
                const count = +counter.innerText;
                const increment = Math.ceil(target / 100);

                if (count < target) {
                    counter.innerText = count + increment;
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            updateCount();
            observer.unobserve(counter);
        }
    });
}, {
    threshold: 0.6,
});

counters.forEach(counter => observer.observe(counter));


// Fill animation for bar elements
document.querySelectorAll('.bar-fill').forEach(bar => {
    const width = bar.style.getPropertyValue('--fill');
    bar.style.width = width;
});

// Amount button click sets value to input
document.querySelectorAll('.amounts button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText.replace('$', '');
        if (!isNaN(value)) {
            document.getElementById('custom').value = value;
        }
    });
});


// Animate donation bar fill
document.querySelectorAll('.bar-fill').forEach(bar => {
    const width = bar.style.getPropertyValue('--fill');
    bar.style.width = width;
});

// Amount button click sets value to input
document.querySelectorAll('.amounts button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText.replace('$', '');
        if (!isNaN(value)) {
            document.getElementById('custom').value = value;
        }
    });
});



//Contact Form
// JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Form elements animation on scroll
    const animateFormElements = function () {
        const formElements = document.querySelectorAll('.form-group, .checkbox-group, .btn');
        const windowHeight = window.innerHeight;

        formElements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const animationOffset = windowHeight / 1.3;

            if (elementPosition < animationOffset) {
                setTimeout(() => {
                    element.classList.add('visible');
                }, index * 100);
            }
        });
    };

    // Initialize animations
    window.addEventListener('scroll', animateFormElements);
    animateFormElements(); // Run once on load

    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
    contactForm.appendChild(successMessage);

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Reset previous error states
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        document.querySelectorAll('.error-message').forEach(el => el.remove());

        let isValid = true;

        // Validate first name
        const firstName = document.getElementById('firstName');
        if (!firstName.value.trim()) {
            showError(firstName, 'First name is required');
            isValid = false;
        }

        // Validate last name
        const lastName = document.getElementById('lastName');
        if (!lastName.value.trim()) {
            showError(lastName, 'Last name is required');
            isValid = false;
        }

        // Validate email
        const email = document.getElementById('email');
        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        }

        // Validate subject
        const subject = document.getElementById('subject');
        if (!subject.value) {
            showError(subject, 'Please select a subject');
            isValid = false;
        }

        // Validate message
        const message = document.getElementById('message');
        if (!message.value.trim()) {
            showError(message, 'Message is required');
            isValid = false;
        }

        if (isValid) {
            // Form is valid - process submission
            processFormSubmission();
        }
    });

    function showError(input, message) {
        input.classList.add('error');
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        input.parentNode.insertBefore(errorMessage, input.nextSibling);

        // Animate error
        input.style.animation = 'shake 0.5s';
        input.addEventListener('animationend', () => {
            input.style.animation = '';
        });
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function processFormSubmission() {
        // Here you would typically send data to a server
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            newsletter: document.getElementById('newsletter').checked
        };

        console.log('Form submitted:', formData);

        // Show success message
        successMessage.style.display = 'block';
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }

    // Add shake animation for errors
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});

//news letter
document.addEventListener('DOMContentLoaded', function () {
    const newsletterForm = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const successMessage = document.getElementById('successMessage');

    // Validate email format
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Form submission handler
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Reset previous error states
        emailError.style.display = 'none';
        emailInput.style.borderColor = '#ddd';

        // Validate email
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Email address is required';
            emailError.style.display = 'block';
            emailInput.style.borderColor = '#e74c3c';
            return;
        }

        if (!isValidEmail(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            emailInput.style.borderColor = '#e74c3c';
            return;
        }

        // Simulate form submission (replace with actual AJAX call)
        console.log('Subscribing email:', emailInput.value);

        // Show success message
        successMessage.style.display = 'block';
        newsletterForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    });

    // Add animation to form elements
    const formElements = document.querySelectorAll('.form-group, .subscribe-btn');
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
});

//slider home page
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        dots[i].classList.toggle('active', i === index);
    });
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function goToSlide(index) {
    showSlide(index);
}

setInterval(nextSlide, 6000);

// Global functions for button onclick events
function changeSlide(direction) {
    carousel.changeSlide(direction);
}

function goToSlide(index) {
    carousel.goToSlide(index);
}

// Initialize carousel when DOM is loaded
let carousel;
document.addEventListener('DOMContentLoaded', () => {
    carousel = new Carousel();
});

// Handle window resize
window.addEventListener('resize', () => {
    if (carousel) {
        carousel.updateSlide();
    }
});


//story-list
// Filter functionality
document.addEventListener('DOMContentLoaded', function () {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const programCards = document.querySelectorAll('.program-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            programCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


});

// FIXED MOBILE NAVIGATION JAVASCRIPT

// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
    const mobileMenu = document.querySelector(".mobile-menu")

    mobileMenuToggle.addEventListener("click", function () {
        this.classList.toggle("active")
        mobileMenu.classList.toggle("active")
    })

    // Mobile dropdown functionality
    const mobileDropdowns = document.querySelectorAll(".mobile-dropdown")

    mobileDropdowns.forEach((dropdown) => {
        const toggle = dropdown.querySelector(".mobile-dropdown-toggle")

        toggle.addEventListener("click", () => {
            // Close other dropdowns
            mobileDropdowns.forEach((otherDropdown) => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove("active")
                }
            })

            // Toggle current dropdown
            dropdown.classList.toggle("active")
        })
    })

    // Active link functionality
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")

    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            // Remove active class from all links
            navLinks.forEach((l) => l.classList.remove("active"))

            // Add active class to clicked link
            this.classList.add("active")

            // Close mobile menu if open
            mobileMenuToggle.classList.remove("active")
            mobileMenu.classList.remove("active")
        })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".navbar")) {
            mobileMenuToggle.classList.remove("active")
            mobileMenu.classList.remove("active")

            // Close all mobile dropdowns
            mobileDropdowns.forEach((dropdown) => {
                dropdown.classList.remove("active")
            })
        }
    })

    // Navbar scroll effect
    let lastScrollTop = 0
    const navbar = document.querySelector(".navbar")

    window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = "translateY(-100%)"
        } else {
            // Scrolling up
            navbar.style.transform = "translateY(0)"
        }

        lastScrollTop = scrollTop
    })

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()
            const target = document.querySelector(this.getAttribute("href"))

            if (target) {
                const offsetTop = target.offsetTop - 70 // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth",
                })
            }
        })
    })

    // Keyboard navigation for dropdowns
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            // Close mobile menu
            mobileMenuToggle.classList.remove("active")
            mobileMenu.classList.remove("active")

            // Close mobile dropdowns
            mobileDropdowns.forEach((dropdown) => {
                dropdown.classList.remove("active")
            })
        }
    })

    // Handle window resize
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            // Reset mobile menu state on desktop
            mobileMenuToggle.classList.remove("active")
            mobileMenu.classList.remove("active")

            mobileDropdowns.forEach((dropdown) => {
                dropdown.classList.remove("active")
            })
        }
    })
})




//Reports