import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../common/Button';
import { TextAreaField, TextField } from './Field';
import { RecipeFormValues } from '../../types/recipe';

const ingredientSchema = z.object({
  name: z.string().min(1, 'Название обязательно'),
  weight: z.coerce.number().min(0, 'Не меньше 0'),
  calories: z.coerce.number().min(0, 'Не меньше 0'),
  protein: z.coerce.number().min(0, 'Не меньше 0'),
  fat: z.coerce.number().min(0, 'Не меньше 0'),
  carbs: z.coerce.number().min(0, 'Не меньше 0')
});

const recipeSchema = z.object({
  title: z.string().min(1, 'Введите название'),
  description: z.string().min(1, 'Введите описание'),
  imageUrl: z.string().url('Введите корректный URL').or(z.literal('')),
  category: z.string().min(1, 'Выберите категорию'),
  cookingTime: z.coerce.number().min(1, 'Минимум 1 минута'),
  baseWeight: z.coerce.number().min(1, 'Минимум 1 грамм'),
  caloriesPer100: z.coerce.number().min(0),
  proteinPer100: z.coerce.number().min(0),
  fatPer100: z.coerce.number().min(0),
  carbsPer100: z.coerce.number().min(0),
  steps: z.array(z.object({ value: z.string().min(1, 'Шаг не может быть пустым') })).min(1, 'Добавьте хотя бы один шаг'),
  ingredients: z.array(ingredientSchema).min(1, 'Добавьте хотя бы один ингредиент')
});

const defaultValues: RecipeFormValues = {
  title: '',
  description: '',
  imageUrl: '',
  category: 'Обед',
  cookingTime: 30,
  baseWeight: 1000,
  caloriesPer100: 0,
  proteinPer100: 0,
  fatPer100: 0,
  carbsPer100: 0,
  steps: [{ value: '' }],
  ingredients: [{ name: '', weight: 0, calories: 0, protein: 0, fat: 0, carbs: 0 }]
};

interface Props {
  onSubmit: (values: RecipeFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export const RecipeForm = ({ onSubmit, isSubmitting }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues
  });

  const ingredientsFieldArray = useFieldArray({ control, name: 'ingredients' });
  const stepsFieldArray = useFieldArray({ control, name: 'steps' });

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <section className="card-surface grid gap-5 p-6 lg:grid-cols-2">
        <TextField label="Название рецепта" error={errors.title?.message} {...register('title')} />
        <TextField label="Категория" error={errors.category?.message} {...register('category')} />
        <div className="lg:col-span-2">
          <TextAreaField label="Описание" error={errors.description?.message} {...register('description')} />
        </div>
        <div className="lg:col-span-2">
          <TextField label="URL изображения" error={errors.imageUrl?.message} {...register('imageUrl')} />
        </div>
        <TextField label="Время приготовления, мин" type="number" error={errors.cookingTime?.message} {...register('cookingTime')} />
        <TextField label="Выход блюда, г" type="number" error={errors.baseWeight?.message} {...register('baseWeight')} />
      </section>

      <section className="card-surface p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="section-title">КБЖУ на 100 г</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <TextField label="Калории" type="number" error={errors.caloriesPer100?.message} {...register('caloriesPer100')} />
          <TextField label="Белки" type="number" error={errors.proteinPer100?.message} {...register('proteinPer100')} />
          <TextField label="Жиры" type="number" error={errors.fatPer100?.message} {...register('fatPer100')} />
          <TextField label="Углеводы" type="number" error={errors.carbsPer100?.message} {...register('carbsPer100')} />
        </div>
      </section>

      <section className="card-surface p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="section-title">Шаги приготовления</h2>
          <Button type="button" variant="ghost" onClick={() => stepsFieldArray.append({ value: '' })}><Plus size={16} className="mr-2" /> Добавить шаг</Button>
        </div>
        <div className="space-y-4">
          {stepsFieldArray.fields.map((field, index) => (
            <div key={field.id} className="flex gap-3">
              <textarea className="input-base min-h-[96px]" placeholder={`Шаг ${index + 1}`} {...register(`steps.${index}.value`)} />
              <Button type="button" variant="ghost" onClick={() => stepsFieldArray.remove(index)} disabled={stepsFieldArray.fields.length === 1}>
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
          {errors.steps?.message ? <p className="text-xs text-rose-600">{errors.steps.message}</p> : null}
        </div>
      </section>

      <section className="card-surface p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="section-title">Ингредиенты</h2>
          <Button type="button" variant="ghost" onClick={() => ingredientsFieldArray.append({ name: '', weight: 0, calories: 0, protein: 0, fat: 0, carbs: 0 })}>
            <Plus size={16} className="mr-2" /> Добавить ингредиент
          </Button>
        </div>
        <div className="space-y-4">
          {ingredientsFieldArray.fields.map((field, index) => (
            <div key={field.id} className="rounded-3xl border border-stone-200 p-4 dark:border-stone-800">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm font-medium">Ингредиент #{index + 1}</div>
                <Button type="button" variant="ghost" onClick={() => ingredientsFieldArray.remove(index)} disabled={ingredientsFieldArray.fields.length === 1}>
                  <Trash2 size={16} />
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <TextField label="Название" error={errors.ingredients?.[index]?.name?.message} {...register(`ingredients.${index}.name`)} />
                <TextField label="Граммовка" type="number" error={errors.ingredients?.[index]?.weight?.message?.toString()} {...register(`ingredients.${index}.weight`)} />
                <TextField label="Калории" type="number" error={errors.ingredients?.[index]?.calories?.message?.toString()} {...register(`ingredients.${index}.calories`)} />
                <TextField label="Белки" type="number" error={errors.ingredients?.[index]?.protein?.message?.toString()} {...register(`ingredients.${index}.protein`)} />
                <TextField label="Жиры" type="number" error={errors.ingredients?.[index]?.fat?.message?.toString()} {...register(`ingredients.${index}.fat`)} />
                <TextField label="Углеводы" type="number" error={errors.ingredients?.[index]?.carbs?.message?.toString()} {...register(`ingredients.${index}.carbs`)} />
              </div>
            </div>
          ))}
          {errors.ingredients?.message ? <p className="text-xs text-rose-600">{errors.ingredients.message}</p> : null}
        </div>
      </section>

      <div className="flex justify-end">
        <Button type="submit" className="min-w-[220px]" disabled={isSubmitting}>
          {isSubmitting ? 'Сохраняем...' : 'Сохранить рецепт'}
        </Button>
      </div>
    </form>
  );
};