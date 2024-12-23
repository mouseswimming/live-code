"use client";

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import React from "react";
import Header from "./Header";
import { Editor } from "@/components/editor/Editor";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import ActiveCollaborators from "./ActiveCollaborators";

/* 
  Each doc will have its own collaborative room. and we will assign each doc a unique id.
*/

const CollaborativeRoom = ({
  roomId,
}: // roomMetadata,
{
  roomId: string;
  // roomMetadata: RoomData;
}) => {
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        <div className="collaborative-room">
          <Header>
            <div className="flex items-center justify-center w-fit gap-2">
              <p className="document-title">Share</p>
            </div>
            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
              <ActiveCollaborators />
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
