# README for Server

This is the server-side of the MERN stack blogging application. It handles all backend functionalities, including user authentication and blog post management.

## Features

- User authentication (login and registration)
- CRUD operations for blog posts
- RESTful API endpoints

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the server directory:
   ```
   cd server
   ```

3. Install the dependencies:
   ```
   npm install
   ```

### Configuration

- Update the `config.js` file with your MongoDB connection string and any other necessary configurations.

### Running the Server

To start the server, run:
```
npm start
```

The server will run on `http://localhost:5000` by default.

### API Endpoints

- **Authentication**
  - `POST /api/auth/login` - Login a user
  - `POST /api/auth/register` - Register a new user

- **Blog Posts**
  - `GET /api/blog` - Retrieve all blog posts
  - `GET /api/blog/:id` - Retrieve a single blog post
  - `POST /api/blog` - Create a new blog post
  - `PUT /api/blog/:id` - Update a blog post
  - `DELETE /api/blog/:id` - Delete a blog post

## License

This project is licensed under the MIT License.