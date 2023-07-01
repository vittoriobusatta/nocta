import React, { useContext, useEffect, useRef, useState } from "react";
import { closeSlider, showSlider } from "./sliderUtils";
import { AppContext } from "context";
import Transition from "utils/transitions";

function shuffleArrayOnce(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function Showcase() {
  const [data, setData] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mode, setMode] = useState("grid");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderOpen, setSliderOpen] = useState(false);

  const { setHeaderColor } = useContext(AppContext);

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((resdata) => setData(
        shuffleArrayOnce(resdata)
      ))
      .catch((error) => console.log(error));

    setHeaderColor("#111");
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
      {/* <div className="intro-title">
        <h2 className="intro-title__main oh">
          <span className="oh__inner">Nale Aby</span>
        </h2>
        <span className="intro-title__sub oh">
          <span className="oh__inner">Prompt Fashion</span>
        </span>
      </div>
      <div className="slider-title">
        <h3 className="slider-title__main oh">
          <span className="oh__inner">Collection</span>
        </h3>
        <p className="slider-title__desc">
          The collection is a celebration of beauty, sustainability, and ethical
          production.
        </p>
      </div> */}
      <div className="controls" ref={controlsRef}>
        <button
          className="unbutton close"
          onClick={() => {
            closeSlider(
              currentSlide,
              gridImages,
              introGrid,
              mode,
              setMode,
              setIsAnimating,
              isAnimating,
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

export default Transition(Showcase);
