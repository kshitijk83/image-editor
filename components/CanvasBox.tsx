"use client";
import image from "next/image";
import fabric from "@/fabric";
import React, {
  MutableRefObject,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { useFabricRef } from "@/hooks/useFabricRef";
import useFeatureStore from "@/stores/useFeatureStore";

const CanvasBox = function CanvasBox({ image }) {
  const { fabricRef, canvasRef } = useFabricRef();
  const setSelection = useFeatureStore((state) => state.setSelection);
  useEffect(() => {
    if (image && !fabricRef.current) {
      let maxWidth = 800;
      let maxHeight = 600;

      const imgObj = new Image();

      imgObj.src = image;
      imgObj.onload = (e) => {
        var scale = Math.min(
          maxWidth / imgObj.width,
          maxHeight / imgObj.height
        );

        fabricRef.current = new fabric.Canvas("canvas", {
          width: scale * imgObj.width,
          height: scale * imgObj.height,
          backgroundColor: "white",
          preserveObjectStacking: true,
        });

        const imgInstance = new fabric.Image(imgObj, {
          left: 0,
          top: 0,
          width: imgObj.width,
          height: imgObj.height,
          moveCursor: "",
        });

        // Scale the image
        imgInstance.scale(scale);
        imgInstance.selectable = true;
        const filters = {
          brightness: new fabric.Image.filters.Brightness({ brightness: 0 }),
          saturation: new fabric.Image.filters.Saturation(),
          contrast: new fabric.Image.filters.Contrast(),
          hue: new fabric.Image.filters.HueRotation(),
        };

        imgInstance.filters.push(filters.brightness);
        imgInstance.filters.push(filters.saturation);
        imgInstance.filters.push(filters.contrast);
        imgInstance.filters.push(filters.hue);
        imgInstance.applyFilters();
        fabricRef.current.add(imgInstance);

        fabricRef.current.on("selection:created", function (obj) {
          setSelection(fabricRef.current.getActiveObject().type);
          // Update component state or perform other actions
        });

        fabricRef.current.on("selection:updated", function (obj) {
          setSelection(fabricRef.current.getActiveObject().type);
          // Update component state or perform other actions
        });
      };
    }
  }, []);

  return (
    <canvas
      id="canvas"
      className="w-full h-full"
      ref={(ref) => (canvasRef.current = ref)}
    ></canvas>
  );
};
export default CanvasBox;
