import React, { useEffect, useRef, useState } from "react";
import { closeSlider, showSlider } from "./sliderUtils";

function Showcase() {
  const [data, setData] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mode, setMode] = useState("grid");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderOpen, setSliderOpen] = useState(false);

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((resdata) => setData(resdata))
      .catch((error) => console.log(error));
  }, []);

  const introGridRef = useRef(null);
  const gridImagesRef = useRef([]);
  const controlsRef = useRef(null);

  const gridImages = gridImagesRef.current;
  const introGrid = introGridRef.current;

  return (
    <>
      <section ref={introGridRef} className="intro-grid intro-grid--images">
        {data.map((item, index) => {
          const { id, src } = item;
          return (
            <div
              key={id}
              className={`intro-grid__img intro-grid__img--${id}
              `}
              ref={(el) => (gridImagesRef.current[index] = el)}
              onClick={() => {
                showSlider(
                  item,
                  index,
                  gridImages,
                  introGrid,
                  mode,
                  setMode,
                  setIsAnimating,
                  isAnimating,
                  setCurrentSlide,
                  controlsRef
                );
              }}
            >
              <div
                className="intro-grid__img__content"
                style={{
                  backgroundImage: `url(/assets/products/${src}.png)`,
                  height: "100%",
                  width: "100%",
                  backgroundPosition: "50% 20%",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              >
                {/* <p>{id}</p> */}
              </div>
            </div>
          );
        })}
      </section>
      {/* <div class="intro-title">
        <h2 class="intro-title__main oh">
          <span class="oh__inner">Nale Aby</span>
        </h2>
        <span class="intro-title__sub oh">
          <span class="oh__inner">Prompt Fashion</span>
        </span>
      </div>
      <div class="slider-title">
        <h3 class="slider-title__main oh">
          <span class="oh__inner">Collection</span>
        </h3>
        <p class="slider-title__desc">
          The collection is a celebration of beauty, sustainability, and ethical
          production.
        </p>
      </div> */}
      <div class="controls" ref={controlsRef}>
        <button
          class="unbutton close"
          onClick={() => {
            closeSlider(
              currentSlide,
              gridImages,
              introGrid,
              mode,
              setMode,
              setIsAnimating,
              isAnimating,
              setSliderOpen,
              controlsRef
            );
          }}
        >
          X
        </button>
      </div>
    </>
  );
}

export default Showcase;
