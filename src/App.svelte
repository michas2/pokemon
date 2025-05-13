<script lang="ts">
  import { book, type Book, type Recipes} from './data/recipes';

  import RecipeTable from './lib/RecipeTable.svelte';
  import CategorySelector from './lib/CategorySelector.svelte';

  const categories: string[] = Object.keys(book) as string[];
  
  let selectedCategory: string = $state( localStorage.getItem("category") || categories[0]);
  $effect(() => localStorage.setItem("category", selectedCategory));
  
  let recipes: Recipes = $derived(book[selectedCategory]);
</script>

<main>
  <header>
    <h1>Pokemon Recipe Calculator</h1>
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
    background-color: antiquewhite;
    border-radius: 15px;
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
