"use client";

import { useRouter, useParams } from "next/navigation";
import { getTodos, saveTodos } from "@/gateways/todos";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export default function DeleteTaskPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const [notFound, setNotFound] = useState(false);
  const [title, setTitle] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    const todos = getTodos();
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
      setNotFound(true);
      return;
    }
    setTitle(todo.title);
  }, [id]);

  const handleDelete = () => {
    const todos = getTodos();
    const filtered = todos.filter((t) => t.id !== id);
    saveTodos(filtered);
    router.push("/tasks");
  };

  const handleCancel = () => {
    router.push("/tasks");
  };

  if (notFound) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-xl font-semibold text-red-600 mb-4">Tâche introuvable</h1>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
            onClick={handleCancel}
          >
            Retour à la liste
          </button>
        </div>
      </main>
    );
  }

  const mainBg = theme === "dark" ? "bg-gray-900" : theme === "pastel" ? "bg-gradient-to-tr from-pink-100 via-blue-100 to-purple-100" : "bg-gray-50";
  const cardBg = theme === "dark" ? "bg-gray-800" : theme === "pastel" ? "bg-white/70 backdrop-blur" : "bg-white";
  const titleColor = theme === "dark" ? "text-red-400" : theme === "pastel" ? "text-pink-600" : "text-red-600";

  if (theme === "dark") {
    // Carte large horizontale, boutons côte à côte à droite
    return (
      <main className={`min-h-screen flex items-center justify-center ${mainBg} p-0`}>
        <div className={`w-full max-w-2xl ${cardBg} rounded-2xl shadow-2xl mx-auto p-12 flex flex-row gap-12 items-center mt-16 animate-fade-in-up`}>
          <div className="flex-1">
            <h1 className={`text-2xl font-mono font-bold mb-4 ${titleColor} animate-fade-in`}>Confirmation de suppression</h1>
            <p className="mb-6 text-base text-gray-400">Voulez-vous vraiment supprimer la tâche&nbsp;?</p>
            <div className="mb-6 font-medium text-green-400">{title}</div>
          </div>
          <div className="flex flex-col gap-4 justify-center">
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-none font-medium"
              onClick={handleCancel}
            >Non</button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-none font-semibold shadow"
              onClick={handleDelete}
            >Oui</button>
          </div>
        </div>
      </main>
    );
  }

  if (theme === "pastel") {
    // Carte flottante, boutons en colonne
    return (
      <main className={`min-h-screen ${mainBg} flex flex-col items-center p-0 pt-16`}>
        <div className={`w-full max-w-xl ${cardBg} rounded-3xl shadow-xl p-10 mt-0 animate-fade-in-up`}>
          <h1 className={`text-2xl font-serif font-bold mb-4 ${titleColor} text-center animate-fade-in`}>Confirmation de suppression</h1>
          <p className="mb-6 text-base text-purple-800 text-center">Voulez-vous vraiment supprimer la tâche&nbsp;?</p>
          <div className="mb-6 font-medium text-pink-600 text-center">{title}</div>
          <div className="flex flex-col gap-3 w-full mt-2">
            <button
              className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-6 py-3 rounded-full font-semibold w-full"
              onClick={handleCancel}
            >Non</button>
            <button
              className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-full font-bold shadow-lg w-full"
              onClick={handleDelete}
            >Oui</button>
          </div>
        </div>
      </main>
    );
  }

  // Thème light classique : carte centrée
  return (
    <main className={`min-h-screen flex items-center justify-center ${mainBg} p-4`}>
      <div className={`w-full max-w-md ${cardBg} rounded-xl shadow-lg p-8 text-center animate-fade-in-up`}>
        <h1 className={`text-xl font-semibold ${titleColor} mb-4 animate-fade-in`}>Confirmation de suppression</h1>
        <p className="mb-6 text-base text-gray-700">Voulez-vous vraiment supprimer la tâche&nbsp;?</p>
        <div className="mb-6 font-medium text-blue-700">{title}</div>
        <div className="flex justify-center gap-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium"
            onClick={handleCancel}
          >
            Non
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold shadow"
            onClick={handleDelete}
          >
            Oui
          </button>
        </div>
        <style jsx global>{`
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(24px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          }
          @keyframes fade-in {
            from { opacity: 0; }
        `}</style>
      </div>
    </main>
  );
}
