"use client";

import { useState, useEffect } from "react";
import { ITodo } from "@/interfaces/todo";
import { getTodos } from "@/gateways/todos";
import { useRouter } from "next/navigation";
import TasksTable from "@/components/TasksTable";

import { useTheme } from "@/contexts/ThemeContext";

export default function TasksPage() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    setTodos(getTodos());
  }, []);

  const router = useRouter();

  const handleEditTodo = (id: number) => {
    router.push(`/update-tasks/${id}`);
  };

  const handleCreateTask = () => {
    router.push("/tasks/create-task");
  };

  const { theme } = useTheme();
  const mainBg =
    theme === "dark"
      ? "bg-gray-900"
      : theme === "pastel"
      ? "bg-gradient-to-tr from-pink-100 via-blue-100 to-purple-100"
      : "bg-gray-50";
  const cardBg =
    theme === "dark"
      ? "bg-gray-800"
      : theme === "pastel"
      ? "bg-white/70 backdrop-blur"
      : "bg-white";
  const titleColor =
    theme === "dark"
      ? "text-white"
      : theme === "pastel"
      ? "text-purple-700"
      : "text-gray-800";

  return (
    <main
      className={`min-h-screen flex items-center justify-center ${mainBg} p-4`}
    >
      <div
        className={`w-full max-w-3xl ${cardBg} rounded-xl shadow-lg p-8 flex flex-col animate-fade-in-up`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1
            className={`text-2xl font-semibold ${titleColor} text-center md:text-left animate-fade-in`}
          >
            Ma Todo List
          </h1>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={handleCreateTask}
          >
            + Créer une tâche
          </button>
        </div>
        <div className="animate-fade-in-up">
          <TasksTable todos={todos} onEdit={handleEditTodo} />
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease;
        }
      `}</style>
    </main>
  );
}
