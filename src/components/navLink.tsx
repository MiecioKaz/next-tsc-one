"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink<T extends string>({
  href,
  children,
}: {
  href: Route<T>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = href === pathname;

  return (
    <Link
      className={
        active ? "underline underline-offset-4" : "hover:text-yellow-600"
      }
      href={href}
    >
      {children}
    </Link>
  );
}
