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
  controlsRef,
  sliderTitleRef
) => {
  if (isAnimating || mode === "slider") return;
  setMode("slider");
  setIsAnimating(true);
  setCurrentSlide(index);

  const controls = controlsRef.current;
  const sliderTitle = {
    el: sliderTitleRef.current,
    main: sliderTitleRef.current.children[0],
  };

  gsap
    .timeline({
      defaults: {
        duration: 1,
        ease: "power4.inOut",
      },
      onComplete: () => {
        setIsAnimating(false);
      },
    })

    .addLabel("start", 0)
    .add(() => {
      const flipstate = Flip.getState(gridImages);
      introGrid.classList.add("showcase__slider");

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
    .set(
      sliderTitle.el,
      {
        opacity: 1,
      },
      "start"
    )
    .fromTo(
      [sliderTitle.main, sliderTitle.desc],
      {
        yPercent: (pos) => (pos ? 240 : 100),
        opacity: (pos) => (pos ? 0 : 1),
      },
      {
        yPercent: 0,
        opacity: 1,
      },
      "start"
    )
    .add(() => {
      controls.classList.add("showcase__controls--open");
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
  controlsRef,
  sliderTitleRef
) => {
  if (isAnimating || mode === "grid") return;
  setMode("grid");
  setIsAnimating(true);

  const controls = controlsRef.current;

  const sliderTitle = {
    el: sliderTitleRef.current,
    main: sliderTitleRef.current.children[0],
  };

  gsap
    .timeline({
      defaults: {
        duration: 1,
        ease: "power4.inOut",
      },
      onComplete: () => {
        setIsAnimating(false);
      },
    })
    .to(
      controlsRef.current.children[0],
      {
        opacity: 0,
        scale: 0,
      },
      "start"
    )
    .add(() => {
      controls.classList.remove("showcase__controls--open");
    }, "start")
    .to(
      sliderTitle.main,
      {
        yPercent: (pos) => (pos ? 150 : 100),
        opacity: (pos) => (pos ? 0 : 1),
        onComplete: () => gsap.set(sliderTitle.el, { opacity: 0 }),
      },
      "start"
    )
    .add(() => {
      const flipstate = Flip.getState(gridImages, { props: "filter" });
      introGrid.classList.remove("showcase__slider");
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
    }, "start");
};
