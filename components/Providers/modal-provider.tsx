"use client"
import { useEffect, useState } from "react";
import { SettingModal } from "../Modals/setting-modal";
import { CoverImageModal } from "../Modals/cover-image-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) {
        return null
    }

    return ( 
        <>
            <SettingModal />   
            <CoverImageModal />
        </>
    );
}