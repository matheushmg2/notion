"use client";

import { MouseEvent, ReactNode } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";

type ConfirmModalProps = {
    children: ReactNode;
    onConfirm: () => void;
};

export const ConfirmModal = ({ children, onConfirm }: ConfirmModalProps) => {
    const handleConfirm = (event: MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        onConfirm();
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) =>
                            handleConfirm(
                                e as unknown as MouseEvent<
                                    HTMLDivElement,
                                    MouseEvent
                                >
                            )
                        }
                    >
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
