wf.ready(function () {
    var banner = document.getElementById('cookie-banner');
    var acceptBtn = document.getElementById('cookie-accept');
    var rejectBtn = document.getElementById('cookie-reject');

    if (!banner || !acceptBtn || !rejectBtn) return;

    // Check existing consent from both sources
    var wfChoice = wf.getUserTrackingChoice();
    var existingConsent = localStorage.getItem('cookie_consent');

    // Show banner if no consent given
    if ((wfChoice !== 'allow' && wfChoice !== 'deny') && !existingConsent) {
        banner.style.display = 'flex';
    }

    // Accept all cookies
    acceptBtn.addEventListener('click', function () {
        var consent = {
            essential: true,
            functional: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('cookie_consent', JSON.stringify(consent));

        // Update GTM consent
        gtag('consent', 'update', {
            'analytics_storage': 'granted',
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'functionality_storage': 'granted',
            'personalization_storage': 'granted'
        });

        // Update Webflow Analyze consent
        wf.allowUserTracking({ activate: true });

        // Push event for GTM
        dataLayer.push({ 'event': 'cookie_consent_granted' });

        banner.style.display = 'none';
    });

    // Reject all (except essential)
    rejectBtn.addEventListener('click', function () {
        var consent = {
            essential: true,
            functional: false,
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('cookie_consent', JSON.stringify(consent));

        // Update Webflow Analyze consent
        wf.denyUserTracking();

        // Push event for GTM
        dataLayer.push({ 'event': 'cookie_consent_denied' });

        banner.style.display = 'none';
    });
});