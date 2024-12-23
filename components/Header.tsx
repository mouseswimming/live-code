import Link from "next/link";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

function Header({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <div className={cn(className, "header")}>
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assets/images/cloud-doc-logo.svg"
          alt="live doc"
          width={32}
          height={32}
        />
        <span className="hidden md:block font-semibold text-lg uppercase">
          Live Docs
        </span>
      </Link>
      {children}
    </div>
  );
}

export default Header;
