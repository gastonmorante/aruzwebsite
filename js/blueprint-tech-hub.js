/**
 * ============================================================================
 * ARUZ 3D ARCHITECTURAL CAD GRID & HOLOGRAPHIC TECH HUB ENGINE
 * ============================================================================
 * Clean, High-Tech Minimalist Background Engine:
 * - Architectural technical CAD coordinate grid with micro-ticks & crosshairs
 * - Concentric rotating blueprint dials & compass rings with degree markers
 * - Dynamic 360° radar laser sweep with subtle golden luminescence
 * - Floating technical coordinates & elevation particles
 * - Responsive 3D mouse parallax with smooth damping physics
 * ============================================================================
 */

(function () {
  function initTechBlueprintEngine() {
    const canvas = document.getElementById('heroTechBlueprintCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let width = 0;
    let height = 0;
    let dpr = 1;

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

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = canvas.parentElement || canvas;
      width = parent.offsetWidth || window.innerWidth;
      height = parent.offsetHeight || window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouse.targetX = clientX;
      mouse.targetY = clientY;
      mouse.targetNormX = (clientX / width - 0.5) * 2;
      mouse.targetNormY = (clientY / height - 0.5) * 2;
    });

    let time = 0;

    // Floating technical particles with ARUZ elevation coordinates
    const particles = [];
    const particleCount = 35;
    const elevationTags = [
      "N.P.T. +0.15m",
      "N.I.P. +3.40m",
      "ROOF +9.80m",
      "f'c=250kg/cm²",
      "20°37'38\"N",
      "87°04'48\"W",
      "BIM 4D READY",
      "CADE S100"
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.8 + 0.2,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.45 + 0.15,
        label: i % 4 === 0 ? elevationTags[i % elevationTags.length] : null
      });
    }

    function render() {
      time += 0.015;

      // Mouse smooth damping interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;
      mouse.normX += (mouse.targetNormX - mouse.normX) * 0.06;
      mouse.normY += (mouse.targetNormY - mouse.normY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2 + mouse.normX * 22;
      const centerY = height / 2 + mouse.normY * 18;

      // 1. Soft Warm Sand & Amber Gradient Backdrop
      const bgGrad = ctx.createRadialGradient(
        centerX, centerY, 50,
        centerX, centerY, Math.max(width, height) * 0.75
      );
      bgGrad.addColorStop(0, 'rgba(255, 246, 232, 0.95)');
      bgGrad.addColorStop(0.45, 'rgba(252, 236, 208, 0.75)');
      bgGrad.addColorStop(1, 'rgba(255, 248, 242, 0.35)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Architectural Technical CAD Grid with Parallax
      const gridSize = 50;
      const offsetX = (mouse.normX * 15) % gridSize;
      const offsetY = (mouse.normY * 15) % gridSize;

      ctx.strokeStyle = 'rgba(180, 150, 100, 0.12)';
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
      ctx.fillStyle = 'rgba(200, 146, 21, 0.35)';
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
      ctx.rotate(-time * 0.08);
      ctx.strokeStyle = 'rgba(216, 201, 174, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 290, 0, Math.PI * 2);
      ctx.stroke();

      // Degree Ticks along Outer Dial
      for (let deg = 0; deg < 360; deg += 15) {
        const rad = (deg * Math.PI) / 180;
        const r1 = deg % 45 === 0 ? 278 : 284;
        const r2 = 290;
        ctx.strokeStyle = deg % 45 === 0 ? 'rgba(200, 146, 21, 0.65)' : 'rgba(180, 150, 100, 0.25)';
        ctx.lineWidth = deg % 45 === 0 ? 1.5 : 0.8;
        ctx.beginPath();
        ctx.moveTo(Math.cos(rad) * r1, Math.sin(rad) * r1);
        ctx.lineTo(Math.cos(rad) * r2, Math.sin(rad) * r2);
        ctx.stroke();
      }
      ctx.restore();

      // Inner Technical Dial (Clockwise)
      ctx.save();
      ctx.rotate(time * 0.12);
      ctx.strokeStyle = 'rgba(238, 182, 35, 0.3)';
      ctx.setLineDash([8, 6, 2, 6]);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, 0, 190, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Radar Scan Line (360° Continuous Sweep)
      ctx.save();
      ctx.rotate(time * 0.4);
      const radarGrad = ctx.createLinearGradient(0, 0, 320, 0);
      radarGrad.addColorStop(0, 'rgba(238, 182, 35, 0)');
      radarGrad.addColorStop(0.7, 'rgba(238, 182, 35, 0.08)');
      radarGrad.addColorStop(1, 'rgba(238, 182, 35, 0.45)');

      ctx.fillStyle = radarGrad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 310, -0.35, 0);
      ctx.closePath();
      ctx.fill();

      // Scan Laser Leading Edge
      ctx.strokeStyle = 'rgba(238, 182, 35, 0.75)';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#EEB623';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(310, 0);
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();

      ctx.restore();

      // 4. Subtle Technical CAD Header & Footer Information Bars
      ctx.font = 'bold 9.5px "Montserrat", sans-serif';
      ctx.fillStyle = 'rgba(35, 31, 32, 0.45)';
      ctx.fillText("ARUZ ECOSISTEMA DIGITAL 360 · CIUDAD MAYAKOBA", 30, 32);

      ctx.textAlign = 'right';
      ctx.font = 'bold 9.5px monospace';
      ctx.fillStyle = 'rgba(199, 146, 21, 0.65)';
      ctx.fillText("SYS.GPS: 20°37'38.2\"N 87°04'48.6\"W", width - 30, 32);
      ctx.textAlign = 'left';

      // 5. Floating Technical Particles & Elevation Markers
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pX = p.x + mouse.normX * 20 * p.z;
        const pY = p.y + mouse.normY * 20 * p.z;

        ctx.beginPath();
        ctx.arc(pX, pY, p.size * p.z, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(238, 182, 35, ' + (p.alpha * p.z) + ')';
        ctx.fill();

        if (p.label) {
          ctx.font = 'bold 8.5px monospace';
          ctx.fillStyle = 'rgba(120, 95, 30, ' + (p.alpha * 0.75) + ')';
          ctx.fillText(p.label, pX + 6, pY + 3);
        }
      });

      requestAnimationFrame(render);
    }

    render();
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTechBlueprintEngine);
  } else {
    initTechBlueprintEngine();
  }
})();
