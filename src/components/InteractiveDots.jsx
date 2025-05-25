import { useEffect } from 'react';
import gsap from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import './InteractiveDots.css';

gsap.registerPlugin(InertiaPlugin);

const InteractiveDots = () => {
  useEffect(() => {
    const initGlowingInteractiveDotsGrid = () => {
      const container = document.querySelector('[data-dots-container-init]');
      if (!container) return;

      const colors = { base: "#1a1a1a", active: "#ffffff" }; // Changed to black and white theme
      const threshold = 150;
      const speedThreshold = 100;
      const shockRadius = 250;
      const shockPower = 5;
      const maxSpeed = 5000;

      let dots = [];
      let dotCenters = [];

      function buildGrid() {
        container.innerHTML = "";
        dots = [];
        dotCenters = [];

        const style = getComputedStyle(container);
        const dotPx = parseFloat(style.fontSize);
        const gapPx = dotPx * 1.2; // Reduced gap for denser dots
        const contW = container.clientWidth;
        const contH = container.clientHeight;

        const cols = Math.floor((contW + gapPx) / (dotPx + gapPx));
        const rows = Math.floor((contH + gapPx) / (dotPx + gapPx));
        const total = cols * rows;

        for (let i = 0; i < total; i++) {
          const d = document.createElement("div");
          d.classList.add("dot");
          gsap.set(d, { x: 0, y: 0, backgroundColor: colors.base });
          d._inertiaApplied = false;
          container.appendChild(d);
          dots.push(d);
        }

        requestAnimationFrame(() => {
          dotCenters = dots.map(d => {
            const r = d.getBoundingClientRect();
            return {
              el: d,
              x: r.left + window.scrollX + r.width / 2,
              y: r.top + window.scrollY + r.height / 2
            };
          });
        });
      }

      window.addEventListener("resize", buildGrid);
      buildGrid();

      let lastTime = 0, lastX = 0, lastY = 0;

      window.addEventListener("mousemove", e => {
        const now = performance.now();
        const dt = now - lastTime || 16;
        let dx = e.pageX - lastX;
        let dy = e.pageY - lastY;
        let vx = dx / dt * 1000;
        let vy = dy / dt * 1000;
        let speed = Math.hypot(vx, vy);

        if (speed > maxSpeed) {
          const scale = maxSpeed / speed;
          vx *= scale; vy *= scale; speed = maxSpeed;
        }

        lastTime = now;
        lastX = e.pageX;
        lastY = e.pageY;

        requestAnimationFrame(() => {
          dotCenters.forEach(({ el, x, y }) => {
            const dist = Math.hypot(x - e.pageX, y - e.pageY);
            const t = Math.max(0, 1 - dist / threshold);
            const col = gsap.utils.interpolate(colors.base, colors.active, t);
            gsap.set(el, { backgroundColor: col });

            if (speed > speedThreshold && dist < threshold && !el._inertiaApplied) {
              el._inertiaApplied = true;
              const pushX = (x - e.pageX) + vx * 0.005;
              const pushY = (y - e.pageY) + vy * 0.005;

              gsap.to(el, {
                inertia: { x: pushX, y: pushY, resistance: 750 },
                onComplete() {
                  gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 1.5,
                    ease: "elastic.out(1,0.75)"
                  });
                  el._inertiaApplied = false;
                }
              });
            }
          });
        });
      });

      window.addEventListener("click", e => {
        dotCenters.forEach(({ el, x, y }) => {
          const dist = Math.hypot(x - e.pageX, y - e.pageY);
          if (dist < shockRadius && !el._inertiaApplied) {
            el._inertiaApplied = true;
            const falloff = Math.max(0, 1 - dist / shockRadius);
            const pushX = (x - e.pageX) * shockPower * falloff;
            const pushY = (y - e.pageY) * shockPower * falloff;

            gsap.to(el, {
              inertia: { x: pushX, y: pushY, resistance: 750 },
              onComplete() {
                gsap.to(el, {
                  x: 0,
                  y: 0,
                  duration: 1.5,
                  ease: "elastic.out(1,0.75)"
                });
                el._inertiaApplied = false;
              }
            });
          }
        });
      });
    };

    initGlowingInteractiveDotsGrid();
  }, []);

  return (
    <section className="section-resource">
      <div className="dots-wrap">
        <div data-dots-container-init="" className="dots-container"></div>
      </div>
    </section>
  );
};

export default InteractiveDots; 