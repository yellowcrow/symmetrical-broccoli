# Task 2.2: Создание todoSlice с actions и reducers

**Этап:** 2 - Redux Store и типизация  
**Приоритет:** Критический  
**Юзер-кейсы:** UC-1, UC-2, UC-3, UC-4, UC-5, UC-6, UC-7  
**Зависимости:** Task 2.1

---

## Цель
Создать Redux Toolkit slice для управления состоянием задач.

---

## Изменения по файлам

### Создать `src/store/todoSlice.ts`
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoState, TodoFilter } from '../types/todo.types';

const initialState: TodoState = {
  todos: [],
  filter: 'all',
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
        createdAt: Date.now(),
        order: state.todos.length,
      };
      state.todos.push(newTodo);
    },
    
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(t => t.id !== action.payload);
    },
    
    updateTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.todos.find(t => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    
    setFilter: (state, action: PayloadAction<TodoFilter>) => {
      state.filter = action.payload;
    },
    
    reorderTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodo,
  setFilter,
  reorderTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
```

---

## Интеграция
После выполнения этой задачи:
- Slice готов к подключению в store
- Actions доступны для использования в компонентах

---

## Тест-кейсы
1. Проверить, что файл создан: `src/store/todoSlice.ts`
2. Убедиться, что нет ошибок TypeScript
3. Проверить экспорт actions и reducer

---

## Критерии приёмки
- ✅ Файл `src/store/todoSlice.ts` создан
- ✅ Все необходимые actions определены
- ✅ Reducer использует Redux Toolkit и Immer
- ✅ Типизация корректна
- ✅ Нет ошибок компиляции
