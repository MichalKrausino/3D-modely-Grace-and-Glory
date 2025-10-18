from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional, Literal
from uuid import UUID, uuid4
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from google_auth import get_google_auth_url, fetch_google_token, get_calendar_service
import state as app_state
import datetime
from scheduler import find_best_slot, get_mock_calendar
from scheduler_models import Task as SchedulerTask, TimeSlot
from db import supabase

# --- Pydantic Models ---
class TaskBase(BaseModel):
    name: str
    duration: int = 60
    category: str
    deadline: Optional[str] = None

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: UUID
    status: Literal['Planned', 'In Progress', 'Done'] = 'Planned'

# --- FastAPI App ---
app = FastAPI(
    title="AutoSchedule AI API",
    description="API for managing tasks and scheduling.",
    version="0.1.0",
)

# --- CORS Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- API Endpoints ---
@app.get("/")
def read_root():
    return {"message": "Welcome to AutoSchedule AI API"}

@app.post("/tasks", response_model=Task)
def create_task(task_create: TaskCreate):
    """
    Create a new task.
    """
    data, error = supabase.table("tasks").insert(task_create.dict()).execute()
    if error:
        raise HTTPException(status_code=400, detail=error.message)
    return data[1][0]


@app.get("/tasks", response_model=List[Task])
def get_tasks():
    """
    Retrieve all tasks.
    """
    data, error = supabase.table("tasks").select("*").execute()
    if error:
        raise HTTPException(status_code=400, detail=error.message)
    return data[1]


@app.get("/tasks/{task_id}", response_model=Task)
def get_task(task_id: UUID):
    """
    Retrieve a single task by its ID.
    """
    data, error = supabase.table("tasks").select("*").eq("id", str(task_id)).execute()
    if error or not data[1]:
        raise HTTPException(status_code=404, detail="Task not found")
    return data[1][0]


@app.put("/tasks/{task_id}", response_model=Task)
def update_task_status(task_id: UUID, status: Literal['Planned', 'In Progress', 'Done']):
    """
    Update the status of a task.
    """
    data, error = supabase.table("tasks").update({"status": status}).eq("id", str(task_id)).execute()
    if error or not data[1]:
        raise HTTPException(status_code=404, detail="Task not found")
    return data[1][0]


@app.delete("/tasks/{task_id}", status_code=204)
def delete_task(task_id: UUID):
    """
    Delete a task by its ID.
    """
    data, error = supabase.table("tasks").delete().eq("id", str(task_id)).execute()
    if error or not data[1]:
        raise HTTPException(status_code=404, detail="Task not found")
    return

@app.get("/auth/google")
def auth_google():
    """
    Redirects the user to the Google authentication page.
    """
    authorization_url, state = get_google_auth_url()
    app_state.credentials_state = state  # Store state to prevent CSRF
    return RedirectResponse(authorization_url)

@app.get("/auth/callback")
def auth_callback(code: str, state: str):
    """
    Handles the response from Google after the user has authorized the application.
    """
    if state != app_state.credentials_state:
        raise HTTPException(status_code=400, detail="Invalid state parameter")

    app_state.credentials = fetch_google_token(code)
    return {"message": "Successfully authenticated with Google"}

@app.get("/calendar/events")
def get_calendar_events():
    """
    Fetches events from the user's Google Calendar.
    """
    if not app_state.credentials:
        raise HTTPException(status_code=401, detail="User not authenticated")

    service = get_calendar_service(app_state.credentials)
    now = datetime.datetime.utcnow().isoformat() + 'Z'  # 'Z' indicates UTC time
    events_result = service.events().list(
        calendarId='primary',
        timeMin=now,
        maxResults=10,
        singleEvents=True,
        orderBy='startTime'
    ).execute()
    events = events_result.get('items', [])
    return events

@app.post("/schedule-task", response_model=TimeSlot)
def schedule_task(task: SchedulerTask):
    """
    Schedules a task in the user's calendar.
    """
    calendar = get_mock_calendar()
    best_slot = find_best_slot(task, calendar)
    return best_slot