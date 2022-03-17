# Twitter-like application (frontend)
Основной стэк:
- React.js, react-dom
- Mobx, mobx-react-lite
- express для хостинга на сервере
- webpack

Клиент-серверное взаимодействие:
- [REST API на express](https://github.com/RichieVan/Twitter-like-application-backend)
- Изображения хранятся на Imgur, получение и загрузка через API
- Авторизация по access и refresh токенам, передача в формате JWT
- Роутинг происходит на клиенте

Todos:
- Переписать приложение на typescript
