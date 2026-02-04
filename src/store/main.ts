import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface Account {
  providerId: string;
}

type State = {
  accounts: Account[];
};

type Actions = {
  setAccounts: (accounts: Account[]) => void;
};

export const useMainStore = create<State & Actions>()(
  immer((set) => ({
    accounts: [],
    setAccounts: (accounts) =>
      set((state) => {
        state.accounts = accounts;
      }),
  })),
);
