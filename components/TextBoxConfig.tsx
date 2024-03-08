import { useFabricRef } from "@/hooks/useFabricRef";
import {
  BorderSolidIcon,
  FontBoldIcon,
  FontItalicIcon,
  OverlineIcon,
  PlusIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import fabric from "@/fabric";
import { ITextOptions } from "fabric/fabric-impl";
import { object } from "zod";

type TextBoxState = {
  fontSize: number;
  color: string;
  decorations: {
    underline: boolean;
    linethrough: boolean;
    overline: boolean;
    bold: boolean;
    italic: boolean;
  };
};
const initTextState = {
  fontSize: 32,
  color: "#000000",
  decorations: {
    underline: false,
    linethrough: false,
    overline: false,
    bold: false,
    italic: false,
  },
};

const extractFabricTextConfig = (textState: TextBoxState): ITextOptions => {
  return {
    fontSize: textState.fontSize,
    fill: textState.color,
    underline: textState.decorations.underline,
    linethrough: textState.decorations.linethrough,
    overline: textState.decorations.overline,
    fontWeight: textState.decorations.bold ? "bold" : "normal",
    fontStyle: textState.decorations.italic ? "italic" : "normal",
  };
};

const convertFromTextToFabric = (textObj: fabric.IText): TextBoxState => {
  return {
    color: textObj.fill.toString(),
    fontSize: textObj.fontSize,
    decorations: {
      bold: textObj.fontWeight === "bold",
      italic: textObj.fontStyle === "italic",
      linethrough: textObj.linethrough,
      overline: textObj.overline,
      underline: textObj.underline,
    },
  };
};

const TextBoxConfig = () => {
  const { fabricRef } = useFabricRef();

  const [textBoxState, setTextBoxState] = useState<TextBoxState>(initTextState);

  const handleColorChange = (e) => {
    if (fabricRef.current) {
      fabricRef.current.getActiveObject().set({
        fill: e.target.value,
      });
      setTextBoxState((prev) => ({ ...prev, color: e.target.value }));
      fabricRef.current.renderAll();
    }
  };

  const handleFontSizeChange = (e) => {
    const getCurrentSelectedObj =
      fabricRef.current.getActiveObject() as fabric.IText;
    getCurrentSelectedObj.fontSize = e.target.value;
    setTextBoxState((prev) => ({ ...prev, fontSize: e.target.value }));
    fabricRef.current.renderAll();
  };

  const handleTextDecoration = (values) => {
    // const op = e.target.dataset.action;
    const getCurrentSelectedObj =
      fabricRef.current.getActiveObject() as fabric.IText;
    const newState = { ...textBoxState };
    Object.keys(initTextState.decorations).forEach((item) => {
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
      newState.decorations[item] = Boolean(isActive);
    });
    setTextBoxState(newState);
    fabricRef.current.renderAll();
  };

  const addTextHandler = (e) => {
    var text = new fabric.IText("hello world", {
      left: 100,
      top: 100,
      ...extractFabricTextConfig(textBoxState),
    });
    fabricRef.current.setActiveObject(text);
    fabricRef.current.add(text);
    fabricRef.current.renderAll();
  };

  const findTextObject = () => {
    let isTextPresent = false;
    fabricRef.current.forEachObject((obj) => {
      if (obj instanceof fabric.IText && obj.type === "i-text") {
        isTextPresent = true;
        return true;
      }
    });
    return isTextPresent;
  };

  useEffect(() => {
    let handler;
    const fabricCanvas = fabricRef.current;
    if (fabricCanvas) {
      var topObject: fabric.IText = null;
      var topIndex = -1;
      handler = (event) => {
        console.log("selection:updated textbox", event);
        const textObj = event.selected[0];
        if (textObj instanceof fabric.IText && textObj.type === "i-text") {
          fabricCanvas.isDrawingMode = false;
          const newState: TextBoxState = convertFromTextToFabric(textObj);
          setTextBoxState(newState);
        }
      };
      fabricCanvas.on("selection:updated", handler);

      fabricCanvas.forEachObject(function (obj, index) {
        // Check if the object is a text object
        if (obj instanceof fabric.IText && obj.type === "i-text") {
          // Update the top object and index if the current object's index is higher
          if (index > topIndex) {
            topObject = obj;
            topIndex = index;
          }
        }
      });

      if (topObject) {
        const newState: TextBoxState = convertFromTextToFabric(topObject);
        fabricCanvas.setActiveObject(topObject);
        fabricCanvas.renderAll();
        setTextBoxState(newState);
      }
    }
    return () => {
      if (fabricCanvas) {
        fabricCanvas.off(handler);
      }
    };
  }, []);

  const isTextAvailable = findTextObject();

  return (
    <div>
      <div className="flex flex-col gap-2 items-center mb-5">
        <Button className="btn-icon-primary" onClick={addTextHandler}>
          <PlusIcon className="w-6 h-6" />
        </Button>
        <p className="font-semibold">Add Text</p>
      </div>
      {isTextAvailable && (
        <>
          <div className="flex justify-center gap-10 items-center mb-5">
            <div className="flex flex-col gap-2 items-center">
              <input
                type="color"
                name="text-colors"
                id="text-color"
                value={textBoxState.color}
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
                  min={8}
                  value={textBoxState.fontSize}
                  onChange={handleFontSizeChange}
                />
                <span>px</span>
              </div>
              <p className="font-semibold text-sm w-full">Size</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-semibold text-sm w-full">Decorations</p>
            <ToggleGroup
              type="multiple"
              variant="default"
              className="gap-3"
              size="lg"
              onValueChange={handleTextDecoration}
            >
              <ToggleGroupItem
                className="group btn-icon-primary p-3 border-none"
                value="underline"
                aria-pressed={textBoxState.decorations.underline}
                aria-label="Toggle underline"
              >
                <UnderlineIcon className="h-4 w-4 group-aria-pressed:text-white" />
              </ToggleGroupItem>
              <ToggleGroupItem
                className="group btn-icon-primary p-3 border-none"
                value="linethrough"
                aria-pressed={textBoxState.decorations.linethrough}
                aria-label="linethrough"
              >
                <BorderSolidIcon className="h-4 w-4 group-aria-pressed:text-white" />
              </ToggleGroupItem>
              <ToggleGroupItem
                className="group btn-icon-primary p-3 border-none"
                value="overline"
                aria-pressed={textBoxState.decorations.overline}
                aria-label="Toggle overline"
              >
                <OverlineIcon className="h-4 w-4 group-aria-pressed:text-white" />
              </ToggleGroupItem>
              <ToggleGroupItem
                className="group btn-icon-primary p-3 border-none"
                value="bold"
                aria-pressed={textBoxState.decorations.bold}
                aria-label="Toggle bold"
              >
                <FontBoldIcon className="h-4 w-4 group-aria-pressed:text-white" />
              </ToggleGroupItem>
              <ToggleGroupItem
                className="group btn-icon-primary p-3 border-none"
                value="italic"
                aria-pressed={textBoxState.decorations.italic}
                aria-label="italic"
              >
                <FontItalicIcon className="h-4 w-4 group-aria-pressed:text-white" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </>
      )}
    </div>
  );
};

export default TextBoxConfig;
