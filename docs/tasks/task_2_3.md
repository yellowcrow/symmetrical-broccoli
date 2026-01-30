# Task 2.3: Настройка Redux store и Provider

**Этап:** 2 - Redux Store и типизация  
**Приоритет:** Критический  
**Юзер-кейсы:** Все UC (базовая инфраструктура)  
**Зависимости:** Task 2.2

---

## Цель
Настроить Redux store и подключить Provider в приложение.

---

## Изменения по файлам

### Создать `src/store/store.ts`
```typescript
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Создать `src/store/hooks.ts`
```typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### Обновить `src/main.tsx`
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
```

---

## Интеграция
После выполнения этой задачи:
- Redux store доступен во всём приложении
- Типизированные хуки готовы к использованию в компонентах

---

## Тест-кейсы
1. Запустить `npm run dev`
2. Проверить в React DevTools наличие Redux Provider
3. Убедиться, что нет ошибок в консоли
4. Проверить, что Redux DevTools Extension видит store (если установлен)

---

## Критерии приёмки
- ✅ Файл `src/store/store.ts` создан и настроен
- ✅ Файл `src/store/hooks.ts` создан с типизированными хуками
- ✅ Provider подключён в main.tsx
- ✅ Приложение запускается без ошибок
- ✅ Redux store доступен через useAppSelector и useAppDispatch
