import { useState, useEffect } from 'react';
import type { Todo } from '../types/todo.types';
import { useAppDispatch } from '../store/hooks';
import { updateTodo } from '../store/todoSlice';

interface TodoItemEditProps {
  todo: Todo;
  onCancel: () => void;
}

const TodoItemEdit = ({ todo, onCancel }: TodoItemEditProps) => {
  const dispatch = useAppDispatch();
  const [editText, setEditText] = useState(todo.text);

  useEffect(() => {
    setEditText(todo.text);
  }, [todo.text]);

  const handleSave = () => {
    const trimmedText = editText.trim();
    if (trimmedText && trimmedText !== todo.text) {
      dispatch(updateTodo({ id: todo.id, text: trimmedText }));
    }
    onCancel();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
      <input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 px-3 py-2 border-2 border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoFocus
        aria-label="Edit task text"
      />
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={!editText.trim()}
        aria-label="Save changes"
      >
        Save
      </button>
      <button
        onClick={onCancel}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors font-medium text-sm"
        aria-label="Cancel editing"
      >
        Cancel
      </button>
    </div>
  );
};

export default TodoItemEdit;
