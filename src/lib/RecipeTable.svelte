<script lang="ts">
  import { type Recipes, type Ingredients } from "../data/recipes";
  import { getAllIngredients, getTotalIngredients } from "./helpers";
  import { trapFocus } from "./actions.svelte";
  import { fly } from 'svelte/transition';

  let { recipes }: { recipes: Recipes } = $props();

  import ImageTooltip from "./ImageTooltip.svelte";

  let owned: { [key: string]: number } = $state(
    JSON.parse(localStorage.getItem("owned") || "{}"),
  );
  $effect(() => localStorage.setItem("owned", JSON.stringify(owned)));
  $effect(() =>
    [...sortedIngredients, "total"].forEach((i) => {
      if (!(i in owned)) {
        owned[i] = 0;
      }
    }),
  );

  let exclude: string[] = $state(
    JSON.parse(localStorage.getItem("exclude") || "[]"),
  );
  $effect(() => localStorage.setItem("exclude", JSON.stringify(exclude)));

  let marked: string[] = $state(
    JSON.parse(localStorage.getItem("marked") || "[]"),
  );
  $effect(() => localStorage.setItem("marked", JSON.stringify(marked)));

  let sortedIngredients: string[] = $derived(
    getAllIngredients(recipes).filter((i) => !exclude.includes(i)),
  );

  let sortedRecipes = $derived(
    Object.entries(recipes)
      .map(([name, ingredients]) => ({
        name,
        ingredients,
        totalIngredients: getTotalIngredients(ingredients),
      }))
      .filter((x) =>
        Object.keys(x.ingredients).every((i) => sortedIngredients.includes(i)),
      )
      .sort((a, b) => a.totalIngredients - b.totalIngredients),
  );
  function eat(event:Event,name: string) {
    event.stopImmediatePropagation();
    let ingredients=sortedRecipes.filter((n) => n.name === name)[0].ingredients;
    Object.entries(ingredients).forEach(([ingredient, amount]) => owned[ingredient] -= amount )
  }
</script>

<table class="exclude"><thead><tr>
  {#each exclude as ingredient}
  <th transition:fly={{ y: 100,x:100, duration: 1000 }} class="exclude" onclick={() => (exclude = exclude.filter((i) => i !== ingredient))}>
    <ImageTooltip  name={ingredient} type="ingredient" />
  </th>
  {/each}
</tr></thead></table>

<div use:trapFocus class="table-container">
  <table class="recipe-table">
    <thead>
      <tr>
        <th>
          <div class="ingredient-header">
            <div>Total</div>
            <input type="number" min="0" bind:value={owned["total"]} class="limit-input" />
          </div>
        </th>
        <th><div class="ingredient-header">Recipe</div></th>
        {#each sortedIngredients as ingredient}
        <th>
          <div class="ingredient-header">
            <ImageTooltip click={() => exclude.push(ingredient)} name={ingredient} type="ingredient" />
            <input type="number" min="0" bind:value={owned[ingredient]} class="limit-input" />
          </div>
        </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each sortedRecipes as { name, ingredients, totalIngredients }}
        <tr>
          <td>{totalIngredients}</td>
          <td
            onclick={() => {
              if (marked.includes(name)) {
                marked = marked.filter((m) => m !== name);
              } else {
                marked.push(name);
              }
            }}
            class={{
              dish: 1,
              highlight: marked.includes(name),
              enough: Object.entries(ingredients).every(
                ([ingredient, amount]) => owned[ingredient] >= amount,
              ),
              big: totalIngredients > owned["total"],
            }}
          >
            <ImageTooltip click={(e)=>eat(e,name)} {name} type="meal" />
          </td>
          {#each sortedIngredients as ingredient}
            <td
              class="quantity"
              class:enough={owned[ingredient] >= ingredients[ingredient]}
              class:missing={owned[ingredient] < ingredients[ingredient]}
            >
              {#if ingredients[ingredient]}
                <span class="quantity">{ingredients[ingredient]}</span>
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  tr:hover {
    background-color: #6bc2ee;
  }

  th.exclude {
    width: 30px;
    border-radius: 15px;
  }
  .table-container {
    overflow-x: auto;
    margin: 1rem 0;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background: #f0f2f5;
  }

  table.recipe-table {
    border-collapse: collapse;
    width: 100%;
  }

  th {
    border: 1px solid rgb(255, 255, 255);
    padding: 0.1rem;
    text-align: center;
    min-width: 20px;
  }

  th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #374151;
  }

  .ingredient-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .limit-input {
    width: 20px;
    padding: 0;
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

  tr:hover {
    background-color: #6bc2ee48;
  }

  td {
    border: 1px solid rgb(255, 255, 255);
    padding: 0.1rem;
    text-align: center;
    min-width: 20px;
    font-size: 0.8rem;
  }

  td.enough {
    background-color: #73f2344f;
  }
  td.quantity.missing * {
    color: #ff1f1f;
  }
  td.dish.big {
    border:
      #f65f56,
      2px solid;
  }
  .highlight {
    background-image: repeating-linear-gradient(
      to left top,
      transparent,
      rgba(0, 0, 0, 0.2),
      transparent 10px
    );
  }
</style>
