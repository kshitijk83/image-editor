"use client";
import image from "next/image";
import fabric from "@/fabric";
import React, {
  MutableRefObject,
  forwardRef,
  useLayoutEffect,
  useRef,
} from "react";

const CanvasBox = function CanvasBox({ image, refs }) {
  useLayoutEffect(() => {
    let fabricRef = refs.current.fabricRef as fabric.Canvas | null;
    // Additional canvas setup can go here
    // return () => {
    //   if (canvas.current) {
    //     canvas.current.dispose();
    //   }
    // };
    if (image && !fabricRef) {
      let canvasActualWidth = 800;
      let canvasActualHeight = 600;

      const imgObj = new Image();

      imgObj.src = image;
      imgObj.onload = (e) => {
        let aspectRatio = imgObj.width / imgObj.height;
        let calcWidth = canvasActualWidth;

        let calcHeight = canvasActualWidth / aspectRatio;
        console.log(calcWidth, calcHeight);
        // imgObj.style.width = calcWidth + "px";
        // imgObj.style.height = calcHeight + "px";

        const imgInstance = new fabric.Image(imgObj, {
          left: 0,
          top: 0,
          width: imgObj.width,
          height: imgObj.height,
        });

        fabricRef = new fabric.Canvas("canvas", {
          width: calcWidth,
          height: calcHeight,
          backgroundColor: "pink",
        });

        // Scale the image
        imgInstance.scaleToWidth(calcWidth);
        imgInstance.scaleToHeight(calcHeight);

        // Center the image on the canvas
        imgInstance.center();
        imgInstance.selectable = false;
        fabricRef.add(imgInstance);
      };
    }
  }, []);

  const handleUploadImage = (image) => {
    const canvas = refs.current.fabricRef as fabric.Canvas;
    if (image) {
      const file = image;
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgObj = new Image();
        imgObj.src = e.target.result as string;

        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();

        imgObj.onload = () => {
          const imgInstance = new fabric.Image(imgObj, {
            left: 0,
            top: 0,
            // width: canvas.getWidth(),
            // height: canvas.getHeight(),
          });
          const scale = Math.min(
            canvasWidth / imgObj.width,
            canvasHeight / imgObj.height
          );

          // Scale the image
          imgInstance.scale(scale);

          // Center the image on the canvas
          imgInstance.center();
          canvas.add(imgInstance);
        };
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <canvas id="canvas"></canvas>
    </div>
  );
};
export default CanvasBox;
