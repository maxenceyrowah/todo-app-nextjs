"use client";

import { ITodoItemProps } from "@/interfaces/todo";
import { useTheme } from "@/contexts/ThemeContext";

export default function TodoItem({ todo, onToggle, onDelete }: ITodoItemProps) {
  const { theme } = useTheme();

  const getBackgroundColor = () => {
    if (theme === "dark")
      return "bg-gray-800/90 hover:bg-gray-700/90 border border-gray-700";
    if (theme === "pastel")
      return "bg-white/80 hover:bg-white/90 backdrop-blur border border-purple-100";
    return "bg-white hover:bg-blue-50 border border-gray-200";
  };

  const getTextColor = () => {
    if (theme === "dark") {
      return todo.completed ? "text-gray-400" : "text-gray-100";
    }
    if (theme === "pastel") {
      return todo.completed ? "text-purple-500/70" : "text-purple-900";
    }
    return todo.completed ? "text-gray-500" : "text-gray-900";
  };

  const getHoverTextColor = () => {
    if (theme === "dark") return "group-hover:text-green-300";
    if (theme === "pastel") return "group-hover:text-pink-600";
    return "group-hover:text-blue-700";
  };

  const getDeleteButtonColor = () => {
    if (theme === "dark")
      return "bg-red-600 hover:bg-red-500 focus:ring-red-400 text-white";
    if (theme === "pastel")
      return "bg-pink-500 hover:bg-pink-600 focus:ring-pink-300 text-white";
    return "bg-red-500 hover:bg-red-600 focus:ring-red-300 text-white";
  };

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 transition-all duration-200 ${getBackgroundColor()} rounded-xl group shadow-sm mt-2 animate-fade-in`}
      style={{ animation: "fadeIn 0.4s" }}
    >
      <span
        onClick={() => onToggle(todo.id)}
        className={`cursor-pointer text-lg transition-colors duration-200 select-none 
          ${
            todo.completed ? "line-through" : ""
          } ${getTextColor()} ${getHoverTextColor()} font-semibold
        `}
        title={
          todo.completed
            ? "Marquer comme non terminée"
            : "Marquer comme terminée"
        }
      >
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className={`ml-4 px-3 py-1 rounded-lg text-xs font-bold ${getDeleteButtonColor()} transition-colors duration-150 shadow-sm focus:outline-none focus:ring-2`}
        title="Supprimer la tâche"
      >
        ✕
      </button>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
