# Task 5.3: Стилизация общего layout и адаптивность

**Этап:** 5 - Стилизация и адаптивность  
**Приоритет:** Высокий  
**Юзер-кейсы:** Все UC (улучшение общего UX)  
**Зависимости:** Task 5.2

---

## Цель
Улучшить общий layout приложения и обеспечить адаптивность на всех устройствах.

---

## Изменения по файлам

### Обновить `src/App.tsx`
```tsx
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
            Todo List
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your tasks efficiently ✨
          </p>
        </header>

        {/* Main Card */}
        <main className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
          <AddTodoForm />
          
          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>
          
          <TodoList />
        </main>

        {/* Footer */}
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

### Обновить `src/components/TodoList.tsx`
Добавить счётчик задач:

```tsx
import { useAppSelector } from '../store/hooks';
import TodoItem from './TodoItem';

const TodoList = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const filter = useAppSelector((state) => state.todos.filter);

  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const activeTodosCount = todos.filter(t => !t.completed).length;
  const completedTodosCount = todos.filter(t => t.completed).length;

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-xl text-gray-600 font-medium mb-2">No tasks yet</p>
        <p className="text-sm text-gray-500">Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div>
      {/* Stats */}
      <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
        <span>
          {activeTodosCount} active • {completedTodosCount} completed
        </span>
        <span className="font-medium">
          Total: {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>

      {/* Todo List */}
      {filteredTodos.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No {filter} tasks</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filteredTodos.map((todo) => (
            <li key={todo.id}>
              <TodoItem todo={todo} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
```

---

## Интеграция
После выполнения этой задачи:
- Приложение имеет полированный современный дизайн
- Адаптивность работает на всех размерах экрана
- Добавлена статистика задач

---

## Тест-кейсы
1. Проверить на десктопе (1920x1080)
2. Проверить на планшете (768x1024)
3. Проверить на мобильном (375x667)
4. Добавить задачи и проверить счётчики
5. Проверить все transitions и hover эффекты

---

## Критерии приёмки
- ✅ Layout адаптивен на всех устройствах
- ✅ Градиенты и backdrop-blur применены
- ✅ Статистика задач отображается
- ✅ Стили консистентны между компонентами
- ✅ Responsive дизайн работает корректно
