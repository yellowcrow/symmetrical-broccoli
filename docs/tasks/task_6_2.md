# Task 6.2: Создание компонента TodoFilter

**Этап:** 6 - Опциональная функциональность - Часть 1  
**Приоритет:** Средний  
**Юзер-кейсы:** UC-6 (Фильтрация задач)  
**Зависимости:** Task 6.1

---

## Цель
Создать компонент для фильтрации задач по статусу.

---

## Изменения по файлам

### Создать `src/components/TodoFilter.tsx`
```tsx
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setFilter } from '../store/todoSlice';
import { TodoFilter as FilterType } from '../types/todo.types';

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
```

### Обновить `src/App.tsx`
Добавить TodoFilter в layout:

```tsx
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import TodoFilter from './components/TodoFilter';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:py-12">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
            Todo List
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your tasks efficiently ✨
          </p>
        </header>

        <main className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
          <AddTodoForm />
          
          <div className="border-t border-gray-200 my-6"></div>
          
          <TodoFilter />
          <TodoList />
        </main>

        <footer className="text-center mt-8 text-gray-500 text-xs sm:text-sm">
          <p>Built with React, TypeScript, Redux Toolkit & Tailwind CSS</p>
          <p className="mt-1">💙 Made with love</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
```

---

## Интеграция
После выполнения этой задачи:
- Компонент фильтра отображается над списком задач
- Показывает количество задач для каждого фильтра

---

## Тест-кейсы
1. Добавить несколько задач (некоторые выполнить)
2. Проверить, что все кнопки фильтра отображаются
3. Проверить счётчики на каждой кнопке
4. Кликнуть на фильтры - убедиться, что active кнопка выделяется
5. Проверить адаптивность на мобильных

---

## Критерии приёмки
- ✅ Файл `src/components/TodoFilter.tsx` создан
- ✅ Три кнопки фильтра: All, Active, Completed
- ✅ Счётчики отображают правильное количество
- ✅ Активный фильтр визуально выделен
- ✅ dispatch(setFilter) вызывается при клике
- ✅ Компонент интегрирован в App
