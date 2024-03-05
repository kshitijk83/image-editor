import { FEATURES } from "@/lib/constant";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const SELECTION_CONFIG_MAP = {
  "i-text": FEATURES.TEXT_BOX,
  image: FEATURES.IMAGE,
};

type State = {
  isCanvasPainted: boolean;
  activeConfig: string;
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
    activeConfig: "",
    setSelection: (activeObjectName) =>
      set((_) => ({
        activeSelection: activeObjectName,
        activeConfig: SELECTION_CONFIG_MAP[activeObjectName],
      })),
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
