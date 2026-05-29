import { formatNumber } from '../../utils/format';

interface NutritionValues {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

interface Props {
  base: NutritionValues;
  selected: NutritionValues;
  selectedWeight: number;
}

const Tile = ({ label, value, accent }: { label: string; value: number; accent: string }) => (
  <div className="rounded-3xl border border-stone-200 p-4 dark:border-stone-800">
    <div className="mb-2 text-xs uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">{label}</div>
    <div className={`text-2xl font-semibold ${accent}`}>{formatNumber(value)}</div>
  </div>
);

export const NutritionCard = ({ base, selected, selectedWeight }: Props) => (
  <div className="grid gap-6 lg:grid-cols-2">
    <div className="card-surface p-5">
      <div className="mb-4 text-sm font-medium text-stone-800 dark:text-stone-100">Пищевая ценность на 100 г</div>
      <div className="grid grid-cols-2 gap-4">
        <Tile label="Ккал" value={base.calories} accent="text-amber-600" />
        <Tile label="Белки" value={base.protein} accent="text-teal-700" />
        <Tile label="Жиры" value={base.fat} accent="text-fuchsia-700" />
        <Tile label="Углеводы" value={base.carbs} accent="text-sky-700" />
      </div>
    </div>
    <div className="card-surface p-5">
      <div className="mb-4 text-sm font-medium text-stone-800 dark:text-stone-100">Пищевая ценность на выбранную граммовку: {selectedWeight} г</div>
      <div className="grid grid-cols-2 gap-4">
        <Tile label="Ккал" value={selected.calories} accent="text-amber-600" />
        <Tile label="Белки" value={selected.protein} accent="text-teal-700" />
        <Tile label="Жиры" value={selected.fat} accent="text-fuchsia-700" />
        <Tile label="Углеводы" value={selected.carbs} accent="text-sky-700" />
      </div>
    </div>
  </div>
);