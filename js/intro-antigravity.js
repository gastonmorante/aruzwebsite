/**
 * ARUZ CORE 360 - CINEMATIC ANTIGRAVITY INTRO ENGINE (PRO VERSION)
 * Ultra-Smooth Native Mobile, Tablet & Desktop Motion Graphics
 *
 * Upgrades:
 * 1. Official High-Definition Vector Logos rendered inside 3D Spheres
 * 2. Ultra-Smooth Harmonic Antigravity Physics with Cubic Hermite Smoothing
 * 3. Softened Damped Spring Reveal (Critically Damped, Zero Jitter)
 * 4. Multi-Layered Specular 3D Lighting, Fresnel Rims & Ambient Coronas
 * 5. Monochromatic 2% Cinema Film Grain
 * 6. "The Glow" Radial Fast Blur Dissolve at 6.5s
 */

(function () {
  'use strict';

  class AruzAntigravityIntro {
    constructor() {
      this.startTime = null;
      this.totalDuration = 7.8; // seconds
      this.fadeStart = 6.5;    // seconds
      this.fadeDuration = 1.3; // seconds
      this.isDismissed = false;
      this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
      this.gyro = { x: 0, y: 0, targetX: 0, targetY: 0 };
      
      this.init();
    }

    init() {
      // Remove any existing overlay if restarting
      const existing = document.getElementById('aruz-intro-overlay');
      if (existing && existing.parentNode) {
        existing.parentNode.removeChild(existing);
      }

      // 1. Create Overlay DOM Container
      this.container = document.createElement('div');
      this.container.id = 'aruz-intro-overlay';
      this.container.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 999999;
        background: #0B0809;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        touch-action: none;
        user-select: none;
        opacity: 1;
        transition: opacity 1.3s cubic-bezier(0.16, 1, 0.3, 1), visibility 1.3s;
      `;

      // 2. Canvas Layer for 3D Spheres, Logos & Particle Conduits
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
        background: radial-gradient(circle at center, rgba(247,212,143,0.95) 0%, rgba(200,154,74,0.65) 35%, rgba(11,8,9,0) 75%);
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
        background: rgba(255,255,255,0.06);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(230,192,123,0.35);
        color: #E6C07B;
        font-family: 'Montserrat', sans-serif;
        font-size: 10.5px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        padding: 8px 16px;
        border-radius: 999px;
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        opacity: 0;
      `;
      this.skipBtn.addEventListener('mouseenter', () => {
        this.skipBtn.style.background = 'rgba(230,192,123,0.2)';
        this.skipBtn.style.borderColor = 'rgba(230,192,123,0.85)';
        this.skipBtn.style.transform = 'scale(1.05)';
      });
      this.skipBtn.addEventListener('mouseleave', () => {
        this.skipBtn.style.background = 'rgba(255,255,255,0.06)';
        this.skipBtn.style.borderColor = 'rgba(230,192,123,0.35)';
        this.skipBtn.style.transform = 'scale(1)';
      });
      this.skipBtn.addEventListener('click', () => this.dismiss());
      this.container.appendChild(this.skipBtn);

      // 6. Subtitle / Brand Tagline
      this.tagline = document.createElement('div');
      this.tagline.style.cssText = `
        position: absolute;
        bottom: 35px;
        left: 0;
        right: 0;
        text-align: center;
        color: rgba(230,192,123,0.65);
        font-family: 'Montserrat', sans-serif;
        font-size: 9.5px;
        font-weight: 600;
        letter-spacing: 3.5px;
        text-transform: uppercase;
        opacity: 0;
        transition: opacity 1.2s ease;
        pointer-events: none;
      `;
      this.tagline.textContent = 'Ecosistema Inmobiliario & Constructivo 360';
      this.container.appendChild(this.tagline);

      // Mount to body
      document.body.appendChild(this.container);
      document.body.style.overflow = 'hidden';

      // Load Official Vector Logos for all 5 Spheres
      this.loadLogos();

      // Setup Node Entities
      this.setupNodes();

      // Resize & Event Listeners
      this.handleResize();
      window.addEventListener('resize', () => this.handleResize());
      window.addEventListener('mousemove', (e) => this.handleMouseMove(e));

      // Device Gyroscope Support (Mobile Native Antigravity Tilt)
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
          if (e.gamma !== null && e.beta !== null) {
            this.gyro.targetX = Math.min(Math.max(e.gamma / 30, -1), 1) * 25;
            this.gyro.targetY = Math.min(Math.max((e.beta - 45) / 30, -1), 1) * 25;
          }
        }, true);
      }

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
      this.nodes = [
        {
          index: 0, // Central Core (ARUZ Holding)
          logoKey: 'core',
          color: '#E6C07B',
          glowColor: 'rgba(230, 192, 123, 0.55)',
          radius: 65,
          logoWidth: 88,
          logoHeight: 31,
          zDist: 1.25,
          relX: 0,
          relY: 0
        },
        {
          index: 1, // Desarrolladora (Top Left)
          logoKey: 'desarrolladora',
          color: '#D4AF37',
          glowColor: 'rgba(212, 175, 55, 0.45)',
          radius: 52,
          logoWidth: 78,
          logoHeight: 25,
          zDist: 0.95,
          angle: -135,
          dist: 175
        },
        {
          index: 2, // Inmobiliaria (Top Right)
          logoKey: 'inmobiliaria',
          color: '#C89A4A',
          glowColor: 'rgba(200, 154, 74, 0.45)',
          radius: 52,
          logoWidth: 80,
          logoHeight: 28,
          zDist: 0.90,
          angle: -45,
          dist: 175
        },
        {
          index: 3, // CADE (Bottom Right)
          logoKey: 'cade',
          color: '#4E8752', // Verde Manglar
          glowColor: 'rgba(78, 135, 82, 0.5)',
          radius: 54,
          logoWidth: 84,
          logoHeight: 21,
          zDist: 1.05,
          angle: 45,
          dist: 180
        },
        {
          index: 4, // Maquinaria (Bottom Left)
          logoKey: 'maquinaria',
          color: '#E6953B', // Ambar Maquinaria
          glowColor: 'rgba(230, 149, 59, 0.5)',
          radius: 52,
          logoWidth: 82,
          logoHeight: 27,
          zDist: 0.88,
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

      // Smooth Responsive Layout
      const isMobile = this.width < 768;
      const baseDist = isMobile ? Math.min(this.width * 0.40, 150) : Math.min(this.width * 0.23, 220);

      this.nodes.forEach(node => {
        if (node.index === 0) {
          node.baseX = this.width / 2;
          node.baseY = this.height / 2 - (isMobile ? 18 : 10);
        } else {
          const rad = (node.angle * Math.PI) / 180;
          const currentDist = baseDist * (node.dist / 175);
          node.baseX = this.width / 2 + Math.cos(rad) * currentDist;
          node.baseY = (this.height / 2 - (isMobile ? 18 : 10)) + Math.sin(rad) * (isMobile ? currentDist * 1.18 : currentDist);
        }
      });
    }

    handleMouseMove(e) {
      this.mouse.targetX = ((e.clientX - this.width / 2) / (this.width / 2)) * 28;
      this.mouse.targetY = ((e.clientY - this.height / 2) / (this.height / 2)) * 28;
    }

    /**
     * Ultra-Smooth Damped Elastic Spring Reveal
     * Critically softened to eliminate harsh jerking
     */
    getElasticScale(nodeIndex, currentTime) {
      const delay = (nodeIndex === 0 ? 0 : nodeIndex) * 0.24;
      const startTime = 0.95 + delay;
      const duration = 0.95;

      if (currentTime < startTime) {
        return 0;
      }
      const t = currentTime - startTime;
      if (t < duration) {
        const s = t / duration;
        // Softened spring physics
        const p = 0.36;
        const a = 0.85;
        const decay = Math.pow(2, -9 * s);
        const val = a * decay * Math.sin((s - p / 4) * (2 * Math.PI) / p) + 1;
        return Math.max(0, val);
      }
      return 1.0;
    }

    /**
     * Smooth Continuous Antigravity Harmonic Motion
     */
    getAntigravityPos(node, currentTime) {
      const speed = 0.55; // Silky smooth speed
      const amp = 13;     // Amplitude
      const drift = 8;    // Lateral drift
      const seed = node.index * 123.45;

      // Phase-locked harmonic floating
      const physX = Math.sin(currentTime * speed + seed) * amp + Math.cos(currentTime * 0.28 + seed) * drift;
      const physY = Math.cos(currentTime * speed * 0.82 + seed) * (amp * 1.2);

      // Camera parallax & gyroscope influence with low-pass damping
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

      // Smooth lerp for mouse and gyroscope
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.065;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.065;
      this.gyro.x += (this.gyro.targetX - this.gyro.x) * 0.065;
      this.gyro.y += (this.gyro.targetY - this.gyro.y) * 0.065;

      // Show Skip button after 1.2s
      if (elapsed > 1.2 && parseFloat(this.skipBtn.style.opacity) < 1) {
        this.skipBtn.style.opacity = '1';
        this.tagline.style.opacity = '0.85';
      }

      // Clear Canvas
      this.ctx.clearRect(0, 0, this.width, this.height);

      // Background Ambient Radial Glow
      const bgGrad = this.ctx.createRadialGradient(
        this.width / 2, this.height / 2, 60,
        this.width / 2, this.height / 2, Math.max(this.width, this.height) * 0.8
      );
      bgGrad.addColorStop(0, '#1B1517');
      bgGrad.addColorStop(0.5, '#110C0E');
      bgGrad.addColorStop(1, '#070506');
      this.ctx.fillStyle = bgGrad;
      this.ctx.fillRect(0, 0, this.width, this.height);

      // Calculate Positions & Scales
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

      // Draw Energy Conduits / Laser Fibers
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

      // Render 3D Spheres with Official Vector Logos
      sorted.forEach(node => {
        if (node.currentScale > 0.01) {
          this.drawSphereWithLogo(node, elapsed);
        }
      });

      // Handle "The Glow" Burst & Dissolve at 6.5s
      if (elapsed >= this.fadeStart) {
        const fadeProgress = Math.min((elapsed - this.fadeStart) / this.fadeDuration, 1.0);

        // Smooth sinusoidal glow flare
        const glowOpacity = Math.sin(fadeProgress * Math.PI) * 0.98;
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
      const alpha = Math.min(core.currentScale, sat.currentScale) * 0.38;
      
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.moveTo(core.currentX, core.currentY);
      this.ctx.lineTo(sat.currentX, sat.currentY);
      
      const grad = this.ctx.createLinearGradient(core.currentX, core.currentY, sat.currentX, sat.currentY);
      grad.addColorStop(0, `rgba(230, 192, 123, ${alpha * 0.85})`);
      grad.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.95})`);
      grad.addColorStop(1, `${sat.glowColor.replace('0.45', (alpha * 0.7).toString()).replace('0.5', (alpha * 0.7).toString())}`);
      
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 1.6;
      this.ctx.stroke();

      // Traveling Energy Photon Pulse
      const pulseT = ((time * 0.75 + sat.index * 0.25) % 1.0);
      const px = core.currentX + (sat.currentX - core.currentX) * pulseT;
      const py = core.currentY + (sat.currentY - core.currentY) * pulseT;

      this.ctx.beginPath();
      this.ctx.arc(px, py, 3.2, 0, Math.PI * 2);
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.shadowColor = '#E6C07B';
      this.ctx.shadowBlur = 12;
      this.ctx.fill();

      this.ctx.restore();
    }

    drawSphereWithLogo(node, time) {
      const { currentX: x, currentY: y, currentScale: scale, radius, color, glowColor, zDist, index, logoKey, logoWidth, logoHeight } = node;
      const isCore = index === 0;
      const r = radius * scale * (0.88 + zDist * 0.12);

      this.ctx.save();

      // 3D Depth of Field Lens Blur Simulation on background satellites
      if (zDist < 1.0) {
        this.ctx.filter = `blur(${Math.max(0, (1.0 - zDist) * 2.2)}px)`;
      }

      // 1. Soft Volumetric Outer Glow
      const glowGrad = this.ctx.createRadialGradient(x, y, r * 0.4, x, y, r * 2.3);
      glowGrad.addColorStop(0, glowColor);
      glowGrad.addColorStop(0.4, glowColor.replace(/[\d.]+\)$/, '0.15)'));
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      this.ctx.fillStyle = glowGrad;
      this.ctx.beginPath();
      this.ctx.arc(x, y, r * 2.3, 0, Math.PI * 2);
      this.ctx.fill();

      // 2. 3D Monolithic Metallic Sphere Body
      const sphereGrad = this.ctx.createRadialGradient(
        x - r * 0.32, y - r * 0.32, r * 0.08,
        x, y, r
      );
      if (isCore) {
        sphereGrad.addColorStop(0, '#FFF9EB');
        sphereGrad.addColorStop(0.2, '#E6C07B');
        sphereGrad.addColorStop(0.65, '#8C672A');
        sphereGrad.addColorStop(1, '#231608');
      } else {
        sphereGrad.addColorStop(0, '#FFFFFF');
        sphereGrad.addColorStop(0.22, color);
        sphereGrad.addColorStop(0.70, '#261D1F');
        sphereGrad.addColorStop(1, '#0C0809');
      }

      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, Math.PI * 2);
      this.ctx.fillStyle = sphereGrad;
      this.ctx.shadowColor = glowColor;
      this.ctx.shadowBlur = isCore ? 28 : 18;
      this.ctx.fill();

      // 3. Specular Fresnel Rim Lighting
      this.ctx.strokeStyle = isCore ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.45)';
      this.ctx.lineWidth = isCore ? 2.2 : 1.2;
      this.ctx.stroke();

      // 4. Gyroscopic Orbital Ring for Core
      if (isCore) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(time * 0.35);
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, r * 1.55, r * 0.58, 0, 0, Math.PI * 2);
        this.ctx.strokeStyle = 'rgba(230, 192, 123, 0.45)';
        this.ctx.lineWidth = 1.2;
        this.ctx.stroke();
        this.ctx.restore();
      }

      // 5. Draw Official Vector Logo Inside the Sphere
      const logoImg = this.logos[logoKey];
      if (logoImg && logoImg.complete && scale > 0.15) {
        const lw = logoWidth * scale * (0.88 + zDist * 0.12);
        const lh = logoHeight * scale * (0.88 + zDist * 0.12);

        this.ctx.save();
        this.ctx.shadowColor = 'rgba(0,0,0,0.65)';
        this.ctx.shadowBlur = 8;
        this.ctx.drawImage(
          logoImg,
          x - lw / 2,
          y - lh / 2,
          lw,
          lh
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

      setTimeout(() => {
        if (this.container && this.container.parentNode) {
          this.container.parentNode.removeChild(this.container);
        }
        document.body.style.overflow = '';
      }, 1300);
    }
  }

  // Global function to trigger intro anytime
  window.playAruzIntro = function() {
    window.AruzIntroInstance = new AruzAntigravityIntro();
  };

  // Launch automatically when loading index.html or when document is ready
  function launchIntro() {
    window.playAruzIntro();

    // Attach listener to all logo links: clicking logo re-triggers the intro seamlessly!
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
