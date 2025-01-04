<script lang="ts">
    import ImageTooltip from "./ImageTooltip.svelte";
    let { sortedIngredients, name, ingredients, totalIngredients, owned }:
    { sortedIngredients:string[], name:string, ingredients:{[key: string]: number}, totalIngredients:number, owned:{[key: string]: number} } = $props();
   
    let ing : {[key: string]: number} = $derived( ingredients );
    let enough = $derived( Object.entries(ingredients).every( ([ingredient, amount]) => owned[ingredient] >= amount ) );
    let highlight = $state(false);
</script>

<tr>
    <td>{totalIngredients}</td>
    <td
        onclick={() => highlight = !highlight}
        class={{ "dish":1, highlight, enough, big: totalIngredients > owned["total"]
        }}
    >
        <ImageTooltip {name} type="meal" />
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

<style>
    tr:hover {
      background-color: #6bc2ee48;
    }
  
    td {
      border: 1px solid rgb(255, 255, 255);
      padding: 0.1rem;
      text-align: center;
      min-width: 30px;
      font-size: 0.9rem;
    }
      
    td.enough {
      background-color: #73f2344f
    }
    td.quantity.missing * {
      color: #ff1f1f;
    }
    td.dish.big {
      border: #f65f56, 2px solid;
    }
    .highlight {
        background-image: repeating-linear-gradient(to left top, transparent, rgba(0, 0, 0, 0.2), transparent 10px);
    }
</style>  