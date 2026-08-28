/**
 * Organic Drifting Falling Petals Particle Engine
 * Creates gentle floating flower petals drifting down the page continuously.
 */
class FallingPetals {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        
        this.petals = [];
        this.maxPetals = 35;
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        this.initPetals();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }
    
    initPetals() {
        this.petals = [];
        for (let i = 0; i < this.maxPetals; i++) {
            this.petals.push(this.createPetal(true));
        }
    }
    
    createPetal(randomY = false) {
        return {
            x: Math.random() * this.width,
            y: randomY ? Math.random() * this.height : -20,
            size: 10 + Math.random() * 12,
            speedY: 0.8 + Math.random() * 1.2,
            speedX: -0.5 + Math.random() * 1,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.03,
            oscillation: Math.random() * Math.PI * 2,
            oscillationSpeed: 0.02 + Math.random() * 0.02,
            color: Math.random() > 0.4 ? '#E88B9A' : '#F4C2C9',
            opacity: 0.5 + Math.random() * 0.4
        };
    }
    
    drawPetal(p) {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        // Petal shape curve
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size / 2, -p.size, -p.size, p.size / 3, 0, p.size);
        ctx.bezierCurveTo(p.size, p.size / 3, p.size / 2, -p.size, 0, 0);
        ctx.fill();
        
        ctx.restore();
    }
    
    animate() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);
        
        for (let i = 0; i < this.petals.length; i++) {
            const p = this.petals[i];
            
            p.oscillation += p.oscillationSpeed;
            p.x += p.speedX + Math.sin(p.oscillation) * 0.8;
            p.y += p.speedY;
            p.rotation += p.rotationSpeed;
            
            this.drawPetal(p);
            
            // Reset when petal reaches bottom or leaves screen
            if (p.y > this.height + 20 || p.x < -30 || p.x > this.width + 30) {
                this.petals[i] = this.createPetal(false);
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}
