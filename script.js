const quizData = [
    {
        question: "Какой язык программирования используется для создания этой игры?",
        answers: ["Java", "C++", "JavaScript", "Python"],
        correct: 2
    },
    {
        question: "Как называется социальная сеть, для которой мы создаём игру?",
        answers: ["Facebook", "ВКонтакте", "Twitter", "Instagram"],
        correct: 1
    },
    {
        question: "Какой тег HTML используется для вставки JavaScript?",
        answers: ["<script>", "<js>", "<javascript>", "<code>"],
        correct: 0
    }
];

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');

let currentQuestion = 0;
let score = 0;
let answered = false;

// Инициализация игры

function initGame() {
    showQuestion();
    // Инициализация VK API
    VK.init(function() {
        console.log("VK API initialized");
        // Можно добавить дополнительные функции VK
    });
};

// Показать вопрос
function showQuestion() {
    answered = false;
    const question = quizData[currentQuestion];
    questionElement.textContent = question.question;
    
    answersElement.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer-btn');
        button.addEventListener('click', () => selectAnswer(index));
        answersElement.appendChild(button);
    });
    
    resultElement.textContent = '';
}

// Выбор ответа
function selectAnswer(index) {
    if (answered) return;
    answered = true;
    
    const question = quizData[currentQuestion];
    if (index === question.correct) {
        resultElement.textContent = "Правильно!";
        resultElement.style.color = "green";
        score += 10;
        scoreElement.textContent = `Счёт: ${score}`;
        
        // Отправка очков в VK
        if (VK) {
            VK.callMethod("setScore", score);
        }
    } else {
        resultElement.textContent = `Неверно! Правильный ответ: ${question.answers[question.correct]}`;
        resultElement.style.color = "red";
    }
    
    // Переход к следующему вопросу через 2 секунды
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            endGame();
        }
    }, 2000);
}

// Завершение игры
function endGame() {
    questionElement.textContent = "Викторина завершена!";
    answersElement.innerHTML = '';
    resultElement.textContent = `Ваш итоговый счёт: ${score}`;
    
    // Можно добавить кнопку для повторной игры
    const restartBtn = document.createElement('button');
    restartBtn.textContent = "Играть снова";
    restartBtn.classList.add('answer-btn');
    restartBtn.addEventListener('click', restartGame);
    answersElement.appendChild(restartBtn);
}

// Перезапуск игры
function restartGame() {
    currentQuestion = 0;
    score = 0;
    scoreElement.textContent = `Счёт: ${score}`;
    showQuestion();
}

// Запуск игры при загрузке страницы
window.onload = initGame;