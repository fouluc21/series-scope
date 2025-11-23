import { create } from "zustand";

type WatchlistState = {
    ids: number[];
    add: (id: number) => void;
    remove: (id: number) => void;
    toggle: (id: number) => void;
    isInWatchlist: (id: number) => boolean;
    clear: () => void;
};

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
    ids: [],
    add: (id) =>
        set((state) =>
            state.ids.includes(id) ? state : { ids: [...state.ids, id] }
        ),
    remove: (id) =>
        set((state) => ({ ids: state.ids.filter((existing) => existing !== id) })),
    toggle: (id) => {
        const { ids, add, remove } = get();
        if (ids.includes(id)) remove(id)
        else add(id);
    },
    isInWatchlist: (id) => get().ids.includes(id),
    clear: () => set({ ids: [] }),
}));
