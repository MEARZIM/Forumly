import { create } from "zustand";

interface UseChatboxInterface  {
    isOpen: boolean;
    onOpen: ()=>void;
    onClose: ()=>void;
}

export const useChatbox = create<UseChatboxInterface>((set)=>({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));