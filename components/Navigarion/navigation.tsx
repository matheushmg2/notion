"use client";

import { cn } from "@/lib/utils";
import {
    ChevronsLeft,
    MenuIcon,
    Plus,
    PlusCircle,
    Search,
    Settings,
    Trash,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ElementRef, MouseEvent, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { UserItem } from "../UserItems/user-item";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Item } from "../Item/item";
import { toast } from "sonner";
import { DocumentList } from "../DocumentList/documentList";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { TrashBox } from "../TrashBox/trashBox";
import { useSearch } from "@/hooks/useSearch";
import { useSettings } from "@/hooks/useSetting";
import { NavbarDocument } from "../Navbar/navbarDocument";

const Navigation = () => {
    const search = useSearch();
    const settings = useSettings();

    const router = useRouter();

    const params = useParams();

    const pathname = usePathname();

    const isMobile = useMediaQuery("(max-width: 768px)");

    const create = useMutation(api.documents.create);

    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [pathname, isMobile]);

    const handleMouseDown = (event: MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;

        document.addEventListener("mousemove", (ev) =>
            handleMouseMove(ev as unknown as MouseEvent)
        );
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event: MouseEvent): void => {
        if (!isResizingRef.current) return;

        let newWidth = event.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty(
                "width",
                `calc(100% - ${newWidth}px)`
            );
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", (ev) =>
            handleMouseMove(ev as unknown as MouseEvent)
        );
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "240px";
            navbarRef.current.style.setProperty(
                "width",
                isMobile ? "0" : "calc(100% - 240px)"
            );
            navbarRef.current.style.setProperty(
                "left",
                isMobile ? "100%" : "240px"
            );

            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");

            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const handleCreate = () => {
        const promise = create({ title: "Untitled" }).then((documentId) =>
            router.push(`/documents/${documentId}`)
        );
        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "New note created!",
            error: "Failed to create a new note.",
        });
    };

    return (
        <>
            <aside
                className={cn(
                    "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "w-0"
                )}
                ref={sidebarRef}
            >
                <div
                    onClick={collapse}
                    role="button"
                    className={cn(
                        "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
                        isMobile && "w-100"
                    )}
                >
                    <ChevronsLeft className="h-6 w-6" />
                </div>
                <div className="">
                    <UserItem />
                    <Item
                        onClick={search.onOpen}
                        icon={Search}
                        label="Search"
                        isSearch
                    />
                    <Item
                        onClick={settings.onOpen}
                        icon={Settings}
                        label="Settings"
                    />
                    <Item
                        onClick={handleCreate}
                        icon={PlusCircle}
                        label="New Page"
                    />
                </div>
                <div className="mt-4">
                    <DocumentList />
                    <Item
                        onClick={handleCreate}
                        icon={Plus}
                        label="Add a page"
                    />
                    <Popover>
                        <PopoverTrigger className="w-full mt-4">
                            <Item icon={Trash} label="Trash" />
                        </PopoverTrigger>
                        <PopoverContent
                            className="p-0 w-72"
                            side={isMobile ? "bottom" : "right"}
                        >
                            <TrashBox />
                        </PopoverContent>
                    </Popover>
                </div>
                <div
                    onMouseDown={(ev) =>
                        handleMouseDown(
                            ev as unknown as MouseEvent<
                                HTMLDivElement,
                                MouseEvent
                            >
                        )
                    }
                    onClick={resetWidth}
                    className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
                />
            </aside>
            <div
                ref={navbarRef}
                className={cn(
                    "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "left-0 w-full"
                )}
            >
                {!!params.documentId ? (
                    <NavbarDocument
                        isCollapsed={isCollapsed}
                        onResetWidth={resetWidth}
                    />
                ) : (
                    <nav className="bg-transparent px-3 py-2 w-full">
                        {isCollapsed && (
                            <MenuIcon
                                onClick={resetWidth}
                                role="button"
                                className="h-6 w-6 text-muted-foreground"
                            />
                        )}
                    </nav>
                )}
            </div>
        </>
    );
};

export default Navigation;
