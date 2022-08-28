import { User } from "@prisma/client";
import create from "zustand";
import { persist, devtools } from "zustand/middleware";

interface UserState {
  user: User | null;
  setUser: (data: User | null) => void;
  getUser: () => User;
}

interface State {
  userState: UserState;
}

export const useStore = create<State>()(
  devtools(
    persist((set, get) => ({
      userState: {
        user: null,
        setUser: (data: User | null) =>
          set((state) => ({
            ...state,
            userState: { ...state.userState, user: data },
          })),
        getUser() {
          return get().userState.user;
        },
      } as UserState,
    }))
  )
);
