/**
 * ============================================================================
 * ARUZ - UNIVERSAL ATTRIBUTION & UTM PERSISTENCE ENGINE
 * Captures and persists campaign traffic parameters across user navigation
 * ============================================================================
 */
(function initARUZAttribution() {
  const URL_KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'gclid',
    'fbclid',
    'gad_source',
    'gbraid',
    'wbraid'
  ];

  try {
    const searchParams = new URLSearchParams(window.location.search);
    const captured = {};
    let hasParams = false;

    URL_KEYS.forEach(function (key) {
      if (searchParams.has(key)) {
        captured[key] = searchParams.get(key);
        hasParams = true;
      }
    });

    if (hasParams) {
      sessionStorage.setItem('aruz_attribution_session', JSON.stringify(captured));
      const payload = {
        data: captured,
        timestamp: Date.now(),
        landing_page: window.location.pathname
      };
      localStorage.setItem('aruz_attribution_persistent', JSON.stringify(payload));
    }
  } catch (e) {
    console.warn('[Attribution Engine] Storage access limited:', e);
  }
})();

window.getARUZAttribution = function () {
  try {
    const session = sessionStorage.getItem('aruz_attribution_session');
    if (session) return JSON.parse(session);

    const persistent = localStorage.getItem('aruz_attribution_persistent');
    if (persistent) {
      const parsed = JSON.parse(persistent);
      if (Date.now() - parsed.timestamp < 2592000000) {
        return parsed.data || {};
      }
    }
  } catch (e) {
    console.warn('[Attribution Engine] Read error:', e);
  }
  return {
    utm_source: 'direct',
    utm_medium: 'organic',
    utm_campaign: 'brand_direct'
  };
};
