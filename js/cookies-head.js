window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

// Set default consent - denied until user accepts (Advanced Consent Mode)
gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied',
    'security_storage': 'granted',
    'wait_for_update': 500
});

// Check for existing consent in localStorage and update if found
(function () {
    var consent = localStorage.getItem('cookie_consent');
    if (consent) {
        try {
            var prefs = JSON.parse(consent);
            if (prefs.analytics) {
                gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
            }
            if (prefs.marketing) {
                gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted'
                });
            }
            if (prefs.functional) {
                gtag('consent', 'update', {
                    'functionality_storage': 'granted',
                    'personalization_storage': 'granted'
                });
            }
        } catch (e) { }
    }
})();

// Google Tag Manager
(function (w, d, s, l, i) {
    w[l] = w[l] || []; w[l].push({
        'gtm.start':
            new Date().getTime(), event: 'gtm.js'
    }); var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-TR9W7S47');