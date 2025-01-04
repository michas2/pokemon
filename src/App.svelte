<script lang="ts">
  import { book, type Book, type Recipes} from './data/recipes';

  import RecipeTable from './lib/RecipeTable.svelte';
  import CategorySelector from './lib/CategorySelector.svelte';

  const categories: string[] = Object.keys(book) as string[];
  let selectedCategory: string = $state(categories[0])
  let recipes: Recipes = $derived(book[selectedCategory]);
</script>

<main>
  <header>
    <h1>Pokemon Recipe Browser</h1>
  </header>
    
  <CategorySelector 
    {categories}
    bind:selectedCategory 
  />
  
  <RecipeTable 
    {recipes} 
  />
</main>

<style>
  header {
    text-align: center;
    margin-bottom: 3rem;
  }

  main {
    padding: 2rem 1rem;
  }

  @media (min-width: 768px) {
    main {
      padding: 2rem;
    }
  }
</style>