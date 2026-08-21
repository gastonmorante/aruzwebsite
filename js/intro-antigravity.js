/**
 * ARUZ CORE 360 - LIGHT BLUEPRINT ARCHITECTURAL INTRO ENGINE (ZERO-FLASH GUARANTEE)
 * Native Mobile, Tablet & Desktop Motion Graphics
 *
 * Guaranteed Execution:
 * 1. ZERO-FLASH: Overlays the entire screen immediately before DOM paint
 * 2. Warm Architectural Blueprint Background (#FAF8F5) with CAD Grid & Crosshairs
 * 3. 5 Clean Circular Nodes (Round Spheres) with pure, unclipped Isologos
 * 4. Harmonic Antigravity Physics with Damped Elastic Spring Entrance
 * 5. Minimalist Viewport (No GPS/HUD text, only clean Skip button)
 * 6. "The Glow" Golden Radial Dissolve at 6.5s
 */

(function () {
  'use strict';

  class AruzBlueprintIntro {
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
      // 1. Get or Create Full Viewport Overlay Container
      this.container = document.getElementById('aruz-intro-overlay') || document.createElement('div');
      this.container.id = 'aruz-intro-overlay';
      this.container.innerHTML = '';
      this.container.style.cssText = `
        position: fixed !important;
        inset: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 999999 !important;
        background: #FAF8F5 !important;
        overflow: hidden !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        touch-action: none !important;
        user-select: none !important;
        opacity: 1 !important;
        transition: opacity 1.3s cubic-bezier(0.16, 1, 0.3, 1), visibility 1.3s !important;
      `;

      // 2. Hardware-accelerated Canvas Layer
      this.canvas = document.createElement('canvas');
      this.canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
      this.ctx = this.canvas.getContext('2d');
      this.container.appendChild(this.canvas);

      // 3. Subtle Monochromatic Film Grain Texture (2% Noise)
      this.noiseCanvas = document.createElement('canvas');
      this.noiseCanvas.style.cssText = `
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        opacity: 0.025;
        pointer-events: none;
        mix-blend-mode: multiply;
      `;
      this.container.appendChild(this.noiseCanvas);
      this.initNoise();

      // 4. Glow / Golden Light Burst Dissolve Layer
      this.glowLayer = document.createElement('div');
      this.glowLayer.id = 'aruz-glow-flash';
      this.glowLayer.style.cssText = `
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, rgba(255,255,255,0.98) 0%, rgba(230,192,123,0.7) 40%, rgba(250,248,245,0) 80%);
        opacity: 0;
        pointer-events: none;
        mix-blend-mode: screen;
        transition: opacity 0.8s ease-out;
      `;
      this.container.appendChild(this.glowLayer);

      // 5. Clean Minimalist "Saltar Intro" Button
      this.skipBtn = document.createElement('button');
      this.skipBtn.innerHTML = `
        <span>Saltar Intro</span>
        <svg style="width:12px;height:12px;fill:currentColor;margin-left:6px;" viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>
      `;
      this.skipBtn.style.cssText = `
        position: absolute;
        top: 24px;
        right: 24px;
        z-index: 10;
        background: rgba(255,255,255,0.9);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(200,154,74,0.4);
        color: #1A1517;
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
        box-shadow: 0 4px 14px rgba(0,0,0,0.06);
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        opacity: 0;
      `;
      this.skipBtn.addEventListener('mouseenter', () => {
        this.skipBtn.style.background = '#EEB623';
        this.skipBtn.style.color = '#FFFFFF';
        this.skipBtn.style.borderColor = '#EEB623';
        this.skipBtn.style.transform = 'scale(1.05)';
      });
      this.skipBtn.addEventListener('mouseleave', () => {
        this.skipBtn.style.background = 'rgba(255,255,255,0.9)';
        this.skipBtn.style.color = '#1A1517';
        this.skipBtn.style.borderColor = 'rgba(200,154,74,0.4)';
        this.skipBtn.style.transform = 'scale(1)';
      });
      this.skipBtn.addEventListener('click', () => this.dismiss());
      this.container.appendChild(this.skipBtn);

      // Mount to body immediately at top
      if (document.body) {
        if (this.container.parentNode !== document.body) {
          document.body.insertBefore(this.container, document.body.firstChild);
        }
        document.body.style.overflow = 'hidden';
      }

      // Preload 5 Pure Isologos
      this.loadIsologos();

      // Setup 5 Circular Node Entities
      this.setupNodes();

      // Resize & Initial Paint (Synchronous frame 0)
      this.handleResize();
      this.render(performance.now());

      window.addEventListener('resize', () => this.handleResize());
      window.addEventListener('mousemove', (e) => this.handleMouseMove(e));

      // Device Gyroscope Parallax (Mobile)
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
          if (e.gamma !== null && e.beta !== null) {
            this.gyro.targetX = Math.min(Math.max(e.gamma / 30, -1), 1) * 20;
            this.gyro.targetY = Math.min(Math.max((e.beta - 45) / 30, -1), 1) * 20;
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
        const val = (Math.random() * 120 + 80) | 0;
        buffer[i] = (255 << 24) | (val << 16) | (val << 8) | val;
      }
      nCtx.putImageData(imgData, 0, 0);
    }

    loadIsologos() {
      this.isologos = {
        core: new Image(),
        desarrolladora: new Image(),
        inmobiliaria: new Image(),
        cade: new Image(),
        maquinaria: new Image()
      };

      this.isologos.core.src = 'assets/node-core.svg';
      this.isologos.desarrolladora.src = 'assets/node-desarrolladora.svg';
      this.isologos.inmobiliaria.src = 'assets/node-inmobiliaria.svg';
      this.isologos.cade.src = 'assets/node-cade.svg';
      this.isologos.maquinaria.src = 'assets/node-maquinaria.svg';
    }

    setupNodes() {
      this.nodes = [
        {
          index: 0,
          isCore: true,
          key: 'core',
          radius: 62,
          innerRatio: 0.65,
          accentColor: '#EEB623',
          glowColor: 'rgba(238, 182, 35, 0.4)',
          zDist: 1.2,
          relX: 0,
          relY: 0
        },
        {
          index: 1,
          isCore: false,
          key: 'desarrolladora',
          radius: 48,
          innerRatio: 0.62,
          accentColor: '#D4AF37',
          glowColor: 'rgba(212, 175, 55, 0.35)',
          zDist: 0.95,
          angle: -135,
          dist: 180
        },
        {
          index: 2,
          isCore: false,
          key: 'inmobiliaria',
          radius: 48,
          innerRatio: 0.62,
          accentColor: '#C89A4A',
          glowColor: 'rgba(200, 154, 74, 0.35)',
          zDist: 0.92,
          angle: -45,
          dist: 180
        },
        {
          index: 3,
          isCore: false,
          key: 'cade',
          radius: 48,
          innerRatio: 0.62,
          accentColor: '#4E8752',
          glowColor: 'rgba(78, 135, 82, 0.4)',
          zDist: 1.05,
          angle: 45,
          dist: 180
        },
        {
          index: 4,
          isCore: false,
          key: 'maquinaria',
          radius: 48,
          innerRatio: 0.62,
          accentColor: '#E6953B',
          glowColor: 'rgba(230, 149, 59, 0.4)',
          zDist: 0.90,
          angle: 135,
          dist: 180
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

      const rad = isMobile ? Math.min(this.width * 0.38, 145) : isTablet ? 190 : Math.min(this.width * 0.22, 230);

      this.nodes.forEach(node => {
        if (node.isCore) {
          node.baseX = this.width / 2;
          node.baseY = this.height / 2;
          node.radius = isMobile ? 52 : 62;
        } else {
          node.radius = isMobile ? 40 : 48;
          const r = (node.angle * Math.PI) / 180;
          node.baseX = this.width / 2 + Math.cos(r) * rad;
          node.baseY = this.height / 2 + Math.sin(r) * (isMobile ? rad * 1.15 : rad);
        }
      });
    }

    handleMouseMove(e) {
      this.mouse.targetX = ((e.clientX - this.width / 2) / (this.width / 2)) * 22;
      this.mouse.targetY = ((e.clientY - this.height / 2) / (this.height / 2)) * 22;
    }

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

    getAntigravityPos(node, currentTime) {
      const speed = 0.52;
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

      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.06;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.06;
      this.gyro.x += (this.gyro.targetX - this.gyro.x) * 0.06;
      this.gyro.y += (this.gyro.targetY - this.gyro.y) * 0.06;

      if (elapsed > 1.2 && parseFloat(this.skipBtn.style.opacity) < 1) {
        this.skipBtn.style.opacity = '1';
      }

      this.ctx.clearRect(0, 0, this.width, this.height);

      // 1. Draw Blueprint Background
      this.drawBlueprintBackground(elapsed);

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

      // 3. Draw Clean Architectural Blueprint Leader Lines
      if (coreNode.currentScale > 0.1) {
        for (let i = 1; i < calculatedNodes.length; i++) {
          const sat = calculatedNodes[i];
          if (sat.currentScale > 0.05) {
            this.drawBlueprintConduit(coreNode, sat, elapsed);
          }
        }
      }

      // 4. Render 5 Clean Circular Nodes with Centered Isologos
      const sorted = [...calculatedNodes].sort((a, b) => a.zDist - b.zDist);
      sorted.forEach(node => {
        if (node.currentScale > 0.01) {
          this.drawCircularIsologoNode(node, elapsed);
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

    drawBlueprintBackground(time) {
      const cx = this.width / 2;
      const cy = this.height / 2;

      this.ctx.save();

      // Base Blueprint Canvas: Warm Stone / White Paper (#FAF8F5)
      this.ctx.fillStyle = '#FAF8F5';
      this.ctx.fillRect(0, 0, this.width, this.height);

      // Fine Drafting Grid Lines
      this.ctx.strokeStyle = 'rgba(216, 195, 157, 0.22)';
      this.ctx.lineWidth = 0.6;
      const gridSize = 45;

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

      // Concentric CAD Drafting Radius Rings
      const rings = [100, 190, 290];
      rings.forEach((r, idx) => {
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
        this.ctx.strokeStyle = idx === 1 ? 'rgba(200, 154, 74, 0.35)' : 'rgba(216, 195, 157, 0.25)';
        this.ctx.setLineDash(idx === 1 ? [4, 6] : []);
        this.ctx.lineWidth = idx === 1 ? 1 : 0.7;
        this.ctx.stroke();
        this.ctx.setLineDash([]);
      });

      // Rotating Technical Compass Markers
      this.ctx.save();
      this.ctx.translate(cx, cy);
      this.ctx.rotate(time * 0.05);
      this.ctx.strokeStyle = 'rgba(200, 154, 74, 0.4)';
      this.ctx.lineWidth = 1;
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
        const x1 = Math.cos(a) * 184;
        const y1 = Math.sin(a) * 184;
        const x2 = Math.cos(a) * 196;
        const y2 = Math.sin(a) * 196;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
      }
      this.ctx.restore();

      // Precision CAD Crosshairs
      this.ctx.strokeStyle = 'rgba(200, 154, 74, 0.5)';
      this.ctx.lineWidth = 1;
      const crosshairs = [
        { x: cx, y: cy },
        { x: cx - 190, y: cy },
        { x: cx + 190, y: cy },
        { x: cx, y: cy - 190 },
        { x: cx, y: cy + 190 }
      ];
      crosshairs.forEach(ch => {
        this.ctx.beginPath();
        this.ctx.moveTo(ch.x - 5, ch.y);
        this.ctx.lineTo(ch.x + 5, ch.y);
        this.ctx.moveTo(ch.x, ch.y - 5);
        this.ctx.lineTo(ch.x, ch.y + 5);
        this.ctx.stroke();
      });

      this.ctx.restore();
    }

    drawBlueprintConduit(core, sat, time) {
      const alpha = Math.min(core.currentScale, sat.currentScale) * 0.65;
      
      this.ctx.save();

      this.ctx.beginPath();
      this.ctx.moveTo(core.currentX, core.currentY);
      this.ctx.lineTo(sat.currentX, sat.currentY);
      
      const grad = this.ctx.createLinearGradient(core.currentX, core.currentY, sat.currentX, sat.currentY);
      grad.addColorStop(0, `rgba(238, 182, 35, ${alpha * 0.9})`);
      grad.addColorStop(0.5, `rgba(200, 154, 74, ${alpha * 0.7})`);
      grad.addColorStop(1, `${sat.glowColor.replace('0.35', (alpha * 0.6).toString()).replace('0.4', (alpha * 0.6).toString())}`);
      
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 1.6;
      this.ctx.stroke();

      // Traveling High-Speed Energy Pulse
      const pulseT = ((time * 0.8 + sat.index * 0.25) % 1.0);
      const px = core.currentX + (sat.currentX - core.currentX) * pulseT;
      const py = core.currentY + (sat.currentY - core.currentY) * pulseT;

      this.ctx.beginPath();
      this.ctx.arc(px, py, 3, 0, Math.PI * 2);
      this.ctx.fillStyle = '#EEB623';
      this.ctx.shadowColor = 'rgba(238, 182, 35, 0.8)';
      this.ctx.shadowBlur = 8;
      this.ctx.fill();

      this.ctx.restore();
    }

    drawCircularIsologoNode(node, time) {
      const { currentX: x, currentY: y, currentScale: scale, radius: baseR, isCore, key, accentColor, glowColor, zDist, innerRatio } = node;
      const r = baseR * scale * (0.88 + zDist * 0.12);

      this.ctx.save();

      // 1. Soft Outer Gold/Color Aura
      const auraGrad = this.ctx.createRadialGradient(x, y, r * 0.5, x, y, r * 1.8);
      auraGrad.addColorStop(0, glowColor);
      auraGrad.addColorStop(0.5, glowColor.replace(/[\d.]+\)$/, '0.1)'));
      auraGrad.addColorStop(1, 'rgba(0,0,0,0)');
      this.ctx.fillStyle = auraGrad;
      this.ctx.beginPath();
      this.ctx.arc(x, y, r * 1.8, 0, Math.PI * 2);
      this.ctx.fill();

      // 2. High-Contrast Dark Metallic Circular Body
      const sphereGrad = this.ctx.createRadialGradient(
        x - r * 0.3, y - r * 0.3, r * 0.08,
        x, y, r
      );
      if (isCore) {
        sphereGrad.addColorStop(0, '#2E2527');
        sphereGrad.addColorStop(0.4, '#1C1517');
        sphereGrad.addColorStop(1, '#0C090A');
      } else {
        sphereGrad.addColorStop(0, '#2A2224');
        sphereGrad.addColorStop(0.4, '#181214');
        sphereGrad.addColorStop(1, '#0A0809');
      }

      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, Math.PI * 2);
      this.ctx.fillStyle = sphereGrad;
      this.ctx.shadowColor = 'rgba(0,0,0,0.15)';
      this.ctx.shadowBlur = 14;
      this.ctx.fill();

      // 3. Polished 24k Gold Bezel Rim Light
      this.ctx.strokeStyle = isCore ? 'rgba(238, 182, 35, 0.95)' : 'rgba(200, 154, 74, 0.7)';
      this.ctx.lineWidth = isCore ? 2.5 : 1.6;
      this.ctx.stroke();

      // 4. Inner Concentric Drafting Inset Ring
      this.ctx.beginPath();
      this.ctx.arc(x, y, r * 0.88, 0, Math.PI * 2);
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      this.ctx.lineWidth = 0.8;
      this.ctx.stroke();

      // 5. Draw Pristine 1:1 Isologo Strictly Centered Inside Circle
      const isologoImg = this.isologos[key];
      if (isologoImg && isologoImg.complete && scale > 0.15) {
        const iconSize = r * 2 * innerRatio;

        this.ctx.save();
        this.ctx.shadowColor = isCore ? 'rgba(238, 182, 35, 0.5)' : 'rgba(0,0,0,0.4)';
        this.ctx.shadowBlur = 6;
        this.ctx.drawImage(
          isologoImg,
          x - iconSize / 2,
          y - iconSize / 2,
          iconSize,
          iconSize
        );
        this.ctx.restore();
      }

      this.ctx.restore();
    }

    dismiss() {
      if (this.isDismissed) return;
      this.isDismissed = true;

      this.container.style.opacity = '0';
      this.container.style.pointerEvents = 'none';

      // Unlock body scroll
      if (document.body) {
        document.body.style.overflow = '';
      }

      setTimeout(() => {
        if (this.container && this.container.parentNode) {
          this.container.parentNode.removeChild(this.container);
        }
      }, 1300);
    }
  }

  window.playAruzIntro = function() {
    window.AruzIntroInstance = new AruzBlueprintIntro();
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

  // Execute immediately to prevent any flash of page content
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', launchIntro);
  } else {
    launchIntro();
  }
})();
