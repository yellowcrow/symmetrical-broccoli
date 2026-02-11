# Task 1.2: Настройка Tailwind CSS

**Этап:** 1 - Инициализация проекта  
**Приоритет:** Критический  
**Юзер-кейсы:** Базовая подготовка для стилизации (UC-1, UC-2, UC-3, UC-4)  
**Зависимости:** Task 1.1

---

## Цель
Установить и настроить Tailwind CSS для стилизации приложения.

---

## Изменения по файлам

### Установить Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Обновить `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Обновить `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Удалить `src/App.css` (если существует)
Использовать только Tailwind классы.

---

## Интеграция
После выполнения этой задачи:
- Tailwind CSS классы должны работать в компонентах
- Стартовые стили Vite должны быть заменены на Tailwind

---

## Тест-кейсы
1. Запустить проект `npm run dev`
2. Добавить тестовый класс Tailwind в App.tsx (например, `className="text-blue-500"`)
3. Убедиться, что стили применяются
4. Проверить, что нет ошибок в консоли

---

## Критерии приёмки
- ✅ Tailwind CSS установлен
- ✅ Конфигурационные файлы созданы и настроены
- ✅ index.css содержит директивы Tailwind
- ✅ Tailwind классы работают в компонентах
- ✅ Проект запускается без ошибок
