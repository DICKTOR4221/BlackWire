import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import ParallaxBG from "../components/ParallaxBG.jsx";
import NeonButton from "../components/NeonButton.jsx";

export default function Home() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctasRef = useRef(null);

  useEffect(() => {
    const letters = titleRef.current.querySelectorAll("span");
    gsap.fromTo(
      letters,
      { yPercent: 120, rotate: 8, autoAlpha: 0 },
      { yPercent: 0, rotate: 0, autoAlpha: 1, duration: 0.8, ease: "back.out(1.7)", stagger: 0.04 }
    );
    gsap.fromTo(
      subtitleRef.current,
      { y: 20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, delay: 0.4, duration: 0.6, ease: "power2.out" }
    );
    gsap.fromTo(
      ctasRef.current,
      { y: 20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, delay: 0.6, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  const title = "Wskakuj do Neon Arcade";
  return (
    <section className="pt-28 md:pt-32 pb-16 relative">
      <ParallaxBG />
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 items-center gap-10">
          <div>
            <h1 ref={titleRef} className="font-display text-4xl md:text-6xl leading-tight neon-text">
              {title.split("").map((ch, i) => (
                <span key={i} className="inline-block">{ch === " " ? "\u00A0" : ch}</span>
              ))}
            </h1>
            <p ref={subtitleRef} className="mt-4 md:text-lg opacity-80">
              Futurystyczne mini-gierki, płynne animacje, parallax i neonowy klimat. Grasz?
            </p>
            <div ref={ctasRef} className="mt-8 flex items-center gap-4">
              <Link to="/gry">
                <NeonButton aria-label="Przejdź do gier">🕹️ Zagraj</NeonButton>
              </Link>
              <Link to="/o-nas" className="opacity-80 hover:opacity-100 transition-opacity">
                Dowiedz się więcej →
              </Link>
            </div>
          </div>
          <div className="relative">
            {/* Wizualka hero */}
            <div className="aspect-square w-full glass rounded-3xl p-6 shadow-neon">
              <div className="w-full h-full rounded-2xl bg-[radial-gradient(circle_at_30%_30%,rgba(0,247,255,0.15),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(163,92,255,0.15),transparent_60%)]" />
            </div>
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl bg-neon-cyan/30 blur-md" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-xl bg-neon-purple/30 blur-md" />
          </div>
        </div>
      </div>
    </section>
  );
}