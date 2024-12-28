"use server";

import { liveblocks } from "../liveblocks";
import { RoomAccesses, RoomData } from "@liveblocks/node";
import { revalidatePath } from "next/cache";
import { getAccessType, parseStringify } from "../utils";
import { redirect } from "next/navigation";

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
      defaultAccesses: [],
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
}): Promise<RoomData | undefined> => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    if (!hasAccess) {
      throw new Error("You don't have access to this document");
    }

    return parseStringify(room);
  } catch (error) {
    console.error(`error getting document: ${error}`);
  }
};

export const getDocuments = async (email: string) => {
  try {
    const rooms = await liveblocks.getRooms({ userId: email });

    return parseStringify(rooms);
  } catch (error) {
    console.error(`error getting documens: ${error}`);
  }
};

export const updateDocumentTitle = async ({
  roomId,
  title,
}: {
  roomId: string;
  title: string;
}) => {
  try {
    const updatedRoom = await liveblocks.updateRoom(roomId, {
      metadata: { title },
    });
    revalidatePath(`/documents/${roomId}`);

    return parseStringify(updatedRoom);
  } catch (error) {
    console.error(`error updating document title: ${error}`);
  }
};

export const updateUserDocumentAccess = async ({
  roomId,
  email,
  userType,
  updatedBy,
}: ShareDocumentParams) => {
  try {
    // re-form the user access
    const usersAccesses: RoomAccesses = {
      [email]: getAccessType(userType),
    };

    const room = await liveblocks.updateRoom(roomId, { usersAccesses });

    if (room) {
      // send notification to the user
      const notificationId = crypto.randomUUID();

      await liveblocks.triggerInboxNotification({
        userId: email,
        kind: "$documentAccess",
        subjectId: notificationId,
        activityData: {
          userType,
          title: `You have been granted ${userType} access to the document by ${updatedBy.name}`,
          updatedBy: updatedBy.name,
          email: updatedBy.email,
          avatar: updatedBy.avatar,
        },
        roomId,
      });
    }

    revalidatePath(`/documents/${roomId}`);
    return parseStringify(room);
  } catch (error) {
    console.error(`error updating user access: ${error}`);
  }
};

export const removeCollaborator = async ({
  roomId,
  email,
}: {
  roomId: string;
  email: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    if (room.metadata.email === email) {
      throw new Error("You can't remove the creator of the document");
    }

    const updatedRoom = await liveblocks.updateRoom(roomId, {
      usersAccesses: { [email]: null },
    });
    revalidatePath(`/documents/${roomId}`);
    return parseStringify(updatedRoom);
  } catch (error) {
    console.error(`error removing collaborator: ${error}`);
  }
};

export const deleteDocument = async (roomId: string) => {
  try {
    await liveblocks.deleteRoom(roomId);
    revalidatePath("/");
    redirect("/");
  } catch (error) {
    console.error(`error deleting document: ${error}`);
  }
};
