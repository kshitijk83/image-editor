"use client";

import { FEATURES } from "@/lib/constant";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const SELECTION_CONFIG_MAP = {
  "i-text": FEATURES.TEXT_BOX,
  image: FEATURES.IMAGE,
  draw: FEATURES.DRAW,
};

export const CANVAS_FEATURE_MAP = {
  [FEATURES.TEXT_BOX]: "i-text",
  [FEATURES.IMAGE]: "image",
  [FEATURES.DRAW]: "draw",
};

type State = {
  isCanvasPainted: boolean;
  // activeConfig: string;
  activeSelection: string;
  setSelection: (x: string) => void;
  setCanvasPainted: (x: boolean) => void;
};

const useFeatureStore = create<State>()(
  // devtools(
  //   persist(
  (set) => ({
    isCanvasPainted: false,
    activeSelection: "",
    // activeConfig: "",
    setSelection: (activeObjectName) =>
      set((_) => {
        return {
          activeSelection: activeObjectName,
          // activeConfig: SELECTION_CONFIG_MAP[activeObjectName],
        };
      }),
    setCanvasPainted: (isSet) =>
      set((_) => ({
        isCanvasPainted: isSet,
      })),
  })
  //     { name: "feature-store" }
  //   )
  // )
);

export default useFeatureStore;
