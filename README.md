# 👨‍💼 Employee Management System

A full-stack **Employee Management System** built using **React, Spring Boot, Spring Data JPA, and MySQL**.

The application provides complete employee CRUD operations along with **pagination, sorting, configurable page size, validation, exception handling, and database seeding**.

---

## 🚀 Features

* ✅ Create Employee
* ✅ View Employees
* ✅ Update Employee
* ✅ Delete Employee
* ✅ Employee validation
* ✅ Duplicate email handling
* ✅ Global exception handling
* ✅ Pagination
* ✅ Sorting by employee fields
* ✅ Ascending / Descending sorting
* ✅ Configurable page size
* ✅ 100+ employee records for testing
* ✅ RESTful APIs
* ✅ MySQL database integration
* ✅ Responsive Bootstrap-based UI

---

## 🛠️ Tech Stack

### Frontend

* React
* JavaScript
* Axios
* Bootstrap
* HTML
* CSS

### Backend

* Java
* Spring Boot
* Spring MVC
* Spring Data JPA
* Hibernate
* Maven

### Database

* MySQL

---

## 🏗️ Project Architecture

```text
                ┌──────────────────────┐
                │    React Frontend    │
                │      + Bootstrap     │
                └──────────┬───────────┘
                           │
                       REST API
                           │
                           ▼
                ┌──────────────────────┐
                │   Spring Boot API    │
                └──────────┬───────────┘
                           │
                     Controller
                           │
                           ▼
                       Service
                           │
                           ▼
                     Repository
                           │
                           ▼
                ┌──────────────────────┐
                │    MySQL Database    │
                └──────────────────────┘
```

---

## 📁 Project Structure

```text
ems/
│
├── ems_backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/ems/
│   │   │   │   ├── config/
│   │   │   │   ├── controller/
│   │   │   │   ├── dto/
│   │   │   │   ├── entity/
│   │   │   │   ├── exception/
│   │   │   │   ├── mapper/
│   │   │   │   ├── repository/
│   │   │   │   └── service/
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   └── mvnw
│
└── ems_frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── services/
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── package-lock.json
```

---

## 📸 Screenshots

<img width="552" height="370" alt="11" src="https://github.com/user-attachments/assets/a6e26e33-93c6-4506-91e8-3bdb44a1d443" />


<img width="1057" height="597" alt="112" src="https://github.com/user-attachments/assets/0641a7cb-766c-4883-a02f-90b8a016350e" />


<img width="1063" height="611" alt="113" src="https://github.com/user-attachments/assets/71a2be8b-ec3a-4511-bcc5-bdc88a53aba7" />


---

## 🔄 CRUD Operations

### Create

Users can add a new employee through the React frontend.

```text
React Form
    ↓
POST /api/employees
    ↓
Spring Boot Controller
    ↓
Service Layer
    ↓
JPA Repository
    ↓
MySQL
```

### Read

Employees can be retrieved through the REST API with pagination and sorting.

```text
GET /api/employees?pageNo=0&pageSize=10&sortBy=id&sortDir=asc
```

### Update

Existing employee information can be modified through the edit functionality.

```text
PUT /api/employees/{id}
```

### Delete

Employees can be removed from the system.

```text
DELETE /api/employees/{id}
```

---

## 📄 Pagination & Sorting

The employee list supports server-side pagination and sorting.

Example:

```text
/api/employees?pageNo=0&pageSize=10&sortBy=firstName&sortDir=asc
```

Supported page sizes:

```text
5
10
20
50
```

Supported sorting fields include:

```text
ID
First Name
Last Name
Email
```

---

## 🗄️ Database

The application uses **MySQL** for persistent employee data.

The backend communicates with MySQL through:

```text
Spring Data JPA
        ↓
Hibernate
        ↓
MySQL
```

The project also includes a data seeder that can populate the database with dummy employee records for testing pagination and sorting.

---

## 🔐 Configuration & Security

Database credentials are **not hardcoded into the source code**.

Configuration uses environment variables.

A safe example configuration is provided through:

```text
.env.example
```

Actual credentials should remain local and should **never be committed to GitHub**.

---

## ▶️ Running the Project

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd ems
```

### 2. Start the Backend

```bash
cd ems_backend
```

Set the required database environment variables and run:

```bash
.\mvnw.cmd spring-boot:run
```

Backend:

```text
http://localhost:8080
```

### 3. Start the Frontend

Open another terminal:

```bash
cd ems_frontend
npm install
npm start
```

Frontend:

```text
http://localhost:3000
```

---

## 🧪 Testing

The application has been tested for:

* Employee creation
* Employee retrieval
* Employee update
* Employee deletion
* Duplicate email validation
* Invalid employee data
* Non-existent employee handling
* Pagination
* Page-size changes
* Sorting
* Invalid sorting fields
* Empty pagination pages
* Backend compilation
* Frontend production build

---

## 🎯 Learning Objectives

This project demonstrates practical understanding of:

* React fundamentals
* REST APIs
* Spring Boot
* Layered backend architecture
* Dependency Injection
* Spring Data JPA
* Hibernate / ORM
* DTOs
* Entity mapping
* Exception handling
* Validation
* MySQL
* Pagination
* Sorting
* Frontend-backend integration

---

## 🔮 Future Improvements

Potential future enhancements include:

* 🔍 Employee search and filtering
* 🤖 AI Employee Assistant
* 📄 AI Resume Parser
* 🧠 AI Skill Gap Analysis
* 📚 RAG-based HR Policy Assistant
* 🔐 Spring Security + JWT authentication
* 👥 Role-based access control
* 📊 Employee analytics dashboard
* 🐳 Docker deployment
* ☁️ Cloud deployment

---

## 👨‍💻 Author

**Mohammed Ghouse D**

B.E. Computer Science & Engineering — Data Science

---

## ⭐ Project

If you find this project useful, consider giving the repository a ⭐ on GitHub.
