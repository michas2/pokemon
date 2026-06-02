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
    gap: 0.5rem;
    background: #f0f2f5;
    padding: 0.5rem;
    border-radius: 8px;
    margin-right: auto;
    margin-left: auto;
    max-width: 60%;
  }

  @media (max-width: 768px) {
    .category-tabs {
      max-width: 100%;
    }
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
