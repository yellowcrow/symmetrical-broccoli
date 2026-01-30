# Task 6.3: Реализация фильтрации задач (UC-6)

**Этап:** 6 - Опциональная функциональность - Часть 1  
**Приоритет:** Средний  
**Юзер-кейсы:** UC-6 (Фильтрация задач по статусу)  
**Зависимости:** Task 6.2

---

## Цель
Убедиться, что фильтрация задач работает корректно.

---

## Изменения по файлам

### Проверка `src/components/TodoList.tsx`
Фильтрация уже реализована в Task 3.2, но нужно проверить корректность:

```tsx
import { useAppSelector } from '../store/hooks';
import TodoItem from './TodoItem';

const TodoList = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const filter = useAppSelector((state) => state.todos.filter);

  // Фильтрация
  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true; // 'all'
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

      {/* Filtered List */}
      {filteredTodos.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">No {filter} tasks</p>
          <p className="text-sm mt-1">
            {filter === 'active' && 'All tasks are completed! 🎉'}
            {filter === 'completed' && 'No completed tasks yet'}
          </p>
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
- Фильтры изменяют отображаемый список задач
- UC-6 полностью реализован

---

## Тест-кейсы
1. Добавить 5 задач
2. Отметить 2 задачи как выполненные
3. Кликнуть "Active" - должны показаться только 3 активные
4. Кликнуть "Completed" - должны показаться только 2 выполненные
5. Кликнуть "All" - должны показаться все 5 задач
6. Проверить сообщение, когда фильтр не находит задач
7. Проверить, что счётчики в TodoFilter обновляются

---

## Критерии приёмки
- ✅ Фильтр "All" показывает все задачи
- ✅ Фильтр "Active" показывает только невыполненные
- ✅ Фильтр "Completed" показывает только выполненные
- ✅ Сообщение отображается при пустом результате фильтрации
- ✅ Счётчики задач корректны
- ✅ UC-6 полностью реализован
