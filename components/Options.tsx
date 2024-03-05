"use client";

import { useFabricRef } from "@/hooks/useFabricRef";
import React from "react";

import fabric from "@/fabric";
import { Button } from "./ui/button";
import useFeatureStore from "@/stores/useFeatureStore";

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

  if (!isCanvasPainted) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <span className="font-bold">Please upload image first</span>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 font-semibold flex flex-col">
        <div className="mb-2 text-center mb-4">Options</div>
        <Button type="button" onClick={addTextHandler}>
          Add Text
        </Button>
      </div>

      <div className="p-4 font-semibold flex flex-col">
        {/* <div >Filters</div> */}
        <Button className="mb-2" onClick={handleFilters}>
          Filters
        </Button>
      </div>

      <Button className="m-4" onClick={handleDownload}>
        Dowload
      </Button>
    </>
  );
};

export default Options;
