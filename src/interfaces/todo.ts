export interface ITodo {
  _id: string;
  title: string;
  status: string;
}

export type TCreateTodo = Omit<ITodo, "_id">;

export interface ITodoItemProps {
  todo: ITodo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export interface ITodoFormProps {
  onAdd: (title: string) => void;
}

export interface TasksTableProps {
  todos: ITodo[];
  onEdit: (id: string) => void;
}
