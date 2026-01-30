# Task 4.2: Реализация отображения списка задач (UC-1)

**Этап:** 4 - Базовая функциональность  
**Приоритет:** Критический  
**Юзер-кейсы:** UC-1 (Просмотр списка задач)  
**Зависимости:** Task 3.2, Task 4.1

---

## Цель
Убедиться, что список задач корректно отображается после добавления.

---

## Изменения по файлам

### Проверка `src/components/TodoList.tsx`
Компонент уже реализован в Task 3.2, но нужно проверить:
- Корректное отображение добавленных задач
- Сортировка (по умолчанию в порядке добавления)
- Работа с пустым списком

Если нужно, добавить сортировку по order:

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
    .sort((a, b) => (a.order || 0) - (b.order || 0)); // Сортировка по order

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
- UC-1 полностью реализован
- Задачи отображаются в правильном порядке

---

## Тест-кейсы
1. Добавить несколько задач
2. Убедиться, что все отображаются в списке
3. Проверить порядок отображения (новые снизу)
4. Удалить все задачи - должно показаться "No tasks yet"
5. Добавить задачу снова - должна появиться в списке

---

## Критерии приёмки
- ✅ Все добавленные задачи отображаются
- ✅ Порядок отображения корректен
- ✅ Пустой список показывает placeholder
- ✅ UC-1 полностью реализован
