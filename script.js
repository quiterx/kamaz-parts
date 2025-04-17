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
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            try {
                const formData = {
                    name: document.getElementById('name').value,
                    phone: document.getElementById('phone').value,
                    catalogNumber: document.getElementById('catalogNumber').value,
                    comment: document.getElementById('comment').value,
                    pageUrl: window.location.href,
                    pageTitle: document.title
                };

                // URL вашего сервера на хостинге (замените на актуальный после деплоя)
                const serverUrl = 'https://your-app-name.onrender.com/send-request';

                const response = await fetch(serverUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert('Заявка успешно отправлена!');
                    form.reset();
                    closeModal();
                } else {
                    throw new Error('Ошибка при отправке');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
            }
        });
    }
});