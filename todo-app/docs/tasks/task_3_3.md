# Task 3.3: Создание компонента TodoItem (элемент задачи)

**Этап:** 3 - Базовые компоненты (заглушки)  
**Приоритет:** Критический  
**Юзер-кейсы:** UC-3 (Отметка выполненной), UC-4 (Удаление), UC-5 (Редактирование)  
**Зависимости:** Task 3.2

---

## Цель
Создать компонент для отображения одной задачи с заглушками для действий.

---

## Изменения по файлам

### Создать `src/components/TodoItem.tsx`
```tsx
import { Todo } from '../types/todo.types';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const handleToggle = () => {
    // Будет реализовано в Task 4.3
    console.log('Toggle todo:', todo.id);
  };

  const handleDelete = () => {
    // Будет реализовано в Task 4.4
    console.log('Delete todo:', todo.id);
  };

  const handleEdit = () => {
    // Будет реализовано в Task 6.1
    console.log('Edit todo:', todo.id);
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded border border-gray-200 hover:shadow-md transition-shadow">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />

      {/* Todo text */}
      <span
        className={`flex-1 text-gray-800 ${
          todo.completed ? 'line-through text-gray-400' : ''
        }`}
      >
        {todo.text}
      </span>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
          aria-label="Edit todo"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
          aria-label="Delete todo"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
```

### Обновить `src/components/TodoList.tsx`
Заменить заглушку на TodoItem компонент:

```tsx
import { useAppSelector } from '../store/hooks';
import TodoItem from './TodoItem';

const TodoList = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const filter = useAppSelector((state) => state.todos.filter);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
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
        <li key={todo.id}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
```

---

## Интеграция
После выполнения этой задачи:
- TodoItem отображает задачу с чекбоксом и кнопками
- Обработчики событий заглушены (логируют в консоль)
- TodoList использует TodoItem для каждой задачи

---

## Тест-кейсы
1. Добавить задачу через Redux DevTools
2. Убедиться, что отображается TodoItem с правильным UI
3. Кликнуть на checkbox - должно быть логирование в консоли
4. Кликнуть на "Edit" и "Delete" - должно быть логирование в консоли
5. Проверить, что выполненные задачи отображаются с line-through

---

## Критерии приёмки
- ✅ Файл `src/components/TodoItem.tsx` создан
- ✅ Компонент принимает todo prop
- ✅ Отображает checkbox, текст и кнопки действий
- ✅ Обработчики событий заглушены
- ✅ Визуальное отличие для выполненных задач
- ✅ Интегрирован в TodoList
