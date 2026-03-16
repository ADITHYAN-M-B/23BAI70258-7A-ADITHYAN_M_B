# JWT Authentication Backend (Spring Boot)

This project implements JWT-based authentication in Spring Boot with the following required capabilities:

- Login with username/password and JWT token generation
- Access control for protected routes using Bearer token
- Stateless session management using JWT validation
- Logout with token invalidation using a blacklist

The implementation is designed for assignment submission and includes a complete Postman testing flow.

## Objective

- Implement authentication in backend APIs using JWT
- Manage user sessions using stateless token-based auth
- Validate token flow in Postman with clear screenshot evidence

## Tech Stack

- Java 21
- Spring Boot 3.3.2
- Spring Web
- Spring Security
- Spring Validation
- Spring Data JPA
- H2 (runtime dependency)
- JJWT (jjwt-api, jjwt-impl, jjwt-jackson)
- Maven

## Project Structure

```text
jwt-auth-springboot/
├── docs/
│   └── screenshots/
│       └── .gitkeep
├── src/
│   └── main/
│       ├── java/com/example/jwtauth/
│       │   ├── config/
│       │   │   ├── JwtAuthenticationFilter.java
│       │   │   └── SecurityConfig.java
│       │   ├── controller/
│       │   │   ├── AuthController.java
│       │   │   └── ProtectedController.java
│       │   ├── dto/
│       │   │   ├── AuthResponse.java
│       │   │   ├── LoginRequest.java
│       │   │   └── MessageResponse.java
│       │   ├── model/
│       │   │   └── UserModel.java
│       │   ├── service/
│       │   │   ├── CustomUserDetailsService.java
│       │   │   ├── JwtService.java
│       │   │   └── TokenBlacklistService.java
│       │   └── JwtAuthApplication.java
│       └── resources/
│           └── application.properties
├── .env.example
├── pom.xml
└── README.md
```

## Assignment Suggested Structure vs Spring Boot Equivalent

The assignment example is shown in Node/Express style. This repository uses Spring Boot conventions while preserving identical responsibilities.

| Suggested Item | Responsibility | Spring Boot Equivalent |
|---|---|---|
| src/controllers/authController.js | Login/logout/token endpoints | src/main/java/com/example/jwtauth/controller/AuthController.java |
| src/middleware/authMiddleware.js | Verify JWT on protected APIs | src/main/java/com/example/jwtauth/config/JwtAuthenticationFilter.java |
| src/models/userModel.js | User auth model | src/main/java/com/example/jwtauth/model/UserModel.java |
| src/routes/authRoutes.js | Route mapping | Route annotations in AuthController and ProtectedController |
| src/server.js | App startup and middleware wiring | JwtAuthApplication + SecurityConfig |
| .env | Runtime configuration | application.properties + env vars |

## Implementation Details

### 1) Security Configuration

File: src/main/java/com/example/jwtauth/config/SecurityConfig.java

- Disables CSRF for API usage
- Configures stateless session policy
- Allows public access to login endpoint
- Protects all remaining endpoints
- Registers JWT filter before UsernamePasswordAuthenticationFilter

### 2) JWT Filter

File: src/main/java/com/example/jwtauth/config/JwtAuthenticationFilter.java

Responsibilities:

- Reads Authorization header
- Validates Bearer format
- Rejects blacklisted tokens
- Parses token and extracts username
- Loads user details and validates token
- Sets authentication in SecurityContext

Error behavior:

- Invalid/expired token -> 401
- Blacklisted token -> 401 with invalidation message

### 3) Auth Controller

File: src/main/java/com/example/jwtauth/controller/AuthController.java

Endpoints:

- POST /api/auth/login
  - Validates credentials using AuthenticationManager
  - Generates JWT via JwtService
  - Returns token payload in AuthResponse

- POST /api/auth/logout
  - Reads Authorization header
  - Extracts token from Bearer value
  - Adds token to blacklist
  - Returns logout success message

### 4) Protected Controller

File: src/main/java/com/example/jwtauth/controller/ProtectedController.java

- GET /api/protected requires valid JWT
- Returns confirmation message and authenticated user info

### 5) JWT Service

File: src/main/java/com/example/jwtauth/service/JwtService.java

- Signs tokens with configured secret key
- Adds claims (role) and expiration
- Extracts username from token
- Validates username match + expiration

### 6) Session Management / Token Invalidation

File: src/main/java/com/example/jwtauth/service/TokenBlacklistService.java

- Maintains in-memory set of invalidated tokens
- Logout adds current token to blacklist
- Filter checks blacklist before authenticating token

Note: In production, use Redis or database-backed blacklist with expiry cleanup.

### 7) Demo User Store

File: src/main/java/com/example/jwtauth/service/CustomUserDetailsService.java

- In-memory demo users are created at startup
- Passwords are encoded with BCrypt

Default credentials:

1. user123 / password123
2. admin123 / admin123

## Configuration

File: src/main/resources/application.properties

- server.port=5000
- jwt.secret from env or fallback value
- jwt.expiration-ms from env or fallback value

Optional environment variables:

- JWT_SECRET
- JWT_EXPIRATION_MS

PowerShell example:

```powershell
$env:JWT_SECRET="TXlTdXBlclNlY3JldEtleUZvckpXVEF1dGhEZW1vQXBwMDEyMzQ1Njc4OTA="
$env:JWT_EXPIRATION_MS="3600000"
```

## API Documentation

Base URL:

http://localhost:5000

### 1) Login

- Method: POST
- URL: /api/auth/login
- Public: Yes
- Body:

```json
{
  "username": "user123",
  "password": "password123"
}
```

Success response (200):

```json
{
  "token": "<jwt_token>",
  "tokenType": "Bearer",
  "expiresIn": 3600,
  "username": "user123"
}
```

### 2) Protected Route

- Method: GET
- URL: /api/protected
- Public: No
- Header:

```text
Authorization: Bearer <jwt_token>
```

Success response (200):

```json
{
  "message": "Access granted to protected route",
  "username": "user123",
  "authorities": [
    {
      "authority": "ROLE_USER"
    }
  ]
}
```

### 3) Logout

- Method: POST
- URL: /api/auth/logout
- Public: No
- Header:

```text
Authorization: Bearer <jwt_token>
```

Success response (200):

```json
{
  "message": "Logged out successfully. Token invalidated."
}
```

After logout, the same token must fail on protected endpoints with 401.

## Authentication Flow

1. Client sends username/password to /api/auth/login
2. Server validates credentials and returns JWT token
3. Client sends token as Bearer token in Authorization header
4. JWT filter validates token and sets security context
5. Protected endpoint is accessible only when token is valid
6. On logout, token is blacklisted and cannot be reused

## Run the Project

1. Open terminal in project root
2. Build/test

```bash
mvn clean test
```

3. Run app

```bash
mvn spring-boot:run
```

4. Use Postman for endpoint testing

## Postman Step-by-Step Demonstration

### Request A: Login

1. Create POST request to http://localhost:5000/api/auth/login
2. Add JSON body with user credentials
3. Send request
4. Copy token from response


### Request B: Protected API with Token

1. Create GET request to http://localhost:5000/api/protected
2. Set header: Authorization = Bearer <token>
3. Send request


### Request C: Logout + Invalidated Token

1. Send POST to http://localhost:5000/api/auth/logout with same Authorization header
2. Re-send GET /api/protected with same old token
3. Confirm request fails with 401


## Required Screenshots Folder

Screenshots in:

1. 01-login-success.png
2. 02-protected-route-success.png
3. 03-logout-and-token-invalid.png

## Validation Notes

- Authorization header must include Bearer prefix
- If only raw token is sent without Bearer, protected API will fail
- Token may fail if expired or previously blacklisted

## Production Improvement Notes

- Replace in-memory users with persistent user table
- Replace in-memory blacklist with Redis/database and TTL
- Add refresh token strategy
- Add rate limiting and audit logging
- Add integration tests for full auth flow


