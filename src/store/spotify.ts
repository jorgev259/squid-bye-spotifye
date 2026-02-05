import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { SavedTrack, Track } from "@spotify/web-api-ts-sdk";
import { enableMapSet } from "immer";

type Status = null | "running" | "warning" | "success";
type State = {
  tracks: Map<string, Track>;
  status: Status;
  total: number | null;
};

type Actions = {
  addTracks: (tracks: SavedTrack[]) => void;
  setStatus: (status: Status) => void;
  setTotal: (total: number) => void;
  startImportState: () => void;
};

enableMapSet();
export const useSpotStore = create<State & Actions>()(
  immer((set) => ({
    tracks: new Map(),
    status: null,
    total: null,

    startImportState: () =>
      set((state) => {
        state.tracks = new Map();
        state.status = "running";
        state.total = null;
      }),
    addTracks: (tracks) =>
      set((state) => {
        tracks.forEach((t) => {
          if (state.tracks.has(t.track.id)) return;
          state.tracks.set(t.track.id, t.track);
        });
      }),
    setStatus: (status) =>
      set((state) => {
        state.status = status;
      }),
    setTotal: (total) =>
      set((state) => {
        state.total = total;
      }),
  })),
);
