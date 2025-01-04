<script lang="ts">
    let { name, type }: { name: string; type: "ingredient" | "meal" } = $props();
    let imageUrl = $derived( `https://www.serebii.net/pokemonsleep/${type}s/${name.toLowerCase().replace(/\s+/g, "")}.png` );
    let tooltipVisible = $state(false);
</script>

<div class="image-tooltip">
    <img
        src={imageUrl}
        alt={name}
        class="icon"
        onmouseenter={() => tooltipVisible = true}
        onmouseleave={() => tooltipVisible = false}
    />
    {#if tooltipVisible}
        <div class="tooltip">
            <img src={imageUrl} alt={name} class="preview" />
            <span class="tooltip-text">{name}</span>
        </div>
    {/if}
</div>

<style>
    .image-tooltip {
        position: relative;
        display: inline-block;
    }

    .icon {
        width: 24px;
        height: 24px;
        object-fit: contain;
        cursor: pointer;
    }

    .tooltip {
        position: absolute;
        background: white;
        padding: 0.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        white-space: nowrap;
    }

    .preview {
        width: 100px;
        height: 100px;
        object-fit: contain;
    }

    .tooltip-text {
        display: block;
        text-align: center;
        margin-top: 0.5rem;
        font-size: 0.9rem;
    }
    img {
        display: block;
    }
</style>
