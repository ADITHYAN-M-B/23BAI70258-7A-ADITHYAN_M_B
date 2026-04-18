# JWT Authentication Frontend + Backend

This experiment builds a React frontend on top of the JWT backend implemented earlier.
The frontend consumes the backend APIs, stores the JWT in sessionStorage, protects routes using the token, and clears the session on logout.

## Objective

- Build a React UI that consumes JWT APIs
- Implement session-based authentication with token stored per session
- Restrict access to pages based on login state
- Show screenshots of tested endpoints from the frontend

## Features

### 1. Login Page

- User enters username and password
- Calls the backend login API
- On success:
	- Stores JWT in sessionStorage
	- Redirects to the dashboard

### 2. Protected Dashboard Page

- Accessible only if a JWT exists in sessionStorage
- Calls the protected backend API
- Sends the token in the request header

```text
Authorization: Bearer <token>
```

### 3. Logout Functionality

- Clears session data
- Removes the token from sessionStorage
- Redirects the user back to the login page

## Tech Stack

- React
- Bootstrap
- Material UI
- Axios
- Spring Boot backend
- Spring Security
- JWT

## Backend APIs Used

The React frontend connects to these backend endpoints:

- POST http://localhost:5000/api/auth/login
- GET http://localhost:5000/api/protected
- POST http://localhost:5000/api/auth/logout

## How It Works

1. The user logs in from the React login page.
2. The backend validates credentials and returns a JWT.
3. The frontend stores the JWT in sessionStorage.
4. The dashboard checks for the token before allowing access.
5. Protected requests include the token in the Authorization header.
6. Logout removes the token and redirects the user to the login page.

## Frontend Explanation

The React frontend connects directly to the backend APIs and uses them to handle authentication and protected data access.

JWT is stored in sessionStorage after a successful login so the session remains available only for the current browser session.

Protected routes are accessed using the token from sessionStorage. If the token is present, the dashboard can load and the protected API can be called with the Bearer token in the request header.

Logout clears the session by removing the token from sessionStorage and redirecting the user back to the login page.

## Session-Based Restriction Logic

- If token exists in sessionStorage, the dashboard can be opened
- If token does not exist, the app redirects to the login page
- Protected API calls always include the JWT in the Authorization header

## Required Screenshots

Capture these screenshots after testing the frontend:

1. Login from frontend (React UI)
2. Token stored in sessionStorage (DevTools)
3. Access protected API with data visible on the UI
4. Unauthorized access redirect to login
5. Logout functionality

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   └── Dashboard.js
│   ├── App.js
│   └── index.js
```

## Installation

### Frontend

```bash
cd frontend
npm install
npm start
```

If you are creating the frontend from scratch, the key packages are:

```bash
npx create-react-app frontend
cd frontend
npm install axios bootstrap @mui/material @emotion/react @emotion/styled
```

Add Bootstrap in [frontend/src/index.js](frontend/src/index.js):

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
```

### Backend

```bash
mvn spring-boot:run
```

## Configuration

- Backend runs on port 5000
- Frontend runs on port 3001
- CORS is enabled for the frontend origin

## Default Credentials

- user123 / password123
- admin123 / admin123

## Screenshot Folder

Store screenshots in:

```text
docs/screenshots/
```

Suggested filenames:

- 01-login-success.png
- 02-sessionstorage-token.png
- 03-protected-data-visible.png
- 04-unauthorized-redirect-login.png
- 05-logout-success.png

## Notes

- The backend uses JWT authentication
- Tokens are stored only for the current browser session
- Logout clears the session and invalidates access to protected APIs
- Protected endpoints require the Bearer token header
