"use client";

import { useEffect } from "react";
import { useOfflineTasksStore } from "@/store/offline-tasks";
import { TaskCard } from "@/components/tasks/TaskCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarEvents } from "@/components/calendar/CalendarEvents";

export default function Home() {
  const { tasks, fetchTasks } = useOfflineTasksStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <main className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <Button asChild>
            <a href="http://localhost:8000/auth/google">Connect to Google Calendar</a>
          </Button>
          <Button asChild>
            <Link href="/add-task">Add New Task</Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <p>No tasks yet. Add one to get started!</p>
        )}
      </div>
      <div className="mt-8">
        <CalendarEvents />
      </div>
    </main>
  );
}