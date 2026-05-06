import { useEffect, useState } from "react";

export function getInitialReducedMotionPreference() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function usePrefersReducedMotion() {
  const [isReducedMotion, setIsReducedMotion] = useState(
    getInitialReducedMotionPreference(),
  );

  useEffect(() => observeReducedMotionPreference(setIsReducedMotion), []);

  return isReducedMotion;
}

export function observeReducedMotionPreference(
  callback: (isReduced: boolean) => void,
) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => undefined;
  }

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handleChange = (event: MediaQueryListEvent) => callback(event.matches);

  callback(mediaQuery.matches);

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }

  mediaQuery.addListener(handleChange);
  return () => mediaQuery.removeListener(handleChange);
}
