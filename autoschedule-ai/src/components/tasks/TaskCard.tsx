"use client";

import { Task, TaskStatus } from "@/store/tasks";
import { useOfflineTasksStore } from "@/store/offline-tasks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { updateTaskStatus, deleteTask } = useOfflineTasksStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.name}</CardTitle>
        <CardDescription>
          {task.duration} minutes | {task.category}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Status: {task.status}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Select
          value={task.status}
          onValueChange={(value) => {
            const newStatus = value as TaskStatus;
            updateTaskStatus(task.id, newStatus);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Change status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Planned">Planned</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="destructive" onClick={() => deleteTask(task.id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}