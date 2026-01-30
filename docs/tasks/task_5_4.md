# Task 5.4: Визуальное отличие выполненных задач

**Этап:** 5 - Стилизация и адаптивность  
**Приоритет:** Высокий  
**Юзер-кейсы:** UC-3 (улучшение визуальной обратной связи)  
**Зависимости:** Task 5.3

---

## Цель
Убедиться, что выполненные задачи имеют чёткое визуальное отличие.

---

## Изменения по файлам

### Проверка `src/components/TodoItem.tsx`
Стили уже применены в Task 5.2, но нужно убедиться в наличии:
- Зачёркнутый текст (line-through)
- Серый цвет текста (text-gray-400)
- Изменённый background (bg-gray-50)

Можно добавить анимацию при переключении:

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
        transition-all duration-300 ease-in-out
        ${todo.completed 
          ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300 opacity-75' 
          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
        }
      `}
    >
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
        />
      </label>

      <span
        className={`
          flex-1 text-base transition-all duration-300
          ${todo.completed 
            ? 'line-through text-gray-400 italic' 
            : 'text-gray-800 font-medium'
          }
        `}
      >
        {todo.text}
      </span>

      <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleEdit}
          className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors font-medium"
          aria-label="Edit todo"
          disabled={todo.completed}
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
- Выполненные задачи явно отличаются от активных
- Переход между состояниями анимирован

---

## Тест-кейсы
1. Добавить задачу
2. Отметить как выполненную - проверить визуальные изменения
3. Снять отметку - проверить возврат к исходному виду
4. Проверить плавность transitions (300ms)
5. Убедиться, что кнопка Edit недоступна для выполненных задач

---

## Критерии приёмки
- ✅ Выполненные задачи имеют line-through
- ✅ Цвет текста изменяется (gray-400)
- ✅ Background отличается (gradient gray)
- ✅ Transitions плавные (300ms)
- ✅ Edit disabled для выполненных задач
- ✅ UC-3 визуально полностью реализован
