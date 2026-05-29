import { Router } from 'express';
import { readDb, writeDb } from '../db';
import { createRecipeSchema, updateRecipeSchema } from '../validation';
import { createRecipeEntity, mapRecipeListItem, updateRecipeEntity } from '../utils/serialize';

const router = Router();

router.get('/', async (req, res) => {
  const { search = '', category = '', sort = 'updatedAt' } = req.query as Record<string, string>;
  const db = await readDb();

  let items = [...db.recipes];

  if (search.trim()) {
    const query = search.trim().toLowerCase();
    items = items.filter((recipe) => recipe.title.toLowerCase().includes(query));
  }

  if (category.trim()) {
    items = items.filter((recipe) => recipe.category === category);
  }

  if (sort === 'title') {
    items.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
  } else if (sort === 'calories') {
    items.sort((a, b) => a.caloriesPer100 - b.caloriesPer100);
  } else if (sort === 'caloriesDesc') {
    items.sort((a, b) => b.caloriesPer100 - a.caloriesPer100);
  } else {
    items.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
  }

  res.json({ items: items.map(mapRecipeListItem) });
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'Некорректный ID рецепта' });
  }

  const db = await readDb();
  const recipe = db.recipes.find((item) => item.id === id);

  if (!recipe) {
    return res.status(404).json({ message: 'Рецепт не найден' });
  }

  return res.json(recipe);
});

router.post('/', async (req, res) => {
  const parsed = createRecipeSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: 'Ошибка валидации',
      errors: parsed.error.flatten()
    });
  }

  const db = await readDb();
  const recipe = createRecipeEntity(db, parsed.data);
  db.recipes.unshift(recipe);
  await writeDb(db);

  return res.status(201).json(recipe);
});

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'Некорректный ID рецепта' });
  }

  const parsed = updateRecipeSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: 'Ошибка валидации',
      errors: parsed.error.flatten()
    });
  }

  const db = await readDb();
  const index = db.recipes.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Рецепт не найден' });
  }

  const updated = updateRecipeEntity(db, db.recipes[index], parsed.data);
  db.recipes[index] = updated;
  await writeDb(db);

  return res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'Некорректный ID рецепта' });
  }

  const db = await readDb();
  const nextRecipes = db.recipes.filter((item) => item.id !== id);

  if (nextRecipes.length === db.recipes.length) {
    return res.status(404).json({ message: 'Рецепт не найден' });
  }

  db.recipes = nextRecipes;
  await writeDb(db);

  return res.status(204).send();
});

export default router;