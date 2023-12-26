# Асинхронная обработка HTTP-запросов

Этот проект включает в себя микросервисы для асинхронной обработки HTTP-запросов с использованием Node.js и RabbitMQ.

## Описание

- **Микросервис M1** принимает HTTP POST-запросы и отправляет задачи в RabbitMQ.
- **Микросервис M2** асинхронно обрабатывает эти задачи.


## Установка

1. Убедитесь что у вас установлены Node.js и RabbitMQ. Для работы RabbitMQ нужен Erlang
2. Клонируйте репозиторий с помощью `git clone <repolonk>`.
3. Перейдите в проект с помощью `cd <name>`.
4. Установите зависимости с помощью `npm install`.

## Запуск проекта

1. Запустите RabbitMQ.
2. Запустите каждый микросервис в отдельном окне терминала с помощью `cd server` => `node <имя файла микросервиса>`.
3. Отправьте HTTP POST-запрос на `http://localhost:3000/tasks` с числом в теле запроса. Например, `{ "number": 5151 }`. При тестировании использовался Postman. Данный аддон вы можете скачать в VScode. В аддоне выберите "POST" в качестве типа запроса, введите URL(`http://localhost:3000/tasks`), переключитесь на вкладку "Body", выберите "raw" и "JSON", и введите JSON запрос. Затем нажмите на `Send`/
4. Микросервис M1 получит запрос и отправит задачу в RabbitMQ.
5. Микросервис M2 обработает задачу и отправит результат обратно в RabbitMQ.
6. Логи сохраняются в combined.log и error.log в папке server