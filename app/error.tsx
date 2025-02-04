"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Error = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <p>Error</p>
            <h2 className="text-xl font-medium">Something went wrog!</h2>
            <Button asChild>
                <Link href={"/documents"}>Go back</Link>
            </Button>
        </div>
    );
};

export default Error;
