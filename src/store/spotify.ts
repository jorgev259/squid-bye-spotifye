import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Status = null | "running" | "warning" | "success";

type State = {
  tracks: unknown[];
  status: Status;
  total: number | null;
  imported: number;
};

type Actions = {
  addTracks: (tracks: unknown[]) => void;
  setStatus: (status: Status) => void;
  setTracks: (tracks: unknown[]) => void;
  setTotal: (total: number) => void;
  addImported: (add: number) => void;
  startImportState: () => void;
};

export const useSpotStore = create<State & Actions>()(
  immer((set) => ({
    tracks: [],
    status: null,
    total: null,
    imported: 0,
    startImportState: () =>
      set((state) => {
        state.tracks = [];
        state.status = "running";
        state.total = null;
        state.imported = 0;
      }),
    addTracks: (tracks) =>
      set((state) => {
        state.tracks.push(tracks);
      }),
    setStatus: (status) =>
      set((state) => {
        state.status = status;
      }),
    setTracks: (tracks) =>
      set((state) => {
        state.tracks = tracks;
      }),
    setTotal: (total) =>
      set((state) => {
        state.total = total;
      }),
    addImported: (add) =>
      set((state) => {
        state.imported += add;
      }),
  })),
);
