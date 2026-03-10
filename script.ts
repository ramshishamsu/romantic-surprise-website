// Global variables
let musicPlaying: boolean = false;
let currentQuestionIndex: number = 0;
let gameScore: number = 0;
let yesButtonTimer: number | null = null;
let noButtonAttempts: number = 0;

// Love letter text
const loveLetter: string = `My love,

You have been my everything since the day we met. Even after marriage, our love keeps growing stronger. You work hard for us every day, and I fall in love with you harder every single day. Thank you for loving me every day, even with my crazy mood swings. I love you forever!

Forever yours,
Your loving wife ❤️`;

// Game questions
interface Question {
    question: string;
    answers: string[];
    correct: number;
}

const loveQuestions: Question[] = [
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

// Page navigation functions
function showMemories(): void {
    const landing = document.getElementById("landing");
    const memories = document.getElementById("memories");
    
    if (landing) landing.classList.add("hidden");
    if (memories) memories.classList.remove("hidden");
    
    animateMemoryCards();
}

function unlockPage(): void {
    const memories = document.getElementById("memories");
    const unlock = document.getElementById("unlock");
    
    if (memories) memories.classList.add("hidden");
    if (unlock) unlock.classList.remove("hidden");
}

function checkPassword(): void {
    const secretInput = document.getElementById("secretInput") as HTMLInputElement;
    const unlock = document.getElementById("unlock");
    const letterPage = document.getElementById("letterPage");
    const errorMsg = document.getElementById("errorMsg");
    
    if (!secretInput || !unlock || !letterPage || !errorMsg) return;
    
    const input: string = secretInput.value;
    const correct: string = "i love you my dear wife";

    if (input.toLowerCase() === correct) {
        unlock.classList.add("hidden");
        letterPage.classList.remove("hidden");
        errorMsg.innerText = "";
        
        startHearts();
        typeLetter();
    } else {
        errorMsg.innerText = "Nope! Type it properly baby 💕";
        errorMsg.style.animation = "shake 0.5s";
        setTimeout(() => {
            errorMsg.style.animation = "";
        }, 500);
    }
}

function handleEnter(event: KeyboardEvent): void {
    if (event.key === "Enter") {
        checkPassword();
    }
}

// Typing animation for love letter
function typeLetter(): void {
    const letterElement = document.getElementById("typeLetter") as HTMLElement;
    if (!letterElement) return;
    
    let index: number = 0;
    
    function type(): void {
        if (index < loveLetter.length) {
            letterElement.textContent! += loveLetter.charAt(index);
            index++;
            setTimeout(type, 50);
        } else {
            const letterActions = document.getElementById("letterActions");
            if (letterActions) letterActions.classList.remove("hidden");
        }
    }
    
    letterElement.textContent = "";
    type();
}

// Falling hearts animation
function startHearts(): void {
    const heartsContainer = document.getElementById("hearts");
    if (!heartsContainer) return;
    
    const heartEmojis: string[] = ["❤️", "💕", "💖", "💗", "💓", "💝"];
    
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
function toggleMusic(): void {
    const music = document.getElementById("bgMusic") as HTMLAudioElement;
    const musicBtn = document.getElementById("musicToggle");
    
    if (!music || !musicBtn) return;
    
    if (musicPlaying) {
        music.pause();
        musicBtn.textContent = "🎵 Play Music";
    } else {
        music.play().catch(e => console.log("Music play failed:", e));
        musicBtn.textContent = "🔇 Pause Music";
    }
    musicPlaying = !musicPlaying;
}

// Memory cards animation
function animateMemoryCards(): void {
    const cards = document.querySelectorAll(".memory-card");
    cards.forEach((card, index) => {
        // Reset initial state
        (card as HTMLElement).style.opacity = "0";
        (card as HTMLElement).style.transform = "translateY(30px)";
        
        // Animate in with delay
        setTimeout(() => {
            (card as HTMLElement).style.transition = "all 0.5s ease-out";
            (card as HTMLElement).style.opacity = "1";
            (card as HTMLElement).style.transform = "translateY(0)";
        }, index * 200);
    });
}

// Game functions
function showGame(): void {
    const letterPage = document.getElementById("letterPage");
    const gamePage = document.getElementById("gamePage");
    const scoreElement = document.getElementById("score");
    
    if (!letterPage || !gamePage || !scoreElement) return;
    
    letterPage.classList.add("hidden");
    gamePage.classList.remove("hidden");
    currentQuestionIndex = 0;
    gameScore = 0;
    scoreElement.textContent = gameScore.toString();
    showQuestion();
}

function showQuestion(): void {
    const questionElement = document.getElementById("question");
    const answersContainer = document.getElementById("answers");
    
    if (!questionElement || !answersContainer) return;
    
    if (currentQuestionIndex >= loveQuestions.length) {
        showFinalPage();
        return;
    }
    
    const question = loveQuestions[currentQuestionIndex];
    questionElement.textContent = question.question;
    
    answersContainer.innerHTML = "";
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.className = "answer-btn";
        button.onclick = () => checkAnswer(index);
        answersContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex: number): void {
    const question = loveQuestions[currentQuestionIndex];
    const buttons = document.querySelectorAll(".answer-btn");
    const scoreElement = document.getElementById("score");
    
    if (!scoreElement) return;
    
    if (selectedIndex === question.correct) {
        gameScore++;
        scoreElement.textContent = gameScore.toString();
        (buttons[selectedIndex] as HTMLButtonElement).style.backgroundColor = "#4CAF50";
        (buttons[selectedIndex] as HTMLButtonElement).textContent += " ✓";
    } else {
        (buttons[selectedIndex] as HTMLButtonElement).style.backgroundColor = "#f44336";
        (buttons[selectedIndex] as HTMLButtonElement).textContent += " ✗";
        (buttons[question.correct] as HTMLButtonElement).style.backgroundColor = "#4CAF50";
        (buttons[question.correct] as HTMLButtonElement).textContent += " ✓";
    }
    
    buttons.forEach(btn => (btn as HTMLButtonElement).disabled = true);
    
    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 1500);
}

function backToLetter(): void {
    const gamePage = document.getElementById("gamePage");
    const letterPage = document.getElementById("letterPage");
    
    if (gamePage) gamePage.classList.add("hidden");
    if (letterPage) letterPage.classList.remove("hidden");
}

function saveMemory(): void {
    const memoryData = {
        date: new Date().toISOString(),
        letter: loveLetter,
        score: gameScore
    };
    
    localStorage.setItem("loveMemory", JSON.stringify(memoryData));
    
    // Show saved confirmation
    const saveBtn = event?.target as HTMLButtonElement;
    if (saveBtn) {
        const originalText = saveBtn.textContent;
        saveBtn.textContent = "Saved! 💾";
        saveBtn.style.backgroundColor = "#4CAF50";
        
        setTimeout(() => {
            saveBtn.textContent = originalText;
            saveBtn.style.backgroundColor = "";
        }, 2000);
    }
}

function showFinalPage(): void {
    const gamePage = document.getElementById("gamePage");
    const finalPage = document.getElementById("finalPage");
    
    if (gamePage) gamePage.classList.add("hidden");
    if (finalPage) finalPage.classList.remove("hidden");
    
    // Start celebration animation
    createCelebration();
}

function createCelebration(): void {
    const container = document.querySelector(".final-animation");
    if (!container) return;
    
    const emojis: string[] = ["❤️", "💕", "💖", "🎉", "✨", "🌟"];
    
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

function restart(): void {
    // Hide all pages
    document.querySelectorAll("div[id$='Page']").forEach(page => {
        page.classList.add("hidden");
    });
    
    // Reset game state
    currentQuestionIndex = 0;
    gameScore = 0;
    
    // Show landing page
    const landing = document.getElementById("landing");
    if (landing) landing.classList.remove("hidden");
    
    // Reset music
    const music = document.getElementById("bgMusic") as HTMLAudioElement;
    const musicBtn = document.getElementById("musicToggle");
    
    if (music && musicBtn) {
        music.pause();
        music.currentTime = 0;
        musicPlaying = false;
        musicBtn.textContent = "🎵 Play Music";
    }
    
    // Clear input
    const secretInput = document.getElementById("secretInput") as HTMLInputElement;
    const errorMsg = document.getElementById("errorMsg");
    
    if (secretInput) secretInput.value = "";
    if (errorMsg) errorMsg.innerText = "";
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function(): void {
    // Add some initial animations
    setTimeout(() => {
        const landingContent = document.querySelector(".landing-content") as HTMLElement;
        if (landingContent) {
            landingContent.style.animation = "fadeIn 1s ease-in";
        }
    }, 100);
});