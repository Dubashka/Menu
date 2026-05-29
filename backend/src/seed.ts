import { writeDb } from './db';
import { DatabaseShape } from './types';

const now = new Date().toISOString();

const data: DatabaseShape = {
  recipes: [
    {
      id: 1,
      title: 'Куриная грудка с булгуром',
      description: 'Сбалансированное блюдо для обеда с высоким содержанием белка и умеренной калорийностью.',
      imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
      category: 'Обед',
      cookingTime: 35,
      baseWeight: 900,
      caloriesPer100: 142,
      proteinPer100: 13.8,
      fatPer100: 4.2,
      carbsPer100: 11.3,
      steps: [
        'Отварите булгур до готовности.',
        'Обжарьте куриную грудку до золотистой корочки.',
        'Смешайте с овощами и подавайте горячим.'
      ],
      ingredients: [
        { id: 1, recipeId: 1, name: 'Куриная грудка', weight: 400, calories: 440, protein: 92, fat: 8, carbs: 0, sortOrder: 0 },
        { id: 2, recipeId: 1, name: 'Булгур', weight: 200, calories: 684, protein: 24, fat: 2.6, carbs: 150, sortOrder: 1 },
        { id: 3, recipeId: 1, name: 'Морковь', weight: 120, calories: 42, protein: 1.1, fat: 0.2, carbs: 9.6, sortOrder: 2 },
        { id: 4, recipeId: 1, name: 'Лук', weight: 100, calories: 41, protein: 1.4, fat: 0.1, carbs: 9.3, sortOrder: 3 },
        { id: 5, recipeId: 1, name: 'Оливковое масло', weight: 20, calories: 177, protein: 0, fat: 20, carbs: 0, sortOrder: 4 }
      ],
      createdAt: now,
      updatedAt: now
    },
    {
      id: 2,
      title: 'Овсянка с ягодами и йогуртом',
      description: 'Быстрый завтрак с клетчаткой и мягким сливочным вкусом.',
      imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=1200&q=80',
      category: 'Завтрак',
      cookingTime: 10,
      baseWeight: 450,
      caloriesPer100: 118,
      proteinPer100: 5.4,
      fatPer100: 3.1,
      carbsPer100: 16.8,
      steps: [
        'Залейте овсяные хлопья горячей водой или молоком.',
        'Добавьте йогурт и перемешайте.',
        'Сверху выложите ягоды и семена.'
      ],
      ingredients: [
        { id: 6, recipeId: 2, name: 'Овсяные хлопья', weight: 120, calories: 444, protein: 15.2, fat: 8.4, carbs: 73.2, sortOrder: 0 },
        { id: 7, recipeId: 2, name: 'Греческий йогурт', weight: 180, calories: 106, protein: 18, fat: 3.6, carbs: 6, sortOrder: 1 },
        { id: 8, recipeId: 2, name: 'Черника', weight: 80, calories: 46, protein: 0.6, fat: 0.3, carbs: 11.6, sortOrder: 2 },
        { id: 9, recipeId: 2, name: 'Мёд', weight: 20, calories: 61, protein: 0.1, fat: 0, carbs: 16.4, sortOrder: 3 },
        { id: 10, recipeId: 2, name: 'Семена чиа', weight: 10, calories: 49, protein: 1.6, fat: 3.1, carbs: 4.2, sortOrder: 4 }
      ],
      createdAt: now,
      updatedAt: now
    },
    {
      id: 3,
      title: 'Творожная запеканка',
      description: 'Нежная запеканка, которая подходит и на завтрак, и на десерт.',
      imageUrl: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80',
      category: 'Десерт',
      cookingTime: 50,
      baseWeight: 1000,
      caloriesPer100: 156,
      proteinPer100: 13.1,
      fatPer100: 6.4,
      carbsPer100: 11.2,
      steps: [
        'Смешайте творог, яйца и манку.',
        'Добавьте сахарозаменитель или сахар по вкусу.',
        'Выпекайте до золотистой корочки при 180 градусах.'
      ],
      ingredients: [
        { id: 11, recipeId: 3, name: 'Творог 5%', weight: 700, calories: 847, protein: 119, fat: 35, carbs: 21, sortOrder: 0 },
        { id: 12, recipeId: 3, name: 'Яйца', weight: 120, calories: 188, protein: 15.2, fat: 13.6, carbs: 1.4, sortOrder: 1 },
        { id: 13, recipeId: 3, name: 'Манная крупа', weight: 60, calories: 197, protein: 6.2, fat: 0.6, carbs: 40.8, sortOrder: 2 },
        { id: 14, recipeId: 3, name: 'Сметана', weight: 80, calories: 166, protein: 2.1, fat: 16, carbs: 2.4, sortOrder: 3 },
        { id: 15, recipeId: 3, name: 'Сахар', weight: 40, calories: 155, protein: 0, fat: 0, carbs: 39.9, sortOrder: 4 }
      ],
      createdAt: now,
      updatedAt: now
    }
  ],
  meta: {
    lastRecipeId: 3,
    lastIngredientId: 15
  }
};

writeDb(data)
  .then(() => {
    console.log('Seed completed');
  })
  .catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
  });