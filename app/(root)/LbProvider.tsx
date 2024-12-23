"use client";

import Loader from "@/components/Loader";
import { getClerkUsers } from "@/lib/actions/user.actions";
import { LiveblocksProvider, ClientSideSuspense } from "@liveblocks/react";

const LbProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth"}
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });
        return users;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default LbProvider;
