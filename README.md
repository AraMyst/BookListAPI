# BookListAPI

[![Live on Render](https://img.shields.io/badge/Live-Render-brightgreen)](https://booklistapi-vghq.onrender.com)

A simple RESTful API for managing your book list, built with Express and MongoDB.

---

## Table of Contents

- [About](#about)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Environment Variables](#environment-variables)  
- [Usage](#usage)  
  - [Base URL](#base-url)  
  - [Endpoints](#endpoints)  
- [Deployment](#deployment)  
- [License](#license)  

---

## About

BookListAPI is a backend service providing CRUD operations for books.  
Each book entry includes:

- **title** (string)  
- **author** (string)  
- **read** (boolean)  
- **amazon** (string) – an Amazon UK search URL  
- **recs** (array of strings) – placeholder recommendations  

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

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14+  
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or a local MongoDB instance)  

### Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/AraMyst/BookListAPI.git
   cd BookListAPI
