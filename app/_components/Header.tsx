"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";

const MenuLinks = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Explore", href: "/search/All" },
  { id: 3, name: "Contact Us", href: "/contact" },
];

const Header = () => {
  const { user } = useKindeBrowserClient();

  return (
    <header className="flex justify-between items-center p-4 shadow-sm">
        <div className="flex gap-10 items-center">
          <Link href="/">
          <Image src="/logo.svg" alt="logo" width={160} height={80} />
          </Link>
          <ul className="md:flex gap-8 hidden">
            {MenuLinks.map((link) => (
              <Link href={link.href} key={link.id}>
                <li className="hover:text-primary hover:scale-105 transition-all ease-in-out">
                  {link.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        {user ? (
          <>
            <Popover>
              <PopoverTrigger>
                <Image
                  src={user?.picture as string}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent className="w-40 z-10">
                <ul className="w-full flex flex-col gap-2 rounded-md">
                  <li className="cursor-pointer hover:bg-slate-100 p-2 rounded-md">
                    My profile
                  </li>
                  <Link
                    href={"/my-booking"}
                    className="cursor-pointer hover:bg-slate-100 p-2 rounded-md"
                  >
                    My Booking
                  </Link>
                  <li className="cursor-pointer hover:bg-slate-100 p-2 rounded-md">
                    <LogoutLink>Log out</LogoutLink>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <LoginLink>
            <Button>Get Started</Button>
          </LoginLink>
        )}
      </header>
  );
};

export default Header;
