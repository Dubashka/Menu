import { RecipeDetails, RecipeFormValues, RecipesResponse } from '../types/recipe';

const API_URL = 'http://localhost:3001/api';

const mapPayload = (values: RecipeFormValues) => ({
  title: values.title,
  description: values.description,
  image_url: values.imageUrl,
  category: values.category,
  cooking_time: Number(values.cookingTime),
  base_weight: Number(values.baseWeight),
  calories_per100: Number(values.caloriesPer100),
  protein_per100: Number(values.proteinPer100),
  fat_per100: Number(values.fatPer100),
  carbs_per100: Number(values.carbsPer100),
  steps: values.steps.map((step) => step.value).filter(Boolean),
  ingredients: values.ingredients.map((ingredient) => ({
    name: ingredient.name,
    weight: Number(ingredient.weight),
    calories: Number(ingredient.calories),
    protein: Number(ingredient.protein),
    fat: Number(ingredient.fat),
    carbs: Number(ingredient.carbs)
  }))
});

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Ошибка запроса' }));
    throw new Error(error.message || 'Ошибка запроса');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const api = {
  getRecipes(searchParams = '') {
    return request<RecipesResponse>(`/recipes${searchParams}`);
  },
  getRecipe(id: string) {
    return request<RecipeDetails>(`/recipes/${id}`);
  },
  createRecipe(values: RecipeFormValues) {
    return request<RecipeDetails>('/recipes', {
      method: 'POST',
      body: JSON.stringify(mapPayload(values))
    });
  }
};