"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTask } from "@/gateways/todoMongoDBGateway";

import { useTheme } from "@/contexts/ThemeContext";

export default function CreateTaskPage() {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") {
      setError("Le titre est requis.");
      return;
    }
    createTask({
      title: title.trim(),
      status: completed ? "done" : "pending",
    });
    router.push("/tasks");
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

  if (theme === "dark") {
    // Disposition horizontale, carte pleine largeur, boutons à gauche
    return (
      <main
        className={`min-h-screen flex items-center justify-center ${mainBg} p-4`}
      >
        <div
          className={`w-full max-w-3xl ${cardBg} rounded-2xl shadow-2xl p-10 flex flex-row gap-12 animate-fade-in-up`}
        >
          <div className="flex-1 flex flex-col justify-center">
            <h1
              className={`text-2xl font-mono font-bold mb-8 ${titleColor} animate-fade-in`}
            >
              Créer une tâche
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-row gap-4 items-end"
            >
              <div className="flex flex-col flex-1">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setError("");
                  }}
                  placeholder="Titre"
                  className="border border-gray-700 bg-gray-900 text-white rounded-none p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-green-400 font-mono"
                  autoFocus
                />
                <label className="text-gray-400 text-xs mb-1">Statut</label>
                <select
                  value={completed ? "done" : "pending"}
                  onChange={(e) => setCompleted(e.target.value === "done")}
                  className="border border-gray-700 bg-gray-900 text-white rounded-none p-3 focus:outline-none focus:ring-2 focus:ring-green-400 font-mono"
                >
                  <option value="pending">En cours</option>
                  <option value="done">Terminée</option>
                </select>
                {error && (
                  <div className="text-red-400 text-xs font-medium animate-shake mt-2">
                    {error}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-none font-semibold cursor-pointer"
                  onClick={() => router.push("/tasks")}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-none font-bold shadow cursor-pointer"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }

  if (theme === "pastel") {
    // Carte en haut, formulaire superposé, boutons en colonne
    return (
      <main
        className={`min-h-screen ${mainBg} flex flex-col items-center p-0 pt-12`}
      >
        <div
          className={`w-full max-w-lg ${cardBg} rounded-3xl shadow-xl p-8 mt-0 animate-fade-in-up`}
        >
          <h1
            className={`text-3xl font-serif font-bold mb-8 ${titleColor} text-center animate-fade-in`}
          >
            Nouvelle tâche
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="relative -mt-8 w-full max-w-lg flex flex-col gap-6 items-center bg-white/60 backdrop-blur-lg rounded-3xl shadow-lg p-8 animate-fade-in-up"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            placeholder="Titre de la tâche..."
            className="border border-pink-200 rounded-full p-4 focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg text-purple-700 font-serif bg-white/80"
            autoFocus
          />
          <select
            value={completed ? "done" : "pending"}
            onChange={(e) => setCompleted(e.target.value === "done")}
            className="border border-pink-200 rounded-full p-4 focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg text-purple-700 font-serif bg-white/80"
          >
            <option value="pending">En cours</option>
            <option value="done">Terminée</option>
          </select>
          {error && (
            <div className="text-pink-500 text-base font-medium animate-shake">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-3 w-full mt-2">
            <button
              type="submit"
              className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-full font-bold shadow-lg w-full"
            >
              Créer
            </button>
            <button
              type="button"
              className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-6 py-3 rounded-full font-semibold w-full"
              onClick={() => router.push("/tasks")}
            >
              Annuler
            </button>
          </div>
        </form>
      </main>
    );
  }

  // Thème light classique : vertical centré
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
          Créer une nouvelle tâche
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
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base text-gray-800 transition-all duration-200 focus:scale-[1.03] focus:shadow-lg"
            autoFocus
          />
          <label className="text-gray-700 text-sm font-medium animate-fade-in">
            Statut
          </label>
          <select
            value={completed ? "done" : "pending"}
            onChange={(e) => setCompleted(e.target.value === "done")}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base text-gray-800 transition-all duration-200 focus:scale-[1.03] focus:shadow-lg"
          >
            <option value="pending">En cours</option>
            <option value="done">Terminée</option>
          </select>
          {error && (
            <div className="text-red-600 text-sm font-medium animate-shake">
              {error}
            </div>
          )}
          <div className="flex gap-2 justify-end mt-2">
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-transform duration-150 hover:scale-105 cursor-pointer"
              onClick={() => router.push("/tasks")}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow transition-transform duration-150 hover:scale-105 focus:scale-95 cursor-pointer"
            >
              Créer
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
