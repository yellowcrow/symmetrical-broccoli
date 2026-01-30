import { useState } from 'react';
import type { Todo } from '../types/todo.types';
import { useAppDispatch } from '../store/hooks';
import { toggleTodo, deleteTodo } from '../store/todoSlice';
import TodoItemEdit from './TodoItemEdit';
import { cn } from '../utils/cn';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (isEditing) {
    return <TodoItemEdit todo={todo} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <div 
      className={cn(
        'group flex items-center gap-3 p-4 rounded-lg border-2',
        'transition-all duration-300 ease-in-out',
        todo.completed
          ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300 opacity-75'
          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
      )}
    >
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
        />
      </label>

      <span
        className={cn(
          'flex-1 text-base transition-all duration-300',
          todo.completed
            ? 'line-through text-gray-400 italic'
            : 'text-gray-800 font-medium'
        )}
      >
        {todo.text}
      </span>

      <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleEdit}
          className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Edit todo"
          disabled={todo.completed}
        >
          ✏️ Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium"
          aria-label="Delete todo"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
