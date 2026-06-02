<script lang="ts">
  import { createWorker } from 'tesseract.js';

  let { onImport }: { onImport: (counts: Record<string, number>) => void } = $props();

  // Ingredients in the order they appear in the game screenshot
  const ingredients = [
    "Large Leek", "Tasty Mushroom", "Fancy Egg", "Soft Potato",
    "Fancy Apple", "Fiery Herb", "Bean Sausage", "Moomoo Milk",
    "Honey", "Pure Oil", "Warming Ginger", "Snoozy Tomato",
    "Soothing Cacao", "Slowpoke Tail", "Greengrass Soybeans", "Greengrass Corn",
    "Rousing Coffee", "Plump Pumpkin", "Glossy Avocado"
  ];

  let loading = $state(false);
  let error = $state('');

  async function runOcr(source: File | Blob) {
    loading = true;
    error = '';
    try {
      const worker = await createWorker('eng');
      const { data: { text } } = await worker.recognize(source);
      await worker.terminate();

      const numbers = [...text.matchAll(/[x×]\s*(\d+)/gi)].map(m => parseInt(m[1]));
      if (numbers.length === 0) { error = 'No values found in image.'; return; }

      const counts: Record<string, number> = {};
      numbers.forEach((n, i) => { if (i < ingredients.length) counts[ingredients[i]] = n; });
      onImport(counts);
    } catch (e: any) {
      error = e.message || 'OCR failed';
    } finally {
      loading = false;
    }
  }

  async function handleFile(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) runOcr(file);
  }

  async function handlePaste() {
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        const imageType = item.types.find(t => t.startsWith('image/'));
        if (imageType) { runOcr(await item.getType(imageType)); return; }
      }
      error = 'No image in clipboard.';
    } catch (e: any) {
      error = e.message || 'Clipboard access denied';
    }
  }
</script>

<div class="import-section">
  <label class="import-btn">
    {#if loading}Scanning…{:else}📷 Import{/if}
    <input type="file" accept="image/*" onchange={handleFile} disabled={loading} hidden />
  </label>
  <button class="import-btn paste" onclick={handlePaste} disabled={loading}>📋 Paste</button>
  {#if error}<span class="error">{error}</span>{/if}
</div>

<style>
  .import-section { display: flex; align-items: center; gap: 1rem; margin: 0.5rem 0; }
  .import-btn {
    padding: 0.5rem 1rem; border-radius: 6px; background: #4caf50;
    color: white; font-weight: 600; cursor: pointer; font-size: 0.9rem;
  }
  .import-btn:hover { background: #43a047; }
  .paste { background: #2196f3; }
  .paste:hover { background: #1976d2; }
  .error { color: #f44336; font-size: 0.85rem; }
</style>
