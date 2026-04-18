# Experiment 9

This project demonstrates a full-stack **Role-Based Access Control (RBAC)** application built with a Spring Boot backend and a React frontend. The frontend authenticates with HTTP Basic Auth, stores the current session in `sessionStorage`, and changes the UI based on the logged-in user's role.

## Explanation

### React frontend integrates RBAC backend
The React frontend communicates directly with the Spring Boot backend to perform authentication and fetch protected data. The backend is the source of truth for authorization, while the frontend provides the user interface and route control for the logged-in role.

### Role stored in `sessionStorage`
After a successful login, the app stores the user's role in `sessionStorage` so the role survives page refreshes during the current browser session. This allows the app to keep the user on the correct dashboard without requiring a new login every time the page reloads.

### UI changes based on role
The visible UI changes depending on whether the user is logged in as `USER` or `ADMIN`. A `USER` sees the user dashboard and user-level actions, while an `ADMIN` sees the admin dashboard and additional management controls.

### Secure API calls enforced
All protected API requests use HTTP Basic Auth and are sent with the proper authorization header. If the user is not authenticated or does not have the required role, the backend returns `401 Unauthorized` or `403 Forbidden`, and the frontend handles that response accordingly.

## Features

- Role-based routing for `USER` and `ADMIN`
- Secure API calls using HTTP Basic Auth
- Login session persisted in `sessionStorage`
- Protected routes with access-denied handling
- Backend authorization using Spring Security
- Demo users seeded on application startup

## Tech Stack

- Frontend: React
- Backend: Spring Boot
- Security: Spring Security + HTTP Basic Auth
- Database: H2 in-memory database
- Build tools: Maven and npm

## Project Flow

1. The user enters a username and password on the login page.
2. The frontend sends the credentials to the backend login API.
3. The backend validates the user and returns the assigned role.
4. The frontend stores the authentication data in `sessionStorage`.
5. The UI redirects the user to the correct dashboard based on the role.
6. Protected APIs allow or deny access according to Spring Security rules.

## Role-Based Access

- `USER` can access user pages and user APIs.
- `ADMIN` can access both admin pages and user APIs.
- Unauthenticated users are redirected to the login page.
- Unauthorized page access shows an access denied message.

## Demo Credentials

| Username | Password | Role |
|----------|----------|------|
| user1    | user123  | USER |
| admin1   | admin123 | ADMIN |

## Setup Instructions

### Backend

```bash
mvn clean install
mvn spring-boot:run
```

Backend runs at `http://localhost:8080`.

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at `http://localhost:3001`.

## Testing Steps

1. Open the frontend in the browser.
2. Log in as `user1 / user123`.
3. Verify the user dashboard loads.
4. Try an admin-only action and confirm it is denied.
5. Log out and log in as `admin1 / admin123`.
6. Verify the admin dashboard loads.
7. Check `sessionStorage` to confirm the auth data is stored.

## Notes

- This project is intended for learning and demonstration.
- `sessionStorage` is used only for the demo flow.
- The backend security rules should remain the source of truth for authorization.
