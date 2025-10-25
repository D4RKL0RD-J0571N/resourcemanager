// src/app/components/Header.tsx
"use client";

import DarkModeToggle from "./DarkModeToggle";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 font-semibold text-indigo-600 hover:underline">
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2L1.5 9l10.5 7 10.5-7z" />
          </svg>
          <span>Resourcemanager</span>
        </Link>

        <DarkModeToggle />
      </div>
    </header>
  );
}
