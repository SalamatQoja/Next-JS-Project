"use client";
import Image from "next/image";


export default function Footer() {
  return (
    <footer id="about" className="footer reveal">
      <div className="footer-container">
        <header className="footer-inform reveal">
          <div className="footer-img-size">
            <a className="footer-linkedin" href="https://www.linkedin.com/in/softium-solutions-78065b2b5/">
              <Image src="/icons8-linkedin-circled.png" alt="picture" width={200} height={200} />
            </a>
          </div>
          <p className="footer-p">Отдел продаж</p>
          <p className="footer-p2 ">+998 97 500 05 01</p>
          <p className="footer-p2 r">yahoo@gmail.com</p>
        </header>
        <main className="footer-inform2">
          <p className="footer-inform2-p">© 2025 Easy bonus. Все права защищены.</p>
          <p className="footer-inform3-p">© SOFTIUM 2025.</p>
        </main>
      </div>
    </footer>
  );
}