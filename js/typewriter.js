/**
 * Handwritten Love Letter Typewriter Effect Engine
 */
class TypewriterEffect {
    constructor(elementId, text, speed = 35) {
        this.element = document.getElementById(elementId);
        this.fullText = text;
        this.baseSpeed = speed;
        this.currentIndex = 0;
        this.isTyping = false;
        this.hasStarted = false;
    }
    
    start() {
        if (this.hasStarted || !this.element) return;
        this.hasStarted = true;
        this.isTyping = true;
        this.element.innerHTML = '';
        
        // Add typing cursor
        this.cursor = document.createElement('span');
        this.cursor.className = 'letter-cursor';
        this.element.appendChild(this.cursor);
        
        this.typeNextChar();
    }
    
    typeNextChar() {
        if (this.currentIndex >= this.fullText.length) {
            this.isTyping = false;
            // Keep cursor blinking for a few seconds then fade out
            setTimeout(() => {
                if (this.cursor) this.cursor.style.display = 'none';
            }, 5000);
            return;
        }
        
        const char = this.fullText[this.currentIndex];
        const textNode = document.createTextNode(char);
        this.element.insertBefore(textNode, this.cursor);
        this.currentIndex++;
        
        // Calculate variable typing delay for natural feel
        let delay = this.baseSpeed + Math.random() * 25;
        
        if (char === '.' || char === '!' || char === '?') {
            delay += 400; // Pause after sentence end
        } else if (char === ',' || char === ';') {
            delay += 200; // Pause after comma
        } else if (char === '\n') {
            delay += 300; // Pause on new line
        }
        
        setTimeout(() => this.typeNextChar(), delay);
    }
}
