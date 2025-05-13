"use client";

import { ITodo } from "@/interfaces/todo";
import TodoItem from "@/components/TodoItem";

interface TodoListProps {
  todos: ITodo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({
  todos = [],
  onToggle,
  onDelete,
}: TodoListProps) {
  return (
    <div className="divide-y divide-gray-200 mt-4">
      {todos.length === 0 ? (
        <div className="text-center text-gray-400 py-8 text-lg">
          Aucune tâche pour le moment.
        </div>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}
