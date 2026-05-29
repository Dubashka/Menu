export interface RecipeIngredient {
  id: number;
  recipeId: number;
  name: string;
  weight: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  sortOrder: number;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  cookingTime: number;
  baseWeight: number;
  caloriesPer100: number;
  proteinPer100: number;
  fatPer100: number;
  carbsPer100: number;
  steps: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RecipeWithIngredients extends Recipe {
  ingredients: RecipeIngredient[];
}

export interface DatabaseShape {
  recipes: RecipeWithIngredients[];
  meta: {
    lastRecipeId: number;
    lastIngredientId: number;
  };
}