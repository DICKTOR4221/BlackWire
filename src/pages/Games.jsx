import { Link } from "react-router-dom";

const games = [
  {
    slug: "pong",
    title: "Pong (Canvas)",
    desc: "Klasyk z AI przeciwnikiem. Sterowanie: ↑ ↓ lub mysz.",
    color: "from-neon-cyan/30 to-neon-purple/30"
  },
  {
    slug: "snake",
    title: "Snake (Canvas)",
    desc: "Zbieraj jedzenie, unikaj ścian. Sterowanie: strzałki.",
    color: "from-neon-pink/30 to-neon-blue/30"
  },
  {
    slug: "tictactoe",
    title: "Tic Tac Toe",
    desc: "Szybka partyjka X/O z animacją wygranej.",
    color: "from-neon-blue/30 to-neon-cyan/30"
  }
  // Nowa gra? Dodaj obiekt { slug, title, desc, color } i stwórz trasę + komponent w /pages/games/
];

export default function Games() {
  return (
    <section className="pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="font-display text-3xl md:text-4xl neon-text">🕹️ Gry</h2>
        <p className="opacity-80 mt-2">Kliknij, aby zagrać. Wszystkie działają w przeglądarce.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {games.map((g) => (
            <Link
              key={g.slug}
              to={`/gry/${g.slug}`}
              className={`group relative rounded-2xl p-5 glass hover:shadow-neon transition-shadow`}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${g.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative">
                <h3 className="font-semibold text-xl">{g.title}</h3>
                <p className="opacity-80 mt-2">{g.desc}</p>
                <div className="mt-4 text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                  Zagraj →
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-sm opacity-70">
          Chcesz dodać swoją gierkę? Dodaj plik w /src/pages/games/ i wpis w tablicy powyżej.
        </div>
      </div>
    </section>
  );
}