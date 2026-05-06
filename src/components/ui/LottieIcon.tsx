import {
  Suspense,
  lazy,
  useMemo,
  type CSSProperties,
} from "react";
import animationData from "@/assets/lottie/placeholder.json";
import { usePrefersReducedMotion } from "@/lib/a11y";

const LazyLottie = lazy(async () => {
  const module = await import("lottie-react");
  return { default: module.default };
});

interface LottieIconProps {
  className?: string;
}

export function LottieIcon({ className }: LottieIconProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const fallbackStyle = useMemo(
    () =>
      ({
        background:
          "radial-gradient(circle, rgba(105,226,255,0.18), rgba(105,226,255,0.04) 55%, transparent 70%)",
      }) as CSSProperties,
    [],
  );

  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden="true"
        className={className}
        style={fallbackStyle}
      />
    );
  }

  return (
    <Suspense
      fallback={
        <div
          aria-hidden="true"
          className={className}
          style={fallbackStyle}
        />
      }
    >
      <LazyLottie
        animationData={animationData}
        autoplay
        className={className}
        loop
      />
    </Suspense>
  );
}
