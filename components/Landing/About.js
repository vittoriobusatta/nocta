import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Arrow } from "utils/icons";
import { gsap } from "gsap";

const images = [];
for (let i = 1; i <= 3; i++) {
  images.push(require(`/public/images/about/a_0${i}.webp`));
}

const texts = [
  "“I wanted to take a piece of that culture that I grew up with, that school of thought, and bring the best to it. With Nocta, we were trying to make the hardest jacket, the hardest tracksuit, the hardest gloves. Just the best of that world.” - DRAKE",
  "NOCTA, a collection for the collective, has arrived. The form fitting apparel nods to sport, but is rooted and inspired by those who roam the streets, who are on the go and want functional, comfortable and elevated every essentials.",
];

const titleTexts = ["A collection for", "the collective"];

function About() {
  const titlesRef = useRef([]);
  const aboutRef = useRef(null);
  const ctaRef = useRef(null);
  const subtitleRef = useRef(null);
  const imagesRef = useRef([]);

  const tl = gsap.timeline({
    defaults: {
      duration: 0.5,
      ease: "power3.inOut",
    },
  });

  useEffect(() => {
    const ctaArray = [
      ctaRef.current.children[0],
      ctaRef.current.children[1].children[0],
    ];
    const title = titlesRef.current;
    const images = imagesRef.current;
    const subtitle = subtitleRef.current;

    tl.set(title, {
      yPercent: 100,
      ease: [0.33, 1, 0.68, 1],
    });
    tl.set(subtitle, {
      yPercent: 100,
      ease: [0.33, 1, 0.68, 1],
    });
    tl.set(ctaArray, {
      yPercent: 150,
      ease: [0.33, 1, 0.68, 1],
    });
    tl.set(images, {
      height: 0,
      ease: [0.33, 1, 0.68, 1],
    });

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const section = aboutRef.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tl.to(subtitle, {
            yPercent: 0,
            ease: [0.33, 1, 0.68, 1],
          });
          tl.to(title, {
            yPercent: 0,
            ease: [0.33, 1, 0.68, 1],
            stagger: 0.2,
          });
          tl.addLabel("start");
          tl.to(
            ctaArray,
            {
              yPercent: 0,
              ease: [0.33, 1, 0.68, 1],
              stagger: 0.2,
            },
            "start"
          );
          tl.to(
            images,
            {
              height: "auto",
              scale: 1,
              ease: [0.33, 1, 0.68, 1],
              stagger: 0.2,
            },
            "start"
          );
        }
      });
    }, options);

    observer.observe(section);

    return () => {
      observer.unobserve(section);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="about" ref={aboutRef}>
      <div className="about__container">
        <div className="about__title">
          <h2>
            <div className="hidden">
              <p ref={subtitleRef}>About us</p>
            </div>
          </h2>
          <h1>
            {titleTexts.map((text, index) => (
              <div className="hidden" key={index}>
                <p ref={(el) => (titlesRef.current[index] = el)}>{text}</p>
              </div>
            ))}
          </h1>
        </div>
        <div className="about__content">
          <div className="div1">
            <Image
              src={images[0]}
              alt="About image 1"
              width={700}
              height={700}
              ref={(el) => (imagesRef.current[0] = el)}
            />
          </div>

          <div className="div2">
            <Image
              src={images[0]}
              alt="About image 1"
              width={700}
              height={700}
              className="div2__left"
              ref={(el) => (imagesRef.current[1] = el)}
            />

            <div className="div2__right">
              <Image
                src={images[1]}
                alt="About image 2"
                width={500}
                height={500}
                ref={(el) => (imagesRef.current[2] = el)}
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
              <Link href="/" className="div4__content hidden" ref={ctaRef}>
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
              ref={(el) => (imagesRef.current[3] = el)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
