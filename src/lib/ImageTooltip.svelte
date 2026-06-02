<script lang="ts">
    let { name, type, click = null, tabindex = 0 }: { name: string; type: string; click?: ((e: Event) => void) | null; tabindex?: number } = $props();
    let imageUrl = $derived( `https://www.serebii.net/pokemonsleep/${type}s/${name.toLowerCase().replace(/\s+/g, "")}.png` );
    let tooltipVisible = $state(false);

    function toggle(e: Event) {
        tooltipVisible = !tooltipVisible;
    }
</script>

<div class="image-tooltip">
    <button class="icon-btn"
    {tabindex}
    onclick={toggle}
    onmouseenter={() => tooltipVisible = true}
    onmouseleave={() => tooltipVisible = false}>
        <img src={imageUrl} alt={name} class="icon" onerror={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
    </button>
    {#if tooltipVisible}
        <div class="tooltip">
            <img src={imageUrl} alt={name} class="preview" />
            <span class="tooltip-text">{name}</span>
            {#if click}
                <button class="eat-btn" onclick={(e) => { click(e); tooltipVisible = false; }}>Eat</button>
            {/if}
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
    }

    .icon-btn {
        all: unset;
        cursor: pointer;
        display: inline-flex;
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

    .eat-btn {
        display: block;
        width: 100%;
        margin-top: 0.5rem;
        padding: 0.4rem;
        border: none;
        border-radius: 4px;
        background: #4caf50;
        color: white;
        font-weight: 600;
        cursor: pointer;
    }

    img {
        display: block;
    }
</style>
