<script lang="ts">
    interface Props {
        name: string;
        type: string;
        directClick?: ((e: Event) => void) | null;
        action?: ((e: Event) => void) | null;
        actionLabel?: string;
        secondAction?: (() => void) | null;
        secondActionLabel?: string;
        tabindex?: number;
    }

    let { name, type, directClick = null, action = null, actionLabel = '',
          secondAction = null, secondActionLabel = '', tabindex = 0 }: Props = $props();

    let imageUrl = $derived(`https://www.serebii.net/pokemonsleep/${type}s/${name.toLowerCase().replace(/\s+/g, "")}.png`);
    let visible = $state(false);
    let style = $state('');
    let btnEl: HTMLButtonElement;

    function position() {
        if (!btnEl) return;
        const r = btnEl.getBoundingClientRect();
        const x = `left: ${r.left + r.width / 2}px;`;
        style = r.top > window.innerHeight - r.bottom
            ? `top: ${r.top}px; ${x} transform: translate(-50%, -100%);`
            : `top: ${r.bottom}px; ${x} transform: translateX(-50%);`;
    }

    function toggle(e: Event) {
        e.stopPropagation();
        if (directClick && !action) { directClick(e); return; }
        if (!visible) position();
        visible = !visible;
    }

    function close() { visible = false; }

    $effect(() => {
        if (!visible) return;
        document.addEventListener('click', onOutside, true);
        return () => document.removeEventListener('click', onOutside, true);
    });

    function onOutside(e: MouseEvent) {
        if (!(e.target as HTMLElement).closest('.image-tooltip')) close();
    }
</script>

<div class="image-tooltip" role="group"
    onmouseenter={() => { position(); visible = true; }}
    onmouseleave={() => visible = false}>
    <button class="icon-btn" {tabindex} bind:this={btnEl} onclick={toggle}>
        <img src={imageUrl} alt={name} class="icon"
            onerror={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
    </button>
    {#if visible}
        <div class="tooltip" {style}>
            <img src={imageUrl} alt={name} class="preview" />
            <span class="name">{name}</span>
            {#if action}
                <button class="btn action" onclick={(e) => { e.stopPropagation(); action(e); close(); }}>{actionLabel}</button>
            {/if}
            {#if secondAction}
                <button class="btn secondary" onclick={(e) => { e.stopPropagation(); secondAction(); close(); }}>{secondActionLabel}</button>
            {/if}
        </div>
    {/if}
</div>

<style>
    .image-tooltip { position: relative; display: inline-block; }
    .icon { width: 24px; height: 24px; object-fit: contain; }
    .icon-btn { all: unset; cursor: pointer; display: inline-flex; }
    .tooltip {
        position: fixed;
        background: white;
        padding: 0.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        white-space: nowrap;
    }
    .preview { width: 100px; height: 100px; object-fit: contain; }
    .name { display: block; text-align: center; margin-top: 0.5rem; font-size: 0.9rem; }
    .btn {
        display: block; width: 100%; margin-top: 0.5rem; padding: 0.4rem;
        border: none; border-radius: 4px; color: white; font-weight: 600; cursor: pointer;
    }
    .action { background: #4caf50; }
    .secondary { background: #2196f3; }
    img { display: block; }
</style>
