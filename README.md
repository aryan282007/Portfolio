# Aryan Portfolio Full Stack

A modern portfolio website for Aryan built with a React + Vite frontend and an Express + MongoDB backend. The site includes a responsive landing page, services and portfolio sections, and a working contact form that stores submissions and can send email notifications.

## Features

- Responsive single-page portfolio experience
- Sections for Hero, Services, About, Portfolio, Contact, and Footer
- Contact form with client-side validation and server-side validation
- Message storage in MongoDB
- Optional email notifications through Gmail SMTP
- Rate limiting on the contact endpoint
- Health check endpoint for deployment monitoring

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Express, MongoDB, Mongoose, Nodemailer
- Extra tooling: Concurrently, Nodemon, Express Rate Limit

## Project Structure

```text
client/   React frontend built with Vite
server/   Express API for contact submissions and health checks
```

## Prerequisites

- Node.js 18+
- A MongoDB instance (local or MongoDB Atlas)
- A Gmail account with an app password if you want email notifications enabled

## Installation

1. Install dependencies from the root:

```bash
npm run install:all
```

2. Create the server environment file:

```bash
cp server/.env.example server/.env
```

3. Update the values in server/.env:

- MONGO_URI: your MongoDB connection string
- CLIENT_ORIGIN: usually http://localhost:5173 during development
- EMAIL_USER and EMAIL_PASS: your Gmail address and app password if email sending is enabled

## Running the Project

From the root directory:

```bash
npm run dev
```

This starts:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

Useful endpoints:

- POST /api/contact — submit a contact message
- GET /api/health — health check

## Available Scripts

- npm run dev — starts both client and server together
- npm run install:all — installs dependencies for both apps
- npm run build — builds the frontend for production

## Deploying for Production

### 1. Frontend deployment

Deploy the client folder to Vercel or any Vite-compatible host.

Required environment variable:

- VITE_API_URL: your deployed backend URL, for example https://your-backend-url.onrender.com

Build command:

```bash
npm run build
```

### 2. Backend deployment

Deploy the server folder to Render, Railway, Fly.io, or another Node.js host.

Required environment variables:

- PORT: the port assigned by the host (Render/Railway usually provide this automatically)
- MONGO_URI: your MongoDB connection string
- CLIENT_ORIGIN: your deployed frontend domain, for example https://your-portfolio.vercel.app
- EMAIL_USER: Gmail address used for notifications
- EMAIL_PASS: Gmail app password

Start command:

```bash
npm run start
```

### 3. Production checklist

- Make sure the frontend can reach the backend through VITE_API_URL
- Ensure CORS allows your live frontend domain using CLIENT_ORIGIN
- Confirm MongoDB is reachable from the deployed server
- Test the contact form end to end after deployment
- Protect admin or inbox routes before making the API public if you add them later

## Main Files to Edit

- client/src/components/ — page sections such as Hero, About, Portfolio, Contact, and Footer
- client/src/data/ — portfolio items, services, and skills content
- server/src/controllers/contactController.js — contact form handling and email logic
- server/src/routes/contact.js — contact API route
- server/.env — environment configuration
