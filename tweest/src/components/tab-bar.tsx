"use client";

import {
  HomeIcon as SolidHomeIcon,
  MagnifyingGlassIcon as SolidMagnifyingGlassIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  MagnifyingGlassIcon as OutlineMagnifyingGlassIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar({ username }: { username: string }) {
  const pathname = usePathname();
  return (
    <div className="fixed  bottom-0 w-full sm:w-2xl grid grid-cols-3 border-neutral-600 border-t  *:text-white bg-neutral-800">
      <Link href="/" className="flex flex-col items-center gap-px">
        {pathname === "/" ? (
          <SolidHomeIcon className="w-7 h-7" />
        ) : (
          <OutlineHomeIcon className="w-7 h-7" />
        )}
        <span>홈</span>
      </Link>
      <Link href="/search" className="flex flex-col items-center gap-px">
        {pathname === "/search" ? (
          <SolidMagnifyingGlassIcon className="w-7 h-7" />
        ) : (
          <OutlineMagnifyingGlassIcon className="w-7 h-7" />
        )}
        <span>검색</span>
      </Link>
      <Link
        href={`/users/${username}`}
        className="flex flex-col items-center gap-px"
      >
        {pathname === `/users/${username}` ? (
          <SolidUserIcon className="w-7 h-7" />
        ) : (
          <OutlineUserIcon className="w-7 h-7" />
        )}
        <span>내 정보</span>
      </Link>
    </div>
  );
}
