import Image from "next/image";
import React, { useContext } from "react";
import landingCard from "../../public/images/landing/l_01.webp";
import { useEffect, useRef } from "react";
import { AppContext } from "context";

function Landing() {
  const landingRef = useRef(null);
  const itemRef = useRef(null);
  const itemRefInner = useRef(null);

  const { headerRef } = useContext(AppContext);

  // useEffect(() => {
  //   const item = itemRef.current;
  //   const innerChild = itemRefInner.current.children[0];
  //   const tl = gsap.timeline({
  //     defaults: {
  //       duration: 1,
  //       ease: "power3.inOut",
  //     },
  //     delay: 1.60,
  //   });

  //   gsap.set([item], {
  //     yPercent: 50,
  //     startAt: {
  //       rotation: 0,
  //     },
  //     rotation: 7,
  //     scaleY: 1.2,
  //     scaleX: 1.2,
  //   });

  //   gsap.set([innerChild], {
  //     yPercent: -50,
  //     startAt: {
  //       rotation: 0,
  //     },
  //     rotation: -7,
  //     scaleY: 1.2,
  //     scaleX: 1.2,
  //   });

  //   tl.to(item, {
  //     yPercent: 0,
  //     rotation: 0,
  //     scaleY: 1,
  //     scaleX: 1,
  //   });

  //   tl.to(
  //     innerChild,
  //     {
  //       yPercent: 0,
  //       rotation: 0,
  //       scaleY: 1,
  //       scaleX: 1,
  //       onComplete: () => {
  //         itemRefInner.current.classList.add(
  //           "landing__card__image--animateComplete"
  //         );
  //       },
  //     },
  //     0
  //   );

  //   return () => {
  //     tl.kill();
  //   };
  // }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.07,
    };

    const header = headerRef.current;
    const landing = landingRef.current;
    const blackLogo = header?.children[0]?.children[0]?.children[0];
    const whiteLogo = header?.children[0]?.children[0]?.children[1];

    const observer = new IntersectionObserver((entries) => {
      const isIntersecting = entries.some((entry) => entry.isIntersecting);
      if (blackLogo && whiteLogo) {
        // If the header is not intersecting with the viewport
        if (!isIntersecting) {
          blackLogo.classList.add("header__logo--black");
          header.classList.add("header--black");
        } else {
          blackLogo.classList.remove("header__logo--black");
          header.classList.remove("header--black");
        }
      }
    }, options);

    if (landing && header) {
      observer.observe(landing);
      observer.observe(header);
    }

    return () => {
      if (landing && header) {
        observer.unobserve(landing);
        observer.unobserve(header);
      }
    };
  }, [headerRef]);

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
