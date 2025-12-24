# Nail Salon Scheduling System — Full‑Stack Website & Scheduler

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Brevo](https://img.shields.io/badge/Brevo-0092FF?style=for-the-badge&logo=brevo&logoColor=white)

## Project Overview
A professional full‑stack appointment booking website and backend scheduler system built for a boutique nail salon ("Signature Nail Salon"). This project demonstrates a complete public booking flow (React SPA) tied to a robust Django REST API that computes availability, prevents conflicts, and persists appointments in PostgreSQL.

**Repository Layout**
- `frontend/` — React single‑page application (components, routes, styles)
- `salon_backend/` — Django REST API (models, serializers, views)

## Demo
https://github.com/user-attachments/assets/53914526-2d4b-4904-b092-34ba9952e997

## Why This Project Matters (For Reviewers)
* **End‑to‑End Architecture:** Demonstrates a modern React frontend integrated with a RESTful Django backend and a relational database.
* **Complex Business Logic:** Unlike simple CRUD apps, this implements a non‑trivial scheduler that handles overlapping appointments, service durations, time blocks, and timezone awareness.
* **Production Standards:** Includes environment configuration, separation of concerns, and consistent theming using CSS variables.

## Key Features

### Public Booking Flow
* **Guest Checkout:** Removed account creation friction; appointments are linked via email/name.
* **Multi-Service Booking:** Supports selecting multiple services (e.g., Manicure + Pedicure); the system automatically aggregates the total duration.
* **Real-Time Availability:** Dynamic slot calculation based on technician schedules and existing bookings.

### Scheduler Engine (Backend)
* **Conflict Detection:** Computes available slots by intersecting `TechnicianAvailability` windows with the requested day, subtracting existing `Appointment` and `TimeBlock` records.
* **Timezone Support:** Handles local time (Central Time) correctly against UTC database storage using `zoneinfo`.

### Admin & Notifications
* **Technician Management:** Admin views to manage shifts, block time, and view schedules.
* **Automated Emails:** Configurable SMTP support (Brevo) sends confirmation emails upon successful booking.

## Tech Stack
* **Backend:** Django 5, Django REST Framework, PostgreSQL
* **Frontend:** React, React Router, Axios, react-calendar
* **Email:** SMTP (Brevo)

---

## Quickstart — Local Development

### Prerequisites
* Python 3.10+
* Node.js 16+ and npm
* PostgreSQL (Optional: Use SQLite for quick testing)

### 1. Backend Setup
```powershell
# Navigate to backend folder
cd salon_backend

# Create and activate virtual environment
python -m venv .venv
.\.venv\Scripts\Activate  # Windows
# source .venv/bin/activate # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Apply migrations and create admin user
python manage.py migrate
python manage.py createsuperuser

# Run the server
python manage.py runserver
```

### 2. Frontend Setup

```powershell
# Open a new terminal and navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the React app
npm start
```

Frontend: http://localhost:3000

API: http://127.0.0.1:8000

3. Configuration (.env)

Create a .env file in the backend root or set environment variables:
```
SECRET_KEY=your_secret_key
DEBUG=True
DB_NAME=nail_salon
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost

# Email / SMTP Settings
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_HOST_USER=your_smtp_user
EMAIL_HOST_PASSWORD=your_smtp_password
DEFAULT_FROM_EMAIL=your_verified_sender@domain.com
```

Developer Documentation
Selected API Endpoints

    GET /api/categories/ — Retrieve service categories

    GET /api/services/ — Retrieve individual services

    GET /api/technicians/ — Retrieve technician profiles

    POST /api/availability/ — Complex lookup (Payload: technician_id, service_ids, date)

    POST /api/appointments/ — Create new appointment



Devloped by: Damian Le 

