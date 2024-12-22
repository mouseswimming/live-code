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

    const usersAccesses: RoomAccesses = { [email]: ["room:write"] };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: [],
    });

    revalidatePath("/");

    return parseStringify(room);
  } catch (error) {
    console.error(`error creating document: ${error}`);
  }
};
