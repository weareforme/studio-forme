(function () {
    "use strict";

    // Early exit if selected work section not on page
    if (!document.querySelector('#work-selected')) return;

    document.addEventListener('DOMContentLoaded', function () {
        const btn = document.querySelector('#work-selected .button[aria-pressed]');
        const videos = document.querySelectorAll('#work-selected video');

        if (!btn) return;

        const btnText = btn.querySelector('.btn-text');
        const icon = btn.querySelector('.icon');
        let playing = true;

        // Respect reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            videos.forEach(function (v) {
                v.autoplay = false;
                v.pause();
            });
            btnText.textContent = 'Play animation';
            icon.classList.replace('ph-pause', 'ph-play');
            btn.setAttribute('aria-pressed', 'true');
            playing = false;
        }

        btn.addEventListener('click', function () {
            if (playing) {
                videos.forEach(function (v) { v.pause(); });
                btnText.textContent = 'Play animation';
                icon.classList.replace('ph-pause', 'ph-play');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                videos.forEach(function (v) { v.play(); });
                btnText.textContent = 'Pause animation';
                icon.classList.replace('ph-play', 'ph-pause');
                btn.setAttribute('aria-pressed', 'false');
            }
            playing = !playing;
        });
    });
})();