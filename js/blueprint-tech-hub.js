/**
 * ============================================================================
 * ARUZ 3D ARCHITECTURAL CAD BLUEPRINT & HOLOGRAPHIC TECH HUB ENGINE
 * ============================================================================
 * Dynamic background canvas featuring:
 * - Architectural technical CAD blueprint grid & metric rulers
 * - 3D Isometric Villa & Structural Wireframes (Mayakoba elevations & floorplans)
 * - Rotating technical compass / protractor dials and degree scales
 * - 360° Laser radar scanner with subtle golden luminescence
 * - Interactive mouse parallax with smooth damping physics
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

    // Mouse coordinates with damping
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
      mouse.targetNormX = (clientX / width - 0.5) * 2; // -1 to 1
      mouse.targetNormY = (clientY / height - 0.5) * 2;
    });

    // Time and rotation state
    let time = 0;

    // Floating technical particles
    const particles = [];
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.8 + 0.2, // Depth factor
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        label: i % 8 === 0 ? `+${(Math.random() * 8 + 1).toFixed(2)}m` : null
      });
    }

    // Blueprint Architectural Structures (Isometric Wireframe Coordinates)
    function drawIsometricBlueprint(cx, cy, scale, rot, alpha) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.scale(scale, scale * 0.58); // Isometric perspective flatten

      ctx.strokeStyle = `rgba(200, 150, 25, ${alpha * 0.6})`;
      ctx.lineWidth = 1.2;
      ctx.fillStyle = `rgba(238, 182, 35, ${alpha * 0.04})`;

      // Villa Base Slab
      ctx.beginPath();
      ctx.moveTo(-140, -80);
      ctx.lineTo(140, -80);
      ctx.lineTo(140, 80);
      ctx.lineTo(-140, 80);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      // Subdivision Rooms / Walls
      ctx.beginPath();
      ctx.moveTo(-140, 0);
      ctx.lineTo(140, 0);
      ctx.moveTo(0, -80);
      ctx.lineTo(0, 80);
      ctx.moveTo(60, 0);
      ctx.lineTo(60, 80);
      ctx.stroke();

      // Chukum Pool Outline
      ctx.strokeStyle = `rgba(63, 93, 72, ${alpha * 0.8})`; // Verde Manglar
      ctx.fillStyle = `rgba(63, 93, 72, ${alpha * 0.12})`;
      ctx.beginPath();
      ctx.rect(-120, 20, 80, 45);
      ctx.stroke();
      ctx.fill();

      // Architectural Dimension Lines
      ctx.strokeStyle = `rgba(120, 100, 70, ${alpha * 0.4})`;
      ctx.lineWidth = 0.8;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(-155, -80);
      ctx.lineTo(-155, 80);
      ctx.moveTo(-140, 95);
      ctx.lineTo(140, 95);
      ctx.stroke();
      ctx.setLineDash([]);

      // Elevation Pillars
      ctx.strokeStyle = `rgba(238, 182, 35, ${alpha * 0.7})`;
      ctx.lineWidth = 1.4;
      const pillars = [[-140, -80], [140, -80], [140, 80], [-140, 80], [0, 0]];
      pillars.forEach(([px, py]) => {
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px, py - 45);
        ctx.stroke();
      });

      // Upper Roof Outline
      ctx.beginPath();
      ctx.moveTo(-140, -125);
      ctx.lineTo(140, -125);
      ctx.lineTo(140, 35);
      ctx.lineTo(-140, 35);
      ctx.closePath();
      ctx.stroke();

      ctx.restore();
    }

    function render() {
      time += 0.015;

      // Mouse smooth interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;
      mouse.normX += (mouse.targetNormX - mouse.normX) * 0.06;
      mouse.normY += (mouse.targetNormY - mouse.normY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2 + mouse.normX * 25;
      const centerY = height / 2 + mouse.normY * 20;

      // 1. Soft Warm Sand & Amber Gradient Backdrop
      const bgGrad = ctx.createRadialGradient(
        centerX, centerY, 50,
        centerX, centerY, Math.max(width, height) * 0.75
      );
      bgGrad.addColorStop(0, 'rgba(255, 245, 230, 0.95)');
      bgGrad.addColorStop(0.45, 'rgba(252, 236, 208, 0.7)');
      bgGrad.addColorStop(1, 'rgba(255, 248, 242, 0.3)');
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
      ctx.strokeStyle = 'rgba(216, 201, 174, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 290, 0, Math.PI * 2);
      ctx.stroke();

      // Degree Ticks along Outer Dial
      for (let deg = 0; deg < 360; deg += 15) {
        const rad = (deg * Math.PI) / 180;
        const r1 = deg % 45 === 0 ? 280 : 285;
        const r2 = 290;
        ctx.strokeStyle = deg % 45 === 0 ? 'rgba(200, 146, 21, 0.6)' : 'rgba(180, 150, 100, 0.25)';
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
      ctx.strokeStyle = 'rgba(238, 182, 35, 0.25)';
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
      radarGrad.addColorStop(1, 'rgba(238, 182, 35, 0.4)');

      ctx.fillStyle = radarGrad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 310, -0.35, 0);
      ctx.closePath();
      ctx.fill();

      // Scan Laser Leading Edge
      ctx.strokeStyle = 'rgba(238, 182, 35, 0.7)';
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

      // 4. Floating Isometric CAD Blueprints on Left and Right Wings
      const leftBpX = width * 0.16 + mouse.normX * 35;
      const leftBpY = height * 0.48 + mouse.normY * 25;
      drawIsometricBlueprint(leftBpX, leftBpY, 0.75, Math.sin(time * 0.2) * 0.03, 0.55);

      const rightBpX = width * 0.84 + mouse.normX * 35;
      const rightBpY = height * 0.52 + mouse.normY * 25;
      drawIsometricBlueprint(rightBpX, rightBpY, 0.75, -Math.sin(time * 0.2) * 0.03, 0.55);

      // 5. Technical CAD Annotation Labels
      ctx.font = '10px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(89, 85, 90, 0.55)'; // Gris grafito
      ctx.fillText(`SYS.COORD: 20°37'38"N 87°04'48"W`, 30, height - 25);
      ctx.fillText(`CIUDAD MAYAKOBA · CAD EJE-04 · TOLERANCIA ±1mm`, 30, height - 40);

      ctx.textAlign = 'right';
      ctx.fillText(`CÁLCULO ESTRUCTURAL CADE · S100`, width - 30, height - 25);
      ctx.fillText(`ARUZ ECOSYSTEM HUB · BIM 4D READY`, width - 30, height - 40);
      ctx.textAlign = 'left';

      // 6. Floating Technical Particles & Elevation Markers
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
          ctx.font = '9px monospace';
          ctx.fillStyle = 'rgba(120, 95, 30, ' + (p.alpha * 0.7) + ')';
          ctx.fillText(p.label, pX + 5, pY + 3);
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
