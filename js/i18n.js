/**
 * ARUZ ENTERPRISE STATIC MULTILINGUAL NAVIGATION & LIVE UTILITIES (ES / EN / FR / IT)
 * Pre-rendered native static subdirectories (/en/, /fr/, /it/) for maximum SEO speed,
 * combined with automatic route detection and language switching.
 */

class AruzI18nEngine {
  constructor() {
    this.supportedLangs = ['es', 'en', 'fr', 'it'];
    this.currentLang = this.detectCurrentLanguage();
    this.init();
  }

  detectCurrentLanguage() {
    const path = window.location.pathname.toLowerCase();
    if (path.startsWith('/en/') || path === '/en') return 'en';
    if (path.startsWith('/fr/') || path === '/fr') return 'fr';
    if (path.startsWith('/it/') || path === '/it') return 'it';
    
    // Check html tag attribute
    const docLang = document.documentElement.getAttribute('lang');
    if (docLang && this.supportedLangs.includes(docLang.toLowerCase())) {
      return docLang.toLowerCase();
    }

    // Check URL search parameter fallback
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && this.supportedLangs.includes(urlLang.toLowerCase())) {
      return urlLang.toLowerCase();
    }

    return 'es';
  }

  init() {
    localStorage.setItem('aruz_lang', this.currentLang);
    this.highlightActiveSwitcherButtons();
  }

  highlightActiveSwitcherButtons() {
    document.querySelectorAll('.aruz-lang-switcher').forEach(switcher => {
      switcher.querySelectorAll('.lang-btn').forEach(btn => {
        const text = btn.textContent.trim().toLowerCase();
        if (text === this.currentLang) {
          btn.className = 'lang-btn px-2.5 py-0.5 rounded-full transition-all bg-dorado-aruz text-carbon-aruz font-extrabold shadow-sm scale-105';
        } else {
          btn.className = 'lang-btn px-2.5 py-0.5 rounded-full transition-all text-white/75 hover:text-dorado-aruz';
        }
      });
    });
  }

  navigateToLanguage(targetLang) {
    if (!this.supportedLangs.includes(targetLang)) return;
    localStorage.setItem('aruz_lang', targetLang);

    let currentPath = window.location.pathname;
    
    // Remove existing language prefix
    if (currentPath.startsWith('/en/')) currentPath = currentPath.slice(3);
    else if (currentPath === '/en') currentPath = '/';
    else if (currentPath.startsWith('/fr/')) currentPath = currentPath.slice(3);
    else if (currentPath === '/fr') currentPath = '/';
    else if (currentPath.startsWith('/it/')) currentPath = currentPath.slice(3);
    else if (currentPath === '/it') currentPath = '/';

    // Build target destination URL
    let dest = '/';
    if (targetLang === 'es') {
      dest = currentPath || '/';
    } else {
      if (currentPath === '/' || currentPath === '') {
        dest = `/${targetLang}`;
      } else {
        dest = `/${targetLang}${currentPath.startsWith('/') ? '' : '/'}${currentPath}`;
      }
    }

    window.location.href = dest;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.AruzI18nInstance = new AruzI18nEngine();
  });
} else {
  window.AruzI18nInstance = new AruzI18nEngine();
}

window.i18n = window.AruzI18nInstance;
