"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";
import { liveblocks } from "../liveblocks";

export const getClerkUsers = async ({
  userIds,
}: {
  userIds: string[];
}): Promise<User[] | undefined> => {
  const clerk = await clerkClient();

  try {
    const { data } = await clerk.users.getUserList({ emailAddress: userIds });

    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      avatar: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    }));

    const sortedUsers = userIds.map((email) =>
      users.find((user) => user.email === email)
    );

    return parseStringify(sortedUsers);
  } catch (error) {
    console.error(error);
  }
};

export const getDocumentUsers = async ({
  roomId,
  currentUser,
  userSearchText,
}: {
  roomId: string;
  currentUser: string;
  userSearchText: string;
}): Promise<string[] | undefined> => {
  try {
    // get room based on roomId
    const room = await liveblocks.getRoom(roomId);
    // get all the users in the room, except the current user. Since we should't mention ourselves
    const users = Object.keys(room.usersAccesses).filter(
      (user) => user !== currentUser
    );

    // if user starts typing in the search input, filter the users based on the search text
    if (userSearchText.length) {
      const filteredUsers = users.filter((user) =>
        user.includes(userSearchText)
      );

      return parseStringify(filteredUsers);
    }

    return parseStringify(users);
  } catch (error) {
    console.error(`error fetching document usders: ${error}`);
  }
};
