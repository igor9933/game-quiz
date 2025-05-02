// Инициализация VK API
vk.init({
    apiId: 53521596,
    status: true,
    onlyWidgets: false
})

// Обработка изменения размера окна
window.addEventListener('resize', function() {
    VK.callMethod('resizeWindow', document.documentElement.offsetWidth, document.documentElement.offsetHeight);
});

// Функция для отправки очков на сервер VK
function saveScore(score) {
    VK.api('storage.set', {
        key: 'quiz_score',
        value: score,
        v: '5.131'
    }, function(response) {
        console.log('Score saved:', response);
    });
}