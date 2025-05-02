// Простейший кликер
let score = 0;
const clickBtn = document.getElementById('clickBtn');
const scoreElement = document.getElementById('score');

clickBtn.addEventListener('click', function() {
    score++;
    scoreElement.textContent = score;
    
    // Отправляем счёт в VK (когда игра встроена)
    if (typeof VK !== 'undefined') {
        VK.callMethod("setScore", score);
    }
});

// Инициализация VK (когда игра загружена в ВКонтакте)
if (typeof VK !== 'undefined') {
    VK.init(function() {
        console.log("VK API готов к работе");
    });
}