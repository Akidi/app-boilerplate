<script lang="ts">
  import { Toasts, removeToast, type Toast } from "$lib/stores/toast.store"; // Adjust path
  let timers = $state<Record<string, any>>({});

  $effect(() => {
    $Toasts.active.forEach((toast: Toast) => {
      if (!timers[toast.id]) {
        timers[toast.id] = setTimeout(() => removeToast(toast.id), toast.duration);
      }
    });
    return () => Object.values(timers).forEach(clearTimeout); // Cleanup
  });
</script>

<div class="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
  {#each $Toasts.active as toast (toast.id)}
    <div
      class="p-4 rounded-md text-white font-bold"
      class:bg-blue-400={toast.type === ToastType.Info}
      class:bg-green-400={toast.type === ToastType.Success}
      class:bg-yellow-400={toast.type === ToastType.Warning}
      class:text-black={toast.type === ToastType.Warning}
      class:bg-red-400={toast.type === ToastType.Error}
      role="alert"
      aria-live="polite"
    >
      {toast.message}
      <button onclick={() => removeToast(toast.id)} class="ml-2">✕</button>
    </div>
  {/each}
</div>