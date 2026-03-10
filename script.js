// Global variables
let musicPlaying = false;
let currentQuestionIndex = 0;
let gameScore = 0;
let yesButtonTimer = null;
let noButtonAttempts = 0;
let currentPhotoIndex = 0;

// Photo data for slideshow
const photos = [
    {
        src: "memories/photo1.jpeg",
        title: "When we first met...",
        overlay: "When we first met..."
    },
    {
        src: "memories/photo2.jpeg", 
        title: "Our first date...",
        overlay: "Our first date..."
    },
    {
        src: "memories/photo3.jpeg",
        title: "Falling in love...",
        overlay: "Falling in love..."
    },
    {
        src: "memories/photo4.jpeg",
        title: "Our adventures together...",
        overlay: "Our adventures together..."
    },
    {
        src: "memories/photo5.jpeg",
        title: "Growing closer...",
        overlay: "Growing closer..."
    },
    {
        src: "memories/photo6.jpeg",
        title: "Forever together...",
        overlay: "Forever together..."
    }
];

// Slideshow functions
function nextPhoto() {
    if (currentPhotoIndex < photos.length - 1) {
        currentPhotoIndex++;
        updatePhoto();
    }
}

function previousPhoto() {
    if (currentPhotoIndex > 0) {
        currentPhotoIndex--;
        updatePhoto();
    }
}

function updatePhoto() {
    const currentPhoto = document.getElementById("currentPhoto");
    const memoryText = document.getElementById("memoryText");
    const photoCounter = document.getElementById("photoCounter");
    const prevBtn = document.querySelector('.nav-btn:first-child');
    const nextBtn = document.querySelector('.nav-btn:last-child');
    
    if (currentPhoto && memoryText) {
        // Fade out current photo
        currentPhoto.style.opacity = "0";
        
        setTimeout(() => {
            // Update photo source and text
            currentPhoto.src = photos[currentPhotoIndex].src;
            memoryText.textContent = photos[currentPhotoIndex].title;
            
            // Update counter
            if (photoCounter) {
                photoCounter.textContent = `${currentPhotoIndex + 1} / ${photos.length}`;
            }
            
            // Update button states
            if (prevBtn) {
                prevBtn.disabled = currentPhotoIndex === 0;
            }
            if (nextBtn) {
                nextBtn.disabled = currentPhotoIndex === photos.length - 1;
            }
            
            // Fade in new photo
            setTimeout(() => {
                currentPhoto.style.opacity = "1";
            }, 100);
        }, 300);
    }
}

// Love letter text
const loveLetter = `My love,

You have been my everything since the day we met. Even after marriage, our love keeps growing stronger. You work hard for us every day, and I fall in love with you harder every single day. Thank you for loving me every day, even with my crazy mood swings. I love you forever!

Forever yours,
Your loving wife ❤️`;

// Game questions
const loveQuestions = [
    {
        question: "Where did we first meet?",
        answers: ["Coffee shop", "Park", "Library", "Restaurant"],
        correct: 0
    },
    {
        question: "What was our first date activity?",
        answers: ["Movie", "Dinner", "Beach walk", "Concert"],
        correct: 1
    },
    {
        question: "When did you propose?",
        answers: ["Birthday", "Anniversary", "Christmas", "Valentine's Day"],
        correct: 2
    },
    {
        question: "What's my favorite thing about you?",
        answers: ["Your smile", "Your kindness", "Your humor", "All of the above"],
        correct: 3
    }
];

// Proposal functions
function showProposal() {
    const landing = document.getElementById("landing");
    const proposal = document.getElementById("proposal");
    
    if (landing) landing.classList.add("hidden");
    if (proposal) proposal.classList.remove("hidden");
    
    // Start timer for yes button (10 seconds)
    yesButtonTimer = setTimeout(() => {
        enableYesButton();
    }, 10000);
    
    // Initially disable yes button
    const yesBtn = document.getElementById("yesBtn");
    if (yesBtn) {
        yesBtn.disabled = true;
        yesBtn.style.opacity = "0.5";
        yesBtn.style.cursor = "not-allowed";
    }
}

function enableYesButton() {
    const yesBtn = document.getElementById("yesBtn");
    if (yesBtn) {
        yesBtn.disabled = false;
        yesBtn.style.opacity = "1";
        yesBtn.style.cursor = "pointer";
        
        // Add celebration effect
        yesBtn.style.animation = "pulse 1s ease-in-out infinite";
    }
}

function handleYes() {
    if (yesButtonTimer !== null) {
        clearTimeout(yesButtonTimer);
        yesButtonTimer = null;
    }
    
    const proposal = document.getElementById("proposal");
    const memories = document.getElementById("memories");
    
    if (proposal) proposal.classList.add("hidden");
    if (memories) memories.classList.remove("hidden");
    
    animateMemoryCards();
}

function handleNo() {
    noButtonAttempts++;
    
    const noBtn = document.getElementById("noBtn");
    const proposalCaption = document.getElementById("proposalCaption");
    
    if (noBtn) {
        // Make no button run away
        noBtn.style.animation = "moveNoButton 0.5s ease-in-out";
        
        // Change position randomly
        const randomX = Math.random() * 200 - 100;
        const randomY = Math.random() * 100 - 50;
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
        
        setTimeout(() => {
            noBtn.style.animation = "";
        }, 500);
    }
    
    // Show caption after first attempt
    if (noButtonAttempts >= 1 && proposalCaption) {
        proposalCaption.classList.remove("hidden");
        setTimeout(() => {
            proposalCaption.classList.add("show");
        }, 100);
    }
    
    // After 10 seconds, enable yes button
    if (yesButtonTimer && noButtonAttempts >= 3) {
        enableYesButton();
    }
}

// Fullscreen functionality
function openFullscreen() {
    const loveImage = document.querySelector('.love-image');
    if (loveImage) {
        if (loveImage.requestFullscreen) {
            loveImage.requestFullscreen();
        } else if (loveImage.webkitRequestFullscreen) {
            loveImage.webkitRequestFullscreen();
        } else if (loveImage.msRequestFullscreen) {
            loveImage.msRequestFullscreen();
        }
    }
}

function openPhotoFullscreen() {
    const photoContainer = document.querySelector('.photo-container');
    if (photoContainer) {
        if (photoContainer.requestFullscreen) {
            photoContainer.requestFullscreen();
        } else if (photoContainer.webkitRequestFullscreen) {
            photoContainer.webkitRequestFullscreen();
        } else if (photoContainer.msRequestFullscreen) {
            photoContainer.msRequestFullscreen();
        }
    }
}

// Page navigation functions
function showMemories() {
    document.getElementById("landing").classList.add("hidden");
    document.getElementById("memories").classList.remove("hidden");
}

function unlockPage() {
    document.getElementById("memories").classList.add("hidden");
    document.getElementById("unlock").classList.remove("hidden");
}

function checkPassword() {
    let input = document.getElementById("secretInput").value;
    let correct = "i love you my dear wife";

    if (input.toLowerCase() === correct) {
        document.getElementById("unlock").classList.add("hidden");
        document.getElementById("letterPage").classList.remove("hidden");
        document.getElementById("errorMsg").innerText = "";
        
        startHearts();
        typeLetter();
    } else {
        const errorMsg = document.getElementById("errorMsg");
        errorMsg.innerText = "Nope! Type it properly baby 💕";
        errorMsg.style.animation = "shake 0.5s";
        setTimeout(() => {
            errorMsg.style.animation = "";
        }, 500);
    }
}

function handleEnter(event) {
    if (event.key === "Enter") {
        checkPassword();
    }
}

// Typing animation for love letter
function typeLetter() {
    const letterElement = document.getElementById("typeLetter");
    let index = 0;
    
    function type() {
        if (index < loveLetter.length) {
            letterElement.textContent += loveLetter.charAt(index);
            index++;
            setTimeout(type, 50);
        } else {
            document.getElementById("letterActions").classList.remove("hidden");
        }
    }
    
    letterElement.textContent = "";
    type();
}

// Falling hearts animation
function startHearts() {
    const heartsContainer = document.getElementById("hearts");
    const heartEmojis = ["❤️", "💕", "💖", "💗", "💓", "💝"];
    
    setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "falling-heart";
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + "%";
        heart.style.animationDuration = (Math.random() * 3 + 2) + "s";
        heart.style.fontSize = (Math.random() * 20 + 20) + "px";
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300);
}

// Music control
function toggleMusic() {
    const music = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicToggle");
    
    if (!music || !musicBtn) return;
    
    if (musicPlaying) {
        music.pause();
        musicBtn.textContent = "🎵 Play Music";
    } else {
        // Try to play music
        const playPromise = music.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Music started playing
                musicBtn.textContent = "🔇 Pause Music";
                musicPlaying = true;
            }).catch(error => {
                // Autoplay was prevented
                console.log("Music autoplay prevented:", error);
                musicBtn.textContent = "🎵 Click to Play Music";
                
                // Add click listener to start music on first interaction
                document.addEventListener('click', function playMusicOnce() {
                    music.play().then(() => {
                        musicBtn.textContent = "🔇 Pause Music";
                        musicPlaying = true;
                        document.removeEventListener('click', playMusicOnce);
                    }).catch(e => console.log("Still can't play music:", e));
                }, { once: true });
            });
        }
    }
    
    if (musicPlaying) {
        musicPlaying = false;
    }
}

function showSurpriseGift() {
    const game = document.getElementById("gamePage");
    const surprise = document.getElementById("surpriseGiftPage");
    
    if (game) game.classList.add("hidden");
    if (surprise) surprise.classList.remove("hidden");
    
    // Add celebration effect
    createCelebrationEffect();
}

function createCelebrationEffect() {
    const surprisePage = document.getElementById("surpriseGiftPage");
    if (!surprisePage) return;
    
    // Create floating hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.innerHTML = "❤️";
            heart.style.position = "absolute";
            heart.style.left = Math.random() * 100 + "%";
            heart.style.top = "100%";
            heart.style.fontSize = (Math.random() * 20 + 20) + "px";
            heart.style.opacity = "0.8";
            heart.style.animation = `floatUp ${3 + Math.random() * 2}s ease-out`;
            heart.style.pointerEvents = "none";
            
            surprisePage.appendChild(heart);
            
            setTimeout(() => heart.remove(), 5000);
        }, i * 200);
    }
}

function saveOurMemory() {
    const memoryText = `Our romantic journey completed on ${new Date().toLocaleDateString()}! 💕
    
We experienced:
- Our beautiful proposal moment 💝
- Our precious memories together 📸  
- Our love song playing 🎵
- Our love story game 🎮
- This special surprise gift! 🎁

Forever in love! ❤️`;
    
    // Create download
    const blob = new Blob([memoryText], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "our-romantic-memory.txt";
    a.click();
    window.URL.revokeObjectURL(url);
    
    // Show success message
    showSuccessMessage("Memory saved! 💕");
}

function showSuccessMessage(message) {
    const successDiv = document.createElement("div");
    successDiv.innerHTML = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff4d88, #ff6b9d);
        color: white;
        padding: 20px 40px;
        border-radius: 50px;
        font-size: 1.2rem;
        font-weight: 600;
        z-index: 1000;
        animation: fadeInOut 3s ease-in-out;
    `;
    
    document.body.appendChild(successDiv);
    setTimeout(() => successDiv.remove(), 3000);
}

// Add floating animation
const style = document.createElement("style");
style.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
`;
document.head.appendChild(style);

// Memory cards animation
function animateMemoryCards() {
    const cards = document.querySelectorAll(".memory-card");
    cards.forEach((card, index) => {
        // Reset initial state
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        
        // Animate in with delay
        setTimeout(() => {
            card.style.transition = "all 0.5s ease-out";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 200);
    });
}

// Game functions
function showGame() {
    document.getElementById("letterPage").classList.add("hidden");
    document.getElementById("gamePage").classList.remove("hidden");
    currentQuestionIndex = 0;
    gameScore = 0;
    document.getElementById("score").textContent = gameScore;
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= loveQuestions.length) {
        showFinalPage();
        return;
    }
    
    const question = loveQuestions[currentQuestionIndex];
    document.getElementById("question").textContent = question.question;
    
    const answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = "";
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.className = "answer-btn";
        button.onclick = () => checkAnswer(index);
        answersContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const question = loveQuestions[currentQuestionIndex];
    const buttons = document.querySelectorAll(".answer-btn");
    
    if (selectedIndex === question.correct) {
        gameScore++;
        document.getElementById("score").textContent = gameScore;
        buttons[selectedIndex].style.backgroundColor = "#4CAF50";
        buttons[selectedIndex].textContent += " ✓";
    } else {
        buttons[selectedIndex].style.backgroundColor = "#f44336";
        buttons[selectedIndex].textContent += " ✗";
        buttons[question.correct].style.backgroundColor = "#4CAF50";
        buttons[question.correct].textContent += " ✓";
    }
    
    buttons.forEach(btn => btn.disabled = true);
    
    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 1500);
}

function backToLetter() {
    document.getElementById("gamePage").classList.add("hidden");
    document.getElementById("letterPage").classList.remove("hidden");
}

function saveMemory() {
    const memoryData = {
        date: new Date().toISOString(),
        letter: loveLetter,
        score: gameScore
    };
    
    localStorage.setItem("loveMemory", JSON.stringify(memoryData));
    
    // Show saved confirmation
    const saveBtn = event.target;
    const originalText = saveBtn.textContent;
    saveBtn.textContent = "Saved! 💾";
    saveBtn.style.backgroundColor = "#4CAF50";
    
    setTimeout(() => {
        saveBtn.textContent = originalText;
        saveBtn.style.backgroundColor = "";
    }, 2000);
}

function showFinalPage() {
    document.getElementById("gamePage").classList.add("hidden");
    document.getElementById("finalPage").classList.remove("hidden");
    
    // Start celebration animation
    createCelebration();
}

function createCelebration() {
    const container = document.querySelector(".final-animation");
    const emojis = ["❤️", "💕", "💖", "🎉", "✨", "🌟"];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const emoji = document.createElement("div");
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.className = "celebration-emoji";
            emoji.style.left = Math.random() * 100 + "%";
            emoji.style.animationDelay = Math.random() * 2 + "s";
            container.appendChild(emoji);
            
            setTimeout(() => emoji.remove(), 4000);
        }, i * 100);
    }
}

function restart() {
    // Hide all pages
    document.querySelectorAll("div[id$='Page']").forEach(page => {
        page.classList.add("hidden");
    });
    
    // Reset game state
    currentQuestionIndex = 0;
    gameScore = 0;
    
    // Show landing page
    document.getElementById("landing").classList.remove("hidden");
    
    // Reset music
    const music = document.getElementById("bgMusic");
    music.pause();
    music.currentTime = 0;
    musicPlaying = false;
    document.getElementById("musicToggle").textContent = "🎵 Play Music";
    
    // Clear input
    document.getElementById("secretInput").value = "";
    document.getElementById("errorMsg").innerText = "";
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
    // Add some initial animations
    setTimeout(() => {
        document.querySelector(".landing-content").style.animation = "fadeIn 1s ease-in";
    }, 100);
});
