"use client";

import FilterConfig from "@/components/FilterConfig";
import TextBoxConfig from "@/components/TextBoxConfig";
import { useFabricRef } from "@/hooks/useFabricRef";
import { CONFIG, FEATURES } from "@/lib/constant";
import useFeatureStore from "@/stores/useFeatureStore";
import React, { useEffect, useState } from "react";

const COLORS = {
  RED: "red",
  GREEN: "green",
};

const ConfigParams = () => {
  const { fabricRef } = useFabricRef();
  const activeSelection = useFeatureStore((state) => state.activeSelection);
  // const activeSelection = useFeatureStore((state) => state.activeSelection);

  useEffect(() => {
    if (fabricRef.current) {
      const type = fabricRef.current.getActiveObject().get("type");
      console.log(type);
    }
  }, []);

  const renderFeatureParams = () => {
    switch (activeSelection) {
      case FEATURES.TEXT_BOX:
        return <TextBoxConfig />;

      case FEATURES.IMAGE:
        return <FilterConfig />;
      default:
        return (
          <div className="h-full w-full flex items-center justify-center">
            <span className="font-bold">No Feature Selected</span>
          </div>
        );
    }
  };

  return (
    <div className="p-4 h-full flex flex-col justify-center">
      {renderFeatureParams()}
    </div>
  );
};

export default ConfigParams;
