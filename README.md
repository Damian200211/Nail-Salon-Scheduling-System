# Nail Salon Scheduling System

A full-stack booking application for a nail salon using Django REST Framework and React.

 # Key Features

- Customer Booking

- Guest Checkout: No account creation required for customers.

- Real-Time Availability: Dynamic slot calculation based on technician schedules and service duration.

- Multi-Service Booking: Supports selecting multiple services; system automatically adjusts appointment length.

- Timezone Support: Handles local time (Central Time) correctly against UTC storage.

- Technician Dashboard

- Secure Access: Token-based login for employees.

- Schedule View: Technicians can view their upcoming appointments.

- Manual Booking: Admin form for inputting call-in appointments.

- Time Off Management: Technicians can block out specific dates or times directly from the dashboard.

# Notifications

Email Alerts: Automated confirmations to customers and alerts to the business using Brevo (SMTP).

# Tech Stack

Backend: Django 5, Django REST Framework, PostgreSQL

Frontend: React.js, Axios, React Router, React-Calendar

Email: SMTP via Brevo

Auth: Token Authentication

# Screenshots

Note: Add screenshots of your Booking Page and Technician Dashboard here.

# Installation

# 1. Backend (Django)

git clone [https://github.com/yourusername/your-repo-name.git](https://github.com/yourusername/your-repo-name.git)
cd salon_backend

python -m venv venv
# Windows: .\venv\Scripts\Activate
# Mac/Linux: source venv/bin/activate

pip install -r requirements.txt

# Create .env file (see Configuration below)

python manage.py migrate
python manage.py createsuperuser
python manage.py runserver


# 2. Frontend (React)

cd frontend
npm install
npm start


# Configuration

Create a .env file in salon_backend:

SECRET_KEY=your_secret_key
DEBUG=True
DB_NAME=nail_salon
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your_brevo_login
EMAIL_HOST_PASSWORD=your_brevo_smtp_key
DEFAULT_FROM_EMAIL=your_verified_sender@domain.com
BUSINESS_EMAIL=owner_email@domain.com


Architecture Notes

Guest Checkout: I removed customer logins to reduce booking friction. Appointments are linked by email/name.

Availability Logic: The AvailabilityCheckView calculates open slots by cross-referencing TechnicianAvailability (work hours) against existing Appointment and TimeBlock records.

Author

Damian le
