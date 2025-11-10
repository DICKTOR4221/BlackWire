import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const bar = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Subtelna animacja paska na starcie
    gsap.fromTo(
      bar.current,
      { y: -40, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    setOpen(false); // zamknij mobilne menu po zmianie trasy
  }, [location.pathname]);

  const baseClasses =
    "px-4 py-2 rounded-md transition-colors hover:text-neon-cyan";
  const active = "text-neon-cyan";

  return (
    <header ref={bar} className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mt-4 glass rounded-2xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex gap-2 items-center">
            <div className="w-8 h-8 rounded-full bg-neon-cyan blur-sm opacity-70" />
            <span className="font-display text-xl neon-text">Neon Arcade</span>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={({ isActive }) => baseClasses + (isActive ? ` ${active}` : "")}>Strona główna</NavLink>
            <NavLink to="/gry" className={({ isActive }) => baseClasses + (isActive ? ` ${active}` : "")}>Gry</NavLink>
            <NavLink to="/o-nas" className={({ isActive }) => baseClasses + (isActive ? ` ${active}` : "")}>O nas</NavLink>
            <NavLink to="/kontakt" className={({ isActive }) => baseClasses + (isActive ? ` ${active}` : "")}>Kontakt</NavLink>
          </nav>
          <button
            aria-label="Otwórz menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/5"
          >
            <span className="i">≡</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mx-auto max-w-7xl px-4">
          <div className="glass rounded-2xl px-4 py-3 mt-2">
            <nav className="flex flex-col">
              <NavLink to="/" className="px-3 py-2 rounded hover:bg-white/5">Strona główna</NavLink>
              <NavLink to="/gry" className="px-3 py-2 rounded hover:bg-white/5">Gry</NavLink>
              <NavLink to="/o-nas" className="px-3 py-2 rounded hover:bg-white/5">O nas</NavLink>
              <NavLink to="/kontakt" className="px-3 py-2 rounded hover:bg-white/5">Kontakt</NavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}