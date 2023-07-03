import Image from "next/image";
import React, { useContext } from "react";
import landingCard from "../../public/images/landing/l_01.webp";
import { useEffect, useRef } from "react";
import { AppContext } from "context";
import { gsap } from "gsap";

function Landing() {
  const landingRef = useRef(null);
  const itemRef = useRef(null);
  const itemRefInner = useRef(null);

  const { setHeaderColor, menuIsOpen } = useContext(AppContext);

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

  useEffect(() => {
    if (menuIsOpen) return;
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.07,
    };

    const landing = landingRef.current;

    const observer = new IntersectionObserver((entries) => {
      const isIntersecting = entries.some((entry) => entry.isIntersecting);
      if (isIntersecting) {
        setHeaderColor("white");
      } else {
        setHeaderColor("black");
      }
    }, options);

    observer.observe(landing);

    return () => {
      observer.unobserve(landing);
    };
  }, [menuIsOpen]);

  return (
    <section className="landing" ref={landingRef}>
      <div className="landing__background" ref={itemRef}></div>
      <div className="landing__card">
        <div className="landing__card__image" ref={itemRefInner}>
          <Image
            src={landingCard}
            alt="Landing Image"
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
