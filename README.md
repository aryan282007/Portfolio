# Aryan portfolio — full stack

React + Vite + Tailwind frontend, Express + MongoDB backend for a working
contact form. Layout matches the reference design (near-black background,
orange accent, filterable portfolio grid); copy is adapted for a full-stack
developer instead of the original UI/UX-designer template.

## Structure

```
client/   React frontend (Vite)
server/   Express API — handles POST /api/contact, saves to MongoDB
```

## Setup

You need Node.js and a MongoDB instance — either local
(`mongod` running on your machine) or a free
[MongoDB Atlas](https://www.mongodb.com/atlas) cluster.

```bash
npm run install:all       # installs both client and server deps
```

```bash
cp server/.env.example server/.env
# edit server/.env — set MONGO_URI to your local or Atlas connection string
```

Then, from the root:

```bash
npm run dev
```

This runs the client on `http://localhost:5173` and the API on
`http://localhost:5000` together. The Vite dev server proxies `/api`
requests to the backend, so the contact form works out of the box.

## Where to edit

- `client/src/data/services.js` — the six service cards
- `client/src/data/projects.js` — portfolio grid + filter categories
- `client/src/data/skills.js` — skill percentage rings + hero stats
- `client/src/components/Hero.jsx` — name, headline, socials
- `client/src/components/Footer.jsx` — email, phone, socials
- `client/tailwind.config.js` — colors (`base`, `ink`, `brand`) and fonts
- Replace the placeholder circle avatars in `Hero.jsx` / `About.jsx` with
  real `<img>` tags once you have photos in `client/public/`

## Contact form data

Submissions save to the `contactmessages` collection in MongoDB.
`GET /api/contact` lists them — there's no auth on it yet, so **add auth
before deploying this publicly**, otherwise anyone can read your inbox.

## Deploy

- **Client**: Vercel, framework preset "Vite", set `VITE_API_URL` to your
  deployed backend URL as an environment variable.
- **Server**: Render or Railway — set `MONGO_URI` and `CLIENT_ORIGIN`
  (your deployed frontend URL) as environment variables there.

## Known gaps to close before this is production-ready

- No auth on `GET /api/contact` — protect it (e.g. a simple admin token
  check) before you deploy, or remove the route entirely and read
  submissions straight from MongoDB Atlas.
- No email notification on new submissions yet — if you want an email
  alert, add Nodemailer in `contactController.js` after the `.create()`
  call.
- Real project screenshots — swap the "Preview" placeholders in
  `Portfolio.jsx` for actual images once ResumePilot/Wanderlust/DevPulse
  are deployed.
