(function () {
    "use strict";
  
    // Early exit if no HLS videos on page
    if (!document.querySelector('video[data-hls-src]')) return;
  
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/hls.js@1.6.11';
    s.defer = true;
    s.onload = function () {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var video = entry.target;
            var src = video.getAttribute('data-hls-src');
  
            if (Hls.isSupported()) {
              var hls = new Hls({
                startLevel: -1,
                capLevelToPlayerSize: true,
              });
              hls.loadSource(src);
              hls.attachMedia(video);
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
              video.src = src;
            }
  
            observer.unobserve(video);
          }
        });
      }, { rootMargin: '10%' });
  
      document.querySelectorAll('video[data-hls-src]').forEach(function (video) {
        observer.observe(video);
      });
    };
  
    document.head.appendChild(s);
  })();