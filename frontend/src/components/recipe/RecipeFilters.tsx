interface Props {
  search: string;
  category: string;
  sort: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export const RecipeFilters = ({ search, category, sort, categories, onSearchChange, onCategoryChange, onSortChange }: Props) => (
  <div className="card-surface grid gap-4 p-5 md:grid-cols-[1.8fr_1fr_1fr]">
    <div>
      <label className="label-base">Поиск по названию</label>
      <input className="input-base" placeholder="Например, овсянка" value={search} onChange={(e) => onSearchChange(e.target.value)} />
    </div>
    <div>
      <label className="label-base">Категория</label>
      <select className="input-base" value={category} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">Все категории</option>
        {categories.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
    </div>
    <div>
      <label className="label-base">Сортировка</label>
      <select className="input-base" value={sort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="updatedAt">Сначала новые</option>
        <option value="title">По названию</option>
        <option value="calories">Калорийность ↑</option>
        <option value="caloriesDesc">Калорийность ↓</option>
      </select>
    </div>
  </div>
);