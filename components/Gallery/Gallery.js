import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import img1 from "../../public/assets/gallery/g_01.jpg";
import img2 from "../../public/assets/gallery/g_02.jpg";
import img3 from "../../public/assets/gallery/g_03.jpg";
import img4 from "../../public/assets/gallery/g_04.jpg";
import img5 from "../../public/assets/gallery/g_05.jpg";
import img6 from "../../public/assets/gallery/g_06.jpg";
import img7 from "../../public/assets/gallery/g_07.jpg";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  [
    {
      id: 1,
      src: img1,
      alt: "Image 1",
    },
    {
      id: 2,
      src: img2,
      alt: "Image 2",
    },
  ],
  [
    {
      id: 5,
      src: img5,
      alt: "Image 5",
    },
    {
      id: 7,
      src: img7,
      alt: "Image 7",
    },
    {
      id: 6,
      src: img6,
      alt: "Image 6",
    },
  ],
  [
    {
      id: 3,
      src: img3,
      alt: "Image 3",
    },
    {
      id: 4,
      src: img4,
      alt: "Image 4",
    },
  ],
];

export default function Gallery() {
  const sectionsRef = useRef(null);
  const columnsRef = useRef([]);

  useEffect(() => {
    const sections = sectionsRef.current;
    const columns = columnsRef.current;

    const anim = gsap.to(columns, {
      scrollTrigger: {
        trigger: sections,
        scrub: true,
        start: "top center",
        end: "bottom 85%",
      },
      duration: 5,
      stagger: 1,
      yPercent: (pos) => (pos % 2 ? 3 : -3),
    });
    return () => {
      anim.kill();
    };
  }, []);
  return (
    <section ref={sectionsRef} className="section section--columns">
      <div className="columns">
        {images.map((image, index) => (
          <div
            key={index}
            ref={(el) => (columnsRef.current[index] = el)}
            className="column-wrap"
          >
            <div className="column">
              {image.map((img) => (
                <div key={img.id} className="column__item">
                  <Image
                    className="column__item-img"
                    src={img.src}
                    alt={img.alt}
                    width={700}
                    height={700}
                    priority
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
