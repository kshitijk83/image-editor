import { FEATURES } from "@/lib/constant";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const SELECTION_CONFIG_MAP = {
  "i-text": FEATURES.TEXT_BOX,
  image: FEATURES.IMAGE,
};

type State = {
  activeConfig: string;
  activeSelection: string;
  setSelection: (x: string) => void;
};

const useFeatureStore = create<State>()(
  // devtools(
  //   persist(
  (set) => ({
    activeSelection: "",
    activeConfig: "",
    setSelection: (activeObjectName) =>
      set((_) => ({
        activeSelection: activeObjectName,
        activeConfig: SELECTION_CONFIG_MAP[activeObjectName],
      })),
  })
  //     { name: "feature-store" }
  //   )
  // )
);

export default useFeatureStore;
