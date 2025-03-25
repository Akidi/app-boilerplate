<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Toast from './Toast.svelte';
  import type { ToastType } from './Toast.types';
  let toastRef = $state<Toast>();

  const { Story } = defineMeta({
    title: 'Components/Toast',
    component: Toast,
    tags: ['autodocs'],
    argTypes: {
      message: { 
        control: 'text',
        description: 'The message to display in the toast',
        defaultValue: 'Hello Toast'
      },
      msgType: {
        control: 'select',
        options: ['info', 'success', 'error'],
        description: 'The type of toast to display',
        defaultValue: 'info'
      },
      duration: {
        control: 'number',
        description: 'The duration of the toast in milliseconds',
        defaultValue: 3000
      }
    },
  });
</script>

<<<<<<< HEAD
<!-- In your Storybook story (e.g., "Random Toast Generator") -->
=======
>>>>>>> 9a6bb8f (feat: add toast system with queuing, variants, and dismiss-all support)
<Story name="Random Toast Generator">
  <div class="space-y-4">
    <button
      class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
      onclick={() => {
        const types: ToastType[] = ['info', 'success', 'error', 'warning'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        const msg = `Random ${randomType} toast #${Math.floor(Math.random() * 1000)}`;
        toastRef?.show(msg, { msgType: randomType, duration: 3000 });
      }}
    >
      Show Random Toast
    </button>
    <Toast bind:this={toastRef} />
  </div>
</Story>


<Story name="Static Toast Variants">
  <div class="space-y-4">
    <div class="flex items-center px-4 py-3 rounded shadow-lg text-white bg-blue-500 w-fit">Info toast</div>
    <div class="flex items-center px-4 py-3 rounded shadow-lg text-white bg-green-500 w-fit">Success toast</div>
    <div class="flex items-center px-4 py-3 rounded shadow-lg text-white bg-red-500 w-fit">Error toast</div>
    <div class="flex items-center px-4 py-3 rounded shadow-lg text-black bg-yellow-500 w-fit">Warning toast</div>
  </div>
</Story>
