# Aryan Portfolio Full Stack

A full-stack portfolio website for Aryan featuring a React + Vite frontend and an Express + MongoDB backend. The app includes a responsive portfolio layout, service and project sections, and a contact form that saves messages to MongoDB and supports email notifications.

## Features

- Responsive one-page portfolio layout
- Hero, Services, About, Portfolio, Contact, and Footer sections
- Contact form with frontend and backend validation
- MongoDB message persistence
- Email notifications via SMTP
- Rate limiting on the contact API
- Health check endpoint for deployment status

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Express, MongoDB, Mongoose, Nodemailer
- Dev tooling: Concurrently, Nodemon

## Project Structure

- `client/`: React frontend built with Vite
- `server/`: Express backend for contact submission, email, and health check

## Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Gmail account with an app password if email sending is enabled

## Installation

From the root folder:

```bash
npm run install:all
```

## Environment Setup

Create and configure the server environment file:

```bash
cp server/.env.example server/.env
```

Update the following values in `server/.env`:

- `MONGO_URI`: MongoDB connection string
- `CLIENT_ORIGIN`: frontend origin, typically `http://localhost:5173`
- `EMAIL_USER`: Gmail address for email notifications
- `EMAIL_PASS`: Gmail app password

## Running Locally

Start both the frontend and backend from the root:

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

API endpoints:

- `POST /api/contact` — submit a contact message
- `GET /api/health` — health check

## Scripts

- `npm run dev` — start client and server concurrently
- `npm run install:all` — install dependencies for both client and server
- `npm run build` — build the frontend for production

## Deployment

### Frontend

Deploy the `client/` app to Vercel, Netlify, or any Vite-compatible host.

Set:

- `VITE_API_URL` to your deployed backend URL

Build command:

```bash
npm run build
```

### Backend

Deploy the `server/` app to Render, Railway, Fly.io, or another Node.js host.

Set required environment variables:

- `PORT`
- `MONGO_URI`
- `CLIENT_ORIGIN`
- `EMAIL_USER`
- `EMAIL_PASS`

Start command:

```bash
npm run start --prefix server
```

## Notes

- Confirm the frontend can access the backend via `VITE_API_URL`
- Ensure `CLIENT_ORIGIN` matches your deployed frontend domain
- Verify MongoDB access from the deployed backend
- Test the contact form after deployment

## Main Files to Edit

- `client/src/components/` — frontend section components
- `client/src/data/` — portfolio, services, and skills content
- `server/src/controllers/contactController.js` — contact handling and email logic
- `server/src/routes/contact.js` — contact API route
- `server/.env` — backend environment settings
