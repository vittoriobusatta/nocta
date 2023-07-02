import Image from "next/image";
import React, { useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { AppContext } from "context";

gsap.registerPlugin(ScrollTrigger);

const image = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1,
  src: require(`@/public/images/gallery/g_0${i + 1}.jpg`),
  alt: `Image ${i + 1}`,
}));

const images = [image.slice(0, 2), image.slice(2, 5), image.slice(5, 7)];

export default function Gallery() {
  const galleryRef = useRef(null);
  const WrapRef = useRef([]);
  const columnsRef = useRef([]);

  const { headerRef } = useContext(AppContext);

  useEffect(() => {
    const gallery = galleryRef.current;
    const wrap = WrapRef.current;
    const columns = columnsRef.current;

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
          columns,
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
              ref={(el) => (columnsRef.current[index] = el)}
            >
              {image.map((img) => {
                const { id, src, alt } = img;
                return (
                  <div key={id} className="gallery__item">
                    <Image
                      src={src}
                      alt={alt}
                      width={900}
                      height={900}
                      priority
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
