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

type ImageState = {
  brightness: number;
  saturation: number;
  contrast: number;
  ["hue-rotation"]: number;
};

type State = {
  isCanvasPainted: boolean;
  activeSelection: string;
  imageState: ImageState;
  setSelection: (x: string) => void;
  setCanvasPainted: (x: boolean) => void;
  setImageState: (newState) => void;
};

const useFeatureStore = create<State>()((set) => ({
  isCanvasPainted: false,
  activeSelection: "",
  imageState: {
    brightness: 0,
    saturation: 0,
    contrast: 0,
    ["hue-rotation"]: 0,
  },
  setSelection: (activeObjectName) =>
    set((_) => {
      return {
        activeSelection: activeObjectName,
      };
    }),
  setCanvasPainted: (isSet) =>
    set((_) => ({
      isCanvasPainted: isSet,
    })),
  setImageState: (newState: ImageState) =>
    set((_) => ({
      imageState: { ...newState },
    })),
}));

export default useFeatureStore;
