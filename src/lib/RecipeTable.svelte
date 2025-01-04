<script lang="ts">
  import { type Recipes, type Ingredients } from '../data/recipes';
  import { getAllIngredients, getTotalIngredients } from './helpers';

  let {recipes}: {recipes: Recipes} = $props();
  
  import ImageTooltip from './ImageTooltip.svelte';
  import RecipeRow from './RecipeRow.svelte';
//  import { trapFocus } from './utils/actions.svelte';

  let sortedRecipes = $derived(Object.entries(recipes)
    .map(([name,ingredients]) => ({ name, ingredients, totalIngredients: getTotalIngredients(ingredients)}))
    .sort((a, b) => a.totalIngredients - b.totalIngredients));
  
  let sortedIngredients: string[] = $derived(getAllIngredients(recipes));
  
  let owned: {[key: string]: number} = $state( JSON.parse(localStorage.getItem("owned")||"{}"));
  $effect(() =>  localStorage.setItem("owned", JSON.stringify(owned)) );

  let exclude: string[] = $state(JSON.parse(localStorage.getItem("exclude")||"[]"));
  $effect(() => localStorage.setItem("exclude", JSON.stringify(exclude)));
</script>

<div class="table-container">
  <table>
    <thead>
      <tr>
        <th><p>Total</p>
          <input 
          type="number"
          min="0"
          bind:value={owned['total']}
          class="limit-input"
        />
        </th>
        <th>Recipe</th>
        {#each sortedIngredients as ingredient}
          <th>
            <div class="ingredient-header">
              <ImageTooltip name={ingredient} type="ingredient" />
              <input 
                type="number"
                min="0"
                bind:value={owned[ingredient]} 
                class="limit-input"
              />
            </div>
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each sortedRecipes as { name, ingredients, totalIngredients}}
      <RecipeRow {sortedIngredients} {ingredients} {name} {totalIngredients} {owned} />
      {/each}
    </tbody>
  </table>
</div>

<style>
  .table-container {
    overflow-x: auto;
    margin: 1rem 0;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th {
    border: 1px solid rgb(255, 255, 255);
    padding: 0.1rem;
    text-align: center;
    min-width: 30px;
  }

  th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #374151;
  }

  tr:hover {
    background-color: #6bc2ee;
  }

  .ingredient-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .limit-input {
    width: 20px;
    padding: 0.15rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    text-align: center;
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
  }

  .limit-input::-webkit-outer-spin-button,
  .limit-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>