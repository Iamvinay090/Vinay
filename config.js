// Personalization Configuration
// You can edit any of these details to customize your website!

const CONFIG = {
    // Partner & Sender Info
    partnerName: "RADHE",
    senderName: "your forever",
    
    // Header & Greeting Messages
    heroTitle: "For you, my baby.",
    heroTapPrompt: "(Tap to open)",
    
    // Trending Love Quiz Page Settings (Starts at the very beginning!)
    quizQuestion: "Do u love me RADHE?",
    quizSubheader: "Find the right button to unlock my heart... 🐰",
    quizYesText: "YES! ❤️",
    quizNoText: "NO 😜",
    quizPopupText: "looser u looose try again 🐰",
    quizButtonCount: 180, // High density wall of dark pink buttons
    
    // Decoy Mogambo Trap Settings
    mogamboText: "Thodi si or mehnat kriye yr 🥲🤌🏼✨",
    mogamboSubtext: "   ",
    mogamboImage: "assets/images/cat-happy.gif",
    
    galleryTitle: "From me to you.",
    gallerySubtitle: "This is how much I love you.",
    
    closingTitle: "I will always love you",
    closingSubtitle: "From, your forever",
    
    // Love Letter Text (types out character by character on scroll)
    letterText: `To My Dearest,

I am writing this little note just because you have been on my mind all day long, which is nothing new since you pretty much live there anyway.

Every single time I think about your smile, my heart does a tiny happy dance. I find myself smiling at my phone like a complete fool whenever your name pops up, and honestly, it is my absolute favorite part of the day.

You have this wonderful way of making the whole world feel brighter and sweeter just by being you. Thank you for all the warm hugs, the soft giggles we share, and the beautiful comfort of knowing you are mine.

Being your boyfriend is the happiest thing that has ever happened to me, and I count myself incredibly lucky to hold your hand and walk through life beside you.

Please never forget how deeply you are loved and cherished. You are my favorite person, my safest space, and my absolute dream come true.

I love you more than all the stars in the night sky, and I cannot wait until the next time I get to hold you close.

Forever and always yours,
Your Love`,

    // Polaroid Gallery Photos
    photos: [
        {
            url: "assets/images/cutiee.jpeg",
            caption: "Our favorite coffee date ❤️",
            rotation: -3
        },
        {
            url: "assets/images/saareee.jpeg",
            caption: "Sunset walks together ✨",
            rotation: 2
        },
        {
            url: "assets/images/mandir.jpeg",
            caption: "Always laughing with you 💖",
            rotation: -2
        },
        {
            url: "assets/images/white.jpeg",
            caption: "Unforgettable memories 🌸",
            rotation: 4
        },
        {
            url: "assets/images/sleep.jpeg",
            caption: "My happiest place is with you 💫",
            rotation: -4
        },
        {
            url: "assets/images/guru.jpeg",
            caption: "Forever and always 🌷",
            rotation: 3
        }
    ],

    // Audio / Music Settings
    audioUrl: "assets/audio/AUDIO.mp3",
    audioTitle: "August — Taylor Swift",
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
