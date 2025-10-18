"use client";

import { useTasksStore } from "@/store/tasks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsPage() {
  const tasks = useTasksStore((state) => state.tasks);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "Done").length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Statistics</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalTasks}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{completedTasks}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{completionRate.toFixed(2)}%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}