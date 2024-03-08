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
import useFeatureStore, {
  SELECTION_CONFIG_MAP,
} from "@/stores/useFeatureStore";

const CanvasBox = function CanvasBox({ image }) {
  const { fabricRef, canvasRef } = useFabricRef();
  const setSelection = useFeatureStore((state) => state.setSelection);
  const setCanvasPainted = useFeatureStore((state) => state.setCanvasPainted);
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

        let scaleToFitResize = 2048 / Math.max(imgObj.width, imgObj.height);

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

        // this is being done to resize the image size to not exceed maxTextureSize = 2048 set by webGL
        imgInstance.filters.push(
          new fabric.Image.filters.Resize({
            scaleX: scaleToFitResize,
            scaleY: scaleToFitResize,
          })
        );
        imgInstance.filters.push(filters.brightness);
        imgInstance.filters.push(filters.saturation);
        imgInstance.filters.push(filters.contrast);
        imgInstance.filters.push(filters.hue);
        imgInstance.applyFilters();
        fabricRef.current.selectionBorderColor = "#0083ff";
        // fabricRef.current. = "black";
        // fabricRef.current.tran = true;
        fabric.Object.prototype.set({
          transparentCorners: false,
          cornerColor: "#0083ff",
          cornerStrokeColor: "#000f1c",
          borderColor: "red",
          cornerSize: 12,
          padding: 10,
          cornerStyle: "circle",
          borderDashArray: [3, 3],
        });
        fabricRef.current.add(imgInstance);

        setCanvasPainted(true);

        fabricRef.current.on("selection:created", function (obj) {
          console.log("selection:created", obj);
          fabricRef.current.isDrawingMode = false;
          setSelection(
            SELECTION_CONFIG_MAP[fabricRef.current.getActiveObject().type]
          );
          // Update component state or perform other actions
        });

        fabricRef.current.on("selection:updated", function (obj) {
          console.log("selection:updated", obj);
          fabricRef.current.isDrawingMode = false;
          setSelection(
            SELECTION_CONFIG_MAP[fabricRef.current.getActiveObject().type]
          );
          // Update component state or perform other actions
        });

        fabricRef.current.on("custom:cleareverything", function (obj) {
          console.log("custom:cleareverything", obj);

          fabricRef.current.isDrawingMode = false;
          fabricRef.current.discardActiveObject();
          fabricRef.current.requestRenderAll();
          setSelection("");
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
