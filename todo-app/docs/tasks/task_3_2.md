# Task 3.2: Создание компонента TodoList (список задач)

**Этап:** 3 - Базовые компоненты (заглушки)  
**Приоритет:** Критический  
**Юзер-кейсы:** UC-1 (Просмотр списка задач)  
**Зависимости:** Task 3.1

---

## Цель
Создать компонент для отображения списка задач с заглушками TodoItem.

---

## Изменения по файлам

### Создать `src/components/TodoList.tsx`
```tsx
import { useAppSelector } from '../store/hooks';

const TodoList = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const filter = useAppSelector((state) => state.todos.filter);

  // Фильтрация (будет полностью реализована в Task 6.3)
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg">No tasks yet</p>
        <p className="text-sm">Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {filteredTodos.map((todo) => (
        <li key={todo.id} className="p-3 bg-gray-50 rounded border border-gray-200">
          {/* TodoItem будет здесь - Task 3.3 */}
          <div className="text-gray-700">
            {todo.text} {todo.completed ? '✓' : '○'}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
```

### Обновить `src/App.tsx`
Заменить placeholder TodoList на реальный компонент:

```tsx
import { useAppSelector } from './store/hooks';
import TodoList from './components/TodoList';

function App() {
  // ... остальной код

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Todo List
          </h1>
          <p className="text-gray-600">
            Manage your tasks efficiently
          </p>
        </header>

        <main className="bg-white rounded-lg shadow-lg p-6">
          {/* AddTodoForm placeholder */}
          <div className="mb-4 p-4 bg-gray-50 rounded text-gray-500 text-center">
            Add Todo Form (placeholder)
          </div>

          {/* TodoList компонент */}
          <TodoList />
        </main>

        <footer className="text-center mt-8 text-gray-600 text-sm">
          Built with React, TypeScript, Redux Toolkit & Tailwind CSS
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
- TodoList отображает список задач из Redux store
- Показывает сообщение, если список пуст
- Готов к интеграции с TodoItem компонентом

---

## Тест-кейсы
1. Запустить приложение
2. Убедиться, что отображается "No tasks yet"
3. Вручную добавить задачу через Redux DevTools
4. Проверить, что задача отобразилась в списке

---

## Критерии приёмки
- ✅ Файл `src/components/TodoList.tsx` создан
- ✅ Компонент читает todos из Redux store
- ✅ Отображает сообщение при пустом списке
- ✅ Отображает задачи с заглушкой UI
- ✅ Компонент интегрирован в App.tsx
