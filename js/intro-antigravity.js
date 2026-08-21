/**
 * ARUZ CORE 360 - CINEMATIC ANTIGRAVITY INTRO ENGINE
 * Native Mobile & Desktop Interactive Motion Graphics
 *
 * Implements:
 * 1. Antigravity Harmonic Position Floating by Index
 * 2. Elastic Pop Damped Spring Reveal
 * 3. 3D Depth of Field & Motion Blur Shader Emulation
 * 4. 2% Monochromatic Cinema Film Grain
 * 5. CC Radial Fast Blur Glow Dissolve at 6.5s
 * 6. Smooth Background Resource Preloading
 */

(function () {
  'use strict';

  // Check if intro has already run in this session (optional, allow replay or param ?intro=1)
  const urlParams = new URLSearchParams(window.location.search);
  const forceIntro = urlParams.get('intro') === '1';
  const introSeen = sessionStorage.getItem('aruz_intro_seen');

  // If already seen and not forced on root index, allow quick skip or run once per session
  // Default: Run on index.html, provide skip button always
  if (introSeen && !forceIntro && window.location.pathname.includes('landings/')) {
    return;
  }

  // Preload critical assets while intro is playing
  function preloadSiteAssets() {
    const assets = [
      'assets/logo.svg',
      'assets/logo-desarrolladora.svg',
      'assets/logo-inmobiliaria.svg',
      'assets/logo-cade.svg',
      'assets/logo-maquinaria.svg',
      'assets/holding-aruz.png'
    ];
    assets.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  class AruzAntigravityIntro {
    constructor() {
      this.startTime = null;
      this.totalDuration = 7.8; // seconds
      this.fadeStart = 6.5;    // seconds
      this.fadeDuration = 1.3; // seconds
      this.isDismissed = false;
      this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
      this.gyro = { x: 0, y: 0 };
      
      this.init();
    }

    init() {
      // 1. Create Overlay DOM Container
      this.container = document.createElement('div');
      this.container.id = 'aruz-intro-overlay';
      this.container.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 999999;
        background: #0D0A0B;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        touch-action: none;
        user-select: none;
        transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), visibility 1.2s;
      `;

      // 2. Canvas Layer for 3D Spheres & Particle Conduits
      this.canvas = document.createElement('canvas');
      this.canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
      this.ctx = this.canvas.getContext('2d');
      this.container.appendChild(this.canvas);

      // 3. Film Grain / Noise Overlay (2% Monochromatic Cinema Noise)
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

      // 4. Glow / Radial Blur Flare Element (The Glow at 6.5s)
      this.glowLayer = document.createElement('div');
      this.glowLayer.id = 'aruz-glow-flash';
      this.glowLayer.style.cssText = `
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, rgba(230,192,123,0.95) 0%, rgba(200,154,74,0.6) 30%, rgba(13,10,11,0) 70%);
        opacity: 0;
        pointer-events: none;
        mix-blend-mode: screen;
        transition: opacity 0.8s ease-out;
      `;
      this.container.appendChild(this.glowLayer);

      // 5. Skip Button
      this.skipBtn = document.createElement('button');
      this.skipBtn.innerHTML = `
        <span>Saltar Intro</span>
        <svg style="width:14px;height:14px;fill:currentColor;margin-left:6px;" viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>
      `;
      this.skipBtn.style.cssText = `
        position: absolute;
        top: 24px;
        right: 24px;
        z-index: 10;
        background: rgba(255,255,255,0.08);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(230,192,123,0.3);
        color: #E6C07B;
        font-family: 'Montserrat', sans-serif;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        padding: 8px 16px;
        border-radius: 999px;
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        opacity: 0;
      `;
      this.skipBtn.addEventListener('mouseenter', () => {
        this.skipBtn.style.background = 'rgba(230,192,123,0.2)';
        this.skipBtn.style.borderColor = 'rgba(230,192,123,0.8)';
        this.skipBtn.style.transform = 'scale(1.05)';
      });
      this.skipBtn.addEventListener('mouseleave', () => {
        this.skipBtn.style.background = 'rgba(255,255,255,0.08)';
        this.skipBtn.style.borderColor = 'rgba(230,192,123,0.3)';
        this.skipBtn.style.transform = 'scale(1)';
      });
      this.skipBtn.addEventListener('click', () => this.dismiss());
      this.container.appendChild(this.skipBtn);

      // 6. Subtitle / Brand Tagline
      this.tagline = document.createElement('div');
      this.tagline.style.cssText = `
        position: absolute;
        bottom: 40px;
        left: 0;
        right: 0;
        text-align: center;
        color: rgba(244,240,234,0.6);
        font-family: 'Montserrat', sans-serif;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 3px;
        text-transform: uppercase;
        opacity: 0;
        transition: opacity 1s ease;
        pointer-events: none;
      `;
      this.tagline.textContent = 'Ecosistema Inmobiliario & Constructivo 360';
      this.container.appendChild(this.tagline);

      // Mount to body
      document.body.appendChild(this.container);
      document.body.style.overflow = 'hidden';

      // Setup Node Entities (Index 0 = ARUZ Core, 1..4 = Divisions)
      this.setupNodes();

      // Resize & Event Listeners
      this.handleResize();
      window.addEventListener('resize', () => this.handleResize());
      window.addEventListener('mousemove', (e) => this.handleMouseMove(e));

      // Device Gyroscope Support (Mobile Native Antigravity)
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
          if (e.gamma !== null && e.beta !== null) {
            this.gyro.x = Math.min(Math.max(e.gamma / 30, -1), 1) * 20;
            this.gyro.y = Math.min(Math.max((e.beta - 45) / 30, -1), 1) * 20;
          }
        }, true);
      }

      // Preload site assets in background
      preloadSiteAssets();

      // Start RequestAnimationFrame Render Loop
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

    setupNodes() {
      // 5 Ecosystem Spheres (Core + 4 Verticals)
      this.nodes = [
        {
          index: 0, // Central Core
          name: 'ARUZ',
          subtitle: 'CORE HOLDING',
          color: '#E6C07B', // Dorado
          glowColor: 'rgba(230, 192, 123, 0.4)',
          radius: 54,
          zDist: 1.25, // Foreground (closer in 3D camera)
          relX: 0,
          relY: 0
        },
        {
          index: 1, // Desarrolladora (Top Left)
          name: 'DESARROLLADORA',
          subtitle: 'ARQUITECTURA',
          color: '#D4AF37',
          glowColor: 'rgba(212, 175, 55, 0.3)',
          radius: 40,
          zDist: 0.95,
          angle: -135,
          dist: 170
        },
        {
          index: 2, // Inmobiliaria (Top Right)
          name: 'INMOBILIARIA',
          subtitle: 'PORTAFOLIO & ROI',
          color: '#C89A4A',
          glowColor: 'rgba(200, 154, 74, 0.3)',
          radius: 40,
          zDist: 0.9,
          angle: -45,
          dist: 170
        },
        {
          index: 3, // CADE (Bottom Right)
          name: 'CADE',
          subtitle: 'CONSTRUCCIÓN',
          color: '#4E8752', // Verde Manglar
          glowColor: 'rgba(78, 135, 82, 0.35)',
          radius: 42,
          zDist: 1.05,
          angle: 45,
          dist: 175
        },
        {
          index: 4, // Maquinaria (Bottom Left)
          name: 'MAQUINARIA',
          subtitle: 'FLOTA PESADA',
          color: '#E6953B', // Ambar Maquinaria
          glowColor: 'rgba(230, 149, 59, 0.35)',
          radius: 40,
          zDist: 0.88,
          angle: 135,
          dist: 175
        }
      ];
    }

    handleResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width * window.devicePixelRatio;
      this.canvas.height = this.height * window.devicePixelRatio;
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      // Responsive Orbital Distance Scaling
      const isMobile = this.width < 768;
      const baseDist = isMobile ? Math.min(this.width * 0.38, 140) : Math.min(this.width * 0.22, 210);

      this.nodes.forEach(node => {
        if (node.index === 0) {
          node.baseX = this.width / 2;
          node.baseY = this.height / 2 - (isMobile ? 15 : 10);
        } else {
          const rad = (node.angle * Math.PI) / 180;
          const currentDist = baseDist * (node.dist / 170);
          node.baseX = this.width / 2 + Math.cos(rad) * currentDist;
          node.baseY = (this.height / 2 - (isMobile ? 15 : 10)) + Math.sin(rad) * (isMobile ? currentDist * 1.15 : currentDist);
        }
      });
    }

    handleMouseMove(e) {
      this.mouse.targetX = (e.clientX - this.width / 2) / (this.width / 2) * 25;
      this.mouse.targetY = (e.clientY - this.height / 2) / (this.height / 2) * 25;
    }

    /**
     * Damped Elastic Pop Calculation
     * From user formula: val = a * Math.pow(2, -10 * s) * Math.sin((s - p / 4) * (2 * Math.PI) / p) + 1;
     */
    getElasticScale(nodeIndex, currentTime) {
      const delay = (nodeIndex === 0 ? 0 : nodeIndex) * 0.22;
      const startTime = 0.9 + delay;
      const duration = 0.85;

      if (currentTime < startTime) {
        return 0;
      }
      const t = currentTime - startTime;
      if (t < duration) {
        const s = t / duration;
        const p = 0.32; // Elastic period
        const a = 1.0;  // Amplitude
        const val = a * Math.pow(2, -10 * s) * Math.sin((s - p / 4) * (2 * Math.PI) / p) + 1;
        return Math.max(0, val);
      }
      return 1.0;
    }

    /**
     * Antigravity Position Physics
     * From user formula:
     * seed = index * 123.45;
     * x = value[0] + Math.sin(time * speed + seed) * amp + Math.cos(time * 0.3 + seed) * drift;
     * y = value[1] + Math.cos(time * speed * 0.8 + seed) * (amp * 1.2);
     */
    getAntigravityPos(node, currentTime) {
      const speed = 0.65;
      const amp = 14;
      const drift = 9;
      const seed = node.index * 123.45;

      // Physics harmonic displacement
      const physX = Math.sin(currentTime * speed + seed) * amp + Math.cos(currentTime * 0.3 + seed) * drift;
      const physY = Math.cos(currentTime * speed * 0.8 + seed) * (amp * 1.25);

      // Camera parallax & gyroscope influence
      const cameraX = (this.mouse.x + this.gyro.x) * (node.zDist * 0.8);
      const cameraY = (this.mouse.y + this.gyro.y) * (node.zDist * 0.8);

      return {
        x: node.baseX + physX + cameraX,
        y: node.baseY + physY + cameraY
      };
    }

    render(timestamp) {
      if (this.isDismissed) return;

      if (!this.startTime) this.startTime = timestamp;
      const elapsed = (timestamp - this.startTime) / 1000; // seconds

      // Smooth mouse interpolation
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

      // Show Skip button after 1.5s
      if (elapsed > 1.2 && parseFloat(this.skipBtn.style.opacity) < 1) {
        this.skipBtn.style.opacity = '1';
        this.tagline.style.opacity = '0.8';
      }

      // Clear Canvas
      this.ctx.clearRect(0, 0, this.width, this.height);

      // Background Ambient Grid & Radial Dark Glow
      const bgGrad = this.ctx.createRadialGradient(
        this.width / 2, this.height / 2, 50,
        this.width / 2, this.height / 2, Math.max(this.width, this.height) * 0.75
      );
      bgGrad.addColorStop(0, '#1E1719');
      bgGrad.addColorStop(0.5, '#120D0F');
      bgGrad.addColorStop(1, '#080607');
      this.ctx.fillStyle = bgGrad;
      this.ctx.fillRect(0, 0, this.width, this.height);

      // Calculate Current Positions & Scales
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

      // Draw Energy Conduits / Particle Laser Connectors
      if (coreNode.currentScale > 0.1) {
        for (let i = 1; i < calculatedNodes.length; i++) {
          const sat = calculatedNodes[i];
          if (sat.currentScale > 0.05) {
            this.drawEnergyConnector(coreNode, sat, elapsed);
          }
        }
      }

      // Sort by Z-Distance for 3D Camera Depth of Field Ordering
      const sorted = [...calculatedNodes].sort((a, b) => a.zDist - b.zDist);

      // Render Spheres
      sorted.forEach(node => {
        if (node.currentScale > 0.01) {
          this.drawSphere(node, elapsed);
        }
      });

      // Handle "The Glow" Burst & Fade Out at 6.5s
      if (elapsed >= this.fadeStart) {
        const fadeProgress = Math.min((elapsed - this.fadeStart) / this.fadeDuration, 1.0);

        // Animate Glow Flash (Radial Light Dissolve)
        const glowOpacity = Math.sin(fadeProgress * Math.PI) * 0.95;
        this.glowLayer.style.opacity = glowOpacity.toString();

        // Master Opacity Fade
        this.container.style.opacity = (1.0 - fadeProgress).toString();

        if (fadeProgress >= 1.0) {
          this.dismiss();
          return;
        }
      }

      requestAnimationFrame((t) => this.render(t));
    }

    drawEnergyConnector(core, sat, time) {
      const alpha = Math.min(core.currentScale, sat.currentScale) * 0.35;
      
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.moveTo(core.currentX, core.currentY);
      this.ctx.lineTo(sat.currentX, sat.currentY);
      
      // Laser gradient
      const grad = this.ctx.createLinearGradient(core.currentX, core.currentY, sat.currentX, sat.currentY);
      grad.addColorStop(0, `rgba(230, 192, 123, ${alpha * 0.8})`);
      grad.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.9})`);
      grad.addColorStop(1, `${sat.glowColor.replace('0.3', (alpha * 0.6).toString())}`);
      
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();

      // Traveling Energy Photon Pulse
      const pulseT = ((time * 0.8 + sat.index * 0.25) % 1.0);
      const px = core.currentX + (sat.currentX - core.currentX) * pulseT;
      const py = core.currentY + (sat.currentY - core.currentY) * pulseT;

      this.ctx.beginPath();
      this.ctx.arc(px, py, 3, 0, Math.PI * 2);
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.shadowColor = '#E6C07B';
      this.ctx.shadowBlur = 10;
      this.ctx.fill();

      this.ctx.restore();
    }

    drawSphere(node, time) {
      const { currentX: x, currentY: y, currentScale: scale, radius, color, glowColor, zDist, index } = node;
      const isCore = index === 0;
      const r = radius * scale * (0.85 + zDist * 0.15);

      this.ctx.save();

      // 3D Depth of Field Lens Blur Simulation
      if (zDist < 1.0) {
        this.ctx.filter = `blur(${Math.max(0, (1.0 - zDist) * 3)}px)`;
      }

      // Outer Aura Glow
      const glowGrad = this.ctx.createRadialGradient(x, y, r * 0.5, x, y, r * 2.2);
      glowGrad.addColorStop(0, glowColor);
      glowGrad.addColorStop(0.5, glowColor.replace(/[\d.]+\)$/, '0.12)'));
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      this.ctx.fillStyle = glowGrad;
      this.ctx.beginPath();
      this.ctx.arc(x, y, r * 2.2, 0, Math.PI * 2);
      this.ctx.fill();

      // Sphere Body (Monolithic 3D Metallic Gradient)
      const sphereGrad = this.ctx.createRadialGradient(
        x - r * 0.35, y - r * 0.35, r * 0.1,
        x, y, r
      );
      if (isCore) {
        sphereGrad.addColorStop(0, '#FFF6E0');
        sphereGrad.addColorStop(0.25, '#E6C07B');
        sphereGrad.addColorStop(0.7, '#96702D');
        sphereGrad.addColorStop(1, '#2E1F0B');
      } else {
        sphereGrad.addColorStop(0, '#FFFFFF');
        sphereGrad.addColorStop(0.3, color);
        sphereGrad.addColorStop(0.75, '#2A2022');
        sphereGrad.addColorStop(1, '#0F0B0C');
      }

      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, Math.PI * 2);
      this.ctx.fillStyle = sphereGrad;
      this.ctx.shadowColor = glowColor;
      this.ctx.shadowBlur = isCore ? 25 : 15;
      this.ctx.fill();

      // Rim Light Border
      this.ctx.strokeStyle = isCore ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)';
      this.ctx.lineWidth = isCore ? 2 : 1;
      this.ctx.stroke();

      // Orbital Ring for Core
      if (isCore) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(time * 0.4);
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, r * 1.5, r * 0.55, 0, 0, Math.PI * 2);
        this.ctx.strokeStyle = 'rgba(230, 192, 123, 0.4)';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        this.ctx.restore();
      }

      // Typography Inside/Beside Sphere
      if (scale > 0.45) {
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        if (isCore) {
          // Core ARUZ Brand
          this.ctx.font = `bold ${Math.round(18 * scale)}px 'Montserrat', sans-serif`;
          this.ctx.fillStyle = '#0D0A0B';
          this.ctx.shadowColor = 'transparent';
          this.ctx.fillText('ARUZ', x, y - 4 * scale);

          this.ctx.font = `600 ${Math.round(8 * scale)}px 'Montserrat', sans-serif`;
          this.ctx.fillStyle = '#5A421C';
          this.ctx.letterSpacing = '1px';
          this.ctx.fillText('HOLDING', x, y + 10 * scale);
        } else {
          // Division Label
          this.ctx.font = `bold ${Math.round(11 * scale)}px 'Montserrat', sans-serif`;
          this.ctx.fillStyle = '#FFFFFF';
          this.ctx.shadowColor = 'rgba(0,0,0,0.8)';
          this.ctx.shadowBlur = 6;
          this.ctx.fillText(node.name, x, y - 2 * scale);

          this.ctx.font = `500 ${Math.round(7.5 * scale)}px 'Montserrat', sans-serif`;
          this.ctx.fillStyle = 'rgba(230, 192, 123, 0.9)';
          this.ctx.fillText(node.subtitle, x, y + 10 * scale);
        }
      }

      this.ctx.restore();
    }

    dismiss() {
      if (this.isDismissed) return;
      this.isDismissed = true;

      // Set session flag
      sessionStorage.setItem('aruz_intro_seen', 'true');

      // Trigger entrance transition on main body
      this.container.style.opacity = '0';
      this.container.style.pointerEvents = 'none';

      setTimeout(() => {
        if (this.container && this.container.parentNode) {
          this.container.parentNode.removeChild(this.container);
        }
        document.body.style.overflow = '';
      }, 1200);
    }
  }

  // Auto-launch on DOM Content Loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.AruzIntroInstance = new AruzAntigravityIntro();
    });
  } else {
    window.AruzIntroInstance = new AruzAntigravityIntro();
  }
})();
