export const motionTokens = {
  durations: {
    fast: 0.18,
    base: 0.32,
    slow: 0.68,
  },
  easings: {
    standard: [0.22, 1, 0.36, 1],
    smooth: [0.16, 1, 0.3, 1],
    micro: [0.2, 0.8, 0.2, 1],
  },
  stagger: {
    tight: 0.04,
    base: 0.07,
    slow: 0.12,
  },
  revealVariants: {
    sceneEnter: {
      hidden: {
        opacity: 0,
        y: 28,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.68,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
    cardReveal: {
      hidden: {
        opacity: 0,
        y: 18,
        scale: 0.985,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.32,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    },
    heroTitle: {
      hidden: {
        opacity: 0,
        y: 24,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.68,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
    heroMedia: {
      hidden: {
        opacity: 0,
        y: 18,
        scale: 0.96,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.68,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    },
    chipPop: {
      hidden: {
        opacity: 0,
        y: 10,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.18,
          ease: [0.2, 0.8, 0.2, 1],
        },
      },
    },
    softReveal: {
      hidden: {
        opacity: 0,
        y: 14,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.42,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
    switchPanel: {
      hidden: {
        opacity: 0,
        y: 16,
        scale: 0.988,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.36,
          ease: [0.16, 1, 0.3, 1],
        },
      },
      exit: {
        opacity: 0,
        y: -10,
        scale: 0.992,
        transition: {
          duration: 0.22,
          ease: [0.2, 0.8, 0.2, 1],
        },
      },
    },
    hoverLift: {
      rest: {
        y: 0,
        scale: 1,
      },
      hover: {
        y: -3,
        scale: 1.01,
        transition: {
          duration: 0.18,
          ease: [0.2, 0.8, 0.2, 1],
        },
      },
    },
  },
  scrollTrigger: {
    start: "top top",
    mid: "top center",
    end: "bottom top",
    scrub: 0.6,
  },
  reducedMotion: {
    disablePinned: true,
    disableParallax: true,
    fallbackDuration: 0.18,
  },
} as const;

export type MotionTokens = typeof motionTokens;
