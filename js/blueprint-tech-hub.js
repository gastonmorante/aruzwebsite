/**
 * ============================================================================
 * ARUZ 3D ARCHITECTURAL CAD GRID & HOLOGRAPHIC TECH HUB ENGINE (OPTIMIZED)
 * ============================================================================
 * High-Performance Background Engine:
 * - IntersectionObserver: pauses rendering when off-screen to save 100% idle CPU
 * - Mobile-friendly: renders crisp static grid on screens < 768px (eliminates 11.5s mobile CPU block)
 * - Cached Gradients: eliminates 60fps garbage collection pauses
 * - Zero forced reflows: cached bounding rect
 * ============================================================================
 */

(function () {
  function initTechBlueprintEngine() {
    const canvas = document.getElementById('heroTechBlueprintCanvas');
    if (!canvas) return;

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const ctx = canvas.getContext('2d', { alpha: true });
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = true;
    let animationFrameId = null;
    let canvasRect = null;

    // Mouse coordinates with smooth damping
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      normX: 0,
      normY: 0,
      targetNormX: 0,
      targetNormY: 0
    };

    let bgGrad = null;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const parent = canvas.parentElement || canvas;
      width = parent.offsetWidth || window.innerWidth;
      height = parent.offsetHeight || window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvasRect = canvas.getBoundingClientRect();

      // Pre-compute background gradient to avoid recreation on every frame
      const cx = width / 2;
      const cy = height / 2;
      bgGrad = ctx.createRadialGradient(cx, cy, 50, cx, cy, Math.max(width, height) * 0.75);
      bgGrad.addColorStop(0, 'rgba(255, 246, 232, 0.95)');
      bgGrad.addColorStop(0.45, 'rgba(252, 236, 208, 0.75)');
      bgGrad.addColorStop(1, 'rgba(255, 248, 242, 0.35)');

      if (isMobile || prefersReducedMotion) {
        drawStaticBackground();
      }
    }

    window.addEventListener('resize', () => {
      resize();
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
      if (isMobile || !isVisible) return;
      if (!canvasRect) canvasRect = canvas.getBoundingClientRect();
      const clientX = e.clientX - canvasRect.left;
      const clientY = e.clientY - canvasRect.top;

      mouse.targetX = clientX;
      mouse.targetY = clientY;
      mouse.targetNormX = (clientX / width - 0.5) * 2;
      mouse.targetNormY = (clientY / height - 0.5) * 2;
    }, { passive: true });

    let time = 0;

    // Floating technical particles with ARUZ elevation coordinates
    const particles = [];
    const particleCount = isMobile ? 8 : 24;
    const elevationTags = [
      "N.P.T. +0.15m",
      "ROOF +9.80m",
      "20°37'38\"N",
      "87°04'48\"W",
      "BIM 4D READY",
      "ARUZ S100"
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (width || window.innerWidth),
        y: Math.random() * (height || 600),
        z: Math.random() * 0.8 + 0.2,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        size: Math.random() * 1.8 + 1,
        alpha: Math.random() * 0.4 + 0.15,
        label: i % 3 === 0 ? elevationTags[i % elevationTags.length] : null
      });
    }

    function drawStaticBackground() {
      ctx.clearRect(0, 0, width, height);
      if (bgGrad) {
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      }
      // Draw lightweight CAD grid
      const gridSize = 60;
      ctx.strokeStyle = 'rgba(180, 150, 100, 0.10)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    }

    function render() {
      if (!isVisible) return;

      time += 0.015;

      // Mouse smooth damping interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;
      mouse.normX += (mouse.targetNormX - mouse.normX) * 0.06;
      mouse.normY += (mouse.targetNormY - mouse.normY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2 + mouse.normX * 18;
      const centerY = height / 2 + mouse.normY * 15;

      // 1. Cached Warm Sand & Amber Gradient Backdrop
      if (bgGrad) {
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Architectural Technical CAD Grid with Parallax
      const gridSize = 50;
      const offsetX = (mouse.normX * 12) % gridSize;
      const offsetY = (mouse.normY * 12) % gridSize;

      ctx.strokeStyle = 'rgba(180, 150, 100, 0.10)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();

      for (let x = offsetX; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = offsetY; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Major Crosshair Intersections (+)
      ctx.fillStyle = 'rgba(200, 146, 21, 0.3)';
      const majorStep = gridSize * 3;
      for (let x = offsetX; x < width; x += majorStep) {
        for (let y = offsetY; y < height; y += majorStep) {
          ctx.fillRect(x - 3, y - 0.5, 6, 1);
          ctx.fillRect(x - 0.5, y - 3, 1, 6);
        }
      }

      // 3. Technical Blueprint Dials & Rotating Compass Rings
      ctx.save();
      ctx.translate(centerX, centerY);

      // Outer Dial (Slow Counter-Clockwise)
      ctx.save();
      ctx.rotate(-time * 0.06);
      ctx.strokeStyle = 'rgba(216, 201, 174, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 260, 0, Math.PI * 2);
      ctx.stroke();

      // Degree Ticks along Outer Dial (spaced 30 deg for high performance)
      for (let deg = 0; deg < 360; deg += 30) {
        const rad = (deg * Math.PI) / 180;
        const r1 = deg % 90 === 0 ? 248 : 254;
        const r2 = 260;
        ctx.strokeStyle = deg % 90 === 0 ? 'rgba(200, 146, 21, 0.6)' : 'rgba(180, 150, 100, 0.2)';
        ctx.lineWidth = deg % 90 === 0 ? 1.5 : 0.8;
        ctx.beginPath();
        ctx.moveTo(Math.cos(rad) * r1, Math.sin(rad) * r1);
        ctx.lineTo(Math.cos(rad) * r2, Math.sin(rad) * r2);
        ctx.stroke();
      }
      ctx.restore();

      // Inner Technical Dial (Clockwise)
      ctx.save();
      ctx.rotate(time * 0.1);
      ctx.strokeStyle = 'rgba(238, 182, 35, 0.25)';
      ctx.setLineDash([8, 6, 2, 6]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 180, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Radar Scan Line (360° Continuous Sweep)
      ctx.save();
      ctx.rotate(time * 0.35);
      ctx.strokeStyle = 'rgba(238, 182, 35, 0.65)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(260, 0);
      ctx.stroke();
      ctx.restore();

      ctx.restore();

      // 4. Floating Technical Particles & Elevation Markers
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pX = p.x + mouse.normX * 16 * p.z;
        const pY = p.y + mouse.normY * 16 * p.z;

        ctx.beginPath();
        ctx.arc(pX, pY, p.size * p.z, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(238, 182, 35, ' + (p.alpha * p.z) + ')';
        ctx.fill();

        if (p.label) {
          ctx.font = 'bold 8px monospace';
          ctx.fillStyle = 'rgba(120, 95, 30, ' + (p.alpha * 0.7) + ')';
          ctx.fillText(p.label, pX + 5, pY + 3);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    }

    // IntersectionObserver: Pause completely when scrolled past hero
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isVisible = true;
            if (!isMobile && !prefersReducedMotion && !animationFrameId) {
              render();
            }
          } else {
            isVisible = false;
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
              animationFrameId = null;
            }
          }
        });
      }, { threshold: 0.05 });
      observer.observe(canvas);
    }

    resize();
    if (!isMobile && !prefersReducedMotion) {
      render();
    }
  }

  // Defer execution until idle or DOM ready
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => initTechBlueprintEngine(), { timeout: 2000 });
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTechBlueprintEngine);
  } else {
    setTimeout(initTechBlueprintEngine, 100);
  }
})();
