export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  order?: number; // для drag-and-drop (Task 7.2)
}

export type TodoFilter = 'all' | 'active' | 'completed';

export interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
}
