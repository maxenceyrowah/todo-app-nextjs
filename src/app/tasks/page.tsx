"use client";

import ReturnHomeButton from "@/components/TaskPageComponents/RetourHomeButton";
import TasksTable from "@/components/TasksTable";
import useTaskHooks from "@/hooks/useTaskHooks";

export default function TasksPage() {
  const {
    todos,
    handleEditTodo,
    handleCreateTask,
    handleReturnHome,
    mainBg,
    cardBg,
    titleColor,
    theme,
  } = useTaskHooks();

  return (
    <main
      className={`min-h-screen flex items-center justify-center ${mainBg} p-4`}
    >
      <div
        className={`w-full max-w-3xl ${cardBg} rounded-xl shadow-lg p-8 flex flex-col animate-fade-in-up`}
      >
        <div className="flex flex-col gap-4 mb-8">
          <ReturnHomeButton handleReturnHome={handleReturnHome} theme={theme} />

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
