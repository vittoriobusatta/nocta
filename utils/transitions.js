import React from "react";
import { motion } from "framer-motion";

function Transition(Component) {
  return function TransitionComponent(props) {
   
    return (
      <>
        <Component {...props} />

      </>
    );
  };
}

export default Transition;
