(function () {
    "use strict";

    // Early exit if logo carousel not on page
    if (!document.querySelector('.logo-carousel_track-wrapper')) return;

    document.addEventListener('DOMContentLoaded', function () {
        const wrapper = document.querySelector('.logo-carousel_track-wrapper');
        const btn = document.getElementById('logo-carousel-toggle');

        if (!btn) return;

        const pauseIcon = btn.querySelector('.ph-pause').closest('.icon-color');
        const playIcon = btn.querySelector('.ph-play').closest('.icon-color');

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let playing = !reducedMotion;

        function updateState() {
            if (playing) {
                wrapper.style.animationPlayState = 'running';
                pauseIcon.style.display = '';
                playIcon.style.display = 'none';
                btn.setAttribute('aria-label', 'Pause logo carousel');
            } else {
                wrapper.style.animationPlayState = 'paused';
                pauseIcon.style.display = 'none';
                playIcon.style.display = '';
                btn.setAttribute('aria-label', 'Play logo carousel');
            }
        }

        updateState();

        btn.addEventListener('click', function () {
            playing = !playing;
            updateState();
        });
    });
})();