"use client";

import { useState } from "react";
import { useOfflineTasksStore } from "@/store/offline-tasks";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "sonner";
import { DatePicker } from "../ui/date-picker";

export function AddTaskForm() {
  const addTask = useOfflineTasksStore((state) => state.addTask);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(60);
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category) {
      toast.error("Please fill out all fields.");
      return;
    }
    await addTask({
      name,
      duration,
      category,
      deadline: deadline?.toISOString(),
    });
    toast.success("Task added successfully!");
    setName("");
    setDuration(60);
    setCategory("");
    setDeadline(undefined);
  };

  return (
    <>
      <Toaster />
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Create a new task</CardTitle>
          <CardDescription>
            Fill out the details below to add a new task to your schedule.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Task Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Finish project report"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="duration">Duration (in minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value, 10))}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="deadline">Deadline</Label>
                <DatePicker date={deadline} setDate={setDeadline} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="learning">Learning</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" onClick={handleSubmit}>
            Add Task
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}