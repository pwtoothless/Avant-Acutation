document.addEventListener("DOMContentLoaded", () => {
    // 1. Shrinking Navbar on Scroll
    const navbar = document.getElementById("navbar");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    })
    
    // 4. Mobile Hamburger Menu Logic
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        // Toggle menu open/close
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    };

    // 2. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100; // Trigger point before element hits the bottom of the screen

        revealElements.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    // Run once on load to catch elements already in view
    revealOnScroll();
    
    // Add event listener for scrolling
    window.addEventListener("scroll", revealOnScroll);

    const zoomButtons = document.querySelectorAll(".zoom-button");

    zoomButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const componentPart = e.target.dataset.componentPart;
            const componentId = e.target.parentNode.dataset.componentId;

            const zoomContent = document.getElementById(`${componentId}-zoom-content`);
            const zoomButton = e.target;

            if (!zoomButton.classList.contains("active")) {
                // Zoom-in the content
                zoomButton.classList.add("active");
                zoomContent.classList.remove("hidden");

                // Add event listener to close on click outside
                document.addEventListener("click", (event) => {
                    if (!event.target.closest(".zoom-content")) {
                        closeZoomContent(zoomContent, zoomButton);
                    }
                });
            } else {
                closeZoomContent(zoomContent, zoomButton);
            }

            // Close the zoom content when clicking on another button
            document.querySelectorAll(".zoom-button").forEach((otherButton) => {
                if (otherButton !== e.target && otherButton.classList.contains("active")) {
                    closeZoomContent(document.getElementById(`${componentId}-zoom-content`), otherButton);
                }
            });
        });
    });

    function closeZoomContent(zoomContent, button) {
        button.classList.remove("active");
        zoomContent.classList.add("hidden");

        // Remove event listener
        document.removeEventListener("click", (event) => {
            if (!event.target.closest(".zoom-content")) {
                closeZoomContent(zoomContent, button);
            }
        });
    }

    // 3. Navbar Toggle on Small Screens
    const navbarToggle = document.getElementById('navbar-toggle');

    window.addEventListener("resize", () => {
        if (window.innerWidth < 768) {
            navbar.classList.remove("large");
            navbar.classList.add("small");
        } else {
            navbar.classList.remove("small");
            navbar.classList.add("large");
        }
    });

    // Run once on load to catch screen size
    window.addEventListener("load", () => {
        if (window.innerWidth < 768) {
            navbar.classList.remove("large");
            navbar.classList.add("small");
        } else {
            navbar.classList.remove("small");
            navbar.classList.add("large");
        }
    });
});
