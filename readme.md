# Car Parts Tracker (MEAN Final Project)

A beginner-friendly **Single Page Application** using:
- **MongoDB** (database)
- **Express + Node.js** (backend API)
- **Angular** (frontend SPA)

The app tracks car parts with full CRUD.

## Data model
Each part has:
- `partName` (string)
- `brand` (string)
- `price` (number)
- `installed` (boolean)

---

## 1) Backend first (Express + MongoDB)

### Files
- `backend/server.js`
- `backend/src/models/part.model.js`
- `backend/src/controllers/part.controller.js`
- `backend/src/routes/part.routes.js`

### API routes
- `GET /parts`
- `GET /parts/:id`
- `POST /parts`
- `PUT /parts/:id`
- `DELETE /parts/:id`

### Run backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend runs at `http://localhost:3000`.

---

## 2) Angular service

### File
- `frontend/src/app/services/part.service.ts`

This service calls the backend API for all CRUD actions:
- `getParts()`
- `getPartById(id)`
- `createPart(part)`
- `updatePart(id, part)`
- `deletePart(id)`

---

## 3) Angular components

### Required structure included
- `part-list`
- `part-item`
- `part-edit`
- `part.service.ts`

### Component files
- `frontend/src/app/part-list/*`
- `frontend/src/app/part-item/*`
- `frontend/src/app/part-edit/*`
- Root component: `frontend/src/app/app.component.ts`

The frontend is a simple SPA screen that lets you:
- create part
- view all parts
- edit part
- delete part

---

## 4) Run frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at `http://localhost:4200`.

> Make sure backend is running first, then start frontend.

---

## 5) Beginner-friendly and easy demo flow

Use this quick video demo script:
1. Show app loads (SPA)
2. Create a new part
3. Create another part
4. Edit one part (change price/installed)
5. Delete one part
6. Show MongoDB collection updated
7. Briefly show backend routes + Angular service/components in code

That demonstrates all rubric requirements in a short video.
