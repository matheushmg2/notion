"use client";

import { Cover } from "@/components/Cover/cover";
import { Toolbar } from "@/components/Toolbar/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { use, useMemo } from "react";

type DocumentIdProps = {
    params: Promise<{ documentId: Id<"documents"> }>;
};

const DocumentIdPage = ({ params }: DocumentIdProps) => {
    const unwrappedParams = use(params);

    const Editor = useMemo(
        () =>
            dynamic(() => import("@/components/Editor/editor"), { ssr: false }),
        []
    );

    const document = useQuery(api.documents.getById, {
        documentId: unwrappedParams.documentId,
    });

    const update = useMutation(api.documents.update);

    const onChange = (content: string) => {
        update({
            id: unwrappedParams.documentId,
            content,
        });
    };

    if (document === undefined) {
        return (
            <div className="">
                <Cover.Skeleton />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 w-[50%]" />
                        <Skeleton className="h-4 w-[81%]" />
                        <Skeleton className="h-4 w-[40%]" />
                        <Skeleton className="h-4 w-[60%]" />
                    </div>
                </div>
            </div>
        );
    }

    if (document === null) {
        return <div className="">Not found</div>;
    }

    return (
        <div className="pb-40 dark:bg-[#1f1f1f]">
            <Cover url={document.coverImage} />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar initialData={document} />
                <Editor onChange={onChange} initialContent={document.content} />
            </div>
        </div>
    );
};

export default DocumentIdPage;
