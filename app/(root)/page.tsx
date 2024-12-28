import Header from "@/components/Header";

import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";
import { FileText } from "lucide-react";
import AddDocumentBtn from "@/components/AddDocumentBtn";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getDocuments } from "@/lib/actions/room.actions";
import { RoomData } from "@liveblocks/node";
import Link from "next/link";
import { dateConverter } from "@/lib/utils";
import DeleteModal from "@/components/DeleteModal";
import Notifications from "@/components/Notifications";

const Home = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const documents = (await getDocuments(
    clerkUser.emailAddresses[0].emailAddress
  )) as {
    nextPage: string | null;
    nextCursor: string | null;
    data: RoomData[];
  };

  const { data: documentsData } = documents;

  return (
    <main className="home-container">
      <Header className="sticky top-0 left-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      {/* document lists */}
      {documentsData.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">All documents</h3>
            <AddDocumentBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
          <ul className="document-ul">
            {documentsData.map(
              ({ id, metadata, createdAt, lastConnectionAt }) => (
                <li key={id} className="document-list-item">
                  <Link
                    href={`/documents/${id}`}
                    className="flex flex-1 items-center gap-4"
                  >
                    <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                      <FileText size={40} className="text-blue-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="line-clamp-1 text-lg">{metadata.title}</p>
                      <p className="text-sm font-light text-blue-100">
                        Created about {dateConverter(createdAt.toString())}{" "}
                        {lastConnectionAt && (
                          <span>
                            | Last connected about{" "}
                            {dateConverter(lastConnectionAt.toString())}
                          </span>
                        )}
                      </p>
                    </div>
                  </Link>
                  {/* TODO: need delete doc */}
                  <DeleteModal roomId={id} />
                </li>
              )
            )}
          </ul>
        </div>
      ) : (
        <div className="document-list-empty">
          <div className="hidden rounded-full bg-dark-500 p-4 sm:block">
            <FileText size={40} className="text-blue-400" />
          </div>

          <AddDocumentBtn
            userId={clerkUser?.id}
            email={clerkUser?.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
