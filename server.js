require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = process.env.PORT || 3000;

// Используем переменные окружения для токена и chat ID
const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});
const CHAT_ID = process.env.CHAT_ID;

// Обработка команд бота
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет! Я бот для приема заявок с сайта КАМАЗист.ру. Ваш Chat ID: ' + chatId);
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Я буду отправлять вам уведомления о новых заявках с сайта. Просто держите этот чат открытым.');
});

// Обработка любых текстовых сообщений
bot.on('message', (msg) => {
    if (!msg.text.startsWith('/')) {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Я получил ваше сообщение. Используйте /help для получения справки.');
    }
});

app.use(bodyParser.json());
app.use(express.static('.'));

// Настройка CORS для GitHub Pages
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://quiterx.github.io');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.post('/send-request', (req, res) => {
    const { name, phone, catalogNumber, comment, pageUrl, pageTitle } = req.body;
    
    const message = `
Новая заявка с сайта:
Страница: ${pageTitle}
URL: ${pageUrl}

Имя: ${name}
Телефон: ${phone}
Каталожный номер: ${catalogNumber || 'не указан'}
Комментарий: ${comment || 'нет'}
    `;

    bot.sendMessage(CHAT_ID, message)
        .then(() => {
            res.json({ success: true });
        })
        .catch(error => {
            console.error('Error sending message:', error);
            res.status(500).json({ success: false, error: error.message });
        });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 