import { z } from 'zod';

const ingredientSchema = z.object({
  name: z.string().min(1, 'Название ингредиента обязательно'),
  weight: z.number().min(0, 'Вес не может быть отрицательным'),
  calories: z.number().min(0),
  protein: z.number().min(0),
  fat: z.number().min(0),
  carbs: z.number().min(0),
});

export const createRecipeSchema = z.object({
  title: z.string().min(1, 'Название рецепта обязательно').max(200),
  description: z.string().default(''),
  image_url: z.string().default(''),
  category: z.string().default('Другое'),
  cooking_time: z.number().int().min(1).default(30),
  base_weight: z.number().positive('Выход блюда должен быть больше 0'),
  calories_per100: z.number().min(0).default(0),
  protein_per100: z.number().min(0).default(0),
  fat_per100: z.number().min(0).default(0),
  carbs_per100: z.number().min(0).default(0),
  steps: z.array(z.string()).default([]),
  ingredients: z.array(ingredientSchema).min(1, 'Добавьте хотя бы один ингредиент'),
});

export const updateRecipeSchema = createRecipeSchema.partial().extend({
  ingredients: z.array(ingredientSchema).optional(),
});

export type CreateRecipeDto = z.infer<typeof createRecipeSchema>;
export type UpdateRecipeDto = z.infer<typeof updateRecipeSchema>;
