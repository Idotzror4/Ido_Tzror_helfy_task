# Task Manager App

Fullstack home assignment: Ido Tzror

## Setup and Run

### Backend (port 4000)

```bash
cd backend
npm install
npm run dev
```

### Frontend (port 3000)

```bash
cd frontend
npm install
npm start
```

## API Documentation

Base URL
http://localhost:4000

GET /api/tasks
Get all tasks

POST /api/tasks
Create a new task

PUT /api/tasks/:id
Update a task

DELETE /api/tasks/:id
Delete a task

PATCH /api/tasks/:id/toggle
Toggle completion status

### Task Model

```js
{
  id: number,
  title: string,
  description: string,
  completed: boolean,
  createdAt: string,
  priority: 'low' | 'medium' | 'high'
}
```

## Frontend Features

Endless carousel view
One task card at a time
Prev and Next buttons
Circular loop

Create tasks
Edit tasks inline
Delete tasks
Toggle completion
Filter All Completed Pending
Sort by priority high to low
Dark light theme toggle

## Assumptions and Design Decisions

Server stores tasks in memory no database data resets on restart
Frontend calls backend directly at http://localhost:4000 using fetch
Carousel implemented with React state and CSS transitions no external carousel libraries

## Time Spent

Backend 1H and 10M
Frontend 2H and 30M
Styling and polish 20M

