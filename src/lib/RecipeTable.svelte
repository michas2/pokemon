<script lang="ts">
  import { type Recipes, type Ingredients } from '../data/recipes';
  let {recipes}: {recipes: Recipes} = $props();
  console.log(recipes);
</script>

<ul>
		{#each Object.keys(recipes) as name}
			<li>
				{name}
      </li>
		{/each}
</ul>
