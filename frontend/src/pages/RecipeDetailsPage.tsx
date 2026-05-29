import { ArrowLeft, Clock3, Flame, Scale } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { PageState } from '../components/common/PageState';
import { IngredientTable } from '../components/recipe/IngredientTable';
import { NutritionCard } from '../components/recipe/NutritionCard';
import { PortionCalculator } from '../components/recipe/PortionCalculator';
import { api } from '../services/api';
import { RecipeDetails } from '../types/recipe';
import { buildNutritionForPortion } from '../utils/calculations';

export const RecipeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [targetWeight, setTargetWeight] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getRecipe(id);
        setRecipe(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Не удалось загрузить рецепт');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const nutrition = useMemo(() => {
    if (!recipe) return null;
    const parsedTarget = targetWeight.trim() === '' ? null : Number(targetWeight);
    return buildNutritionForPortion(recipe, parsedTarget);
  }, [recipe, targetWeight]);

  if (loading) return <PageState title="Загрузка рецепта" description="Получаем подробную карточку блюда." />;
  if (error || !recipe || !nutrition) return <PageState title="Рецепт недоступен" description={error || 'Не удалось найти рецепт.'} action={<Button><Link to="/">Вернуться к списку</Link></Button>} />;

  return (
    <div className="space-y-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100">
        <ArrowLeft size={16} /> Назад к рецептам
      </Link>

      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-soft dark:border-stone-800 dark:bg-stone-900">
          <img src={recipe.imageUrl} alt={recipe.title} className="aspect-[5/4] w-full object-cover" />
        </div>
        <div className="flex flex-col justify-between gap-6">
          <div>
            <div className="mb-3 inline-flex rounded-full bg-stone-100 px-4 py-2 text-sm text-stone-600 dark:bg-stone-800 dark:text-stone-300">{recipe.category}</div>
            <h1 className="text-4xl font-semibold tracking-tight">{recipe.title}</h1>
            <p className="mt-4 max-w-2xl text-base text-stone-600 dark:text-stone-300">{recipe.description}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="card-surface p-4"><div className="mb-1 flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400"><Flame size={16} /> Калорийность</div><div className="text-2xl font-semibold">{recipe.caloriesPer100} ккал</div><div className="text-sm text-stone-500 dark:text-stone-400">на 100 г</div></div>
            <div className="card-surface p-4"><div className="mb-1 flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400"><Clock3 size={16} /> Время</div><div className="text-2xl font-semibold">{recipe.cookingTime} мин</div></div>
            <div className="card-surface p-4"><div className="mb-1 flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400"><Scale size={16} /> Выход</div><div className="text-2xl font-semibold">{recipe.baseWeight} г</div></div>
          </div>
        </div>
      </section>

      <NutritionCard
        base={{ calories: recipe.caloriesPer100, protein: recipe.proteinPer100, fat: recipe.fatPer100, carbs: recipe.carbsPer100 }}
        selected={{ calories: nutrition.totals.calories, protein: nutrition.totals.protein, fat: nutrition.totals.fat, carbs: nutrition.totals.carbs }}
        selectedWeight={nutrition.selectedWeight}
      />

      <PortionCalculator baseWeight={recipe.baseWeight} targetWeight={targetWeight} onChange={setTargetWeight} />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="section-title">Ингредиенты</h2>
          <div className="text-sm text-stone-500 dark:text-stone-400">Коэффициент пересчёта: {nutrition.coefficient.toFixed(2)}</div>
        </div>
        <IngredientTable ingredients={nutrition.scaledIngredients} totals={nutrition.totals} />
      </section>

      <section className="card-surface p-6">
        <h2 className="section-title mb-4">Шаги приготовления</h2>
        <ol className="space-y-4 text-sm text-stone-700 dark:text-stone-300">
          {recipe.steps.map((step, index) => (
            <li key={index} className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold text-white">{index + 1}</div>
              <p className="pt-1">{step}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};