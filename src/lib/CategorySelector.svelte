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
    background: #2d3748;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  button {
    flex: 1;
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: #a0aec0;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: fit-content;
  }

  button:hover {
    background: #4a5568;
  }

  button.active {
    background: #4361ee;
    color: white;
    font-weight: 600;
  }
</style>
