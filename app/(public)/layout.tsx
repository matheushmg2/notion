import { ReactNode } from "react";

const PublicLayout = ({ children }: { children: ReactNode }) => {
    return <div className="h-full dark:bg-[#1f1f1f]">{children}</div>;
};

export default PublicLayout;
