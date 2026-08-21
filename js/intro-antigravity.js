/**
 * ARUZ CORE 360 - MINIMALIST HIGH-TECH ARCHITECTURAL HUD INTRO ENGINE
 * Luxury Architectural Tech Concept (Foster + Partners / HUD Hologram / CAD Precision)
 *
 * Implements:
 * 1. Minimalist Architectural Hub Layout (matching the website's 360 Ecosystem Hub)
 * 2. Glassmorphic Precision Tech Cards with Official Vector Logos & Division Telemetry
 * 3. CAD Hairline Coordinate Grid, Concentric Range Rings, Corner Viewport Brackets
 * 4. Laser Conduits with Orthogonal Leader Lines & Traveling Photon Pulses
 * 5. Antigravity Harmonic Float Physics & Damped Elastic Spring Entrance
 * 6. 2% Monochromatic Cinema Film Grain & "The Glow" Dissolve at 6.5s
 */

(function () {
  'use strict';

  class AruzTechHubIntro {
    constructor() {
      this.startTime = null;
      this.totalDuration = 7.8;
      this.fadeStart = 6.5;
      this.fadeDuration = 1.3;
      this.isDismissed = false;
      this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
      this.gyro = { x: 0, y: 0, targetX: 0, targetY: 0 };
      
      this.init();
    }

    init() {
      const existing = document.getElementById('aruz-intro-overlay');
      if (existing && existing.parentNode) {
        existing.parentNode.removeChild(existing);
      }

      // 1. Full Viewport Overlay Container
      this.container = document.createElement('div');
      this.container.id = 'aruz-intro-overlay';
      this.container.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 999999;
        background: #0B090A;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        touch-action: none;
        user-select: none;
        opacity: 1;
        transition: opacity 1.3s cubic-bezier(0.16, 1, 0.3, 1), visibility 1.3s;
      `;

      // 2. Hardware-accelerated Canvas Layer
      this.canvas = document.createElement('canvas');
      this.canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
      this.ctx = this.canvas.getContext('2d');
      this.container.appendChild(this.canvas);

      // 3. Monochromatic Cinema Film Grain (2% Noise)
      this.noiseCanvas = document.createElement('canvas');
      this.noiseCanvas.style.cssText = `
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        opacity: 0.035;
        pointer-events: none;
        mix-blend-mode: overlay;
      `;
      this.container.appendChild(this.noiseCanvas);
      this.initNoise();

      // 4. Glow / Supernova Dissolve Layer
      this.glowLayer = document.createElement('div');
      this.glowLayer.id = 'aruz-glow-flash';
      this.glowLayer.style.cssText = `
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, rgba(247,212,143,0.95) 0%, rgba(200,154,74,0.65) 35%, rgba(11,9,10,0) 75%);
        opacity: 0;
        pointer-events: none;
        mix-blend-mode: screen;
        transition: opacity 0.8s ease-out;
      `;
      this.container.appendChild(this.glowLayer);

      // 5. Minimalist Glassmorphic Skip Button
      this.skipBtn = document.createElement('button');
      this.skipBtn.innerHTML = `
        <span>Saltar Intro</span>
        <svg style="width:13px;height:13px;fill:currentColor;margin-left:6px;" viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>
      `;
      this.skipBtn.style.cssText = `
        position: absolute;
        top: 24px;
        right: 24px;
        z-index: 10;
        background: rgba(255,255,255,0.05);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(230,192,123,0.3);
        color: #E6C07B;
        font-family: 'Montserrat', sans-serif;
        font-size: 10.5px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        padding: 8px 18px;
        border-radius: 999px;
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        opacity: 0;
      `;
      this.skipBtn.addEventListener('mouseenter', () => {
        this.skipBtn.style.background = 'rgba(230,192,123,0.2)';
        this.skipBtn.style.borderColor = 'rgba(230,192,123,0.8)';
        this.skipBtn.style.transform = 'scale(1.05)';
      });
      this.skipBtn.addEventListener('mouseleave', () => {
        this.skipBtn.style.background = 'rgba(255,255,255,0.05)';
        this.skipBtn.style.borderColor = 'rgba(230,192,123,0.3)';
        this.skipBtn.style.transform = 'scale(1)';
      });
      this.skipBtn.addEventListener('click', () => this.dismiss());
      this.container.appendChild(this.skipBtn);

      // 6. HUD Telemetry Coordinates Badge (Top Left)
      this.telemetryBadge = document.createElement('div');
      this.telemetryBadge.style.cssText = `
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 10;
        font-family: 'Montserrat', monospace, sans-serif;
        font-size: 9px;
        letter-spacing: 2px;
        color: rgba(230,192,123,0.7);
        text-transform: uppercase;
        opacity: 0;
        transition: opacity 1s ease;
        pointer-events: none;
        line-height: 1.6;
      `;
      this.telemetryBadge.innerHTML = `
        <div>ARUZ CORE 360 · ECOSYSTEM HUD</div>
        <div style="color:rgba(255,255,255,0.4);font-size:8px;">LAT 20.6274° N · LON 87.0799° W · MAYAKOBA</div>
      `;
      this.container.appendChild(this.telemetryBadge);

      // Mount to body
      document.body.appendChild(this.container);
      document.body.style.overflow = 'hidden';

      // Load Official Vector Logos
      this.loadLogos();

      // Setup Hub Nodes
      this.setupNodes();

      // Resize & Events
      this.handleResize();
      window.addEventListener('resize', () => this.handleResize());
      window.addEventListener('mousemove', (e) => this.handleMouseMove(e));

      // Device Gyroscope Parallax
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
          if (e.gamma !== null && e.beta !== null) {
            this.gyro.targetX = Math.min(Math.max(e.gamma / 30, -1), 1) * 22;
            this.gyro.targetY = Math.min(Math.max((e.beta - 45) / 30, -1), 1) * 22;
          }
        }, true);
      }

      requestAnimationFrame((t) => this.render(t));
    }

    initNoise() {
      this.noiseCanvas.width = 256;
      this.noiseCanvas.height = 256;
      const nCtx = this.noiseCanvas.getContext('2d');
      const imgData = nCtx.createImageData(256, 256);
      const buffer = new Uint32Array(imgData.data.buffer);
      for (let i = 0; i < buffer.length; i++) {
        const val = Math.random() * 255 | 0;
        buffer[i] = (255 << 24) | (val << 16) | (val << 8) | val;
      }
      nCtx.putImageData(imgData, 0, 0);
    }

    loadLogos() {
      this.logos = {
        core: new Image(),
        desarrolladora: new Image(),
        inmobiliaria: new Image(),
        cade: new Image(),
        maquinaria: new Image()
      };

      this.logos.core.src = 'assets/logo-white.svg';
      this.logos.desarrolladora.src = 'assets/logo-aruz-desarrolladora.svg';
      this.logos.inmobiliaria.src = 'assets/logo-aruz-inmobiliaria.svg';
      this.logos.cade.src = 'assets/logo-cade.svg';
      this.logos.maquinaria.src = 'assets/logo-aruz-maquinaria.svg';
    }

    setupNodes() {
      // 5 Tech Hub Nodes (Core Monolith + 4 Satellite Glassmorphic Badges)
      this.nodes = [
        {
          index: 0, // Central Core
          isCore: true,
          logoKey: 'core',
          code: 'CORE · 360°',
          name: 'ARUZ CORE HOLDING',
          accent: '#E6C07B',
          glow: 'rgba(230, 192, 123, 0.4)',
          width: 170,
          height: 90,
          zDist: 1.2,
          relX: 0,
          relY: 0
        },
        {
          index: 1, // Desarrolladora (Top Left)
          logoKey: 'desarrolladora',
          code: 'DIV-01',
          tag: 'ARQUITECTURA & DESARROLLO',
          accent: '#D4AF37',
          glow: 'rgba(212, 175, 55, 0.35)',
          width: 180,
          height: 72,
          zDist: 0.95,
          angle: -140,
          dist: 200
        },
        {
          index: 2, // Inmobiliaria (Top Right)
          logoKey: 'inmobiliaria',
          code: 'DIV-02',
          tag: 'PORTAFOLIO & CERTEZA LEGAL',
          accent: '#C89A4A',
          glow: 'rgba(200, 154, 74, 0.35)',
          width: 180,
          height: 72,
          zDist: 0.92,
          angle: -40,
          dist: 200
        },
        {
          index: 3, // CADE (Bottom Right)
          logoKey: 'cade',
          code: 'DIV-03',
          tag: 'DISEÑO & CONSTRUCCIÓN',
          accent: '#4E8752',
          glow: 'rgba(78, 135, 82, 0.4)',
          width: 180,
          height: 72,
          zDist: 1.05,
          angle: 40,
          dist: 200
        },
        {
          index: 4, // Maquinaria (Bottom Left)
          logoKey: 'maquinaria',
          code: 'DIV-04',
          tag: 'FLOTA PESADA & INFRAESTRUCTURA',
          accent: '#E6953B',
          glow: 'rgba(230, 149, 59, 0.4)',
          width: 180,
          height: 72,
          zDist: 0.90,
          angle: 140,
          dist: 200
        }
      ];
    }

    handleResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width * window.devicePixelRatio;
      this.canvas.height = this.height * window.devicePixelRatio;
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      const isMobile = this.width < 768;
      const isTablet = this.width >= 768 && this.width < 1024;

      // Adjust node distances for mobile vs widescreen
      const radX = isMobile ? this.width * 0.36 : isTablet ? 230 : Math.min(this.width * 0.26, 320);
      const radY = isMobile ? this.height * 0.28 : isTablet ? 170 : Math.min(this.height * 0.24, 210);

      this.nodes.forEach(node => {
        if (node.index === 0) {
          node.baseX = this.width / 2;
          node.baseY = this.height / 2;
          if (isMobile) {
            node.width = 150;
            node.height = 80;
          } else {
            node.width = 190;
            node.height = 96;
          }
        } else {
          if (isMobile) {
            node.width = 145;
            node.height = 62;
          } else {
            node.width = 195;
            node.height = 74;
          }
          const rad = (node.angle * Math.PI) / 180;
          node.baseX = this.width / 2 + Math.cos(rad) * radX;
          node.baseY = this.height / 2 + Math.sin(rad) * radY;
        }
      });
    }

    handleMouseMove(e) {
      this.mouse.targetX = ((e.clientX - this.width / 2) / (this.width / 2)) * 24;
      this.mouse.targetY = ((e.clientY - this.height / 2) / (this.height / 2)) * 24;
    }

    /**
     * Damped Elastic Reveal
     */
    getElasticScale(nodeIndex, currentTime) {
      const delay = (nodeIndex === 0 ? 0 : nodeIndex) * 0.22;
      const startTime = 0.9 + delay;
      const duration = 0.9;

      if (currentTime < startTime) return 0;
      const t = currentTime - startTime;
      if (t < duration) {
        const s = t / duration;
        const p = 0.35;
        const a = 0.85;
        const decay = Math.pow(2, -9 * s);
        const val = a * decay * Math.sin((s - p / 4) * (2 * Math.PI) / p) + 1;
        return Math.max(0, val);
      }
      return 1.0;
    }

    /**
     * Antigravity Harmonic Motion
     */
    getAntigravityPos(node, currentTime) {
      const speed = 0.5;
      const amp = 10;
      const drift = 7;
      const seed = node.index * 123.45;

      const physX = Math.sin(currentTime * speed + seed) * amp + Math.cos(currentTime * 0.25 + seed) * drift;
      const physY = Math.cos(currentTime * speed * 0.8 + seed) * (amp * 1.15);

      const cameraX = (this.mouse.x + this.gyro.x) * (node.zDist * 0.75);
      const cameraY = (this.mouse.y + this.gyro.y) * (node.zDist * 0.75);

      return {
        x: node.baseX + physX + cameraX,
        y: node.baseY + physY + cameraY
      };
    }

    render(timestamp) {
      if (this.isDismissed) return;

      if (!this.startTime) this.startTime = timestamp;
      const elapsed = (timestamp - this.startTime) / 1000;

      // Smooth lerp
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.06;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.06;
      this.gyro.x += (this.gyro.targetX - this.gyro.x) * 0.06;
      this.gyro.y += (this.gyro.targetY - this.gyro.y) * 0.06;

      if (elapsed > 1.2 && parseFloat(this.skipBtn.style.opacity) < 1) {
        this.skipBtn.style.opacity = '1';
        this.telemetryBadge.style.opacity = '0.9';
      }

      this.ctx.clearRect(0, 0, this.width, this.height);

      // 1. Draw Architectural CAD Blueprint Background (Grid, Rings & Crosshairs)
      this.drawArchitecturalGrid(elapsed);

      // 2. Compute Nodes Positions & Scales
      const calculatedNodes = this.nodes.map(node => {
        const scale = this.getElasticScale(node.index, elapsed);
        const pos = this.getAntigravityPos(node, elapsed);
        return {
          ...node,
          currentX: pos.x,
          currentY: pos.y,
          currentScale: scale
        };
      });

      const coreNode = calculatedNodes[0];

      // 3. Draw High-Tech Laser Conduits & Orthogonal Leader Lines
      if (coreNode.currentScale > 0.1) {
        for (let i = 1; i < calculatedNodes.length; i++) {
          const sat = calculatedNodes[i];
          if (sat.currentScale > 0.05) {
            this.drawLeaderConduit(coreNode, sat, elapsed);
          }
        }
      }

      // 4. Sort and Render High-Tech Cards
      const sorted = [...calculatedNodes].sort((a, b) => a.zDist - b.zDist);
      sorted.forEach(node => {
        if (node.currentScale > 0.01) {
          if (node.isCore) {
            this.drawCoreHubMonolith(node, elapsed);
          } else {
            this.drawSatelliteTechCard(node, elapsed);
          }
        }
      });

      // 5. Handle "The Glow" Burst & Dissolve at 6.5s
      if (elapsed >= this.fadeStart) {
        const fadeProgress = Math.min((elapsed - this.fadeStart) / this.fadeDuration, 1.0);
        const glowOpacity = Math.sin(fadeProgress * Math.PI) * 0.98;
        this.glowLayer.style.opacity = glowOpacity.toString();
        this.container.style.opacity = (1.0 - fadeProgress).toString();

        if (fadeProgress >= 1.0) {
          this.dismiss();
          return;
        }
      }

      requestAnimationFrame((t) => this.render(t));
    }

    drawArchitecturalGrid(time) {
      const cx = this.width / 2;
      const cy = this.height / 2;

      this.ctx.save();

      // Deep radial dark backdrop
      const bgGrad = this.ctx.createRadialGradient(cx, cy, 80, cx, cy, Math.max(this.width, this.height) * 0.85);
      bgGrad.addColorStop(0, '#151113');
      bgGrad.addColorStop(0.5, '#0C0A0B');
      bgGrad.addColorStop(1, '#050405');
      this.ctx.fillStyle = bgGrad;
      this.ctx.fillRect(0, 0, this.width, this.height);

      // Fine CAD Grid lines (Hairline 0.5px)
      this.ctx.strokeStyle = 'rgba(230, 192, 123, 0.05)';
      this.ctx.lineWidth = 0.6;
      const gridSize = 60;

      for (let x = (cx % gridSize); x < this.width; x += gridSize) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, this.height);
        this.ctx.stroke();
      }
      for (let y = (cy % gridSize); y < this.height; y += gridSize) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(this.width, y);
        this.ctx.stroke();
      }

      // Concentric Range Rings around Hub
      const rings = [120, 220, 320];
      rings.forEach((r, idx) => {
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
        this.ctx.strokeStyle = idx === 1 ? 'rgba(230, 192, 123, 0.12)' : 'rgba(255, 255, 255, 0.04)';
        this.ctx.setLineDash(idx === 1 ? [4, 8] : []);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
      });

      // Subtle Rotating CAD Compass Ticks
      this.ctx.save();
      this.ctx.translate(cx, cy);
      this.ctx.rotate(time * 0.08);
      this.ctx.strokeStyle = 'rgba(230, 192, 123, 0.2)';
      this.ctx.lineWidth = 1;
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
        const x1 = Math.cos(a) * 214;
        const y1 = Math.sin(a) * 214;
        const x2 = Math.cos(a) * 226;
        const y2 = Math.sin(a) * 226;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
      }
      this.ctx.restore();

      // Corner Viewport Brackets (CAD Viewport Framing)
      const pad = 30;
      const bLen = 18;
      this.ctx.strokeStyle = 'rgba(230, 192, 123, 0.35)';
      this.ctx.lineWidth = 1.2;

      // Top Left
      this.ctx.beginPath();
      this.ctx.moveTo(pad, pad + bLen);
      this.ctx.lineTo(pad, pad);
      this.ctx.lineTo(pad + bLen, pad);
      this.ctx.stroke();

      // Top Right
      this.ctx.beginPath();
      this.ctx.moveTo(this.width - pad - bLen, pad);
      this.ctx.lineTo(this.width - pad, pad);
      this.ctx.lineTo(this.width - pad, pad + bLen);
      this.ctx.stroke();

      // Bottom Left
      this.ctx.beginPath();
      this.ctx.moveTo(pad, this.height - pad - bLen);
      this.ctx.lineTo(pad, this.height - pad);
      this.ctx.lineTo(pad + bLen, this.height - pad);
      this.ctx.stroke();

      // Bottom Right
      this.ctx.beginPath();
      this.ctx.moveTo(this.width - pad - bLen, this.height - pad);
      this.ctx.lineTo(this.width - pad, this.height - pad);
      this.ctx.lineTo(this.width - pad, this.height - pad - bLen);
      this.ctx.stroke();

      this.ctx.restore();
    }

    drawLeaderConduit(core, sat, time) {
      const alpha = Math.min(core.currentScale, sat.currentScale) * 0.45;
      
      this.ctx.save();

      // Orthogonal Dog-leg Leader Line (Architectural Tech HUD Style)
      const midX = (core.currentX + sat.currentX) / 2;
      const midY = (core.currentY + sat.currentY) / 2;

      this.ctx.beginPath();
      this.ctx.moveTo(core.currentX, core.currentY);
      this.ctx.lineTo(midX, core.currentY);
      this.ctx.lineTo(sat.currentX, sat.currentY);
      
      this.ctx.strokeStyle = `rgba(230, 192, 123, ${alpha * 0.6})`;
      this.ctx.lineWidth = 1.2;
      this.ctx.stroke();

      // Joint Node Anchor Crosshair
      this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(midX - 3, core.currentY);
      this.ctx.lineTo(midX + 3, core.currentY);
      this.ctx.moveTo(midX, core.currentY - 3);
      this.ctx.lineTo(midX, core.currentY + 3);
      this.ctx.stroke();

      // Traveling High-Speed Photon Packet
      const pulseT = ((time * 0.85 + sat.index * 0.25) % 1.0);
      let px, py;
      if (pulseT < 0.5) {
        const subT = pulseT / 0.5;
        px = core.currentX + (midX - core.currentX) * subT;
        py = core.currentY;
      } else {
        const subT = (pulseT - 0.5) / 0.5;
        px = midX + (sat.currentX - midX) * subT;
        py = core.currentY + (sat.currentY - core.currentY) * subT;
      }

      this.ctx.beginPath();
      this.ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.shadowColor = '#E6C07B';
      this.ctx.shadowBlur = 10;
      this.ctx.fill();

      this.ctx.restore();
    }

    drawCoreHubMonolith(node, time) {
      const { currentX: x, currentY: y, currentScale: scale, width: baseW, height: baseH } = node;
      const w = baseW * scale;
      const h = baseH * scale;

      this.ctx.save();

      // Volumetric Core Radial Glow
      const glowGrad = this.ctx.createRadialGradient(x, y, 20 * scale, x, y, 140 * scale);
      glowGrad.addColorStop(0, 'rgba(230, 192, 123, 0.45)');
      glowGrad.addColorStop(0.5, 'rgba(230, 192, 123, 0.12)');
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      this.ctx.fillStyle = glowGrad;
      this.ctx.fillRect(x - 140 * scale, y - 140 * scale, 280 * scale, 280 * scale);

      // Glassmorphic Rounded Monolith Container
      const rad = 20 * scale;
      this.ctx.beginPath();
      this.ctx.roundRect(x - w / 2, y - h / 2, w, h, rad);

      // Metallic Brushed Carbon & Gold Gradient Body
      const bodyGrad = this.ctx.createLinearGradient(x - w / 2, y - h / 2, x + w / 2, y + h / 2);
      bodyGrad.addColorStop(0, '#1E1719');
      bodyGrad.addColorStop(0.5, '#130E10');
      bodyGrad.addColorStop(1, '#0A0708');
      this.ctx.fillStyle = bodyGrad;
      this.ctx.shadowColor = 'rgba(230, 192, 123, 0.35)';
      this.ctx.shadowBlur = 24;
      this.ctx.fill();

      // Precision Gold Hairline Border
      this.ctx.strokeStyle = 'rgba(230, 192, 123, 0.65)';
      this.ctx.lineWidth = 1.4;
      this.ctx.stroke();

      // Inner Telemetry Header Strip
      this.ctx.fillStyle = 'rgba(230, 192, 123, 0.08)';
      this.ctx.fillRect(x - w / 2 + 1.4, y - h / 2 + 1.4, w - 2.8, 20 * scale);

      // Status Beacon & Code
      this.ctx.fillStyle = '#25D366';
      this.ctx.beginPath();
      this.ctx.arc(x - w / 2 + 14 * scale, y - h / 2 + 10 * scale, 2.5 * scale, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.font = `bold ${Math.round(8 * scale)}px 'Montserrat', sans-serif`;
      this.ctx.fillStyle = '#E6C07B';
      this.ctx.textAlign = 'left';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('ARUZ CORE · 360° HUB', x - w / 2 + 22 * scale, y - h / 2 + 10 * scale);

      // Official White/Gold ARUZ Logo Centered Inside
      const logoImg = this.logos.core;
      if (logoImg && logoImg.complete && scale > 0.2) {
        const lw = 105 * scale;
        const lh = 36 * scale;
        this.ctx.drawImage(logoImg, x - lw / 2, y - lh / 2 + 6 * scale, lw, lh);
      }

      this.ctx.restore();
    }

    drawSatelliteTechCard(node, time) {
      const { currentX: x, currentY: y, currentScale: scale, width: baseW, height: baseH, logoKey, code, tag, accent, glow } = node;
      const w = baseW * scale;
      const h = baseH * scale;

      this.ctx.save();

      // Subtle Soft Outer Halo
      const haloGrad = this.ctx.createRadialGradient(x, y, 10 * scale, x, y, 100 * scale);
      haloGrad.addColorStop(0, glow);
      haloGrad.addColorStop(0.5, glow.replace(/[\d.]+\)$/, '0.08)'));
      haloGrad.addColorStop(1, 'rgba(0,0,0,0)');
      this.ctx.fillStyle = haloGrad;
      this.ctx.fillRect(x - 100 * scale, y - 100 * scale, 200 * scale, 200 * scale);

      // Tech Card Body (Glassmorphic Rounded Rectangle)
      const rad = 14 * scale;
      this.ctx.beginPath();
      this.ctx.roundRect(x - w / 2, y - h / 2, w, h, rad);

      const cardGrad = this.ctx.createLinearGradient(x - w / 2, y - h / 2, x + w / 2, y + h / 2);
      cardGrad.addColorStop(0, 'rgba(30, 24, 26, 0.92)');
      cardGrad.addColorStop(1, 'rgba(12, 9, 10, 0.95)');
      this.ctx.fillStyle = cardGrad;
      this.ctx.shadowColor = glow;
      this.ctx.shadowBlur = 16;
      this.ctx.fill();

      // Crisp Hairline Accent Border
      this.ctx.strokeStyle = `rgba(255, 255, 255, 0.16)`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();

      // Left Accent Vertical Indicator
      this.ctx.fillStyle = accent;
      this.ctx.beginPath();
      this.ctx.roundRect(x - w / 2 + 4 * scale, y - h / 2 + 10 * scale, 3 * scale, h - 20 * scale, 1.5 * scale);
      this.ctx.fill();

      // Top Division Code & Tag
      this.ctx.textAlign = 'left';
      this.ctx.textBaseline = 'top';
      this.ctx.font = `bold ${Math.round(7.5 * scale)}px 'Montserrat', sans-serif`;
      this.ctx.fillStyle = accent;
      this.ctx.fillText(code, x - w / 2 + 12 * scale, y - h / 2 + 9 * scale);

      this.ctx.font = `600 ${Math.round(6.5 * scale)}px 'Montserrat', sans-serif`;
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      this.ctx.fillText(tag, x - w / 2 + 48 * scale, y - h / 2 + 9.5 * scale);

      // Official Logo in lower section of card
      const logoImg = this.logos[logoKey];
      if (logoImg && logoImg.complete && scale > 0.2) {
        const lw = 92 * scale;
        const lh = 30 * scale;
        this.ctx.drawImage(logoImg, x - w / 2 + 12 * scale, y - h / 2 + 24 * scale, lw, lh);
      }

      this.ctx.restore();
    }

    dismiss() {
      if (this.isDismissed) return;
      this.isDismissed = true;

      this.container.style.opacity = '0';
      this.container.style.pointerEvents = 'none';

      setTimeout(() => {
        if (this.container && this.container.parentNode) {
          this.container.parentNode.removeChild(this.container);
        }
        document.body.style.overflow = '';
      }, 1300);
    }
  }

  // Global replay function
  window.playAruzIntro = function() {
    window.AruzIntroInstance = new AruzTechHubIntro();
  };

  function launchIntro() {
    window.playAruzIntro();

    document.querySelectorAll('a[href="index.html"], a[href="/"], a[href="./index.html"]').forEach(link => {
      link.addEventListener('click', function(e) {
        const currentPath = window.location.pathname;
        if (currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/Aruz/') || currentPath.endsWith('/Aruz')) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          window.playAruzIntro();
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', launchIntro);
  } else {
    launchIntro();
  }
})();
