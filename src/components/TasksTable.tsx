"use client";

import { useRouter } from "next/navigation";
import { TasksTableProps } from "@/interfaces/todo";

export default function TasksTable({ todos, onEdit }: TasksTableProps) {
  const router = useRouter();
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left font-medium text-gray-700">
              Titre
            </th>
            <th className="py-3 px-4 text-left font-medium text-gray-700">
              Statut
            </th>
            <th className="py-3 px-4 text-center font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {todos.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="text-center text-gray-400 py-8 text-lg"
              >
                Aucune tâche pour le moment.
              </td>
            </tr>
          ) : (
            todos.map((todo) => (
              <tr
                key={todo._id}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4">
                  <span
                    className={
                      todo.status === "done"
                        ? "line-through text-gray-400"
                        : "text-gray-800 font-medium"
                    }
                  >
                    {todo.title}
                  </span>
                </td>

                <td className="py-3 px-4">
                  {todo.status === "done" ? (
                    <span className="px-2 py-1 rounded bg-green-50 text-green-700 text-xs font-medium">
                      Terminée
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded bg-yellow-50 text-yellow-700 text-xs font-medium">
                      En cours
                    </span>
                  )}
                </td>

                <td className="py-3 px-4 flex gap-2 justify-center">
                  <button
                    onClick={() => onEdit(todo._id)}
                    className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
                    title="Éditer"
                  >
                    Éditer
                  </button>
                  <button
                    onClick={() => router.push(`/delete-tasks/${todo._id}`)}
                    className="px-3 py-1 rounded bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-300 cursor-pointer"
                    title="Supprimer"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
