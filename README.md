# Twitter-like application (frontend)
Основной стэк:
- React.js, react-dom
- Mobx, mobx-react-lite
- express для хостинга на сервере
- webpack

Клиент-серверное взаимодействие:
- REST API на express
- Изображения хранятся на Imgur, получение и загрузка через API
- Авторизация по access и refresh токенам, передача в формате JWT
- Роутинг происходит на клиенте

Todos:
- Рефаторинг, изменение структуры, реализация по БЭМ
- Переписать приложение на typescript
