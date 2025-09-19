// src/components/RevealSimple.tsx
"use client";

import { useEffect } from "react";

export default function RevealSimple({
    selector = ".reveal",
    rootMargin = "0px 0px -10% 0px",
    threshold = 0.08,
    once = true,
}: {
    selector?: string;
    rootMargin?: string;
    threshold?: number | number[];
    once?: boolean;
}) {
    useEffect(() => {
        const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
        if (els.length === 0) return;

        if (!("IntersectionObserver" in window)) {
            els.forEach((el) => el.classList.add("is-visible"));
            return;
        }

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const el = entry.target as HTMLElement;
                    if (entry.isIntersecting) {
                        el.classList.add("is-visible");
                        if (once) obs.unobserve(el);
                    } else {
                        if (!once) el.classList.remove("is-visible");
                    }
                });
            },
            { root: null, rootMargin, threshold }
        );

        els.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, [selector, rootMargin, threshold, once]);

    return null; 
}
