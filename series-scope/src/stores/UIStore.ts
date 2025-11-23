import {create} from "zustand";

export type UIStoreState = {
    searchQuery: string;
    onChangeQuery: (query: string) => void;

    genre: string;
    onGenreChange: (genre: string) => void;

    sort: string;
    onSortChange: (sort: string) => void;

    reset: () => void;
}

const DEFAULTS = { searchQuery: "", genre: "All", sort: "title" };

const useUIStore = create<UIStoreState>()((set) => (
    {
        ...DEFAULTS,
        onChangeQuery: (query) => set({ searchQuery: query }),
        onGenreChange: (genre) => set({ genre }),
        onSortChange: (sort) => set({ sort }),
        reset: () => set(DEFAULTS),
    }
))

export default useUIStore;