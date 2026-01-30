# Task 4.1: Реализация добавления задачи (UC-2)

**Этап:** 4 - Базовая функциональность  
**Приоритет:** Критический  
**Юзер-кейсы:** UC-2 (Добавление новой задачи)  
**Зависимости:** Task 3.4, Task 2.2

---

## Цель
Реализовать функционал добавления новой задачи в Redux store.

---

## Изменения по файлам

### Обновить `src/components/AddTodoForm.tsx`
```tsx
import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addTodo } from '../store/todoSlice';

const AddTodoForm = () => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация: не добавлять пустые задачи
    const trimmedText = text.trim();
    if (!trimmedText) {
      return;
    }
    
    // Dispatch action
    dispatch(addTodo(trimmedText));
    
    // Очистка поля
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!text.trim()}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
```

---

## Интеграция
После выполнения этой задачи:
- Добавление задач работает полностью
- Задачи добавляются в Redux store
- TodoList автоматически отображает новые задачи

---

## Тест-кейсы
1. Ввести текст задачи и нажать "Add"
2. Убедиться, что задача появилась в списке
3. Попробовать добавить пустую задачу (только пробелы) - не должно работать
4. Добавить несколько задач подряд
5. Проверить, что поле очищается после каждого добавления
6. Проверить работу через Enter

---

## Критерии приёмки
- ✅ dispatch(addTodo) вызывается при submit
- ✅ Валидация: пустые задачи не добавляются
- ✅ Кнопка disabled когда поле пустое
- ✅ Новые задачи появляются в списке
- ✅ Поле очищается после добавления
