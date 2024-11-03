import { create } from 'zustand'

interface AppState {
    itemType: 'company' | 'vacant'
    setItemType: (type: 'company' | 'vacant') => void
}

export const useStore = create<AppState>((set) => ({
    itemType: 'vacant',
    setItemType: (type) => set({ itemType: type }),
}))