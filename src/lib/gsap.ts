import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isRegistered = false;

export function ensureGSAP() {
  if (typeof window === "undefined") {
    return { gsap, ScrollTrigger };
  }

  if (!isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
  }

  return { gsap, ScrollTrigger };
}

export function refreshScrollTrigger() {
  if (typeof window === "undefined") {
    return;
  }

  ensureGSAP();
  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };
