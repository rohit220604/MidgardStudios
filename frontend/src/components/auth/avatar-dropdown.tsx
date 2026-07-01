"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LogOut, Image, ChevronDown } from "lucide-react";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface AvatarDropdownProps {
  user: User;
}

export function AvatarDropdown({ user }: AvatarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email
    ? user.email[0].toUpperCase()
    : "?";

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
        aria-expanded={isOpen}
        aria-haspopup="true"
        type="button"
      >
        <span className="sr-only">Open user menu</span>
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "User Avatar"}
            className="h-8 w-8 rounded-full border border-border/80 object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary border border-primary/30">
            {initials}
          </div>
        )}
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-border/80 bg-card/90 backdrop-blur-md p-1.5 shadow-xl ring-1 ring-black/5 focus:outline-none z-50 animate-in fade-in slide-in-from-top-2 duration-150"
          role="menu"
          aria-orientation="vertical"
          aria-label="User actions"
        >
          {/* User Info Header */}
          <div className="px-3 py-2.5">
            <p className="text-sm font-semibold text-foreground truncate" role="none">
              {user.name || "Midgard Creator"}
            </p>
            <p className="text-xs text-muted-foreground truncate" role="none">
              {user.email || ""}
            </p>
          </div>

          <div className="h-px bg-border/60 my-1" role="none" />

          {/* Menu Items */}
          <div className="space-y-0.5" role="none">
            <Link
              href="/gallery/my"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              role="menuitem"
            >
              <Image className="h-4 w-4" />
              <span>My Gallery</span>
            </Link>

            <button
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
              role="menuitem"
              type="button"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
