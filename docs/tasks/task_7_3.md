# Task 7.3: Синхронизация порядка задач с localStorage

**Этап:** 7 - Опциональная функциональность - Часть 2  
**Приоритет:** Низкий  
**Юзер-кейсы:** UC-7, UC-8 (Интеграция DnD с localStorage)  
**Зависимости:** Task 7.2

---

## Цель
Убедиться, что изменённый порядок задач сохраняется в localStorage.

---

## Изменения по файлам

### Проверка интеграции
Убедиться, что `src/store/store.ts` сохраняет весь state, включая поле `order`:

```typescript
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import { loadState, saveState } from '../utils/localStorage';

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState: persistedState ? { todos: persistedState } : undefined,
});

// Автосохранение включает все поля, включая order
store.subscribe(() => {
  saveState(store.getState().todos);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Проверка `src/store/todoSlice.ts`
Убедиться, что reorderTodos правильно обновляет state:

```typescript
reorderTodos: (state, action: PayloadAction<Todo[]>) => {
  state.todos = action.payload;
},
```

---

## Интеграция
После выполнения этой задачи:
- UC-7 и UC-8 работают совместно
- Порядок задач сохраняется между сеансами

---

## Тест-кейсы
1. Добавить 5 задач
2. Перетащить задачи, изменив порядок
3. Перезагрузить страницу (F5)
4. Убедиться, что порядок сохранился
5. Добавить новую задачу - она должна появиться в конце
6. Проверить в DevTools localStorage - должны быть сохранены поля order

---

## Критерии приёмки
- ✅ reorderTodos обновляет state с новым порядком
- ✅ Изменённый порядок сохраняется в localStorage
- ✅ После перезагрузки порядок восстанавливается
- ✅ Новые задачи получают правильный order
- ✅ UC-7 и UC-8 полностью интегрированы
