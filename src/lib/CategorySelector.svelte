<script lang="ts">
  let { categories, selectedCategory = $bindable() }:{categories: string[], selectedCategory: string} = $props();
</script>

<button>
  category is {selectedCategory}
</button>
