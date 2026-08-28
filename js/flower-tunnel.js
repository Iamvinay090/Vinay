/**
 * Video-Accurate 3D Watercolor Flower Portal Engine
 * 100% Floral Petal Shapes (no plain circles), distinct wide separated rings, alternating spiral rotations.
 */
class FlowerTunnel {
    constructor(overlayId, canvasId) {
        this.overlay = document.getElementById(overlayId);
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        this.isAnimating = false;
        this.progress = 0; // 0 to 1
        this.duration = 6800; // 6.8 seconds total
        this.startTime = 0;
        this.lastTime = 0;
        
        // Curated Watercolor Flower Palette
        this.flowerTypes = [
            { type: 'anemone', colors: ['#9B72CF', '#6A89CC', '#4A69BD', '#38ADA9', '#44616A'] },
            { type: 'poppy', colors: ['#E55039', '#EB2F06', '#F6B93B', '#FA983A', '#E58E26'] },
            { type: 'dahlia', colors: ['#E88B9A', '#D96B82', '#FAD0C4', '#F8C291', '#6D214F'] },
            { type: 'rose', colors: ['#F8A5C2', '#F78FB3', '#E55039', '#D96B82', '#FFEAA7'] },
            { type: 'buttercup', colors: ['#F6B93B', '#FFDD59', '#78E08F', '#A3CB38', '#E55039'] }
        ];
        
        this.rings = [];
        this.generateRings();
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.ctx.scale(dpr, dpr);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }
    
    generateRings() {
        const numRings = 9;
        this.rings = [];
        
        for (let r = 0; r < numRings; r++) {
            const count = 10 + r * 2.5;
            const flowers = [];
            
            // STRICT ALTERNATING ROTATION: Even rings (+1), Odd rings (-1)
            const rotationDirection = (r % 2 === 0) ? 1 : -1;
            const baseSpeed = 0.16 + (r * 0.012);
            
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2;
                const typeObj = this.flowerTypes[Math.floor(Math.random() * this.flowerTypes.length)];
                const mainColor = typeObj.colors[Math.floor(Math.random() * typeObj.colors.length)];
                
                flowers.push({
                    angle: angle,
                    type: typeObj.type,
                    color: mainColor,
                    secondaryColor: typeObj.colors[Math.floor(Math.random() * typeObj.colors.length)],
                    size: 38 + Math.random() * 18,
                    rotation: Math.random() * Math.PI * 2,
                    petals: 6 + Math.floor(Math.random() * 6)
                });
            }
            
            this.rings.push({
                zDepth: (r + 1) * 0.48, // Wide separation between rings
                currentAngle: Math.random() * Math.PI * 2,
                rotationSpeed: baseSpeed * rotationDirection,
                flowers: flowers
            });
        }
    }
    
    /**
     * Anemone: Teardrop petals with dark purple stamen ring
     */
    drawAnemone(ctx, radius, f) {
        const petals = 8;
        ctx.fillStyle = f.color;
        ctx.globalAlpha = 0.92;
        
        for (let i = 0; i < petals; i++) {
            const angle = (i / petals) * Math.PI * 2;
            ctx.save();
            ctx.rotate(angle);
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-radius * 0.4, radius * 0.4, -radius * 0.5, radius, 0, radius);
            ctx.bezierCurveTo(radius * 0.5, radius, radius * 0.4, radius * 0.4, 0, 0);
            ctx.fill();
            
            ctx.restore();
        }
        
        // Dark Violet Center
        ctx.fillStyle = '#1E1022';
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.32, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#4A2855';
        for (let j = 0; j < 12; j++) {
            const a = (j / 12) * Math.PI * 2;
            const rx = Math.cos(a) * (radius * 0.23);
            const ry = Math.sin(a) * (radius * 0.23);
            ctx.beginPath();
            ctx.arc(rx, ry, radius * 0.04, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.fillStyle = '#6D8B74';
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.15, 0, Math.PI * 2);
        ctx.fill();
    }

    /**
     * Rose: Scalloped overlapping petal layers
     */
    drawRose(ctx, radius, f) {
        const layers = 4;
        for (let l = layers; l >= 1; l--) {
            const r = radius * (l / layers);
            const petals = 5 + l;
            ctx.fillStyle = l % 2 === 0 ? f.color : f.secondaryColor;
            ctx.globalAlpha = 0.88;
            
            for (let i = 0; i < petals; i++) {
                const angle = (i / petals) * Math.PI * 2 + (l * 0.3);
                ctx.save();
                ctx.rotate(angle);
                
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-r * 0.5, r * 0.3, -r * 0.4, r * 0.9, 0, r);
                ctx.bezierCurveTo(r * 0.4, r * 0.9, r * 0.5, r * 0.3, 0, 0);
                ctx.fill();
                
                ctx.restore();
            }
        }
        
        ctx.fillStyle = '#FFF8E7';
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.18, 0, Math.PI * 2);
        ctx.fill();
    }

    /**
     * Poppy: Ruffled wide quadratic curve petals
     */
    drawPoppy(ctx, radius, f) {
        const petals = 5;
        ctx.fillStyle = f.color;
        ctx.globalAlpha = 0.94;
        
        for (let i = 0; i < petals; i++) {
            const angle = (i / petals) * Math.PI * 2;
            ctx.save();
            ctx.rotate(angle);
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(-radius * 0.7, radius * 0.8, 0, radius);
            ctx.quadraticCurveTo(radius * 0.7, radius * 0.8, 0, 0);
            ctx.fill();
            
            ctx.restore();
        }
        
        ctx.fillStyle = '#2C1B18';
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.28, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#F5CD79';
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.12, 0, Math.PI * 2);
        ctx.fill();
    }

    /**
     * Dahlia: Pointed radial star petals
     */
    drawDahlia(ctx, radius, f) {
        const petals = 12;
        ctx.fillStyle = f.color;
        ctx.globalAlpha = 0.9;
        
        for (let i = 0; i < petals; i++) {
            const angle = (i / petals) * Math.PI * 2;
            ctx.save();
            ctx.rotate(angle);
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-radius * 0.2, radius * 0.6);
            ctx.lineTo(0, radius);
            ctx.lineTo(radius * 0.2, radius * 0.6);
            ctx.closePath();
            ctx.fill();
            
            ctx.restore();
        }
        
        ctx.fillStyle = '#F6B93B';
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.22, 0, Math.PI * 2);
        ctx.fill();
    }

    drawFlowerInstance(ctx, x, y, radius, f) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(f.rotation);
        
        if (f.type === 'anemone') {
            this.drawAnemone(ctx, radius, f);
        } else if (f.type === 'rose') {
            this.drawRose(ctx, radius, f);
        } else if (f.type === 'poppy') {
            this.drawPoppy(ctx, radius, f);
        } else if (f.type === 'dahlia') {
            this.drawDahlia(ctx, radius, f);
        } else {
            this.drawRose(ctx, radius, f);
        }
        
        ctx.restore();
    }
    
    start(onComplete) {
        this.onComplete = onComplete;
        this.overlay.classList.add('active');
        this.isAnimating = true;
        this.startTime = performance.now();
        this.lastTime = performance.now();
        
        requestAnimationFrame((now) => this.animate(now));
    }
    
    animate(currentTime) {
        if (!this.isAnimating) return;
        
        const delta = Math.min((currentTime - this.lastTime) / 1000, 0.1);
        this.lastTime = currentTime;
        
        const elapsed = currentTime - this.startTime;
        this.progress = Math.min(elapsed / this.duration, 1);
        
        // Two-phase zoom
        let zoomFactor = 0;
        const phaseThreshold = 0.78;
        
        if (this.progress <= phaseThreshold) {
            const p1 = this.progress / phaseThreshold;
            zoomFactor = 0.22 + p1 * 1.25;
        } else {
            const p2 = (this.progress - phaseThreshold) / (1 - phaseThreshold);
            const burst = Math.pow(p2, 3.2);
            zoomFactor = 1.47 + burst * 8.0;
        }
            
        this.render(zoomFactor, delta);
        
        if (this.progress < 1) {
            requestAnimationFrame((now) => this.animate(now));
        } else {
            this.isAnimating = false;
            this.overlay.style.opacity = '0';
            setTimeout(() => {
                this.overlay.classList.remove('active');
                this.overlay.style.opacity = '';
                if (this.onComplete) this.onComplete();
            }, 500);
        }
    }
    
    render(zoomFactor, delta) {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);
        
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        
        // Soft background radial glow
        const bgGrad = ctx.createRadialGradient(
            centerX, centerY, 10,
            centerX, centerY, Math.max(this.width, this.height) * 0.85
        );
        bgGrad.addColorStop(0, '#FFFBF7');
        bgGrad.addColorStop(0.35, '#FDF0F2');
        bgGrad.addColorStop(1, 'rgba(244, 194, 201, 0.45)');
        
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, this.width, this.height);
        
        // Render Rings from back to front
        for (let r = this.rings.length - 1; r >= 0; r--) {
            const ring = this.rings[r];
            
            ring.currentAngle += ring.rotationSpeed * delta;
            
            const effectiveScale = zoomFactor * ring.zDepth;
            const ringRadius = 115 * effectiveScale;
            
            if (ringRadius > Math.max(this.width, this.height) * 1.6) continue;
            if (ringRadius < 6) continue;
            
            for (let f of ring.flowers) {
                const flowerAngle = f.angle + ring.currentAngle;
                
                const fx = centerX + Math.cos(flowerAngle) * ringRadius;
                const fy = centerY + Math.sin(flowerAngle) * ringRadius;
                const fSize = f.size * (effectiveScale * 0.30);
                
                this.drawFlowerInstance(ctx, fx, fy, fSize, f);
            }
        }
    }
}
