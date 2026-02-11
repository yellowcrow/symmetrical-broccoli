# Task 4.4: Реализация удаления задачи (UC-4)

**Этап:** 4 - Базовая функциональность  
**Приоритет:** Критический  
**Юзер-кейсы:** UC-4 (Удаление задачи)  
**Зависимости:** Task 4.3

---

## Цель
Реализовать функционал удаления задачи из списка.

---

## Изменения по файлам

### Обновить `src/components/TodoItem.tsx`
```tsx
import { Todo } from '../types/todo.types';
import { useAppDispatch } from '../store/hooks';
import { toggleTodo, deleteTodo } from '../store/todoSlice';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleEdit = () => {
    // Будет реализовано в Task 6.1
    console.log('Edit todo:', todo.id);
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded border border-gray-200 hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />

      <span
        className={`flex-1 text-gray-800 ${
          todo.completed ? 'line-through text-gray-400' : ''
        }`}
      >
        {todo.text}
      </span>

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

---

## Интеграция
После выполнения этой задачи:
- Кнопка "Delete" удаляет задачу из списка
- Все обязательные UC (1-4) реализованы

---

## Тест-кейсы
1. Добавить несколько задач
2. Кликнуть "Delete" на одной задаче
3. Убедиться, что задача исчезла из списка
4. Удалить все задачи - должно появиться "No tasks yet"
5. Проверить в Redux DevTools, что задачи удаляются из store

---

## Критерии приёмки
- ✅ dispatch(deleteTodo) вызывается при клике
- ✅ Задача удаляется из Redux store
- ✅ Задача исчезает из UI
- ✅ UC-4 полностью реализован
- ✅ Все обязательные UC (1-4) работают
