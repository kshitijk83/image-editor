import { useFabricRef } from "@/hooks/useFabricRef";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Input } from "./ui/input";

const initDrawState = {
  color: "#FF0000",
  width: 12,
};

const FreeDrawConfig = () => {
  const { fabricRef } = useFabricRef();

  const [drawState, setDrawState] = useState(initDrawState);

  const handleColorChange = (e) => {
    fabricRef.current.freeDrawingBrush.color = e.target.value;
    fabricRef.current.renderAll();
    setDrawState((prev) => ({
      ...prev,
      color: e.target.value,
    }));
  };

  const handleFontSizeChange = (e) => {
    fabricRef.current.freeDrawingBrush.width = e.target.value;
    fabricRef.current.renderAll();
    setDrawState((prev) => ({
      ...prev,
      width: e.target.value,
    }));
  };

  useLayoutEffect(() => {
    const canvas = fabricRef.current;
    if (canvas) {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = initDrawState.color;
      canvas.freeDrawingBrush.width = initDrawState.width;
      setDrawState(initDrawState);

      canvas.renderAll();
    }

    return () => {
      if (canvas) {
        canvas.isDrawingMode = false;
      }
    };
  }, []);

  return (
    <div>
      <div className="flex justify-center gap-10 items-center mb-5">
        <div className="flex flex-col gap-2 items-center">
          <input
            type="color"
            name="text-colors"
            id="text-color"
            value={drawState.color}
            onChange={handleColorChange}
            className="p-1 border-black h-10 w-12"
          />
          <p className="font-semibold text-sm">Color</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="flex gap-1 items-center">
            <Input
              type="number"
              className="w-16 h-10 rounded-none border-greys-800 border-[1px]"
              min={2}
              value={drawState.width}
              onChange={handleFontSizeChange}
            />
            <span>px</span>
          </div>
          <p className="font-semibold text-sm w-full">Size</p>
        </div>
      </div>
    </div>
  );
};

export default FreeDrawConfig;
