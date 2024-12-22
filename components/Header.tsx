import Link from "next/link";
import Image from "next/image";
import React from "react";

function Header({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="header">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assets/images/cloud-doc-logo.svg"
          alt="live doc"
          width={32}
          height={32}
        />
        <span className="hidden md:block font-semibold text-lg">Live Docs</span>
        {/* Logo wihtout name for smaller screen */}
        {/* <Image
          src="/assets/icons/logo-icon.svg"
          alt="live doc"
          width={32}
          height={32}
          className="mr-2 md:hidden"
        /> */}
      </Link>
      {children}
    </div>
  );
}

export default Header;
