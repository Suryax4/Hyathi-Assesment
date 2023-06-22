# Pokemon Adoption API

This is a RESTful API for managing Pokemon adoption. Users can register, login, view available Pokemon for adoption, and adopt Pokemon.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken
- express-validator

## Getting Started

### Prerequisites

- Node.js (https://nodejs.org)
- MongoDB (https://www.mongodb.com)

### Installation

1. Clone the repository:

   git clone https://github.com/your-username/pokemon-adoption-api.git

2. Install the dependencies:

   cd pokemon-adoption-api
   npm install

3. Configure the MongoDB connection:

   - Open `server.js` file.
   - Modify the MongoDB connection URL for MongoDB configuration.

4. Start the server:

   npm start

   The server will start running at http://localhost:5010.

## API Endpoints

- `POST /pokemon/initialize` - Initialize pre-filled Pokemon 
- `POST /register` - Register a new user
- `POST /login` - User login
- `GET /pokemon` - Get available Pokemon for adoption (requires authentication)
- `POST /pokemon/:id/adopt` - Adopt a Pokemon (requires authentication)
- `POST /pokemon/feed` - Feed an Adopted Pokemon (requires authentication)

Please refer to the code or the `routes.js` file for detailed information on request payloads and responses for each endpoint.

## Authentication

The API uses JSON Web Tokens (JWT) for authentication. After successful registration or login, a JWT token will be returned in the response. Include this token in the `Authorization` header of subsequent requests as a Bearer token.

Example:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

## Error Handling

- Validation errors for registration and login requests will return a 400 status code along with detailed error messages in the response body.
- Unauthorized access to protected routes will return a 401 status code with an appropriate error message.
- Other server errors will return a 500 status code with a generic error message.

## License

This project is licensed under the MIT License.
