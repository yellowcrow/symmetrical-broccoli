# Task 4.3: Реализация переключения статуса задачи (UC-3)

**Этап:** 4 - Базовая функциональность  
**Приоритет:** Критический  
**Юзер-кейсы:** UC-3 (Отметка задачи как выполненной)  
**Зависимости:** Task 3.3, Task 2.2

---

## Цель
Реализовать функционал переключения статуса задачи (completed/not completed).

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
    // Будет реализовано в Task 4.4
    console.log('Delete todo:', todo.id);
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
- Клик по checkbox переключает статус задачи
- Выполненные задачи визуально отличаются

---

## Тест-кейсы
1. Добавить задачу
2. Кликнуть на checkbox - задача должна стать выполненной (зачёркнутой)
3. Кликнуть снова - задача должна вернуться в статус "не выполнена"
4. Добавить несколько задач и переключать их статусы
5. Проверить в Redux DevTools, что состояние меняется

---

## Критерии приёмки
- ✅ dispatch(toggleTodo) вызывается при клике
- ✅ Статус задачи переключается в Redux store
- ✅ Визуальное отображение меняется (line-through, цвет)
- ✅ Checkbox отражает текущий статус
- ✅ UC-3 полностью реализован
