import Image from "next/image";
import React, { useContext } from "react";
import landingCard from "../../public/images/landing/l_01.webp";
import { useEffect, useRef } from "react";
import { AppContext } from "context";
import { gsap } from "gsap";
import { landingAnimation, landingObserver } from "utils/animations";

function Landing() {
  const landingRef = useRef(null);
  const itemRef = useRef(null);
  const itemRefInner = useRef(null);

  const {
    setHeaderColor,
    menuIsOpen,
    isLoadingComplete,
    setIsLoadingComplete,
  } = useContext(AppContext);

  useEffect(() => {
    if (!isLoadingComplete) return;
    landingAnimation({
      itemRef,
      itemRefInner,
      setIsLoadingComplete,
    });

    return () => {
      gsap.killTweensOf(itemRef.current);
      gsap.killTweensOf(itemRefInner.current.children[0]);
    };
  }, [isLoadingComplete]);

  useEffect(() => {
    if (menuIsOpen) return;
    const landing = landingRef.current;
    landingObserver({ setHeaderColor, landing });
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
