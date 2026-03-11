(function () {
    "use strict";

    // Early exit if no header on page
    if (!document.querySelector(".header")) return;

    window.addEventListener("load", function () {

        // ============================================
        // MOBILE NAVIGATION
        // ============================================

        const menuToggle = document.getElementById("mobile-menu-toggle");

        if (menuToggle) {

            // Toggle menu
            menuToggle.addEventListener("click", function (e) {
                e.preventDefault();

                const isExpanded = this.getAttribute("aria-expanded") === "true";

                if (isExpanded) {
                    this.setAttribute("aria-expanded", "false");
                    this.setAttribute("aria-label", "Open navigation menu");
                    document.body.classList.remove("mobile-menu-open");
                    document.body.style.overflow = "";
                } else {
                    this.setAttribute("aria-expanded", "true");
                    this.setAttribute("aria-label", "Close navigation menu");
                    document.body.classList.add("mobile-menu-open");
                    document.body.style.overflow = "hidden";

                    // Only auto-focus for keyboard/mouse users, not touch
                    setTimeout(function () {
                        const isTouch = window.matchMedia("(pointer: coarse)").matches;
                        if (!isTouch) {
                            const firstLink = document.querySelector(".header_nav .nav-link");
                            if (firstLink) firstLink.focus();
                        }
                    }, 100);
                }
            });

            // Close on Escape
            document.addEventListener("keydown", function (e) {
                const isMenuOpen = menuToggle.getAttribute("aria-expanded") === "true";
                if (e.key === "Escape" && isMenuOpen) {
                    menuToggle.click();
                    menuToggle.focus();
                }
            });

            // Focus trap
            document.addEventListener("keydown", function (e) {
                const isMenuOpen = menuToggle.getAttribute("aria-expanded") === "true";
                if (!isMenuOpen || e.key !== "Tab") return;

                const navLinks = document.querySelectorAll(".header_nav .nav-link");
                const firstLink = navLinks[0];
                const lastLink = navLinks[navLinks.length - 1];

                if (e.shiftKey && document.activeElement === firstLink) {
                    e.preventDefault();
                    menuToggle.focus();
                }
                if (!e.shiftKey && document.activeElement === lastLink) {
                    e.preventDefault();
                    menuToggle.focus();
                }
                if (e.shiftKey && document.activeElement === menuToggle) {
                    e.preventDefault();
                    lastLink.focus();
                }
                if (!e.shiftKey && document.activeElement === menuToggle) {
                    e.preventDefault();
                    firstLink.focus();
                }
            });

            // Close on nav link click (mobile)
            const navLinks = document.querySelectorAll(".header_nav .nav-link");
            navLinks.forEach(function (link) {
                link.addEventListener("click", function () {
                    const isMobile = window.matchMedia("(max-width: 61.9375rem)").matches;
                    if (isMobile) menuToggle.click();
                });
            });
        }

        // ============================================
        // LIVE TIME DISPLAY
        // ============================================

        function updateTime() {
            const timeDisplays = document.querySelectorAll(
                "#time-display, #mobile-time-display"
            );
            if (timeDisplays.length === 0) return;

            const now = new Date();
            const timeString = now.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "Europe/London",
            });

            timeDisplays.forEach(function (display) {
                display.textContent = timeString;
            });

            document.querySelectorAll("time.header_time").forEach(function (el) {
                el.setAttribute("datetime", now.toISOString());
            });
        }

        function startClock() {
            updateTime();
            const now = new Date();
            const msUntilNextMinute =
                (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
            setTimeout(function () {
                updateTime();
                setInterval(updateTime, 60000);
            }, msUntilNextMinute);
        }

        startClock();

        // ============================================
        // HEADER SCROLL BEHAVIOUR (GSAP)
        // ============================================

        if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

        gsap.registerPlugin(ScrollTrigger);

        let lastDirection = 0;

        ScrollTrigger.create({
            start: "top -100",
            onUpdate: function (self) {
                if (self.direction !== lastDirection) {
                    lastDirection = self.direction;
                    gsap.to(".header", {
                        yPercent: self.direction === 1 ? -100 : 0,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                }
            },
        });

    });
})();