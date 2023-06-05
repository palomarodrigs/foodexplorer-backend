# Food Explorer | Back-end

Food Explorer is a full-stack application of an interactive menu for a fictional restaurant, developed in the end-of-course challenge of [Rocketseat](https://www.rocketseat.com.br/).

</br>

## 🍝 About

Food Explorer is an end-to-end application developed as part of a challenge, with the aim of creating an interactive menu for a fictional restaurant.</br>
It has two main personas: the administrator, responsible for the restaurant, and the user, who explores and selects the dishes. The administrator can create, view, edit and delete dishes, while the user can view all registered dishes and obtain detailed information by clicking on a specific dish. The project encompasses both the frontend and the backend, based on the layout provided in Figma.

</br>

## 🔨 Features

- [x] Create an account
- [x] Login account
- [x] Edit profile
- [x] Sign out of account
- [x] View all dishes
- [x] List dishes by title and ingredients
- [x] See the details of a specific dish
- [x] Favorite dish
- [x] Remove favorite from dish
- [x] Add items to cart
- [x] Remove items to cart
- [x] Finish order
- [x] Track order status
- [x] Admin: create new dish
- [x] Admin: update dish
- [x] Admin: delete dish
- [x] Admin: manage all orders

</br>

## 🧪 Tools

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [SqLite](https://www.sqlite.org/index.html)
- [Knex](https://knexjs.org/)
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Multer](https://www.npmjs.com/package/multer)
- [JWT](https://jwt.io/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [pm2](https://pm2.keymetrics.io/)
- [Jest](https://jestjs.io/)

</br>

## 🧭 Getting Started

> _Before you start, you need to have [Node.js](https://nodejs.org/en) installed on your machine and a code editor like [Visual Studio Code](https://code.visualstudio.com/)._

### Running the application:

- in terminal clone this project:

```bash
$ git clone https://github.com/palomarodrigs/foodexplorer-backend.git
```

- access the project folder:

```bash
$ cd foodexplorer-backend
```

- install dependencies:

```bash
$ npm install
```

- run server:

```bash
$ npm run dev

# If all goes well, this message will appear in the terminal:
Server is running on port 3000
```

- run migrations:

```bash
$ npm run migrate
```

- run seed to create admin account:

```bash
$ npx knex seed:run --specific=createUserAdmin.js
```

- run seed to create user account:

```bash
$ npx knex seed:run --specific=createUser.js
```

### Admin account access:

mail: admin@admin.com</br>
password: 232323

### User account access:

mail: user@email.com</br>
password: 123456

</br>

## 🎨 Front-end

You can access the repository through [this link](https://github.com/palomarodrigs/foodexplorer-frontend)

</br>

> ⚠️ _Because this application is hosted on a free service, the Backend "hibernates" after 15 minutes of inactivity. If you try to access the site and there is no response, wait approximately 1 minute or more as it is "initializing" the services._

---

<p align="center">Developed with ❤️ by <a href="https://www.linkedin.com/in/paloma-rodrigues-539000233/" target="_blank">Paloma Rodrigues</a></p>
