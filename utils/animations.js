import { gsap } from "gsap";

export const menuAnimation = ({
  menuIsOpen,
  menuRef,
  itemsRef,
  imagesRef,
  quoteRef,
}) => {
  const tl = gsap.timeline({
    defaults: {
      duration: 0.5,
      ease: "power3.inOut",
    },
  });

  if (menuIsOpen) {
    tl.to(menuRef.current, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      ease: [0.76, 0, 0.24, 1],
    })
      .fromTo(
        itemsRef.current,
        {
          duration: 1,
          yPercent: 100,
          ease: [0.76, 0, 0.24, 1],
        },
        {
          yPercent: 0,
          stagger: 0.15,
        }
      )
      .fromTo(
        imagesRef.current,
        {
          height: 0,
          scale: 0.5,
        },
        {
          height: "auto",
          stagger: 0.1,
          scale: 1,
        },
        "-=0.6"
      )
      .fromTo(
        quoteRef.current,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
        }
      );
  } else {
    tl.to(menuRef.current, {
      clipPath: "polygon(0 0, 0% 0, 0% 100%, 0% 100%)",
    });
  }

  return tl;
};

export const loaderAnimation = async ({
  loaderRef,
  overlayRef,
  logoPathRef,
  setIsLoadingComplete,
}) => {
  const tl = gsap.timeline({
    defaults: {
      ease: "power3.inOut",
    },
    onComplete: () => {
      setIsLoadingComplete(true);
    },
  });

  gsap.set(loaderRef.current, {
    yPercent: -100,
    rotation: 0,
    scaleY: 1,
    scaleX: 1,
    duration: 1,
  });

  gsap.set(overlayRef.current, {
    yPercent: 100,
    rotation: 0,
    scaleY: 1,
    scaleX: 1,
    duration: 1,
  });

  gsap.set(logoPathRef.current, {
    yPercent: 130,
    rotation: 0,
  });

  gsap.to(loaderRef.current, {
    yPercent: 0,
    rotation: 0,
    scaleY: 1,
    scaleX: 1,
    duration: 0.5,
    delay: 0,
  });

  gsap.to(logoPathRef.current, {
    yPercent: 0,
    rotation: 0,
    duration: 0.4,
    ease: [0.22, 1, 0.36, 1],
    stagger: 0.15,
    delay: 0.5,
  });

  tl.to(overlayRef.current, {
    yPercent: 0,
    rotation: 0,
    delay: 1.5,
  });

  tl.to(
    loaderRef.current,
    {
      yPercent: -100,
      rotation: 0,
      scaleY: 1,
      scaleX: 1,
    },
    "-=0.1"
  );
};

export const landingAnimation = ({
  itemRef,
  itemRefInner,
  setIsLoadingComplete,
}) => {
  const item = itemRef.current;
  const innerChild = itemRefInner.current.children[0];
  const tl = gsap.timeline({
    defaults: {
      duration: 1,
      ease: "power3.inOut",
    },
    delay: 1.6,
    onComplete: () => {
      setIsLoadingComplete(false);
    },
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
};

export const landingObserver = ({ setHeaderColor, landing }) => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.07,
  };

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
};
