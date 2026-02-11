# Task 7.1: Интеграция localStorage (UC-8)

**Этап:** 7 - Опциональная функциональность - Часть 2  
**Приоритет:** Низкий  
**Юзер-кейсы:** UC-8 (Сохранение в localStorage)  
**Зависимости:** Task 6.3

---

## Цель
Реализовать автоматическое сохранение и загрузку задач из localStorage.

---

## Изменения по файлам

### Создать `src/utils/localStorage.ts`
```typescript
import { TodoState } from '../types/todo.types';

const STORAGE_KEY = 'todoApp_state';

export const loadState = (): TodoState | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return undefined;
  }
};

export const saveState = (state: TodoState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

export const clearState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Error clearing state from localStorage:', err);
  }
};
```

### Обновить `src/store/store.ts`
```typescript
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import { loadState, saveState } from '../utils/localStorage';

// Загрузка состояния из localStorage
const persistedState = loadState();

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState: persistedState ? { todos: persistedState } : undefined,
});

// Подписка на изменения store для автосохранения
store.subscribe(() => {
  saveState(store.getState().todos);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---

## Интеграция
После выполнения этой задачи:
- Задачи автоматически сохраняются при любом изменении
- При перезагрузке страницы задачи восстанавливаются

---

## Тест-кейсы
1. Добавить несколько задач
2. Отметить некоторые как выполненные
3. Перезагрузить страницу (F5)
4. Убедиться, что все задачи восстановились с правильными статусами
5. Проверить в DevTools -> Application -> Local Storage наличие данных
6. Очистить localStorage и перезагрузить - должен быть пустой список

---

## Критерии приёмки
- ✅ Файл `src/utils/localStorage.ts` создан
- ✅ loadState загружает данные при инициализации
- ✅ saveState сохраняет данные при каждом изменении
- ✅ Данные сохраняются между сеансами
- ✅ Ошибки localStorage обрабатываются (try-catch)
- ✅ UC-8 полностью реализован
