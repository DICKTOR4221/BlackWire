import { useEffect, useRef, useState } from "react";

export default function Snake() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    let cols = 24, rows = 16, size = 28;
    let w = (c.width = cols * size);
    let h = (c.height = rows * size);

    const DPR = window.devicePixelRatio || 1;
    c.width = w * DPR; c.height = h * DPR;
    c.style.width = w + "px"; c.style.height = h + "px";
    ctx.scale(DPR, DPR);

    let snake = [{ x: 5, y: 5 }];
    let dir = { x: 1, y: 0 };
    let food = { x: 12, y: 8 };
    let speed = 120; // ms
    let timer = 0;
    let last = 0;
    let alive = true;

    const rndFood = () => {
      food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
    };

    const onKey = (e) => {
      if (e.key === "ArrowUp" && dir.y !== 1) dir = { x: 0, y: -1 };
      if (e.key === "ArrowDown" && dir.y !== -1) dir = { x: 0, y: 1 };
      if (e.key === "ArrowLeft" && dir.x !== 1) dir = { x: -1, y: 0 };
      if (e.key === "ArrowRight" && dir.x !== -1) dir = { x: 1, y: 0 };
    };
    window.addEventListener("keydown", onKey);

    const step = (t) => {
      const dt = t - last;
      last = t;
      timer += dt;
      if (timer > speed && alive) {
        timer = 0;
        const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

        // kolizje
        if (head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows) alive = false;
        if (snake.some((s) => s.x === head.x && s.y === head.y)) alive = false;

        if (!alive) {
          // reset po chwili
          setTimeout(() => {
            snake = [{ x: 5, y: 5 }];
            dir = { x: 1, y: 0 };
            setScore(0);
            alive = true;
          }, 800);
        } else {
          snake.unshift(head);
          if (head.x === food.x && head.y === food.y) {
            setScore((s) => s + 1);
            speed = Math.max(70, speed - 3);
            rndFood();
          } else {
            snake.pop();
          }
        }
      }

      // rysowanie
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.fillRect(0, 0, w, h);

      // siatka neon
      ctx.strokeStyle = "rgba(0,247,255,0.15)";
      for (let i = 0; i <= cols; i++) {
        ctx.beginPath(); ctx.moveTo(i * size, 0); ctx.lineTo(i * size, h); ctx.stroke();
      }
      for (let j = 0; j <= rows; j++) {
        ctx.beginPath(); ctx.moveTo(0, j * size); ctx.lineTo(w, j * size); ctx.stroke();
      }

      // jedzenie
      ctx.fillStyle = "#ff5ac3";
      ctx.fillRect(food.x * size + 4, food.y * size + 4, size - 8, size - 8);

      // wąż
      snake.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? "#00f7ff" : "rgba(61,123,255,0.9)";
        ctx.fillRect(s.x * size + 3, s.y * size + 3, size - 6, size - 6);
      });

      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <section className="pt-28 pb-12">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="font-display text-3xl neon-text">Snake</h2>
        <p className="opacity-80 mt-2">Sterowanie: strzałki. Wynik: {score}</p>
        <div className="glass rounded-2xl p-3 mt-6 overflow-auto">
          <canvas ref={canvasRef} className="rounded-xl block mx-auto" />
        </div>
      </div>
    </section>
  );
}