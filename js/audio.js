/**
 * Background Audio Controller
 * Handles instant autoplay on page load and global gesture unlocking for web browsers.
 */
class AudioController {
    constructor(buttonId, audioUrl) {
        this.button = document.getElementById(buttonId);
        this.audio = new Audio(audioUrl);
        this.audio.loop = true;
        this.audio.volume = 0.8;
        this.isPlaying = false;
        
        if (this.button) {
            this.button.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggle();
            });
        }
        
        // Setup global autoplay and gesture unlock listener
        this.setupAutoplayUnlock();
    }
    
    play() {
        if (this.isPlaying) return;
        
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.isPlaying = true;
                if (this.button) this.button.classList.remove('muted');
            }).catch(err => {
                console.log("Autoplay waiting for first user gesture:", err);
                if (this.button) this.button.classList.add('muted');
            });
        }
    }
    
    pause() {
        this.audio.pause();
        this.isPlaying = false;
        if (this.button) this.button.classList.add('muted');
    }
    
    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    setupAutoplayUnlock() {
        // Attempt immediate playback on initialization
        this.play();
        
        // Global gesture listener to unlock audio on any initial click/tap/keypress
        const unlockHandler = () => {
            if (!this.isPlaying) {
                this.play();
            }
            // Remove listeners once audio is actively playing
            if (this.isPlaying) {
                window.removeEventListener('click', unlockHandler);
                window.removeEventListener('touchstart', unlockHandler);
                window.removeEventListener('keydown', unlockHandler);
            }
        };
        
        window.addEventListener('click', unlockHandler, { capture: true });
        window.addEventListener('touchstart', unlockHandler, { capture: true });
        window.addEventListener('keydown', unlockHandler, { capture: true });
    }
}
