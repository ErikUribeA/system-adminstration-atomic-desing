// stores/paginationStore.ts
import { create } from "zustand";

interface PaginationState {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
    nextPage: () => void;
    previousPage: () => void;
    setTotalPages: (total: number) => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
    currentPage: 1,
    totalPages: 1,
    setCurrentPage: (page) => set({ currentPage: page }),
    nextPage: () =>
        set((state) => ({
            currentPage: Math.min(state.currentPage + 1, state.totalPages),
        })),
    previousPage: () =>
        set((state) => ({
            currentPage: Math.max(state.currentPage - 1, 1),
        })),
    setTotalPages: (total) => set({ totalPages: total }),
}));
