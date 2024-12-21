import Link from "next/link";
import Image from "next/image";
import React from "react";

function Header({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="header">
      <Link href="/">
        <Image
          src="/assets/icons/logo.svg"
          alt="live doc"
          width={120}
          height={32}
          className="hidden md:block"
        />
        {/* Logo wihtout name for smaller screen */}
        <Image
          src="/assets/icons/logo-icon.svg"
          alt="live doc"
          width={32}
          height={32}
          className="mr-2 md:hidden"
        />
      </Link>
      {children}
    </div>
  );
}

export default Header;
