import { useFabricRef } from "@/hooks/useFabricRef";
import React, { useEffect, useState } from "react";
import fabric from "@/fabric";
import { Slider } from "./ui/slider";
import useFeatureStore from "@/stores/useFeatureStore";

const initImageState = {
  brightness: 0,
  saturation: 0,
  contrast: 0,
  ["hue-rotation"]: 0,
};
const FilterConfig = () => {
  const { fabricRef } = useFabricRef();
  const { imageState, setImageState } = useFeatureStore();

  const activeObj = fabricRef.current.getActiveObject() as fabric.Image;

  const handleFilters = (target) => {
    const newState = { ...imageState };
    const activeObj = fabricRef.current.getActiveObject() as fabric.Image;
    const val = parseInt(target.value, 10) / 100;
    activeObj.filters.forEach((item) => {
      if (
        item instanceof fabric.Image.filters.Brightness &&
        target.name === "brightness"
      ) {
        //@ts-ignore
        item.brightness = val;
        newState.brightness = parseInt(target.value, 10);
      } else if (
        item instanceof fabric.Image.filters.Saturation &&
        target.name === "saturation"
      ) {
        //@ts-ignore
        item.saturation = val;
        newState.saturation = parseInt(target.value, 10);
      } else if (
        item instanceof fabric.Image.filters.Contrast &&
        target.name === "contrast"
      ) {
        //@ts-ignore
        item.contrast = val;
        newState.contrast = parseInt(target.value, 10);
      } else if (
        item instanceof fabric.Image.filters.HueRotation &&
        target.name === "hue-rotation"
      ) {
        //@ts-ignore
        item.rotation = val;
        newState["hue-rotation"] = parseInt(target.value, 10);
      }
    });

    setImageState(newState);
    activeObj.applyFilters();
    fabricRef.current.renderAll();
  };

  useEffect(() => {
    const fabricCanvas = fabricRef.current;
    if (fabricCanvas) {
      fabricCanvas.forEachObject((obj) => {
        if (obj instanceof fabric.Image && obj.type === "image") {
          fabricCanvas.setActiveObject(obj);
          return false;
        }
      });

      fabricCanvas.renderAll();
    }
  }, []);

  return (
    <div onChange={handleFilters} className="px-10">
      <div className="flex flex-col gap-3 items-center mb-5">
        <label htmlFor="text-center text-lg font-semibold">Brightness</label>
        <Slider
          name="brightness"
          id="brightness"
          defaultValue={[0]}
          itemRef="slider"
          value={[imageState.brightness]}
          min={-100}
          max={100}
          step={1}
          onValueChange={([value]) => {
            handleFilters({ name: "brightness", value: value });
          }}
        />
      </div>
      <div className="flex flex-col gap-3 items-center mb-5">
        <label htmlFor="text-center text-lg font-semibold">Saturation</label>
        <Slider
          name="saturation"
          id="saturation"
          value={[imageState.saturation]}
          min={-100}
          max={100}
          step={1}
          onValueChange={([value]) => {
            handleFilters({ name: "saturation", value: value });
          }}
        />
      </div>
      <div className="flex flex-col gap-3 items-center mb-5">
        <label htmlFor="text-center text-lg font-semibold">Contrast</label>
        <Slider
          name="contrast"
          id="contrast"
          value={[imageState.contrast]}
          min={-100}
          max={100}
          step={1}
          onValueChange={([value]) => {
            handleFilters({ name: "contrast", value: value });
          }}
        />
      </div>
      <div className="flex flex-col gap-3 items-center mb-5">
        <label htmlFor="text-center text-lg font-semibold">Hue Rotation</label>
        <Slider
          name="hue-rotation"
          id="hue-rotation"
          value={[imageState["hue-rotation"]]}
          min={-100}
          max={100}
          step={1}
          onValueChange={([value]) => {
            handleFilters({ name: "hue-rotation", value: value });
          }}
        />
      </div>
    </div>
  );
};

export default FilterConfig;
