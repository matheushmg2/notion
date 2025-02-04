"use client";
import { VercelToolbar } from "@vercel/toolbar/next";
import { useConvexAuth } from "convex/react";

export const StaffToolbar = () => {
    const { isAuthenticated } = useConvexAuth();

    return isAuthenticated ? <VercelToolbar /> : null;
}
