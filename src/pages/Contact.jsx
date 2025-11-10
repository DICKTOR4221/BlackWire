import { useState, useRef } from "react";
import { gsap } from "gsap";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const planeRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Wpisz imię";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Podaj poprawny email";
    if (!form.message.trim() || form.message.length < 10) e.message = "Wiadomość min. 10 znaków";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    // animacja "wysyłania"
    gsap.fromTo(
      planeRef.current,
      { x: 0, y: 0, rotate: 0, autoAlpha: 1 },
      { x: 140, y: -80, rotate: -18, duration: 0.8, ease: "power2.in" }
    );

    await new Promise((r) => setTimeout(r, 1000)); // symulacja API
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    gsap.to(planeRef.current, { autoAlpha: 0 });
  };

  return (
    <section className="pt-28 pb-16">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="font-display text-3xl md:text-4xl neon-text">📩 Kontakt</h2>
        <p className="opacity-80 mt-2">Masz pomysł na grę? Napisz do nas!</p>

        <form
          onSubmit={submit}
          className="mt-8 glass rounded-2xl p-6 grid gap-4"
          name="contact"
          method="POST"
          data-netlify="true"
        >
          {/* Netlify form hidden input */}
          <input type="hidden" name="form-name" value="contact" />

          <div>
            <label className="block text-sm opacity-80">Imię</label>
            <input
              className="mt-1 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-neon-cyan"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              name="name"
              placeholder="Twoje imię"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm opacity-80">Email</label>
            <input
              className="mt-1 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-neon-cyan"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              name="email"
              placeholder="email@przyklad.pl"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm opacity-80">Wiadomość</label>
            <textarea
              rows="5"
              className="mt-1 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-neon-cyan resize-y"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              name="message"
              placeholder="Napisz kilka zdań..."
            />
            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              Wyślij
            </button>
            <div ref={planeRef} aria-hidden className="select-none">
              ✈️
            </div>
            {sent && <div className="text-neon-cyan">Dzięki! Odezwiemy się ✨</div>}
          </div>

          <p className="text-xs opacity-60">
            Uwaga: formularz jest gotowy do Netlify (data-netlify). Możesz też podpiąć własne API.
          </p>
        </form>
      </div>
    </section>
  );
}