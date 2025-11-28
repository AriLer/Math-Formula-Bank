import { useEffect } from "react";

export function useIntersectionObserver({ root, sentinelRef, callback, enabled = true }) {
    
    useEffect(() => {    
        if (!enabled || !sentinelRef?.current || !root?.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    callback?.();
                }
            },
            {
                root: root.current,
                rootMargin: "0px",
                threshold: 1,
            }
        );

        const sentinel = sentinelRef.current;
        observer.observe(sentinel);

        return () => {
            if (sentinel) {
                observer.unobserve(sentinel);
            }
        };
    }, [enabled, root, sentinelRef, callback]);
}