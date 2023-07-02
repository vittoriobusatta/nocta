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

  const { setHeaderColor } = useContext(AppContext);

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((resdata) => setData(shuffleArrayOnce(resdata)))
      .catch((error) => console.log(error));

    setHeaderColor("#111");
  }, []);

  const introGridRef = useRef(null);
  const gridImagesRef = useRef([]);
  const controlsRef = useRef(null);
  const sliderTitleRef = useRef(null);

  const gridImages = gridImagesRef.current;
  const introGrid = introGridRef.current;

  return (
    <section className="showcase">
      <div ref={introGridRef} className="showcase__grid">
        {data.map((item, index) => {
          const { id, src } = item;
          return (
            <div
              key={id}
              className="showcase__images"
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
                  controlsRef,
                  sliderTitleRef
                );
              }}
            >
              <div
                className="showcase__images__background"
                style={{ backgroundImage: `url(/images/products/${src}.png)` }}
              />
            </div>
          );
        })}
      </div>
      <div className="showcase__title" ref={sliderTitleRef}>
        <h3>{data[currentSlide] && data[currentSlide].name}</h3>
      </div>
      <div className="showcase__controls" ref={controlsRef}>
        <button
          className="showcase__controls__close"
          onClick={() => {
            closeSlider(
              currentSlide,
              gridImages,
              introGrid,
              mode,
              setMode,
              setIsAnimating,
              isAnimating,
              controlsRef,
              sliderTitleRef
            );
          }}
        >
          X
        </button>
      </div>
    </section>
  );
}

export default Transition(Showcase);
