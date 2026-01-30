import { useEffect, useRef } from "react";

/**
 * Signature moment: a subtle solar glow that follows the pointer.
 * Disabled for prefers-reduced-motion.
 */
export default function SolarGlowField({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--glow-x", `${x}%`);
      el.style.setProperty("--glow-y", `${y}%`);
    };

    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{
        background:
          "radial-gradient(520px 320px at var(--glow-x, 20%) var(--glow-y, 10%), hsl(var(--brand-yellow) / 0.22), transparent 60%), radial-gradient(520px 320px at calc(var(--glow-x, 20%) + 20%) calc(var(--glow-y, 10%) + 10%), hsl(var(--brand-green) / 0.14), transparent 60%)",
      }}
    />
  );
}
