"use client";

import FilterConfig from "@/components/FilterConfig";
import FreeDrawConfig from "@/components/FreeDrawConfig";
import TextBoxConfig from "@/components/TextBoxConfig";
import { Button } from "@/components/ui/button";
import { useFabricRef } from "@/hooks/useFabricRef";
import { CONFIG, FEATURES } from "@/lib/constant";
import useFeatureStore from "@/stores/useFeatureStore";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";

const COLORS = {
  RED: "red",
  GREEN: "green",
};

const ConfigParams = () => {
  const { fabricRef } = useFabricRef();
  const { activeSelection, isCanvasPainted } = useFeatureStore();

  useEffect(() => {
    if (fabricRef.current) {
      const type = fabricRef.current.getActiveObject().get("type");
      console.log(type);
    }
  }, []);

  const discardAllFeatures = () => {
    fabricRef.current.fire("custom:cleareverything");
  };

  const renderFeatureParams = () => {
    switch (activeSelection) {
      case FEATURES.TEXT_BOX:
        return <TextBoxConfig />;

      case FEATURES.IMAGE:
        return <FilterConfig />;

      case FEATURES.DRAW:
        return <FreeDrawConfig />;
      default:
        return (
          <div className="h-full w-full flex items-center justify-center">
            <span className="font-bold">No Feature Selected</span>
          </div>
        );
    }
  };

  return (
    <div className="relative h-full w-[400px] flex justify-center border-l-2">
      <div
        className={`h-full w-full text-greys-800 p-4 ${
          activeSelection ? "bg-greys-100" : "bg-white"
        }`}
      >
        {renderFeatureParams()}
      </div>
      {/* <div className="w-fit h-full flex justify-center items-center"> */}
      {/* <Button
        className="h-10 bg-greys-800 rounded-none px-1
        absolute right-0 top-[50%] origin-center
        "
        // onClick={() => discardAllFeatures()}
      >
        {activeSelection ? <DoubleArrowRightIcon /> : <DoubleArrowLeftIcon />}
      </Button> */}
      {/* </div> */}
    </div>
  );
};

export default ConfigParams;
