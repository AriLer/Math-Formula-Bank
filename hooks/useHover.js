"use client";
import { useEffect, useState } from "react";

export function useHover(elementRef) {
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleMouseEnter = () => setHovered(true);
        const handleMouseLeave = () => setHovered(false);

        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            element.removeEventListener("mouseenter", handleMouseEnter);
            element.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [elementRef]);

    return hovered;
}
