interface Props {
  baseWeight: number;
  targetWeight: string;
  onChange: (value: string) => void;
}

export const PortionCalculator = ({ baseWeight, targetWeight, onChange }: Props) => (
  <div className="card-surface p-5">
    <div className="mb-2 text-sm font-medium text-stone-800 dark:text-stone-100">Пересчёт граммовки</div>
    <p className="mb-4 text-sm text-stone-500 dark:text-stone-400">Базовый выход блюда: {baseWeight} г. Введите желаемый вес, чтобы мгновенно пересчитать ингредиенты.</p>
    <input
      className="input-base max-w-xs"
      type="number"
      min={0}
      placeholder={`Например, ${Math.round(baseWeight / 2)}`}
      value={targetWeight}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);