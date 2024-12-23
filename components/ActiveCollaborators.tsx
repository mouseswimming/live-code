import { useOthers } from "@liveblocks/react";
import Image from "next/image";
import React from "react";

const ActiveCollaborators = () => {
  const others = useOthers();
  console.log({ others });

  const collaborators = others.map((other) => other.info);

  return (
    <ul className="collaborators-list">
      {collaborators.map(({ id, name, avatar, color }) => (
        <li key={id}>
          <Image
            src={avatar}
            alt={name}
            width={100}
            height={100}
            className="inline-block size-8 rounded-full ring-2 ring-dark-100"
            style={{ border: `3px solide ${color}` }}
          />
          {/* {name} */}
        </li>
      ))}
    </ul>
  );
};

export default ActiveCollaborators;
