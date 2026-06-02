<script lang="ts">
  import { type Recipes } from "../data/recipes";
  import { getAllIngredients, getTotalIngredients } from "./helpers";
  import { trapInputFocus } from "./actions.svelte";
  import { fly } from 'svelte/transition';
  import ImageTooltip from "./ImageTooltip.svelte";
  import ScreenshotImport from "./ScreenshotImport.svelte";

  let { recipes }: { recipes: Recipes } = $props();

  function load(key: string, fallback: any) {
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
    catch { return fallback; }
  }

  let owned: Record<string, number> = $state(load("owned", {}));
  let exclude: string[] = $state(load("exclude", []));
  let marked: string[] = $state(load("marked", []));

  $effect(() => localStorage.setItem("owned", JSON.stringify(owned)));
  $effect(() => localStorage.setItem("exclude", JSON.stringify(exclude)));
  $effect(() => localStorage.setItem("marked", JSON.stringify(marked)));
  $effect(() => [...sortedIngredients, "total"].forEach((i) => { if (!(i in owned)) owned[i] = 0; }));

  let sortedIngredients = $derived(getAllIngredients(recipes).filter((i) => !exclude.includes(i)));

  let sortedRecipes = $derived(
    Object.entries(recipes)
      .map(([name, ingredients]) => ({ name, ingredients, total: getTotalIngredients(ingredients) }))
      .filter((r) => Object.keys(r.ingredients).every((i) => sortedIngredients.includes(i)))
      .sort((a, b) => b.total - a.total),
  );

  function eat(e: Event, name: string) {
    e.stopImmediatePropagation();
    const r = sortedRecipes.find((n) => n.name === name)!;
    Object.entries(r.ingredients).forEach(([i, amt]) => owned[i] = Math.max(0, owned[i] - amt));
  }

  function toggleMark(name: string) {
    marked = marked.includes(name) ? marked.filter((m) => m !== name) : [...marked, name];
  }

  function unexclude(ingredient: string) {
    exclude = exclude.filter((i) => i !== ingredient);
  }
</script>

{#if exclude.length}
  <div class="excluded">
    {#each exclude as ingredient}
      <button transition:fly={{ y: 100, x: 100, duration: 1000 }} class="excluded-item"
          onclick={() => unexclude(ingredient)}
          aria-label="Restore {ingredient}">
        <img src={`https://www.serebii.net/pokemonsleep/ingredients/${ingredient.toLowerCase().replace(/\s+/g, "")}.png`}
             alt={ingredient} class="excluded-icon" />
      </button>
    {/each}
  </div>
{/if}

<ScreenshotImport onImport={(counts) => { Object.entries(counts).forEach(([k, v]) => owned[k] = v); }} />

<div use:trapInputFocus class="table-container">
  <table class="recipe-table">
    <thead><tr>
      <th>
        <div class="ingredient-header">
          <div>Total</div>
          <input type="number" min="0" bind:value={owned["total"]} class="limit-input" aria-label="Total owned" />
        </div>
      </th>
      <th><div class="ingredient-header">Recipe</div></th>
      {#each sortedIngredients as ingredient}
        <th>
          <div class="ingredient-header">
            <ImageTooltip directClick={() => exclude.push(ingredient)} name={ingredient} type="ingredient" tabindex={-1} />
            <input type="number" min="0" bind:value={owned[ingredient]} class="limit-input" aria-label="{ingredient} owned" />
          </div>
        </th>
      {/each}
    </tr></thead>
    <tbody>
      {#each sortedRecipes as { name, ingredients, total }}
        <tr>
          <td>{total}</td>
          <td class={{ dish: true, highlight: marked.includes(name),
              enough: Object.entries(ingredients).every(([i, amt]) => owned[i] >= amt),
              big: total > owned["total"] }}>
            <ImageTooltip {name} type="meal"
              action={(e) => eat(e, name)} actionLabel="Eat"
              secondAction={() => toggleMark(name)}
              secondActionLabel={marked.includes(name) ? 'Unmark' : 'Mark'} />
          </td>
          {#each sortedIngredients as ingredient}
            <td class="quantity" class:enough={owned[ingredient] >= ingredients[ingredient]}
                class:missing={owned[ingredient] < ingredients[ingredient]}>
              {#if ingredients[ingredient]}<span class="quantity">{ingredients[ingredient]}</span>{/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .excluded { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.75rem; }
  .excluded-item {
    all: unset; cursor: pointer; padding: 0.3rem;
    background: #4a5568; border-radius: 50%; transition: background 0.2s;
  }
  .excluded-item:hover { background: #5a6a7e; }
  .excluded-icon { width: 24px; height: 24px; object-fit: contain; display: block; }

  .table-container {
    margin: 0.5rem 0; border-radius: 10px;
    border: 1px solid #4a5568;
    background: #2d3748; overflow-x: auto;
  }

  table.recipe-table { border-collapse: collapse; width: 100%; }

  th {
    border: 1px solid #4a5568; padding: 0.1rem; text-align: center;
    min-width: 18px; background-color: #374151; font-weight: 600; color: #e2e8f0;
  }

  .ingredient-header { display: flex; flex-direction: column; align-items: center; gap: 0.2rem; }

  .limit-input {
    width: 20px; padding: 0; border: 1px solid #ddd; border-radius: 4px;
    text-align: center; appearance: textfield;
    -webkit-appearance: textfield; -moz-appearance: textfield;
  }
  .limit-input::-webkit-outer-spin-button,
  .limit-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }

  tr:hover { background-color: #4a556844; }

  td {
    border: 1px solid #4a5568; padding: 0.15rem 0.2rem; text-align: center;
    min-width: 18px; font-size: 1rem; font-weight: 500; color: #e2e8f0;
  }

  td.enough { background-color: #22543d; }
  td.quantity.missing * { color: #fc8181; }
  td.dish.big { border: 2px solid #fc8181; }
  .highlight {
    background-image: repeating-linear-gradient(to left top, transparent, rgba(255,255,255,0.06), transparent 10px);
  }
</style>
