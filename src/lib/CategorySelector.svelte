<script lang="ts">
  let { categories, selectedCategory = $bindable() }:{categories: string[], selectedCategory: string} = $props();
</script>

<div class="category-tabs">
  {#each categories as category}
    <button 
      class={{active: selectedCategory === category}}
      onclick={() => selectedCategory = category}
    >
      {category}
    </button>
  {/each}
</div>

<style>
  .category-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    padding: 0.25rem;
    background: var(--tabs-bg);
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  button {
    flex: 1;
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--text-muted);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: fit-content;
  }

  button:hover {
    background: var(--tab-hover);
  }

  button.active {
    background: var(--accent);
    color: white;
    font-weight: 600;
  }
</style>
