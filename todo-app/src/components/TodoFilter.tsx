import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setFilter } from '../store/todoSlice';
import { makeSelectFilterCount } from '../store/selectors';
import type { TodoFilter as FilterType } from '../types/todo.types';
import { cn } from '../utils/cn';

const TodoFilter = () => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector((state) => state.todos.filter);

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  // Создаём селекторы для каждого фильтра
  const selectAllCount = useMemo(() => makeSelectFilterCount('all'), []);
  const selectActiveCount = useMemo(() => makeSelectFilterCount('active'), []);
  const selectCompletedCount = useMemo(() => makeSelectFilterCount('completed'), []);

  const allCount = useAppSelector(selectAllCount);
  const activeCount = useAppSelector(selectActiveCount);
  const completedCount = useAppSelector(selectCompletedCount);

  const getCount = (value: FilterType) => {
    if (value === 'all') return allCount;
    if (value === 'active') return activeCount;
    return completedCount;
  };

  return (
    <div className="flex justify-center gap-2 mb-6">
      {filters.map(({ value, label }) => {
        const count = getCount(value);
        const isActive = currentFilter === value;

        return (
          <button
            key={value}
            onClick={() => dispatch(setFilter(value))}
            className={cn(
              'px-4 py-2 rounded-lg font-medium text-sm transition-all',
              isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
            aria-label={`Filter ${label.toLowerCase()} tasks`}
            aria-pressed={isActive}
          >
            {label}
            <span className={cn('ml-1.5', isActive ? 'text-blue-200' : 'text-gray-500')}>
              ({count})
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TodoFilter;
