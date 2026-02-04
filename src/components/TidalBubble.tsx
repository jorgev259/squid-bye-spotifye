import { useMainStore } from "../store/main";
import { authClient } from "../util/auth-client";

export default function TidalBubble() {
  const accounts = useMainStore((state) => state.accounts);
  const tidalAcc = accounts.find((acc) => acc.providerId === "tidal");

  return (
    <div className="h-32 w-full rounded-lg border border-gray-600 bg-gray-800 shadow-lg">
      <h2>Tidal</h2>
      <button>Start searching tracks</button>
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
