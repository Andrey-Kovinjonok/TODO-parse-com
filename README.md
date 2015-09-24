README.md

1) npm install

2) создать postgresql базу с именем todos  по умолчанию без пароля.
  Для работы с паролем, задать нужно в server/DbStorage.js )
  new Sequelize('todos', 'postgres', ''/*password for database*/, {

3) запуск express сервера для работы с базой данных из папки проекта
  node_modules/.bin/babel-node src/server/dbServer.js

4) Запуск devWebpackServer with hotreload
  npm start

5) открыть в браузере
  hotreload
  http://localhost:4000/webpack-dev-server/
  или
  http://localhost:4000/
