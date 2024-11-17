# **Books Bridge - A Book Exchange Platform**

Books Bridge is a full-stack application that facilitates book exchanges among users. With secure transactions, advanced search functionality, and personalized user profiles, Books Bridge offers a seamless way to discover, lend, and borrow books.

---

## **Features**
- **User Registration & Authentication**
- **Discover Books**: Browse books available for exchange by category, genre, or title.
- **Search Functionality**: Perform advanced searches with filters.
- **Lend or Borrow**: Manage book lending and borrowing through the platform.
- **Messaging System**: Directly communicate with other users.
- **User Profiles**: View and edit personal details and book history.

---

## **Tech Stack**
- **Backend**: Java, Spring Boot, PostgreSQL
- **Frontend**: React, Material-UI
- **Database**: PostgreSQL

---

## **Prerequisites**
Before setting up the application, ensure the following are installed on your system:
1. **Java Development Kit (JDK)** - Version 17 or later
2. **Maven** - Build and dependency management tool
3. **Node.js and npm** - Node.js (v16+) and npm for React development
4. **PostgreSQL** - Version 13 or later
5. **Git** - Version control system

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/Sunayana56/book-exchange.git
cd book-exchange
```

---

### **2. Backend Setup (Spring Boot)**
1. **Navigate to the Backend Directory**:
   ```bash
   cd backend
   ```

2. **Configure the Database**:
   - Open `src/main/resources/application.properties`.
   - Update the PostgreSQL configuration:
     ```properties
     spring.datasource.url=jdbc:postgresql://localhost:5432/books_bridge
     spring.datasource.username=your_username
     spring.datasource.password=your_password
     spring.jpa.hibernate.ddl-auto=update
     spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
     ```

3. **Install Dependencies and Build**:
   ```bash
   mvn clean install
   ```

4. **Run the Application**:
   ```bash
   mvn spring-boot:run
   ```
   The backend server will be accessible at `http://localhost:8080`.

---

### **3. Database Setup (PostgreSQL)**
1. **Login to PostgreSQL**:
   ```bash
   psql -U postgres
   ```

2. **Create the Database**:
   ```sql
   CREATE DATABASE book_exchange;
   ```

3. **Grant Permissions**:
   ```sql
   GRANT ALL PRIVILEGES ON DATABASE book_exchange TO your_username;
   ```

4. **(Optional) Run Seed Data**:
   - If there is a seed SQL file in `backend/src/main/resources/sql/seed.sql`, you can run it to populate initial data:
     ```bash
     psql -U your_username -d books_bridge -f backend/src/main/resources/sql/seed.sql
     ```

---

### **4. Frontend Setup (React)**
1. **Navigate to the Frontend Directory**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   npm start
   ```
   The React app will be accessible at `http://localhost:3000`.

---

## **Environment Variables**
Create an `.env` file in both the `frontend` and `backend` directories.

### **Backend `.env` Example**:
```env
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/books_bridge
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
```

### **Frontend `.env` Example**:
```env
REACT_APP_API_BASE_URL=http://localhost:3000
```

---

## **Usage Instructions**
1. **Start Backend**:
   Ensure the Spring Boot backend is running:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **Start Frontend**:
   Run the React app:
   ```bash
   cd frontend
   npm start
   ```

3. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

---

## **Directory Structure**
```
book-excahnge/
├── backend/         # Spring Boot backend
│   ├── src/
│   ├── pom.xml      # Maven dependencies
│   └── application.properties
├── frontend/        # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json # Frontend dependencies
│   └── .env
└── README.md        # Documentation
```

---

## **Contributing**
1. Fork the repository and create a new branch:
   ```bash
   git checkout -b feature-name
   ```
2. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
3. Push to your fork and create a pull request.

---

## **Contact**
If you encounter any issues, feel free to reach out or create an issue in the repository.

Happy Coding! 📚✨
