# 📚 BookListAPI

A minimalist, RESTful service for managing your personal reading list – powered by **Express 5** and **MongoDB (Mongoose 8)**. Each book record automatically includes an Amazon UK search link and placeholder recommendations, making it an ideal starting point for further e‑commerce integrations.

> **Live demo →** https://booklistapi-vghq.onrender.com/

---

## ✨ Features

|                            |                                                                |
| -------------------------- | -------------------------------------------------------------- |
| ➕ **Create books**         | `title`, `author`, optional `read` flag and custom Amazon URL. |
| 🔍 **Read books**          | Fetch **all** books or a **single** record by ID.              |
| ✏️ **Update books**        | Edit title/author, toggle `read`, or override the Amazon link. |
| ❌ **Delete books**         | Remove an entry by ID.                                         |
| 🔗 **Amazon helper**       | Builds a UK search URL if none supplied.                       |
| 🤖 **Recommendation stub** | Service layer prepared for Product Advertising API calls.      |
| 🩺 **Health‑check**        | `GET /` confirms the service is alive.                         |

---

## 🛠 Tech Stack

| Layer     | Technology        | Purpose / Notes                            |
| --------- | ----------------- | ------------------------------------------ |
| Runtime   | **Node.js 20**    | Modern LTS.                                |
| Framework | **Express 5**     | Async/await friendly routing & middleware. |
| Database  | **MongoDB Atlas** | Cloud document database (local ok too).    |
| ODM       | **Mongoose 8**    | Schema enforcement & validation.           |
| Config    | **dotenv**        | Loads secrets from `.env`.                 |

---

## 📑 Endpoints

### Health‑check

| Method | Endpoint | Description                             |
| ------ | -------- | --------------------------------------- |
| GET    | `/`      | Returns *BookListAPI is up and running* |

### Books CRUD

| Method | Endpoint     | Payload                               | Description                                                                      |
| ------ | ------------ | ------------------------------------- | -------------------------------------------------------------------------------- |
| POST   | `/books`     | `{ title, author, read?, amazon? }`   | Create a book. Amazon link is auto‑generated if omitted.                         |
| GET    | `/books`     | –                                     | List all books.                                                                  |
| GET    | `/books/:id` | –                                     | Get a single book by Mongo `_id`.                                                |
| PUT    | `/books/:id` | `{ title?, author?, read?, amazon? }` | Update a book. Omitting `amazon` triggers regeneration when title/author change. |
| DELETE | `/books/:id` | –                                     | Remove a book.                                                                   |

---

## 🏗 Project Structure

```
src/
├── app.js            # Express setup & Mongo connection
├── controllers/
│   └── book.js       # CRUD logic
├── models/
│   └── Book.js       # Mongoose schema/model
├── routes/
│   └── books.js      # Books router
├── services/
│   └── amazon.js     # Amazon URL builder + rec stub
└── .env.sample       # Config template
```
