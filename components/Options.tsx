"use client";

import { useFabricRef } from "@/hooks/useFabricRef";
import React from "react";

import fabric from "@/fabric";

const Options = () => {
  const { canvasRef, fabricRef } = useFabricRef();

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

  return (
    <aside className="absolute left-0 top-0 w-[300px] h-full bg-white shadow-lg flex-col flex">
      <div className="p-4 font-semibold flex flex-col">
        <div className="mb-2">Options</div>
        <button type="button" onClick={addTextHandler}>
          Add Text
        </button>
      </div>

      <div className="p-4 font-semibold flex flex-col">
        {/* <div >Filters</div> */}
        <button className="mb-2" onClick={handleFilters}>
          Filters
        </button>
      </div>

      <button className="m-4" onClick={handleDownload}>
        Dowload
      </button>
    </aside>
  );
};

export default Options;
