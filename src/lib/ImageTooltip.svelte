<script lang="ts">
    let { name, type, click = null, action = null, actionLabel = '', tabindex = 0 }: { name: string; type: string; click?: ((e: Event) => void) | null; action?: ((e: Event) => void) | null; actionLabel?: string; tabindex?: number } = $props();
    let imageUrl = $derived( `https://www.serebii.net/pokemonsleep/${type}s/${name.toLowerCase().replace(/\s+/g, "")}.png` );
    let tooltipVisible = $state(false);
    let tooltipStyle = $state('');
    let btnEl: HTMLButtonElement;

    function toggle(e: Event) {
        if (click && !action) {
            click(e);
            return;
        }
        if (!tooltipVisible) {
            const rect = btnEl.getBoundingClientRect();
            const spaceAbove = rect.top;
            const spaceBelow = window.innerHeight - rect.bottom;
            if (spaceAbove > spaceBelow) {
                tooltipStyle = `top: ${rect.top}px; left: ${rect.left + rect.width / 2}px; transform: translate(-50%, -100%);`;
            } else {
                tooltipStyle = `top: ${rect.bottom}px; left: ${rect.left + rect.width / 2}px; transform: translateX(-50%);`;
            }
        }
        tooltipVisible = !tooltipVisible;
    }

    function handleClickOutside(e: MouseEvent) {
        const target = e.target as HTMLElement;
        if (!target.closest('.image-tooltip')) {
            tooltipVisible = false;
        }
    }

    $effect(() => {
        if (tooltipVisible) {
            document.addEventListener('click', handleClickOutside, true);
            return () => document.removeEventListener('click', handleClickOutside, true);
        }
    });
</script>

<div class="image-tooltip" role="group"
    onmouseenter={() => { if (btnEl) { const rect = btnEl.getBoundingClientRect(); const above = rect.top > window.innerHeight - rect.bottom; tooltipStyle = above ? `top: ${rect.top}px; left: ${rect.left + rect.width / 2}px; transform: translate(-50%, -100%);` : `top: ${rect.bottom}px; left: ${rect.left + rect.width / 2}px; transform: translateX(-50%);`; } tooltipVisible = true; }}
    onmouseleave={() => tooltipVisible = false}>
    <button class="icon-btn"
    {tabindex}
    bind:this={btnEl}
    onclick={toggle}>
        <img src={imageUrl} alt={name} class="icon" onerror={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
    </button>
    {#if tooltipVisible}
        <div class="tooltip" style={tooltipStyle}>
            <img src={imageUrl} alt={name} class="preview" />
            <span class="tooltip-text">{name}</span>
            {#if action}
                <button class="eat-btn" onclick={(e) => { e.stopPropagation(); action(e); tooltipVisible = false; }}>{actionLabel}</button>
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
        position: fixed;
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
