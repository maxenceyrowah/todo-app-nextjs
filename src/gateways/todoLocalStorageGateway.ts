import { ITodo } from "@/interfaces/todo";

const STORAGE_KEY = "todos";

function getStoredTodos(): ITodo[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveTodos(todos: ITodo[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function getTodos(): ITodo[] {
  return getStoredTodos();
}

export function addTodo(title: string, completed: boolean = false): ITodo {
  const todos = getStoredTodos();
  const newTodo: ITodo = {
    _id: Date.now().toString(),
    title,
    status: completed ? "done" : "pending",
  };
  todos.push(newTodo);
  saveTodos(todos);
  return newTodo;
}

export function toggleTodo(id: string): void {
  const todos = getStoredTodos();
  const updatedTodos = todos.map((todo) =>
    todo._id === id
      ? { ...todo, status: todo.status === "done" ? "pending" : "done" }
      : todo
  );
  saveTodos(updatedTodos);
}

export function deleteTodo(id: string): void {
  const todos = getStoredTodos();
  const updatedTodos = todos.filter((todo) => todo._id !== id);
  saveTodos(updatedTodos);
}
