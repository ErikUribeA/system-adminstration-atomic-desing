import { create } from 'zustand'

interface AppState {
    itemType: 'company' | 'job'
    setItemType: (type: 'company' | 'job') => void
}

export const useStore = create<AppState>((set) => ({
    itemType: 'company',
    setItemType: (type) => set({ itemType: type }),
}))