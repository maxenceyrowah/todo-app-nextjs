import { useEffect, useState } from "react";

import { ITodo } from "@/interfaces/todo";
import { getTasks } from "@/gateways/todoMongoDBGateway";
import { useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";

const useTaskHooks = () => {
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

  return {
    todos,
    handleEditTodo,
    handleCreateTask,
    handleReturnHome,
    mainBg,
    cardBg,
    titleColor,
    theme,
  };
};

export default useTaskHooks;
