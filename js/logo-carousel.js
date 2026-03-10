(function () {
    "use strict";

    // Early exit if logo carousel not on page
    if (!document.querySelector('.logo-carousel_track-wrapper')) return;

    document.addEventListener('DOMContentLoaded', function () {
        const wrapper = document.querySelector('.logo-carousel_track-wrapper');
        const toggleBtn = document.getElementById('logo-carousel-toggle');
        const pauseBtn = document.getElementById('pause');
        const playBtn = document.getElementById('play');

        if (!pauseBtn || !playBtn) return;

        // Respect reduced motion
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let playing = !reducedMotion;

        function updateState() {
            if (playing) {
                wrapper.style.animationPlayState = 'running';
                pauseBtn.style.display = '';
                playBtn.style.display = 'none';
                if (toggleBtn) toggleBtn.setAttribute('aria-label', 'Pause logo carousel');
            } else {
                wrapper.style.animationPlayState = 'paused';
                pauseBtn.style.display = 'none';
                playBtn.style.display = '';
                if (toggleBtn) toggleBtn.setAttribute('aria-label', 'Play logo carousel');
            }
        }

        // Set initial state
        updateState();

        pauseBtn.addEventListener('click', function () {
            playing = false;
            updateState();
        });

        playBtn.addEventListener('click', function () {
            playing = true;
            updateState();
        });
    });
})();