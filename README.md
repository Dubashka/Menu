
# Menu — Recipe Book App

Полноценное full-stack веб-приложение для рецептов.

## Stack
- Frontend: React 18 + TypeScript + Vite + Tailwind CSS
- Backend: Node.js + Express + TypeScript
- Database: SQLite (`better-sqlite3`)

## Почему такой стек
- React + TypeScript + Vite: быстрый DX, строгая типизация, удобная модульная архитектура.
- Express: простой и надёжный REST API для MVP без лишней сложности.
- SQLite: zero-config база для локального запуска и демо; структуру легко перенести на PostgreSQL позже.

## Возможности
- Просмотр всех рецептов
- Поиск, фильтрация, сортировка
- Детальная страница рецепта
- Мгновенный пересчёт ингредиентов под нужную граммовку
- Блок пищевой ценности на 100 г и на выбранный выход
- Создание рецепта через валидируемую форму
- Seed-данные для демонстрации

## Запуск

### Backend
```bash
cd backend
npm install
npm run seed
npm run dev
```

API будет на http://localhost:3001/api

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Приложение будет на http://localhost:5173
