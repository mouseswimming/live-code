"use server";

import { liveblocks } from "../liveblocks";
import { RoomAccesses } from "@liveblocks/node";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";

type CreateDocumentProps = { userId: string; email: string };

/* 
  This code runs on the server only. after a new document is created, we revalidate the cache for the home page. so the newly created document will be displayed in the list of documents.
*/
export const createDocument = async ({
  userId,
  email,
}: CreateDocumentProps) => {
  const roomId = crypto.randomUUID();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: "Untitled Document",
    };

    /* 
      The person who creates the document will have write access to the document.
    */
    const usersAccesses: RoomAccesses = { [email]: ["room:write"] };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: ["room:write"],
    });

    revalidatePath("/");

    // the return object from server need to be parsed and stringified to be sent to the client
    return parseStringify(room);
  } catch (error) {
    console.error(`error creating document: ${error}`);
  }
};

export const getDocument = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);
    console.log({ userId, room });

    // const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    // if (!hasAccess) {
    //   throw new Error("You don't have access to this document");
    // }

    return parseStringify(room);
  } catch (error) {
    console.error(`error getting document: ${error}`);
  }
};
