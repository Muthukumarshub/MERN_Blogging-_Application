# Blog App Client

This is the client-side of the Blog App, built using React. It allows users to log in, register, and interact with blog posts.

## Features

- User authentication (login and registration)
- View a list of blog posts
- Create new blog posts
- View individual blog post details

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/blog-app.git
   ```
2. Navigate to the client directory
   ```bash
   cd blog-app/client
   ```
3. Install the dependencies
   ```bash
   npm install
   ```

### Running the Application

To start the client application, run:

```bash
npm start
```

The application will be running on [http://localhost:3000](http://localhost:3000).

## Folder Structure

```
client
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── Auth
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── Blog
│   │   │   ├── BlogList.js
│   │   │   ├── BlogPost.js
│   │   │   └── CreatePost.js
│   │   └── Layout
│   │       ├── Header.js
│   │       └── Footer.js
│   ├── App.js
│   └── index.js
└── package.json
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.