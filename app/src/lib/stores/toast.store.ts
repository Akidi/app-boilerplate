import { writable } from "svelte/store";

const MAX_TOASTS_VISIBLE = 5;

export enum ToastType {
  Info = "info",
  Success = "success",
  Warning = "warning",
  Error = "error",
}

export type Toast = {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

export type ToastInput = {
  message: string;
  type?: ToastType;
  duration?: number;
}

export const Toasts = writable<{
  active: Toast[];
  queue: Toast[];  
}>({
  active: [],
  queue: [],
});

export const addToast = (toast: ToastInput): void => {
  const default_toast: Partial<Toast> = {
    type: ToastType.Info,
    duration: 3000,
  };
  
  const new_toast: Toast = {
    id: `toast_${crypto.randomUUID()}`,
    ...default_toast,
    ...toast
  };

  Toasts.update(state => {
    if (state.active.length < MAX_TOASTS_VISIBLE) return { active: [...state.active, new_toast], queue: state.queue };
    return { active: state.active, queue: [...state.queue, new_toast] };
  })
}

export const removeToast = (id: string): void => {
  Toasts.update(state => {
    const filtered = state.active.filter(toast => toast.id !== id);
    if (state.queue.length > 0) {
      const nextQueue = state.queue.slice(0, -1);
      const nextToast = state.queue[state.queue.length -1];
      return {
        active: [...filtered, nextToast],
        queue: nextQueue,
      }
    }

    return { active: filtered, queue: state.queue }
  });
}