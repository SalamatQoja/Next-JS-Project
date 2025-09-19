"use client";

import React, { useRef, useEffect } from "react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useState } from "react";

type FormRequest = {
    first_name: string;
    last_name: string;
    company_name: string;
    email: string;
    phone_number: string;
};


export default function SectionRow() {

    const API_URL = "https://easybonus.uz/api/applications/";

    const [form, setForm] = useState<FormRequest>({
        first_name: "",
        last_name: "",
        company_name: "",
        email: "",
        phone_number: "",
    });

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{ type: "success" | "error"; text: string } | null>(null);


    const closeTimerRef = useRef<number | null>(null);
    const autoHideMs = 5000;


    useEffect(() => {
        return () => {
            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current);
                closeTimerRef.current = null;
            }
        };
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value } as FormRequest));
    };

    const validate = (data: FormRequest) => {
        if (!data.first_name.trim()) return "Введите имя";
        if (!data.last_name.trim()) return "Введите фамилию";
        if (!data.company_name.trim()) return "Введите название компании";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "Некорректный email";
        if (!/^\d{7,15}$/.test(data.phone_number.replace(/\D/g, ""))) return "Телефон должен содержать от 7 до 15 цифр";
        return null;
    };


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

            const text = await res.text();
            let json;
            try {
                json = JSON.parse(text);
            } catch {
                json = null;
            }

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
        } catch (err: any) {
            showAlert("error", err?.message || "Ошибка сети", true);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <section id="demo" className="section-row">
                <h1 className="section-title reveal">Хотите опробовать <span> демо?</span></h1>
                <div className="section-container reveal">
                    <div className="section-inner ">
                        <h1 className="section-title2 reveal">Попробуйте <span>EASY BONUS</span> в действии — без обязательств и
                            оплаты.</h1>
                        <section className="section-item">
                            <div className="section-img-size">
                                <Image src="/Distribute Vertical.png" alt="picture" className="section-img reveal" width={80} height={80} />
                            </div>
                            <p className="section-p reveal">Сканируйте тестовый штрих-код</p>
                        </section>
                        <section className="section-item">
                            <div className="section-img-size reveal">
                                <Image src="/Coin Dollar.png" alt="picture" className="section-img reveal" width={90} height={90} />
                            </div>
                            <p className="section-p reveal">Узнайте, как начисляются бонусы</p>
                        </section>
                        <aside className="section-item">
                            <div className="section-img-size">
                                <Image src="/Adjust.png" alt="picture" className="section-img reveal" width={90} height={90} />
                            </div>
                            <p className="section-p reveal">Оцените, насколько легко работает система</p>
                        </aside>
                    </div>
                    <div id="demo2" className="section-inner2 reveal">
                        <form onSubmit={handleSubmit} aria-live="polite" className="application-form" >
                            <aside className="section-auth reveal">
                                <article className="section-auth-item">
                                    <label className="section-name ">Имя</label>
                                    <input className="section-auth-input reveal"
                                        type="text"
                                        name="first_name"
                                        onChange={handleChange}
                                        value={form.first_name}
                                        placeholder="Введите имя"
                                        required
                                    />
                                </article>
                                <article className="section-auth-item">
                                    <label className="section-name ">Фамилия</label>
                                    <input className="section-auth-input reveal"
                                        type="text"
                                        name="last_name"
                                        value={form.last_name}
                                        onChange={handleChange}
                                        placeholder="Введите фамилия"
                                        required
                                    />
                                </article>
                            </aside>
                            <footer className="section-input3">
                                <label>Названия компания</label>
                                <input className="section-input "
                                    type="text"
                                    name="company_name"
                                    value={form.company_name}
                                    onChange={handleChange}
                                    placeholder="Названия компания"
                                    required
                                />
                                <label>E-mail</label>
                                <input className="section-input"
                                    type="text"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Введите почту"
                                    required
                                />
                                <label>Номер телефона</label>
                                <input className="section-input"
                                    type="text"
                                    name="phone_number"
                                    value={form.phone_number}
                                    onChange={handleChange}
                                    placeholder="+998 -xxx- -xxx-"
                                    required
                                />
                                <button type="submit"
                                    className="section-btn "
                                    disabled={loading}
                                >{loading ? "Отправка..." : "Отправить заявку"}</button>

                                {alert && (
                                    <div
                                        className={`user-inform-modal ${alert.type === "success" ? "ok" : "err"}`}
                                        role="status"
                                        aria-live="polite"
                                    >
                                        <div className="ui-row">
                                            <div className="ui-text">{alert.text}</div>
                                            <button className="ui-close" onClick={hideAlert} aria-label="Закрыть уведомление">
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </footer>
                        </form>
                    </div>
                </div>
            </section >
            <section className="main-slider">
                <h1 className="main-slider-title reveal">Что говорят <span> о нас?</span></h1>
                <div className="swiper mySwiper reveal">
                    <Swiper
                        modules={[Navigation, Pagination, A11y]}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        A11y={{ enabled: true }}
                        breakpoints={{
                            898: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper: any) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                    >
                        <SwiperSlide>
                            <p className="main-slider-p reveal">Теперь я не просто советую клиентам хорошие товары, но и получаю за это
                                бонусы.
                                Удобно, честно и выгодно — отличная мотивация!</p>
                            <section className="main-slider-human">
                                <Image src="/image 3.png" alt="picture" className="main-slider-img" width={80} height={80} />
                                <div className="section-slider-name">
                                    <p className="main-slider-p2 reveal">Андрей Кузмин</p>
                                    <p className="main-slider-p3 reveal">Электрик</p>
                                </div>
                            </section>
                        </SwiperSlide>
                        <SwiperSlide>
                            <p className="main-slider-p reveal">С EASY BONUS мы увеличили продажи на 18% за первый месяц. Система проста в
                                использовании, а мастера стали чаще возвращаться именно к нам.</p>
                            <article className="main-slider-human">
                                <Image src="/image 4.png" alt="picture" className="main-slider-img" width={80} height={80} />
                                <div className="section-slider-name">
                                    <p className="main-slider-p2 reveal">ТехноМаркет</p>
                                    <p className="main-slider-p3 reveal">Магазин</p>
                                </div>
                            </article>
                        </SwiperSlide>
                        <SwiperSlide>
                            <p className="main-slider-p reveal">Раньше просто рекомендовала товары — теперь это приносит доход. Приложение
                                простое, всё наглядно. Рекомендую коллегам!</p>
                            <div className="main-slider-human">
                                <Image src="/image 5.png" alt="picture" className="main-slider-img" width={80} height={80} />
                                <div className="section-slider-name">
                                    <p className="main-slider-p2 reveal">Наталья Сараева</p>
                                    <p className="main-slider-p3 reveal">Сантехник</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <p className="main-slider-p reveal">Теперь я не просто советую клиентам хорошие товары, но и получаю за это
                                бонусы.
                                Удобно, честно и выгодно — отличная мотивация!</p>
                            <section className="main-slider-human">
                                <Image src="/image 3.png" alt="picture" className="main-slider-img" width={80} height={80} />
                                <div className="section-slider-name">
                                    <p className="main-slider-p2 reveal">Андрей Кузмин</p>
                                    <p className="main-slider-p3 reveal">Электрик</p>
                                </div>
                            </section>
                        </SwiperSlide>
                        <SwiperSlide>
                            <p className="main-slider-p reveal">С EASY BONUS мы увеличили продажи на 18% за первый месяц. Система проста в
                                использовании, а мастера стали чаще возвращаться именно к нам.</p>
                            <article className="main-slider-human">
                                <Image src="/image 4.png" alt="picture" className="main-slider-img" width={80} height={80} />
                                <div className="section-slider-name">
                                    <p className="main-slider-p2 reveal">ТехноМаркет</p>
                                    <p className="main-slider-p3 reveal">Магазин</p>
                                </div>
                            </article>
                        </SwiperSlide>
                        <SwiperSlide>
                            <p className="main-slider-p reveal">Раньше просто рекомендовала товары — теперь это приносит доход. Приложение
                                простое, всё наглядно. Рекомендую коллегам!</p>
                            <div className="main-slider-human">
                                <Image src="/image 5.png" alt="picture" className="main-slider-img" width={80} height={80} />
                                <div className="section-slider-name">
                                    <p className="main-slider-p2 reveal">Наталья Сараева</p>
                                    <p className="main-slider-p3 reveal">Сантехник</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>
        </>
    );
}
