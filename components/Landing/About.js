import Image from "next/image";
import React from "react";
import aboutImage1 from "public/assets/a_01.webp";
import aboutImage2 from "public/assets/a_02.webp";
import aboutImage3 from "public/assets/a_03.webp";
import Link from "next/link";

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
              src={aboutImage1}
              alt="About image 1"
              width={500}
              height={500}
              priority
            />
          </div>

          <div className="div2">
            <Image
              src={aboutImage2}
              alt="About image 2"
              width={500}
              height={500}
              priority
            />
            <p>
              “I wanted to take a piece of that culture that I grew up with,
              that school of thought, and bring the best to it. With Nocta, we
              were trying to make the hardest jacket, the hardest tracksuit, the
              hardest gloves. Just the best of that world.” <span>- DRAKE</span>
            </p>
          </div>

          <div className="div3">
            <div>
              <p className="div3__description">
                NOCTA, a collection for the collective, has arrived. The form
                fitting apparel nods to sport, but is rooted and inspired by
                those who roam the streets, who are on the go and want
                functional, comfortable and elevated every essentials.
              </p>
              <Link href="/" className="div3__content">
                  <p>
                    More <span>about us</span>
                  </p>
                  <svg
                    width="34"
                    height="11"
                    viewBox="0 0 34 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Group 88">
                      <path
                        id="Vector"
                        d="M23.7757 5.49973L21.707 10.3696L33.2508 5.49973L21.707 0.630592L23.7757 5.49973Z"
                        fill="#505050"
                      />
                      <path
                        id="Vector_2"
                        d="M0.75 5.5L28.7899 5.5"
                        stroke="#505050"
                        strokeWidth="1.20972"
                        strokeMiterlimit="10"
                      />
                    </g>
                  </svg>
              </Link>
            </div>
            <Image
              src={aboutImage3}
              alt="About image 3"
              width={500}
              height={500}
              priority
            />
          </div>
          <div className="div4" />
        </div>
      </div>
    </section>
  );
}

export default About;
