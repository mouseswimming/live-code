"use client";

import Loader from "@/components/Loader";
import { LiveblocksProvider, ClientSideSuspense } from "@liveblocks/react";

const LbProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LiveblocksProvider
      // publicApiKey={
      //   "pk_prod_e0bk-NsJTyahkXvVgak2pXF5tDg3y02h3F4qhW9smDEtamgqmO3vKwm9YCMCplqp"
      // }
      authEndpoint={"/api/liveblocks-auth"}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default LbProvider;
