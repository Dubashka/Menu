import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageState } from '../components/common/PageState';
import { RecipeForm } from '../components/form/RecipeForm';
import { api } from '../services/api';
import { RecipeFormValues } from '../types/recipe';

export const CreateRecipePage = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: RecipeFormValues) => {
    try {
      setSubmitting(true);
      setError(null);
      const recipe = await api.createRecipe(values);
      navigate(`/recipes/${recipe.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось сохранить рецепт');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-4 lg:grid-cols-[1fr_340px] lg:items-start">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Создание рецепта</h1>
          <p className="mt-3 max-w-2xl text-base text-stone-600 dark:text-stone-300">Заполните карточку блюда, добавьте ингредиенты и шаги приготовления. После сохранения рецепт сразу появится в общем списке.</p>
        </div>
        <div className="card-surface p-5 text-sm text-stone-600 dark:text-stone-300">
          <div className="font-medium text-stone-900 dark:text-stone-100">Что валидируется</div>
          <ul className="mt-3 space-y-2">
            <li>Название обязательно.</li>
            <li>Нужен минимум один ингредиент.</li>
            <li>Числовые значения не могут быть отрицательными.</li>
            <li>Ошибки показываются рядом с полями.</li>
          </ul>
        </div>
      </section>

      {error ? <PageState title="Ошибка сохранения" description={error} /> : null}
      <RecipeForm onSubmit={handleSubmit} isSubmitting={submitting} />
    </div>
  );
};