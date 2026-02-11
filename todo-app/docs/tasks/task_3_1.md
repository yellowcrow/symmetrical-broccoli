# Task 3.1: Создание компонента App (основной layout)

**Этап:** 3 - Базовые компоненты (заглушки)  
**Приоритет:** Критический  
**Юзер-кейсы:** Базовая структура для всех UC  
**Зависимости:** Task 2.3

---

## Цель
Создать основной layout приложения с контейнером для Todo компонентов.

---

## Изменения по файлам

### Обновить `src/App.tsx`
```tsx
import { useAppSelector } from './store/hooks';

function App() {
  const todos = useAppSelector((state) => state.todos.todos);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Todo List
          </h1>
          <p className="text-gray-600">
            Manage your tasks efficiently
          </p>
        </header>

        <main className="bg-white rounded-lg shadow-lg p-6">
          {/* AddTodoForm будет здесь - Task 3.4 */}
          <div className="mb-4 p-4 bg-gray-50 rounded text-gray-500 text-center">
            Add Todo Form (placeholder)
          </div>

          {/* TodoFilter будет здесь - Task 6.2 */}
          
          {/* TodoList будет здесь - Task 3.2 */}
          <div className="p-4 bg-gray-50 rounded text-gray-500 text-center">
            Todo List (placeholder) - {todos.length} todos
          </div>
        </main>

        <footer className="text-center mt-8 text-gray-600 text-sm">
          Built with React, TypeScript, Redux Toolkit & Tailwind CSS
        </footer>
      </div>
    </div>
  );
}

export default App;
```

---

## Интеграция
После выполнения этой задачи:
- Основной layout готов для размещения компонентов
- Есть связь с Redux store (счётчик todos)

---

## Тест-кейсы
1. Запустить `npm run dev`
2. Убедиться, что отображается заголовок и layout
3. Проверить, что отображается "0 todos"
4. Проверить адаптивность (изменить размер окна браузера)

---

## Критерии приёмки
- ✅ App.tsx обновлён с новым layout
- ✅ Layout адаптивен (max-w-2xl, padding)
- ✅ Есть placeholder для будущих компонентов
- ✅ Подключён к Redux store (читает количество todos)
- ✅ Стили Tailwind применены
