import { Suspense, useEffect, useState } from "react";
import { authClient } from "../util/auth-client";

import { useMainStore } from "../store/main";
import SpotifyBubble from "./SpotifyBubble";

export default function App() {
  const setAccounts = useMainStore((state) => state.setAccounts);

  useEffect(() => {
    authClient.listAccounts().then((accs) => {
      setAccounts(accs.data || []);
    });
  }, []);

  return (
    <>
      <SpotifyBubble />
    </>
  );
}
