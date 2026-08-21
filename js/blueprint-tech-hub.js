/**
 * ============================================================================
 * ARUZ 3D ARCHITECTURAL CAD BLUEPRINT & HOLOGRAPHIC TECH HUB ENGINE
 * ============================================================================
 * Authentic Architectural Blueprints & Engineering CAD Schematics:
 * - CASA TU'UX (Senderos Poniente Mz 11 Lt 18 - 333.59 m²)
 * - CASA ETERNITY JOL (Senderos Norte Mz 18 Lt 03 - 305.31 m²)
 * - Real Engineering Stamps (CADE Diseño y Construcción & Grupo Ruiz)
 * - Detailed Dimensions, Material Callouts (Chukum, Piedra Maya, Tzalam)
 * - Metric Axes (A-B-C, 1-2-3), Elevation Markers (+0.15m, +3.40m, +9.80m)
 * - 360° Radar Scanning Beam & Interactive 3D Mouse Parallax
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

    // Floating technical particles with ARUZ coordinates
    const particles = [];
    const particleCount = 40;
    const elevationTags = [
      "N.P.T. +0.15m",
      "N.I.P. +3.40m",
      "N.C.T. +6.65m",
      "ROOF +9.80m",
      "ALBERCA -1.40m",
      "f'c=250kg/cm²",
      "CHUKUM ORG.",
      "VIGA IPR-12"
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.8 + 0.2,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        label: i % 5 === 0 ? elevationTags[i % elevationTags.length] : null
      });
    }

    // DRAW LEFT BLUEPRINT: CASA TU'UX (Senderos Poniente Mz 11 Lt 18)
    function drawTuuxBlueprint(cx, cy, scale, alpha) {
      if (width < 900) return; // Only show on desktop/tablet for visual elegance
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      // Blueprint Card Container Frame
      ctx.strokeStyle = `rgba(200, 146, 21, ${alpha * 0.5})`;
      ctx.lineWidth = 1.2;
      ctx.fillStyle = `rgba(255, 252, 245, ${alpha * 0.75})`;
      
      ctx.beginPath();
      ctx.rect(-170, -140, 340, 280);
      ctx.fill();
      ctx.stroke();

      // Top Title Bar
      ctx.fillStyle = `rgba(35, 31, 32, ${alpha * 0.9})`;
      ctx.fillRect(-170, -140, 340, 26);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 10px "Montserrat", sans-serif';
      ctx.fillText("ARUZ · PLANO ARQ-01 · CASA TU'UX (333.59 m²)", -160, -123);

      ctx.fillStyle = `rgba(238, 182, 35, ${alpha * 0.95})`;
      ctx.font = '9px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText("SENDEROS PONIENTE MZ 11 LT 18", 160, -123);
      ctx.textAlign = 'left';

      // Isometric Floorplan Wireframe
      ctx.save();
      ctx.translate(0, 15);
      ctx.scale(1, 0.58);
      ctx.rotate(-Math.PI / 6);

      // Outer Slab
      ctx.strokeStyle = `rgba(35, 31, 32, ${alpha * 0.7})`;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.rect(-100, -65, 200, 130);
      ctx.stroke();

      // Internal Room Partitions
      ctx.strokeStyle = `rgba(89, 85, 90, ${alpha * 0.6})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      // Double height living room
      ctx.rect(-100, -65, 110, 75);
      // Kitchen / Dining
      ctx.rect(10, -65, 90, 75);
      // Terrace & Chukum Pool
      ctx.stroke();

      // Alberca Chukum Highlight
      ctx.fillStyle = `rgba(63, 93, 72, ${alpha * 0.35})`; // Verde Manglar
      ctx.strokeStyle = `rgba(63, 93, 72, ${alpha * 0.9})`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.rect(-85, 20, 65, 38);
      ctx.fill();
      ctx.stroke();

      // Columns & Pillars
      ctx.fillStyle = `rgba(200, 146, 21, ${alpha * 0.9})`;
      const cols = [[-100, -65], [100, -65], [100, 65], [-100, 65], [10, -65], [10, 65]];
      cols.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      // Architectural Labels & Notes
      ctx.font = '9px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = `rgba(35, 31, 32, ${alpha * 0.85})`;
      ctx.fillText("• SALA A DOBLE ALTURA (VENTILACIÓN CRUZADA)", -155, 65);
      ctx.fillText("• ALBERCA PRIVADA EN ESTUCO CHUKUM (-1.40m)", -155, 80);
      ctx.fillText("• 3 SUITES + ESTUDIO HOME OFFICE (NIVEL 1)", -155, 95);
      ctx.fillText("• ROOF TOP PANORÁMICO CON ASADOR MASTER", -155, 110);

      // Dimension Callouts
      ctx.fillStyle = `rgba(199, 146, 21, ${alpha * 0.95})`;
      ctx.font = 'bold 9px monospace';
      ctx.fillText("TERRENO: 185.45 m² | CONST: 333.59 m²", -155, 126);

      // CADE Engineering Seal (Bottom Right)
      ctx.strokeStyle = `rgba(63, 93, 72, ${alpha * 0.7})`;
      ctx.lineWidth = 1;
      ctx.strokeRect(60, 60, 95, 68);
      ctx.fillStyle = `rgba(63, 93, 72, ${alpha * 0.9})`;
      ctx.font = 'bold 8px "Montserrat", sans-serif';
      ctx.fillText("SELLO CADE", 72, 75);
      ctx.font = '7.5px "Plus Jakarta Sans", sans-serif';
      ctx.fillText("CÁLCULO ESTRUCTURAL", 65, 89);
      ctx.fillText("ING. A. CARREÓN", 65, 102);
      ctx.fillText("CONCRETO f'c=250", 65, 115);

      ctx.restore();
    }

    // DRAW RIGHT BLUEPRINT: CASA ETERNITY JOL (Senderos Norte Mz 18 Lt 03)
    function drawEternityBlueprint(cx, cy, scale, alpha) {
      if (width < 900) return;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      // Blueprint Card Container Frame
      ctx.strokeStyle = `rgba(200, 146, 21, ${alpha * 0.5})`;
      ctx.lineWidth = 1.2;
      ctx.fillStyle = `rgba(255, 252, 245, ${alpha * 0.75})`;
      
      ctx.beginPath();
      ctx.rect(-170, -140, 340, 280);
      ctx.fill();
      ctx.stroke();

      // Top Title Bar
      ctx.fillStyle = `rgba(35, 31, 32, ${alpha * 0.9})`;
      ctx.fillRect(-170, -140, 340, 26);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 10px "Montserrat", sans-serif';
      ctx.fillText("ARUZ · PLANO EST-02 · ETERNITY JOL (305.31 m²)", -160, -123);

      ctx.fillStyle = `rgba(238, 182, 35, ${alpha * 0.95})`;
      ctx.font = '9px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText("SENDEROS NORTE MZ 18 LT 03", 160, -123);
      ctx.textAlign = 'left';

      // Elevation Schematic
      ctx.save();
      ctx.translate(0, -10);

      // Ground Line
      ctx.strokeStyle = `rgba(35, 31, 32, ${alpha * 0.8})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-130, 45);
      ctx.lineTo(130, 45);
      ctx.stroke();

      // 3 Levels Elevation Outlines
      ctx.strokeStyle = `rgba(200, 146, 21, ${alpha * 0.75})`;
      ctx.lineWidth = 1.2;
      // Level 1: Ground Floor
      ctx.strokeRect(-100, 5, 200, 40);
      // Level 2: First Level
      ctx.strokeRect(-90, -35, 180, 40);
      // Level 3: Roof Top Pergolado
      ctx.strokeRect(-70, -75, 140, 40);

      // Cantilever Pergola Beams
      ctx.strokeStyle = `rgba(63, 93, 72, ${alpha * 0.8})`;
      for (let bx = -60; bx <= 60; bx += 20) {
        ctx.beginPath();
        ctx.moveTo(bx, -75);
        ctx.lineTo(bx + 8, -85);
        ctx.stroke();
      }

      // Height Marker Levels
      ctx.font = '8px monospace';
      ctx.fillStyle = `rgba(89, 85, 90, ${alpha * 0.9})`;
      ctx.fillText("+9.80m ROOF CINEMA", 75, -70);
      ctx.fillText("+6.65m MASTER SUITE", 95, -30);
      ctx.fillText("+3.40m RECÁMARAS 1-2", 105, 10);
      ctx.fillText("+0.15m ALBERCA CHUKUM", 105, 42);

      ctx.restore();

      // Specifications & Notes
      ctx.font = '9px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = `rgba(35, 31, 32, ${alpha * 0.85})`;
      ctx.fillText("• ÁREA PARA PROYECTOR DE CINE EN ROOF TOP", -155, 65);
      ctx.fillText("• MASTER SUITE CON VESTIDOR & BALCÓN PRIVADO", -155, 80);
      ctx.fillText("• ALBERCA CHUKUM & COCHERA PERGOLADA", -155, 95);
      ctx.fillText("• ACABADOS: PIEDRA MAYA & MADERA TZALAM", -155, 110);

      // Dimension Callouts
      ctx.fillStyle = `rgba(199, 146, 21, ${alpha * 0.95})`;
      ctx.font = 'bold 9px monospace';
      ctx.fillText("TERRENO: 179.25 m² | CONST: 305.31 m²", -155, 126);

      // Grupo Ruiz Warranty Seal (Bottom Right)
      ctx.strokeStyle = `rgba(200, 146, 21, ${alpha * 0.8})`;
      ctx.lineWidth = 1;
      ctx.strokeRect(60, 60, 95, 68);
      ctx.fillStyle = `rgba(200, 146, 21, ${alpha * 0.95})`;
      ctx.font = 'bold 8px "Montserrat", sans-serif';
      ctx.fillText("GRUPO RUIZ", 72, 75);
      ctx.font = '7.5px "Plus Jakarta Sans", sans-serif';
      ctx.fillText("GARANTÍA NOTARIAL", 65, 89);
      ctx.fillText("CONSTRUCTIVO CADE", 65, 102);
      ctx.fillText("ENTREGA DIC 2026", 65, 115);

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

      ctx.strokeStyle = 'rgba(180, 150, 100, 0.13)';
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

      // 4. Authentic ARUZ Blueprints Placed on Wings
      const leftBpX = width * 0.16 + mouse.normX * 30;
      const leftBpY = height * 0.52 + mouse.normY * 20;
      drawTuuxBlueprint(leftBpX, leftBpY, 0.88, 0.78);

      const rightBpX = width * 0.84 + mouse.normX * 30;
      const rightBpY = height * 0.52 + mouse.normY * 20;
      drawEternityBlueprint(rightBpX, rightBpY, 0.88, 0.78);

      // 5. Technical CAD Header & Footer Information Bars
      ctx.font = 'bold 9.5px "Montserrat", sans-serif';
      ctx.fillStyle = 'rgba(35, 31, 32, 0.7)';
      ctx.fillText("ARUZ ECOSISTEMA DIGITAL 360 · ARQUITECTURA DE AUTOR & INGENIERÍA", 30, 32);

      ctx.font = '9px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(89, 85, 90, 0.65)';
      ctx.fillText("CIUDAD MAYAKOBA · PLAYA DEL CARMEN, Q. ROO · CP 77728 | CONSORTIUM GPRUIZ S.A. DE C.V.", 30, 47);

      ctx.textAlign = 'right';
      ctx.font = 'bold 9.5px monospace';
      ctx.fillStyle = 'rgba(199, 146, 21, 0.85)';
      ctx.fillText("SYS.GPS: 20°37'38.2\"N 87°04'48.6\"W", width - 30, 32);
      ctx.font = '9px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(89, 85, 90, 0.65)';
      ctx.fillText("COTA N.M.M: +8.45m | TOLERANCIA BIM ±1mm", width - 30, 47);
      ctx.textAlign = 'left';

      // Footer CAD Specs
      ctx.font = '9px monospace';
      ctx.fillStyle = 'rgba(89, 85, 90, 0.65)';
      ctx.fillText("CÁLCULO ESTRUCTURAL CADE · ING. ANTONIO CARREÓN | SUPERVISIÓN HIDROSANITARIA 2017-2026", 30, height - 25);
      
      ctx.textAlign = 'right';
      ctx.fillText("ARUZ MAQUINARIA: VOLTEOS 14m³ · EXCAVADORAS ORUGA · TRITURACIÓN 15 HA", width - 30, height - 25);
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
          ctx.font = 'bold 8.5px monospace';
          ctx.fillStyle = 'rgba(120, 95, 30, ' + (p.alpha * 0.85) + ')';
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
