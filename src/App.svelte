<script lang="ts">
  import { book, type Recipes} from './data/recipes';

  import RecipeTable from './lib/RecipeTable.svelte';
  import CategorySelector from './lib/CategorySelector.svelte';

  const categories: string[] = Object.keys(book);
  
  let selectedCategory: string = $state( localStorage.getItem("category") || categories[0]);
  $effect(() => localStorage.setItem("category", selectedCategory));
  
  let recipes: Recipes = $derived(book[selectedCategory]);

  let dark = $state(localStorage.getItem("dark") === "true" || 
    (!localStorage.getItem("dark") && window.matchMedia("(prefers-color-scheme: dark)").matches));
  $effect(() => { 
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("dark", String(dark));
  });
</script>

<main>
  <div class="top-bar">
    <h1>🍳 Pokemon Recipe Calculator</h1>
    <button class="theme-toggle" onclick={() => dark = !dark} aria-label="Toggle dark mode">
      {dark ? '☀️' : '🌙'}
    </button>
  </div>
    
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
    background: var(--card);
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    padding: 1rem;
  }

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  h1 {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--text);
  }

  .theme-toggle {
    all: unset;
    cursor: pointer;
    font-size: 1.4rem;
    padding: 0.3rem;
    border-radius: 6px;
    transition: background 0.2s;
  }
  .theme-toggle:hover { background: var(--hover); }

  @media (min-width: 768px) {
    main { padding: 2rem; }
    h1 { font-size: 1.6rem; }
  }
</style>
