document.addEventListener("DOMContentLoaded", () => {
  const coin = document.querySelector(".coin");
  const flipButton = document.getElementById("flipButton");
  const resultSpan = document.getElementById("result");
  const flipsSpan = document.getElementById("flips");
  const choiceSpan = document.getElementById("choice");
  const streakSpan = document.getElementById("streak");
  const headsButton = document.getElementById("headsButton");
  const tailsButton = document.getElementById("tailsButton");
  const container = document.querySelector(".container");
  const celebrationSound = document.getElementById("celebrationSound");
  const headsImg = document.querySelector(".heads-img");
  const tailsImg = document.querySelector(".tails-img");

  let isFlipping = false;
  let totalFlips = 0;
  let currentChoice = null;
  let winningStreak = 0;

  function triggerCelebration() {
    // Play celebration sound
    celebrationSound.currentTime = 0;
    celebrationSound.play();

    // Add container animation
    container.classList.add("celebrate");

    // Trigger confetti
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        container.classList.remove("celebrate");
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }

  function selectChoice(choice) {
    currentChoice = choice;
    choiceSpan.textContent = choice;

    // Update button styles
    headsButton.classList.toggle("selected", choice === "Heads");
    tailsButton.classList.toggle("selected", choice === "Tails");
  }

  function flipCoin() {
    if (isFlipping) return;
    if (!currentChoice) {
      alert("Please choose Heads or Tails first!");
      return;
    }

    isFlipping = true;
    totalFlips++;
    flipsSpan.textContent = totalFlips;

    // Random result
    const result = Math.random() < 0.5 ? "Heads" : "Tails";

    // Hide both images initially
    headsImg.classList.remove("active");
    tailsImg.classList.remove("active");

    // Show the appropriate image based on result
    setTimeout(() => {
      resultSpan.textContent = result;
      if (result === "Heads") {
        headsImg.classList.add("active");
      } else {
        tailsImg.classList.add("active");
      }
      isFlipping = false;

      // Check if player won
      if (result === currentChoice) {
        winningStreak++;
        streakSpan.textContent = winningStreak;

        if (winningStreak === 3) {
          triggerCelebration();
        }
      } else {
        winningStreak = 0;
        streakSpan.textContent = winningStreak;
      }
    }, 600);
  }

  // Add click event listeners to choice buttons
  headsButton.addEventListener("click", () => selectChoice("Heads"));
  tailsButton.addEventListener("click", () => selectChoice("Tails"));

  // Add click event listener to flip button
  flipButton.addEventListener("click", flipCoin);

  // Add keyboard support
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      flipCoin();
    }
  });
});
