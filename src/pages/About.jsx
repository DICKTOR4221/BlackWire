const TEAM = [
  { name: "Alex", role: "Frontend", color: "from-neon-cyan to-neon-purple" },
  { name: "Maya", role: "UI/UX", color: "from-neon-pink to-neon-blue" },
  { name: "Leo", role: "Game Dev", color: "from-neon-blue to-neon-cyan" }
  // Nowa osoba? Dodaj wpis powyżej.
];

export default function About() {
  return (
    <section className="pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="font-display text-3xl md:text-4xl neon-text">👤 O nas</h2>
        <p className="opacity-80 mt-2">Mały zespół, dużo błysku i jeszcze więcej frajdy.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {TEAM.map((p) => (
            <div key={p.name} className="group relative rounded-2xl p-5 glass hover:shadow-neon transition-shadow overflow-hidden">
              <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity`} />
              <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-white/10 mb-4 ring-1 ring-white/10 group-hover:scale-105 transition-transform" />
                <h3 className="font-semibold text-xl">{p.name}</h3>
                <p className="opacity-80">{p.role}</p>
                <div className="mt-3 flex gap-3 text-sm opacity-70 group-hover:opacity-100 transition-opacity">
                  <a href="#" className="hover:text-neon-cyan">GitHub</a>
                  <a href="#" className="hover:text-neon-cyan">LinkedIn</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-sm opacity-70">
          Chcesz dodać podstronę? Stwórz komponent w /src/pages/ i dodaj Route w App.jsx + link w Navbarze.
        </div>
      </div>
    </section>
  );
}