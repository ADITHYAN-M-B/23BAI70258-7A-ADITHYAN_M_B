# Experiment 7 — Spring Boot RBAC with Spring Security

A production-ready **Role-Based Access Control (RBAC)** backend built with
Spring Boot 3.2 and Spring Security.  
Authentication uses **HTTP Basic Auth** plus a **custom JSON login API**.  
Passwords are encoded with **BCrypt**.  
The datastore is an **H2 in-memory database** seeded with two users.

---

## 📁 Project Structure

```
src/main/java/com/example/experiment7/
├── Experiment7Application.java          ← Boot entry point
├── config/
│   └── SecurityConfig.java             ← CSRF, filter chain, role rules
├── controller/
│   ├── AuthController.java             ← POST /api/auth/login
│   ├── PublicController.java           ← GET  /api/public/**
│   ├── UserController.java             ← GET  /api/user/**
│   └── AdminController.java            ← GET  /api/admin/**
├── dto/
│   ├── LoginRequest.java
│   └── LoginResponse.java
├── entity/
│   ├── User.java
│   └── Role.java  (enum)
├── repository/
│   └── UserRepository.java
└── service/
    ├── CustomUserDetailsService.java
    └── AuthService.java

src/main/resources/
├── application.properties
└── data.sql                            ← Preloaded users

src/screenshots/
├── Admin access admin endpoint.png
├── Database.png
├── Denied admin access.png
├── No Auth.png
├── Public endpoint.png
├── User access user endpoint.png
└── User login success.png
```


---

## 🔑 Pre-loaded Users

| Username | Password  | Role        |
|----------|-----------|-------------|
| user1    | user123   | ROLE_USER   |
| admin1   | admin123  | ROLE_ADMIN  |

---

## 🌐 API Endpoints

| Method | URL                      | Access            | Description               |
|--------|--------------------------|-------------------|---------------------------|
| GET    | /api/public/hello        | Everyone          | Public greeting           |
| GET    | /api/public/info         | Everyone          | App info                  |
| GET    | /api/auth/status         | Everyone          | Auth service status       |
| POST   | /api/auth/login          | Everyone          | JSON login endpoint       |
| GET    | /api/user/profile        | USER, ADMIN       | User profile              |
| GET    | /api/user/me             | USER, ADMIN       | Current user details      |
| GET    | /api/admin/dashboard     | ADMIN only        | Admin dashboard           |
| GET    | /api/admin/users         | ADMIN only        | List all users            |
| GET    | /api/admin/stats         | ADMIN only        | System statistics         |

---

## ⚙️ Setup Instructions

### Prerequisites
- Java 17+
- Maven 3.8+

### Steps

```bash
# 1. Clone / download the project
cd experiment7

# 2. Build the project
mvn clean package -DskipTests

# 3. Run the application
mvn spring-boot:run
# OR
java -jar target/experiment7-0.0.1-SNAPSHOT.jar

# 4. Application starts at http://localhost:8080
```

### H2 Console (Database Viewer)
Open `http://localhost:8080/h2-console` in a browser.

| Field    | Value                                      |
|----------|--------------------------------------------|
| JDBC URL | `jdbc:h2:mem:rbacdb`                       |
| Username | `sa`                                       |
| Password | *(leave blank)*                            |

---

## 🧪 Postman Testing Guide

### Two Authentication Methods

**Method A — HTTP Basic Auth** (easiest for testing)  
In Postman → Authorization tab → Type: Basic Auth → enter username/password

**Method B — JSON Login API**  
Send a POST request to `/api/auth/login` with a JSON body, then use the
returned credentials in subsequent requests via HTTP Basic.

---

### Test 1 — ✅ Public endpoint (no auth needed)

```
GET http://localhost:8080/api/public/hello
```

**Expected → 200 OK**
```json
{
  "message": "This is a public endpoint",
  "access": "Everyone"
}
```

📸 Screenshot tip: No Authorization header needed — send directly.

---

### Test 2 — ✅ USER accesses user endpoint

```
GET http://localhost:8080/api/user/profile
Authorization: Basic Auth → user1 / user123
```

**Expected → 200 OK**
```json
{
  "message":  "Welcome, authenticated user",
  "username": "user1",
  "roles":    "ROLE_USER"
}
```

📸 Screenshot tip: Show the Authorization tab set to Basic Auth with user1 credentials.

---

### Test 3 — ❌ USER denied admin access (403)

```
GET http://localhost:8080/api/admin/dashboard
Authorization: Basic Auth → user1 / user123
```

**Expected → 403 Forbidden**
```json
{
  "status":  403,
  "error":   "Forbidden",
  "message": "You do not have permission to access this resource"
}
```

📸 Screenshot tip: Show the 403 status code in Postman's response pane.

---

### Test 4 — ✅ ADMIN accesses admin endpoint

```
GET http://localhost:8080/api/admin/dashboard
Authorization: Basic Auth → admin1 / admin123
```

**Expected → 200 OK**
```json
{
  "message":  "Welcome, admin",
  "username": "admin1",
  "access":   "ADMIN only"
}
```

📸 Screenshot tip: Show the Authorization tab set to Basic Auth with admin1 credentials.

---

### Test 5 — ❌ No auth → 401 Unauthorized

```
GET http://localhost:8080/api/user/profile
(No Authorization header)
```

**Expected → 401 Unauthorized**
```json
{
  "status":  401,
  "error":   "Unauthorized",
  "message": "Authentication required. Provide valid credentials via HTTP Basic or POST /api/auth/login"
}
```

📸 Screenshot tip: Remove any Authorization header and send the request.

---

### Test 6 — ✅ JSON Login API

```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "username": "admin1",
  "password": "admin123"
}
```

**Expected → 200 OK**
```json
{
  "username": "admin1",
  "roles":    ["ROLE_ADMIN"],
  "message":  "Login successful"
}
```

---

### Test 7 — ✅ ADMIN lists all users

```
GET http://localhost:8080/api/admin/users
Authorization: Basic Auth → admin1 / admin123
```

**Expected → 200 OK** — array of user objects

---

## 🛡️ Security Summary

| Scenario                        | Result           |
|---------------------------------|------------------|
| No credentials                  | 401 Unauthorized |
| Wrong password                  | 401 Unauthorized |
| ROLE_USER → /api/admin/**       | 403 Forbidden    |
| ROLE_USER → /api/user/**        | 200 OK           |
| ROLE_ADMIN → /api/admin/**      | 200 OK           |
| ROLE_ADMIN → /api/user/**       | 200 OK           |
| Anyone → /api/public/**         | 200 OK           |

---

## 🏗️ Architecture Notes

- **CSRF disabled** — appropriate for stateless REST APIs
- **BCrypt** strength 10 is used for all passwords
- **DaoAuthenticationProvider** wires the UserDetailsService + PasswordEncoder
- **@PreAuthorize** annotations on controller methods add a second layer of defence
- **Custom entry points** return JSON (not HTML) for 401 and 403 errors
- **H2 Console** is accessible at `/h2-console` for development inspection
