const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const labelsDiv = document.getElementById("labels");
const resultScreen = document.getElementById("resultScreen");
const resultText = document.getElementById("resultText");
const spinAgainBtn = document.getElementById("spinAgainBtn");

const questions = [
    "If Cloud Services Stop for One Day, Will the World Come to a Standstill?",
    "Without AWS, Azure & Google Cloud – Can the Digital World Survive Today?",
    "Does Moving to Cloud Reduce Cost or Increase Dependency?",
    "Cloud Computing Increases Costs in the Long Run",
    "Cloud Computing Reduces the Need for IT Professionals",
    "Physical vs Virtual Infrastructure Security",
    "Is Cloud Architecture the Same for Startups and MNCs?",
    "Does Cloud Automation Improve System Efficiency or Reduce Human Control?",
    "Is Multi-Cloud a Smart Choice or a Complicated Choice?",
    "Cloud Computing Makes Data More Secure Than Local Storage"
];

const segmentAngle = 360 / questions.length;
let rotation = 0;
let usedQuestions = [];

/* Create labels and position them in the center of slices */
questions.forEach((q, i) => {
    const span = document.createElement("span");
    span.textContent = q;
    
    // Rotate each text element to sit in the middle of its color segment
    const angle = i * segmentAngle + segmentAngle / 2;
    span.style.transform = `rotate(${angle}deg)`;
    
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

    // Spin at least 4 full turns + random angle
    const spin = Math.floor(Math.random() * 360) + 1440;
    rotation += spin;
    wheel.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
        const finalDeg = rotation % 360;
        // Calculation to find which index is under the top pointer (0 deg)
        const index = Math.floor((360 - finalDeg) / segmentAngle) % questions.length;
        const selected = questions[index];

        // Reroll if already used (simple recursive check)
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
