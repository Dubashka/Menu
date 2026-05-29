import { Clock3, Flame, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Recipe } from '../../types/recipe';
import { formatMinutes } from '../../utils/format';

interface Props {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: Props) => (
  <Link to={`/recipes/${recipe.id}`} className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-xl dark:border-stone-800 dark:bg-stone-900">
    <div className="aspect-[4/3] overflow-hidden bg-stone-200 dark:bg-stone-800">
      <img
        src={recipe.imageUrl || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80'}
        alt={recipe.title}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
    <div className="space-y-4 p-5">
      <div className="space-y-2">
        <div className="inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600 dark:bg-stone-800 dark:text-stone-300">
          {recipe.category}
        </div>
        <h3 className="line-clamp-2 text-lg font-semibold tracking-tight">{recipe.title}</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm text-stone-600 dark:text-stone-300">
        <div className="flex items-center gap-2"><Flame size={16} /> {recipe.caloriesPer100} ккал/100 г</div>
        <div className="flex items-center gap-2"><Clock3 size={16} /> {formatMinutes(recipe.cookingTime)}</div>
        <div className="col-span-2 flex items-center gap-2"><Tag size={16} /> Выход: {recipe.baseWeight} г</div>
      </div>
    </div>
  </Link>
);