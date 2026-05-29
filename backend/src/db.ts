import path from 'path';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import { DatabaseShape, RecipeWithIngredients } from './types';

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_PATH = path.join(DATA_DIR, 'recipes.json');

const emptyDb: DatabaseShape = {
  recipes: [],
  meta: {
    lastRecipeId: 0,
    lastIngredientId: 0
  }
};

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify(emptyDb, null, 2), 'utf-8');
}

let writeQueue = Promise.resolve();

export const getDbPath = () => DB_PATH;

export const readDb = async (): Promise<DatabaseShape> => {
  const raw = await fsPromises.readFile(DB_PATH, 'utf-8');
  const parsed = JSON.parse(raw) as DatabaseShape;

  return {
    recipes: parsed.recipes ?? [],
    meta: {
      lastRecipeId: parsed.meta?.lastRecipeId ?? 0,
      lastIngredientId: parsed.meta?.lastIngredientId ?? 0
    }
  };
};

export const writeDb = async (nextData: DatabaseShape): Promise<void> => {
  writeQueue = writeQueue.then(() =>
    fsPromises.writeFile(DB_PATH, JSON.stringify(nextData, null, 2), 'utf-8')
  );
  return writeQueue;
};

export const getAllRecipes = async (): Promise<RecipeWithIngredients[]> => {
  const db = await readDb();
  return db.recipes;
};