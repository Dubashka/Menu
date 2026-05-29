import { ChefHat, Moon, SunMedium } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

export const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 border-b border-stone-200/80 bg-stone-50/90 backdrop-blur dark:border-stone-800 dark:bg-stone-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-700 text-white">
            <ChefHat size={20} />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight">Menu</div>
            <div className="text-xs text-stone-500 dark:text-stone-400">Каталог рецептов</div>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-2xl px-4 py-2 text-sm ${isActive ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-950' : 'text-stone-600 hover:bg-stone-200 dark:text-stone-300 dark:hover:bg-stone-800'}`
            }
          >
            Все рецепты
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `rounded-2xl px-4 py-2 text-sm ${isActive ? 'bg-teal-700 text-white' : 'text-stone-600 hover:bg-stone-200 dark:text-stone-300 dark:hover:bg-stone-800'}`
            }
          >
            Добавить рецепт
          </NavLink>
          <button
            onClick={toggleTheme}
            className="ml-2 flex h-11 w-11 items-center justify-center rounded-2xl border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800"
            aria-label="Переключить тему"
          >
            {isDark ? <SunMedium size={18} /> : <Moon size={18} />}
          </button>
        </nav>
      </div>
    </header>
  );
};