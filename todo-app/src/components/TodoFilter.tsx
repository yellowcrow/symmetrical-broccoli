import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setFilter } from '../store/todoSlice';
import type { TodoFilter as FilterType } from '../types/todo.types';

const TodoFilter = () => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector((state) => state.todos.filter);
  const todos = useAppSelector((state) => state.todos.todos);

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  const getCounts = (filter: FilterType) => {
    if (filter === 'all') return todos.length;
    if (filter === 'active') return todos.filter(t => !t.completed).length;
    if (filter === 'completed') return todos.filter(t => t.completed).length;
    return 0;
  };

  return (
    <div className="flex justify-center gap-2 mb-6">
      {filters.map(({ value, label }) => {
        const count = getCounts(value);
        const isActive = currentFilter === value;

        return (
          <button
            key={value}
            onClick={() => dispatch(setFilter(value))}
            className={`
              px-4 py-2 rounded-lg font-medium text-sm transition-all
              ${isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
            aria-label={`Filter ${label.toLowerCase()} tasks`}
            aria-pressed={isActive}
          >
            {label}
            <span className={`ml-1.5 ${isActive ? 'text-blue-200' : 'text-gray-500'}`}>
              ({count})
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TodoFilter;
