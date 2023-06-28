import Image from "next/image";
import React from "react";
import landingCard from "../../public/images/bg_01.webp";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function Landing() {
  const itemRef = useRef(null);
  const itemRefInner = useRef(null);

  useEffect(() => {
    const item = itemRef.current;
    const innerChild = itemRefInner.current.children[0];
    const tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "power3.inOut",
      },
      delay: 1.60,
    });

    gsap.set([item], {
      yPercent: 50,
      startAt: {
        rotation: 0,
      },
      rotation: 7,
      scaleY: 1.2,
      scaleX: 1.2,
    });

    gsap.set([innerChild], {
      yPercent: -50,
      startAt: {
        rotation: 0,
      },
      rotation: -7,
      scaleY: 1.2,
      scaleX: 1.2,
    });

    tl.to(item, {
      yPercent: 0,
      rotation: 0,
      scaleY: 1,
      scaleX: 1,
    });

    tl.to(
      innerChild,
      {
        yPercent: 0,
        rotation: 0,
        scaleY: 1,
        scaleX: 1,
        onComplete: () => {
          itemRefInner.current.classList.add(
            "landing__card__image--animateComplete"
          );
        },
      },
      0
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="landing">
      <div className="landing__background" ref={itemRef}></div>
      <div className="landing__card">
        <div className="landing__card__image" ref={itemRefInner}>
          <Image
            src={landingCard}
            alt="Picture of the author"
            width={800}
            height={800}
            priority
          />
          <div className="landing__card__blur" />
        </div>
      </div>
    </section>
  );
}

export default Landing;
