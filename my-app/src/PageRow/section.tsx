import Image from "next/image";
import React from "react";
// import "./destkopPage.css";
// import "./MobilePage.css";

export default function Section() {
    return (
        <section className="main-bottom">
            <h1 className="main-bottom-title reveal">Как это помогает <span> бизнесу?</span></h1>
            <div className="main-bottom-container reveal">
                <header className="main-bottom-inner reveal">
                    <Image className="main-bottom-img" src="/bag-dynamic-clay.png" alt="picture" width={120} height={125} priority/>
                    <p className="main-bottom-p">Увеличение продаж через рекомендации</p>
                </header>
                <main className="main-bottom-inner reveal">
                    <Image className="main-bottom-img" src="/toggle-dynamic-clay.png" alt="picture"width={120} height={125} />
                    <p className="main-bottom-p reveal">Программа лояльности без сложных систем</p>
                </main>
                <article className="main-bottom-inner reveal">
                    <Image className="main-bottom-img" src="/rocket-dynamic-clay.png" alt="picture"width={120} height={125} />
                    <p className="main-bottom-p reveal">Быстрая и удобная маркировка товаров</p>
                </article>
                <footer className="main-bottom-inner reveal">
                    <Image className="main-bottom-img" src="/boy-dynamic-clay.png" alt="picture"width={120}height={125} />
                    <p className="main-bottom-p reveal">Привлечение и удержание мастеров</p>
                </footer>
            </div>
        </section>
    );
}