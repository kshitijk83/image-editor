import { useFabricRef } from "@/hooks/useFabricRef";
import React from "react";
import fabric from "@/fabric";

const FilterConfig = () => {
  const { fabricRef } = useFabricRef();
  const filters = [new fabric.Image.filters.Brightness({ brightness: 0 })];
  const handleFilters = (event) => {
    const target = event.target;
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
      <div className="flex gap-2 items-center">
        <label htmlFor="brightness">brightness</label>
        <input
          type="range"
          name="brightness"
          id="brightness"
          min={-100}
          defaultValue={0}
          max={100}
        />
      </div>
      <div className="flex gap-2 items-center">
        <label htmlFor="saturation">brightness</label>
        <input
          type="range"
          name="saturation"
          id="saturation"
          min={-100}
          defaultValue={0}
          max={100}
        />
      </div>
      <div className="flex gap-2 items-center">
        <label htmlFor="contrast">brightness</label>
        <input
          type="range"
          name="contrast"
          id="contrast"
          min={-100}
          defaultValue={0}
          max={100}
        />
      </div>
      <div className="flex gap-2 items-center">
        <label htmlFor="hue-rotation">brightness</label>
        <input
          type="range"
          name="hue-rotation"
          id="hue-rotation"
          min={-100}
          defaultValue={0}
          max={100}
        />
      </div>
    </div>
  );
};

export default FilterConfig;
