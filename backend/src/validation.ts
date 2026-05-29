
import { z } from 'zod';

const ingredientSchema = z.object({
  name: z.string().min(1, 'Название ингредиента обязательно'),
  weight: z.number().min(0, 'Вес не может быть отрицательным'),
  calories: z.number().min(0, 'Калории не могут быть отрицательными'),
  protein: z.number().min(0, 'Белки не могут быть отрицательными'),
  fat: z.number().min(0, 'Жиры не могут быть отрицательными'),
  carbs: z.number().min(0, 'Углеводы не могут быть отрицательными')
});

export const createRecipeSchema = z.object({
  title: z.string().min(1, 'Название рецепта обязательно').max(200),
  description: z.string().default(''),
  image_url: z.string().url('Укажите корректный URL изображения').or(z.literal('')).default(''),
  category: z.string().default('Другое'),
  cooking_time: z.number().int().min(1, 'Время приготовления должно быть больше 0').default(30),
  base_weight: z.number().positive('Выход блюда должен быть больше 0'),
  calories_per100: z.number().min(0).default(0),
  protein_per100: z.number().min(0).default(0),
  fat_per100: z.number().min(0).default(0),
  carbs_per100: z.number().min(0).default(0),
  steps: z.array(z.string().min(1, 'Шаг не может быть пустым')).default([]),
  ingredients: z.array(ingredientSchema).min(1, 'Добавьте хотя бы один ингредиент')
});

export const updateRecipeSchema = createRecipeSchema.partial().extend({
  ingredients: z.array(ingredientSchema).min(1, 'Добавьте хотя бы один ингредиент').optional()
});

export type CreateRecipeDto = z.infer<typeof createRecipeSchema>;
export type UpdateRecipeDto = z.infer<typeof updateRecipeSchema>;
