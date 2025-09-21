import React from "react";

function Main() {
    return (
        <>
            <main id="home" className="main">
                <div className="main-top-line reveal"></div>
                <div className="main-container reveal">
                    <h1 className="main-title reveal">Привет, мы <span> Easy Bonus!</span></h1>
                    <div className="main-inner">
                        <aside className="inform1 reveal">
                            <article className="inform1-title-show reveal">
                                <h2 className="inform1-title reveal">Кто мы?</h2>
                                <div className="inform-ellipse reveal"></div>
                            </article>
                            <h2 className="inform1-p reveal"><span>Мы</span> — команда IT-специалистов, создающая простые и
                                эффективные
                                цифровые
                                решения для реального бизнеса.</h2>
                            <span className="inform1-ellipse"></span>
                        </aside>
                        <section className="inform2 reveal">
                            <article className="inform2-title-show reveal">
                                <h2 className="inform2-title reveal">Какова наша цель?</h2>
                                <div className="inform2-ellipse2 reveal"></div>
                            </article>
                            <p className="inform2-p reveal"><span>Наша цель</span> — помочь специалистам (сантехникам, электрикам и
                                другим
                                мастерам)
                                зарабатывать больше, а магазинам — продавать активнее с помощью приложения<span> EASY
                                    BONUS.</span></p>
                        </section>
                    </div>
                    <footer className="inform3 ">
                        <div className="inform3-show">
                            <p className="inform3-p1 reveal">Мы понимаем, как важно упростить повседневные задачи, поэтому создали
                                удобный
                                инструмент, который:</p>
                            <div className="inform3-ellipse reveal"></div>
                        </div>
                        <div className="inform3-row">
                            <p className="inform3-p2 reveal">- Автоматизирует учёт рекомендаций товаров;</p>
                            <p className="inform3-p2 ">- Позволяет быстро сканировать и отслеживать бонусы;</p>
                            <p className="inform3-p2 reveal">- Делает процесс прозрачным и выгодным для всех участников.</p>
                        </div>
                    </footer>
                    <div className="main-bottom-line reveal"></div>
                </div>
            </main>
            <main className="main-center">
                <h1 className="section-title reveal">Что умеет <span>наше приложение?</span></h1>
                <section className="main-center-container reveal">
                    <div className="accordion reveal">
                        <details className="item reveal">
                            <summary>
                                <article className="summary-row reveal">
                                    <h2 className="item-title reveal">Сканирование штрих-кодов товаров</h2>
                                    <div className="chev reveal" aria-hidden></div>
                                </article>
                            </summary>
                            <div className="item-body reveal">
                                Пользователи (специалисты) могут сканировать штрих-коды товаров через приложение для
                                фиксации рекомендаций и начисления бонусов.
                            </div>
                        </details>
                        <details className="item reveal">
                            <summary>
                                <article className="summary-row reveal">
                                    <h2 className="item-title reveal">Начисление бонусов и вознаграждений</h2>
                                    <div className="chev" aria-hidden></div>
                                </article>
                            </summary>
                            <div className="item-body">
                                После сканирования специалист получает денежное вознаграждение или баллы от магазина — за
                                факт рекомендации и использования товара.
                            </div>
                        </details>
                        <details className="item reveal">
                            <summary>
                                <article className="summary-row reveal">
                                    <h2 className="item-title reveal">Механизм рекомендаций через специалистов</h2>
                                    <div className="chev" aria-hidden></div>
                                </article>
                            </summary>
                            <div className="item-body reveal">
                                Приложение рассчитано на взаимодействие с мастерами (сантехники, электрики и т.д.), которые
                                рекомендуют товары клиентам, тем самым продвигая продукцию магазинов.
                            </div>
                        </details>
                        <details className="item reveal">
                            <summary>
                                <article className="summary-row reveal">
                                    <h2 className="item-title reveal">Генерация уникальных штрих-кодов для товаров</h2>
                                    <div className="chev reveal" aria-hidden></div>
                                </article>
                            </summary>
                            <div className="item-body">
                                Система позволяет магазинам создавать неограниченное количество уникальных штрих-кодов, в
                                которых заложена информация о бонусах.
                            </div>
                        </details>
                        <details className="item reveal">
                            <summary>
                                <article className="summary-row reveal">
                                    <h2 className="item-title reveal">Подготовка штрих-кодов к печати</h2>
                                    <div className="chev reveal" aria-hidden></div>
                                </article>
                            </summary>
                            <div className="item-body">
                                Приложение или связанный с ним сервис может подготовить штрих-коды для печати на
                                стикер-принтерах — удобно для маркировки товаров.
                            </div>
                        </details>
                        <details className="item reveal">
                            <summary>
                                <article className="summary-row reveal">
                                    <h2 className="item-title reveal">Поддержка программы лояльности для магазинов</h2>
                                    <div className="chev reveal" aria-hidden></div>
                                </article>
                            </summary>
                            <div className="item-body">
                                Интеграция этой системы помогает магазинам автоматизировать программу лояльности, управлять
                                бонусами и отслеживать активность специалистов.
                            </div>
                        </details>
                        <details className="item reveal">
                            <summary>
                                <article className="summary-row reveal">
                                    <h2 className="item-title reveal">Стимулирование роста продаж</h2>
                                    <div className="chev reveal" aria-hidden></div>
                                </article>
                            </summary>
                            <div className="item-body">
                                Через привлечение активных специалистов и мотивацию рекомендаций, приложение увеличивает
                                объём продаж товаров в магазине.
                            </div>
                        </details>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Main;