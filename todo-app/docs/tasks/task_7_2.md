# Task 7.2: Реализация drag-and-drop с библиотекой (UC-7)

**Этап:** 7 - Опциональная функциональность - Часть 2  
**Приоритет:** Низкий  
**Юзер-кейсы:** UC-7 (Перетаскивание задач)  
**Зависимости:** Task 7.1

---

## Цель
Реализовать возможность перетаскивания задач для изменения их порядка.

---

## Изменения по файлам

### Установить библиотеку
```bash
npm install @hello-pangea/dnd
```

### Обновить `src/components/TodoList.tsx`
```tsx
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { reorderTodos } from '../store/todoSlice';
import TodoItem from './TodoItem';

const TodoList = () => {
  const dispatch = useAppDispatch();
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

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    if (sourceIndex === destIndex) return;

    // Создаём новый порядок для всех задач
    const reorderedTodos = Array.from(todos);
    const [movedTodo] = reorderedTodos.splice(
      reorderedTodos.findIndex(t => t.id === filteredTodos[sourceIndex].id),
      1
    );
    reorderedTodos.splice(
      reorderedTodos.findIndex(t => t.id === filteredTodos[destIndex].id),
      0,
      movedTodo
    );

    // Обновляем order для всех задач
    const updatedTodos = reorderedTodos.map((todo, index) => ({
      ...todo,
      order: index,
    }));

    dispatch(reorderTodos(updatedTodos));
  };

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
      <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
        <span>
          {activeTodosCount} active • {completedTodosCount} completed
        </span>
        <span className="font-medium">
          Total: {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>

      {filteredTodos.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">No {filter} tasks</p>
          <p className="text-sm mt-1">
            {filter === 'active' && 'All tasks are completed! 🎉'}
            {filter === 'completed' && 'No completed tasks yet'}
          </p>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todo-list">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3"
              >
                {filteredTodos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`
                          transition-shadow
                          ${snapshot.isDragging ? 'shadow-2xl scale-105' : ''}
                        `}
                      >
                        <TodoItem todo={todo} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default TodoList;
```

### Добавить иконку перетаскивания в `src/components/TodoItem.tsx`
```tsx
// В начале компонента, перед checkbox:
<div className="cursor-move text-gray-400 hover:text-gray-600">
  ⋮⋮
</div>
```

---

## Интеграция
После выполнения этой задачи:
- Задачи можно перетаскивать мышью
- Порядок сохраняется в Redux и localStorage

---

## Тест-кейсы
1. Добавить несколько задач
2. Перетащить задачу вверх/вниз в списке
3. Убедиться, что порядок изменился
4. Перезагрузить страницу - порядок должен сохраниться
5. Попробовать перетаскивание с разными фильтрами
6. Проверить визуальную обратную связь при перетаскивании

---

## Критерии приёмки
- ✅ @hello-pangea/dnd установлен
- ✅ DragDropContext, Droppable, Draggable настроены
- ✅ Задачи можно перетаскивать
- ✅ dispatch(reorderTodos) вызывается
- ✅ Порядок сохраняется
- ✅ Визуальная обратная связь при drag
- ✅ UC-7 реализован
