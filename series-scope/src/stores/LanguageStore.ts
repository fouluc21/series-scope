import {create} from "zustand";

type Language = 'de' | 'en';

export type LanguageStoreState = {
    language: Language;
    toggleLanguage: () => void;
}

const useLanguageStore = create<LanguageStoreState>()((set) => (
    {
        language: 'en',
        toggleLanguage: () => set((state) => ({language: state.language === 'en' ? 'de' : 'en'}))
    }
))

export default useLanguageStore;