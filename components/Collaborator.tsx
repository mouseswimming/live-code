import Image from "next/image";
import React, { useState } from "react";
import UserTypeSelector from "./UserTypeSelector";
import { Button } from "./ui/button";
import {
  removeCollaborator,
  updateUserDocumentAccess,
} from "@/lib/actions/room.actions";
import { User } from "lucide-react";

const Collaborator = ({
  roomId,
  email,
  creatorId,
  collaborator,
  user,
}: CollaboratorProps) => {
  const [userType, setUserType] = useState<UserType>(
    collaborator.userType || "viewer"
  );
  const [loading, setLoading] = useState(false);

  const updateUserTypeHandler = async (value: UserType) => {
    setLoading(true);

    await updateUserDocumentAccess({
      roomId,
      email,
      userType: value,
      updatedBy: user,
    });

    setLoading(false);
  };

  const removeCollaboratorHandler = async (email: string) => {
    setLoading(true);

    await removeCollaborator({ roomId, email });

    setLoading(false);
  };

  return (
    <li className="flex items-center justify-between gap-2 py-3">
      <div className="flex gap-2 items-center">
        {collaborator.avatar ? (
          <Image
            src={collaborator.avatar}
            alt={collaborator.name}
            width={36}
            height={36}
            className="size-9 rounded-full bg-white"
          />
        ) : (
          <div className="size-9 rounded-full bg-white flex items-center justify-center text-10-regular text-blue-100">
            <User />
          </div>
        )}
        {/* collobrator name and email */}
        <div>
          <p className="line-clamp-1 text-sm font-semibold leading-4 text-white">
            {collaborator.name}
            {/* 
              When we change the collobrator's permission, we will show a loading when processing the request.
            */}
            <span className="text-10-regular pl-2 text-blue-100">
              {loading && "updating..."}
            </span>
          </p>
          <p className="text-blue-100 text-xs font-light">
            {collaborator.email}
          </p>
        </div>
      </div>

      {/* if user is owner, show owner text, if user is collobrator, show select allow we change permission */}
      {creatorId === collaborator.id ? (
        <p className="text-sm text-blue-100 pr-2">Owner</p>
      ) : (
        <div className="flex items-center">
          <UserTypeSelector
            userType={userType}
            setUserType={setUserType}
            onClickHandler={updateUserTypeHandler}
          />
          <Button
            type="button"
            onClick={() => removeCollaboratorHandler(collaborator.email)}
          >
            Remove
          </Button>
        </div>
      )}
    </li>
  );
};

export default Collaborator;
