import { useFabricRef } from "@/hooks/useFabricRef";
import React from "react";
import fabric from "@/fabric";
import { Slider } from "./ui/slider";

const FilterConfig = () => {
  const { fabricRef } = useFabricRef();
  const filters = [new fabric.Image.filters.Brightness({ brightness: 0 })];
  const handleFilters = (target) => {
    // const target = event.target;
    const activeObj = fabricRef.current.getActiveObject() as fabric.Image;

    activeObj.filters.forEach((item) => {
      if (
        item instanceof fabric.Image.filters.Brightness &&
        target.name === "brightness"
      ) {
        item.brightness = parseInt(target.value, 10) / 100;
      } else if (
        item instanceof fabric.Image.filters.Saturation &&
        target.name === "saturation"
      ) {
        item.saturation = parseInt(target.value, 10) / 100;
      } else if (
        item instanceof fabric.Image.filters.Contrast &&
        target.name === "contrast"
      ) {
        item.contrast = parseInt(target.value, 10) / 100;
      } else if (
        item instanceof fabric.Image.filters.HueRotation &&
        target.name === "hue-rotation"
      ) {
        item.rotation = parseInt(target.value, 10) / 100;
      }
    });

    activeObj.applyFilters();
    fabricRef.current.renderAll();
  };
  return (
    <div onChange={handleFilters}>
      <div className="flex flex-col gap-3 items-center mb-5">
        <label htmlFor="text-center text-lg font-semibold">Brightness</label>
        <Slider
          name="brightness"
          id="brightness"
          defaultValue={[0]}
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
          defaultValue={[0]}
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
          defaultValue={[0]}
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
          defaultValue={[0]}
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
