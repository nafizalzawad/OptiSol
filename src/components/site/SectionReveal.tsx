import { motion, useInView, useReducedMotion } from "framer-motion";
import { PropsWithChildren, useRef } from "react";

type Props = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

export default function SectionReveal({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { margin: "-10% 0px -10% 0px", once: true });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(6px)" }}
      animate={
        reduce
          ? undefined
          : isInView
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : undefined
      }
      transition={{ duration: 0.65, ease: [0.21, 0.8, 0.21, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
