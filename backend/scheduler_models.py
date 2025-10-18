from pydantic import BaseModel
from typing import List
from datetime import datetime

class Event(BaseModel):
    start: datetime
    end: datetime
    summary: str

class Calendar(BaseModel):
    events: List[Event]

class Task(BaseModel):
    duration: int # in minutes
    deadline: datetime = None

class TimeSlot(BaseModel):
    start: datetime
    end: datetime