"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import "@liveblocks/react-ui/styles.css";

export function Room({ children }: { children: ReactNode }) {
  // The Liveblocks client will call this authEndpoint to mint a short-lived
  // Liveblocks token. We run a FastAPI endpoint at /liveblocks/auth which
  // proxies the server-side call to Liveblocks using the secret key.
  const authEndpoint =
    process.env.NEXT_PUBLIC_LIVEBLOCKS_AUTH_ENDPOINT ||
    "http://localhost:8000/liveblocks/auth";

  return (
    <LiveblocksProvider authEndpoint={authEndpoint}>
      <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}