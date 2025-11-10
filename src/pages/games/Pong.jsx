import { useEffect, useRef, useState } from "react";

export default function Pong() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const [score, setScore] = useState({ p: 0, ai: 0 });

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    let w = (c.width = Math.min(900, window.innerWidth - 32));
    let h = (c.height = Math.round(w * 0.56));

    const DPR = window.devicePixelRatio || 1;
    c.width = w * DPR;
    c.height = h * DPR;
    c.style.width = w + "px";
    c.style.height = h + "px";
    ctx.scale(DPR, DPR);

    const PADDLE_H = 80;
    const PADDLE_W = 12;
    const BALL_R = 7;

    const player = { x: 20, y: h / 2 - PADDLE_H / 2, vy: 0 };
    const ai = { x: w - 20 - PADDLE_W, y: h / 2 - PADDLE_H / 2, vy: 0 };
    const ball = { x: w / 2, y: h / 2, vx: 4, vy: 2 };

    let keys = {};
    const onKey = (e) => {
      keys[e.key] = e.type === "keydown";
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);

    const onMouse = (e) => {
      const rect = c.getBoundingClientRect();
      const my = e.clientY - rect.top;
      player.y = my - PADDLE_H / 2;
    };
    c.addEventListener("mousemove", onMouse);

    const resetBall = (dir = 1) => {
      ball.x = w / 2; ball.y = h / 2;
      ball.vx = 4 * dir; ball.vy = (Math.random() * 3 + 1) * (Math.random() > 0.5 ? 1 : -1);
    };

    const loop = () => {
      // update
      if (keys["ArrowUp"]) player.y -= 6;
      if (keys["ArrowDown"]) player.y += 6;
      player.y = Math.max(0, Math.min(h - PADDLE_H, player.y));

      // AI proste: podążaj za piłką
      const target = ball.y - PADDLE_H / 2;
      ai.y += (target - ai.y) * 0.08;
      ai.y = Math.max(0, Math.min(h - PADDLE_H, ai.y));

      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.y < BALL_R || ball.y > h - BALL_R) ball.vy *= -1;

      // kolizje paletek
      const hitPlayer =
        ball.x - BALL_R < player.x + PADDLE_W &&
        ball.y > player.y &&
        ball.y < player.y + PADDLE_H;

      const hitAI =
        ball.x + BALL_R > ai.x &&
        ball.y > ai.y &&
        ball.y < ai.y + PADDLE_H;

      if (hitPlayer) {
        ball.vx = Math.abs(ball.vx) + 0.3;
        ball.vx *= 1;
      }
      if (hitAI) {
        ball.vx = -Math.abs(ball.vx) - 0.3;
      }

      // punktacja
      if (ball.x < 0) {
        setScore((s) => ({ ...s, ai: s.ai + 1 }));
        resetBall(1);
      }
      if (ball.x > w) {
        setScore((s) => ({ ...s, p: s.p + 1 }));
        resetBall(-1);
      }

      // draw
      ctx.clearRect(0, 0, w, h);
      // tło
      const grd = ctx.createLinearGradient(0, 0, w, h);
      grd.addColorStop(0, "rgba(0,247,255,0.12)");
      grd.addColorStop(1, "rgba(163,92,255,0.12)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      // siatka
      ctx.setLineDash([6, 10]);
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.stroke();
      ctx.setLineDash([]);

      // paletki
      ctx.fillStyle = "#00f7ff";
      ctx.fillRect(player.x, player.y, PADDLE_W, PADDLE_H);
      ctx.fillStyle = "#a45cff";
      ctx.fillRect(ai.x, ai.y, PADDLE_W, PADDLE_H);

      // piłka
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, BALL_R, 0, Math.PI * 2);
      ctx.fill();

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    const onResize = () => {
      let newW = Math.min(900, window.innerWidth - 32);
      let newH = Math.round(newW * 0.56);
      w = newW; h = newH;
      const DPR2 = window.devicePixelRatio || 1;
      c.width = w * DPR2; c.height = h * DPR2;
      c.style.width = w + "px"; c.style.height = h + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(DPR2, DPR2);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
      c.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="pt-28 pb-12">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="font-display text-3xl neon-text">Pong</h2>
        <p className="opacity-80 mt-2">Sterowanie: ↑ ↓ lub mysz. Wynik: Ty {score.p} : {score.ai} AI</p>
        <div className="glass rounded-2xl p-3 mt-6">
          <canvas ref={canvasRef} className="rounded-xl w-full h-auto block" />
        </div>
      </div>
    </section>
  );
}