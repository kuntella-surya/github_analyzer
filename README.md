# 🚀 GitHub Profile Analyzer API

## 📌 Overview
GitHub Profile Analyzer API is a backend system built using **Node.js**, **Express.js**, and **MySQL** that analyzes GitHub user profiles using the GitHub Public API and stores meaningful insights in a database.

It extracts developer analytics such as followers, repositories, stars, language distribution, and activity score, then provides REST APIs to access this data.

---

## 🛠 Tech Stack
- Node.js  
- Express.js  
- MySQL  
- Axios  
- GitHub REST API  

---

## ✨ Features

### 🔹 Core Features
- Fetch GitHub user data using username  
- Fetch user repositories from GitHub API  
- Analyze developer statistics  
- Store analyzed data in MySQL database  
- Retrieve all stored analyzed profiles  
- Retrieve single profile by username  

---

### ⚡ Advanced Features

#### 📌 Cache System
- Checks database before calling GitHub API  
- Avoids unnecessary API requests  
- Improves performance  

#### 📊 Language Analysis
- Calculates programming language usage from repositories  
- Returns language dominance in percentage format  

#### 🔥 Activity Score System
- Calculates developer score based on:
  - Followers  
  - Public repositories  
  - Total stars  

- Classifies activity level:
  - 🔥 High Activity  
  - ⚡ Medium Activity  
  - 💤 Low Activity  

#### 🧠 Developer Insights
- Identifies top programming language  
- Generates structured developer profile analytics  

---

## 📡 API Endpoints

### 1. Analyze GitHub Profile (Create / Update)

POST /api/analyze/:username


Example:

POST /api/analyze/torvalds


---

### 2. Get All Profiles

GET /api/profiles


---

### 3. Get Single Profile

GET /api/profiles/:username


Example:

GET /api/profiles/torvalds


---

## 🗄 Database Setup

### Step 1: Create Database
```sql
CREATE DATABASE github_analyzer;

USE github_analyzer;
Step 2: Create Table
CREATE TABLE github_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE,
  followers INT,
  following INT,
  public_repos INT,
  total_stars INT DEFAULT 0,
  avatar_url TEXT,
  created_at VARCHAR(50),
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
⚙️ Setup Instructions
1. Clone Repository
git clone https://github.com/kuntella-surya/github_analyzer
cd github-profile-analyzer
2. Install Dependencies
npm install
3. Create .env File
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=github_analyzer
4. Start Server
node app.js
# or
nodemon app.js
🧪 Testing the API

Example Request:

POST http://localhost:5000/api/analyze/torvalds
📊 Sample Response
{
  "message": "Profile analyzed successfully",
  "data": {
    "username": "torvalds",
    "followers": 300000,
    "following": 0,
    "public_repos": 12,
    "total_stars": 200000,
    "top_language": "C",
    "language_stats": {
      "C": 70,
      "Python": 20,
      "Shell": 10
    },
    "activity_score": 9500,
    "activity_level": "🔥 High Activity"
  }
}
