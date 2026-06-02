<script lang="ts">
  import { book, type Recipes} from './data/recipes';

  import RecipeTable from './lib/RecipeTable.svelte';
  import CategorySelector from './lib/CategorySelector.svelte';

  const categories: string[] = Object.keys(book);
  
  let selectedCategory: string = $state( localStorage.getItem("category") || categories[0]);
  $effect(() => localStorage.setItem("category", selectedCategory));
  
  let recipes: Recipes = $derived(book[selectedCategory]);
</script>

<main>
  <h1>🍳 Pokemon Recipe Calculator</h1>
    
  <CategorySelector 
    {categories}
    bind:selectedCategory 
  />
  
  <RecipeTable 
    {recipes} 
  />
</main>

<style>
  main {
    background: #f0f2f5;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
    padding: 1rem;
  }

  h1 {
    margin: 0 0 1rem;
    font-size: 1.4rem;
    font-weight: 700;
    color: #1a1a2e;
  }

  @media (min-width: 768px) {
    main { padding: 2rem; }
    h1 { font-size: 1.6rem; }
  }
</style>
