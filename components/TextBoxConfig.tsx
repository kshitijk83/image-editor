import { useFabricRef } from "@/hooks/useFabricRef";
import {
  BorderSolidIcon,
  FontBoldIcon,
  FontItalicIcon,
  OverlineIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Input } from "./ui/input";

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

  const handleTextDecoration = (values) => {
    // const op = e.target.dataset.action;
    const getCurrentSelectedObj =
      fabricRef.current.getActiveObject() as fabric.IText;
    const x = ["underline", "linethrough", "overline", "bold", "italic"];
    x.forEach((item) => {
      const isActive = values.find((y) => y === item);
      if (isActive) {
        if (item === "bold") {
          getCurrentSelectedObj.set({ fontWeight: "bold" });
        } else if (item === "italic") {
          getCurrentSelectedObj.set({ fontStyle: "italic" });
        } else {
          getCurrentSelectedObj.set({ [item]: true });
        }
      } else {
        if (item === "bold") {
          getCurrentSelectedObj.set({ fontWeight: "normal" });
        } else if (item === "italic") {
          getCurrentSelectedObj.set({ fontStyle: "normal" });
        } else {
          getCurrentSelectedObj.set({ [item]: false });
        }
      }
    });

    fabricRef.current.renderAll();
  };

  return (
    <div>
      <div className="flex flex-col gap-2 items-center mb-5">
        <p className="text-center text-lg font-semibold">Text Color</p>
        <input
          type="color"
          name="text-colors"
          id="text-color"
          onChange={handleColorChange}
          className="p-1 border-black h-10 w-12"
        />
      </div>
      <div className="flex flex-col gap-4 items-center mb-5">
        <p className="text-center text-lg font-semibold">Text Size</p>
        <div className="flex items-center gap-1">
          <Input
            type="number"
            className="w-12 p-1"
            min={8}
            defaultValue={32}
            onChange={handleFontSizeChange}
          />
          <span>px</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-center text-lg font-semibold">Text Decorations</p>
        <ToggleGroup
          type="multiple"
          variant="outline"
          size="lg"
          onValueChange={handleTextDecoration}
        >
          <ToggleGroupItem
            className="aria-pressed:bg-greys-900 group"
            value="underline"
            aria-label="Toggle underline"
          >
            <UnderlineIcon className="h-4 w-4 group-aria-pressed:text-white" />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="aria-pressed:bg-greys-900 group"
            value="linethrough"
            aria-label="linethrough"
          >
            <BorderSolidIcon className="h-4 w-4 group-aria-pressed:text-white" />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="aria-pressed:bg-greys-900 group"
            value="overline"
            aria-label="Toggle overline"
          >
            <OverlineIcon className="h-4 w-4 group-aria-pressed:text-white" />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="aria-pressed:bg-greys-900 group"
            value="bold"
            aria-label="Toggle bold"
          >
            <FontBoldIcon className="h-4 w-4 group-aria-pressed:text-white" />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="aria-pressed:bg-greys-900 group"
            value="italic"
            aria-label="italic"
          >
            <FontItalicIcon className="h-4 w-4 group-aria-pressed:text-white" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default TextBoxConfig;
