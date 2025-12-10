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
# Signature Nail Salon — Full‑Stack Scheduler & Booking Website

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

This repository contains a production‑style, full‑stack appointment scheduling website and backend scheduler system built for a boutique nail salon. It demonstrates a complete booking flow (public-facing React site) integrated with a Django REST API that performs timezone‑aware availability calculations and enforces technician schedules.

Directory layout

- `frontend/` — React single‑page application (routing, components, styles)
- `salon_backend/` — Django REST backend (models, serializers, API views)

Key capabilities

- Full public booking UI: select services, choose technician, pick date/time, and confirm — supports multi‑service bookings and aggregated durations
- Scheduler engine (backend): computes available slots by combining `TechnicianAvailability`, existing `Appointment` records, and `TimeBlock` entries
- Technician/admin tools: view schedules, block time, and create manual appointments
- Notifications: configurable SMTP email notifications for confirmations

Why this is a solid full‑stack example for employers

- Demonstrates end‑to‑end architecture: React UI ⇄ Django REST API ⇄ PostgreSQL
- Shows practical scheduling logic (nontrivial domain problem): conflict detection, duration aggregation, and timezone handling
- Includes responsive UI, component design, and theming via CSS variables

## Tech stack

- Backend: Django 5, Django REST Framework, PostgreSQL
- Frontend: React, React Router, Axios, react-calendar
- Email: SMTP (examples use Brevo/SMTP)

## Quick start — run locally

Prerequisites

- Python 3.10+
- Node.js 16+ and npm
- PostgreSQL (optional: use SQLite for quick testing)

1) Backend

```powershell
cd salon_backend
python -m venv .venv
.\.venv\Scripts\Activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

2) Frontend

```powershell
cd frontend
npm install
npm start
```

Open the frontend at `http://localhost:3000` and the API at `http://127.0.0.1:8000`.

## Configuration

Set environment variables for Django (example `.env`):

```text
SECRET_KEY=your_secret_key
DEBUG=True
DB_NAME=nail_salon
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_HOST_USER=your_smtp_user
EMAIL_HOST_PASSWORD=your_smtp_password
DEFAULT_FROM_EMAIL=your_verified_sender@domain.com
```

Tip: For fast local tests, change the database to SQLite in `salon_backend/salon_project/settings.py`.

## Selected API endpoints

- `GET /api/categories/` — list service categories
- `GET /api/services/` — list services
- `GET /api/technicians/` — list technicians
- `POST /api/availability/` — compute available time slots (body: `technician_id`, `service_ids`, `date`)
- `POST /api/appointments/` — create an appointment

See `salon_backend/api/` for serializers, views, tests, and URL routing.

## Developer notes (important details)

- Scheduler logic: availability is computed by intersecting a technician's weekly availability windows with the day in question, then subtracting appointment and time‑block intervals to produce candidate slots.
- Timezones: the backend uses Django's timezone utilities and `zoneinfo` (avoid pytz localize). All stored datetimes are UTC; the API accepts/returns ISO timestamps as needed.
- Frontend: componentized React app with centralized styles in `frontend/src/index.css`. Theme variables make it easy to alter visual branding.

## How to evaluate this project (for reviewers)

1. Start backend and frontend locally
2. Create a technician and configure `TechnicianAvailability` entries in the Django admin
3. Create several services (with duration_minutes) and use the public booking flow to request availability — observe how the backend aggregates duration and returns slots
4. Verify appointment creation and check that overlapping times are prevented by the scheduler

## Contributing

1. Fork
2. Create feature branch (`git checkout -b feat/your-feature`)
3. Commit with clear, conventional messages
4. Open a pull request describing the change and any migration steps

## License

Add a `LICENSE` file to make reuse or deployment permissions explicit.

---

Made with care — Damian Le
