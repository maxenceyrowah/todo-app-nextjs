import axios from "axios";

import { TCreateTodo, ITodo } from "@/interfaces/todo";

const API_BASE_URL = "http://localhost:3000/api/tasks";

export const getTasks = async (): Promise<ITodo[]> => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const getTaskById = async (id: string): Promise<ITodo> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const createTask = async (task: TCreateTodo): Promise<ITodo> => {
  const response = await axios.post(API_BASE_URL, task);
  return response.data;
};

export const updateTask = async (
  id: string,
  updatedTask: TCreateTodo
): Promise<ITodo> => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, updatedTask);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
