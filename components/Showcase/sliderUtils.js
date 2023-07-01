import { gsap } from "gsap";
import { Flip } from "gsap/dist/Flip";

gsap.registerPlugin(Flip);

export const showSlider = (
  _,
  index,
  gridImages,
  introGrid,
  mode,
  setMode,
  setIsAnimating,
  isAnimating,
  setCurrentSlide,
  controlsRef
) => {
  if (isAnimating || mode === "slider") return;
  setMode("slider");
  setIsAnimating(true);
  setCurrentSlide(index);

  const controls = controlsRef.current;

  const tl = gsap.timeline({
    defaults: {
      duration: 1,
      ease: "power4.inOut",
    },
    onComplete: () => {
      setIsAnimating(false);
    },
  });

  tl.addLabel("start", 0)
    .add(() => {
      const flipstate = Flip.getState(gridImages);
      introGrid.classList.add("intro-grid--slider");

      gsap.set(introGrid, {
        yPercent: -100 * index,
      });

      Flip.from(flipstate, {
        duration: 1,
        ease: "power4.inOut",
        absolute: true,
        stagger: {
          each: 0.02,
          from: index,
        },
        simple: true,
        prune: true,
      });
    }, "start")
    .add(() => {
      controls.classList.add("controls--open");
    }, "start")
    .fromTo(
      controlsRef.current.children[0],
      {
        scale: 0,
      },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.02,
      },
      "start"
    );
};

export const closeSlider = (
  current,
  gridImages,
  introGrid,
  mode,
  setMode,
  setIsAnimating,
  isAnimating,
  controlsRef
) => {
  if (isAnimating || mode === "grid") return;
  setMode("grid");
  setIsAnimating(true);

  const controls = controlsRef.current;

  const tl = gsap.timeline({
    defaults: {
      duration: 1,
      ease: "power4.inOut",
    },
    onComplete: () => {
      setIsAnimating(false);
    },
  });
  tl.add(() => {
    const flipstate = Flip.getState(gridImages, { props: "filter" });
    introGrid.classList.remove("intro-grid--slider");
    gsap.set(introGrid, {
      yPercent: 0,
    });
    Flip.from(flipstate, {
      duration: 1,
      ease: "power4.inOut",
      absolute: true,
      stagger: {
        each: 0.02,
        from: current,
      },
      simple: true,
      prune: true,
    });
  }, "start")
    .to(
      controlsRef.current.children[0],
      {
        opacity: 0,
        scale: 0,
      },
      "start"
    )
    .add(() => {
      controls.classList.remove("controls--open");
    }, "start");
};
