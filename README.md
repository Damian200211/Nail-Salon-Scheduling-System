# Nail Salon Scheduling System

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Brevo](https://img.shields.io/badge/Brevo-0092FF?style=for-the-badge&logo=brevo&logoColor=white)

## Project Overview
A full-stack booking application designed to digitize operations for a local nail salon. The system automates appointment scheduling, manages technician availability, and sends automated email confirmations.

Built with **Django REST Framework** and **React**, this application solves the problem of manual phone bookings by providing a real-time, responsive digital solution.

## Demo
https://github.com/user-attachments/assets/a91b06d5-1f2f-4bce-8379-6ab1a2347570



## Key Features

### Customer Booking
* **Guest Checkout:** Removed the requirement for account creation to reduce booking friction. Appointments are linked via email/name.
* **Real-Time Availability:** Dynamic slot calculation based on technician schedules and service durations.
* **Multi-Service Booking:** Supports selecting multiple services (e.g., Manicure + Pedicure); the system automatically aggregates the total duration.
* **Timezone Support:** Handles local time (Central Time) correctly against UTC database storage.

### Technician Dashboard
* **Secure Access:** Token-based authentication (JWT/Token) for employee login.
* **Schedule View:** Technicians can view their upcoming daily and weekly appointments.
* **Time Off Management:** Employees can block out specific dates or times directly from the dashboard.
* **Manual Booking:** Admin form for inputting walk-in or phone call appointments manually.

### Notifications
* **Email Alerts:** Automated confirmations to customers and new booking alerts to the business owner using **Brevo (SMTP)**.

## Architecture Notes
* **Availability Logic:** The `AvailabilityCheckView` calculates open slots by cross-referencing `TechnicianAvailability` (work hours) against existing `Appointment` and `TimeBlock` records.
* **Guest Checkout Decision:** I explicitly removed customer logins to lower the barrier to entry for new clients, significantly improving the user experience (UX).

## Technical Stack

| Category | Technology |
| :--- | :--- |
| **Backend** | Django 5, Django REST Framework, PostgreSQL |
| **Frontend** | React.js, Axios, React Router, React-Calendar |
| **Email Service** | SMTP via Brevo |
| **Authentication** | Token Authentication |
| **Deployment** | (Add deployment info if applicable, e.g., Docker/Heroku) |

## Installation & Setup

### 1. Backend Setup (Django)
```bash
# Clone the repository
git clone [https://github.com/yourusername/your-repo-name.git](https://github.com/yourusername/your-repo-name.git)
cd salon_backend

# Create virtual environment
python -m venv venv

# Activate Virtual Environment
# Windows:
.\venv\Scripts\Activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Database Migration & Admin Setup
python manage.py migrate
python manage.py createsuperuser

# Run Server
python manage.py runserver
```
### 2. Frontend Setup (React)

Open a new terminal window:
Bash

cd frontend

# Install node modules
npm install

# Start React Dev Server
npm start

### Configuration

Create a .env file in the salon_backend directory with the following variables:
Code snippet

SECRET_KEY=your_secret_key
DEBUG=True
DB_NAME=nail_salon
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost

# Email Settings (Brevo)
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your_brevo_login
EMAIL_HOST_PASSWORD=your_brevo_smtp_key
DEFAULT_FROM_EMAIL=your_verified_sender@domain.com
BUSINESS_EMAIL=owner_email@domain.com

Developed by Damian Le
