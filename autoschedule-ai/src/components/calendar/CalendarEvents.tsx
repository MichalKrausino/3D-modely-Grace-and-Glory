"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface CalendarEvent {
  summary: string;
  start: {
    dateTime: string;
  };
}

export function CalendarEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/calendar/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch calendar events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Google Calendar Events</CardTitle>
      </CardHeader>
      <CardContent>
        {events.length > 0 ? (
          <ul>
            {events.map((event, index) => (
              <li key={index}>
                <strong>{event.summary}</strong> -{" "}
                {new Date(event.start.dateTime).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming events found.</p>
        )}
      </CardContent>
    </Card>
  );
}