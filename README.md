# 🍽️ Menu — Recipe Book App

Full-stack recipe management application.

## Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS v3
- **Backend**: Node.js + Express + TypeScript
- **Database**: SQLite (via `better-sqlite3`) — zero-config, production-ready for small/medium apps

## Quick Start

### Backend
```bash
cd backend
npm install
npm run seed   # seed demo recipes
npm run dev    # starts on :3001
```

### Frontend
```bash
cd frontend
npm install
npm run dev    # starts on :5173
```

Open http://localhost:5173

## API
- `GET    /api/recipes`         — list all recipes
- `GET    /api/recipes/:id`     — get recipe with ingredients
- `POST   /api/recipes`         — create recipe
- `PUT    /api/recipes/:id`     — update recipe
- `DELETE /api/recipes/:id`     — delete recipe

## Why SQLite?
For an MVP recipe book, SQLite is ideal: zero setup, single file, full SQL, fast, and easily swappable to PostgreSQL via Knex/Prisma by changing one config line.
