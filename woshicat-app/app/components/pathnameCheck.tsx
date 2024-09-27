'use client';
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import ComingSoon from "../coming-soon/page";

const comingSoonPath = '/coming-soon';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // useEffect(() => {
    //     // If the current path is not the coming soon page, redirect
    //     if (pathname !== comingSoonPath) {
    //         window.location.href = comingSoonPath; // Redirects to the coming soon page
    //     }
    // }, [pathname]); // Only re-run the effect if the pathname changes

    // if (pathname !== comingSoonPath) {
    //     return (
    //     <>
    //     <ComingSoon />
    //     </>
    //     );
    // }

    return <>{children}</>;
};
