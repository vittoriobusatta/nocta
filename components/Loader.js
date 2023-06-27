import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

function Loader() {
  const loaderRef = useRef(null);
  

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "power3.inOut",
      },
    });

    gsap.set(loaderRef.current, {
      yPercent: 0,
      rotation: 0,
      scaleY: 1,
      scaleX: 1,
    });
    tl.to(loaderRef.current, {
      yPercent: -100,
      rotation: 0,
      scaleY: 1,
      scaleX: 1,
    });
  }, []);

  return <section className="loader" ref={loaderRef}></section>;
}

export default Loader;
