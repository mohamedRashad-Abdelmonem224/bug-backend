Bugslayers Backend

This repository contains a simple Express + Mongoose backend for the Bug Slayers portfolio site.

Quick start:

1. Copy `.env.example` to `.env` and set `MONGODB_URI` and `PORT`.
2. Install dependencies: `npm install`
3. Start: `npm run start` or `npm run dev` (requires `nodemon`).

API endpoints:
- `GET /api/projects` - list projects
- `POST /api/projects` - create a project
