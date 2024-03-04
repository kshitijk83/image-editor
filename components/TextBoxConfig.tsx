import { useFabricRef } from "@/hooks/useFabricRef";
import React from "react";

const TextBoxConfig = () => {
  const { fabricRef } = useFabricRef();

  const handleColorChange = (e) => {
    if (fabricRef.current) {
      console.log(fabricRef.current.getActiveObject());
      fabricRef.current.getActiveObject().set({
        fill: e.target.value,
      });
      fabricRef.current.renderAll();
    }
  };

  const handleFontSizeChange = (e) => {
    const getCurrentSelectedObj =
      fabricRef.current.getActiveObject() as fabric.IText;
    getCurrentSelectedObj.fontSize = e.target.value;
    fabricRef.current.renderAll();
  };

  const handleTextDecoration = (e) => {
    const op = e.target.dataset.action;
    const getCurrentSelectedObj =
      fabricRef.current.getActiveObject() as fabric.IText;
    switch (op) {
      case "underline":
        getCurrentSelectedObj.set({ underline: true });
        break;
      case "line-through":
        getCurrentSelectedObj.set({ linethrough: true });
        break;
      case "overline":
        getCurrentSelectedObj.set({ overline: true });
        break;
      default:
        break;
    }
    console.log(getCurrentSelectedObj);

    fabricRef.current.renderAll();
  };

  return (
    <div>
      <div className="mb-2 flex gap-2 items-center">
        <p>Input Color of text here:</p>
        <input
          type="color"
          name="text-colors"
          id="text-color"
          onChange={handleColorChange}
          // className="w-full"
        />
      </div>
      <div className="mb-2 flex gap-2 items-center">
        <p>FontSize: </p>
        <input
          type="number"
          min={8}
          defaultValue={32}
          onChange={handleFontSizeChange}
        />
        px
      </div>
      <div
        className="mb-2 flex gap-2 items-center"
        onClick={handleTextDecoration}
      >
        <p>Text Decoration</p>
        <button data-action="underline">Underline</button>
        <button data-action="line-through">line through</button>
        <button data-action="overline">over line</button>
      </div>
    </div>
  );
};

export default TextBoxConfig;
