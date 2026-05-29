import { Route, Routes } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { CreateRecipePage } from '../pages/CreateRecipePage';
import { RecipeDetailsPage } from '../pages/RecipeDetailsPage';
import { RecipesPage } from '../pages/RecipesPage';

const App = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-50">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
        <Routes>
          <Route path="/" element={<RecipesPage />} />
          <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
          <Route path="/create" element={<CreateRecipePage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;