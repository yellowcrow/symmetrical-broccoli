# Task 5.2: Стилизация компонента TodoItem

**Этап:** 5 - Стилизация и адаптивность  
**Приоритет:** Высокий  
**Юзер-кейсы:** UC-1, UC-3, UC-4 (улучшение UX)  
**Зависимости:** Task 5.1

---

## Цель
Улучшить визуальное оформление элементов задач.

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
    console.log('Edit todo:', todo.id);
  };

  return (
    <div 
      className={`
        group flex items-center gap-3 p-4 rounded-lg border-2 
        transition-all duration-200
        ${todo.completed 
          ? 'bg-gray-50 border-gray-200' 
          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
        }
      `}
    >
      {/* Custom Checkbox */}
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
        />
      </label>

      {/* Todo text */}
      <span
        className={`
          flex-1 text-base transition-all
          ${todo.completed 
            ? 'line-through text-gray-400' 
            : 'text-gray-800'
          }
        `}
      >
        {todo.text}
      </span>

      {/* Actions - показываются при hover или всегда на мобильных */}
      <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleEdit}
          className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors font-medium"
          aria-label="Edit todo"
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
```

---

## Интеграция
После выполнения этой задачи:
- TodoItem имеет современный дизайн
- Кнопки показываются при hover (на десктопе)
- На мобильных кнопки всегда видны

---

## Тест-кейсы
1. Добавить задачи и проверить их внешний вид
2. Навести курсор - кнопки должны появиться
3. Отметить задачу как выполненную - стили должны измениться
4. Проверить на мобильном - кнопки всегда видны
5. Проверить transitions (плавность анимаций)

---

## Критерии приёмки
- ✅ Улучшенная стилизация с borders и shadows
- ✅ Hover эффекты работают
- ✅ Кнопки скрыты/показываются по hover (десктоп)
- ✅ На мобильных кнопки всегда видны
- ✅ Transitions плавные
