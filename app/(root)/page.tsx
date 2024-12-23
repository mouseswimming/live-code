import Header from "@/components/Header";

import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";
import { FileText } from "lucide-react";
import AddDocumentBtn from "@/components/AddDocumentBtn";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Home = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const documents = [];
  return (
    <main className="home-container">
      <Header className="sticky top-0 left-0">
        <div className="flex items-center gap-2 lg:gap-4">
          Notification
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      {/* document lists */}
      {documents.length > 0 ? (
        <div></div>
      ) : (
        <div className="document-list-empty">
          <FileText size={40} className="text-blue-400" />

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
