import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Games from "./pages/Games.jsx";
import Pong from "./pages/games/Pong.jsx";
import Snake from "./pages/games/Snake.jsx";
import TicTacToe from "./pages/games/TicTacToe.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  const location = useLocation();
  const pageRef = useRef(null);
  const overlayRef = useRef(null);

  // Proste przejście między stronami (GSAP overlay + fade content)
  useEffect(() => {
    const tl = gsap.timeline();
    tl.set(overlayRef.current, { xPercent: 100, autoAlpha: 1 })
      .to(overlayRef.current, { xPercent: 0, duration: 0.35, ease: "power2.inOut" })
      .fromTo(
        pageRef.current,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.45, ease: "power2.out" },
        "-=0.1"
      )
      .to(overlayRef.current, { xPercent: -100, duration: 0.45, ease: "power2.inOut" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Overlay do przejść między trasami */}
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,247,255,0.35), rgba(163,92,255,0.35))"
        }}
      />
      <Navbar />
      <main ref={pageRef} className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gry" element={<Games />} />
          {/* Nowe gry? Dodaj Route tutaj i kartę w /pages/Games.jsx */}
          <Route path="/gry/pong" element={<Pong />} />
          <Route path="/gry/snake" element={<Snake />} />
          <Route path="/gry/tictactoe" element={<TicTacToe />} />
          <Route path="/o-nas" element={<About />} />
          <Route path="/kontakt" element={<Contact />} />
          {/* Nowa podstrona? Dodaj ją tutaj i w Navbarze */}
        </Routes>
      </main>
      <footer className="text-center text-sm py-8 opacity-70">
        © {new Date().getFullYear()} Neon Arcade. Wszelkie prawa zastrzeżone.
      </footer>
    </div>
  );
}