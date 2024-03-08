"use client";

import { useFabricRef } from "@/hooks/useFabricRef";
import React from "react";

import fabric from "@/fabric";
import { Button } from "./ui/button";
import useFeatureStore, {
  SELECTION_CONFIG_MAP,
} from "@/stores/useFeatureStore";
import {
  DownloadIcon,
  ImageIcon,
  Pencil1Icon,
  TextIcon,
} from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { FEATURES } from "@/lib/constant";

const OptionItem = ({ onClick, children, tooltipText, disabled, value }) => {
  const { activeSelection, isCanvasPainted } = useFeatureStore();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          disabled={!isCanvasPainted}
          aria-pressed={activeSelection === value}
          className={` disabled:bg-primary-300
          aria-pressed:w-full aria-pressed:bg-primary-main hover:bg-primary-main
          btn-primary-700
          disabled:pointer-events-none p-3 flex justify-center`}
          onClick={onClick}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent className="bg-greys-800 text-white" side="right">
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Options = () => {
  const { canvasRef, fabricRef } = useFabricRef();
  const { isCanvasPainted, activeSelection, setSelection } = useFeatureStore();

  const handleDownload = () => {
    if (fabricRef.current) {
      let a = document.createElement("a");
      let dt = fabricRef.current.toDataURL({
        format: "jpeg",
        quality: 1,
      });

      a.href = dt;
      a.target = "_blank";
      a.download = "image.jpeg";
      a.click();
    }
  };

  const discardAllFeatures = () => {
    fabricRef.current.fire("custom:cleareverything");
  };

  const addTextHandler = () => {
    if (activeSelection === FEATURES.TEXT_BOX) {
      discardAllFeatures();
    } else {
      discardAllFeatures();
      setSelection(FEATURES.TEXT_BOX);
    }
  };

  const handleFilters = () => {
    if (activeSelection === FEATURES.IMAGE) {
      discardAllFeatures();
    } else {
      setSelection(FEATURES.IMAGE);
    }
  };

  const handleFreeDrawingMode = () => {
    if (activeSelection === FEATURES.DRAW) {
      discardAllFeatures();
    } else {
      fabricRef.current.isDrawingMode = true;
      fabricRef.current.freeDrawingBrush.color = "red";
      fabricRef.current.freeDrawingBrush.width = 12;
      setSelection(FEATURES.DRAW);
    }
  };

  return (
    <div className="flex flex-col gap-3 items-start h-full justify-center">
      <OptionItem
        disabled={!isCanvasPainted}
        onClick={handleFilters}
        tooltipText="Image"
        value={FEATURES.IMAGE}
      >
        <ImageIcon />
      </OptionItem>
      <OptionItem
        disabled={!isCanvasPainted}
        onClick={addTextHandler}
        tooltipText="Text"
        value={FEATURES.TEXT_BOX}
      >
        <TextIcon />
      </OptionItem>

      <OptionItem
        disabled={!isCanvasPainted}
        onClick={handleFreeDrawingMode}
        tooltipText="Draw"
        value={FEATURES.DRAW}
      >
        <Pencil1Icon />
      </OptionItem>

      <Button
        className="btn-primary-700 mt-auto"
        onClick={handleDownload}
        disabled={!isCanvasPainted}
      >
        <DownloadIcon />
      </Button>
    </div>
  );
};

export default Options;
