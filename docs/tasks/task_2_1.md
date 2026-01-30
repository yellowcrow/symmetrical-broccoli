# Task 2.1: Создание типов TypeScript для Todo

**Этап:** 2 - Redux Store и типизация  
**Приоритет:** Критический  
**Юзер-кейсы:** Все UC (базовая типизация)  
**Зависимости:** Task 1.3

---

## Цель
Определить TypeScript типы и интерфейсы для Todo объектов и Redux state.

---

## Изменения по файлам

### Создать `src/types/todo.types.ts`
```typescript
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  order?: number; // для drag-and-drop (Task 7.2)
}

export type TodoFilter = 'all' | 'active' | 'completed';

export interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
}
```

---

## Интеграция
После выполнения этой задачи:
- Типы доступны для импорта в других файлах
- Redux slice может использовать эти типы

---

## Тест-кейсы
1. Проверить, что файл создан: `src/types/todo.types.ts`
2. Попробовать импортировать типы в любом файле
3. Убедиться, что нет ошибок TypeScript

---

## Критерии приёмки
- ✅ Файл `src/types/todo.types.ts` создан
- ✅ Интерфейс `Todo` определён со всеми полями
- ✅ Тип `TodoFilter` определён
- ✅ Интерфейс `TodoState` определён
- ✅ Нет ошибок TypeScript компиляции
