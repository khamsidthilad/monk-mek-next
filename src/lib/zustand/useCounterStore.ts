import { create } from "zustand";

type CounterState = {
  value: number;
  increment: () => void;
  decrement: () => void;
};

export const useCounterStore = create<CounterState>((set) => ({
  value: 0,
  increment: () => set((s) => ({ value: s.value + 1 })),
  decrement: () => set((s) => ({ value: s.value - 1 })),
}));

