"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
    durationMs?: number;         
    oncePerSession?: boolean;   
    storageKey?: string;        
    showImmediately?: boolean;   
};

export default function ShowReklama({
    durationMs = 10000,
    oncePerSession = true,
    storageKey = "reklamaShown",
    showImmediately = true,
}: Props) {
    const [visible, setVisible] = useState(false);
    const [remaining, setRemaining] = useState<number>(durationMs);
    const startRef = useRef<number | null>(null);
    const timeoutRef = useRef<number | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        if (!showImmediately) return;

        // если нужно показывать только один раз за сессию
        if (oncePerSession && typeof window !== "undefined") {
            try {
                if (sessionStorage.getItem(storageKey)) {
                    return;
                }
            } catch (err) {
                // ignore storage errors (privacy mode)
            }
        }

        // show reklama
        setVisible(true);
        startRef.current = performance.now();
        setRemaining(durationMs);

        // закрытие по таймауту
        timeoutRef.current = window.setTimeout(() => {
            hide();
            try {
                if (oncePerSession) sessionStorage.setItem(storageKey, "1");
            } catch (err) { }
        }, durationMs);

        // progress update via rAF for smoothness
        const tick = (ts: number) => {
            if (!startRef.current) startRef.current = ts;
            const elapsed = ts - (startRef.current || 0);
            const rem = Math.max(0, durationMs - elapsed);
            setRemaining(rem);
            if (rem <= 0) {
                cancelAnim();
                return;
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);

        // блокируем прокрутку
        document.documentElement.classList.add("body-modal-open");

        return () => {
            // cleanup
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            cancelAnim();
            document.documentElement.classList.remove("body-modal-open");
        };
    }, [durationMs, oncePerSession, storageKey, showImmediately]);

    const cancelAnim = () => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    };

    const hide = () => {
        setVisible(false);
        // cleanup timers
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        cancelAnim();
        document.documentElement.classList.remove("body-modal-open");
        try {
            if (oncePerSession) sessionStorage.setItem(storageKey, "1");
        } catch (err) { }
    };

    const handleSkip = () => {
        hide();
    };

    if (!visible) return null;

    const progress = Math.round(((durationMs - remaining) / durationMs) * 100);

    return (
        <div className="reklama-overlay" role="dialog" aria-modal="true" aria-label="Реклама">
            <div className="reklama-card"> 
                <div className="reklama-media">
                    <Image src="/softuim.png" alt="Реклама" width={760} height={300} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                </div>

                <div className="reklama-info">
                    <div className="reklama-top">
                        <div className="reklama-title">Специальное предложение</div>
                        <button aria-label="Пропустить рекламу" className="reklama-skip" onClick={handleSkip}>
                            Пропустить
                        </button>
                    </div>

                    <div className="reklama-text">Мы готовымся — узнайте больше!</div>
                    <p className="reklama-text">Звоните телефон номер: +998975000501</p>

                    <div className="reklama-bottom">
                        <div className="reklama-progress" aria-hidden>
                            <div className="reklama-progress-bar" style={{ width: `${progress}%` }} />
                        </div>
                        <div className="reklama-remaining">{Math.ceil(remaining / 1000)} с</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
