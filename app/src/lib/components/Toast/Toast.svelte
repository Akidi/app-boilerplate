<script lang="ts">
	import type { ToastOptions, ToastItem, ToastType } from './Toast.types';
	import { tick } from 'svelte';

	const queueState = $state({
		queue: [] as ToastItem[],
		active: [] as ToastItem[],
		idCounter: 0,
		MAX_VISIBLE: 5
	});

	function processQueue() {
		while (queueState.active.length < queueState.MAX_VISIBLE && queueState.queue.length > 0) {
			const next = queueState.queue.shift()!;
			queueState.active.push(next);
			if (next.duration && next.duration > 0) {
				setTimeout(() => dismiss(next.id), next.duration);
			}
		}
	}

	function dismiss(id: number) {
		queueState.active = queueState.active.filter((t) => t.id !== id);
		tick().then(processQueue);
	}

	export function show(message: string, opts: ToastOptions = {}) {
		queueState.queue.push({
			id: ++queueState.idCounter,
			message,
			msgType: opts.msgType ?? 'info',
			duration: opts.duration ?? 3000
		});
		processQueue();
	}
</script>

<div aria-live="polite" aria-atomic="true" class="fixed bottom-4 right-4 z-50 space-y-2">
	{#each queueState.active as toast (toast.id)}
		<div
			class="flex w-fit items-center rounded bg-gray-800 px-4 py-3 text-white shadow-lg"
			class:!bg-green-500={toast.msgType === 'success'}
			class:!bg-red-500={toast.msgType === 'error'}
			class:!bg-blue-500={toast.msgType === 'info'}
			class:!bg-yellow-500={toast.msgType === 'warning'}
			class:!text-black={toast.msgType === 'warning'}
		>
			<span class="mr-2">{toast.message}</span>
			<button
				type="button"
				class="ml-2 text-2xl leading-none"
				aria-label="Close"
				onclick={() => dismiss(toast.id)}
			>
				&times;
			</button>
		</div>
	{/each}

	{#if queueState.queue.length > 0}
		<div
			class="ml-auto flex w-fit items-center gap-3 rounded bg-gray-700 px-3 py-2 text-sm text-white shadow"
		>
			<span>+{queueState.queue.length} queued</span>
			<button
				type="button"
				class="rounded bg-red-600 px-2 py-1 text-xs text-white transition hover:bg-red-700"
				onclick={() => {
					queueState.queue = [];
					queueState.active = [];
				}}
			>
				Dismiss All
			</button>
		</div>
	{/if}
</div>
