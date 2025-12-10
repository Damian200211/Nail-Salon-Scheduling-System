# Nail Salon Scheduling System

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Brevo](https://img.shields.io/badge/Brevo-0092FF?style=for-the-badge&logo=brevo&logoColor=white)

## Project Overview
A full-stack website /booking application designed to digitize operations for a local nail salon. The system automates appointment scheduling, manages technician availability, and sends automated email confirmations.

Built with **Django REST Framework** and **React**, this application solves the problem of manual phone bookings by providing a real-time, responsive digital solution.

## Demo



https://github.com/user-attachments/assets/53914526-2d4b-4904-b092-34ba9952e997





## Key Features

### Customer Booking
* **Guest Checkout:** Removed the requirement for account creation to reduce booking friction. Appointments are linked via email/name.
* **Real-Time Availability:** Dynamic slot calculation based on technician schedules and service durations.
* **Multi-Service Booking:** Supports selecting multiple services (e.g., Manicure + Pedicure); the system automatically aggregates the total duration.
* **Timezone Support:** Handles local time (Central Time) correctly against UTC database storage.
# Signature Nail Salon — Booking Platform


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

---
# Nail Salon Scheduling System — Full‑Stack Website & Scheduler

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Brevo](https://img.shields.io/badge/Brevo-0092FF?style=for-the-badge&logo=brevo&logoColor=white)

Professional full‑stack appointment booking website and backend scheduler system built for a boutique nail salon. This project demonstrates a complete public booking flow (React SPA) tied to a robust Django REST API that computes availability, prevents conflicts, and persists appointments in PostgreSQL.

Repository layout

- `frontend/` — React single‑page application (components, routes, styles)
- `salon_backend/` — Django REST API (models, serializers, views)

Highlights

- Public booking: select services, choose preferred technician, request availability, and confirm booking (supports multi‑service bookings and aggregated durations).
- Scheduler engine: the backend computes available slots by combining weekly `TechnicianAvailability`, existing `Appointment` entries, and `TimeBlock` records.
- Admin & technician flows: technician records, availability schedules, and manual appointment entry available in Django admin.
- Email notifications: configurable SMTP support for confirmation emails.

Why this is relevant to employers

- End‑to‑end full‑stack architecture: modern React frontend integrated with a RESTful Django backend and a relational database.
- Real business logic: implements a non‑trivial scheduler that handles overlapping appointments, service durations, time blocks, and timezone awareness.
- Production thinking: environment configuration, separation of frontend/backend, and theming using CSS variables.

Tech stack

- Backend: Django 5, Django REST Framework, PostgreSQL
- Frontend: React, React Router, Axios, react-calendar
- Email: SMTP (Brevo examples included)

Quickstart — Local Development

Prerequisites

- Python 3.10+
- Node.js 16+ and npm
- PostgreSQL (optional: SQLite for quick testing)

1) Backend

```powershell
# from repository root
cd salon_backend

# create and activate a venv
python -m venv .venv
.\.venv\Scripts\Activate

# install dependencies
pip install -r requirements.txt

# apply migrations and create admin user
python manage.py migrate
python manage.py createsuperuser

# run the backend server
python manage.py runserver
```

2) Frontend

```powershell
# open a new terminal
cd frontend
npm install
npm start
```

Open `http://localhost:3000` (frontend) and `http://127.0.0.1:8000` (API).

Configuration

Create a `.env` or set environment variables for the Django backend (example):

```text
SECRET_KEY=your_secret_key
DEBUG=True
DB_NAME=nail_salon
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost

# email / SMTP
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_HOST_USER=your_smtp_user
EMAIL_HOST_PASSWORD=your_smtp_password
DEFAULT_FROM_EMAIL=your_verified_sender@domain.com
```

Tip: For quick local testing, switch the database to SQLite in `salon_backend/salon_project/settings.py`.

Selected API endpoints

- `GET /api/categories/` — service categories
- `GET /api/services/` — services
- `GET /api/technicians/` — technicians
- `POST /api/availability/` — availability lookup (body: `technician_id`, `service_ids`, `date`)
- `POST /api/appointments/` — create appointment

See `salon_backend/api/` for the implementation of serializers, views, and routing.

Developer notes

- Scheduler behavior: availability is computed by intersecting a technician's weekly availability windows with the requested day, then subtracting existing appointments and time blocks to yield candidate slots.
- Timezones: the backend uses Django timezone utilities and `zoneinfo` (no pytz.localize). Datetimes are stored in UTC and presented/processed using ISO timestamps.
- Frontend: componentized React app with centralized styles in `frontend/src/index.css`. Theme variables make it easy to alter visual branding.

How to evaluate (for reviewers)

1. Start backend and frontend locally
2. Create technicians and availability via Django admin
3. Add services with `duration_minutes` set
4. Use the public booking flow to request availability and create appointments — verify conflict avoidance and slot calculation

Contributing

1. Fork
2. Create a branch: `git checkout -b feat/your-feature`
3. Commit with clear, conventional messages
4. Open a pull request describing the change and any migration steps

License

Add a `LICENSE` file to clarify reuse terms (MIT is a common choice).

Contact

For questions about this codebase, reach out to the repository owner or open an issue.

---

Made with care — Damian Le
