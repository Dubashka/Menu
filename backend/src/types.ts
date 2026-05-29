
export interface Recipe {
  id: number;
  title: string;
  description: string;
  image_url: string;
  category: string;
  cooking_time: number;
  base_weight: number;
  calories_per100: number;
  protein_per100: number;
  fat_per100: number;
  carbs_per100: number;
  steps: string;
  created_at: string;
  updated_at: string;
}

export interface RecipeIngredient {
  id: number;
  recipe_id: number;
  name: string;
  weight: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  sort_order: number;
}

export interface RecipeWithIngredients extends Recipe {
  ingredients: RecipeIngredient[];
}
