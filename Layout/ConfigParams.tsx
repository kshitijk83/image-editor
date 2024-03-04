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
  const activeConfig = useFeatureStore((state) => state.activeConfig);
  // const activeSelection = useFeatureStore((state) => state.activeSelection);

  useEffect(() => {
    if (fabricRef.current) {
      const type = fabricRef.current.getActiveObject().get("type");
      console.log(type);
    }
  }, []);

  const renderFeatureParams = () => {
    switch (activeConfig) {
      case FEATURES.TEXT_BOX:
        return <TextBoxConfig />;

      case FEATURES.IMAGE:
        return <FilterConfig />;
      default:
        return <div> No Feature selected</div>;
    }
  };

  return (
    <div>
      <div className="p-4 font-semibold flex flex-col">
        {renderFeatureParams()}
      </div>
    </div>
  );
};

export default ConfigParams;
