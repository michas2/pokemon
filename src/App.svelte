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
    <h1>Recipe Browser</h1>
  </header>
  
  <select
		bind:value={selectedCategory}	>
		{#each categories as category}
			<option value={category}> {category} </option>
		{/each}
	</select>
  
  <CategorySelector 
    {categories} 
    bind:selectedCategory 
  />
  
  <RecipeTable 
    {recipes} 
  />
</main>
