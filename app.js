const app = document.getElementById('app');
const quizContainer = document.getElementById('quiz-container');
const highScoresContainer = document.getElementById('high-scores-container');

const questions = [
  // General Knowledge Questions
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctIndex: 2,
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    correctIndex: 1,
  },
  {
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['Charles Dickens', 'Jane Austen', 'William Shakespeare', 'Mark Twain'],
    correctIndex: 2,
  },

  /*
 * Quiz App
 * Coded by: Namrata Ingle
 * Copyright (c) 2023 Namrata Ingle. All rights reserved.
*/

  {
    question: 'In which year did World War II end?',
    options: ['1943', '1945', '1950', '1939'],
    correctIndex: 1,
  },
  {
    question: 'What is the largest mammal in the world?',
    options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
    correctIndex: 1,
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  displayQuestion();
  startTimer();
  showElement(quizContainer);
  hideElement(highScoresContainer);
}

function displayQuestion() {
  const questionText = document.getElementById('question-text');
  const optionsList = document.getElementById('options-list');
  const currentQuestion = questions[currentQuestionIndex];

  questionText.textContent = currentQuestion.question;

  optionsList.innerHTML = '';
  currentQuestion.options.forEach((option, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<button onclick="checkAnswer(${index})">${option}</button>`;
    optionsList.appendChild(listItem);
  });
}

function checkAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedIndex === currentQuestion.correctIndex) {
    score += 10; // Adjust score based on your scoring system
    displayFeedback('Correct!', '#4caf50');
  } else {
    displayFeedback(`Incorrect! The correct answer is: ${currentQuestion.options[currentQuestion.correctIndex]}`, '#e91e63');
  }
  clearInterval(timerInterval);
  updateTimer(0);
}

function displayFeedback(text, color) {
  const feedbackText = document.getElementById('feedback-text');
  feedbackText.textContent = text;
  feedbackText.style.color = color;
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
    startTimer();
    displayFeedback('', '');
  } else {
    endQuiz();
  }
}

function startTimer() {
  let timeLeft = 10; // Adjust time limit per question
  updateTimer(timeLeft);

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer(timeLeft);

    if (timeLeft <= 0) {
      displayFeedback('Time\'s up!', '#e91e63');
      clearInterval(timerInterval);
      nextQuestion();
    }
  }, 1000);
}

function updateTimer(timeLeft) {
  const timer = document.getElementById('timer');
  timer.textContent = `Time: ${timeLeft}`;
}

function endQuiz() {
  clearInterval(timerInterval);
  displayFeedback(`Quiz Completed! Your Score: ${score}`, '#2196f3');
  saveHighScore();
  showHighScores();
}

function saveHighScore() {
  const playerName = prompt('Enter your name:');
  const highScores = getHighScores();
  highScores.push({ name: playerName, score: score });
  highScores.sort((a, b) => b.score - a.score);
  localStorage.setItem('highScores', JSON.stringify(highScores));
}

function getHighScores() {
  return JSON.parse(localStorage.getItem('highScores')) || [];
}

function showHighScores() {
  const highScoresList = document.getElementById('high-scores-list');
  highScoresList.innerHTML = '';

  const highScores = getHighScores()
    .sort((a, b) => b.score - a.score) // Sort in descending order
    .slice(0, 5); // Take only the top 5 scores

  highScores.forEach((user) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${user.name} - ${user.score}`;
    highScoresList.appendChild(listItem);
  });

  showElement(highScoresContainer);
  hideElement(quizContainer);
}

function showElement(element) {
  element.style.display = 'block';
}

function hideElement(element) {
  element.style.display = 'none';
}

// Initial setup
startQuiz();
