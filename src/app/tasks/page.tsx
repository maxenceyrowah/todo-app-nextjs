"use client";

import { useState, useEffect } from "react";

import { ITodo } from "@/interfaces/todo";
import { useRouter } from "next/navigation";
import TasksTable from "@/components/TasksTable";
import { useTheme } from "@/contexts/ThemeContext";
import { getTasks } from "@/gateways/todoMongoDBGateway";

export default function TasksPage() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    const tasks = await getTasks();
    console.log(tasks);
    setTodos(tasks);
  };

  const router = useRouter();

  const handleEditTodo = (id: string) => {
    router.push(`/update-tasks/${id}`);
  };

  const handleCreateTask = () => {
    router.push("/tasks/create-task");
  };

  const handleReturnHome = () => {
    router.push("/");
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
        <div className="flex flex-col gap-4 mb-8">
          <button
            onClick={handleReturnHome}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 w-fit ${
              theme === "dark"
                ? "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
                : theme === "pastel"
                ? "bg-white/80 hover:bg-white text-purple-700 hover:text-purple-800"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900"
            } shadow-sm hover:shadow-md`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Retour
          </button>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
