const questions = [
    {
        question: "Which is the largest creature in world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Girraffe", correct: false },
        ]
    },
    {
        question: "Who is the Prime Minsiter of India?",
        answers: [
            { text: "Aniket", correct: false },
            { text: "jawahar lal", correct: false },
            { text: "Narendra Modi", correct: true },
            { text: "Kejriwal", correct: false },
        ]
    },
    {
        question: "When did India get independence?",
        answers: [
            { text: "1947", correct: true },
            { text: "1949", correct: false },
            { text: "1969", correct: false },
            { text: "2022", correct: false },
        ]
    },
    {
        question: "Capital on Norway",
        answers: [
            { text: "Jeruselam", correct: false },
            { text: "Moscow", correct: false },
            { text: "Oslo", correct: true },
            { text: "Helsinki", correct: false },
        ]
    }
];

const questionElement = document.getElementById("Question")
const answerButton = document.getElementsByClassName("answers")[0];
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "NEXT";
    showQuestion();
}


function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex].question;
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion;
    for (let i = 0; i < answerButton.childElementCount; i++) {
        answerButton.children[i].disabled = false;
        answerButton.children[i].innerHTML = questions[currentQuestionIndex].answers[i].text;
        answerButton.children[i].dataset.correct = questions[currentQuestionIndex].answers[i].correct; // very very important : Add a data-correct attribute to your answer
        answerButton.children[i].classList.remove("correct", "incorrect"); //to remove green or red from options of next question
    }
}

answerButton.addEventListener("click", (event) => {
    const clickedOption = event.target;
    if (clickedOption.tagName == "BUTTON") {
        const buttonText = clickedOption.textContent;
        const correctOption = questions[currentQuestionIndex].answers.find(option => option.correct === true);
        // Remove 'correct' and 'incorrect' classes from all answer buttons whenever you are clicking on next option.IMP
        for (let i = 0; i < answerButton.childElementCount; i++) {
            answerButton.children[i].classList.remove("correct", "incorrect");
            answerButton.children[i].disabled = true; // disabling other buttns once any option is selected
        }
        if (buttonText === correctOption.text) {
            clickedOption.classList.add("correct");
            score++;
            nextButton.style.display = "block";
        } else {
            const incorrectButton = Array.from(answerButton.children).find(option => option.textContent === buttonText);
            if (incorrectButton) {
                incorrectButton.classList.add("incorrect");
                nextButton.style.display = "block";
            }
            Array.from(answerButton.children).forEach(button => {
                // console.log(button,button.dataset.correct); // shows data-correct = false/true
                if(button.dataset.correct === "true"){
                    button.classList.add("correct");
                }
            })
        }
    }
})

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        let quizApp = document.getElementsByClassName("quizApp")[0];
        while (quizApp.firstChild) {
            quizApp.removeChild(quizApp.firstChild);
        }
        const scoreChild = document.createElement("div");
        scoreChild.setAttribute("id", "score");
        scoreChild.innerHTML = `You scored ${score} out of ${questions.length}`;
        quizApp.appendChild(scoreChild);
    }
})

startQuiz();


