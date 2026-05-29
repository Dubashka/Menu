import { Ingredient } from '../../types/recipe';
import { formatNumber } from '../../utils/format';

interface Props {
  ingredients: Ingredient[];
  totals: { weight: number; calories: number; protein: number; fat: number; carbs: number };
}

export const IngredientTable = ({ ingredients, totals }: Props) => (
  <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-stone-100 text-left text-stone-600 dark:bg-stone-800 dark:text-stone-300">
          <tr>
            <th className="px-4 py-3 font-medium">Ингредиент</th>
            <th className="px-4 py-3 font-medium">Вес, г</th>
            <th className="px-4 py-3 font-medium">Ккал</th>
            <th className="px-4 py-3 font-medium">Белки</th>
            <th className="px-4 py-3 font-medium">Жиры</th>
            <th className="px-4 py-3 font-medium">Углеводы</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <tr key={ingredient.name} className="border-t border-stone-200 dark:border-stone-800">
              <td className="px-4 py-3 font-medium">{ingredient.name}</td>
              <td className="px-4 py-3">{formatNumber(ingredient.weight)}</td>
              <td className="px-4 py-3">{formatNumber(ingredient.calories)}</td>
              <td className="px-4 py-3">{formatNumber(ingredient.protein)}</td>
              <td className="px-4 py-3">{formatNumber(ingredient.fat)}</td>
              <td className="px-4 py-3">{formatNumber(ingredient.carbs)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="border-t border-stone-300 bg-stone-50 font-semibold dark:border-stone-700 dark:bg-stone-950">
          <tr>
            <td className="px-4 py-3">Итого</td>
            <td className="px-4 py-3">{formatNumber(totals.weight)}</td>
            <td className="px-4 py-3">{formatNumber(totals.calories)}</td>
            <td className="px-4 py-3">{formatNumber(totals.protein)}</td>
            <td className="px-4 py-3">{formatNumber(totals.fat)}</td>
            <td className="px-4 py-3">{formatNumber(totals.carbs)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
);