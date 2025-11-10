import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ParallaxBG() {
  const wrap = useRef(null);

  useEffect(() => {
    const el = wrap.current;
    const blb = el.querySelectorAll(".blob");

    // delikatne pulsowanie blobów
    blb.forEach((b, i) => {
      gsap.to(b, {
        x: `+=${(i % 2 === 0 ? 1 : -1) * 20}`,
        y: `+=${(i % 2 === 0 ? -1 : 1) * 20}`,
        filter: "blur(28px)",
        duration: 6 + i,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    });

    const onMouse = (e) => {
      const { innerWidth, innerHeight } = window;
      const rx = (e.clientX / innerWidth - 0.5) * 10;
      const ry = (e.clientY / innerHeight - 0.5) * 10;
      gsap.to(el, { rotateX: -ry, rotateY: rx, duration: 0.6, transformPerspective: 800 });
      gsap.to(el, { x: rx * 2, y: ry * 2, duration: 0.6, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0 -z-10 overflow-hidden">
      <div className="blob absolute -top-24 -left-24 w-96 h-96 rounded-full bg-neon-cyan/25 blur-2xl mix-blend-screen" />
      <div className="blob absolute top-1/3 -right-24 w-[30rem] h-[30rem] rounded-full bg-neon-purple/25 blur-2xl mix-blend-screen" />
      <div className="blob absolute bottom-0 left-1/4 w-[28rem] h-[28rem] rounded-full bg-neon-pink/25 blur-2xl mix-blend-screen" />
      <div className="blob absolute -bottom-24 right-1/3 w-96 h-96 rounded-full bg-neon-blue/25 blur-2xl mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_60%)]" />
    </div>
  );
}