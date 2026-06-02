export function trapInputFocus(node: HTMLElement) {
	function inputs(): HTMLInputElement[] {
		return Array.from(node.querySelectorAll('input'));
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== 'Tab') return;
		const elements = inputs();
		if (!elements.length) return;

		const current = document.activeElement;
		if (!elements.includes(current as HTMLInputElement)) return;

		const first = elements[0];
		const last = elements[elements.length - 1];

		if (event.shiftKey && current === first) {
			last.focus();
			event.preventDefault();
		} else if (!event.shiftKey && current === last) {
			first.focus();
			event.preventDefault();
		}
	}

	$effect(() => {
		node.addEventListener('keydown', handleKeydown);
		return () => node.removeEventListener('keydown', handleKeydown);
	});
}
