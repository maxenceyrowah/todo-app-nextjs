"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getTodos, saveTodos } from "@/gateways/todos";

import { useTheme } from "@/contexts/ThemeContext";

export default function UpdateTaskPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const params = useParams();
  const id = Number(params.id);
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const todos = getTodos();
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
      setNotFound(true);
      return;
    }
    setTitle(todo.title);
    setCompleted(todo.completed);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") {
      setError("Le titre est requis.");
      return;
    }
    const todos = getTodos();
    const idx = todos.findIndex((t) => t.id === id);
    if (idx === -1) {
      setNotFound(true);
      return;
    }
    if (idx !== -1) {
      todos[idx].title = title.trim();
      todos[idx].completed = completed;
      saveTodos(todos);
    }
    router.push("/tasks");
  };

  if (notFound) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-4">
        <div className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl p-8 backdrop-blur-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Tâche introuvable
          </h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl shadow transition"
            onClick={() => router.push("/tasks")}
          >
            Retour à la liste
          </button>
        </div>
      </main>
    );
  }

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
  const errorColor =
    theme === "dark"
      ? "text-red-400"
      : theme === "pastel"
      ? "text-pink-500"
      : "text-red-600";

  return (
    <main
      className={`min-h-screen flex items-center justify-center ${mainBg} p-4`}
    >
      <div
        className={`w-full max-w-md ${cardBg} rounded-xl shadow-lg p-8 animate-fade-in-up`}
      >
        <h1
          className={`text-xl font-semibold mb-6 ${titleColor} text-center animate-fade-in`}
        >
          Modifier la tâche
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            placeholder="Titre de la tâche"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base text-gray-800"
            autoFocus
          />
          <label className="text-gray-700 text-sm font-medium">Statut</label>
          <select
            value={completed ? "done" : "pending"}
            onChange={(e) => setCompleted(e.target.value === "done")}
            className={`border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base ${titleColor}`}
          >
            <option value="pending">En cours</option>
            <option value="done">Terminée</option>
          </select>
          {error && (
            <div className={`${errorColor} text-sm font-medium animate-shake`}>
              {error}
            </div>
          )}
          <div className="flex gap-2 justify-end mt-2">
            <button
              type="button"
              className={`px-4 py-2 rounded-lg font-semibold`}
              onClick={() => router.push("/tasks")}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow"
            >
              Enregistrer
            </button>
          </div>
        </form>
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
          @keyframes shake {
            10%,
            90% {
              transform: translateX(-1px);
            }
            20%,
            80% {
              transform: translateX(2px);
            }
            30%,
            50%,
            70% {
              transform: translateX(-4px);
            }
            40%,
            60% {
              transform: translateX(4px);
            }
          }
          .animate-shake {
            animation: shake 0.4s;
          }
        `}</style>
      </div>
    </main>
  );
}
