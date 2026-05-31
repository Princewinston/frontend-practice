"use client";
import { useGetUserQuery } from "@/redux/services/authApi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { taskApi } from "@/redux/services/taskApi";
import { useDispatch } from "react-redux";
import {
  useGetTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useCreateTaskMutation,
} from "@/redux/services/taskApi";

export default function Page() {
  const [tasktitle, setTasktitle] = useState("");
  const [taskdesc, setTaskdesc] = useState("");
  const router = useRouter();
  const [updateTask] = useUpdateTaskMutation();
  const [createTask] = useCreateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const { data: tasks, error: taskError } = useGetTasksQuery(undefined);

  const {
    data: user,
    isLoading,
    error: userError,
  } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (userError && "status" in userError && userError.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      router.replace("/login");
    }
  }, [userError]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl font-semibold">
        loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 text-white">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl md:flex-row md:items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              👋 Welcome,{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {user?.username}
              </span>
            </h1>

            <p className="mt-2 text-slate-300">{user?.email}</p>
          </div>

          <button
            className="rounded-2xl bg-red-500 px-6 py-3 font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-600 active:scale-95"
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              dispatch(taskApi.util.resetApiState());
              router.replace("/login");
            }}
          >
            Logout
          </button>
        </div>

        {/* Add Task Card */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="mb-6 text-2xl font-bold">✨ Add New Task</h2>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Enter task title..."
              value={tasktitle}
              onChange={(e) => setTasktitle(e.target.value)}
              className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400"
            />

            <textarea
              placeholder="Enter task description..."
              value={taskdesc}
              onChange={(e) => setTaskdesc(e.target.value)}
              className="min-h-[120px] w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400"
            />

            <button
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/30 active:scale-95"
              onClick={(e) => {
                e.preventDefault();

                createTask({
                  title: tasktitle,
                  description: taskdesc,
                });

                setTaskdesc("");
                setTasktitle("");
              }}
            >
              🚀 Add Task
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="grid gap-5 md:grid-cols-2">
          {tasks?.results?.map((task: any) => (
            <div
              key={task.id}
              className="group rounded-3xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40"
            >
              <div className="mb-5">
                <h3 className="text-2xl font-bold text-white">{task.title}</h3>

                <p className="mt-2 text-slate-300">{task.description}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  className="rounded-xl bg-yellow-500 px-5 py-3 font-medium transition-all duration-300 hover:scale-105 hover:bg-yellow-600"
                  onClick={() => {
                    const text = prompt("Enter new title");
                    const desc = prompt("Enter new description");

                    updateTask({
                      taskData: {
                        title: text,
                        description: desc,
                      },
                      id: task.id,
                    });
                  }}
                >
                  ✏️ Update
                </button>

                <button
                  className={`rounded-xl px-5 py-3 font-medium transition-all duration-300 hover:scale-105 ${
                    task.completed
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-600 hover:bg-gray-700"
                  }`}
                  onClick={() => {
                    updateTask({
                      taskData: {
                        completed: !task.completed,
                      },
                      id: task.id,
                    });
                  }}
                >
                  {task.completed ? "✅ Completed" : "⏳ Pending"}
                </button>

                <button
                  className="rounded-xl bg-red-500 px-5 py-3 font-medium transition-all duration-300 hover:scale-105 hover:bg-red-600"
                  onClick={() => deleteTask(task.id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
