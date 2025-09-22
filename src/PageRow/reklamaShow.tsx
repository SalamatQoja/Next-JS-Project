"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
    durationMs?: number;
    oncePerSession?: boolean;
    storageKey?: string;
    showImmediately?: boolean;
};


type FormRequest = {
    first_name: string;
    last_name: string;
    company_name: string;
    email: string;
    phone_number: string;
};

export default function ShowReklama({
    durationMs = 5000,
    oncePerSession = true,
    storageKey = "reklamaShown",
    showImmediately = true,
}: Props) {
    const [visible, setVisible] = useState(false);
    const timerRef = useRef<number | null>(null);
    const rafRef = useRef<number | null>(null);
    const firstInputRef = useRef<HTMLInputElement | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const closeTimerRef = useRef<number | null>(null);
    const autoHideMs = 3000;

    const API_URL = "https://easybonus.uz/api/applications/";

    const [form, setForm] = useState<FormRequest>({
        first_name: "",
        last_name: "",
        company_name: "",
        email: "",
        phone_number: "",
    });

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

        timerRef.current = window.setTimeout(() => {
            openModal();
        }, durationMs);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };

    }, [durationMs, oncePerSession, storageKey, showImmediately]);


    useEffect(() => {
        return () => {
            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current);
                closeTimerRef.current = null;
            }
        };
    }, []);

    const openModal = () => {
        setVisible(true);
        document.documentElement.classList.add("body-modal-open");
        try {
            if (oncePerSession) sessionStorage.setItem(storageKey, "1");
        } catch (err) {

        }
        setTimeout(() => firstInputRef.current?.focus(), 60);
    };

    const hideModal = () => {
        setVisible(false);
        document.documentElement.classList.remove("body-modal-open");
    };

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && visible) hideModal();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [visible]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) {
            hideModal();
        }
    };

    if (!visible) return null;

    const showAlert = (type: "success" | "error", text: string, autoHide = true) => {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }

        setAlert({ type, text });

        if (autoHide) {
            closeTimerRef.current = window.setTimeout(() => {
                setAlert(null);
                closeTimerRef.current = null;
            }, autoHideMs);
        }
    };

    const hideAlert = () => {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
        setAlert(null);
    };

    const validate = (data: FormRequest) => {
        if (!data.first_name.trim()) return "Введите имя";
        if (!data.last_name.trim()) return "Введите фамилию";
        if (!data.company_name.trim()) return "Введите название компании";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "Некорректный email";
        const digits = data.phone_number.replace(/\D/g, "");
        if (!/^\d{9}$/.test(digits)) return "Телефон должен содержать от 7 до 15 цифр";
        return null;
    };

    const formatUZ = (digits: string) => {
        const d = (digits || "").replace(/\D/g, "").slice(0, 9);

        if (!d) return "";
        const op = d.slice(0, 2);
        const partA = d.slice(2, 5);
        const partB = d.slice(5, 7);
        const partC = d.slice(7, 9);

        let out = "+998";
        if (op) out += `(${op})`;
        if (partA) out += ` ${partA}`;
        if (partB) out += `-${partB}`;
        if (partC) out += `-${partC}`;

        return out;
    };



    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        let digits = raw.replace(/\D/g, "");

        if (digits.startsWith("998")) digits = digits.slice(3);

        if (digits.startsWith("0")) digits = digits.replace(/^0+/, "");

        digits = digits.slice(0, 9);
        setForm((prev) => ({ ...prev, phone_number: digits }));
    };

    const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData("text") || "";
        let digits = pasted.replace(/\D/g, "");
        if (digits.startsWith("998")) digits = digits.slice(3);
        digits = digits.replace(/^0+/, "").slice(0, 9);
        e.preventDefault();
        setForm((prev) => ({ ...prev, phone_number: digits }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value } as FormRequest));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const v = validate(form);
        if (v) {
            setLoading(false);
            showAlert("error", v);
            return;
        }

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            console.log("inform", res);

            const text = await res.text();
            let json;
            try {
                json = JSON.parse(text);
            } catch {
                json = null;
            }
            console.log("inform2", text);

            if (!res.ok) {
                const message = (json && (json.error || JSON.stringify(json))) || `HTTP ${res.status}`;
                throw new Error(message);
            }

            if (json?.success && json.application) {
                showAlert("success", "Заявка принята. Спасибо!", true);
                setForm({ first_name: "", last_name: "", company_name: "", email: "", phone_number: "" });
            } else {
                throw new Error("Непредвиденный ответ сервера");
            }
        } catch (e) {
            const message = e instanceof Error ? e.message : String(e);
            console.log("error", e);
            showAlert("error", message || "Ошибка сети", true);
        } finally {
            setLoading(false);
        }
    };

    const displayValue = form.phone_number ? formatUZ(form.phone_number) : "";

    return (
        <div
            ref={overlayRef}
            className="reklama-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Реклама"
            onMouseDown={handleBackdropClick}

        >
            <div
                className="reklama-card"
                role="document"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className="reklama-close"
                    aria-label="Закрыть"
                    onClick={hideModal}
                >
                    ×
                </button>

                <div id="demo2" className="section-inner2">
                    <form
                        aria-live="polite"
                        className="application-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const fd = new FormData(e.currentTarget);
                            console.log("form data:", Object.fromEntries(fd.entries()));
                            hideModal();
                        }}
                        noValidate
                    >
                        <div className="section-auth" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                            <article className="section-auth-item" style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: 6 }}>
                                <label className="section-name2">Имя</label>
                                <input className="section-auth-input "
                                    type="text"
                                    name="first_name"
                                    onChange={handleChange}
                                    value={form.first_name}
                                    placeholder="Введите имя"
                                    required
                                />
                            </article>

                            <article className="section-auth-item" style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: 6 }}>
                                <label className="section-name2">Фамилия</label>
                                <input className="section-auth-input "
                                    type="text"
                                    name="last_name"
                                    value={form.last_name}
                                    onChange={handleChange}
                                    placeholder="Введите фамилия"
                                    required
                                />
                            </article>
                        </div>
                        <footer className="section-input3" style={{ marginTop: 12 }}>
                            <label className="section-name3">Название компании</label>
                            <input className="section-input "
                                type="text"
                                name="company_name"
                                value={form.company_name}
                                onChange={handleChange}
                                placeholder="Названия компания"
                                required
                            />

                            <label className="section-name3" style={{ marginTop: 8 }}>E-mail</label>
                            <input className="section-input"
                                type="text"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Введите почту"
                                required
                            />
                            <label className="section-name3" style={{ marginTop: 8 }}>Номер телефона</label>
                            <input className="section-input"
                                type="tel"
                                name="phone_number"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={displayValue}
                                onChange={handlePhoneChange}
                                onPaste={handlePhonePaste}
                                placeholder="+998( )__-__-__"
                                required
                                autoComplete="tel"
                            />

                            <button type="submit" className="section-btn2"
                                disabled={loading}> {loading ? "Отправка..." : "Отправить заявку"}
                            </button>

                            {alert && (
                                <div
                                    className={`user-inform-modal ${alert.type === "success" ? "ok" : "err"}`}
                                    role="status"
                                    aria-live="polite"
                                >
                                    <div className="ui-row">
                                        <div className="ui-text">{alert.text}</div>
                                        <button className="ui-close" onClick={hideAlert} aria-label="Закрыть уведомление">

                                        </button>
                                    </div>
                                </div>
                            )}
                        </footer>
                    </form>
                </div>
            </div>
        </div>
    );
}
