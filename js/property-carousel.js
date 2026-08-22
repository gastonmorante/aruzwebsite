/**
 * ============================================================================
 * ARUZ LUXURY PROPERTY CAROUSEL & LIGHTBOX ENGINE
 * ============================================================================
 * Architectural 4K Photo Carousel for Property Landings:
 * - High-definition 16:9 cinematic slide viewport with ambient gold HUD
 * - Category filter support (Todos, Exteriores, Interiores, Terrazas)
 * - Next / Prev luxury glassmorphic chevron buttons
 * - Swipe / Touch gesture navigation with inertia & resistance
 * - Horizontal synchronized thumbnails track with active gold indicator
 * - Keyboard navigation (Left / Right / ESC)
 * - Auto-rotation with intelligent pause on hover/interaction
 * - Fullscreen 4K Lightbox modal integration
 * ============================================================================
 */

(function () {
  'use strict';

  class AruzPropertyCarousel {
    constructor(containerEl, options = {}) {
      this.container = typeof containerEl === 'string' ? document.querySelector(containerEl) : containerEl;
      if (!this.container) return;

      this.options = Object.assign({
        autoPlay: true,
        autoPlayInterval: 5500,
        aspectRatio: '16/9',
        showThumbnails: true,
        showFilter: true,
        enableLightbox: true
      }, options);

      this.rawItems = [];
      this.filteredItems = [];
      this.currentIndex = 0;
      this.activeFilter = 'all';
      this.isAutoPlaying = this.options.autoPlay;
      this.timer = null;
      this.touchStartX = 0;
      this.touchEndX = 0;

      this.init();
    }

    init() {
      this.extractSlidesFromDOM();
      if (!this.rawItems.length) return;

      this.filteredItems = [...this.rawItems];
      this.buildCarouselDOM();
      this.bindEvents();
      this.updateSlide(0, false);
      this.startAutoplay();
    }

    extractSlidesFromDOM() {
      // 1. Check if elements exist in existing gallery items
      const existingItems = this.container.querySelectorAll('.gallery-item, [data-slide-src]');
      if (existingItems.length > 0) {
        existingItems.forEach((el, index) => {
          const img = el.querySelector('img');
          const src = el.getAttribute('data-slide-src') || (img ? img.getAttribute('src') : '') || '';
          const category = el.classList.contains('exterior') ? 'exterior' : (el.classList.contains('interior') ? 'interior' : 'all');
          const titleEl = el.querySelector('h4, .slide-title');
          const categoryEl = el.querySelector('.font-label-caps, .slide-cat');
          
          const title = el.getAttribute('data-slide-title') || (titleEl ? titleEl.textContent.trim() : `Perspectiva ${index + 1}`);
          const catLabel = el.getAttribute('data-slide-cat') || (categoryEl ? categoryEl.textContent.trim() : (category === 'exterior' ? 'Exterior' : 'Interior'));

          if (src) {
            this.rawItems.push({
              id: index,
              src: src,
              title: title,
              category: category,
              catLabel: catLabel
            });
          }
        });
      }
    }

    buildCarouselDOM() {
      this.container.innerHTML = '';
      this.container.classList.add('aruz-carousel-wrapper');

      // 1. Filter Tabs Bar (if multiple categories exist)
      const exteriorCount = this.rawItems.filter(i => i.category === 'exterior').length;
      const interiorCount = this.rawItems.filter(i => i.category === 'interior').length;
      
      const hasCategories = exteriorCount > 0 && interiorCount > 0;

      let filterHTML = '';
      if (this.options.showFilter && hasCategories) {
        filterHTML = `
          <div class="carousel-filter-bar flex flex-wrap items-center justify-between gap-4 mb-6">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-dorado-profundo animate-pulse"></span>
              <span class="text-xs uppercase font-label-caps font-bold tracking-widest text-dorado-profundo">
                Galería de Autor · <span id="carousel-item-counter">${this.filteredItems.length} Renders</span>
              </span>
            </div>
            <div class="flex flex-wrap gap-2">
              <button type="button" data-filter="all" class="carousel-filter-btn active px-4 py-1.5 rounded-full text-xs font-bold uppercase font-label-caps border border-dorado-aruz bg-dorado-aruz text-carbon-aruz shadow-sm transition-all">
                Todos (${this.rawItems.length})
              </button>
              <button type="button" data-filter="exterior" class="carousel-filter-btn px-4 py-1.5 rounded-full text-xs font-bold uppercase font-label-caps border border-outline-variant/60 bg-white hover:border-dorado-profundo text-carbon-aruz transition-all">
                Exteriores (${exteriorCount})
              </button>
              <button type="button" data-filter="interior" class="carousel-filter-btn px-4 py-1.5 rounded-full text-xs font-bold uppercase font-label-caps border border-outline-variant/60 bg-white hover:border-dorado-profundo text-carbon-aruz transition-all">
                Interiores (${interiorCount})
              </button>
            </div>
          </div>
        `;
      }

      // 2. Main Stage & Viewport
      const stageHTML = `
        ${filterHTML}
        <div class="carousel-stage relative w-full rounded-2xl overflow-hidden bg-black border border-dorado-aruz/30 shadow-2xl group select-none" style="aspect-ratio: 16/9; max-height: 680px;">
          
          <!-- Active Slide Image with crossfade -->
          <div class="carousel-slide-viewport relative w-full h-full overflow-hidden cursor-zoom-in" id="carouselMainViewport">
            <img id="carouselMainImg" src="${this.filteredItems[0]?.src || ''}" alt="Render Principal" class="w-full h-full object-cover transition-all duration-700 ease-out transform group-hover:scale-[1.02]" loading="eager" decoding="async">
            
            <!-- Vignette & HUD Gradients -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none"></div>
            
            <!-- Top HUD Badge Info -->
            <div class="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 z-10">
              <span id="carouselBadgeCat" class="bg-dorado-aruz text-carbon-aruz font-extrabold text-[10px] md:text-xs px-3 py-1 rounded-full uppercase tracking-wider font-label-caps shadow-md">
                ${this.filteredItems[0]?.catLabel || 'Exterior'}
              </span>
              <span id="carouselBadgeCounter" class="bg-black/60 backdrop-blur-md text-white font-mono text-[10px] md:text-xs px-3 py-1 rounded-full border border-white/20">
                1 / ${this.filteredItems.length}
              </span>
            </div>

            <!-- Top Right Fullscreen Zoom Button -->
            <button type="button" id="carouselBtnZoom" class="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-11 md:h-11 rounded-full bg-black/60 hover:bg-dorado-aruz hover:text-carbon-aruz text-white backdrop-blur-md border border-white/20 hover:border-dorado-aruz flex items-center justify-center transition-all duration-300 z-10 shadow-lg hover:scale-105" title="Ver en Pantalla Completa">
              <span class="material-symbols-outlined text-lg md:text-xl">zoom_in</span>
            </button>

            <!-- Bottom HUD Captions -->
            <div class="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 z-10 pointer-events-none">
              <div class="max-w-2xl">
                <div class="text-[10px] md:text-xs font-mono text-dorado-aruz font-bold tracking-widest uppercase mb-1 drop-shadow" id="carouselSubTitle">
                  MEMORIA VISUAL ARUZ · CIUDAD MAYAKOBA
                </div>
                <h3 class="font-serif text-lg sm:text-2xl md:text-3xl text-white font-bold tracking-wide drop-shadow-md leading-tight" id="carouselMainTitle">
                  ${this.filteredItems[0]?.title || ''}
                </h3>
              </div>
            </div>
          </div>

          <!-- Navigation Arrow: Previous -->
          <button type="button" id="carouselBtnPrev" class="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-dorado-aruz text-white hover:text-carbon-aruz backdrop-blur-md border border-white/20 hover:border-dorado-aruz flex items-center justify-center transition-all duration-300 z-20 shadow-xl opacity-80 hover:opacity-100 hover:scale-110 active:scale-95" aria-label="Imagen Anterior">
            <span class="material-symbols-outlined text-xl md:text-2xl">chevron_left</span>
          </button>

          <!-- Navigation Arrow: Next -->
          <button type="button" id="carouselBtnNext" class="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-dorado-aruz text-white hover:text-carbon-aruz backdrop-blur-md border border-white/20 hover:border-dorado-aruz flex items-center justify-center transition-all duration-300 z-20 shadow-xl opacity-80 hover:opacity-100 hover:scale-110 active:scale-95" aria-label="Siguiente Imagen">
            <span class="material-symbols-outlined text-xl md:text-2xl">chevron_right</span>
          </button>

          <!-- Autoplay Progress Indicator Bar -->
          <div class="absolute bottom-0 left-0 h-1 bg-dorado-aruz/80 z-20 transition-all duration-300" id="carouselProgressBar" style="width: 0%;"></div>
        </div>

        <!-- 3. Horizontal Synchronized Thumbnails Track -->
        <div class="carousel-thumbs-wrapper relative w-full mt-4 md:mt-6 overflow-hidden">
          <div class="carousel-thumbs-track flex gap-2.5 md:gap-3 overflow-x-auto py-2 px-1 scroll-smooth no-scrollbar" id="carouselThumbsTrack" style="scrollbar-width: none; -ms-overflow-style: none;">
            ${this.renderThumbnailsHTML()}
          </div>
        </div>
      `;

      this.container.innerHTML = stageHTML;
    }

    renderThumbnailsHTML() {
      return this.filteredItems.map((item, idx) => `
        <button type="button" class="carousel-thumb-item relative flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 md:w-28 md:h-18 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${idx === this.currentIndex ? 'border-dorado-aruz shadow-md scale-105 ring-2 ring-dorado-aruz/40' : 'border-outline-variant/40 opacity-60 hover:opacity-100 hover:border-dorado-aruz/60'}" data-slide-index="${idx}" aria-label="${item.title}">
          <img src="${item.src}" alt="${item.title}" class="w-full h-full object-cover pointer-events-none" loading="lazy">
          <div class="absolute inset-0 bg-black/20"></div>
          ${idx === this.currentIndex ? '<div class="absolute bottom-0 inset-x-0 h-0.5 bg-dorado-aruz"></div>' : ''}
        </button>
      `).join('');
    }

    bindEvents() {
      // Prev / Next
      const btnPrev = this.container.querySelector('#carouselBtnPrev');
      const btnNext = this.container.querySelector('#carouselBtnNext');
      if (btnPrev) btnPrev.addEventListener('click', () => { this.prev(); this.resetAutoplay(); });
      if (btnNext) btnNext.addEventListener('click', () => { this.next(); this.resetAutoplay(); });

      // Click on viewport -> Lightbox
      const viewport = this.container.querySelector('#carouselMainViewport');
      const btnZoom = this.container.querySelector('#carouselBtnZoom');
      if (viewport) {
        viewport.addEventListener('click', (e) => {
          if (!e.target.closest('button')) {
            this.openLightbox();
          }
        });
      }
      if (btnZoom) {
        btnZoom.addEventListener('click', (e) => {
          e.stopPropagation();
          this.openLightbox();
        });
      }

      // Thumbnails click
      const thumbsTrack = this.container.querySelector('#carouselThumbsTrack');
      if (thumbsTrack) {
        thumbsTrack.addEventListener('click', (e) => {
          const btn = e.target.closest('.carousel-thumb-item');
          if (btn) {
            const idx = parseInt(btn.getAttribute('data-slide-index'), 10);
            if (!isNaN(idx)) {
              this.updateSlide(idx);
              this.resetAutoplay();
            }
          }
        });
      }

      // Filter Buttons
      this.container.querySelectorAll('.carousel-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const filter = btn.getAttribute('data-filter');
          this.setFilter(filter);
        });
      });

      // Pause on hover
      const stage = this.container.querySelector('.carousel-stage');
      if (stage) {
        stage.addEventListener('mouseenter', () => this.pauseAutoplay());
        stage.addEventListener('mouseleave', () => this.startAutoplay());

        // Touch Swipe
        stage.addEventListener('touchstart', (e) => {
          this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        stage.addEventListener('touchend', (e) => {
          this.touchEndX = e.changedTouches[0].screenX;
          this.handleSwipe();
        }, { passive: true });
      }

      // Keyboard arrow navigation when element in view
      window.addEventListener('keydown', (e) => {
        const rect = this.container.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        if (!isInView) return;

        if (e.key === 'ArrowLeft') {
          this.prev();
          this.resetAutoplay();
        } else if (e.key === 'ArrowRight') {
          this.next();
          this.resetAutoplay();
        }
      });
    }

    handleSwipe() {
      const threshold = 40;
      if (this.touchEndX < this.touchStartX - threshold) {
        this.next(); // Swiped left -> Next
        this.resetAutoplay();
      } else if (this.touchEndX > this.touchStartX + threshold) {
        this.prev(); // Swiped right -> Prev
        this.resetAutoplay();
      }
    }

    setFilter(filter) {
      if (this.activeFilter === filter) return;
      this.activeFilter = filter;

      this.container.querySelectorAll('.carousel-filter-btn').forEach(btn => {
        const f = btn.getAttribute('data-filter');
        if (f === filter) {
          btn.className = 'carousel-filter-btn active px-4 py-1.5 rounded-full text-xs font-bold uppercase font-label-caps border border-dorado-aruz bg-dorado-aruz text-carbon-aruz shadow-sm transition-all';
        } else {
          btn.className = 'carousel-filter-btn px-4 py-1.5 rounded-full text-xs font-bold uppercase font-label-caps border border-outline-variant/60 bg-white hover:border-dorado-profundo text-carbon-aruz transition-all';
        }
      });

      if (filter === 'all') {
        this.filteredItems = [...this.rawItems];
      } else {
        this.filteredItems = this.rawItems.filter(i => i.category === filter);
      }

      // Re-render thumbnails
      const track = this.container.querySelector('#carouselThumbsTrack');
      if (track) {
        track.innerHTML = this.renderThumbnailsHTML();
      }

      this.updateSlide(0, false);
      this.resetAutoplay();
    }

    updateSlide(index, animate = true) {
      if (!this.filteredItems.length) return;
      if (index < 0) index = this.filteredItems.length - 1;
      if (index >= this.filteredItems.length) index = 0;

      this.currentIndex = index;
      const currentItem = this.filteredItems[this.currentIndex];

      const img = this.container.querySelector('#carouselMainImg');
      const title = this.container.querySelector('#carouselMainTitle');
      const badgeCat = this.container.querySelector('#carouselBadgeCat');
      const badgeCounter = this.container.querySelector('#carouselBadgeCounter');

      if (img) {
        if (animate) {
          img.style.opacity = '0.4';
          setTimeout(() => {
            img.src = currentItem.src;
            img.alt = currentItem.title;
            img.style.opacity = '1';
          }, 140);
        } else {
          img.src = currentItem.src;
          img.alt = currentItem.title;
        }
      }

      if (title) title.textContent = currentItem.title;
      if (badgeCat) badgeCat.textContent = currentItem.catLabel;
      if (badgeCounter) badgeCounter.textContent = `${this.currentIndex + 1} / ${this.filteredItems.length}`;

      // Update Thumbnails Active States & Scroll horizontal track ONLY (NEVER touches window vertical scroll)
      const thumbsTrack = this.container.querySelector('#carouselThumbsTrack');
      const thumbs = this.container.querySelectorAll('.carousel-thumb-item');
      let activeThumb = null;

      thumbs.forEach((thumb, i) => {
        if (i === this.currentIndex) {
          thumb.className = 'carousel-thumb-item relative flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 md:w-28 md:h-18 rounded-lg overflow-hidden border-2 border-dorado-aruz shadow-md scale-105 ring-2 ring-dorado-aruz/40 transition-all duration-300 cursor-pointer';
          activeThumb = thumb;
        } else {
          thumb.className = 'carousel-thumb-item relative flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 md:w-28 md:h-18 rounded-lg overflow-hidden border-2 border-outline-variant/40 opacity-60 hover:opacity-100 hover:border-dorado-aruz/60 transition-all duration-300 cursor-pointer';
        }
      });

      if (thumbsTrack && activeThumb) {
        const thumbLeft = activeThumb.offsetLeft;
        const thumbWidth = activeThumb.offsetWidth;
        const trackWidth = thumbsTrack.clientWidth;
        thumbsTrack.scrollTo({
          left: thumbLeft - (trackWidth / 2) + (thumbWidth / 2),
          behavior: 'smooth'
        });
      }

      // Animate progress bar
      const bar = this.container.querySelector('#carouselProgressBar');
      if (bar) {
        bar.style.transition = 'none';
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.transition = `width ${this.options.autoPlayInterval}ms linear`;
          bar.style.width = '100%';
        }, 50);
      }
    }

    next() {
      this.updateSlide(this.currentIndex + 1);
    }

    prev() {
      this.updateSlide(this.currentIndex - 1);
    }

    startAutoplay() {
      if (!this.options.autoPlay) return;
      this.pauseAutoplay();
      this.timer = setInterval(() => {
        // Only advance slide if carousel is currently visible in viewport
        const rect = this.container.getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (inViewport) {
          this.next();
        }
      }, this.options.autoPlayInterval);
    }

    pauseAutoplay() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }

    resetAutoplay() {
      this.pauseAutoplay();
      this.startAutoplay();
    }

    openLightbox() {
      if (!this.options.enableLightbox) return;
      const currentItem = this.filteredItems[this.currentIndex];
      if (!currentItem) return;

      let lightbox = document.getElementById('aruz-global-lightbox');
      if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'aruz-global-lightbox';
        lightbox.className = 'fixed inset-0 z-[999999] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 md:p-8 transition-opacity duration-300 opacity-0';
        lightbox.innerHTML = `
          <!-- Top Header -->
          <div class="w-full flex items-center justify-between text-white pb-4 border-b border-white/10">
            <div class="flex items-center gap-3">
              <span id="lb-badge" class="bg-dorado-aruz text-carbon-aruz font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider font-label-caps">
                Exterior
              </span>
              <span id="lb-counter" class="text-xs text-white/70 font-mono">1 / 15</span>
            </div>
            <button type="button" id="lb-close" class="w-10 h-10 rounded-full bg-white/10 hover:bg-dorado-aruz hover:text-carbon-aruz text-white flex items-center justify-center transition-all" aria-label="Cerrar">
              <span class="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          <!-- Main High-Res Image Viewport -->
          <div class="relative w-full flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button type="button" id="lb-prev" class="absolute left-2 md:left-6 w-12 h-12 rounded-full bg-black/60 hover:bg-dorado-aruz hover:text-carbon-aruz text-white border border-white/20 flex items-center justify-center transition-all z-20 shadow-2xl">
              <span class="material-symbols-outlined text-3xl">chevron_left</span>
            </button>

            <img id="lb-img" src="" alt="" class="max-w-full max-h-[82vh] object-contain rounded-lg shadow-2xl transition-all duration-300">

            <button type="button" id="lb-next" class="absolute right-2 md:right-6 w-12 h-12 rounded-full bg-black/60 hover:bg-dorado-aruz hover:text-carbon-aruz text-white border border-white/20 flex items-center justify-center transition-all z-20 shadow-2xl">
              <span class="material-symbols-outlined text-3xl">chevron_right</span>
            </button>
          </div>

          <!-- Bottom Caption -->
          <div class="w-full text-center pt-3 border-t border-white/10">
            <h4 id="lb-title" class="font-serif text-white text-lg md:text-xl font-bold"></h4>
            <p class="text-xs text-piedra-maya/80 font-mono mt-0.5">ARUZ RENDERS 4K · MEMORIA TÉCNICA OFICIAL</p>
          </div>
        `;
        document.body.appendChild(lightbox);

        // Bind Lightbox Events
        document.getElementById('lb-close').addEventListener('click', () => this.closeLightbox());
        lightbox.addEventListener('click', (e) => {
          if (e.target === lightbox || e.target.id === 'aruz-global-lightbox') {
            this.closeLightbox();
          }
        });

        document.getElementById('lb-prev').addEventListener('click', (e) => {
          e.stopPropagation();
          this.prev();
          this.updateLightboxContent();
        });

        document.getElementById('lb-next').addEventListener('click', (e) => {
          e.stopPropagation();
          this.next();
          this.updateLightboxContent();
        });

        window.addEventListener('keydown', (e) => {
          if (lightbox.style.display !== 'none' && lightbox.classList.contains('opacity-100')) {
            if (e.key === 'Escape') this.closeLightbox();
            else if (e.key === 'ArrowLeft') { this.prev(); this.updateLightboxContent(); }
            else if (e.key === 'ArrowRight') { this.next(); this.updateLightboxContent(); }
          }
        });
      }

      this.updateLightboxContent();
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        lightbox.classList.remove('opacity-0');
        lightbox.classList.add('opacity-100');
      }, 10);
    }

    updateLightboxContent() {
      const currentItem = this.filteredItems[this.currentIndex];
      if (!currentItem) return;

      const img = document.getElementById('lb-img');
      const title = document.getElementById('lb-title');
      const badge = document.getElementById('lb-badge');
      const counter = document.getElementById('lb-counter');

      if (img) {
        img.src = currentItem.src;
        img.alt = currentItem.title;
      }
      if (title) title.textContent = currentItem.title;
      if (badge) badge.textContent = currentItem.catLabel;
      if (counter) counter.textContent = `${this.currentIndex + 1} / ${this.filteredItems.length}`;
    }

    closeLightbox() {
      const lightbox = document.getElementById('aruz-global-lightbox');
      if (!lightbox) return;

      lightbox.classList.remove('opacity-100');
      lightbox.classList.add('opacity-0');
      document.body.style.overflow = '';
      setTimeout(() => {
        lightbox.style.display = 'none';
      }, 300);
    }
  }

  // Global helper for opening legacy lightbox calls
  window.openLightbox = function(src, caption) {
    if (window.activePropertyCarousel) {
      const idx = window.activePropertyCarousel.filteredItems.findIndex(i => i.src.includes(src) || src.includes(i.src));
      if (idx !== -1) {
        window.activePropertyCarousel.updateSlide(idx, false);
      }
      window.activePropertyCarousel.openLightbox();
    }
  };

  // Auto-initialize on any page that has property galleries
  function initAllPropertyCarousels() {
    const gallerySection = document.getElementById('galeria') || document.querySelector('.property-gallery-section');
    if (gallerySection) {
      const grid = gallerySection.querySelector('#gallery-grid') || gallerySection.querySelector('.grid') || gallerySection;
      if (grid) {
        window.activePropertyCarousel = new AruzPropertyCarousel(grid);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllPropertyCarousels);
  } else {
    initAllPropertyCarousels();
  }

  window.AruzPropertyCarousel = AruzPropertyCarousel;
})();
