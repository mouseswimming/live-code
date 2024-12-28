"use client";

import Loader from "@/components/Loader";
import { getClerkUsers, getDocumentUsers } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";
import { LiveblocksProvider, ClientSideSuspense } from "@liveblocks/react";

const LbProvider = ({ children }: { children: React.ReactNode }) => {
  const { user: clerkUser } = useUser();

  if (!clerkUser) return <Loader />;

  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth"}
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });
        return users;
      }}
      resolveMentionSuggestions={async ({ roomId, text }) => {
        const roomUsers = await getDocumentUsers({
          roomId,
          userSearchText: text,
          currentUser: clerkUser.emailAddresses[0].emailAddress,
        });

        return roomUsers ?? [];
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default LbProvider;
