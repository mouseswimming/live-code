import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

async function Document({ params: { id } }: { params: { id: string } }) {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
  }

  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  });

  if (!room) {
    redirect("/");
  }
  /* 
    usersAccesses: {
      'mouseswimming@gmail.com': [ 'room:write' ],
      'vivian.liu.me@gmail.com': [ 'room:read', 'room:presence:write' ]
    },
    so the Object.keys(room.usersAccesses) will be useers' email addresses
  */
  const userIds = Object.keys(room.usersAccesses);

  const users = await getClerkUsers({ userIds });
  console.log(users);
  const usersData: User[] = userIds.map((userId) => {
    const user = users?.find((u) => u?.email === userId);
    const userAccesses = room.usersAccesses[userId] as AccessType;
    const hasWritePermission = (userAccesses as string[])?.includes(
      "room:write"
    );

    return {
      id: user ? user.id : userId,
      name: user ? user.name : "User not joined",
      email: user ? user.email : userId,
      avatar: user ? user.avatar : "/default-avatar.png",
      color: user ? user.color : "#cccccc",
      userType: hasWritePermission ? "editor" : "viewer",
    };
  });

  const currentUserAccessType: AccessType =
    room.usersAccesses[clerkUser.emailAddresses[0].emailAddress] ?? [];

  const currentUserType = (currentUserAccessType as string[]).includes(
    "room:write"
  )
    ? "editor"
    : "viewer";

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom
        roomId={id}
        roomMetadata={room.metadata as RoomMetadata}
        users={usersData as User[]}
        currentUserType={currentUserType}
      />
    </main>
  );
}

export default Document;
