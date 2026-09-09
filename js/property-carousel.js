/**
 * ============================================================================
 * ARUZ LUXURY PROPERTY CAROUSEL & LIGHTBOX ENGINE - UNIVERSAL 360 EDITION
 * ============================================================================
 * Architectural 4K Photo Carousel & Lightbox for ARUZ Property Landings:
 * - Supports Static Pre-rendered Carousels (.carousel-container, .property-carousel-container)
 * - Supports Dynamic DOM-Extracted Carousels (.aruz-property-carousel)
 * - Synchronized Horizontal Thumbnails Track with Smooth Auto-Centering
 * - Touch & Swipe Gestures (Mobile/Tablet) with Delta Resistance
 * - Keyboard Navigation (ArrowLeft, ArrowRight, Escape)
 * - Smart Autoplay (Pause on Hover/Touch/Tab Blur/Out of View)
 * - Universal Interactive Fullscreen Lightbox with Image Navigation (Prev/Next/Counter)
 * ============================================================================
 */

(function () {
  'use strict';

  // Global Registry for Active Lightbox Items & Index
  window.aruzLightboxState = {
    items: [],
    currentIndex: 0,
    isOpen: false
  };

  /* --------------------------------------------------------------------------
     1. STATIC PRE-RENDERED CAROUSEL ENGINE
     -------------------------------------------------------------------------- */
  class AruzStaticCarousel {
    constructor(containerEl) {
      this.container = typeof containerEl === 'string' ? document.querySelector(containerEl) : containerEl;
      if (!this.container || this.container.dataset.carouselInitialized === 'true') return;
      this.container.dataset.carouselInitialized = 'true';

      this.slides = Array.from(this.container.querySelectorAll('.carousel-slide'));
      if (!this.slides.length) return;

      this.btnPrev = this.container.querySelector('.carousel-prev, #carouselBtnPrev, [data-carousel-prev]');
      this.btnNext = this.container.querySelector('.carousel-next, #carouselBtnNext, [data-carousel-next]');
      this.thumbTrack = this.container.querySelector('.carousel-thumbs, .carousel-thumbs-track, #carouselThumbsTrack');
      this.thumbs = Array.from(this.container.querySelectorAll('.thumb-btn, .carousel-thumb, [data-slide], .carousel-thumb-item'));
      this.progressBar = this.container.querySelector('#carouselProgressBar, .carousel-progress-bar');
      this.counterEl = this.container.querySelector('#carouselBadgeCounter, .carousel-counter');

      // Configuration from data attributes
      this.autoPlay = this.container.getAttribute('data-autoplay') !== 'false';
      this.interval = parseInt(this.container.getAttribute('data-interval'), 10) || 5000;

      this.currentIndex = 0;
      // Detect initial active slide if present
      const initialActiveIdx = this.slides.findIndex(s => s.classList.contains('active') && !s.classList.contains('opacity-0'));
      if (initialActiveIdx !== -1) {
        this.currentIndex = initialActiveIdx;
      }

      this.timer = null;
      this.touchStartX = 0;
      this.touchEndX = 0;
      this.isIntersecting = false;

      this.init();
    }

    init() {
      this.bindEvents();
      this.setupIntersectionObserver();
      this.goToSlide(this.currentIndex, false);
      if (this.autoPlay) {
        this.startAutoplay();
      }
    }

    bindEvents() {
      // Prev / Next Chevrons
      if (this.btnPrev) {
        this.btnPrev.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.prev();
          this.resetAutoplay();
        });
      }

      if (this.btnNext) {
        this.btnNext.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.next();
          this.resetAutoplay();
        });
      }

      // Thumbnails Click
      this.thumbs.forEach((thumb, idx) => {
        thumb.addEventListener('click', (e) => {
          e.preventDefault();
          const targetSlide = thumb.getAttribute('data-slide') !== null 
            ? parseInt(thumb.getAttribute('data-slide'), 10) 
            : (thumb.getAttribute('data-slide-index') !== null 
                ? parseInt(thumb.getAttribute('data-slide-index'), 10) 
                : idx);
          
          if (!isNaN(targetSlide)) {
            this.goToSlide(targetSlide);
            this.resetAutoplay();
          }
        });
      });

      // Pause Autoplay on Hover
      this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
      this.container.addEventListener('mouseleave', () => {
        if (this.isIntersecting && !document.hidden) {
          this.startAutoplay();
        }
      });

      // Touch / Swipe Navigation for Mobile & Tablets
      const touchTarget = this.container.querySelector('.carousel-viewport') || this.container;
      touchTarget.addEventListener('touchstart', (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
        this.pauseAutoplay();
      }, { passive: true });

      touchTarget.addEventListener('touchend', (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
        if (this.isIntersecting && !document.hidden) {
          this.startAutoplay();
        }
      }, { passive: true });

      // Keyboard navigation when in viewport
      window.addEventListener('keydown', (e) => {
        if (!this.isIntersecting || window.aruzLightboxState.isOpen) return;
        if (e.key === 'ArrowLeft') {
          this.prev();
          this.resetAutoplay();
        } else if (e.key === 'ArrowRight') {
          this.next();
          this.resetAutoplay();
        }
      });

      // Visibility change pause
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.pauseAutoplay();
        } else if (this.isIntersecting) {
          this.startAutoplay();
        }
      });
    }

    setupIntersectionObserver() {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            this.isIntersecting = entry.isIntersecting;
            if (entry.isIntersecting) {
              if (this.autoPlay && !this.timer) this.startAutoplay();
            } else {
              this.pauseAutoplay();
            }
          });
        }, { threshold: 0.2 });
        observer.observe(this.container);
      } else {
        this.isIntersecting = true;
      }
    }

    handleSwipe() {
      const deltaX = this.touchEndX - this.touchStartX;
      const threshold = 40;
      if (deltaX < -threshold) {
        this.next();
      } else if (deltaX > threshold) {
        this.prev();
      }
    }

    goToSlide(index, animate = true) {
      if (!this.slides.length) return;
      const total = this.slides.length;
      this.currentIndex = ((index % total) + total) % total;

      // 1. Update Slides Visibility & Transitions
      this.slides.forEach((slide, idx) => {
        if (idx === this.currentIndex) {
          slide.classList.add('active', 'opacity-100', 'z-10');
          slide.classList.remove('opacity-0', 'pointer-events-none', 'z-0');
          slide.style.pointerEvents = 'auto';
        } else {
          slide.classList.remove('active', 'opacity-100', 'z-10');
          slide.classList.add('opacity-0', 'pointer-events-none', 'z-0');
          slide.style.pointerEvents = 'none';
        }
      });

      // 2. Update Thumbnails Active Indicator
      if (this.thumbs.length) {
        this.thumbs.forEach((thumb, idx) => {
          const thumbIdx = thumb.getAttribute('data-slide') !== null 
            ? parseInt(thumb.getAttribute('data-slide'), 10) 
            : (thumb.getAttribute('data-slide-index') !== null 
                ? parseInt(thumb.getAttribute('data-slide-index'), 10) 
                : idx);

          if (thumbIdx === this.currentIndex) {
            thumb.classList.add('active', 'border-dorado-aruz', 'scale-105', 'opacity-100');
            thumb.classList.remove('border-transparent', 'opacity-60');
            
            // Auto scroll active thumbnail into center of track
            if (this.thumbTrack) {
              const trackWidth = this.thumbTrack.offsetWidth;
              const thumbLeft = thumb.offsetLeft;
              const thumbWidth = thumb.offsetWidth;
              const scrollTarget = thumbLeft - (trackWidth / 2) + (thumbWidth / 2);
              this.thumbTrack.scrollTo({
                left: Math.max(0, scrollTarget),
                behavior: animate ? 'smooth' : 'auto'
              });
            }
          } else {
            thumb.classList.remove('active', 'border-dorado-aruz', 'scale-105', 'opacity-100');
            thumb.classList.add('border-transparent', 'opacity-60');
          }
        });
      }

      // 3. Update Progress Bar
      if (this.progressBar) {
        const pct = ((this.currentIndex + 1) / total) * 100;
        this.progressBar.style.width = `${pct}%`;
      }

      // 4. Update Counter Badge
      if (this.counterEl) {
        this.counterEl.textContent = `${this.currentIndex + 1} / ${total}`;
      }
    }

    next() {
      this.goToSlide(this.currentIndex + 1);
    }

    prev() {
      this.goToSlide(this.currentIndex - 1);
    }

    startAutoplay() {
      if (!this.autoPlay || this.timer) return;
      this.timer = setInterval(() => {
        if (!document.hidden && this.isIntersecting && !window.aruzLightboxState.isOpen) {
          this.next();
        }
      }, this.interval);
    }

    pauseAutoplay() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }

    resetAutoplay() {
      this.pauseAutoplay();
      if (this.autoPlay && this.isIntersecting && !document.hidden) {
        this.startAutoplay();
      }
    }
  }

  /* --------------------------------------------------------------------------
     2. DYNAMIC DOM-EXTRACTED CAROUSEL ENGINE (ARUZ PROPERTY CAROUSEL)
     -------------------------------------------------------------------------- */
  class AruzDynamicCarousel {
    constructor(containerEl, options = {}) {
      this.container = typeof containerEl === 'string' ? document.querySelector(containerEl) : containerEl;
      if (!this.container || this.container.dataset.carouselInitialized === 'true') return;
      this.container.dataset.carouselInitialized = 'true';

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
      this.timer = null;
      this.touchStartX = 0;
      this.touchEndX = 0;
      this.isIntersecting = false;

      this.init();
    }

    init() {
      this.extractSlidesFromDOM();
      if (!this.rawItems.length) return;

      this.filteredItems = [...this.rawItems];
      this.buildCarouselDOM();
      this.bindEvents();
      this.setupIntersectionObserver();
      this.updateSlide(0, false);
      if (this.options.autoPlay) {
        this.startAutoplay();
      }
    }

    extractSlidesFromDOM() {
      const existingItems = this.container.querySelectorAll('.gallery-item, .xpuha-gallery-item, [data-slide-src]');
      if (existingItems.length > 0) {
        existingItems.forEach((el, index) => {
          const img = el.querySelector('img');
          const src = el.getAttribute('data-slide-src') || (img ? img.getAttribute('src') : '') || '';
          const category = el.classList.contains('exterior') ? 'exterior' : (el.classList.contains('interior') ? 'interior' : 'all');
          const titleEl = el.querySelector('h4, .slide-title, .font-serif');
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

      const stageHTML = `
        ${filterHTML}
        <div class="carousel-stage relative w-full rounded-2xl overflow-hidden bg-black border border-dorado-aruz/30 shadow-2xl group select-none" style="aspect-ratio: 16/9; max-height: 680px;">
          <div class="carousel-slide-viewport relative w-full h-full overflow-hidden cursor-zoom-in" id="carouselMainViewport">
            <img id="carouselMainImg" src="${this.filteredItems[0]?.src || ''}" alt="${this.filteredItems[0]?.title || 'Render Principal'}" class="w-full h-full object-cover transition-all duration-700 ease-out transform group-hover:scale-[1.02]" loading="eager" decoding="async">
            
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none"></div>
            
            <div class="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 z-10">
              <span id="carouselBadgeCat" class="bg-dorado-aruz text-carbon-aruz font-extrabold text-[10px] md:text-xs px-3 py-1 rounded-full uppercase tracking-wider font-label-caps shadow-md">
                ${this.filteredItems[0]?.catLabel || 'Exterior'}
              </span>
              <span id="carouselBadgeCounter" class="bg-black/60 backdrop-blur-md text-white font-mono text-[10px] md:text-xs px-3 py-1 rounded-full border border-white/20">
                1 / ${this.filteredItems.length}
              </span>
            </div>

            <button type="button" id="carouselBtnZoom" class="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-11 md:h-11 rounded-full bg-black/60 hover:bg-dorado-aruz hover:text-carbon-aruz text-white backdrop-blur-md border border-white/20 hover:border-dorado-aruz flex items-center justify-center transition-all duration-300 z-10 shadow-lg hover:scale-105" title="Ver en Pantalla Completa">
              <span class="material-symbols-outlined text-lg md:text-xl">zoom_in</span>
            </button>

            <div class="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 z-10 pointer-events-none">
              <div class="max-w-2xl">
                <div class="text-[10px] md:text-xs font-mono text-dorado-aruz font-bold tracking-widest uppercase mb-1 drop-shadow" id="carouselSubTitle">
                  MEMORIA VISUAL ARUZ · ARQUITECTURA DE AUTOR
                </div>
                <h3 class="font-serif text-lg sm:text-2xl md:text-3xl text-white font-bold tracking-wide drop-shadow-md leading-tight" id="carouselMainTitle">
                  ${this.filteredItems[0]?.title || ''}
                </h3>
              </div>
            </div>
          </div>

          <button type="button" id="carouselBtnPrev" class="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-dorado-aruz text-white hover:text-carbon-aruz backdrop-blur-md border border-white/20 hover:border-dorado-aruz flex items-center justify-center transition-all duration-300 z-20 shadow-xl opacity-80 hover:opacity-100 hover:scale-110 active:scale-95" aria-label="Imagen Anterior">
            <span class="material-symbols-outlined text-xl md:text-2xl">chevron_left</span>
          </button>

          <button type="button" id="carouselBtnNext" class="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-dorado-aruz text-white hover:text-carbon-aruz backdrop-blur-md border border-white/20 hover:border-dorado-aruz flex items-center justify-center transition-all duration-300 z-20 shadow-xl opacity-80 hover:opacity-100 hover:scale-110 active:scale-95" aria-label="Siguiente Imagen">
            <span class="material-symbols-outlined text-xl md:text-2xl">chevron_right</span>
          </button>

          <div class="absolute bottom-0 left-0 h-1 bg-dorado-aruz/80 z-20 transition-all duration-300" id="carouselProgressBar" style="width: 0%;"></div>
        </div>

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
      const btnPrev = this.container.querySelector('#carouselBtnPrev');
      const btnNext = this.container.querySelector('#carouselBtnNext');
      if (btnPrev) btnPrev.addEventListener('click', () => { this.prev(); this.resetAutoplay(); });
      if (btnNext) btnNext.addEventListener('click', () => { this.next(); this.resetAutoplay(); });

      const viewport = this.container.querySelector('#carouselMainViewport');
      const btnZoom = this.container.querySelector('#carouselBtnZoom');
      if (viewport) {
        viewport.addEventListener('click', (e) => {
          if (!e.target.closest('button')) {
            this.openCurrentLightbox();
          }
        });
      }
      if (btnZoom) {
        btnZoom.addEventListener('click', (e) => {
          e.stopPropagation();
          this.openCurrentLightbox();
        });
      }

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

      this.container.querySelectorAll('.carousel-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const filter = btn.getAttribute('data-filter');
          this.setFilter(filter);
        });
      });

      const stage = this.container.querySelector('.carousel-stage');
      if (stage) {
        stage.addEventListener('mouseenter', () => this.pauseAutoplay());
        stage.addEventListener('mouseleave', () => {
          if (this.isIntersecting && !document.hidden) this.startAutoplay();
        });

        stage.addEventListener('touchstart', (e) => {
          this.touchStartX = e.changedTouches[0].screenX;
          this.pauseAutoplay();
        }, { passive: true });

        stage.addEventListener('touchend', (e) => {
          this.touchEndX = e.changedTouches[0].screenX;
          this.handleSwipe();
          if (this.isIntersecting && !document.hidden) this.startAutoplay();
        }, { passive: true });
      }

      window.addEventListener('keydown', (e) => {
        if (!this.isIntersecting || window.aruzLightboxState.isOpen) return;
        if (e.key === 'ArrowLeft') {
          this.prev();
          this.resetAutoplay();
        } else if (e.key === 'ArrowRight') {
          this.next();
          this.resetAutoplay();
        }
      });
    }

    setupIntersectionObserver() {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            this.isIntersecting = entry.isIntersecting;
            if (entry.isIntersecting) {
              if (this.options.autoPlay && !this.timer) this.startAutoplay();
            } else {
              this.pauseAutoplay();
            }
          });
        }, { threshold: 0.2 });
        observer.observe(this.container);
      } else {
        this.isIntersecting = true;
      }
    }

    handleSwipe() {
      const threshold = 40;
      if (this.touchEndX < this.touchStartX - threshold) {
        this.next();
        this.resetAutoplay();
      } else if (this.touchEndX > this.touchStartX + threshold) {
        this.prev();
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

      const counter = this.container.querySelector('#carousel-item-counter');
      if (counter) counter.textContent = `${this.filteredItems.length} Renders`;

      const track = this.container.querySelector('#carouselThumbsTrack');
      if (track) track.innerHTML = this.renderThumbnailsHTML();

      this.updateSlide(0, false);
      this.resetAutoplay();
    }

    updateSlide(newIndex, animate = true) {
      if (!this.filteredItems.length) return;
      const total = this.filteredItems.length;
      this.currentIndex = ((newIndex % total) + total) % total;

      const item = this.filteredItems[this.currentIndex];
      const img = this.container.querySelector('#carouselMainImg');
      const title = this.container.querySelector('#carouselMainTitle');
      const badgeCat = this.container.querySelector('#carouselBadgeCat');
      const badgeCounter = this.container.querySelector('#carouselBadgeCounter');

      if (img && item) {
        if (animate) {
          img.style.opacity = '0.4';
          img.style.transform = 'scale(0.98)';
          setTimeout(() => {
            img.src = item.src;
            img.alt = item.title;
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
          }, 180);
        } else {
          img.src = item.src;
          img.alt = item.title;
        }
      }

      if (title && item) title.textContent = item.title;
      if (badgeCat && item) badgeCat.textContent = item.catLabel;
      if (badgeCounter) badgeCounter.textContent = `${this.currentIndex + 1} / ${total}`;

      const thumbsTrack = this.container.querySelector('#carouselThumbsTrack');
      const thumbs = this.container.querySelectorAll('.carousel-thumb-item');
      thumbs.forEach((thumb, idx) => {
        if (idx === this.currentIndex) {
          thumb.className = 'carousel-thumb-item relative flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 md:w-28 md:h-18 rounded-lg overflow-hidden border-2 border-dorado-aruz shadow-md scale-105 ring-2 ring-dorado-aruz/40 transition-all duration-300 cursor-pointer';
          if (thumbsTrack) {
            const scrollLeft = thumb.offsetLeft - (thumbsTrack.offsetWidth / 2) + (thumb.offsetWidth / 2);
            thumbsTrack.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
          }
        } else {
          thumb.className = 'carousel-thumb-item relative flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 md:w-28 md:h-18 rounded-lg overflow-hidden border-2 border-outline-variant/40 opacity-60 hover:opacity-100 hover:border-dorado-aruz/60 transition-all duration-300 cursor-pointer';
        }
      });

      const bar = this.container.querySelector('#carouselProgressBar');
      if (bar) {
        bar.style.width = `${((this.currentIndex + 1) / total) * 100}%`;
      }
    }

    next() {
      this.updateSlide(this.currentIndex + 1);
    }

    prev() {
      this.updateSlide(this.currentIndex - 1);
    }

    startAutoplay() {
      if (this.timer) return;
      this.timer = setInterval(() => {
        if (!document.hidden && this.isIntersecting && !window.aruzLightboxState.isOpen) {
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
      if (this.options.autoPlay && this.isIntersecting && !document.hidden) {
        this.startAutoplay();
      }
    }

    openCurrentLightbox() {
      const item = this.filteredItems[this.currentIndex];
      if (item) {
        window.openLightbox(item.src, item.title, item.catLabel);
      }
    }
  }

  /* --------------------------------------------------------------------------
     3. UNIVERSAL INTERACTIVE FULLSCREEN LIGHTBOX ENGINE
     -------------------------------------------------------------------------- */
  function collectAllPageGalleryItems() {
    const items = [];
    const seenSrcs = new Set();

    // 1. Check slides in carousels
    document.querySelectorAll('.carousel-slide img, [data-slide] img').forEach(img => {
      const src = img.getAttribute('src');
      if (src && !seenSrcs.has(src)) {
        seenSrcs.add(src);
        const parentSlide = img.closest('.carousel-slide');
        const titleEl = parentSlide ? parentSlide.querySelector('h3, h4') : null;
        const descEl = parentSlide ? parentSlide.querySelector('p') : null;
        items.push({
          src: src,
          title: (titleEl ? titleEl.textContent.trim() : '') || img.getAttribute('alt') || 'Perspectiva Arquitectónica ARUZ',
          desc: descEl ? descEl.textContent.trim() : 'Renderización 4K Oficial'
        });
      }
    });

    // 2. Check gallery grid cards
    document.querySelectorAll('.gallery-item, .xpuha-gallery-item, [onclick*="openLightbox"]').forEach(el => {
      const img = el.querySelector('img');
      const src = img ? img.getAttribute('src') : '';
      if (src && !seenSrcs.has(src)) {
        seenSrcs.add(src);
        const titleEl = el.querySelector('h4, h3, .font-serif');
        const descEl = el.querySelector('p');
        items.push({
          src: src,
          title: (titleEl ? titleEl.textContent.trim() : '') || (img ? img.getAttribute('alt') : '') || 'Detalle Arquitectónico ARUZ',
          desc: descEl ? descEl.textContent.trim() : 'Especificación Técnica & Acabados de Autor'
        });
      }
    });

    return items;
  }

  function getOrCreateLightboxDOM() {
    let lightbox = document.getElementById('aruz-global-lightbox');
    if (!lightbox) {
      // Check if page already has #lightbox-modal
      const existingModal = document.getElementById('lightbox-modal');
      if (existingModal) {
        // Upgrade existing modal with modern luxury styling & navigation chevrons
        existingModal.id = 'aruz-global-lightbox';
        existingModal.className = 'fixed inset-0 z-[999999] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 md:p-6 transition-all duration-300 opacity-0 pointer-events-none';
        existingModal.innerHTML = `
          <!-- Header Bar -->
          <div class="w-full max-w-6xl flex items-center justify-between text-white pb-3 border-b border-white/10 select-none">
            <div class="flex items-center gap-3">
              <span id="aruz-lb-badge" class="bg-dorado-aruz text-carbon-aruz font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider font-label-caps shadow">
                Render 4K
              </span>
              <span id="aruz-lb-counter" class="text-xs text-white/80 font-mono">1 / 1</span>
            </div>
            <button type="button" id="aruz-lb-close" class="w-10 h-10 rounded-full bg-white/10 hover:bg-dorado-aruz hover:text-carbon-aruz text-white flex items-center justify-center transition-all duration-200 shadow" aria-label="Cerrar">
              <span class="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          <!-- Main Viewport with Prev / Next Chevrons -->
          <div class="relative w-full max-w-6xl flex-1 flex items-center justify-center my-3 overflow-hidden select-none" id="aruz-lb-viewport">
            <button type="button" id="aruz-lb-prev" class="absolute left-2 md:left-4 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/60 hover:bg-dorado-aruz hover:text-carbon-aruz text-white border border-white/20 hover:border-dorado-aruz flex items-center justify-center transition-all duration-200 z-20 shadow-2xl active:scale-95" aria-label="Anterior">
              <span class="material-symbols-outlined text-3xl">chevron_left</span>
            </button>

            <img id="aruz-lb-img" src="" alt="Vista en Alta Definición" class="max-w-full max-h-[75vh] md:max-h-[80vh] object-contain rounded-xl shadow-2xl transition-all duration-300">

            <button type="button" id="aruz-lb-next" class="absolute right-2 md:right-4 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/60 hover:bg-dorado-aruz hover:text-carbon-aruz text-white border border-white/20 hover:border-dorado-aruz flex items-center justify-center transition-all duration-200 z-20 shadow-2xl active:scale-95" aria-label="Siguiente">
              <span class="material-symbols-outlined text-3xl">chevron_right</span>
            </button>
          </div>

          <!-- Footer Caption -->
          <div class="w-full max-w-4xl text-center pt-3 border-t border-white/10">
            <h4 id="aruz-lb-title" class="font-serif text-white text-base md:text-xl font-bold tracking-wide"></h4>
            <p id="aruz-lb-desc" class="text-xs text-piedra-maya mt-0.5 max-w-2xl mx-auto"></p>
          </div>
        `;
        lightbox = existingModal;
      } else {
        lightbox = document.createElement('div');
        lightbox.id = 'aruz-global-lightbox';
        lightbox.className = 'fixed inset-0 z-[999999] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 md:p-6 transition-all duration-300 opacity-0 pointer-events-none';
        lightbox.innerHTML = `
          <!-- Header Bar -->
          <div class="w-full max-w-6xl flex items-center justify-between text-white pb-3 border-b border-white/10 select-none">
            <div class="flex items-center gap-3">
              <span id="aruz-lb-badge" class="bg-dorado-aruz text-carbon-aruz font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider font-label-caps shadow">
                Render 4K
              </span>
              <span id="aruz-lb-counter" class="text-xs text-white/80 font-mono">1 / 1</span>
            </div>
            <button type="button" id="aruz-lb-close" class="w-10 h-10 rounded-full bg-white/10 hover:bg-dorado-aruz hover:text-carbon-aruz text-white flex items-center justify-center transition-all duration-200 shadow" aria-label="Cerrar">
              <span class="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          <!-- Main Viewport with Prev / Next Chevrons -->
          <div class="relative w-full max-w-6xl flex-1 flex items-center justify-center my-3 overflow-hidden select-none" id="aruz-lb-viewport">
            <button type="button" id="aruz-lb-prev" class="absolute left-2 md:left-4 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/60 hover:bg-dorado-aruz hover:text-carbon-aruz text-white border border-white/20 hover:border-dorado-aruz flex items-center justify-center transition-all duration-200 z-20 shadow-2xl active:scale-95" aria-label="Anterior">
              <span class="material-symbols-outlined text-3xl">chevron_left</span>
            </button>

            <img id="aruz-lb-img" src="" alt="Vista en Alta Definición" class="max-w-full max-h-[75vh] md:max-h-[80vh] object-contain rounded-xl shadow-2xl transition-all duration-300">

            <button type="button" id="aruz-lb-next" class="absolute right-2 md:right-4 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/60 hover:bg-dorado-aruz hover:text-carbon-aruz text-white border border-white/20 hover:border-dorado-aruz flex items-center justify-center transition-all duration-200 z-20 shadow-2xl active:scale-95" aria-label="Siguiente">
              <span class="material-symbols-outlined text-3xl">chevron_right</span>
            </button>
          </div>

          <!-- Footer Caption -->
          <div class="w-full max-w-4xl text-center pt-3 border-t border-white/10">
            <h4 id="aruz-lb-title" class="font-serif text-white text-base md:text-xl font-bold tracking-wide"></h4>
            <p id="aruz-lb-desc" class="text-xs text-piedra-maya mt-0.5 max-w-2xl mx-auto"></p>
          </div>
        `;
        document.body.appendChild(lightbox);
      }

      // Bind Universal Lightbox Events
      const closeBtn = lightbox.querySelector('#aruz-lb-close');
      const prevBtn = lightbox.querySelector('#aruz-lb-prev');
      const nextBtn = lightbox.querySelector('#aruz-lb-next');
      const viewport = lightbox.querySelector('#aruz-lb-viewport');

      if (closeBtn) closeBtn.addEventListener('click', () => closeLightbox());
      
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.id === 'aruz-lb-viewport') {
          closeLightbox();
        }
      });

      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          navigateLightbox(-1);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          navigateLightbox(1);
        });
      }

      // Touch swipe in lightbox
      let lbTouchX = 0;
      if (viewport) {
        viewport.addEventListener('touchstart', (e) => {
          lbTouchX = e.changedTouches[0].screenX;
        }, { passive: true });

        viewport.addEventListener('touchend', (e) => {
          const delta = e.changedTouches[0].screenX - lbTouchX;
          if (delta < -45) navigateLightbox(1);
          else if (delta > 45) navigateLightbox(-1);
        }, { passive: true });
      }

      // Global Keydown Handler for Lightbox
      window.addEventListener('keydown', (e) => {
        if (!window.aruzLightboxState.isOpen) return;
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowLeft') navigateLightbox(-1);
        else if (e.key === 'ArrowRight') navigateLightbox(1);
      });
    }

    return lightbox;
  }

  function updateLightboxContent() {
    const { items, currentIndex } = window.aruzLightboxState;
    if (!items.length || currentIndex < 0 || currentIndex >= items.length) return;

    const cur = items[currentIndex];
    const img = document.getElementById('aruz-lb-img') || document.getElementById('lightbox-img');
    const title = document.getElementById('aruz-lb-title') || document.getElementById('lightbox-caption');
    const desc = document.getElementById('aruz-lb-desc') || document.getElementById('lightbox-desc');
    const counter = document.getElementById('aruz-lb-counter');

    if (img) {
      img.style.opacity = '0.4';
      img.style.transform = 'scale(0.97)';
      setTimeout(() => {
        img.src = cur.src;
        img.alt = cur.title || 'Vista en Alta Definición';
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
      }, 120);
    }

    if (title) title.textContent = cur.title || '';
    if (desc) desc.textContent = cur.desc || '';
    if (counter) counter.textContent = `${currentIndex + 1} / ${items.length}`;
  }

  function navigateLightbox(direction) {
    const { items, currentIndex } = window.aruzLightboxState;
    if (!items.length) return;
    const total = items.length;
    window.aruzLightboxState.currentIndex = ((currentIndex + direction) % total + total) % total;
    updateLightboxContent();
  }

  function openLightbox(src, title, desc) {
    const lightbox = getOrCreateLightboxDOM();
    let items = collectAllPageGalleryItems();

    // If no items found, register single item
    if (!items.length) {
      items = [{ src: src, title: title || 'Perspectiva Arquitectónica', desc: desc || '' }];
    }

    // Find requested item index
    let targetIdx = items.findIndex(i => i.src === src || i.src.endsWith(src) || src.endsWith(i.src));
    if (targetIdx === -1) {
      items.unshift({ src: src, title: title || '', desc: desc || '' });
      targetIdx = 0;
    }

    window.aruzLightboxState.items = items;
    window.aruzLightboxState.currentIndex = targetIdx;
    window.aruzLightboxState.isOpen = true;

    updateLightboxContent();

    lightbox.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
    lightbox.classList.add('opacity-100', 'pointer-events-auto');
    document.body.classList.add('overflow-hidden');
  }

  function closeLightbox() {
    const lightbox = document.getElementById('aruz-global-lightbox');
    if (lightbox) {
      lightbox.classList.remove('opacity-100', 'pointer-events-auto');
      lightbox.classList.add('opacity-0', 'pointer-events-none');
    }
    window.aruzLightboxState.isOpen = false;
    document.body.classList.remove('overflow-hidden');
  }

  // Export Global Lightbox Functions for window / onclick handlers
  window.openLightbox = openLightbox;
  window.closeLightbox = closeLightbox;

  /* --------------------------------------------------------------------------
     4. UNIVERSAL INITIALIZER FOR ALL PAGES
     -------------------------------------------------------------------------- */
  function initAllCarousels() {
    // 1. Initialize Static Pre-rendered Carousels
    const staticContainers = document.querySelectorAll('.carousel-container, .property-carousel-container, [data-carousel]');
    staticContainers.forEach(container => {
      new AruzStaticCarousel(container);
    });

    // 2. Initialize Dynamic DOM-Extracted Carousels
    const dynamicContainers = document.querySelectorAll('.aruz-property-carousel');
    dynamicContainers.forEach(container => {
      new AruzDynamicCarousel(container);
    });

    // 3. Fallback for legacy #gallery-grid in #galeria
    const gallerySection = document.getElementById('galeria');
    if (gallerySection) {
      const grid = gallerySection.querySelector('#gallery-grid');
      if (grid && !grid.dataset.carouselInitialized && grid.querySelectorAll('.gallery-item').length > 0) {
        new AruzDynamicCarousel(grid);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllCarousels);
  } else {
    initAllCarousels();
  }

  window.AruzStaticCarousel = AruzStaticCarousel;
  window.AruzDynamicCarousel = AruzDynamicCarousel;
  window.AruzPropertyCarousel = AruzDynamicCarousel; // Backwards compatibility
})();
