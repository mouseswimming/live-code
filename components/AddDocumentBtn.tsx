"use client";

import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { createDocument } from "@/lib/actions/room.actions";
import { useRouter } from "next/navigation";

const AddDocumentBtn = ({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) => {
  const router = useRouter();

  const addDocumentHandler = async () => {
    try {
      const room = await createDocument({ userId, email });

      if (room) router.push(`/documents/${room.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      type="submit"
      onClick={addDocumentHandler}
      className="gradient-blue flex gap-1 shadow-md"
    >
      <Plus size={24} className="text-white" />
      <span className="hidden sm:block">Start a blank document</span>
    </Button>
  );
};

export default AddDocumentBtn;
