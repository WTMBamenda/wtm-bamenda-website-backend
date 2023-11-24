# WTM Bamenda Website Backend

This is the backend repository for the WTM Bamenda website, designed to support the community's online presence by managing users, blog posts, events, and comments. It utilizes Node.js, Express, and MongoDB to provide a robust and scalable backend solution.

## Features

- User Authentication and Authorization
- CRUD operations for blog posts and events
- Interactive comment system for blog posts
- MVC architecture for clean and maintainable code

## Getting Started

### Prerequisites

- Node.js
- MongoDB (Local installation or MongoDB Atlas)
- npm (Node Package Manager)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/WTM-Bamenda-Backend.git
cd WTM-Bamenda-Backend
npm install
```

### Environment Setup
Create a `.env` file in the root directory with the following contents:

`DB_URI`: MongoDB connection string.
`PORT`: Port number for the server (default: 3000).

### Running the Server
Start the server with:

```bash
npm start
```

## API Endpoints
The server runs on `http://localhost:3000` by default. Below are the available routes:

### User Routes
- `POST /users/register`: Register a new user
- `POST /users/login`: Authenticate a user
- `PATCH /users/update/:id`: Update user details
- `DELETE /users/delete/:id`: Delete a user

### Event Routes
- `GET /events`: Retrieve all events
- `GET /events/:id`: Retrieve a single event by ID
- `POST /events`: Create a new event
- `PATCH /events/:id`: Update an event by ID
- `DELETE /events/:id`: Delete an event by ID

### Blog Post Routes
- `GET /blogposts`: Retrieve all blog posts
- `GET /blogposts/:id`: Retrieve a single blog post by ID
- `POST /blogposts`: Create a new blog post
- `PATCH /blogposts/:id`: Update a blog post by ID
- `DELETE /blogposts/:id`: Delete a blog post by ID

### Comment Routes
- `POST /blogposts/:blogPostId/comments`: Add a comment to a blog post
- `PATCH /blogposts/:blogPostId/comments/:commentId`: Update a comment in a blog post
- `DELETE /blogposts/:blogPostId/comments/:commentId`: Delete a comment from a blog post

## Documentation References

- [Contributing Guidelines](CONTRIBUTING.md)
- [Style Guide](STYLEGUIDE.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [License Information](LICENSE)

## Contact

- Project Maintainers: [WTM Bamenda](mailto:wtmbamenda@gmail.com)
- Project Link: [WTM Bamenda Backend](https://github.com/WTMBamenda/wtm-bamenda-website-backend)

## Acknowledgments

- [Node.js Community](https://nodejs.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Contributors](https://expressjs.com/)
