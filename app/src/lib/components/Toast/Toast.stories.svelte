<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ToastType } from './Toast.types';
  import { writable } from 'svelte/store';
  import Toast from './Toast.svelte';
	import { ToastType } from '$lib/stores/toast.store';

  const mockToasts = writable<{active: Toast[]; queue: Toast[]}>({
    active: [],
    queue: [],
  });

  const { Story } = defineMeta({
    title: 'Components/Toast',
    component: Toast,
    tags: ['autodocs'],
  });
</script>

<script lang="ts">
  mockToasts.set({
    active: [{
      id: "1",
      message:"Hello!\n**bold text***emphaised text*",
      type: ToastType.Info,
      duration: 3000,
    }],
    queue: [],
  })
</script>

<Story name="Default">
  <Toast store={mockToasts} />
</Story>