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
# Signature Nail Salon — Booking Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

Professional, full‑stack appointment scheduling system built for a boutique nail salon. The app provides an intuitive public booking experience while giving technicians and admins the tools to manage schedules, time blocks, and appointments.

This repository contains the React frontend (in `frontend/`) and the Django REST backend (in `salon_backend/`).

--

## Features

- Public booking flow with multi‑service checkout and automatic duration aggregation
- Real‑time availability calculation based on technician working hours and existing appointments
- Technician availability and time‑block management
- Admin views for manual bookings and appointment management
- Email notifications for confirmations (SMTP)

## Tech Stack

- Backend: Django 5, Django REST Framework, PostgreSQL
- Frontend: React, React Router, Axios, react-calendar
- Email: SMTP (configurable; examples use Brevo)

## Quickstart — Local Development

Below are the minimal steps to get the app running locally.

Prerequisites
- Python 3.10+ (or compatible)
- Node.js 16+ and npm
- PostgreSQL (or adjust DATABASES to use SQLite for quick local testing)

1) Backend

```powershell
# from repository root
cd salon_backend

# create and activate a virtual environment
python -m venv .venv
.\.venv\Scripts\Activate

# install Python deps
pip install -r requirements.txt

# apply migrations and create admin user
python manage.py migrate
python manage.py createsuperuser

# run the development server
python manage.py runserver
```

2) Frontend

```powershell
# open a new terminal from repository root
cd frontend
npm install
npm start
```

Visit `http://localhost:3000` for the frontend and `http://127.0.0.1:8000` for the API.

## Configuration

Create a `.env` or configure environment variables for the Django backend (example values):

```text
SECRET_KEY=your_secret_key
DEBUG=True
DB_NAME=nail_salon
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost

# Email settings
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_HOST_USER=your_smtp_user
EMAIL_HOST_PASSWORD=your_smtp_password
DEFAULT_FROM_EMAIL=your_verified_sender@domain.com
```

If you want to test quickly without Postgres, modify `salon_backend/salon_project/settings.py` to use the default SQLite database.

## API Endpoints (selected)

- `GET /api/categories/` — service categories
- `GET /api/services/` — services list
- `GET /api/technicians/` — technicians
- `POST /api/availability/` — availability lookup (expects `technician_id`, `service_ids`, `date`)
- `POST /api/appointments/` — create appointment

Refer to `salon_backend/api/` for serializers, views, and URL routes.

## Developer Notes

- Availability logic uses `TechnicianAvailability`, `Appointment`, and `TimeBlock` models to compute free slots.
- The frontend uses CSS variables in `frontend/src/index.css` for theming; update variables there to change the site's palette.
- During development I replaced any pytz-specific `localize` calls with Django's `timezone.make_aware` to support zoneinfo and avoid runtime errors.

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit changes with clear messages
4. Open a pull request describing the change and any setup steps

## Tips for Employers / Reviewers

- The frontend demonstrates component-driven React architecture, responsive CSS, and integration with a REST API.
- The backend includes model relationships (Services, Technicians, Appointments), serializer-driven APIs, and timezone-aware scheduling logic.
- To evaluate: run the backend and frontend locally and exercise the booking flow (select services, pick a technician, and request availability).

## License

This project does not include a license file. Add `LICENSE` to clarify terms for reuse.

---

Made with care — Damian Le
