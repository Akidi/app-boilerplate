export type ToastType = 'info' | 'success' | 'warning' | 'error';

export type ToastOptions = {
  msgType?: ToastType;
  duration?: number;
};

export interface ToastItem extends ToastOptions {
  id: number;
  message: string;
};

type ToastItems = ToastItem[];
type ToastActive = ToastItem[];

export interface ToastQueue {
  items: ToastItems;
  active: ToastActive;
}
