from datetime import datetime, timedelta
from typing import List
from scheduler_models import Calendar, Task, TimeSlot, Event

def find_best_slot(task: Task, calendar: Calendar) -> TimeSlot:
    """
    Finds the best time slot to schedule a task in a calendar.
    """
    # This is a mock implementation.
    # In a real implementation, this would involve a more complex algorithm
    # that takes into account user preferences, energy levels, etc.

    now = datetime.now()
    # For now, just find the next available slot
    if not calendar.events:
        return TimeSlot(start=now, end=now + timedelta(minutes=task.duration))

    # Sort events by start time
    sorted_events = sorted(calendar.events, key=lambda x: x.start)

    # Check for a slot before the first event
    if sorted_events[0].start > now + timedelta(minutes=task.duration):
        return TimeSlot(start=now, end=now + timedelta(minutes=task.duration))

    # Check for a slot between events
    for i in range(len(sorted_events) - 1):
        gap_start = sorted_events[i].end
        gap_end = sorted_events[i+1].start
        if gap_end - gap_start >= timedelta(minutes=task.duration):
            return TimeSlot(start=gap_start, end=gap_start + timedelta(minutes=task.duration))

    # Check for a slot after the last event
    last_event_end = sorted_events[-1].end
    return TimeSlot(start=last_event_end, end=last_event_end + timedelta(minutes=task.duration))

def get_mock_calendar() -> Calendar:
    """
    Returns a mock calendar with some events.
    """
    now = datetime.now()
    return Calendar(events=[
        Event(start=now + timedelta(hours=1), end=now + timedelta(hours=2), summary="Meeting"),
        Event(start=now + timedelta(hours=3), end=now + timedelta(hours=4), summary="Lunch"),
        Event(start=now + timedelta(hours=5), end=now + timedelta(hours=6), summary="Doctor's Appointment"),
    ])