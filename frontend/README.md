# Task Manager Frontend

React frontend for the Helfy task‑manager assignment.

## Running the frontend

```bash
cd frontend
npm install
npm start
```

The app runs on `http://localhost:3000` and expects the backend on `http://localhost:4000`.

## Main features

- Fetches tasks from the Express backend (`/api/tasks`).
- Create task form: title, description, priority (`low | medium | high`).
- Mark task as done / pending (toggle).
- Delete task.
- “Carousel” view – always מציג כרטיס משימה אחד, עם כפתורי `Prev` / `Next` בלולאה מעגלית.

## Files

- `src/App.js` – main app component, handles state, filtering and carousel logic.
- `src/components/TaskForm.js` – controlled form for creating tasks.
- `src/components/TaskItem.js` – single task card with actions.
- `src/services/tasksApi.js` – all HTTP calls to the backend.
