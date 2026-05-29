import { useEffect, useMemo, useState } from 'react';
import { RecipeCard } from '../components/recipe/RecipeCard';
import { RecipeFilters } from '../components/recipe/RecipeFilters';
import { PageState } from '../components/common/PageState';
import { api } from '../services/api';
import { Recipe } from '../types/recipe';
import { Button } from '../components/common/Button';

export const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('updatedAt');

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      const query = new URLSearchParams();
      if (search) query.set('search', search);
      if (category) query.set('category', category);
      if (sort) query.set('sort', sort);
      const data = await api.getRecipes(`?${query.toString()}`);
      setRecipes(data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось загрузить рецепты');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(fetchRecipes, 250);
    return () => window.clearTimeout(timer);
  }, [search, category, sort]);

  const categories = useMemo(() => Array.from(new Set(recipes.map((item) => item.category))).sort(), [recipes]);

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <div className="mb-3 inline-flex rounded-full bg-teal-50 px-4 py-2 text-sm text-teal-700 dark:bg-teal-950/40 dark:text-teal-300">
            Современная книга рецептов
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">Готовь быстрее, считай точнее и храни рецепты в одном месте</h1>
          <p className="mt-4 max-w-2xl text-base text-stone-600 dark:text-stone-300">Каталог показывает калорийность, категории и время приготовления. Внутри карточки можно мгновенно пересчитать ингредиенты под нужный выход блюда.</p>
        </div>
        <div className="card-surface p-6">
          <div className="text-sm text-stone-500 dark:text-stone-400">Рецептов в каталоге</div>
          <div className="mt-2 text-4xl font-semibold">{recipes.length}</div>
        </div>
      </section>

      <RecipeFilters
        search={search}
        category={category}
        sort={sort}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onSortChange={setSort}
      />

      {loading ? <PageState title="Загрузка рецептов" description="Подождите немного, собираем каталог." /> : null}
      {!loading && error ? <PageState title="Не удалось загрузить данные" description={error} action={<Button onClick={fetchRecipes}>Повторить</Button>} /> : null}
      {!loading && !error && recipes.length === 0 ? <PageState title="Рецепты не найдены" description="Измените фильтры или добавьте первый рецепт через форму." /> : null}

      {!loading && !error && recipes.length > 0 ? (
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
        </section>
      ) : null}
    </div>
  );
};