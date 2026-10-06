/**
 * ============================================================================
 * ARUZ REAL ESTATE & HOLDING - CENTRALIZED TRACKING ENGINE
 * Meta Pixel (Facebook / Instagram) & Google Ads (gtag.js) Universal Connector
 * ============================================================================
 * Features:
 * - Direct Meta Pixel & Google Ads initialization (Zero-impact asynchronous)
 * - Automatic PageView tracking on navigation
 * - Automatic conversion tracking for Leads, WhatsApp Clicks, Dossier Downloads & Calendar Bookings
 * - Dual integration with GHL (GoHighLevel) dataLayer and attribution parameters
 * - Safe fallback & console debugging for setup verification
 * ============================================================================
 */

(function (window, document) {
  'use strict';

  // ============================================================================
  // 1. CONFIGURACIÓN CENTRAL DE SEGUIMIENTO (PEGA AQUÍ TUS IDS)
  // ============================================================================
  window.ARUZ_TRACKING_CONFIG = window.ARUZ_TRACKING_CONFIG || {
    // ------------------------------------------------------------------------
    // A. META PIXEL ID (Facebook & Instagram Ads)
    // ID numérico de 15 o 16 dígitos obtenido de Meta Events Manager
    // Ejemplo: '123456789012345'
    // ------------------------------------------------------------------------
    metaPixelId: '',

    // ------------------------------------------------------------------------
    // B. GOOGLE ADS / GOOGLE TAG ID
    // ID de medición de Google Ads (AW-XXXXXXXXXX) o Google Analytics 4 (G-XXXXXXXXXX)
    // Ejemplo: 'AW-1234567890'
    // ------------------------------------------------------------------------
    googleAdsId: 'AW-3942171870',

    // ------------------------------------------------------------------------
    // C. ETIQUETAS DE CONVERSIÓN DE GOOGLE ADS (Opcionales para seguimiento exacto)
    // Se obtienen al crear una acción de conversión en Google Ads
    // Formato: 'AW-XXXXXXXXXX/EtiquetaAlfanumerica' o solo 'EtiquetaAlfanumerica'
    // ------------------------------------------------------------------------
    googleConversionLabels: {
      leadForm: '',        // Conversión: Envío de formulario principal de preventa
      whatsappClick: '',   // Conversión: Clic en botón de contacto por WhatsApp
      dossierDownload: '', // Conversión: Desbloqueo y descarga de Dossier PDF
      calendarBooking: ''  // Conversión: Agendamiento de recorrido o videollamada VIP
    },

    // ------------------------------------------------------------------------
    // D. MODO DEPURACIÓN / CONSOLE LOGS
    // Cambia a true para ver en la consola del navegador cada evento disparado
    // ------------------------------------------------------------------------
    debug: true
  };

  const config = window.ARUZ_TRACKING_CONFIG;

  function log(...args) {
    if (config.debug) {
      console.log('%c[ARUZ Tracking]', 'background: #EEB623; color: #1C1C1A; font-weight: bold; padding: 2px 6px; border-radius: 3px;', ...args);
    }
  }

  function warn(...args) {
    console.warn('%c[ARUZ Tracking Warning]', 'background: #ba1a1a; color: #fff; font-weight: bold; padding: 2px 6px; border-radius: 3px;', ...args);
  }

  // ============================================================================
  // 2. INICIALIZACIÓN BASE DE META PIXEL
  // ============================================================================
  function initMetaPixel() {
    if (window.fbq) return;

    /* eslint-disable */
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    if(s && s.parentNode) s.parentNode.insertBefore(t,s);
    else document.head.appendChild(t);}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */

    if (config.metaPixelId && config.metaPixelId.trim() !== '') {
      window.fbq('init', config.metaPixelId.trim());
      window.fbq('track', 'PageView');
      log(`Meta Pixel inicializado con ID: ${config.metaPixelId}`);
    } else {
      log('Meta Pixel base cargado. Pendiente configurar metaPixelId en ARUZ_TRACKING_CONFIG.');
    }
  }

  // ============================================================================
  function getCleanGoogleAdsId() {
    let raw = (config.googleAdsId || '').trim();
    if (!raw) return '';
    if (!raw.startsWith('AW-') && !raw.startsWith('G-') && !raw.startsWith('GT-')) {
      raw = 'AW-' + raw.replace(/[^0-9]/g, '');
    }
    return raw;
  }

  // ============================================================================
  // 3. INICIALIZACIÓN BASE DE GOOGLE ADS / GOOGLE TAG (gtag.js)
  // ============================================================================
  function initGoogleTag() {
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
    }

    const gTagId = getCleanGoogleAdsId();
    if (gTagId) {
      const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${gTagId}"]`);
      if (!existingScript) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gTagId)}`;
        document.head.appendChild(script);
      }
      window.gtag('config', gTagId, {
        page_path: window.location.pathname
      });
      log(`Google Tag inicializado con ID: ${gTagId}`);
    } else {
      log('Google Tag base preparado. Pendiente configurar googleAdsId en ARUZ_TRACKING_CONFIG.');
    }
  }

  // Ejecutar inicializadores base
  initMetaPixel();
  initGoogleTag();

  // ============================================================================
  // 4. MÉTODOS UNIVERSALES DE SEGUIMIENTO DE EVENTOS
  // ============================================================================

  // Helper para resolver send_to en conversiones de Google Ads
  function resolveGoogleSendTo(labelKey) {
    const baseId = getCleanGoogleAdsId();
    if (!baseId) return null;
    const label = config.googleConversionLabels && config.googleConversionLabels[labelKey];
    if (label && label.trim() !== '') {
      // Si ya viene con el prefijo AW-XXXXXXXXX/Label
      if (label.includes('/')) return label.trim();
      return `${baseId}/${label.trim()}`;
    }
    return baseId;
  }

  /**
   * Dispara conversión de Lead (Formularios de contacto, preventa, etc.)
   */
  window.aruzTrackLead = function (data = {}) {
    const property = data.interest || data.property || 'Preventa ARUZ';
    const value = data.value || 0;
    const currency = data.currency || 'MXN';

    log('Disparando evento de conversión: LEAD', { property, value, currency, data });

    // 1. Meta Pixel
    try {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {
          content_name: property,
          content_category: 'Real Estate',
          currency: currency,
          value: value
        });
      }
    } catch (e) {
      warn('Error enviando Lead a Meta Pixel:', e);
    }

    // 2. Google Ads / gtag
    try {
      if (typeof window.gtag === 'function') {
        const sendTo = resolveGoogleSendTo('leadForm');
        if (sendTo) {
          window.gtag('event', 'conversion', {
            send_to: sendTo,
            value: value || 1.0,
            currency: currency
          });
        }
        window.gtag('event', 'generate_lead', {
          currency: currency,
          value: value || 0,
          lead_type: property
        });
      }
    } catch (e) {
      warn('Error enviando Lead a Google Ads:', e);
    }

    // 3. DataLayer (GTM / GA4)
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'lead_form_submitted',
        event_category: 'Conversion',
        property_name: property,
        ...data
      });
    } catch (e) {}
  };

  /**
   * Dispara conversión de Contacto por WhatsApp
   */
  window.aruzTrackWhatsApp = function (data = {}) {
    const property = data.property || 'ARUZ Holding General';

    log('Disparando evento de conversión: WHATSAPP CLICK', { property, data });

    // 1. Meta Pixel
    try {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Contact', {
          content_name: `WhatsApp: ${property}`,
          content_category: 'Direct Messaging'
        });
        window.fbq('trackCustom', 'WhatsAppClick', {
          property: property,
          url: window.location.pathname
        });
      }
    } catch (e) {
      warn('Error enviando WhatsApp click a Meta Pixel:', e);
    }

    // 2. Google Ads
    try {
      if (typeof window.gtag === 'function') {
        const sendTo = resolveGoogleSendTo('whatsappClick');
        if (sendTo) {
          window.gtag('event', 'conversion', {
            send_to: sendTo
          });
        }
        window.gtag('event', 'contact', {
          method: 'WhatsApp',
          property: property
        });
      }
    } catch (e) {
      warn('Error enviando WhatsApp click a Google Ads:', e);
    }

    // 3. DataLayer
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        property_name: property,
        ...data
      });
    } catch (e) {}
  };

  /**
   * Dispara evento de Descarga o Apertura de Dossier Técnico
   */
  window.aruzTrackDossier = function (data = {}) {
    const property = data.property || 'Dossier Técnico ARUZ';

    log('Disparando evento: DOSSIER DOWNLOAD', { property, data });

    // 1. Meta Pixel
    try {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'ViewContent', {
          content_name: property,
          content_type: 'Dossier PDF',
          content_category: 'Brochure'
        });
        window.fbq('trackCustom', 'DossierDownloaded', {
          property: property
        });
      }
    } catch (e) {}

    // 2. Google Ads
    try {
      if (typeof window.gtag === 'function') {
        const sendTo = resolveGoogleSendTo('dossierDownload');
        if (sendTo) {
          window.gtag('event', 'conversion', { send_to: sendTo });
        }
        window.gtag('event', 'view_item', {
          item_name: property,
          item_category: 'Dossier PDF'
        });
      }
    } catch (e) {}

    // 3. DataLayer
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'dossier_downloaded',
        event_category: 'Engagement',
        property_name: property,
        ...data
      });
    } catch (e) {}
  };

  /**
   * Dispara evento de Agendamiento en Calendario VIP
   */
  window.aruzTrackCalendar = function (data = {}) {
    const property = data.property || 'Recorrido VIP Mayakoba';

    log('Disparando evento: CALENDAR BOOKING', { property, data });

    // 1. Meta Pixel
    try {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Schedule', {
          content_name: property,
          calendar_id: data.calendar_id || 'aruz-vip-tour'
        });
      }
    } catch (e) {}

    // 2. Google Ads
    try {
      if (typeof window.gtag === 'function') {
        const sendTo = resolveGoogleSendTo('calendarBooking');
        if (sendTo) {
          window.gtag('event', 'conversion', { send_to: sendTo });
        }
        window.gtag('event', 'schedule', {
          property: property,
          calendar_id: data.calendar_id || ''
        });
      }
    } catch (e) {}

    // 3. DataLayer
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'calendar_booking_initiated',
        event_category: 'Schedule',
        property_name: property,
        ...data
      });
    } catch (e) {}
  };

  // ============================================================================
  // 5. AUTO-INTERCEPTOR DE EVENTOS EN EL DOM (Zero-Code Auto Tracking)
  // ============================================================================
  function attachDomListeners() {
    // A. Interceptar clics en enlaces y botones de WhatsApp
    document.addEventListener('click', function (e) {
      const target = e.target.closest('a[href*="whatsapp.com"], a[href*="wa.me"], .floating-whatsapp-btn');
      if (!target) return;

      // Obtener contexto de la propiedad
      let propertyName = target.getAttribute('data-property') || '';
      if (!propertyName) {
        const href = target.getAttribute('href') || '';
        const match = href.match(/text=([^&]+)/);
        if (match && match[1]) {
          propertyName = decodeURIComponent(match[1]).replace(/^Hola[,\s]*/i, '').slice(0, 50);
        }
      }
      if (!propertyName) {
        propertyName = document.title ? document.title.split('|')[0].trim() : 'ARUZ WhatsApp';
      }

      window.aruzTrackWhatsApp({
        property: propertyName,
        cta_href: target.getAttribute('href')
      });
    }, { passive: true });

    // B. Interceptar envíos del formulario principal de leads (#leadCaptureForm)
    const leadForms = document.querySelectorAll('form[id="leadCaptureForm"], form.lead-form');
    leadForms.forEach(form => {
      if (form._aruzTrackingAttached) return;
      form._aruzTrackingAttached = true;

      form.addEventListener('submit', function () {
        const interest = form.querySelector('#leadInterest, #leadProperty, select[name="interest"]')?.value || document.title;
        const name = form.querySelector('#leadName, input[name="name"]')?.value || '';
        const email = form.querySelector('#leadEmail, input[name="email"]')?.value || '';

        window.aruzTrackLead({
          interest: interest,
          name: name,
          email: email,
          form_id: form.id || 'lead_form'
        });
      }, { passive: true });
    });

    // C. Interceptar formulario del precalificador de asesor (#advisorPrequalForm)
    const advisorForm = document.getElementById('advisorPrequalForm');
    if (advisorForm && !advisorForm._aruzTrackingAttached) {
      advisorForm._aruzTrackingAttached = true;
      advisorForm.addEventListener('submit', function () {
        const division = document.getElementById('advDivision')?.value || 'ARUZ Asesor';
        const budget = document.getElementById('advBudget')?.value || '';
        window.aruzTrackLead({
          interest: `Precalificación: ${division} (${budget})`,
          form_id: 'advisorPrequalForm'
        });
      }, { passive: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachDomListeners);
  } else {
    attachDomListeners();
  }

})(window, document);
