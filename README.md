# Game Management System

## Project Overview
This project is a **Game Management System** built using **Node.js** and **Express**, with **MongoDB** as the database.  
It includes **user and game management functionalities** via dedicated web interfaces.

---

## Table of Contents
1. [Setup and Installation](#setup-and-installation)
2. [Project Structure](#project-structure)
3. [Features](#features)
4. [API Endpoints](#api-endpoints)
5. [Usage](#usage)
6. [Code Snippets](#code-snippets)
7. [Future Enhancements](#future-enhancements)

---

## 1. Setup and Installation

### Prerequisites
- **Node.js** (version 14 or above)
- **MongoDB** (local or Atlas)

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-folder>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the MongoDB server (if running locally):
   ```bash
   mongod
   ```
5. Run the application:
   ```bash
   npm start
   ```
6. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 2. Project Structure
```
project-folder/
│
├── public/                # Static files (HTML, CSS, JavaScript, images)
│   ├── admin.html         # User management interface
│   ├── admin-games.html   # Game management interface
│   ├── game-details.html  # Game details page
│   ├── speed-home.html    # Homepage
│   ├── speed-signin.html  # Sign-in page
│   ├── styles.css         # CSS styles
│   └── scripts.js         # Client-side logic
│
├── server.js             # Main server file
├── package.json          # Project metadata and dependencies
└── README.md             # Documentation
```

---

## 3. Features

### User Management
- Add, edit, delete, and search for users.
- Password management (plain text currently; **encryption recommended**).

### Game Management
- Add, edit, delete, and search for games.
- Support for **uploading and displaying game images**.

### API
- **RESTful API** for user and game data management.

---

## 4. API Endpoints

### User Endpoints
| Method | Endpoint         | Description                   |
|--------|------------------|-------------------------------|
| GET    | `/users`         | Retrieve all users            |
| GET    | `/search`        | Search users by username      |
| POST   | `/add`           | Add a new user                |
| PUT    | `/update/:id`    | Update user details           |
| DELETE | `/delete/:id`    | Delete a user                 |

### Game Endpoints
| Method | Endpoint         | Description                   |
|--------|------------------|-------------------------------|
| GET    | `/games`         | Retrieve all games            |
| GET    | `/games/:id`     | Retrieve a game by ID         |
| POST   | `/games`         | Add a new game                |
| PUT    | `/games/:id`     | Update game details           |
| DELETE | `/games/:id`     | Delete a game                 |

---

## 5. Usage

### Accessing User Management
1. Navigate to `/admin` to access the **user management** interface.
2. Perform actions such as **adding, editing, deleting, or searching** for users.

### Accessing Game Management
1. Navigate to `/admin-games` to manage games.
2. Use the provided forms to **add, edit, or delete** games.
3. Use the search bar to **find specific games**.

---

## 6. Code Snippets

### Game Details Page (HTML + CSS + JavaScript)
```html
<div class="game-details">
    <h2>Game Title</h2>
    <p>Description of the game.</p>
</div>
```

### Homepage (HTML + CSS + JavaScript)
```html
<h1>Welcome to the Game Management System</h1>
```

### Sign-in Page and Login Logic (HTML + CSS + JavaScript)
```html
<form action="/login" method="POST">
    <input type="text" name="username" placeholder="Enter username">
    <input type="password" name="password" placeholder="Enter password">
    <button type="submit">Login</button>
</form>
```

---

## 7. Future Enhancements

### Security
- Implement **password hashing** using `bcrypt`.
- Use **JSON Web Tokens (JWT)** for authentication.

### Performance
- Add **caching** for frequently accessed endpoints.

### User Experience
- Enhance UI/UX with frameworks like **Bootstrap** or **TailwindCSS**.

### Additional Features
- Allow users to **upload images** for games via the interface.
- Add **role-based access control** (e.g., admin vs. user).

---

This documentation provides a comprehensive guide to understanding and working with the **Game Management System**.  
For further queries, feel free to **contact the project maintainer**.
