import Image from "next/image";

export default function Contact() {
    return (
        <section id="contact">
            <div className="contact-row">
                <div className="contact-container reveal">
                    <h1 className="contact-row-title reveal">Контакты</h1>
                    <div className="contact-inform">
                        <h2 className="contact-inform-title">Есть вопросы или хотите обсудить внедрение?</h2>
                        <p className="contact-inform-p">Свяжитесь с нами любым удобным способом:</p>
                        <section className="contact-important">
                            <article className="contact-inform-call">
                                <Image src="/Message 36.png" alt="picture" width={30} height={30}/>
                                <p className="contact-inform-p2">Email: softuim@yahoo.com </p>
                            </article>
                            <aside className="contact-inform-call2">
                                <Image src="/Calling 1.png" alt="picture"width={30} height={30} />
                                <p className="contact-inform-p2">Телефон: +998 97 500 05 01 </p>
                            </aside>
                            <address className="contact-inform-call">
                                <Image className="sayt-img" src="/sayt.png" alt="picture"width={32}height={32} />
                                <p className="contact-inform-p2">Наш сайт: www.softuim.uz </p>
                            </address>
                        </section>
                        <footer className="contact-cyrcle">
                            <Image className="cyrcle" src="/Right 2.png" alt="picture" width={100} height={100}/>
                            <Image className="cyrcle" src="/Right 2.png" alt="picture" width={100}height={100}/>
                            <Image className="cyrcle" src="/Right 2.png" alt="picture"width={100}height={100}/>
                        </footer>
                    </div>
                </div>
            </div>
        </section>
    );
}