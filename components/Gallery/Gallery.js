import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const image = [];

for (let i = 1; i <= 7; i++) {
  image.push(require(`../../public/images/gallery/g_0${i}.jpg`));
}

const images = [
  [
    {
      id: 1,
      src: image[0],
      alt: "Image 1",
    },
    {
      id: 2,
      src: image[1],
      alt: "Image 2",
    },
  ],
  [
    {
      id: 5,
      src: image[4],
      alt: "Image 5",
    },
    {
      id: 7,
      src: image[6],
      alt: "Image 7",
    },
    {
      id: 6,
      src: image[5],
      alt: "Image 6",
    },
  ],
  [
    {
      id: 3,
      src: image[2],
      alt: "Image 3",
    },
    {
      id: 4,
      src: image[3],
      alt: "Image 4",
    },
  ],
];

export default function Gallery() {
  console.log(images);
  const galleryRef = useRef(null);
  const WrapRef = useRef([]);
  const columnsInnerRef = useRef([]);

  useEffect(() => {
    const gallery = galleryRef.current;
    const wrap = WrapRef.current;
    const columnsInner = columnsInnerRef.current;

    const scroll = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: gallery,
          scrub: true,
          start: "top bottom",
          end: "bottom top",
        },
      });

      tl.addLabel("start", 0)
        .to(
          wrap,
          {
            ease: "none",
            yPercent: (pos) => (pos % 2 ? 3 : -3),
          },
          "start"
        )
        .to(
          columnsInner,
          {
            ease: "none",
            startAt: { scale: 1.2 },
            scale: 1,
          },
          "start"
        );
    };

    scroll();
  }, []);

  return (
    <section ref={galleryRef} className="gallery">
      <div className="gallery__columns">
        {images.map((image, index) => (
          <div
            key={index}
            ref={(el) => (WrapRef.current[index] = el)}
            className="gallery__wrap"
          >
            <div
              className="gallery__wrap__column"
              ref={(el) => (columnsInnerRef.current[index] = el)}
            >
              {image.map((img) => (
                <div key={img.id} className="gallery__item">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={900}
                    height={900}
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
