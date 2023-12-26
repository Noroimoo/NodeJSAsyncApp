# Асинхронная обработка HTTP-запросов

Этот проект включает в себя микросервисы для асинхронной обработки HTTP-запросов с использованием Node.js и RabbitMQ.

## Обновление
Был добавлен пользовательский интерфейс в `index.html` и сервер `server.js` чтобы не нужно было использовать postman или другие аддоны.

## Описание

- **Микросервис M1** принимает HTTP POST-запросы и отправляет задачи в RabbitMQ.
- **Микросервис M2** асинхронно обрабатывает эти задачи.
- **Сервер** служит посредником между клиентским интерфейсом и микросервисами.

## Установка

1. Убедитесь что у вас установлены Node.js и RabbitMQ. Для работы RabbitMQ нужен Erlang.
2. Клонируйте репозиторий с помощью `git clone https://github.com/Noroimoo/NodeJSAsyncApp.git`.
3. Перейдите в проект с помощью `cd <name>`.
4. Установите зависимости с помощью `npm install`.

## Запуск проекта

1. Запустите RabbitMQ.
2. Запустите  микросервисы M1 и M2 в разных терминалах, перейдите в папку сервера и используйте команду `node microservice1.js` и `node microservice2.js`.  Можно так же использовать команду `npm run start` и `npm run start2` для быстрого запуска микросервисов. (Опционально: Можно запустить server.js с помошью node server.js. Затем откройте файл `index.html` в веб-браузере для отправки HTTP POST-запросов через пользовательский интерфейс. В качестве альтернативы можно использовать такие инструменты, как Postman или REST Client для VSCode. Результат отправленого кода будет отображаться на сайте под кнопкой "SEND" спустя несколько секунд.)
4. Отправьте HTTP POST-запрос по адресу `http://localhost:3000/tasks` с числом в теле запроса, например, `{ "number": 5151 }`.
5. Микросервис M1 получит запрос и отправит задачу в RabbitMQ.
6. Микросервис M2 обработает задачу и отправит результат обратно в RabbitMQ.
7. Логи сохраняются в файлах `combined.log` и `error.log` в директории сервера.
