"use client";

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { Editor } from "@/components/editor/Editor";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import ActiveCollaborators from "./ActiveCollaborators";
import { RoomMetadata } from "@/types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FilePenLine } from "lucide-react";
import { updateDocumentTitle } from "@/lib/actions/room.actions";

/* 
  Each doc will have its own collaborative room. and we will assign each doc a unique id.
*/

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
}: {
  roomId: string;
  roomMetadata: RoomMetadata;
}) => {
  const currentUserType = "editor";

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setLoading(true);

      try {
        if (documentTitle.trim() !== roomMetadata.title) {
          // await updateDocumentTitle(roomId, documentTitle);
          const updatedDocument = await updateDocumentTitle({
            roomId,
            title: documentTitle,
          });

          if (updatedDocument) {
            setEditing(false);
          }
        }
      } catch (error) {
        console.error("Failed to update title", error);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      // click outside of the title container
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditing(false);
        updateDocumentTitle({
          roomId,
          title: documentTitle,
        });
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [documentTitle, roomId]);

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        <div className="collaborative-room">
          <Header>
            <div
              ref={containerRef}
              className="flex items-center justify-center flex-1 gap-1"
            >
              {editing && !loading ? (
                <Input
                  type="text"
                  value={documentTitle}
                  ref={inputRef}
                  placeholder="Edit title"
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  onKeyDown={updateTitleHandler}
                  disabled={!editing}
                  className="document-title-input"
                />
              ) : (
                <p className="document-title">{documentTitle}</p>
              )}
              {currentUserType === "editor" && !editing && (
                <Button
                  title="Edit title"
                  size="icon"
                  onClick={() => {
                    setEditing(true);
                    setTimeout(() => {
                      inputRef.current?.focus();
                      inputRef.current?.setSelectionRange(
                        0,
                        inputRef.current.value.length
                      );
                    }, 0);
                  }}
                >
                  <FilePenLine size={24} />
                </Button>
              )}
              {currentUserType !== "editor" && !editing && (
                <p className="view-only-tag">View only</p>
              )}

              {loading && (
                <p className="text-sm text-gray-400 italic">saving...</p>
              )}
            </div>
            <div className="flex w-fit justify-end gap-2 sm:gap-3">
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
