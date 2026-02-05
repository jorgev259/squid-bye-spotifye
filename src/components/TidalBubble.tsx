import { useState } from "react";
import { useMainStore } from "../store/main";
import { useSpotStore } from "../store/spotify";
import { authClient } from "../util/auth-client";

interface SearchItem {
  spot_id: string;
  search: string;
}

export default function TidalBubble() {
  const accounts = useMainStore((state) => state.accounts);
  const tidalAcc = accounts.find((acc) => acc.providerId === "tidal");
  const { tracks } = useSpotStore((state) => state);
  const [searchTracks, setSearchTracks] = useState<SearchItem[]>([]);

  function startSearch() {
    const draft: SearchItem[] = [];

    tracks.forEach((track) => {
      draft.push({
        search: track.artists[0].name + " - " + track.name,
        spot_id: track.id,
      });
    });

    setSearchTracks(draft);
  }

  return (
    <div className="h-32 w-full rounded-lg border border-gray-600 bg-gray-800 shadow-lg">
      <h2>Tidal</h2>
      <button onClick={startSearch}>Start searching tracks</button>
      {searchTracks.map((t) => (
        <TidalTrackSearch key={t.spot_id} item={t} />
      ))}
      {/*  {!tidalAcc ? (
        <button
          onClick={() => {
            authClient.signIn.social({ provider: "tidal" });
          }}
        >
          Need Tidal link
        </button>
      ) : (
        <button>Start importing from Spotify</button>
      )} */}
    </div>
  );
}

function TidalTrackSearch(props: { item: SearchItem }) {
  return <div></div>;
}
