import type { Page, SavedTrack } from "@spotify/web-api-ts-sdk";

import { useMainStore } from "../store/main";
import { useSpotStore } from "../store/spotify";
import { authClient } from "../util/auth-client";

export default function SpotifyBubble() {
  const accounts = useMainStore((state) => state.accounts);
  const spotifyAcc = accounts.find((acc) => acc.providerId === "spotify");
  const {
    setStatus,
    addTracks,
    status,
    startImportState,
    addImported,
    setTotal,
  } = useSpotStore((state) => state);

  function startImport() {
    startImportState();
    fetchSaved().then((data) => {
      if (data) setTotal(data.total);
    });
  }

  const fetchSaved = (offset: number = 0) =>
    fetch(`/api/spotify/get-saved?offset=${offset}`)
      .then((res) => res.json())
      .then((data: Page<SavedTrack>) => {
        addTracks(data.items);
        addImported(data.items.length);

        if (data.next) fetchSaved(data.offset + data.limit);
        else setStatus("success");

        return data;
      })
      .catch((err) => {
        console.error(err);
        setStatus("warning");
      });

  return (
    <div className="h-32 w-full rounded-lg border border-gray-600 bg-gray-800 shadow-lg">
      {status === null ? (
        !spotifyAcc ? (
          <button
            onClick={() => {
              authClient.signIn.social({ provider: "spotify" });
            }}
          >
            Need spotify link
          </button>
        ) : (
          <button onClick={startImport}>Start importing from Spotify</button>
        )
      ) : (
        <SpotifyProgress />
      )}
    </div>
  );
}

function SpotifyProgress() {
  const { setStatus, addTracks, status, imported, total } = useSpotStore(
    (state) => state,
  );

  return (
    <div>
      <div>{status}</div>
      <div>
        {total !== null
          ? `Imported ${imported} out of ${total} tracks`
          : "Importing songs from Spotify...."}
      </div>
    </div>
  );
}
