# 🚛 FleetPro - Fleet Management System

> The complete solution for modern fleet management — built for India 🇮🇳

## 🌐 Live Demo
**Frontend:** [fleetsystem.vercel.app](https://fleetsystem.vercel.app)  
**Backend API:** [fleet-backened.onrender.com](https://fleet-backened.onrender.com)

---

## ✨ Features

### 🔐 Authentication
- Secure Login & Register
- JWT Token based authentication
- Password validation (special chars + numbers required)
- Protected Routes

### 🚗 Vehicle Management
- Add, view and track all fleet vehicles
- Vehicle type, brand, model, fuel type tracking
- Status tracking — Running, Stopped, In Service

### 👨‍✈️ Driver Management
- Complete driver profiles
- License tracking
- Status — Active, On Trip, Inactive

### 🗺️ Trip Management
- Trip planning and tracking
- Start/End location, distance, fare
- Status — Scheduled, Ongoing, Completed, Cancelled

### ⛽ Fuel & Expenses
- Fuel consumption tracking
- Price per liter, total cost
- Odometer reading for mileage calculation

### 🔧 Maintenance
- Maintenance scheduling
- Next service date tracking
- Workshop management

### 🚨 Alerts & Notifications
- High fuel consumption alerts
- Maintenance due alerts
- Geofence breach alerts
- Insurance expiry alerts

### 📍 Live Tracking
- Real-time vehicle location placeholder
- Vehicle status monitoring
- Speed and fuel level tracking

### 🗺️ Geofence
- Virtual boundary management
- Coordinate based geofencing
- Active/Inactive zone management

### 📄 Documents
- Fleet document management
- Expiry date tracking
- Status — Valid, Expiring Soon, Expired

### 📊 Reports & Analytics
- Revenue vs Expense charts
- Trip trend analysis
- 6 month overview

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React.js | UI Framework |
| Tailwind CSS | Styling |
| React Router DOM | Navigation |
| Recharts | Charts & Analytics |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Bcrypt | Password Hashing |

### Security
| Package | Purpose |
|---------|---------|
| Helmet | HTTP Headers Security |
| CORS | Cross Origin Resource Sharing |
| Express Rate Limit | Brute Force Protection |
| Express Mongo Sanitize | NoSQL Injection Prevention |

### Deployment
| Service | Purpose |
|---------|---------|
| Vercel | Frontend Hosting |
| Render | Backend Hosting |
| MongoDB Atlas | Cloud Database |

---

## 📁 Project Structure
fleetpro/
├── fleet-backened/
│   ├── CONFIG.JS/
│   │   └── db.js
│   ├── models/
│   │   ├── vehicle.js
│   │   ├── drivers.js
│   │   ├── trips.js
│   │   ├── fuel.js
│   │   ├── maintenance.js
│   │   ├── alert.js
│   │   ├── geofence.js
│   │   ├── document.js
│   │   └── user.js
│   ├── routes/
│   │   ├── vehicles.js
│   │   ├── drivers.js
│   │   ├── trips.js
│   │   ├── fuel.js
│   │   ├── maintnance.js
│   │   ├── alerts.js
│   │   ├── geofence.js
│   │   ├── documents.js
│   │   └── user.js
│   ├── middleware/
│   │   └── user.js
│   └── server.js
│
└── fleet-frontend/
└── src/
├── components/
│   ├── sidebar.jsx
│   └── Navbar.jsx
└── pages/
├── Dashboard.jsx
├── Vehicle.jsx
├── Drivers.jsx
├── Trips.jsx
├── Fuel.jsx
├── Maintenance.jsx
├── Alerts.jsx
├── Reports.jsx
├── LiveTracking.jsx
├── Geofence.jsx
├── Documents.jsx
├── Settings.jsx
├── Login.jsx
└── Register.jsx


👨‍💻 Developer
Saurabh Yogi
BCA Student — JECRC University, Jaipur
Full Stack Web Development
