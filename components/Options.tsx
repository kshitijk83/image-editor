"use client";

import { useFabricRef } from "@/hooks/useFabricRef";
import React from "react";

import fabric from "@/fabric";
import { Button } from "./ui/button";
import useFeatureStore from "@/stores/useFeatureStore";
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

const OptionItem = ({ onClick, children, tooltipText, disabled }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button disabled={disabled} className="btn-primary" onClick={onClick}>
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-greys-800 text-white">
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Options = () => {
  const { canvasRef, fabricRef } = useFabricRef();
  const isCanvasPainted = useFeatureStore((state) => state.isCanvasPainted);

  const handleDownload = () => {
    if (fabricRef.current) {
      let a = document.createElement("a");
      let dt = fabricRef.current.toDataURL({
        format: "jpeg",
        quality: 1,
      });

      a.href = dt;
      a.target = "_blank";
      a.download = "a.jpeg";
      a.click();
    }
  };

  const addTextHandler = () => {
    var text = new fabric.IText("hello world", {
      left: 100,
      top: 100,
      fontSize: 32,
      //   editable: true,
    });
    text.borderColor = "black";
    text.cornerColor = "black";
    text.transparentCorners = true;
    fabricRef.current.setActiveObject(text);

    fabricRef.current.add(text);
  };

  const handleFilters = () => {
    fabricRef.current.forEachObject((obj) => {
      if (obj instanceof fabric.Image && obj.type === "image") {
        fabricRef.current.setActiveObject(obj);
        return false;
      }
    });

    fabricRef.current.renderAll();
  };

  // if (!isCanvasPainted) {
  //   return (
  //     <div className="h-full w-full flex items-center justify-center">
  //       <span className="font-bold">Please upload image first</span>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col gap-3 items-center my-4 h-full justify-center">
      <OptionItem
        disabled={!isCanvasPainted}
        onClick={addTextHandler}
        tooltipText="Text"
      >
        <TextIcon />
      </OptionItem>
      <OptionItem
        disabled={!isCanvasPainted}
        onClick={handleFilters}
        tooltipText="Image"
      >
        <ImageIcon />
      </OptionItem>

      <OptionItem
        disabled={!isCanvasPainted}
        onClick={() => {}}
        tooltipText="Image"
      >
        <Pencil1Icon />
      </OptionItem>

      <Button className="m-4 btn-primary mt-auto" onClick={handleDownload}>
        <DownloadIcon />
      </Button>
    </div>
  );
};

export default Options;
