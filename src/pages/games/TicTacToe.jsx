import { useState } from "react";

const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

export default function TicTacToe() {
  const [b, setB] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [win, setWin] = useState(null);

  const click = (i) => {
    if (b[i] || win) return;
    const nb = b.slice();
    nb[i] = xTurn ? "X" : "O";
    setB(nb);
    const w = checkWin(nb);
    if (w) setWin(w);
    else setXTurn(!xTurn);
  };

  const checkWin = (arr) => {
    for (const [a, c, d] of wins) {
      if (arr[a] && arr[a] === arr[c] && arr[a] === arr[d]) return { line:[a,c,d], who: arr[a] };
    }
    if (arr.every(Boolean)) return { line: [], who: "Remis" };
    return null;
  };

  const reset = () => { setB(Array(9).fill(null)); setXTurn(true); setWin(null); };

  return (
    <section className="pt-28 pb-12">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="font-display text-3xl neon-text">Tic Tac Toe</h2>
        <p className="opacity-80 mt-2">{win ? (win.who === "Remis" ? "Remis!" : `Wygrywa: ${win.who}`) : `Tura: ${xTurn ? "X" : "O"}`}</p>
        <div className="grid grid-cols-3 gap-3 max-w-sm mt-6">
          {b.map((v, i) => {
            const highlight = win?.line.includes(i);
            return (
              <button
                key={i}
                onClick={() => click(i)}
                className={`aspect-square text-4xl font-bold rounded-2xl glass hover:shadow-neon transition-all
                ${highlight ? "outline outline-2 outline-neon-cyan shadow-neon" : ""}`}
              >
                <span className={v ? "neon-text" : "opacity-40"}>{v || "•"}</span>
              </button>
            );
          })}
        </div>
        <button onClick={reset} className="mt-6 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10">Reset</button>
      </div>
    </section>
  );
}