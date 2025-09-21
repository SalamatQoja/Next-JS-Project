import Image from "next/image";
import React from "react";


const Header: React.FC = () => {
    return (
        <header>
            <div className="header ">
                <nav className="container reveal">
                    <div className="wrapper1">
                        <div className="header-logo"></div>
                        <h1 className="header-title reveal">Easy Bonus</h1>
                    </div>
                    <main className="wrapper2 ">
                        <a href="#home" className="wrapper2-a">Главная</a>
                        <a href="#about" className="wrapper2-a">О Нас</a>
                        <a href="#demo" className="wrapper2-a">Демо</a>
                        <a href="#contact" className="wrapper2-a">Контакты</a>
                    </main>
                    <div className="header-burger-menu">
                        <a href="#demo2" className="wrapeer2-btn " role="button">Получить демо</a>
                        <label htmlFor="nav-toggle" className="burger">
                            <section className="plate plate4 ">
                                <svg className="burger" version="1.1" height="100" width="100" viewBox="0 0 100 100">
                                    <path className="line line1" d="M 50,35 H 30" />
                                    <path className="line line2" d="M 50,35 H 70" />
                                    <path className="line line3" d="M 50,50 H 30" />
                                    <path className="line line4" d="M 50,50 H 70" />
                                    <path className="line line5" d="M 50,65 H 30" />
                                    <path className="line line6" d="M 50,65 H 70" />
                                </svg>
                                <path className="line" d="M 34,32 L 66,68" />
                                <path className="line" d="M 66,32 L 34,68" />
                            </section>
                        </label>
                    </div>
                </nav>
                <input id="nav-toggle" className="nav-input" type="checkbox" />
                <nav id="site-nav" className="nav reveal" aria-hidden="true">
                    <ul>
                        <li><a href="#home">Главная</a></li>
                        <li><a href="#about">О нас</a></li>
                        <li><a href="#contacts">Контакты</a></li>
                        <li><a href="#features">Функционал</a></li>
                        <li><a href="#benifist">Преимущества проет</a></li>
                        <li><a href="#customer">Отзывы клиентов</a></li>
                        <li><a href="#demo">Демо</a></li>
                    </ul>
                </nav>
                <section className="inner ">
                    <div className="inner-container reveal">
                        <div className="hdr-item">
                            <div className="hdr-into-item ">
                                <h1 className="hdr-into-item-title reveal">Сканируй.Рекомендуй.Зарабатывай</h1>
                                <p className="hdr-into-item-p reveal">Мы создали приложение, которое помогает специалистам, таким как
                                    сантехники и электрики, зарабатывать больше, а магазинам — увеличивать продажи!</p>
                                <a href="#" className="hdr-into-item-btn"  role="button">Попробовать сейчас</a>
                            </div>
                            <article className="header-img reveal">
                                <div className="header-img-row1">
                                    <Image className="hdr-img1" src="/mobile-dynamic-clay.png" alt="mobile" width={330} height={330} />
                                    <Image className="hdr-img2" src="/dollar-dollar-clay.png" alt="dollar" width={330} height={330} />
                                    <Image className="hdr-img3" src="/thumb-up-dynamic-clay.png" alt="thumb up" width={330} height={330} />
                                </div>
                                <div className="header-img-row1">
                                    <Image className="hdr-img4" src="/star-dynamic-clay.png" alt="star" width={330} height={330} />
                                    <Image className="hdr-img5" src="/gift-dynamic-clay.png" alt="gift" width={330} height={330} />
                                    <Image className="hdr-img6" src="/money-dynamic-clay.png" alt="money" width={330} height={330} />
                                </div>
                            </article>
                        </div>
                    </div>
                </section>
            </div>
        </header >
    );
}

export default Header;