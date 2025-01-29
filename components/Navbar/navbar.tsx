"use client";
import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import React from "react";
import { Logo } from "../Logo/logo";
import { ModeToggle } from "../ModeToggle/modeToggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "../ui/button";
import { Spinner } from "../Spinner/spinner";
import Link from "next/link";

export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    const scrolled = useScrollTop();

    return (
        <div
            className={cn(
                "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6",
                scrolled && "border-b shadow-sm"
            )}
        >
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {isLoading && <Spinner />}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant={"ghost"} size={"sm"}>
                                Login
                            </Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button size={"sm"}>Get Notion free</Button>
                        </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <Button variant={"ghost"} size={"sm"} asChild>
                            <Link href={'/documents'}>
                                Enter Notion
                            </Link>
                        </Button>
                        <UserButton />
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    );
};
// 1:39:45