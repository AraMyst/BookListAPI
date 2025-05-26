# BookListAPI

A simple RESTful API for managing your book list, built with **Express** and **MongoDB**.

---
## About

**BookListAPI** is a backend service providing CRUD operations for books. Each book entry includes a title, author, read status, an Amazon UK search URL, and mock recommendations.

---

## Features

- **Create** a new book (title, author, read flag)  
- **Read** all books or a single book by ID  
- **Update** title, author, or mark as read  
- **Delete** a book by ID  
- Automatic generation of Amazon UK search URLs  
- Placeholder for future Product Advertising API recommendations  

---
## Tech Stack

- **Node.js**  
- **Express**  
- **Mongoose** (MongoDB ODM)  
- **dotenv** (environment variable management)  
