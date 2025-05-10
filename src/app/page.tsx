"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";

export default function HomePage() {
  const router = useRouter();
  const { theme } = useTheme();
  const mainBg = theme === "dark" ? "bg-gray-900" : theme === "pastel" ? "bg-gradient-to-tr from-pink-100 via-blue-100 to-purple-100" : "bg-gray-50";
  const cardBg = theme === "dark" ? "bg-gray-800" : theme === "pastel" ? "bg-white/70 backdrop-blur" : "bg-white";
  const titleColor = theme === "dark" ? "text-white" : theme === "pastel" ? "text-purple-700" : "text-gray-800";

  if (theme === "dark") {
    // Carte pleine largeur, bouton en bas
    return (
      <main className={`min-h-screen flex flex-col justify-center ${mainBg} p-0`}>        
        <div className={`w-full max-w-3xl ${cardBg} rounded-2xl shadow-2xl mx-auto p-12 flex flex-row gap-12 items-center mt-16 animate-fade-in-up`}>
          <div className="flex-1">
            <h1 className={`text-4xl font-mono font-bold mb-4 ${titleColor} animate-fade-in`}>Todo App</h1>
            <p className="mb-8 text-base text-gray-400">Gérez vos tâches simplement et efficacement.</p>
          </div>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-none shadow-lg text-lg"
            onClick={() => router.push("/tasks")}
          >Voir mes tâches</button>
        </div>
      </main>
    );
  }

  if (theme === "pastel") {
    // Carte flottante en haut, bouton en bas centré
    return (
      <main className={`min-h-screen ${mainBg} flex flex-col items-center p-0 pt-16`}>
        <div className={`w-full max-w-xl ${cardBg} rounded-3xl shadow-xl p-10 mt-0 animate-fade-in-up`}>
          <h1 className={`text-4xl font-serif font-bold mb-6 ${titleColor} text-center animate-fade-in`}>Todo App</h1>
          <p className="mb-6 text-base text-purple-800 text-center">Gérez vos tâches simplement et efficacement.</p>
        </div>
        <button
          className="mt-10 bg-pink-400 hover:bg-pink-500 text-white px-8 py-4 rounded-full font-bold shadow-lg text-lg animate-fade-in"
          onClick={() => router.push("/tasks")}
        >Voir mes tâches</button>
      </main>
    );
  }

  // Thème light classique : carte centrée
  return (
    <main className={`min-h-screen flex items-center justify-center ${mainBg} p-4`}>
      <div className={`w-full max-w-md ${cardBg} rounded-xl shadow-lg px-8 py-12 flex flex-col items-center animate-fade-in-up`}>
        <h1 className={`text-3xl font-semibold mb-3 ${titleColor} text-center animate-fade-in`}>Todo App</h1>
        <p className="mb-8 text-base text-gray-500 text-center">Gérez vos tâches simplement et efficacement.</p>
        <button
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => router.push("/tasks")}
        >
          Voir mes tâches
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
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease;
        }
      `}</style>
    </main>
  );
}
