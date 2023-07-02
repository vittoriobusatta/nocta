import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Arrow } from "utils/icons";

const images = [];
for (let i = 1; i <= 3; i++) {
  images.push(require(`@/public/images/about/a_0${i}.webp`));
}

const texts = [
  "“I wanted to take a piece of that culture that I grew up with, that school of thought, and bring the best to it. With Nocta, we were trying to make the hardest jacket, the hardest tracksuit, the hardest gloves. Just the best of that world.” - DRAKE",
  "NOCTA, a collection for the collective, has arrived. The form fitting apparel nods to sport, but is rooted and inspired by those who roam the streets, who are on the go and want functional, comfortable and elevated every essentials.",
];

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__title">
          <h2>About us</h2>
          <h1>
            <span>A collection for</span>
            <span>the collective</span>
          </h1>
        </div>
        <div className="about__content">
          <div className="div1">
            <Image
              src={images[0]}
              alt="About image 1"
              width={700}
              height={700}
              priority
            />
          </div>

          <div className="div2">
            <Image
              src={images[0]}
              alt="About image 1"
              width={700}
              height={700}
              className="div2__left"
            />

            <div className="div2__right">
              <Image
                src={images[1]}
                alt="About image 2"
                width={500}
                height={500}
              />
              <p className="div2__text paragraph">{texts[0]}</p>
            </div>
          </div>

          <p className="div5 paragraph">{texts[0]}</p>

          <div className="div3">
            <div className="div3__bar" />
          </div>

          <div className="div4">
            <div>
              <p className="div4__description paragraph">{texts[1]}</p>
              <Link href="/" className="div4__content">
                <p>
                  More <span>about us</span>
                </p>
                <Arrow />
              </Link>
            </div>
            <Image
              src={images[2]}
              alt="About image 3"
              width={700}
              height={700}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
