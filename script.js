function openModal() {
    document.getElementById('requestModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('requestModal').style.display = 'none';
}

// Закрытие модального окна при клике вне его области
window.onclick = function(event) {
    const modal = document.getElementById('requestModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Обработка отправки формы
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('requestForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Здесь будет логика отправки формы
            alert('Заявка успешно отправлена!');
            closeModal();
        });
    }
});