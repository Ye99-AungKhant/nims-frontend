import { create } from "zustand";
import { UserType } from "../utils/types";
import { persist } from "zustand/middleware";

interface UserStore {
  user: UserType | null;
  setUser: (user: UserType) => void;
  clearUser: () => void;
  hasPermission: (
    permission: string,
    scope: "view" | "create" | "update" | "delete"
  ) => boolean;
}

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (user) => set({ user }),

      clearUser: () => set({ user: null }),

      hasPermission: (
        permission: string,
        scope: "view" | "create" | "update" | "delete"
      ) => {
        const user = get().user;
        return (
          user?.role?.permissions.some(
            (perm: any) => perm.page_name === permission && perm[scope] === true
          ) || false
        );
      },
    }),
    {
      name: "authUser",
    }
  )
);

export default useUserStore;
