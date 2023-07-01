import React, { useEffect } from "react";
import "../sass/styles.scss";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Lenis from "@studio-freight/lenis";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    window.console.log.apply(console, [
      "\n %c Made with ❤️ by Vittorio Busatta %c https://vittoriobusatta.fr/",
      "border: 1px solid #DBD8D8;color: #3C3C3C; background: #DBD8D8; padding:5px 0;",
      "color: #fff; background: #3C3C3C; padding:5px 0;border: 1px solid #3C3C3C;",
    ]);
  }, []);

  if (typeof window !== "undefined") {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }
  return (
    <>
      <Layout>
        <Component {...pageProps} key={router.asPath} />
      </Layout>
    </>
  );
}

export default MyApp;
