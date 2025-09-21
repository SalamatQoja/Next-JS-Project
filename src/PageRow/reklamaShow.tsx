"use client";

import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";

type Props = {
    durationMs?: number;
    oncePerSession?: boolean;
    storageKey?: string;
    showImmediately?: boolean;
};

export default function ShowReklama({
    durationMs = 5000,
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

        if (oncePerSession && typeof window !== "undefined") {
            try {
                if (sessionStorage.getItem(storageKey)) {
                    return;
                }
            } catch (err) {
            }
        }

        setVisible(true);
        startRef.current = performance.now();
        setRemaining(durationMs);

        timeoutRef.current = window.setTimeout(() => {
            hide();
            try {
                if (oncePerSession) sessionStorage.setItem(storageKey, "1");
            } catch (err) { }
        }, durationMs);

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

        document.documentElement.classList.add("body-modal-open");

        return () => {
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

    // const handleSkip = () => {
    //     hide();
    // };

    if (!visible) return null;

    // const progress = Math.round(((durationMs - remaining) / durationMs) + 1000);

    return (
        <div className="reklama-overlay" role="dialog" aria-modal="true" aria-label="Реклама">
            <div className="reklama-card">
                <div id="demo2" className="section-inner2">
                    <form aria-live="polite" className="application-form" >
                        <div className="section-auth">
                            <article className="section-auth-item">
                                <label className="section-name2 ">Имя</label>
                                <input className="section-auth-input "
                                    type="text"
                                    name="first_name"
                                    // onChange={handleChange}
                                    // value={form.first_name}
                                    placeholder="Введите имя"
                                    required
                                />
                            </article>
                            <article className="section-auth-item">
                                <label className="section-name2 ">Фамилия</label>
                                <input className="section-auth-input"
                                    type="text"
                                    name="last_name"
                                    // value={form.last_name}
                                    // onChange={handleChange}
                                    placeholder="Введите фамилия"
                                    required
                                />
                            </article>
                        </div>

                        <footer className="section-input3">
                            <label className="section-name3">Названия компания</label>
                            <input className="section-input "
                                type="text"
                                name="company_name"
                                // value={form.company_name}
                                // onChange={handleChange}
                                placeholder="Названия компания"
                                required
                            />
                            <label className="section-name3">E-mail</label>
                            <input className="section-input"
                                type="text"
                                name="email"
                                // value={form.email}
                                // onChange={handleChange}
                                placeholder="Введите почту"
                                required
                            />
                            <label className="section-name3">Номер телефона</label>
                            <input className="section-input"
                                type="text"
                                name="phone_number"
                                // value={form.phone_number}
                                // onChange={handleChange}
                                placeholder="+998 -xxx- -xxx-"
                                required
                            />
                            <button type="submit" className="section-btn">Получить заявку</button>
                        </footer>
                    </form>
                </div>
            </div>
        </div>
    );
}
