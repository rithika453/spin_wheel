const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const labelsDiv = document.getElementById("labels");
const resultScreen = document.getElementById("resultScreen");
const resultText = document.getElementById("resultText");
const spinAgainBtn = document.getElementById("spinAgainBtn");

/* Q1 to Q10 */
const questions = [
  "Q1","Q2","Q3","Q4","Q5",
  "Q6","Q7","Q8","Q9","Q10"
];

const segmentAngle = 360 / questions.length;

let rotation = 0;
let usedQuestions = [];

/* Create labels */
questions.forEach((q, i) => {
  const span = document.createElement("span");
  span.textContent = q;

  const angle = i * segmentAngle + segmentAngle / 2;

  span.style.transform =
    `rotate(${angle}deg)
     translate(0,-140px)
     rotate(-${angle}deg)`;

  labelsDiv.appendChild(span);
});

/* Spin logic */
spinBtn.onclick = () => {

  if (usedQuestions.length === questions.length) {
    resultText.textContent = "ALL QUESTIONS DONE!";
    spinAgainBtn.style.display = "none";
    resultScreen.style.display = "flex";
    return;
  }

  const spin = Math.floor(Math.random() * 360) + 1080;
  rotation += spin;
  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    const finalDeg = rotation % 360;
    const index =
      Math.floor((360 - finalDeg) / segmentAngle) % questions.length;

    const selected = questions[index];

    if (usedQuestions.includes(selected)) {
      spinBtn.click();
      return;
    }

    usedQuestions.push(selected);
    resultText.textContent = selected;
    resultScreen.style.display = "flex";

  }, 4000);
};

spinAgainBtn.onclick = () => {
  resultScreen.style.display = "none";
};

