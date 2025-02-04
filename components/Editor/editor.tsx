"use client";

import { useEdgeStore } from "@/lib/edgestore";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";

type EditorProps = {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
};

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
    const { resolvedTheme } = useTheme();

    const { edgestore } = useEdgeStore();

    const handleUpdate = async (file: File) => {
        const res = await edgestore.publicFiles.upload({
            file,
        });

        return res.url;
    };

    const editor = useCreateBlockNote({
        initialContent: initialContent
            ? JSON.parse(initialContent as string)
            : [
                  {
                      type: "paragraph",
                      content: "",
                  },
              ],
        uploadFile: handleUpdate,
    });

    return (
        <BlockNoteView
            editable={editable}
            editor={editor}
            onChange={() => {
                const updatedBlocks = editor.document;
                onChange(JSON.stringify(updatedBlocks, null, 2));
            }}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
        />
    );
};

export default Editor;
