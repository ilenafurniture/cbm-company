import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create()(
    persist(
        (set) => ({
            email: null,
            token: null,
            role: null,
            setUser: ({ email, token, role }) => set({ email, token, role }),
            emptyUser: () => {
                set({
                    email: null,
                    token: null,
                    role: null,
                });
            },
        }),
        {
            name: "user-storage",
            partialize: (state) => ({
                email: state.email,
                token: state.token,
                role: state.role,
            }),
        }
    )
);

export default useUserStore;
