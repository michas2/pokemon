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
    gap: 0.5rem;
    margin-bottom: 2rem;
    background: #f0f2f5;
    padding: 0.5rem;
    border-radius: 8px;
  }

  button {
    flex: 1;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: #666;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  button:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  button.active {
    background: white;
    color: #646cff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
</style>