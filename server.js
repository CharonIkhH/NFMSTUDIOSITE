const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
// const io = new Server(server);
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://127.0.0.1:5500', // Разрешить запросы с вашего клиента
        methods: ['GET', 'POST']
    }
});

const TelegramBot = require("node-telegram-bot-api");

const botToken = "7269186538:AAHdIYueplppgZLjtTLOYzo9l9GjNcdSEWA";
// const chatId = "-1002258382051";
const chatId = "-1002491710263";

const bot = new TelegramBot(botToken, { polling: false });
bot.on('message', (msg) => {
    console.log(msg.chat.id); // Выводит chatId группы
});


app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '14881488',
//     database: 'mydatabase'
// });

// Подключение к базе данных
// connection.connect(error => {
//     if (error) {
//         console.error('Ошибка подключения к базе данных:', error);
//         return;
//     }
//     console.log('Подключено к базе данных MySQL');
// });

// Обработка соединений WebSocket
io.on('connection', (socket) => {
    console.log('Новое подключение:', socket.id);

    socket.on('userServiceRequest', (userServiceRequestContent) => {
        // Формируем сообщение для отправки в Telegram
        const messageText = `
📋 Заявка на услугу:
👤 Имя: ${userServiceRequestContent.name || 'Не указано'}
📧 Email: ${userServiceRequestContent.email || 'Не указано'}
🛠 Услуга: ${userServiceRequestContent.service || 'Не указано'}
✉️ Сообщение: ${userServiceRequestContent.message || 'Не указано'}
        `;

        bot.sendMessage(chatId, messageText)
        .then(() => {
            console.log("Сообщение отправлено!");
        })
        .catch((error) => {
            console.error("Ошибка при отправке сообщения:", error);
        });
    });
});


// Запуск сервера
server.listen(5550, () => {
    console.log('Сервер запущен на http://localhost:5550');
});